import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, User, Phone, Search, ChevronDown, X } from "lucide-react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRIES = [
  { code: "IN", name: "India", dial: "+91" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "SL", name: "Sri Lanka", dial: "+94" },
  { code: "NP", name: "Nepal", dial: "+977" },
];

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const COUNTRY_DIGIT_REQUIREMENTS: Record<string, { min: number; max: number }> = {
  IN: { min: 10, max: 10 },
  US: { min: 10, max: 10 },
  GB: { min: 10, max: 11 },
  CA: { min: 10, max: 10 },
  AU: { min: 9, max: 9 },
  DE: { min: 10, max: 11 },
  FR: { min: 9, max: 9 },
  IT: { min: 10, max: 10 },
  ES: { min: 9, max: 9 },
  JP: { min: 10, max: 11 },
  CN: { min: 11, max: 11 },
  SG: { min: 8, max: 8 },
  MY: { min: 9, max: 10 },
  TH: { min: 9, max: 10 },
  PH: { min: 10, max: 10 },
  ID: { min: 9, max: 12 },
  SL: { min: 9, max: 9 },
  NP: { min: 10, max: 10 },
};

const validateInternationalMobile = (mobile: string, countryCode: string): boolean => {
  const digitCount = mobile.replace(/\D/g, '').length;
  const requirements = COUNTRY_DIGIT_REQUIREMENTS[countryCode];

  if (!requirements) {
    return false;
  }

  if (digitCount < requirements.min || digitCount > requirements.max) {
    return false;
  }

  try {
    const phoneNumber = parsePhoneNumberFromString(mobile, countryCode as any);
    return phoneNumber ? phoneNumber.isValid() : false;
  } catch {
    return false;
  }
};

const validatePassword = (password: string) => {
  const requirements = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const isValid = Object.values(requirements).every(req => req);
  return { isValid, requirements };
};

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login: authLogin, signup: authSignup } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch] = useState("");
  const [openCountryPopover, setOpenCountryPopover] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordEmailError, setForgotPasswordEmailError] = useState("");

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.dial.includes(countrySearch) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const passwordValidation = validatePassword(signupPassword);
  const passwordsMatch = signupPassword && confirmPassword && signupPassword === confirmPassword;
  const isPasswordValid = passwordValidation.isValid && passwordsMatch;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address (e.g., you@example.com)");
      return;
    }

    setIsLoading(true);
    try {
      await authLogin(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back! Redirecting...",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(signupEmail)) {
      setSignupEmailError("Please enter a valid email address (e.g., you@example.com)");
      return;
    }
    if (!validateInternationalMobile(mobileNumber, selectedCountry.code)) {
      setMobileNumberError("Please enter a valid mobile number for the selected country");
      return;
    }
    if (!isPasswordValid) {
      toast({
        title: "Password error",
        description: "Password does not meet requirements",
        variant: "destructive",
      });
      return;
    }
    if (!agreeTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await authSignup(signupEmail, fullName, signupPassword, mobileNumber);
      toast({
        title: "Signup successful",
        description: "Your account has been created. Welcome!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(forgotPasswordEmail)) {
      setForgotPasswordEmailError("Please enter a valid email address (e.g., you@example.com)");
      return;
    }
    console.log("Reset password for:", forgotPasswordEmail);
  };

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setOpenCountryPopover(false);
    setCountrySearch("");
  };

  const returnToLogin = () => {
    setShowForgotPassword(false);
    setForgotPasswordEmail("");
    setForgotPasswordEmailError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-white border-0 p-0 overflow-hidden shadow-2xl max-h-[85vh] rounded-lg left-1/2 top-[4rem] translate-x-[-50%] translate-y-0" style={{width: '85vw', maxWidth: '1000px'}}>
        <DialogTitle className="sr-only">Login or Sign Up</DialogTitle>
        <div className="flex h-full min-h-[600px]">
          {/* Left Side - Premium Hero Image */}
          <div className="hidden md:flex md:w-[55%] relative overflow-hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F2ff2ba5fbddf4a3fa883fab429f80a85%2F6fd98a818ae14adaa2b55f761fd41f39?format=webp&width=800"
              alt="Adventure experience"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex flex-col justify-between p-6">
              <div className="text-white">
                <div className="inline-block bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white mb-4">
                  ✨ TRUSTED BY TRAVELERS
                </div>
                <h3 className="text-2xl font-bold leading-tight">
                  Discover Your Next Adventure
                </h3>
              </div>
              
              <div className="space-y-3 text-white/90 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" />
                  <span>Experience 20,000+ verified activities</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" />
                  <span>1,500+ trusted suppliers worldwide</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" />
                  <span>Best price guarantee on every booking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Premium Form */}
          <div className="w-full md:w-[45%] flex flex-col bg-white overflow-y-auto">
            {!showForgotPassword ? (
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full flex flex-col h-full">
                {/* Premium Tab Headers */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
                  <TabsList className="w-full rounded-none bg-white p-0 h-auto flex justify-start gap-0">
                    <TabsTrigger
                      value="login"
                      className="flex-1 px-6 py-3.5 rounded-none text-sm font-bold text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-4 data-[state=active]:border-orange-500 data-[state=active]:bg-gray-50/50 hover:text-gray-900 hover:bg-gray-50/30 transition-colors"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="flex-1 px-6 py-3.5 rounded-none text-sm font-bold text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-4 data-[state=active]:border-orange-500 data-[state=active]:bg-gray-50/50 hover:text-gray-900 hover:bg-gray-50/30 transition-colors"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Login Tab */}
                <TabsContent value="login" className="mt-0 flex-1 overflow-y-auto">
                  <div className="p-7 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        Welcome Back
                      </h2>
                      <p className="text-sm text-gray-600">
                        Log in to your account and explore amazing experiences
                      </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-900">
                          Email Address
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <Input
                            type="text"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailError("");
                            }}
                            className={`w-full pl-11 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-gray-50/50 transition-all ${
                              emailError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-orange-500'
                            }`}
                            required
                          />
                        </div>
                        {emailError && (
                          <p className="text-xs text-red-500 font-medium">{emailError}</p>
                        )}
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-900">
                          Password
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50/50 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Remember & Forgot */}
                      <div className="flex justify-between items-center pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 accent-orange-500 cursor-pointer"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                            Remember me
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>

                      {/* Login Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {isLoading ? "Logging in..." : "Login & Explore"}
                        {!isLoading && <ArrowRight className="h-5 w-5" />}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center gap-3 py-1">
                      <div className="flex-1 border-t border-gray-200"></div>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        Or continue with
                      </span>
                      <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Google Sign In */}
                    <div className="grid grid-cols-1 gap-3">
                      <button className="border-2 border-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200 flex items-center justify-center gap-2 group">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="text-sm">Google</span>
                      </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-700">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab('signup');
                          }}
                          className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                        >
                          Sign up free
                        </button>
                      </p>
                    </div>

                    {/* Trust Section */}
                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                        🏆 Book With Confidence
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-green-50 to-green-50/50 p-3 rounded-lg border border-green-100">
                          <div className="text-lg font-bold text-green-600">4.8</div>
                          <p className="text-xs text-gray-600 mt-1">2.5K+ Reviews</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 p-3 rounded-lg border border-blue-100">
                          <div className="text-lg font-bold text-blue-600">4.6</div>
                          <p className="text-xs text-gray-600 mt-1">15K+ Bookings</p>
                        </div>
                      </div>
                    </div>

                    {/* Terms Text */}
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By continuing, you agree to StoriesByFoot's{" "}
                      <a href="/terms-and-condition" className="text-orange-600 hover:underline">
                        Terms & Conditions
                      </a>
                      {" "}and{" "}
                      <a href="/privacy-policy" className="text-orange-600 hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup" className="mt-0 flex-1 overflow-y-auto">
                  <div className="p-7 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        Create Your Account
                      </h2>
                      <p className="text-sm text-gray-600">
                        Join thousands of travelers and start your adventure today
                      </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                      {/* Full Name Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-900">
                          Full Name
                        </label>
                        <div className="relative group" onMouseDown={() => setIsPasswordFieldFocused(false)}>
                          <User className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <Input
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50/50 transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-900">
                          Email Address
                        </label>
                        <div className="relative group" onMouseDown={() => setIsPasswordFieldFocused(false)}>
                          <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <Input
                            type="text"
                            placeholder="you@example.com"
                            value={signupEmail}
                            onChange={(e) => {
                              setSignupEmail(e.target.value);
                              setSignupEmailError("");
                            }}
                            className={`w-full pl-11 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-gray-50/50 transition-all ${
                              signupEmailError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-orange-500'
                            }`}
                            required
                          />
                        </div>
                        {signupEmailError && (
                          <p className="text-xs text-red-500 font-medium">{signupEmailError}</p>
                        )}
                      </div>

                      {/* Mobile Number with Country Code */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-900">
                          Mobile Number
                        </label>
                        <div className="flex gap-2" onMouseDown={() => setIsPasswordFieldFocused(false)}>
                          {/* Country Code Selector */}
                          <Popover open={openCountryPopover} onOpenChange={(open) => {
                            setOpenCountryPopover(open);
                            if (!open) {
                              setCountrySearch("");
                            }
                          }}>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100 transition-all flex items-center gap-2 min-w-fit focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                              >
                                <span className="text-sm font-medium">{selectedCountry.dial}</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-0" align="start">
                              <div className="flex flex-col">
                                {/* Search Input */}
                                <div className="sticky top-0 z-10 p-3 border-b border-gray-200 bg-white">
                                  <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                      type="text"
                                      placeholder="Search country..."
                                      value={countrySearch}
                                      onChange={(e) => setCountrySearch(e.target.value)}
                                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                                      autoFocus
                                    />
                                  </div>
                                </div>

                                {/* Countries List */}
                                <div className="max-h-64 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
                                  {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                      <button
                                        key={country.code}
                                        type="button"
                                        onClick={() => handleCountrySelect(country)}
                                        className={`w-full text-left px-3 py-2.5 text-sm hover:bg-orange-50 transition-colors flex items-center justify-between ${
                                          selectedCountry.code === country.code ? "bg-orange-100 font-semibold" : ""
                                        }`}
                                      >
                                        <span>
                                          <span className="font-medium">{country.dial}</span>
                                          <span className="text-gray-600 ml-2">
                                            {country.name}
                                          </span>
                                        </span>
                                        {selectedCountry.code === country.code && (
                                          <span className="text-orange-600">✓</span>
                                        )}
                                      </button>
                                    ))
                                  ) : (
                                    <div className="px-3 py-8 text-sm text-gray-500 text-center">
                                      No countries found
                                    </div>
                                  )}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>

                          {/* Mobile Number Input */}
                          <div className="relative group flex-1">
                            <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              type="tel"
                              placeholder="9876543210"
                              value={mobileNumber}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                const maxDigits = COUNTRY_DIGIT_REQUIREMENTS[selectedCountry.code]?.max || 15;
                                const truncated = digitsOnly.slice(0, maxDigits);
                                setMobileNumber(truncated);
                                setMobileNumberError("");
                              }}
                              className={`w-full pl-11 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50/50 transition-all ${
                                mobileNumberError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500/20'
                              }`}
                              required
                            />
                          </div>
                        </div>
                        {mobileNumberError && (
                          <p className="text-xs text-red-500 font-medium">{mobileNumberError}</p>
                        )}
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-900">
                          Password
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <Input
                            type={showSignupPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            onFocus={() => setIsPasswordFieldFocused(true)}
                            onBlur={() => setIsPasswordFieldFocused(false)}
                            className="w-full pl-11 pr-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50/50 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showSignupPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        {/* Password Requirements */}
                        {signupPassword && isPasswordFieldFocused && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                            <p className="text-xs font-semibold text-gray-900">Password Requirements:</p>
                            <div className="space-y-1.5 text-xs">
                              <div className={`flex items-center gap-2 ${passwordValidation.requirements.length ? 'text-green-600' : 'text-gray-600'}`}>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.requirements.length ? 'bg-green-100' : 'bg-gray-200'}`}>
                                  {passwordValidation.requirements.length && <span className="text-green-600 font-bold">✓</span>}
                                </div>
                                <span>At least 6 characters</span>
                              </div>
                              <div className={`flex items-center gap-2 ${passwordValidation.requirements.uppercase ? 'text-green-600' : 'text-gray-600'}`}>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.requirements.uppercase ? 'bg-green-100' : 'bg-gray-200'}`}>
                                  {passwordValidation.requirements.uppercase && <span className="text-green-600 font-bold">✓</span>}
                                </div>
                                <span>At least 1 uppercase letter (A-Z)</span>
                              </div>
                              <div className={`flex items-center gap-2 ${passwordValidation.requirements.lowercase ? 'text-green-600' : 'text-gray-600'}`}>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.requirements.lowercase ? 'bg-green-100' : 'bg-gray-200'}`}>
                                  {passwordValidation.requirements.lowercase && <span className="text-green-600 font-bold">✓</span>}
                                </div>
                                <span>At least 1 lowercase letter (a-z)</span>
                              </div>
                              <div className={`flex items-center gap-2 ${passwordValidation.requirements.number ? 'text-green-600' : 'text-gray-600'}`}>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.requirements.number ? 'bg-green-100' : 'bg-gray-200'}`}>
                                  {passwordValidation.requirements.number && <span className="text-green-600 font-bold">✓</span>}
                                </div>
                                <span>At least 1 number (0-9)</span>
                              </div>
                              <div className={`flex items-center gap-2 ${passwordValidation.requirements.special ? 'text-green-600' : 'text-gray-600'}`}>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.requirements.special ? 'bg-green-100' : 'bg-gray-200'}`}>
                                  {passwordValidation.requirements.special && <span className="text-green-600 font-bold">✓</span>}
                                </div>
                                <span>At least 1 special character (!@#$%^&*)</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-900">
                          Confirm Password
                        </label>
                        <div className="relative group" onMouseDown={() => setIsPasswordFieldFocused(false)}>
                          <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full pl-11 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-gray-50/50 transition-all ${
                              confirmPassword && !passwordsMatch ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                            }`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {confirmPassword && !passwordsMatch && (
                          <p className="text-xs text-red-500 font-medium">Passwords do not match</p>
                        )}
                        {confirmPassword && passwordsMatch && (
                          <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <span>✓</span> Passwords match
                          </p>
                        )}
                      </div>

                      {/* Terms Checkbox */}
                      <label className="flex items-start gap-2 cursor-pointer group mt-3" onMouseDown={() => setIsPasswordFieldFocused(false)}>
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 accent-orange-500 cursor-pointer mt-0.5"
                          required
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          I agree to the{" "}
                          <a href="/terms-and-condition" className="text-orange-600 hover:text-orange-700 font-semibold" onMouseDown={() => setIsPasswordFieldFocused(false)}>
                            Terms & Conditions
                          </a>
                          {" "}and{" "}
                          <a href="/privacy-policy" className="text-orange-600 hover:text-orange-700 font-semibold" onMouseDown={() => setIsPasswordFieldFocused(false)}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>

                      {/* Sign Up Button */}
                      <button
                        type="submit"
                        disabled={!isPasswordValid || !fullName || !signupEmail || !validateEmail(signupEmail) || !mobileNumber || !validateInternationalMobile(mobileNumber, selectedCountry.code) || !agreeTerms}
                        className="w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Create Account
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center gap-3 py-1">
                      <div className="flex-1 border-t border-gray-200"></div>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        Or continue with
                      </span>
                      <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Google Sign Up */}
                    <div className="grid grid-cols-1 gap-3">
                      <button onMouseDown={() => setIsPasswordFieldFocused(false)} className="border-2 border-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200 flex items-center justify-center gap-2 group">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="text-sm">Google</span>
                      </button>
                    </div>

                    {/* Already Have Account Link */}
                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-700">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab('login');
                          }}
                          onMouseDown={() => setIsPasswordFieldFocused(false)}
                          className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                        >
                          Login here
                        </button>
                      </p>
                    </div>

                    {/* Trust Section */}
                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                        🏆 Book With Confidence
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-green-50 to-green-50/50 p-3 rounded-lg border border-green-100">
                          <div className="text-lg font-bold text-green-600">4.8</div>
                          <p className="text-xs text-gray-600 mt-1">2.5K+ Reviews</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 p-3 rounded-lg border border-blue-100">
                          <div className="text-lg font-bold text-blue-600">4.6</div>
                          <p className="text-xs text-gray-600 mt-1">15K+ Bookings</p>
                        </div>
                      </div>
                    </div>

                    {/* Terms Text */}
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By continuing, you agree to StoriesByFoot's{" "}
                      <a href="/terms-and-condition" className="text-orange-600 hover:underline">
                        Terms & Conditions
                      </a>
                      {" "}and{" "}
                      <a href="/privacy-policy" className="text-orange-600 hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              // Forgot Password Form
              <div className="p-7 space-y-6 flex flex-col">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Forgotten Your Password?
                  </h2>
                  <p className="text-sm text-gray-600">
                    Don't worry, we'll send you a message to help you reset your password.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <Input
                        type="text"
                        placeholder="you@example.com"
                        value={forgotPasswordEmail}
                        onChange={(e) => {
                          setForgotPasswordEmail(e.target.value);
                          setForgotPasswordEmailError("");
                        }}
                        className={`w-full pl-11 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-gray-50/50 transition-all ${
                          forgotPasswordEmailError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-orange-500'
                        }`}
                        required
                      />
                    </div>
                    {forgotPasswordEmailError && (
                      <p className="text-xs text-red-500 font-medium">{forgotPasswordEmailError}</p>
                    )}
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Continue
                  </button>
                </form>

                {/* Return to Login */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={returnToLogin}
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                  >
                    Return to Log in
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center gap-3 py-1">
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Trust Section */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                    🏆 Book With Confidence
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-green-50 to-green-50/50 p-3 rounded-lg border border-green-100">
                      <div className="text-lg font-bold text-green-600">4.8</div>
                      <p className="text-xs text-gray-600 mt-1">2.5K+ Reviews</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 p-3 rounded-lg border border-blue-100">
                      <div className="text-lg font-bold text-blue-600">4.6</div>
                      <p className="text-xs text-gray-600 mt-1">15K+ Bookings</p>
                    </div>
                  </div>
                </div>

                {/* Terms Text */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  By continuing, you agree to StoriesByFoot's{" "}
                  <a href="/terms-and-condition" className="text-orange-600 hover:underline">
                    Terms & Conditions
                  </a>
                  {" "}and{" "}
                  <a href="/privacy-policy" className="text-orange-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogClose asChild>
          <button aria-label="Close" className="absolute right-3 top-3 z-[99999] text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-full p-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <X className="h-5 w-5" />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
