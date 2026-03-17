import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useEmailSubmit(source: string) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      toast({ title: t("toast.invalidEmail"), variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("save-email", {
        body: { email: trimmed, company: honeypot, source },
      });

      if (error) {
        toast({ title: t("toast.error"), variant: "destructive" });
        return;
      }

      if (data?.success) {
        setEmail("");
        toast({ title: t("toast.success") });

        // Fire-and-forget: notify + save to MongoDB
        fetch("/api/email-submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed, source }),
        }).catch(() => {});
      } else if (data?.error === "invalid_email") {
        toast({ title: t("toast.invalidEmail"), variant: "destructive" });
      } else if (data?.error === "rate_limited") {
        toast({ title: t("toast.rateLimited"), variant: "destructive" });
      } else {
        toast({ title: t("toast.error"), variant: "destructive" });
      }
    } catch {
      toast({ title: t("toast.error"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return { email, setEmail, honeypot, setHoneypot, submitting, handleSubmit };
}
