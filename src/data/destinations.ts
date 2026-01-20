import type { LucideIcon } from "lucide-react";
import { Flag, Landmark, Mountain, MountainSnow, Waves } from "lucide-react";

export type DestinationIcon = "mountain" | "landmark" | "waves" | "flag" | "mountainSnow";

export type DestinationPackage = {
  slug: string;
  name: string;
  duration: string;
  description: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  rating: number;
  reviews: number;
  highlights: string[];
  itineraryUrl?: string;
  image?: string;
  categories?: string[];
};

export type DestinationQuickFacts = {
  bestTime: string;
  startPoint: string;
  travelStyle: string;
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  summary: string;
  heroImage: string;
  icon: DestinationIcon;
  badge?: string;
  quickFacts: DestinationQuickFacts;
  packages: DestinationPackage[];
};

export const destinations: Destination[] = [
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "India",
    tagline: "Rugged passes and starry desert skies",
    summary:
      "Ride across iconic Himalayan passes, share butter tea in remote villages, and wake up to surreal moonscapes beside Pangong Tso.",
    heroImage:
      "https://images.unsplash.com/photo-1526481280695-3c4693df8ced?auto=format&fit=crop&w=1600&q=80",
    icon: "mountain",
    badge: "Trending",
    quickFacts: {
      bestTime: "June – September",
      startPoint: "Leh Airport",
      travelStyle: "High-altitude expeditions",
    },
    packages: [
      {
        slug: "xtreme-ladakh-expedition",
        name: "Khardungla Changla Loop",
        duration: "6 days · 5 nights",
        description:
          "Conquer Khardung La, trace the Shyok River, and camp under galaxy-bright skies at Pangong Tso and Tso Moriri.",
        price: "₹38,500",
        oldPrice: "₹42,000",
        badge: "Save 8%",
        rating: 4.9,
        reviews: 428,
        highlights: [
          "Khardung La sunrise ride",
          "Stays at Nubra Valley camps",
          "Night astrophotography session",
          "Guided acclimatisation walks",
        ],
        itineraryUrl:
          "https://drive.google.com/uc?export=download&id=1kmpsxL3OHHMqjEt8uQaLxvLXkkkXCw0H",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F381a433fb289442aa3ed9e966284c387%2F677a8672f5074d078c0775a63e74de1f?format=webp&width=800",
        categories: ["Mountain", "Adventure"],
      },
      {
        slug: "khardungla-changla-loop",
        name: "India's Last Turn",
        duration: "7 days · 6 nights",
        description:
          "A spirited bike tour covering Magnetic Hill, Sangam, and the dunes of Hunder with backup vehicle support.",
        price: "₹34,200",
        oldPrice: "₹36,900",
        badge: "Popular",
        rating: 4.8,
        reviews: 512,
        highlights: [
          "Royal Enfield Himalayan bikes",
          "Ride support & mechanic crew",
          "Camel safari in Hunder",
          "Pangong Tso sunrise drive",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F381a433fb289442aa3ed9e966284c387%2F33b69c51a9f5485eb147c5ce9248f980?format=webp&width=800",
        categories: ["Mountain", "Adventure"],
      },
      {
        slug: "migla-throne-ride",
        name: "MigLa Throne Ride",
        duration: "6 days · 5 nights",
        description:
          "Comfort-first itinerary with boutique stays, private SUV transfers, and immersive monastery visits.",
        price: "₹29,900",
        rating: 4.7,
        reviews: 302,
        highlights: [
          "Private driver and guide",
          "VIP access at Hemis festival",
          "Lunch with local family",
          "Leh heritage walking tour",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F381a433fb289442aa3ed9e966284c387%2Fa4a5f66915b3483c84c56b989e32176e?format=webp&width=800",
        categories: ["Mountain", "Luxury"],
      },
      {
        slug: "ultimate-ulingla",
        name: "Ultimate UmlingLa",
        duration: "8 days · 7 nights",
        description:
          "The ultimate high-altitude adventure conquering Ulingla Pass, crossing pristine valleys, and experiencing Ladakh's most remote landscapes.",
        price: "₹45,600",
        oldPrice: "₹49,900",
        badge: "Best Value",
        rating: 4.9,
        reviews: 156,
        highlights: [
          "Ulingla Pass summit ride",
          "Remote village camping",
          "High-altitude photography",
          "Expert mountaineer guides",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F381a433fb289442aa3ed9e966284c387%2F7dcb39e48c924358b1c8822906e58ffc?format=webp&width=800",
        categories: ["Mountain", "Adventure"],
      },
    ],
  },
  {
    slug: "tawang",
    name: "Tawang",
    region: "India",
    tagline: "Snow passes and sacred gompas",
    summary:
      "Explore Tawang's high-altitude monasteries, pristine passes, and traditional village life on a curated cultural circuit.",
    heroImage:
      "https://images.unsplash.com/photo-1558180079-7f0f7180a5ec?auto=format&fit=crop&w=1600&q=80",
    icon: "landmark",
    quickFacts: {
      bestTime: "October – April",
      startPoint: "Guwahati Airport",
      travelStyle: "Culture & monastery hopping",
    },
    packages: [
      {
        slug: "sacred-peaks-circuit",
        name: "Mystic Tawang",
        duration: "9 days · 8 nights",
        description:
          "Visit Tawang Monastery, cross Sela Pass, and experience local rituals with veteran cultural experts.",
        price: "₹46,700",
        rating: 4.8,
        reviews: 221,
        highlights: [
          "Sunrise at Tawang Gompa",
          "Sela Pass snow play",
          "Local monastery homestay",
          "Guided cultural interactions",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F0c9f08f02c764866969402fd835478cb%2Faf28aeeed9944bfca81a00b8cdcdd8fb?format=webp&width=800",
        categories: ["Mountain", "Adventure"],
      },
    ],
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    region: "Bhutan",
    tagline: "Dzongs, festivals, and Himalayan valleys",
    summary:
      "Discover Bhutan's fortress monasteries, colorful festivals, and serene valleys with local cultural guides.",
    heroImage:
      "https://images.unsplash.com/photo-1559112094-4137e19ff3a5?auto=format&fit=crop&w=1600&q=80",
    icon: "landmark",
    badge: "New",
    quickFacts: {
      bestTime: "October – April",
      startPoint: "Paro Airport",
      travelStyle: "Culture & festival experiences",
    },
    packages: [
      {
        slug: "bhutan-festive-escape",
        name: "Monk Trails",
        duration: "7 days · 6 nights",
        description:
          "Cheer for masked dancers, taste farmhouse feasts, and hike to hidden cliffside shrines across Western Bhutan.",
        price: "₹40,400",
        rating: 4.7,
        reviews: 189,
        highlights: [
          "Festival front-row seating",
          "Dzong architecture walk",
          "Farm-to-table dinners",
          "Dochula 108 chortens visit",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F0c9f08f02c764866969402fd835478cb%2Fd0879b3f63dc4393ab28eb025eac97e7?format=webp&width=800",
        categories: ["Luxury", "Adventure"],
      },
    ],
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    region: "India",
    tagline: "Living root bridges and misty canyons",
    summary:
      "Meander through cloud forests, discover subterranean rivers, and unwind in the cleanest village in Asia.",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    icon: "waves",
    quickFacts: {
      bestTime: "September – May",
      startPoint: "Shillong Airport",
      travelStyle: "Nature trails & soft adventure",
    },
    packages: [
      {
        slug: "azure-lagoons-trail",
        name: "Azure Lagoons Trail",
        duration: "6 days · 5 nights",
        description:
          "Kayak on Umngot, trek double-decker bridges, and chase waterfalls in the Laitkynsew region.",
        price: "₹24,500",
        rating: 4.7,
        reviews: 264,
        highlights: [
          "Clear-water boating at Dawki",
          "Living root bridge trek",
          "Caving at Mawsmai",
          "Campfire storytelling nights",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F4a4b23c4a4604f318cabea6540b9b38b%2F36318bde1826458f8c22a7003aedd265?format=webp&width=800",
        categories: ["Beach", "Adventure"],
      },
      {
        slug: "khasi-highlands-retreat",
        name: "Khasi Highlands Retreat",
        duration: "5 days · 4 nights",
        description:
          "A relaxed escape featuring Mawlynnong village walk, eco-resort stays, and Khasi culinary workshops.",
        price: "₹21,600",
        rating: 4.6,
        reviews: 198,
        highlights: [
          "Mawphlang sacred grove",
          "Traditional Khasi lunch",
          "Eco-resort stays",
          "Sunset at Laitlum canyon",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F4a4b23c4a4604f318cabea6540b9b38b%2F107c2ff1e4bf414fa214bc78eaab88c0?format=webp&width=800",
        categories: ["Beach", "Luxury"],
      },
    ],
  },
  {
    slug: "nepal",
    name: "Nepal",
    region: "Nepal",
    tagline: "Stupas, sherpas, and panoramic peaks",
    summary:
      "Circle Kathmandu's heritage squares, fly past Everest, and trek through rhododendron forests alive with birdsong.",
    heroImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    icon: "flag",
    badge: "Classic",
    quickFacts: {
      bestTime: "March – May · Oct – Nov",
      startPoint: "Kathmandu Airport",
      travelStyle: "Trekking & culture",
    },
    packages: [
      {
        slug: "everest-panorama-trek",
        name: "Everest Panorama Trek",
        duration: "9 days · 8 nights",
        description:
          "Scenic trek to Tengboche monastery with Everest flight experience and sherpa-guided trails.",
        price: "₹55,800",
        rating: 4.9,
        reviews: 356,
        highlights: [
          "Everest mountain flight",
          "Sherpa village homestays",
          "Tengboche monastery visit",
          "Kala Patthar viewpoint",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F4a4b23c4a4604f318cabea6540b9b38b%2F9f419557f45e49b18a9a1af4d0db408e?format=webp&width=800",
        categories: ["Mountain", "Adventure"],
      },
      {
        slug: "kathmandu-heritage-chitwan",
        name: "Kathmandu Heritage & Chitwan",
        duration: "7 days · 6 nights",
        description:
          "Blend UNESCO heritage walks with wildlife safaris in Chitwan National Park and Tharu cultural nights.",
        price: "₹37,900",
        rating: 4.7,
        reviews: 284,
        highlights: [
          "Patan & Bhaktapur tours",
          "Jungle jeep safari",
          "Tharu stick dance evening",
          "Phewa Lake boating",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F4a4b23c4a4604f318cabea6540b9b38b%2F3ba47243a6834d3eade8da3e45996207?format=webp&width=800",
        categories: ["City", "Adventure"],
      },
    ],
  },
  {
    slug: "zanskar",
    name: "Zanskar",
    region: "India",
    tagline: "Frozen rivers and remote monasteries",
    summary:
      "Journey to Zanskar's cliff-hung gompas, raft sapphire rivers, and brave the legendary Chadar trail.",
    heroImage:
      "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7?auto=format&fit=crop&w=1600&q=80",
    icon: "mountainSnow",
    quickFacts: {
      bestTime: "July – September",
      startPoint: "Kargil",
      travelStyle: "Remote expeditions",
    },
    packages: [
      {
        slug: "zanskar-river-rafting-quest",
        name: "Wild Zanskar",
        duration: "8 days · 7 nights",
        description:
          "Navigate Class III rapids, camp beside gorges, and explore Phuktal monastery tucked within a cave.",
        price: "₹44,600",
        rating: 4.8,
        reviews: 178,
        highlights: [
          "Expert rafting guides",
          "Clifftop monastery visits",
          "Riverside glamping",
          "Bonfire astronomy sessions",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F0c9f08f02c764866969402fd835478cb%2F5eb306acdcb041aaa622522f123ba2e8?format=webp&width=800",
        categories: ["Mountain", "Adventure"],
      },
      {
        slug: "chadar-frozen-river-trek",
        name: "Chadar Frozen River Trek",
        duration: "9 days · 8 nights",
        description:
          "Walk over frozen Zanskar River, learn ice survival skills, and share stories with Zanskari porters.",
        price: "₹48,900",
        rating: 4.9,
        reviews: 246,
        highlights: [
          "Ice walking gear kit",
          "Warm dining domes",
          "Cultural evening at Nerak",
          "Certified mountain guides",
        ],
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F3005cb3e673a454989d4f95fc852f4e9%2Ff41b9a57ee954f3098ff1c1aefa34d0b?format=webp&width=800",
        categories: ["Mountain", "Adventure"],
      },
    ],
  },
];

export const destinationIconMap: Record<DestinationIcon, LucideIcon> = {
  mountain: Mountain,
  landmark: Landmark,
  waves: Waves,
  flag: Flag,
  mountainSnow: MountainSnow,
};

export const getDestinationBySlug = (slug: string) =>
  destinations.find((destination) => destination.slug === slug);

export const getPackageBySlug = (destinationSlug: string, packageSlug: string) => {
  const destination = getDestinationBySlug(destinationSlug);
  if (!destination) {
    return undefined;
  }

  return destination.packages.find((travelPackage) => travelPackage.slug === packageSlug);
};

export const findPackageAcrossDestinations = (packageSlug: string) => {
  for (const destination of destinations) {
    const travelPackage = destination.packages.find((item) => item.slug === packageSlug);
    if (travelPackage) {
      return {
        destination,
        travelPackage,
      };
    }
  }

  return undefined;
};
