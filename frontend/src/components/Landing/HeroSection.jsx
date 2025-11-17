import { motion } from 'framer-motion';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png';

const HeroSection = () => {
  const cardImages = [img1, img2, img3, img4];

  return (
    <section
      className="relative bg-gradient-to-br from-indigo-50 via-white to-pink-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden sm:block absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div
          className="hidden sm:block absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6"
            >
              <HiSparkles className="w-4 h-4" />
              <span>Building the future, one project at a time</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Build Better Products with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Team
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We deliver modern digital solutions for web, mobile, and cloud.
              Discover our projects, happy clients, and let&apos;s work together.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
            </motion.div>

            {/* Small stats row */}
            <motion.div
              className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Trusted by 50+ clients
              </span>
              <span className="hidden sm:inline-block text-gray-300">•</span>
              <span>100+ projects delivered</span>
            </motion.div>
          </motion.div>

          {/* Right illustration */}
          <motion.div
            className="flex-1 w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20" />
              <motion.div
                className="relative bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-3xl shadow-2xl p-8 backdrop-blur-sm"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="space-y-4">
                  {/* Window header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-300" />
                      <span className="w-2 h-2 rounded-full bg-yellow-300" />
                      <span className="w-2 h-2 rounded-full bg-green-300" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      Dashboard
                    </span>
                  </div>

                  {/* Simulated code blocks */}
                  <motion.div
                    className="h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full w-3/4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-4 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full w-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-4 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full w-5/6"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                  />

                  {/* Grid of cards */}
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    {cardImages.map((src, i) => (
                      <motion.div
                        key={i}
                        className="aspect-square rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg"
                        whileHover={{ scale: 1.05, y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={src}
                          alt={`Project ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
