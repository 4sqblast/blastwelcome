"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  CheckCircle,
  UserPlus,
  Search,
  Phone,
  Mail,
  MapPin,
  User,
  Loader2,
  Heart,
  Star,
  Sparkles,
  Users,
  Briefcase,
  School,
} from "lucide-react";

type Guest = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  school: string | null;
  street_address: string;
};

const RotatingBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mounted, setMounted] = useState(false);

  const banners = [
    {
      gradient: "from-rose-400 via-pink-500 to-purple-600",
      title: "God's Love Surrounds You",
      subtitle: "Experience His presence today",
    },
    {
      gradient: "from-blue-400 via-cyan-500 to-teal-600",
      title: "Welcome to Our Family",
      subtitle: "Where every heart finds home",
    },
    {
      gradient: "from-amber-400 via-orange-500 to-red-600",
      title: "Faith • Hope • Love",
      subtitle: "Growing together in Christ",
    },
    {
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      title: "Blessed to Have You",
      subtitle: "Your journey starts here",
    },
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (!mounted) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8 relative overflow-hidden rounded-3xl h-48 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white">
            God&apos;s Love Surrounds You
          </h3>
          <p className="text-white/90 text-lg font-medium">
            Experience His presence today
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mb-8 relative overflow-hidden rounded-3xl h-48"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
          className={`absolute inset-0 bg-gradient-to-r ${banners[currentBanner].gradient} flex items-center justify-center text-center`}
        >
          <div className="relative z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <Sparkles className="w-6 h-6 text-white/80" />
              <h3 className="text-3xl font-bold text-white">
                {banners[currentBanner].title}
              </h3>
              <Sparkles className="w-6 h-6 text-white/80" />
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/90 text-lg font-medium"
            >
              {banners[currentBanner].subtitle}
            </motion.p>
          </div>

          {/* Floating decorative elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.42, 0, 0.58, 1],
            }}
            className="absolute top-4 left-8"
          >
            <Heart className="w-8 h-8 text-white/30" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.42, 0, 0.58, 1],
              delay: 1,
            }}
            className="absolute bottom-4 right-8"
          >
            <Star className="w-6 h-6 text-white/30" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Banner indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentBanner ? "bg-white" : "bg-white/40"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; top: number; delay: number }>
  >([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: [0.42, 0, 0.58, 1],
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
        />
      ))}
    </>
  );
};

export default function Home() {
  const [phone, setPhone] = useState("");
  const [guest, setGuest] = useState<Guest | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    street_address: "",
    state: "",
    country: "",
    country_code: "NG",
    age_group: "",
    gender: "",
    relationship: "Single",
    born_again: false,
    membership: false,
    heard_from: "",
    occupation: "",
    school: "",
  });

  // helper function to normalize phone
  const normalizePhone = (value: string) => {
    value = value.replace(/\s+/g, ""); // remove spaces
    if (value.startsWith("0")) {
      value = "+234" + value.slice(1);
    } else if (value.startsWith("234")) {
      value = "+" + value;
    } else if (!value.startsWith("+234") && value.length > 0) {
      value = "+234" + value;
    }
    return value;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "form" | "phone"
  ) => {
    // eslint-disable-next-line prefer-const
    let value = e.target.value;

    if (target === "phone") {
      setPhone(normalizePhone(value));
    } else if (target === "form") {
      const name = e.target.name;
      if (name === "phone") {
        setFormData((prev) => ({ ...prev, phone: normalizePhone(value) }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const showToastMessage = (message: string, type: "success" | "error") => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 4000);
  };

  const handleCheckGuest = async () => {
    if (!phone.trim()) {
      showToastMessage("Please enter a phone number", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://blastwelcome.onrender.com/guest/retrieve/${phone}/`
      );
      setGuest(res.data);
      setNotFound(false);
      showToastMessage("Guest found successfully!", "success");
    } catch (err) {
      setNotFound(true);
      setGuest(null);
      showToastMessage(
        "Guest not found. Please register as a new guest.",
        "error"
      );
    } finally {
      setIsLoading(false);
      setPhone("");
    }
  };

  const handleCreateGuest = async () => {
    // Basic validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone ||
      !formData.email
    ) {
      showToastMessage("Please fill in all required fields", "error");
      return;
    }

    setIsCreating(true);
    try {
      const apiData = {
        ...formData,
        born_again: formData.born_again ? "Yes" : "No",
        membership: formData.membership ? "Yes" : "No",
        status: "Submitted",
      };

      await axios.post(
        "https://blastwelcome.onrender.com/guest/create/",
        apiData
      );
      showToastMessage("Welcome! Guest registered successfully!", "success");
      setGuest(apiData);
      setNotFound(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data) {
        if (err.response && err.response.data) {
          const errorData = err.response.data;
          if (errorData.phone) {
            showToastMessage(errorData.phone[0], "error");
          } else {
            showToastMessage(
              "Error creating guest. Please try again.",
              "error"
            );
          }
        }
      }
    } finally {
      setIsCreating(false);
    }
  };

  const resetForm = () => {
    setPhone("");
    setGuest(null);
    setNotFound(false);
    setFormData({
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      street_address: "",
      state: "",
      country: "",
      country_code: "NG",
      age_group: "",
      gender: "",
      relationship: "Single",
      born_again: false,
      membership: false,
      heard_from: "",
      occupation: "",
      school: "",
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 pt-10 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        <FloatingParticles />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            Welcome Home
          </h1>
          <p className="text-xl text-purple-200 font-light">
            We&apos;re blessed to have you join us today 🙏
          </p>
        </motion.div>

        <RotatingBanner />

        {/* Phone Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Enter phone number</h2>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="tel"
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  placeholder="+234XXXXXXXXXX"
                  value={phone}
                  onChange={(e) => handleChange(e, "phone")}
                  onKeyPress={(e) => e.key === "Enter" && handleCheckGuest()}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckGuest}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                {isLoading ? "Searching..." : "Check"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Guest Found Section */}
        <AnimatePresence>
          {guest && !notFound && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-8 w-full max-w-md"
            >
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-emerald-400/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-100">
                    Welcome Back!
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-emerald-300" />
                    <span className="text-lg font-semibold">
                      {guest.first_name} {guest.last_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-300" />
                    <span>{guest.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-300" />
                    <span>{guest.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <School className="w-5 h-5 text-emerald-300" />
                    <span>{guest.school === "na" ? "None" : guest.school}</span>
                  </div>
                  {guest.street_address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-emerald-300" />
                      <span>{guest.street_address}</span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetForm}
                  className="mt-6 w-full bg-white/10 hover:bg-white/20 py-3 rounded-2xl font-medium transition-all duration-300"
                >
                  Check Another Guest
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Registration Form */}
        <AnimatePresence>
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-8 w-full max-w-2xl"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Join Our Family</h2>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {/* Personal Information Section */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-200 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="First Name *"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name: e.target.value,
                          })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="Last Name *"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name: e.target.value,
                          })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      >
                        <option value="" className="bg-purple-900">
                          Select Gender
                        </option>
                        <option value="Male" className="bg-purple-900">
                          Male
                        </option>
                        <option value="Female" className="bg-purple-900">
                          Female
                        </option>
                        <option value="Other" className="bg-purple-900">
                          Other
                        </option>
                      </motion.select>

                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        value={formData.age_group}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            age_group: e.target.value,
                          })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      >
                        <option value="" className="bg-purple-900">
                          Age Group
                        </option>
                        <option value="Child (0-12)" className="bg-purple-900">
                          Child (0-12)
                        </option>
                        <option value="Teen (13-19)" className="bg-purple-900">
                          Teen (13-19)
                        </option>
                        <option
                          value="Young Adult (20-35)"
                          className="bg-purple-900"
                        >
                          Young Adult (20-35)
                        </option>
                        <option value="Adult (36-55)" className="bg-purple-900">
                          Adult (36-55)
                        </option>
                        <option value="Senior (55+)" className="bg-purple-900">
                          Senior (55+)
                        </option>
                      </motion.select>
                    </div>

                    <motion.select
                      whileFocus={{ scale: 1.02 }}
                      value={formData.relationship}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          relationship: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="Single" className="bg-purple-900">
                        Single
                      </option>
                      <option value="Married" className="bg-purple-900">
                        Married
                      </option>
                      <option value="Divorced" className="bg-purple-900">
                        Divorced
                      </option>
                      <option value="Widowed" className="bg-purple-900">
                        Widowed
                      </option>
                    </motion.select>
                  </motion.div>

                  {/* Contact Information Section */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-200 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Contact Information
                    </h3>

                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => handleChange(e, "form")}
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />

                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />

                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="Street Address"
                      value={formData.street_address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          street_address: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />

                    <div className="grid grid-cols-3 gap-3">
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="Country"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      />
                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        value={formData.country_code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            country_code: e.target.value,
                          })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      >
                        <option value="NG" className="bg-purple-900">
                          🇳🇬 NG
                        </option>
                        <option value="US" className="bg-purple-900">
                          🇺🇸 US
                        </option>
                        <option value="UK" className="bg-purple-900">
                          🇬🇧 UK
                        </option>
                        <option value="CA" className="bg-purple-900">
                          🇨🇦 CA
                        </option>
                      </motion.select>
                    </div>
                  </motion.div>

                  {/* Professional & Educational Information */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-200 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Professional & Education
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="Occupation"
                        value={formData.occupation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            occupation: e.target.value,
                          })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="School/University"
                        value={formData.school}
                        onChange={(e) =>
                          setFormData({ ...formData, school: e.target.value })
                        }
                        className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="How did you hear about us?"
                      value={formData.heard_from}
                      onChange={(e) =>
                        setFormData({ ...formData, heard_from: e.target.value })
                      }
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>

                  {/* Spiritual Information */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="text-lg font-semibold text-pink-200 flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Spiritual Journey
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Born Again Toggle */}
                      <div className="space-y-2">
                        <label className="text-sm text-purple-200">
                          Are you born again?
                        </label>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              born_again: !formData.born_again,
                            })
                          }
                          className={`w-full p-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                            formData.born_again
                              ? "bg-green-500/20 border-green-400/50 text-green-200"
                              : "bg-white/10 border-white/20 text-white"
                          }`}
                        >
                          <motion.div
                            animate={{ scale: formData.born_again ? 1.2 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {formData.born_again ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-current rounded-full" />
                            )}
                          </motion.div>
                          {formData.born_again ? "Yes" : "No"}
                        </motion.button>
                      </div>

                      {/* Membership Toggle */}
                      <div className="space-y-2">
                        <label className="text-sm text-purple-200">
                          Like to be a member?
                        </label>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              membership: !formData.membership,
                            })
                          }
                          className={`w-full p-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                            formData.membership
                              ? "bg-blue-500/20 border-blue-400/50 text-blue-200"
                              : "bg-white/10 border-white/20 text-white"
                          }`}
                        >
                          <motion.div
                            animate={{ scale: formData.membership ? 1.2 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {formData.membership ? (
                              <Users className="w-5 h-5" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-current rounded-full" />
                            )}
                          </motion.div>
                          {formData.membership ? "Yes" : "No"}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateGuest}
                  disabled={isCreating}
                  className="mt-8 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <UserPlus className="w-5 h-5" />
                  )}
                  {isCreating ? "Registering..." : "Register Guest"}
                </motion.button>

                <p className="text-sm text-purple-200 mt-4 text-center">
                  * Required fields
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notifications */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.9 }}
              className="fixed top-6 right-6 z-100 mt-10"
            >
              <div
                className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
                  showToast.type === "success"
                    ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-100"
                    : "bg-red-500/20 border-red-400/30 text-red-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {showToast.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-xs font-bold">!</span>
                    </div>
                  )}
                  <span className="font-medium">{showToast.message}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
