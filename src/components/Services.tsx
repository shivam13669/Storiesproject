import { Shield, Users, MapPin, Headphones, Car, Camera } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Professional guides, safety equipment, and emergency support for worry-free adventures.",
    features: ["First Aid Kit", "Emergency Support", "Professional Guides", "Safety Equipment"]
  },
  {
    icon: Users,
    title: "Group Adventures",
    description: "Join like-minded adventurers or customize private group experiences tailored to your needs.",
    features: ["Group Tours", "Private Experiences", "Custom Itineraries", "Team Building"]
  },
  {
    icon: MapPin,
    title: "Expert Planning",
    description: "Meticulously planned routes and accommodations ensure seamless and memorable journeys.",
    features: ["Route Planning", "Accommodation", "Permits & Licenses", "Local Insights"]
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance before, during, and after your adventure for complete peace of mind.",
    features: ["24/7 Helpline", "Trip Assistance", "Emergency Contact", "Post-Trip Support"]
  },
  {
    icon: Car,
    title: "Transportation",
    description: "Comfortable and reliable transportation with pickup and drop services from major locations.",
    features: ["Airport Pickup", "Vehicle Support", "Fuel Included", "Mechanical Support"]
  },
  {
    icon: Camera,
    title: "Memories Captured",
    description: "Professional photography services to capture your adventure moments and create lasting memories.",
    features: ["Professional Photos", "Video Documentation", "Digital Gallery", "Print Options"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive adventure services designed to make your journey safe, memorable, and extraordinary.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className="group border-0 shadow-card hover:shadow-adventure transition-all duration-500 hover:-translate-y-1 bg-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 gradient-adventure rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <div className="relative bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-6 sm:gap-8 bg-muted/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm w-full max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-muted-foreground text-sm">Adventures Completed</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="sm:hidden w-12 h-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">98%</div>
              <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="sm:hidden w-12 h-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-muted-foreground text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
