import { Mail as MailIcon, Phone as PhoneIcon, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="gradient-nature text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <img src="https://cdn.builder.io/api/v1/image/assets%2Fde743b16560c4ea5a4a46e65a2543876%2F4be0568d99d2469baa7ef6c274a8a1b2?format=webp&width=800" alt="StoriesByFoot logo" className="h-12 w-auto" />
                <span className="text-2xl font-bold text-white">StoriesBy<span className="text-secondary">Foot</span></span>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Your gateway to extraordinary adventures. We create unforgettable experiences that connect you with nature and push your boundaries.
              </p>
              <div className="flex space-x-4">
                <Button asChild variant="ghost" size="icon" className="text-white hover:text-adventure-gold hover:bg-white/10">
                  <a href="https://www.facebook.com/share/1JwPjtgkdq/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="text-white hover:text-adventure-gold hover:bg-white/10">
                  <a href="https://www.instagram.com/storiesbyfoot/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="text-white hover:text-adventure-gold hover:bg-white/10">
                  <a href="https://wa.me/916205129118" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <WhatsAppIcon className="h-5 w-5 scale-90" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:text-adventure-gold hover:bg-white/10">
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["About Us", "Destinations", "Services", "Gallery", "Blog", "Careers"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/80 hover:text-adventure-gold transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Adventures */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Adventures</h3>
              <ul className="space-y-3">
                {["Mountain Trekking", "Bike Expeditions", "Wildlife Safaris", "Beach Escapes", "Cultural Tours", "Photography Tours"].map((adventure) => (
                  <li key={adventure}>
                    <a href="#" className="text-white/80 hover:text-adventure-gold transition-colors">
                      {adventure}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Get In Touch</h3>
              <div className="text-white/80">
                <span className="inline-flex items-center mr-4">
                  <PhoneIcon className="h-5 w-5 text-adventure-gold flex-shrink-0 mr-2" />
                  <a href="tel:+916205129118" className="hover:underline" aria-label="Call +916205129118">+916205129118</a>
                </span>

                <span className="inline-flex items-center mr-4">
                  <PhoneIcon className="h-5 w-5 text-adventure-gold flex-shrink-0 mr-2" />
                  <a href="tel:+916283620764" className="hover:underline" aria-label="Call +916283620764">+916283620764</a>
                </span>

                <span className="inline-flex items-center mr-4">
                  <MailIcon className="h-5 w-5 text-adventure-gold flex-shrink-0 mr-2" />
                  <a href="mailto:contact@storiesbyfoot.com" className="hover:underline" aria-label="Email contact@storiesbyfoot.com">contact@storiesbyfoot.com</a>
                </span>

                <span className="inline-flex items-center">
                  <MailIcon className="h-5 w-5 text-adventure-gold flex-shrink-0 mr-2" />
                  <a href="mailto:storiesbyfoot@gmail.com" className="hover:underline" aria-label="Email storiesbyfoot@gmail.com">storiesbyfoot@gmail.com</a>
                </span>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Subscribe to Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-adventure-gold"
                  />
                  <Button variant="secondary" className="rounded-l-none">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2025 StoriesByFoot. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-white/60 hover:text-adventure-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms-and-condition" className="text-white/60 hover:text-adventure-gold transition-colors">Terms and Condition</Link>
              <Link to="/cookie-policy" className="text-white/60 hover:text-adventure-gold transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
