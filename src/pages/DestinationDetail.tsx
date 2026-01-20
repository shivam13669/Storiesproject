import type { ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Destination,
  DestinationPackage,
  findPackageAcrossDestinations,
  getDestinationBySlug,
  getPackageBySlug,
} from "@/data/destinations";
import { useCurrency, parsePrice, parseINRStringToNumber } from "@/context/CurrencyContext";
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
  X,
  Lightbulb,
  BedSingle,
  Car,
  List,
} from "lucide-react";

const DestinationDetailPage = () => {
  const { slug, packageSlug } = useParams<{ slug: string; packageSlug?: string }>();
  const { formatPrice } = useCurrency();

  let destination = slug ? getDestinationBySlug(slug) : undefined;
  let travelPackage =
    destination && packageSlug
      ? getPackageBySlug(destination.slug, packageSlug)
      : undefined;

  if ((!destination || !travelPackage) && packageSlug) {
    const fallback = findPackageAcrossDestinations(packageSlug);
    if (fallback) {
      destination = fallback.destination;
      travelPackage = fallback.travelPackage;
    }
  }

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  if (!travelPackage) {
    travelPackage = destination.packages[0];
  }

  const galleryImages = buildGalleryImages(destination, travelPackage);
  const dayCount = getDayCount(travelPackage);
  const itinerary = createItinerary(destination, travelPackage, galleryImages, dayCount);
  const inclusions = createInclusions(destination, travelPackage);
  const exclusions = createExclusions(destination);
  const knowBefore = createKnowBefore(destination);
  const cancellationPolicy = createCancellationPolicy();
  const faqs = createFaqs(destination, travelPackage);
  const overview = createOverview(destination, travelPackage);
  const savings = calculateSavings(travelPackage.price, travelPackage.oldPrice);

  const primaryImage = galleryImages[0] ?? destination.heroImage;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pb-24 pt-16">
        <section className="relative">
          <div className="h-96 w-full overflow-hidden rounded-2xl">
            <img
              src={primaryImage}
              alt={`${destination.name} expedition landscape`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 -mt-48 relative z-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
              <div className="lg:mt-[1.125rem]">
                <Button asChild variant="outline" size="sm" className="mb-6">
                  <Link to="/destinations" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to destinations
                  </Link>
                </Button>

                <div className="rounded-2xl bg-white p-8 shadow-xl">
                  <p className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
                    {destination.tagline}
                  </p>
                  <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                    {travelPackage.name}
                  </h1>

                  <p className="mt-6 text-base text-foreground/80 leading-relaxed">
                    {travelPackage.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      <Calendar className="h-4 w-4" /> {travelPackage.duration}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      <MapPin className="h-4 w-4" /> {destination.region}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      <Compass className="h-4 w-4" /> {destination.quickFacts.travelStyle}
                    </span>
                  </div>
                </div>
              </div>

              <aside className="lg:sticky lg:top-24 lg:-mt-20">
                <div className="rounded-2xl bg-white p-8 shadow-xl">
                  <p className="text-sm font-semibold text-muted-foreground">Starting from</p>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-primary">
                      {formatPrice(parsePrice(travelPackage.price) ?? 0, { fromCurrency: "INR" })}
                    </span>
                    {travelPackage.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(parsePrice(travelPackage.oldPrice) ?? 0, { fromCurrency: "INR" })}
                      </span>
                    )}
                  </div>
                  {savings !== undefined && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                      Save {formatPrice(savings, { fromCurrency: "INR" })}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{formatRating(travelPackage.rating)} · {travelPackage.reviews} reviews</span>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Button asChild variant="adventure" className="w-full">
                      <Link to="/contact">Send enquiry</Link>
                    </Button>
                    {travelPackage.itineraryUrl && (
                      <Button asChild variant="outline" className="w-full">
                        <a href={travelPackage.itineraryUrl} target="_blank" rel="noreferrer">
                          Download detailed PDF
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <ShieldCheck className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                      <span>24/7 support team on ground</span>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                      <span>Quick response within 12 hours</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-14 px-4">
          <GalleryGrid images={galleryImages} destinationName={destination.name} />
        </section>

        <section className="container mx-auto mt-16 px-4">
          <div className="grid gap-10 lg:grid-cols-[1.8fr_minmax(0,1fr)]">
            <Card className="border border-border/70 bg-card/90 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Trip overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                {overview.map((paragraph) => (
                  <p key={paragraph} className="text-base text-foreground/90">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card/90 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Why travellers love it</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {travelPackage.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto mt-16 px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeaturePill
              icon={<Clock className="h-5 w-5" />}
              title="Balanced pacing"
              description="Slow mornings and acclimatisation breaks woven into every high-altitude day."
            />
            <FeaturePill
              icon={<Users className="h-5 w-5" />}
              title="Small groups"
              description="Intimate batches of 12 guests per departure for flexible experiences."
            />
            <FeaturePill
              icon={<Compass className="h-5 w-5" />}
              title="Expert leads"
              description="Local storytellers and specialist guides narrate culture, cuisine, and legends."
            />
            <FeaturePill
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Safety first"
              description="Daily health checks, oxygen support, and detailed briefings before each drive."
            />
          </div>
        </section>

        <section className="container mx-auto mt-20 px-4">

          <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="bg-transparent p-0 gap-3">
              <TabsTrigger value="itinerary" className="rounded-lg bg-muted shadow-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Calendar className="mr-2 h-4 w-4" /> Itinerary
              </TabsTrigger>
              <TabsTrigger value="summary" className="rounded-lg bg-muted shadow-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <List className="mr-2 h-4 w-4" /> Summarised View
              </TabsTrigger>
              <TabsTrigger value="activities" className="rounded-lg bg-muted shadow-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Lightbulb className="mr-2 h-4 w-4" /> Activities
              </TabsTrigger>
              <TabsTrigger value="stay" className="rounded-lg bg-muted shadow-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <BedSingle className="mr-2 h-4 w-4" /> Stay
              </TabsTrigger>
              <TabsTrigger value="transfers" className="rounded-lg bg-muted shadow-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Car className="mr-2 h-4 w-4" /> Transfers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary" className="mt-6">
              <Accordion type="multiple" className="rounded-3xl border border-border/70 bg-card/90 shadow-lg backdrop-blur">
                {itinerary.map((dayItem) => (
                  <AccordionItem key={dayItem.day} value={`day-${dayItem.day}`} className="border-border/60">
                    <AccordionTrigger className="px-6 text-left text-base font-semibold">
                      <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {dayItem.day}
                          </span>
                          <div className="text-left">
                            <p className="text-sm uppercase tracking-wide text-muted-foreground">Day {dayItem.day}</p>
                            <p className="text-base font-semibold text-foreground">{dayItem.title}</p>
                          </div>
                        </div>
                        <span className="hidden items-center gap-1 text-xs font-medium text-muted-foreground sm:flex">
                          View details
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6">
                      <div className="grid gap-8 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <p className="text-foreground/90 leading-relaxed">{dayItem.description}</p>
                          <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                              Experiences
                            </h3>
                            <ul className="mt-3 space-y-2">
                              {dayItem.activities.map((activity) => (
                                <li key={activity} className="flex items-start gap-2 text-foreground/90">
                                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Stay
                            </p>
                            <p className="mt-1 text-sm text-foreground/90">{dayItem.stay}</p>
                          </div>
                          <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Meals included
                            </p>
                            <p className="mt-1 text-sm text-foreground/90">{dayItem.meals.join(", ")}</p>
                          </div>
                          <div className="overflow-hidden rounded-2xl border border-border/60 shadow">
                            <img
                              src={dayItem.image}
                              alt={`${dayItem.title} - ${destination.name}`}
                              className="h-40 w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="summary" className="mt-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {itinerary.map((d) => (
                  <div key={d.day} className="rounded-xl border border-border/60 bg-card/90 p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Day {d.day}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{d.title}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activities" className="mt-6">
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from(new Set(itinerary.flatMap((d) => d.activities))).map((a) => (
                  <li key={a} className="rounded-xl border border-border/60 bg-card/90 p-3 text-sm text-foreground/90">
                    {a}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="stay" className="mt-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {itinerary.map((d) => (
                  <div key={d.day} className="rounded-xl border border-border/60 bg-card/90 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Day {d.day}</p>
                    <p className="mt-1 text-sm text-foreground/90">{d.stay}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transfers" className="mt-6">
              <ul className="space-y-2 text-sm text-foreground/90">
                <li className="rounded-xl border border-border/60 bg-card/90 p-3">Private airport pickup and drop</li>
                <li className="rounded-xl border border-border/60 bg-card/90 p-3">All intercity and local transfers as per itinerary</li>
                <li className="rounded-xl border border-border/60 bg-card/90 p-3">Permits and tolls included wherever applicable</li>
              </ul>
            </TabsContent>
          </Tabs>
        </section>

        <section className="container mx-auto mt-20 px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border border-border/70 bg-card/90 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Inclusions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm text-foreground/90">
                  {inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 rounded-full bg-emerald-100 p-1.5 text-emerald-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card/90 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Exclusions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm text-foreground/90">
                  {exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 rounded-full bg-red-100 p-1.5 text-red-600">
                        <X className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto mt-20 px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border border-border/70 bg-card/90 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Know before you go</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm text-foreground/90">
                  {knowBefore.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 rounded-full bg-primary/10 p-1.5 text-primary">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card/90 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Cancellation policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm text-foreground/90">
                  {cancellationPolicy.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 rounded-full bg-primary/10 p-1.5 text-primary">
                        <Clock className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto mt-20 px-4">
          <Card className="border border-border/70 bg-card/90 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Frequently asked questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question} className="border-border/70">
                    <AccordionTrigger className="text-left text-sm font-semibold text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="container mx-auto mt-20 px-4">
          <Card className="bg-gradient-to-br from-primary/10 via-adventure-forest/10 to-transparent border border-border/60 shadow-lg">
            <CardContent className="grid gap-6 px-6 py-10 lg:grid-cols-[2fr_minmax(0,1fr)] lg:items-center">
              <div>
                <h3 className="text-3xl font-semibold">Plan your {destination.name} expedition</h3>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                  Share your travel month and group size, and our specialists will craft a customised version of this programme within 12 working hours.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="default" className="text-sm font-semibold">
                    <Link to="/contact">Talk to a trip designer</Link>
                  </Button>
                  {travelPackage.itineraryUrl && (
                    <Button asChild variant="outline">
                      <a href={travelPackage.itineraryUrl} target="_blank" rel="noreferrer">
                        Download itinerary PDF
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <div className="rounded-3xl bg-background/80 p-6 text-sm text-muted-foreground border border-border/60">
                <p className="font-semibold uppercase tracking-wide text-foreground">Need immediate help?</p>
                <p className="mt-3 text-foreground/90">Call: <a href="tel:+916205129118" className="hover:underline">+916205129118</a>, <a href="tel:+916283620764" className="hover:underline">+916283620764</a></p>
                <p className="mt-2 text-foreground/90">Email: <a href="mailto:contact@storiesbyfoot.com" className="hover:underline">contact@storiesbyfoot.com</a>, <a href="mailto:storiesbyfoot@gmail.com" className="hover:underline">storiesbyfoot@gmail.com</a></p>
                <p className="mt-4 text-muted-foreground">We operate Monday to Saturday, 10:00 – 18:00 IST.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  activities: string[];
  stay: string;
  meals: string[];
  image: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const destinationGalleryMap: Record<string, string[]> = {
  ladakh: [
    "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f99?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1526481280695-3c4693df8ced?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  ],
  tawang: [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1558180079-7f0f7180a5ec?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1509098681029-b45e9c845022?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1600&q=80",
  ],
  bhutan: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1559112094-4137e19ff3a5?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1494475673543-6a6a27143b22?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1600&q=80",
  ],
  meghalaya: [
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1545652711-491a01fb5d28?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
  ],
  nepal: [
    "https://images.unsplash.com/photo-1509644851169-51ebdcca9864?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1563144760-3da8c746b16c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1460522324493-a0e90ff22a91?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1549989476-69a92fa57c4e?auto=format&fit=crop&w=1600&q=80",
  ],
  zanskar: [
    "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1493815793585-d94ccbc86df0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1516131206008-dd041a9764fd?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1542401886-65d27afda266?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1486870591958-9b9d7d1dda99?auto=format&fit=crop&w=1600&q=80",
  ],
};

const buildGalleryImages = (destination: Destination, travelPackage: DestinationPackage) => {
  const additionalImages = destinationGalleryMap[destination.slug] ?? [];
  const baseImages = [travelPackage.image, destination.heroImage, ...additionalImages].filter(
    (image): image is string => Boolean(image)
  );

  return Array.from(new Set(baseImages));
};

const getDayCount = (travelPackage: DestinationPackage) => {
  const duration = (travelPackage.duration || "").toUpperCase();

  // Pattern like "5N/6D" -> return days (6)
  const nd = duration.match(/(\d+)\s*N\s*\/?\s*(\d+)\s*D/);
  if (nd) {
    const days = Number(nd[2]);
    if (!Number.isNaN(days) && days > 0) return days;
  }

  // Pattern like "6D" or "6 DAYS"
  const dOnly = duration.match(/(\d+)\s*D(AYS)?/);
  if (dOnly) {
    const days = Number(dOnly[1]);
    if (!Number.isNaN(days) && days > 0) return days;
  }

  // Pattern like "5N" -> assume days = nights + 1
  const nOnly = duration.match(/(\d+)\s*N(IGHTS)?/);
  if (nOnly) {
    const nights = Number(nOnly[1]);
    const days = nights + 1;
    if (!Number.isNaN(days) && days > 0) return days;
  }

  // Fallback based on highlights
  return Math.max(4, travelPackage.highlights.length + 2);
};

const createItinerary = (
  destination: Destination,
  travelPackage: DestinationPackage,
  galleryImages: string[],
  dayCount: number
): ItineraryDay[] => {
  const itinerary: ItineraryDay[] = [];
  const highlights = travelPackage.highlights.length
    ? travelPackage.highlights
    : [destination.tagline];

  const fallbackImages = galleryImages.length ? galleryImages : [destination.heroImage];
  const arrivalImage = fallbackImages[0] ?? destination.heroImage;

  itinerary.push({
    day: 1,
    title: `Arrival in ${destination.name}`,
    description: `Touch down at ${destination.quickFacts.startPoint} where our local crew welcomes you with a slow-paced orientation. Ease into the altitude with gentle walks, warm brews, and a sunset briefing that sets the tone for the journey ahead.`,
    activities: [
      `Private airport transfer from ${destination.quickFacts.startPoint}`,
      "Welcome briefing with expedition leader",
      "Sunset acclimatisation walk with local stories",
    ],
    stay: `Handpicked stay in ${destination.name} with acclimatisation support`,
    meals: ["Dinner"],
    image: arrivalImage,
  });

  for (let index = 2; index < dayCount; index += 1) {
    const highlight = highlights[(index - 2) % highlights.length];
    const image = fallbackImages[index % fallbackImages.length] ?? destination.heroImage;

    itinerary.push({
      day: index,
      title: highlight,
      description: `Spend day ${index} diving deep into ${highlight.toLowerCase()}. Expert guides pace the experience to balance adventure with essential rest stops, ensuring you connect meaningfully with ${destination.name}'s landscapes and communities.`,
      activities: [
        `Guided experience: ${highlight}`,
        "Curated local interactions and storytelling sessions",
        "Flex hours for personal exploration and mindful rest",
      ],
      stay: "Curated boutique stay close to the day's experiences",
      meals: ["Breakfast", "Dinner"],
      image,
    });
  }

  const departureImage = fallbackImages[(dayCount + 1) % fallbackImages.length] ?? destination.heroImage;

  itinerary.push({
    day: dayCount,
    title: `Departure from ${destination.name}`,
    description: `Wake up to one last sunrise before an unhurried checkout. After breakfast, our team drops you back to ${destination.quickFacts.startPoint} with ample buffer time, wrapping up the expedition on a relaxed note.`,
    activities: [
      "Breakfast with farewell views",
      `Private transfer to ${destination.quickFacts.startPoint}`,
      "Journey concludes with on-trip media shared post departure",
    ],
    stay: "Departure day – no stay arranged",
    meals: ["Breakfast"],
    image: departureImage,
  });

  return itinerary;
};

const createInclusions = (destination: Destination, travelPackage: DestinationPackage) => [
  `Accommodation on twin-sharing basis for ${travelPackage.duration.toLowerCase()}.`,
  "Daily breakfast and chef-curated dinners on travel days, with picnic lunches on highland drives.",
  `All surface transfers in private vehicles from ${destination.quickFacts.startPoint}.`,
  "Expedition leader, local cultural specialist, and dedicated support crew throughout.",
  `All permits, restricted area permissions, and monastery entry passes within ${destination.region}.`,
  "Emergency oxygen support, medical kit, and satellite communication backup where required.",
];

const createExclusions = (destination: Destination) => [
  `Flights or trains to and from ${destination.quickFacts.startPoint}.`,
  "Lunches on travel days unless specified, and personal beverages.",
  "Travel insurance, medical expenses, or evacuation beyond inclusions.",
  "Camera fees, tips, and personal purchases such as souvenirs.",
  "Optional adventure activities not mentioned in the inclusions.",
];

const createKnowBefore = (destination: Destination) => [
  `${destination.quickFacts.travelStyle} journeys demand good fitness; begin light cardio and breathing exercises at least three weeks prior.`,
  `${destination.name} weather can swing rapidly—layered clothing, gloves, and rain protection are essential.`,
  "Carry original government-issued photo ID for each traveller for permits and hotel check-ins.",
  "Network connectivity is limited outside major towns; inform family about low-connectivity days.",
  "Stay hydrated and follow acclimatisation guidelines shared by the expedition leader.",
];

const createCancellationPolicy = () => [
  "30 days before departure: 25% of the total trip cost is chargeable.",
  "15–30 days before departure: 50% of the total trip cost is chargeable.",
  "0–15 days before departure: 100% cancellation charges apply.",
  "Force majeure events may necessitate rerouting; refunds are guided by partner policies.",
];

const createFaqs = (destination: Destination, travelPackage: DestinationPackage): FaqItem[] => [
  {
    question: `Is this itinerary suitable for first-time travellers to ${destination.name}?`,
    answer:
      `Absolutely. The programme includes acclimatisation walks, oxygen support, and buffer days so first-time travellers can enjoy ${destination.name} comfortably.`,
  },
  {
    question: "Are flights included in the package price?",
    answer:
      "Flights are excluded so you can pick routes and airlines that work best for your schedule. Our team is happy to recommend flight options based on your city of origin.",
  },
  {
    question: "What is the usual group size for this departure?",
    answer:
      "We curate departures of up to 12 guests. For private departures, we can customise pacing, stays, and activities entirely to your group's preferences.",
  },
  {
    question: `Can the ${travelPackage.name} itinerary be customised for families?`,
    answer:
      "Yes, family-friendly pacing, room configurations, and activity swaps can be arranged with advance notice. Share traveller ages and interests when you enquire.",
  },
];

const createOverview = (destination: Destination, travelPackage: DestinationPackage) => [
  `${travelPackage.description} Our team balances each day to deliver signature experiences without compromising acclimatisation or comfort.`,
  `Expect intimate insights into ${destination.name} as local storytellers unlock cuisine, culture, and legends while the support crew handles logistics in the background.`,
  `With premium vehicles, vetted stays, and responsive trip designers, this expedition keeps you focused on celebrating ${destination.region} rather than managing the moving pieces.`,
];

const calculateSavings = (price: string, oldPrice?: string) => {
  if (!oldPrice) return undefined;
  const currentValue = parseINRStringToNumber(price);
  const oldValue = parseINRStringToNumber(oldPrice);
  if (!currentValue || !oldValue || oldValue <= currentValue) return undefined;
  return oldValue - currentValue; // returns INR delta; UI will format in selected currency
};

const formatRating = (rating: number) =>
  (Number.isFinite(rating) ? rating.toFixed(1) : rating).toString();

const GalleryGrid = ({ images, destinationName }: { images: string[]; destinationName: string }) => {
  if (!images.length) {
    return null;
  }

  const [primary, ...rest] = images;

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_minmax(0,1fr)]">
      <div className="relative h-80 overflow-hidden rounded-3xl sm:h-96">
        <img src={primary} alt={`${destinationName} primary view`} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide">Journey snapshots</p>
          <p className="text-xs text-white/80">Handpicked frames from recent departures</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {rest.slice(0, 4).map((image) => (
          <div key={image} className="relative h-36 overflow-hidden rounded-2xl sm:h-44">
            <img src={image} alt={`${destinationName} experience`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturePill = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <div className="rounded-3xl border border-border/70 bg-card/90 p-6 shadow-lg backdrop-blur">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
  </div>
);

const HeroStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-white/10 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{label}</p>
    <p className="mt-1 text-lg font-semibold text-white">{value}</p>
  </div>
);

export default DestinationDetailPage;
