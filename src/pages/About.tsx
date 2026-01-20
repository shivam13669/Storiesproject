import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navigation />
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto p-8 md:p-12">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900">
                About StoriesBy<span className="text-secondary">Foot</span>
              </h1>
              <p className="mt-3 text-slate-600 max-w-xl">
                <strong>Founded in October 2020</strong>, StoriesByFoot was built on a simple belief that every journey has a story worth living. We design curated motorbike and 4x4 expeditions that balance thrill, culture, comfort and style for everyone from budget explorers and student groups to families, corporate teams, and luxury travellers.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fad0b087d70674186aab7ce88fbaebcd2%2F847e2c571c0047e88f1df62976119300?format=webp&width=800"
                  alt="StoriesByFoot logo"
                  className="h-24 w-24 object-contain"
                  width={96}
                  height={96}
                  loading="lazy"
                />
              </div>
            </div>
          </header>

          <p className="mt-6 border-l-2 pl-4 italic text-slate-600">Formerly known as <strong>PlanYorTrip</strong>, we rebranded to <strong>StoriesByFoot</strong> to reflect our deeper vision transforming travel into stories that stay with you forever.</p>

          <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">Our Story</h2>
              <p className="text-slate-600 leading-relaxed">
                StoriesByFoot was <strong>founded in October 2020</strong> with one guiding idea: travel is more than places it’s the stories you collect on the road. We specialise in expertly guided motorbike and 4x4 expeditions across breathtaking regions such as <strong>Ladakh</strong>, <strong>Zanskar</strong>, <strong>Meghalaya</strong>, <strong>Tawang</strong> (Arunachal Pradesh), <strong>Bhutan</strong>, and <strong>Upper Mustang (Nepal)</strong>.
              </p>

              <p className="text-slate-600 leading-relaxed">
                Each expedition is carefully crafted to combine adventure, cultural connection, and comfort thoughtfully designed routes, trusted local partners, safety-first operations, and seamless logistics. With over <strong>500 completed expeditions</strong> and <strong>10,000+ delighted travellers</strong> across three nations, our trips aim to transform travel into memorable, story-worthy experiences.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h3 className="text-lg font-medium text-indigo-700">500+ Bike Trips</h3>
                  <p className="text-sm text-slate-600 mt-1">Years of route experience and route-tested itineraries.</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-100">
                  <h3 className="text-lg font-medium text-rose-700">10,000+ Travelers</h3>
                  <p className="text-sm text-slate-600 mt-1">A growing community of riders, explorers and storytellers.</p>
                </div>
              </div>
            </article>

            <aside className="md:col-span-1 bg-slate-50 p-4 rounded-lg border">
              <h3 className="text-lg font-semibold text-slate-800">Quick Facts</h3>
              <ul className="mt-3 text-slate-600 space-y-2">
                <li>Founded: <strong>October 2020</strong></li>
                <li>Formerly: <strong>PlanYorTrip</strong></li>
                <li>Speciality: Motorbike & 4x4 expeditions</li>
                <li>Regions: Ladakh, Zanskar, Meghalaya, Tawang, Bhutan, Upper Mustang</li>
                <li>Trips: 500+ completed expeditions</li>
                <li>Travellers: 10,000+ served</li>
              </ul>
            </aside>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To redefine adventure travel by inspiring people to explore with curiosity and compassion building a community that values discovery, meaningful experiences, and the stories that bind them.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To design authentic, responsible and unforgettable journeys that blend adventure with comfort and cultural depth. Through meticulous planning, trusted local partnerships, and a commitment to safety and sustainability, we create trips that leave lasting impressions.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800">Why Travel with StoriesByFoot</h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="p-4 bg-white rounded-lg border shadow-sm">
                <strong className="block text-indigo-700">Adventure with Assurance</strong>
                <span className="text-sm text-slate-600 block mt-1">Expert-led expeditions that balance excitement, safety and comfort.</span>
              </li>
              <li className="p-4 bg-white rounded-lg border shadow-sm">
                <strong className="block text-indigo-700">Curated Experiences</strong>
                <span className="text-sm text-slate-600 block mt-1">Handcrafted itineraries that prioritize culture, scenery and authenticity.</span>
              </li>
              <li className="p-4 bg-white rounded-lg border shadow-sm">
                <strong className="block text-indigo-700">Seamless Support</strong>
                <span className="text-sm text-slate-600 block mt-1">From permits to logistics, we manage the details so you can enjoy the ride.</span>
              </li>
              <li className="p-4 bg-white rounded-lg border shadow-sm">
                <strong className="block text-indigo-700">Community of Explorers</strong>
                <span className="text-sm text-slate-600 block mt-1">Join a growing tribe of riders who share your passion for travel and stories.</span>
              </li>
            </ul>
          </section>

          <footer className="mt-8 border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-slate-600">✨ <strong>Walk the Road. Live the Story.</strong></p>
              <p className="text-xs text-slate-400 mt-2">© 2025 StoriesByFoot. All rights reserved.</p>
            </div>

            <div className="flex gap-3 items-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700">Get in touch</Link>
              <Link to="/destinations" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm">Browse Trips</Link>
            </div>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
