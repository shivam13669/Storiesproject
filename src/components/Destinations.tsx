import { destinations as destinationCatalog } from "@/data/destinations";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency, parsePrice } from "@/context/CurrencyContext";

const featuredDestinations = destinationCatalog.slice(0, 3);

const Destinations = () => {
  const { formatPrice } = useCurrency();
  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved adventure destinations, each offering unique experiences and unforgettable memories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => {
            const primaryPackage = destination.packages[0];
            const displayImage = primaryPackage?.image ?? destination.heroImage;
            const destinationsLink = `/destinations?dest=${destination.slug}`;

            return (
              <Link
                key={destination.slug}
                to={destinationsLink}
                className="group"
              >
                <Card
                  className="h-full overflow-hidden border-0 shadow-card hover:shadow-adventure transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm cursor-pointer"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={displayImage}
                      alt={destination.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {primaryPackage?.badge && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase">
                        {primaryPackage.badge}
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-3 py-1 rounded-full font-semibold">
                      {primaryPackage?.price ? (
                        <>Starting at {formatPrice(parsePrice(primaryPackage.price) ?? 0, { fromCurrency: "INR" })}</>
                      ) : (
                        <>On request</>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {destination.tagline}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {destination.region}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {destination.quickFacts.bestTime}
                      </div>
                      {primaryPackage && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {primaryPackage.rating}
                        </div>
                      )}
                    </div>

                    <Button className="w-full" variant="adventure">
                      View experiences
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/destinations">View all destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
