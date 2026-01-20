import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Quote } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { PenTool } from "lucide-react";

const getInitials = (fullName: string) => {
  const [first, last] = fullName.split(" ");
  return `${first?.[0]}${last?.[0]}`.toUpperCase();
};

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Photographer",
    location: "New Delhi, India",
    trip: "Ladakh Himalayan Ride",
    quote:
      "StoriesByFoot turned the intimidating Himalayas into a dream ride. Every halt had hot chai, every route had a backup plan, and they never stopped surprising us with hidden gems.",
    highlight: "Altitude 17,982 ft",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Product Manager",
    location: "Bengaluru, India",
    trip: "Arunachal Riverine Expedition",
    quote:
      "From bamboo homestays to private rafting sessions, the itinerary was a perfect blend of thrill and serenity. Their crew felt like family by the end of the trip.",
    highlight: "8-day guided trail",
    rating: 5,
  },
  {
    name: "Kabir Singh",
    role: "Entrepreneur",
    location: "Mumbai, India",
    trip: "Spiti Valley Convoy",
    quote:
      "I have done a dozen driving expeditions, but none matched the precision of StoriesByFoot. The lead marshals navigated blizzards like pros and kept morale sky high.",
    highlight: "12 vehicles in convoy",
    rating: 4,
  },
  {
    name: "Lara Dsouza",
    role: "Yoga Instructor",
    location: "Goa, India",
    trip: "Sikkim Wellness Retreat",
    quote:
      "Sunrise meditations, organic breakfasts, and mindful hikes. They curated every little detail so I could focus on teaching and soaking in the mountains.",
    highlight: "Daily guided rituals",
    rating: 5,
  },
  {
    name: "Vikram Reddy",
    role: "Software Engineer",
    location: "Hyderabad, India",
    trip: "Rajasthan Desert Safari",
    quote:
      "Disconnecting from code and connecting with nature was exactly what I needed. The camel rides under starlit skies, bonfire stories, and the expertise of local guides made this journey truly magical.",
    highlight: "5-night desert camp",
    rating: 5,
  },
  {
    name: "Priya Malhotra",
    role: "Journalist",
    location: "Delhi, India",
    trip: "Northeast Stories Trail",
    quote:
      "As a travel writer, I've explored many regions, but the storytelling approach of StoriesByFoot was exceptional. They don't just guide you through destinations, they unveil the soul of each place through authentic local connections.",
    highlight: "Culture-immersive journey",
    rating: 5,
  },
];

const TRANSITION_MS = 800;
const INTERVAL_MS = 6000;

const TestimonialsCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const handlePrev = () => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[index];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shared memories that stay
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from explorers who trusted StoriesByFoot for their unforgettable adventures.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Testimonial Card */}
          <Card
            key={`${currentTestimonial.name}-${index}`}
            className="border border-primary/20 bg-card/95 shadow-2xl shadow-primary/20 backdrop-blur-sm"
          >
            <CardHeader className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {getInitials(currentTestimonial.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-lg text-foreground">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-xs text-primary/70">{currentTestimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-primary/90">
                <Quote className="h-5 w-5" />
                <span className="font-semibold text-sm">{currentTestimonial.trip}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <blockquote className="text-lg md:text-xl leading-relaxed text-muted-foreground italic border-l-4 border-primary pl-6">
                "{currentTestimonial.quote}"
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-3xl ${
                        i < currentTestimonial.rating
                          ? "text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <Badge className="bg-primary/15 text-primary border border-primary/30">
                  {currentTestimonial.highlight}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <Button asChild size="lg" className="group">
              <Link to="/testimonials#add-testimonial-form">
                <PenTool className="mr-2 h-5 w-5" />
                Add Your Testimonial
              </Link>
            </Button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full h-10 w-10 border-primary/30 hover:bg-primary/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "bg-primary w-8" : "bg-primary/30 w-2"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full h-10 w-10 border-primary/30 hover:bg-primary/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Auto-scroll Indicator */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            {index + 1} of {testimonials.length} • Auto-scrolling testimonials
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
