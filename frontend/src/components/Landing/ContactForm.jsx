import { useState } from "react";
import { motion } from 'framer-motion';
import { HiEnvelope, HiPhone, HiMapPin, HiCheckCircle } from 'react-icons/hi2';
import { submitContact } from "../../api/contactApi";

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setSuccess(false);
    
    try {
      await submitContact(form);
      setMsg("Thank you! We have received your details.");
      setSuccess(true);
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch {
      setMsg("Something went wrong. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-4"
            >
              <HiEnvelope className="w-4 h-4" />
              <span>Get In Touch</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Let's Build Something{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you as soon as possible.
            </p>

            {/* Contact info cards */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                  <HiEnvelope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email us</p>
                  <p className="font-semibold text-gray-900">soham171203@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                  <HiPhone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Call us</p>
                  <p className="font-semibold text-gray-900">+91 8305384160</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100/50 border border-pink-200/50"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center">
                  <HiMapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Visit us</p>
                  <p className="font-semibold text-gray-900">123 IT Park, Indore</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Mobile and City */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="+1 234 567 8900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="New York"
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {/* Success/Error message */}
                {msg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-xl ${
                      success
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {success && <HiCheckCircle className="w-5 h-5 flex-shrink-0" />}
                    <p className="text-sm font-medium">{msg}</p>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;