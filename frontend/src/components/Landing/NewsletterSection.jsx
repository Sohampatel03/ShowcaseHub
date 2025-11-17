import { useState } from "react";
import { motion } from 'framer-motion';
import { HiEnvelope, HiCheckCircle } from 'react-icons/hi2';
import { subscribeNewsletter } from "../../api/subscribersApi";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setSuccess(false);

    try {
      await subscribeNewsletter(email);
      setMsg("Thanks for subscribing! Check your inbox.");
      setSuccess(true);
      setEmail("");
    } catch {
      setMsg("Subscription failed. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <HiEnvelope className="w-8 h-8 text-white" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new projects, insights, and exclusive content delivered straight to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-full bg-white/95 backdrop-blur-sm border-2 border-white/50 focus:border-white focus:ring-4 focus:ring-white/20 transition-all outline-none text-gray-900 placeholder:text-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={loading}
                className="px-8 py-4 rounded-full bg-white text-purple-600 font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </motion.button>
            </div>

            {/* Message */}
            {msg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 flex items-center justify-center gap-2 p-3 rounded-full ${
                  success
                    ? 'bg-green-500/20 text-white border border-green-400/50'
                    : 'bg-red-500/20 text-white border border-red-400/50'
                }`}
              >
                {success && <HiCheckCircle className="w-5 h-5" />}
                <p className="text-sm font-medium">{msg}</p>
              </motion.div>
            )}
          </form>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-white/70"
          >
            Join 10,000+ subscribers • No spam, unsubscribe anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;