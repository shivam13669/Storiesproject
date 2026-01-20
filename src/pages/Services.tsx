import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { X } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Motorbike Expeditions",
    description:
      "Curated motorcycle journeys across remote passes and scenic backroads, supported by experienced crew and logistics.",
    points: [
      "Maintained bikes and on-route spares",
      "Local road captains and sweep riders",
      "Support vehicle with tools and spare parts",
      "Daily briefings with flexible rest stops",
    ],
    img: "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2F892a48339765443691c8733185dcae65?format=webp&width=800",
  },
  {
    id: 2,
    title: "4x4 Adventure Tours",
    description:
      "Overland tours in well-equipped 4x4s, designed for challenging terrain and immersive outdoor routes.",
    points: [
      "Skilled off-road marshals",
      "Recovery and contingency plans",
      "Mechanical support on the trail",
      "Smaller groups for comfort and safety",
    ],
    img: "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2Fa9acac2a8f4e4cdf9f2966cbb87c07a4?format=webp&width=800",
  },
  {
    id: 3,
    title: "Airport Pickups & Drops",
    description:
      "Seamless meet-and-greet transfers with flight tracking and luggage assistance so your trip begins and ends smoothly.",
    points: [
      "Flight-aware pickup coordination",
      "Private and shared transfer options",
      "Luggage handling and door-to-door service",
      "24/7 coordination for arrivals and departures",
    ],
    img: "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2F9d222ad7a00a40e8ac19b4d9ac64af60?format=webp&width=800",
  },
  {
    id: 4,
    title: "Stay & Accommodation",
    description:
      "Comfortable, vetted stays selected to match each route—boutique hotels, mountain lodges, and homestays with local flavour.",
    points: [
      "Pre-vetted properties for comfort and hygiene",
      "Options from cozy homestays to boutique hotels",
      "Meals and breakfast choices where applicable",
      "Convenient locations matched to the itinerary",
    ],
    img: "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2Fac41c9e9f0524de7920211025dfca06e?format=webp&width=800",
  },
  {
    id: 5,
    title: "Permits & Travel Documentation",
    description:
      "End-to-end handling of regional permits, entry paperwork and on-trip compliance for restricted or high-altitude areas.",
    points: [
      "Inner-line, forest and special access permits",
      "Guidance on visas and entry requirements",
      "Pre-trip checks and route advisories",
      "On-trip permit coordination and support",
    ],
    img: "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2Fe9507a19cb2c4c21a2ada80df4e4f48c?format=webp&width=800",
  },
  {
    id: 6,
    title: "Group Departures & Custom Itineraries",
    description:
      "Join scheduled departures or create a private, tailor-made route crafted to your dates, pace and interests.",
    points: [
      "Fixed departures to join",
      "Fully custom private and corporate itineraries",
      "Flexible dates and group sizing",
      "Theme-based and purpose-led journeys",
    ],
    img: "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2F1e4fe1e89c3f4bfba6dc2092aad6ba02?format=webp&width=800",
  },
  {
    id: 7,
    title: "Local Culture & Experiences",
    description:
      "Meaningful local interactions—from village visits and artisan workshops to community-led experiences and culinary trails.",
    points: [
      "Authentic cultural exchanges",
      "Local food trails and markets",
      "Guided visits to heritage and artisan centres",
      "Community-led experiences promoting responsible tourism",
    ],
    img: "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2Fea3120f26cde442497e66bdef738bec3?format=webp&width=800",
  },
  {
    id: 8,
    title: "Safety & Backup Support",
    description:
      "A safety-first approach with trained staff, medical kits, emergency protocols and a dedicated support line for every trip.",
    points: [
      "Regional medical kit and oxygen where needed",
      "Emergency evacuation and contingency support",
      "Real-time weather and route monitoring",
      "Dedicated operations and support team",
    ],
    img: "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2Fa27aa286e4a040f5bc1a1d61fba9f7a8?format=webp&width=800",
  },
];

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <div className="min-h-screen relative overflow-hidden py-16 px-6 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <Navigation />

      <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-sky-200 to-teal-300 rounded-full opacity-30 filter blur-3xl transform rotate-45 -z-10 pointer-events-none"></div>
      <div className="absolute -bottom-28 -right-28 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-emerald-200 to-sky-200 rounded-full opacity-25 filter blur-3xl transform rotate-12 -z-10 pointer-events-none"></div>

      <main className="pt-8 pb-16">
        <h1 className="relative text-center mb-12">
          <span className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-900">
            Our Services
          </span>
          <span className="block mx-auto mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-300"></span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 cursor-pointer"
            >
              <img
                src={service.img}
                alt={service.title}
                className="rounded-xl w-full h-52 object-cover"
              />
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{service.title}</h2>
              <p className="text-gray-600 mt-2 text-sm">{service.description}</p>

              <div className="mt-4">
                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none"
              >
                <X className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Close</span>
              </button>

              {selectedService.img && (
                <img
                  src={selectedService.img}
                  alt={selectedService.title}
                  className="rounded-xl w-full h-60 object-cover mb-4"
                />
              )}

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{selectedService.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{selectedService.description}</p>

              <ul className="space-y-2 text-sm mb-4">
                {selectedService.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedService(null)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </main>

    </div>

    <Footer />
  </>
  );
};

export default ServicesPage;
