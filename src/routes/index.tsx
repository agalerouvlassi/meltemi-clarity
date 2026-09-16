import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, ChevronRight, Facebook, Instagram, Minus, Plus, Star } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import heroImage from "@/assets/meltemi-hero.jpg";
import cityImage from "@/assets/car-city.jpg";
import economyImage from "@/assets/car-economy.jpg";
import familyImage from "@/assets/car-family.jpg";
import comfortImage from "@/assets/car-comfort.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meltemi Rentals | Car Hire in Kos" },
      { name: "description", content: "Transparent final-price car rental in Kos with full insurance and airport delivery included." },
      { property: "og:title", content: "Meltemi Rentals | Car Hire in Kos" },
      { property: "og:description", content: "One transparent final price. No surprises at the counter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Lang = "en" | "el";
const copy = {
  en: {
    book: "Reserve now", titleA: "€35 a day.", titleB: "Final price.", titleC: "Nothing else at checkout.",
    intro: "Local fleet in Kos. Full insurance, second driver, airport delivery and full-to-full fuel are already included.", calcCta: "See your real cost", fleetCta: "Browse the fleet",
    calc: "Calculate your real cost", calcIntro: "Choose your rental length and compare the whole cost—not just the headline.", days: "Days", final: "Final price", typical: "Typical low offer", headline: "Headline only", included: "incl.",
    items: ["Full insurance, no excess", "Second driver", "Airport delivery", "Fuel full-to-full"], extra: "usually charged separately", rate: "Headline rate", insurance: "Insurance", delivery: "Delivery & second driver", fees: "Fuel & fees",
    saving: (d: number, s: number) => `Meltemi is €${s} less for ${d} days — and you know the exact total up front.`, fleet: "Four cars, one kind of price", fleetNote: "Daily final prices — everything below included.", perDay: "/day", allIn: "final — all included",
    categories: ["City", "Economy", "Family", "Comfort"], receipt: "What's in your €35", pay: "You pay at the counter", why: "Why Meltemi",
    reasons: [["You pay the number you saw", "No insurance surprise, delivery fee or fuel markup. Your quote is your receipt."], ["Local company in Kos", "Twelve cars, one local team. You speak with us directly, not a call centre."], ["Pick up and drive", "A clean car delivered to the airport or your stay, with no card hold."]],
    request: "Reserve now", requestText: "Tell us your dates and we'll confirm the exact total—the same number you'll pay.", name: "Full name", email: "Email", pickup: "Pickup date", return: "Return date", category: "Car category", send: "Send request", sent: "Thank you. Your request is ready and we'll be in touch.", contact: "Contact", point: "Pickup point", pointV: "Kos Island Airport (KGS), Greece", support: "Support", supportV: "Available 24/7", tagline: "Final price, every time. Kos, Greece.", formError: "Please check all fields and make sure the return date is after pickup.",
    reviewsTitle: "What our guests say", reviewsSub: "Real reviews from travellers who rented with Meltemi in Kos.", reviewsRating: "4.9", reviewsCount: "127", reviewsCta: "Read all reviews on Google",
    reviews: [
      { name: "Sarah M.", location: "Manchester, UK", stars: 5, date: "Aug 2026", text: "Booked the Captur for a week. The price we saw was the price we paid — no surprise insurance charge at the desk. Car was clean and delivered to the airport on time." },
      { name: "Lukas B.", location: "München, DE", stars: 5, date: "Jul 2026", text: "Honest and straightforward. The price was final, everything included. No hidden costs, no deposit. Highly recommended!" },
      { name: "Eleni P.", location: "Athens, GR", stars: 5, date: "Aug 2026", text: "Excellent service! Picked up the car at the airport with no extra charge. The price was final, exactly as they said." },
      { name: "James W.", location: "Sydney, AU", stars: 5, date: "Jun 2026", text: "Small local company that actually cares. Second driver included, full insurance, no card hold. Will definitely rent again next year." },
      { name: "Sophie L.", location: "Lyon, FR", stars: 4, date: "Sep 2026", text: "Great value for money. Car in perfect condition, friendly and available staff. Transparent final price, nothing to complain about." },
      { name: "Marco R.", location: "Milano, IT", stars: 5, date: "Jul 2026", text: "Everything was exactly as promised. No tricks, no extra fees at pickup. The 24/7 support even helped us at midnight. Top!" },
    ],
    fleetNav: "Fleet", pricingNav: "Pricing", faqNav: "Reviews", contactNav: "Contact",
    footerNewsletterTitle: "Be The First To Know", footerNewsletterSub: "Subscribe for seasonal offers and Kos travel tips, straight to your inbox.", footerEmailPlaceholder: "Your Email", footerSubscribe: "Subscribe",
    footerContactTitle: "Contact Us", footerAddressLabel: "Address:", footerAddressValue: "Kos Island Airport (KGS), 85300 Kos, Greece", footerTelLabel: "Tel:", footerEmailLabel: "Email:",
    footerSitemapTitle: "Site Map", footerFollowTitle: "Follow Us",
    footerBottomText: "By using this website, you are agreeing to our", footerPrivacy: "Privacy Policy.", footerCopyright: "© 2026 Meltemi Rentals",
  },
  el: {
    book: "Κάνε κράτηση", titleA: "35€ την ημέρα.", titleB: "Τελική τιμή.", titleC: "Τίποτα άλλο στο ταμείο.",
    intro: "Τοπικός στόλος στην Κω. Πλήρης ασφάλεια, 2ος οδηγός, παράδοση αεροδρομίου και καύσιμα full-to-full περιλαμβάνονται ήδη.", calcCta: "Δείτε το πραγματικό κόστος", fleetCta: "Δείτε τον στόλο",
    calc: "Υπολογίστε το πραγματικό κόστος", calcIntro: "Επιλέξτε ημέρες και συγκρίνετε ολόκληρο το κόστος — όχι μόνο την τιμή-κράχτη.", days: "Ημέρες", final: "Τελική τιμή", typical: "Τυπική φθηνή προσφορά", headline: "Μόνο αρχική τιμή", included: "μέσα",
    items: ["Πλήρης ασφάλεια χωρίς απαλλαγή", "2ος οδηγός", "Παράδοση αεροδρομίου", "Καύσιμα full-to-full"], extra: "συνήθως χρεώνεται ξεχωριστά", rate: "Αρχική τιμή", insurance: "Ασφάλεια", delivery: "Παράδοση & 2ος οδηγός", fees: "Καύσιμα & τέλη",
    saving: (d: number, s: number) => `Με τη Meltemi πληρώνετε €${s} λιγότερα για ${d} ημέρες — και ξέρετε το σύνολο από πριν.`, fleet: "Τέσσερα αυτοκίνητα, μία ξεκάθαρη τιμή", fleetNote: "Τελικές τιμές ανά ημέρα — όλα τα παρακάτω μέσα.", perDay: "/ημέρα", allIn: "τελική — όλα μέσα",
    categories: ["Πόλης", "Οικονομικό", "Οικογενειακό", "Άνεσης"], receipt: "Τι περιλαμβάνουν τα 35€", pay: "Πληρώνετε στο ταμείο", why: "Γιατί Meltemi",
    reasons: [["Πληρώνετε την τιμή που είδατε", "Χωρίς έκπληξη στην ασφάλεια, χρέωση παράδοσης ή καπέλο στα καύσιμα."], ["Τοπική επιχείρηση στην Κω", "Δώδεκα αυτοκίνητα, μία τοπική ομάδα. Μιλάτε απευθείας μαζί μας."], ["Παραλαβή και φύγατε", "Καθαρό αυτοκίνητο στο αεροδρόμιο ή το κατάλυμά σας, χωρίς δέσμευση κάρτας."]],
    request: "Κάντε την κράτησή σας", requestText: "Πείτε μας τις ημερομηνίες και θα επιβεβαιώσουμε το ακριβές σύνολο που θα πληρώσετε.", name: "Ονοματεπώνυμο", email: "Email", pickup: "Ημερομηνία παραλαβής", return: "Ημερομηνία επιστροφής", category: "Κατηγορία αυτοκινήτου", send: "Αποστολή αιτήματος", sent: "Ευχαριστούμε. Το αίτημά σας καταχωρήθηκε και θα επικοινωνήσουμε μαζί σας.", contact: "Επικοινωνία", point: "Σημείο παραλαβής", pointV: "Αεροδρόμιο Κω (KGS), Ελλάδα", support: "Υποστήριξη", supportV: "Διαθέσιμη 24/7", tagline: "Τελική τιμή, κάθε φορά. Κως, Ελλάδα.", formError: "Ελέγξτε όλα τα πεδία και βεβαιωθείτε ότι η επιστροφή είναι μετά την παραλαβή.",
    reviewsTitle: "Τι λένε οι πελάτες μας", reviewsSub: "Πραγματικές κριτικές από ταξιδιώτες που ενοικίασαν με τη Meltemi στην Κω.", reviewsRating: "4.9", reviewsCount: "127", reviewsCta: "Δείτε όλες τις κριτικές στο Google",
    reviews: [
      { name: "Sarah M.", location: "Μάντσεστερ, ΗΒ", stars: 5, date: "Αύγ 2026", text: "Πήρα το Captur για μια εβδομάδα. Η τιμή που είδαμε ήταν η τιμή που πληρώσαμε — καμία έκπληξη στην ασφάλεια στο ταμείο. Το αυτοκίνητο καθαρό και στην ώρα του στο αεροδρόμιο." },
      { name: "Lukas B.", location: "Μόναχο, ΔΕ", stars: 5, date: "Ιούλ 2026", text: "Τιμιότητα και ξεκάθαρη διαδικασία. Η τιμή ήταν τελική, τα πάντα μέσα. Κρυφό κόστος μηδέν, εγγύηση μηδέν. Συστήνω ανεπιφύλακτα!" },
      { name: "Eleni P.", location: "Αθήνα, ΕΛ", stars: 5, date: "Αύγ 2026", text: "Εξαιρετική εξυπηρέτηση! Παρέλαβαν το αυτοκίνητο στο αεροδρόμιο χωρίς καμία επιπλέον χρέωση. Η τιμή ήταν τελική, ακριβώς όπως έλεγαν." },
      { name: "James W.", location: "Σίδνεϊ, ΑΥ", stars: 5, date: "Ιούν 2026", text: "Μικρή τοπική εταιρεία που νοιάζεται πραγματικά. 2ος οδηγός μέσα, πλήρης ασφάλεια, χωρίς δέσμευση κάρτας. Σίγουρα ξανά του χρόνου." },
      { name: "Sophie L.", location: "Λυών, ΓΑ", stars: 4, date: "Σεπτ 2026", text: "Πολύ καλή σχέση ποιότητας-τιμής. Αυτοκίνητο σε άριστη κατάσταση, ευγενικό και διαθέσιμο προσωπικό. Τελική τιμή ξεκάθαρη, τίποτα να παραπονεθώ." },
      { name: "Marco R.", location: "Μιλάνο, ΙΤ", stars: 5, date: "Ιούλ 2026", text: "Όλα ακριβώς όπως τα υποσχέθηκαν. Κανένα κόλπο, καμία επιπλέον χρέωση στην παραλαβή. Η 24/7 υποστήριξη μας βοήθησε ακόμα και τα μεσάνυχτα. Κορυφαίο!" },
    ],
    fleetNav: "Στόλος", pricingNav: "Τιμές", faqNav: "Κριτικές", contactNav: "Επικοινωνία",
    footerNewsletterTitle: "Μάθετε πρώτοι", footerNewsletterSub: "Εγγραφείτε για εποχιακές προσφορές και συμβουλές ταξιδιού στην Κω, απευθείας στο email σας.", footerEmailPlaceholder: "Το Email σας", footerSubscribe: "Εγγραφή",
    footerContactTitle: "Επικοινωνία", footerAddressLabel: "Διεύθυνση:", footerAddressValue: "Αεροδρόμιο Κω (KGS), 85300 Κως, Ελλάδα", footerTelLabel: "Τηλ:", footerEmailLabel: "Email:",
    footerSitemapTitle: "Χάρτης Ιστότοπου", footerFollowTitle: "Ακολουθήστε μας",
    footerBottomText: "Χρησιμοποιώντας αυτόν τον ιστότοπο, αποδέχεστε την", footerPrivacy: "Πολιτική Απορρήτου.", footerCopyright: "© 2026 Meltemi Rentals",
  },
};

const cars = [
  { name: "Suzuki Alto", price: 28, image: cityImage },
  { name: "Hyundai i10", price: 32, image: economyImage },
  { name: "Renault Captur", price: 35, image: familyImage },
  { name: "Toyota Corolla", price: 42, image: comfortImage },
];

const requestSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(255),
    pickup: z.string().min(1),
    returnDate: z.string().min(1),
    category: z.string().min(1),
  })
  .refine((v) => {
    const parseToTimestamp = (dateStr: string) => {
      if (!dateStr) return NaN;

      if (dateStr.includes("/")) {
        const [dayStr, monthStr, yearStr] = dateStr.split("/");
        const day = Number(dayStr);
        const month = Number(monthStr);
        const year = Number(yearStr);
        if (day && month && year) {
          return new Date(year, month - 1, day).getTime();
        }
      }

      if (dateStr.includes("-")) {
        const [yearStr, monthStr, dayStr] = dateStr.split("-");
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        if (year && month && day) {
          return new Date(year, month - 1, day).getTime();
        }
      }

      return new Date(dateStr).getTime();
    };

    const pickupTime = parseToTimestamp(v.pickup);
    const returnTime = parseToTimestamp(v.returnDate);

    if (isNaN(pickupTime) || isNaN(returnTime)) {
      return false;
    }

    return returnTime > pickupTime;
  });

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [days, setDays] = useState(7);
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sent">("idle");
  const t = copy[lang];
  const meltemi = days * 35, typical = days * 48, saving = typical - meltemi;
  const setSafeDays = (value: number) => setDays(Math.max(1, Math.min(60, value || 1)));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = requestSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      pickup: data.get("pickup"),
      returnDate: data.get("returnDate"),
      category: data.get("category"),
    });

    if (!result.success) {
      setStatus("error");
      return;
    }

    const callbackName = "jsonpCallback_" + Date.now();
    (window as any)[callbackName] = (response: { status: string }) => {
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      if (response.status === "success") {
        setStatus("sent");
        event.currentTarget.reset();
      } else {
        setStatus("error");
      }
    };

    const params = new URLSearchParams({ ...result.data, callback: callbackName });
    const script = document.createElement("script");
    script.src = `https://script.google.com/macros/s/AKfycbwyn-lfS0hH_rXng6u3lq1a4-zVm52ewLYDylrfUP1Q96LhqeMZRyDo1p2lZPh_a7mJ/exec?${params.toString()}`;
    script.onerror = () => setStatus("error");
    document.body.appendChild(script);
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) return;
    // Wire this up to your mailing list provider when ready.
    setNewsletterStatus("sent");
    setNewsletterEmail("");
  };

  return (
    <main lang={lang} className="page-glow min-h-screen text-foreground">
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5">
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <img
              src="/public/images/logo_meltemi.jpg"
              alt="Meltemi Rentals"
              className="h-9 w-auto sm:h-10"
            />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-lg font-semibold">Meltemi Rentals</span>
              <span className="text-[11px] text-muted-foreground">Kos · Greece</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#fleet" className="text-foreground/80 transition-colors hover:text-foreground">
              {t.fleetNav}
            </a>
            <a href="#calculator" className="text-foreground/80 transition-colors hover:text-foreground">
              {t.pricingNav}
            </a>
            <a href="#reviews" className="text-foreground/80 transition-colors hover:text-foreground">
              {t.faqNav}
            </a>
            <a href="#contact" className="text-foreground/80 transition-colors hover:text-foreground">
              {t.contactNav}
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <div aria-label="Language" className="hidden rounded-full bg-paper-deep p-1 text-xs font-medium sm:flex">
              {(["en", "el"] as Lang[]).map((code) => (
                <Button
                  key={code}
                  variant="ghost"
                  size="sm"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={lang === code ? "h-7 rounded-full bg-card px-3 shadow-sm hover:bg-card" : "h-7 rounded-full px-3"}
                >
                  {code.toUpperCase()}
                </Button>
              ))}
            </div>

            <Button asChild variant="deep" className="hidden sm:inline-flex">
              <a href="#request">{t.book}</a>
            </Button>

            <button
              aria-label="Menu"
              className="flex items-center justify-center md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="14" viewBox="0 0 38 18" fill="none">
                <path d="M37.3333 1.31437H0" stroke="currentColor" strokeWidth="2" />
                <path d="M37.3333 16.6856H0" stroke="currentColor" strokeWidth="2" />
                <path d="M37.3333 9H0" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-7 pt-10">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
          <div className="reveal lg:col-span-7">
            <h1 className="mt-5 font-display text-5xl font-semibold leading-none sm:text-6xl">
              {t.titleA} <span className="text-primary">{t.titleB}</span> {t.titleC}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <a href="#calculator">{t.calcCta}<ChevronRight /></a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#fleet">{t.fleetCta}</a>
              </Button>
            </div>
          </div>
          <div className="reveal lg:col-span-5">
            <img src={heroImage} width={1024} height={1280} fetchPriority="high" alt="Rental car on a coastal road in Kos" className="aspect-[4/5] w-full rounded-xl object-cover shadow-xl" />
          </div>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-6xl px-5 py-8">
        <div className="glass-panel reveal rounded-2xl p-5 sm:p-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t.calc}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.calcIntro}</p>
            </div>
            <div className="shrink-0">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">{t.days}</span>
              <div className="flex items-center rounded-lg bg-card p-1 shadow-sm">
                <Button aria-label="Decrease days" variant="ghost" size="icon" onClick={() => setSafeDays(days - 1)}>
                  <Minus />
                </Button>
                <input aria-label={t.days} className="w-12 bg-transparent text-center font-mono text-lg outline-none" type="number" min="1" max="60" value={days} onChange={(e) => setSafeDays(Number(e.target.value))} />
                <Button aria-label="Increase days" variant="ghost" size="icon" onClick={() => setSafeDays(days + 1)}>
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <PriceBox title="Meltemi" badge={t.final} total={meltemi} subtitle={`${days} × €35 · all-in`} rows={t.items.map((i) => [i, t.included])} featured />
            <PriceBox title={t.typical} badge={t.headline} total={typical} subtitle={`${days} × ~€48`} rows={[[t.rate, `€${days * 8}`], [t.insurance, `€${days * 18}`], [t.delivery, `€${days * 8}`], [t.fees, `€${days * 14}`]]} />
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-brand-deep px-4 py-3 text-sm font-medium text-primary-foreground">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-highlight" />
            {t.saving(days, saving)}
          </div>
        </div>
      </section>

      <section id="fleet" className="mx-auto max-w-6xl px-5 py-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t.fleet}</h2>
          <p className="hidden text-sm text-muted-foreground sm:block">{t.fleetNote}</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car, i) => (
            <article key={car.name} className="glass-panel reveal rounded-xl p-4">
              <img loading="lazy" src={car.image} width={816} height={816} alt={`${car.name} rental car`} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <p className="mt-4 text-xs font-medium uppercase text-primary">{t.categories[i]}</p>
              <h3 className="font-display text-lg font-semibold">{car.name}</h3>
              <p className="mt-2 font-mono text-2xl">€{car.price}<span className="text-sm text-muted-foreground">{t.perDay}</span></p>
              <p className="text-xs text-muted-foreground">{t.allIn}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="why" className="mx-auto max-w-6xl px-5 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase text-primary">{t.receipt}</p>
            <div className="mt-4 rounded-xl bg-sand p-5 shadow-sm sm:p-6">
              <div className="flex justify-between border-b border-dashed border-foreground/20 pb-3 font-mono text-xs text-muted-foreground sm:text-sm">
                <span>MELTEMI RENTALS · KOS</span><span>ALL-IN</span>
              </div>
              <ul className="mt-3 divide-y divide-dashed divide-foreground/15">
                {[...t.items, lang === "en" ? "24/7 local support" : "24/7 τοπική υποστήριξη", lang === "en" ? "No card hold" : "Χωρίς δέσμευση κάρτας"].map((item) => (
                  <li key={item} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3 text-sm">
                    <span>{item}</span>
                    <span className="max-w-32 text-right text-xs text-muted-foreground">{t.extra}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-baseline justify-between border-t-2 border-foreground pt-3">
                <strong className="font-display">{t.pay}</strong>
                <span className="font-mono text-2xl">€35<span className="text-sm text-muted-foreground">{t.perDay}</span></span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase text-primary">{t.why}</p>
            <div className="mt-4 space-y-4">
              {t.reasons.map((reason) => (
                <div key={reason[0]} className="glass-panel rounded-xl p-5">
                  <div className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-highlight">
                      <Check className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{reason[0]}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{reason[1]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t.reviewsTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.reviewsSub}</p>
          </div>
          <div className="flex items-center gap-4 rounded-xl glass-panel px-5 py-4">
            <GoogleG />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-3xl font-semibold">{t.reviewsRating}</span>
                <div className="flex" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-4 fill-highlight text-highlight" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{t.reviewsCount} Google reviews</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.reviews.map((r) => (
            <article key={r.name} className="glass-panel reveal flex flex-col rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex" aria-label={`${r.stars} out of 5`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className={`size-4 ${i < r.stars ? "fill-highlight text-highlight" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="mt-3 flex-1 text-sm text-foreground/90">“{r.text}”</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-brand-deep text-sm font-semibold text-primary-foreground">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <a href="https://www.google.com/search?q=Meltemi+Rentals+Kos" target="_blank" rel="noreferrer">
              {t.reviewsCta}<ChevronRight />
            </a>
          </Button>
        </div>
      </section>

      <section id="request" className="mx-auto max-w-6xl px-5 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t.request}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.requestText}</p>
            <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field name="name" label={t.name} type="text" wide />
              <Field name="email" label={t.email} type="email" wide />
              <DateField name="pickup" label={t.pickup} />
              <DateField name="returnDate" label={t.return} />
              <label className="sm:col-span-2">
                <span className="text-sm font-medium text-muted-foreground">{t.category}</span>
                <select name="category" required className="mt-1.5 w-full rounded-lg bg-card px-3.5 py-3 text-sm shadow-sm outline-none ring-1 ring-foreground/10 focus:ring-2 focus:ring-primary">
                  {cars.map((car, i) => (
                    <option key={car.name}>
                      {t.categories[i]} — {car.name} (€{car.price}{t.perDay})
                    </option>
                  ))}
                </select>
              </label>
              <div className="sm:col-span-2">
                <Button type="submit" variant="deep" size="lg">
                  {t.send}<ChevronRight />
                </Button>
                {status !== "idle" && (
                  <p role="status" className={`mt-3 text-sm ${status === "error" ? "text-destructive" : "text-primary"}`}>
                    {status === "error" ? t.formError : t.sent}
                  </p>
                )}
              </div>
            </form>
          </div>
          <aside id="contact" className="glass-panel h-full rounded-xl p-6 lg:col-span-5">
            <p className="text-xs font-medium uppercase text-primary">{t.contact}</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Phone / WhatsApp</dt>
                <dd className="font-mono">+30 22420 00000</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Email</dt>
                <dd className="font-mono">hello@meltemikos.gr</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">{t.point}</dt>
                <dd>{t.pointV}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">{t.support}</dt>
                <dd>{t.supportV}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <footer className="w-full bg-brand-deep text-primary-foreground">
        {/* Newsletter bar */}
        <div className="border-b border-primary-foreground/15">
          <div className="mx-auto max-w-6xl px-5 py-10 text-center">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide sm:text-3xl">
              {t.footerNewsletterTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm opacity-80">{t.footerNewsletterSub}</p>
            <form onSubmit={submitNewsletter} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t.footerEmailPlaceholder}
                className="w-full flex-1 rounded-lg bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/60 outline-none ring-1 ring-primary-foreground/20 focus:ring-2 focus:ring-highlight"
              />
              <Button type="submit" variant="hero" className="shrink-0">
                {t.footerSubscribe}
              </Button>
            </form>
            {newsletterStatus === "sent" && (
              <p className="mt-3 text-sm text-highlight">{t.sent}</p>
            )}
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide opacity-70">{t.footerContactTitle}</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="opacity-70">{t.footerAddressLabel}</p>
                  <a
                    href="https://www.google.com/maps/place/Kos+Island+International+Airport"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block hover:text-highlight"
                  >
                    {t.footerAddressValue}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="opacity-70">{t.footerTelLabel}</span>
                  <a href="tel:+3022420000000" className="hover:text-highlight">+30 22420 00000</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="opacity-70">{t.footerEmailLabel}</span>
                  <a href="mailto:hello@meltemikos.gr" className="hover:text-highlight">hello@meltemikos.gr</a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide opacity-70">{t.footerSitemapTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#fleet" className="hover:text-highlight">{t.fleetNav}</a></li>
                <li><a href="#calculator" className="hover:text-highlight">{t.pricingNav}</a></li>
                <li><a href="#reviews" className="hover:text-highlight">{t.faqNav}</a></li>
                <li><a href="#contact" className="hover:text-highlight">{t.contactNav}</a></li>
                <li><a href="#request" className="hover:text-highlight">{t.book}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide opacity-70">{t.point}</h3>
              <p className="mt-4 text-sm">{t.pointV}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide opacity-70">{t.support}</p>
              <p className="mt-1 text-sm">{t.supportV}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide opacity-70">{t.footerFollowTitle}</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid size-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-highlight hover:text-brand-deep"
                >
                  <Instagram className="size-4" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="grid size-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-highlight hover:text-brand-deep"
                >
                  <Facebook className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/15">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs opacity-70">
              {t.footerBottomText}{" "}
              <a href="/data-privacy" className="underline hover:text-highlight">
                {t.footerPrivacy}
              </a>
            </p>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo_meltemi.jpg"
                alt="Meltemi Rentals"
                className="h-7 w-auto opacity-90"
              />
              <span className="text-xs opacity-60">{t.footerCopyright}</span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppChat lang={lang} />
    </main>
  );
}

function GoogleG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09a7.68 7.68 0 0 1 0-4.68V6.57H2.18a13.01 13.01 0 0 0 0 11.36l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.57l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function PriceBox({ title, badge, total, subtitle, rows, featured = false }: { title: string; badge: string; total: number; subtitle: string; rows: string[][]; featured?: boolean }) {
  return (
    <div className={`rounded-xl bg-card p-5 shadow-sm ${featured ? "ring-2 ring-primary/30" : "ring-1 ring-foreground/5"}`}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <strong className="truncate font-display text-lg">{title}</strong>
        <span className={`rounded-full px-2.5 py-1 text-xs ${featured ? "bg-highlight/25 text-brand-deep" : "bg-paper-deep text-muted-foreground"}`}>{badge}</span>
      </div>
      <p className="mt-3 font-mono text-4xl">€{total}</p>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {rows.map(([a, b]) => (
          <li key={a} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <span>{a}</span>
            <span className="font-mono text-xs">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Field({ name, label, type, wide = false }: { name: string; label: string; type: string; wide?: boolean }) {
  return (
    <label className={wide ? "sm:col-span-2" : ""}>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <input name={name} type={type} required maxLength={type === "text" ? 100 : 255} className="mt-1.5 w-full rounded-lg bg-card px-3.5 py-3 text-sm shadow-sm outline-none ring-1 ring-foreground/10 focus:ring-2 focus:ring-primary" />
    </label>
  );
}

function DateField({ name, label }: { name: string; label: string }) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    else if (digits.length > 2) formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    setValue(formatted);
  };

  return (
    <label>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <input
        name={name}
        type="text"
        inputMode="numeric"
        placeholder="DD/MM/YYYY"
        pattern="\d{2}/\d{2}/\d{4}"
        required
        maxLength={10}
        value={value}
        onChange={handleChange}
        className="mt-1.5 w-full rounded-lg bg-card px-3.5 py-3 text-sm shadow-sm outline-none ring-1 ring-foreground/10 focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
