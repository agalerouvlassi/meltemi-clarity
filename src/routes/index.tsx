import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, ChevronRight, Minus, Plus } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/meltemi-hero.jpg";
import cityImage from "@/assets/car-city.jpg";
import economyImage from "@/assets/car-economy.jpg";
import familyImage from "@/assets/car-family.jpg";
import comfortImage from "@/assets/car-comfort.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Meltemi Rentals | Car Hire in Kos" },
    { name: "description", content: "Transparent final-price car rental in Kos with full insurance and airport delivery included." },
    { property: "og:title", content: "Meltemi Rentals | Car Hire in Kos" },
    { property: "og:description", content: "One transparent final price. No surprises at the counter." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

type Lang = "en" | "el";
const copy = {
  en: {
    book: "Reserve now", eyebrow: "Honest, all-in", titleA: "€35 a day.", titleB: "Final price.", titleC: "Nothing else at checkout.",
    intro: "A small local fleet of 12 cars in Kos. Full insurance, second driver, airport delivery and full-to-full fuel are already included.", calcCta: "See your real cost", fleetCta: "Browse the fleet",
    calc: "Calculate your real cost", calcIntro: "Choose your rental length and compare the whole cost—not just the headline.", days: "Days", final: "Final price", typical: "Typical low offer", headline: "Headline only", included: "incl.",
    items: ["Full insurance, no excess", "Second driver", "Airport delivery", "Fuel full-to-full"], extra: "usually charged separately", rate: "Headline rate", insurance: "Insurance", delivery: "Delivery & second driver", fees: "Fuel & fees",
    saving: (d:number,s:number) => `Meltemi is €${s} less for ${d} days — and you know the exact total up front.`, fleet: "Four cars, one kind of price", fleetNote: "Daily final prices — everything below included.", perDay: "/day", allIn: "final — all included",
    categories: ["City", "Economy", "Family", "Comfort"], receipt: "What’s in your €35", pay: "You pay at the counter", why: "Why Meltemi",
    reasons: [["You pay the number you saw", "No insurance surprise, delivery fee or fuel markup. Your quote is your receipt."], ["Local company in Kos", "Twelve cars, one local team. You speak with us directly, not a call centre."], ["Pick up and drive", "A clean car delivered to the airport or your stay, with no card hold."]],
    request: "Reserve now", requestText: "Tell us your dates and we’ll confirm the exact total—the same number you’ll pay.", name: "Full name", email: "Email", pickup: "Pickup date", return: "Return date", category: "Car category", send: "Send request", sent: "Thank you. Your request is ready and we’ll be in touch.", contact: "Contact", point: "Pickup point", pointV: "Kos Island Airport (KGS), Greece", support: "Support", supportV: "Available 24/7", tagline: "Final price, every time. Kos, Greece.", formError: "Please check all fields and make sure the return date is after pickup.",
  },
  el: {
    book: "Κάνε κράτηση", eyebrow: "Τίμια, όλα μέσα", titleA: "35€ την ημέρα.", titleB: "Τελική τιμή.", titleC: "Τίποτα άλλο στο ταμείο.",
    intro: "Μικρός τοπικός στόλος 12 αυτοκινήτων στην Κω. Πλήρης ασφάλεια, 2ος οδηγός, παράδοση αεροδρομίου και καύσιμα full-to-full περιλαμβάνονται ήδη.", calcCta: "Δείτε το πραγματικό κόστος", fleetCta: "Δείτε τον στόλο",
    calc: "Υπολογίστε το πραγματικό κόστος", calcIntro: "Επιλέξτε ημέρες και συγκρίνετε ολόκληρο το κόστος — όχι μόνο την τιμή-κράχτη.", days: "Ημέρες", final: "Τελική τιμή", typical: "Τυπική φθηνή προσφορά", headline: "Μόνο αρχική τιμή", included: "μέσα",
    items: ["Πλήρης ασφάλεια χωρίς απαλλαγή", "2ος οδηγός", "Παράδοση αεροδρομίου", "Καύσιμα full-to-full"], extra: "συνήθως χρεώνεται ξεχωριστά", rate: "Αρχική τιμή", insurance: "Ασφάλεια", delivery: "Παράδοση & 2ος οδηγός", fees: "Καύσιμα & τέλη",
    saving: (d:number,s:number) => `Με τη Meltemi πληρώνετε €${s} λιγότερα για ${d} ημέρες — και ξέρετε το σύνολο από πριν.`, fleet: "Τέσσερα αυτοκίνητα, μία ξεκάθαρη τιμή", fleetNote: "Τελικές τιμές ανά ημέρα — όλα τα παρακάτω μέσα.", perDay: "/ημέρα", allIn: "τελική — όλα μέσα",
    categories: ["Πόλης", "Οικονομικό", "Οικογενειακό", "Άνεσης"], receipt: "Τι περιλαμβάνουν τα 35€", pay: "Πληρώνετε στο ταμείο", why: "Γιατί Meltemi",
    reasons: [["Πληρώνετε την τιμή που είδατε", "Χωρίς έκπληξη στην ασφάλεια, χρέωση παράδοσης ή καπέλο στα καύσιμα."], ["Τοπική επιχείρηση στην Κω", "Δώδεκα αυτοκίνητα, μία τοπική ομάδα. Μιλάτε απευθείας μαζί μας."], ["Παραλαβή και φύγατε", "Καθαρό αυτοκίνητο στο αεροδρόμιο ή το κατάλυμά σας, χωρίς δέσμευση κάρτας."]],
    request: "Κάντε την κράτησή σας", requestText: "Πείτε μας τις ημερομηνίες και θα επιβεβαιώσουμε το ακριβές σύνολο που θα πληρώσετε.", name: "Ονοματεπώνυμο", email: "Email", pickup: "Ημερομηνία παραλαβής", return: "Ημερομηνία επιστροφής", category: "Κατηγορία αυτοκινήτου", send: "Αποστολή αιτήματος", sent: "Ευχαριστούμε. Το αίτημά σας καταχωρήθηκε και θα επικοινωνήσουμε μαζί σας.", contact: "Επικοινωνία", point: "Σημείο παραλαβής", pointV: "Αεροδρόμιο Κω (KGS), Ελλάδα", support: "Υποστήριξη", supportV: "Διαθέσιμη 24/7", tagline: "Τελική τιμή, κάθε φορά. Κως, Ελλάδα.", formError: "Ελέγξτε όλα τα πεδία και βεβαιωθείτε ότι η επιστροφή είναι μετά την παραλαβή.",
  },
};

const cars = [
  { name: "Suzuki Alto", price: 28, image: cityImage }, { name: "Hyundai i10", price: 32, image: economyImage },
  { name: "Renault Captur", price: 35, image: familyImage }, { name: "Toyota Corolla", price: 42, image: comfortImage },
];
const requestSchema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(255), pickup: z.string().min(1), returnDate: z.string().min(1), category: z.string().min(1) }).refine((v) => v.returnDate > v.pickup);

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [days, setDays] = useState(7);
  const [status, setStatus] = useState<"idle"|"error"|"sent">("idle");
  const t = copy[lang];
  const meltemi = days * 35, typical = days * 48, saving = typical - meltemi;
  const setSafeDays = (value:number) => setDays(Math.max(1, Math.min(60, value || 1)));
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

  return <main lang={lang} className="page-glow min-h-screen text-foreground">
    <header className="sticky top-0 z-40 mx-auto max-w-6xl px-4 sm:px-5"><div className="glass-panel mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-4 py-3 sm:mt-4 sm:px-5">
      <a href="#top" className="min-w-0 leading-none"><span className="block truncate font-display text-lg font-semibold sm:text-xl">Meltemi Rentals</span><span className="mt-1 block truncate text-[11px] text-muted-foreground">Kos · Greece · 12 vehicles</span></a>
      <div className="flex shrink-0 items-center gap-2"><div aria-label="Language" className="flex rounded-full bg-paper-deep p-1 text-xs font-medium">
        {(["en","el"] as Lang[]).map((code) => <Button key={code} variant="ghost" size="sm" onClick={() => setLang(code)} aria-pressed={lang===code} className={lang===code ? "h-7 rounded-full bg-card px-3 shadow-sm hover:bg-card" : "h-7 rounded-full px-3"}>{code.toUpperCase()}</Button>)}
      </div><Button asChild variant="deep" className="hidden sm:inline-flex"><a href="#request">{t.book}</a></Button></div>
    </div></header>

    <section id="top" className="mx-auto max-w-6xl px-5 pb-7 pt-10"><div className="grid gap-7 lg:grid-cols-12 lg:items-center">
      <div className="reveal lg:col-span-7"><p className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-brand-deep"><span className="size-1.5 rounded-full bg-highlight" />{t.eyebrow}</p>
        <h1 className="mt-5 font-display text-5xl font-semibold leading-none sm:text-6xl">{t.titleA} <span className="text-primary">{t.titleB}</span> {t.titleC}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t.intro}</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="hero" size="lg"><a href="#calculator">{t.calcCta}<ChevronRight /></a></Button><Button asChild variant="outline" size="lg"><a href="#fleet">{t.fleetCta}</a></Button></div>
      </div><div className="reveal lg:col-span-5"><img src={heroImage} width={1024} height={1280} fetchPriority="high" alt="Rental car on a coastal road in Kos" className="aspect-[4/5] w-full rounded-xl object-cover shadow-xl" /></div>
    </div></section>

    <section id="calculator" className="mx-auto max-w-6xl px-5 py-8"><div className="glass-panel reveal rounded-2xl p-5 sm:p-8"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><h2 className="font-display text-2xl font-semibold sm:text-3xl">{t.calc}</h2><p className="mt-2 text-sm text-muted-foreground">{t.calcIntro}</p></div><div className="shrink-0"><span className="mb-1 block text-xs font-medium text-muted-foreground">{t.days}</span><div className="flex items-center rounded-lg bg-card p-1 shadow-sm"><Button aria-label="Decrease days" variant="ghost" size="icon" onClick={()=>setSafeDays(days-1)}><Minus /></Button><input aria-label={t.days} className="w-12 bg-transparent text-center font-mono text-lg outline-none" type="number" min="1" max="60" value={days} onChange={(e)=>setSafeDays(Number(e.target.value))}/><Button aria-label="Increase days" variant="ghost" size="icon" onClick={()=>setSafeDays(days+1)}><Plus /></Button></div></div></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2"><PriceBox title="Meltemi" badge={t.final} total={meltemi} subtitle={`${days} × €35 · all-in`} rows={t.items.map(i=>[i,t.included])} featured /><PriceBox title={t.typical} badge={t.headline} total={typical} subtitle={`${days} × ~€48`} rows={[[t.rate,`€${days*8}`],[t.insurance,`€${days*18}`],[t.delivery,`€${days*8}`],[t.fees,`€${days*14}`]]} /></div>
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-brand-deep px-4 py-3 text-sm font-medium text-primary-foreground"><span className="mt-1 size-2 shrink-0 rounded-full bg-highlight" />{t.saving(days,saving)}</div>
    </div></section>

    <section id="fleet" className="mx-auto max-w-6xl px-5 py-8"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><h2 className="font-display text-2xl font-semibold sm:text-3xl">{t.fleet}</h2><p className="hidden text-sm text-muted-foreground sm:block">{t.fleetNote}</p></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cars.map((car,i)=><article key={car.name} className="glass-panel reveal rounded-xl p-4"><img loading="lazy" src={car.image} width={816} height={816} alt={`${car.name} rental car`} className="aspect-[4/3] w-full rounded-lg object-cover"/><p className="mt-4 text-xs font-medium uppercase text-primary">{t.categories[i]}</p><h3 className="font-display text-lg font-semibold">{car.name}</h3><p className="mt-2 font-mono text-2xl">€{car.price}<span className="text-sm text-muted-foreground">{t.perDay}</span></p><p className="text-xs text-muted-foreground">{t.allIn}</p></article>)}</div></section>

    <section className="mx-auto max-w-6xl px-5 py-8"><div className="grid gap-6 lg:grid-cols-12"><div className="lg:col-span-7"><p className="text-xs font-medium uppercase text-primary">{t.receipt}</p><div className="mt-4 rounded-xl bg-sand p-5 shadow-sm sm:p-6"><div className="flex justify-between border-b border-dashed border-foreground/20 pb-3 font-mono text-xs text-muted-foreground sm:text-sm"><span>MELTEMI RENTALS · KOS</span><span>ALL-IN</span></div><ul className="mt-3 divide-y divide-dashed divide-foreground/15">{[...t.items, lang==="en"?"24/7 local support":"24/7 τοπική υποστήριξη",lang==="en"?"No card hold":"Χωρίς δέσμευση κάρτας"].map(item=><li key={item} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3 text-sm"><span>{item}</span><span className="max-w-32 text-right text-xs text-muted-foreground">{t.extra}</span></li>)}</ul><div className="mt-3 flex items-baseline justify-between border-t-2 border-foreground pt-3"><strong className="font-display">{t.pay}</strong><span className="font-mono text-2xl">€35<span className="text-sm text-muted-foreground">{t.perDay}</span></span></div></div></div>
      <div className="lg:col-span-5"><p className="text-xs font-medium uppercase text-primary">{t.why}</p><div className="mt-4 space-y-4">{t.reasons.map((reason)=><div key={reason[0]} className="glass-panel rounded-xl p-5"><div className="flex gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-highlight"><Check className="size-4" /></span><div><h3 className="font-display text-lg font-semibold">{reason[0]}</h3><p className="mt-1 text-sm text-muted-foreground">{reason[1]}</p></div></div></div>)}</div></div></div></section>

    <section id="request" className="mx-auto max-w-6xl px-5 py-8"><div className="grid gap-6 lg:grid-cols-12"><div className="lg:col-span-7"><h2 className="font-display text-2xl font-semibold sm:text-3xl">{t.request}</h2><p className="mt-2 text-sm text-muted-foreground">{t.requestText}</p><form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2"><Field name="name" label={t.name} type="text" wide/><Field name="email" label={t.email} type="email" wide/><Field name="pickup" label={t.pickup} type="date"/><Field name="returnDate" label={t.return} type="date"/><label className="sm:col-span-2"><span className="text-sm font-medium text-muted-foreground">{t.category}</span><select name="category" required className="mt-1.5 w-full rounded-lg bg-card px-3.5 py-3 text-sm shadow-sm outline-none ring-1 ring-foreground/10 focus:ring-2 focus:ring-primary">{cars.map((car,i)=><option key={car.name}>{t.categories[i]} — {car.name} (€{car.price}{t.perDay})</option>)}</select></label><div className="sm:col-span-2"><Button type="submit" variant="deep" size="lg">{t.send}<ChevronRight /></Button>{status!=="idle"&&<p role="status" className={`mt-3 text-sm ${status==="error"?"text-destructive":"text-primary"}`}>{status==="error"?t.formError:t.sent}</p>}</div></form></div>
      <aside className="glass-panel h-full rounded-xl p-6 lg:col-span-5"><p className="text-xs font-medium uppercase text-primary">{t.contact}</p><dl className="mt-5 space-y-4 text-sm"><div><dt className="text-xs text-muted-foreground">Phone / WhatsApp</dt><dd className="font-mono">+30 22420 00000</dd></div><div><dt className="text-xs text-muted-foreground">Email</dt><dd className="font-mono">hello@meltemikos.gr</dd></div><div><dt className="text-xs text-muted-foreground">{t.point}</dt><dd>{t.pointV}</dd></div><div><dt className="text-xs text-muted-foreground">{t.support}</dt><dd>{t.supportV}</dd></div></dl></aside></div></section>

    <footer className="mx-auto max-w-6xl px-5 pb-10 pt-4"><div className="rounded-xl bg-brand-deep p-6 text-primary-foreground"><div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="font-display text-lg font-semibold">Meltemi Rentals</p><p className="mt-1 text-sm opacity-70">{t.tagline}</p></div><p className="break-all font-mono text-xs opacity-70">KGS Airport · +30 22420 00000 · hello@meltemikos.gr</p></div><div className="mt-5 flex justify-between border-t border-primary-foreground/15 pt-4 text-xs opacity-60"><span>© 2026 Meltemi Rentals</span><span>EN / ΕΛ</span></div></div></footer>
  </main>;
}

function PriceBox({ title,badge,total,subtitle,rows,featured=false }:{title:string;badge:string;total:number;subtitle:string;rows:string[][];featured?:boolean}) { return <div className={`rounded-xl bg-card p-5 shadow-sm ${featured?"ring-2 ring-primary/30":"ring-1 ring-foreground/5"}`}><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"><strong className="truncate font-display text-lg">{title}</strong><span className={`rounded-full px-2.5 py-1 text-xs ${featured?"bg-highlight/25 text-brand-deep":"bg-paper-deep text-muted-foreground"}`}>{badge}</span></div><p className="mt-3 font-mono text-4xl">€{total}</p><p className="mt-1 text-xs text-muted-foreground">{subtitle}</p><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{rows.map(([a,b])=><li key={a} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"><span>{a}</span><span className="font-mono text-xs">{b}</span></li>)}</ul></div> }
function Field({name,label,type,wide=false}:{name:string;label:string;type:string;wide?:boolean}) { return <label className={wide?"sm:col-span-2":""}><span className="text-sm font-medium text-muted-foreground">{label}</span><input name={name} type={type} required maxLength={type==="text"?100:255} className="mt-1.5 w-full rounded-lg bg-card px-3.5 py-3 text-sm shadow-sm outline-none ring-1 ring-foreground/10 focus:ring-2 focus:ring-primary"/></label> }