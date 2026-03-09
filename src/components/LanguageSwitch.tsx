import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", labelKey: "language.en", flag: "🇬🇧", displayCode: "En" },
  { code: "de", labelKey: "language.de", flag: "🇩🇪", displayCode: "De" },
] as const;

const LANGUAGE_STORAGE_KEY = "premium-energy-lang";

const LanguageSwitch = () => {
  const { i18n, t } = useTranslation();
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const setLanguage = (code: "en" | "de") => {
    i18n.changeLanguage(code);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    document.documentElement.lang = code;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-md pl-3 pr-2 py-1.5 text-foreground h-9 border-l border-border",
            "hover:bg-muted/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          )}
          aria-label={t(current.labelKey)}
        >
          <span className="text-lg leading-none" role="img" aria-hidden>
            {current.flag}
          </span>
          <span className="text-sm font-medium tabular-nums">{current.displayCode}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-foreground/80" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(i18n.language === lang.code && "bg-accent")}
          >
            <span className="mr-2" role="img" aria-hidden>
              {lang.flag}
            </span>
            {t(lang.labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitch;
