import { useEffect, useRef, useState } from "react";
import { Clock, Send, X } from "lucide-react";

const WHATSAPP_NUMBER = "302242000000"; // TODO: replace with the real Meltemi WhatsApp number

const text = {
  en: {
    open: "Chat on WhatsApp",
    title: "Meltemi Rentals",
    status: "Replies within an hour",
    hours: "Every day, 08:00 - 22:00 (Kos time)",
    greeting:
      "Hi! Ask us anything about availability, the final price or airport pickup. We reply within an hour.",
    quickTitle: "Quick questions",
    quick: [
      "Is a car available for my dates?",
      "Is 35 EUR/day really the final price?",
      "Can you deliver to Kos airport?",
    ],
    placeholder: "Write your message...",
    send: "Send on WhatsApp",
    note: "Opens WhatsApp. No app? It opens in your browser.",
  },
  el: {
    open: "Συνομιλία στο WhatsApp",
    title: "Meltemi Rentals",
    status: "Απαντάμε μέσα σε μία ώρα",
    hours: "Καθημερινά, 08:00 - 22:00 (ώρα Κω)",
    greeting:
      "Γεια σας! Ρωτήστε μας για διαθεσιμότητα, τελική τιμή ή παραλαβή από το αεροδρόμιο. Απαντάμε μέσα σε μία ώρα.",
    quickTitle: "Γρήγορες ερωτήσεις",
    quick: [
      "Υπάρχει διαθέσιμο αυτοκίνητο για τις ημερομηνίες μου;",
      "Τα 35€/ημέρα είναι πραγματικά η τελική τιμή;",
      "Μπορείτε να το φέρετε στο αεροδρόμιο της Κω;",
    ],
    placeholder: "Γράψτε το μήνυμά σας...",
    send: "Αποστολή στο WhatsApp",
    note: "Ανοίγει το WhatsApp. Δεν έχετε εφαρμογή; Ανοίγει στο πρόγραμμα περιήγησης.",
  },
} as const;

function WhatsAppGlyph({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.04 3.2c-7.06 0-12.8 5.73-12.8 12.79 0 2.25.59 4.44 1.7 6.38L3.2 28.8l6.62-1.7a12.8 12.8 0 0 0 6.22 1.6h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.05-3.65zm0 23.02h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4 1.03 1.07-3.9-.25-.4a10.6 10.6 0 0 1-1.63-5.65c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.11 7.5 3.12a10.55 10.55 0 0 1 3.11 7.52c0 5.86-4.77 10.62-10.63 10.62zm5.83-7.96c-.32-.16-1.97-.97-2.27-1.08-.31-.11-.53-.17-.75.16-.22.32-.86 1.08-1.06 1.3-.19.22-.39.24-.71.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.15.32-.39.48-.58.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.77-1-2.42-.26-.63-.53-.55-.73-.55h-.63c-.22 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.67 0 1.58 1.15 3.1 1.31 3.32.16.21 2.23 3.4 5.4 4.77.75.32 1.34.51 1.8.66.76.24 1.45.21 2 .13.61-.09 1.97-.81 2.25-1.58.28-.78.28-1.44.2-1.58-.09-.13-.3-.21-.63-.37z" />
    </svg>
  );
}

export function WhatsAppChat({ lang }: { lang: "en" | "el" }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const t = text[lang];

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (body: string) => {
    const value = body.trim() || t.quick[0];
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(value)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setMessage("");
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/10">
          <div className="flex items-start gap-3 bg-brand-deep p-4 text-primary-foreground">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
              <WhatsAppGlyph />
            </span>
            <div className="min-w-0 flex-1">
              <strong className="block font-display text-base leading-tight">{t.title}</strong>
              <span className="flex items-center gap-1.5 text-xs opacity-90">
                <span className="size-2 rounded-full bg-highlight" />
                {t.status}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 opacity-80 transition-opacity hover:opacity-100"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="space-y-3 bg-paper p-4">
            <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-card p-3 text-sm shadow-sm">{t.greeting}</p>
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="size-3.5" />
              {t.hours}
            </p>

            <p className="pt-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {t.quickTitle}
            </p>
            <div className="flex flex-col gap-2">
              {t.quick.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full bg-card px-3 py-2 text-left text-xs font-medium ring-1 ring-foreground/10 transition-colors hover:bg-paper-deep"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(message);
            }}
            className="border-t border-foreground/10 bg-card p-3"
          >
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(message);
                }
              }}
              rows={2}
              placeholder={t.placeholder}
              className="w-full resize-none rounded-lg bg-paper p-2.5 text-sm outline-none ring-1 ring-foreground/10 focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-[#08331b] transition-opacity hover:opacity-90"
            >
              <Send className="size-4" />
              {t.send}
            </button>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">{t.note}</p>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t.open}
        className="flex items-center gap-2 rounded-full bg-[#25D366] py-3 pr-4 pl-3 font-semibold text-[#08331b] shadow-xl transition-transform hover:scale-105"
      >
        <WhatsAppGlyph className="h-7 w-7" />
        <span className="hidden text-sm sm:inline">{t.status}</span>
      </button>
    </div>
  );
}
