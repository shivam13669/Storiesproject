import { useLayoutEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { destinationIconMap, destinations } from "@/data/destinations";
import { ArrowRight, Bike, Calendar, MapPin, MapPinned, Star } from "lucide-react";
import { useCurrency, parsePrice } from "@/context/CurrencyContext";
import { FilterSidebar, type FilterState } from "@/components/FilterSidebar";

const DestinationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  useLayoutEffect(() => {
    if (location.pathname === "/destinations") {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location.key, location.pathname]);

  // Read the 'dest' query parameter to set initial destination
  const searchParams = new URLSearchParams(location.search);
  const destParam = searchParams.get("dest");
  const initialSlug = destParam && destinations.some((d) => d.slug === destParam)
    ? destParam
    : "all";

  const [activeSlug, setActiveSlug] = useState(initialSlug);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "All",
    priceRange: "All",
    minPrice: 0,
    maxPrice: 100000,
    rating: "All",
  });

  const isShowingAll = activeSlug === "all";
  const activeDestination = useMemo(
    () => destinations.find((d) => d.slug === activeSlug) ?? destinations[0],
    [activeSlug]
  );

  const allPackages = useMemo(() => {
    return destinations.flatMap(dest =>
      dest.packages.map(pkg => ({ ...pkg, destinationSlug: dest.slug, destinationName: dest.name, destinationRegion: dest.region }))
    );
  }, []);

  const basePackages = isShowingAll ? allPackages : activeDestination.packages.map(pkg => ({
    ...pkg,
    destinationSlug: activeDestination.slug,
    destinationName: activeDestination.name,
    destinationRegion: activeDestination.region
  }));

  const displayPackages = useMemo(() => {
    return basePackages.filter(pkg => {
      // Search filter
      const searchLower = filters.search.toLowerCase();
      if (searchLower && !pkg.name.toLowerCase().includes(searchLower) && !pkg.description.toLowerCase().includes(searchLower)) {
        return false;
      }

      // Category filter
      if (filters.category !== "All" && pkg.categories) {
        if (!pkg.categories.includes(filters.category)) {
          return false;
        }
      }

      // Price range filter (dropdown)
      if (filters.priceRange !== "All") {
        const priceStr = pkg.price.replace(/[₹,]/g, "");
        const price = parseInt(priceStr);

        if (filters.priceRange === "₹0 - ₹25,000") {
          if (price > 25000) return false;
        } else if (filters.priceRange === "₹25,000 - ₹40,000") {
          if (price < 25000 || price > 40000) return false;
        } else if (filters.priceRange === "₹40,000+") {
          if (price < 40000) return false;
        }
      }

      // Slider price range filter
      const priceStr = pkg.price.replace(/[₹,]/g, "");
      const price = parseInt(priceStr);
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.rating !== "All") {
        const minRating = parseFloat(filters.rating);
        if (pkg.rating < minRating) {
          return false;
        }
      }

      return true;
    });
  }, [basePackages, filters]);

  const handleOpenPackage = (packageSlug: string, destinationSlug: string) => {
    navigate(`/destinations/${destinationSlug}/${packageSlug}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Destination Selector */}
        <section className="container mx-auto px-4 mb-12 overflow-visible">
          <div className="flex flex-nowrap gap-3 overflow-visible pb-2 py-2 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:py-0">
            <button
              onClick={() => setActiveSlug("all")}
              aria-pressed={activeSlug === "all"}
              className={[
                "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 snap-start min-w-max",
                activeSlug === "all"
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-md",
              ].join(" ")}
            >
              <span>All Destinations</span>
            </button>
            {destinations.map((d) => {
              const Icon = destinationIconMap[d.icon];
              const active = d.slug === activeSlug;
              return (
                <button
                  key={d.slug}
                  onClick={() => setActiveSlug(d.slug)}
                  aria-pressed={active}
                  className={[
                    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 snap-start min-w-max",
                    active
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-md",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Filters and Packages Container */}
        <section className="container mx-auto px-4 mt-8">
          <div className="flex gap-6">
            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Packages grid */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-4">Showing {displayPackages.length} destination{displayPackages.length !== 1 ? 's' : ''}</p>
              <div className="grid gap-6 sm:grid-cols-2">
                {displayPackages.map((pkg) => (
                  <Card
                    key={`${pkg.destinationSlug}-${pkg.slug}`}
                    role="link"
                    tabIndex={0}
                    aria-label={`View details for ${pkg.name}`}
                    onClick={() => handleOpenPackage(pkg.slug, pkg.destinationSlug)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleOpenPackage(pkg.slug, pkg.destinationSlug);
                      }
                    }}
                    className="group flex h-full cursor-pointer flex-col overflow-visible border border-border/60 bg-card/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                {pkg.image && (
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
                      <Calendar className="h-3.5 w-3.5" /> {pkg.duration}
                    </span>
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
                      <Star className="h-3.5 w-3.5 fill-white" /> {pkg.rating.toFixed ? pkg.rating.toFixed(1) : pkg.rating}
                      <span className="text-white/80">({pkg.reviews})</span>
                    </span>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {pkg.duration} <span className="text-lg">🏍️</span>
                      </p>
                      <h3 className="mt-1 text-lg font-semibold leading-snug">{pkg.name}</h3>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{pkg.rating.toFixed ? pkg.rating.toFixed(1) : pkg.rating}</span>
                      <span className="text-muted-foreground">({pkg.reviews})</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {pkg.destinationRegion}
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">{pkg.description}</p>

                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-foreground">{formatPrice(parsePrice(pkg.price) ?? 0, { fromCurrency: "INR" })}</span>
                      {pkg.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">{formatPrice(parsePrice(pkg.oldPrice) ?? 0, { fromCurrency: "INR" })}</span>
                      )}
                      {pkg.badge && (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">{pkg.badge}</span>
                      )}
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">
                      <Button
                        asChild
                        variant="secondary"
                        className="flex-1 sm:flex-none"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Link
                          to={`/destinations/${pkg.destinationSlug}/${pkg.slug}`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          View itinerary
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Request callback
                      </Button>
                    </div>
                  </div>
                  </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
