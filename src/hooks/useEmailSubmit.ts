import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useEmailSubmit(source: string) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      toast({ title: "Please enter a valid email.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("save-email", {
        body: { email: trimmed, company: honeypot, source },
      });

      if (error) {
        toast({ title: "Something went wrong. Try again.", variant: "destructive" });
        return;
      }

      if (data?.success) {
        setEmail("");
        toast({ title: "Email submitted." });
      } else if (data?.error === "invalid_email") {
        toast({ title: "Please enter a valid email.", variant: "destructive" });
      } else if (data?.error === "rate_limited") {
        toast({ title: "Too many attempts. Try again later.", variant: "destructive" });
      } else {
        toast({ title: "Something went wrong. Try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong. Try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return { email, setEmail, honeypot, setHoneypot, submitting, handleSubmit };
}
