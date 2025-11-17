import { motion } from "framer-motion";
import { HiStar, HiUsers } from "react-icons/hi";

const ClientsSection = ({ clients = [] }) => {
  console.log("ClientsSection received clients:", clients);

  return (
    <section
      id="clients"
      className="relative z-10 py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium mb-4"
          >
            <HiUsers className="w-4 h-4" />
            <span>Testimonials</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from people who’ve trusted us with their projects.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        {clients && clients.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="relative group"
              >
                <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-white/60">

                  {/* Decorative Quote */}
                  <div className="absolute top-6 right-6 text-7xl text-purple-100 font-serif leading-none select-none">
                    &quot;
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-800 text-base leading-relaxed mb-10 relative z-10">
                    &quot;{client.description}&quot;
                  </p>

                  {/* Client Info Block */}
                  <div className="flex flex-col items-center text-center border-t border-gray-200 pt-6">

                    {/* Avatar w/ Glow */}
                    <motion.div
                      className="relative mb-4"
                      whileHover={{ scale: 1.07 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-md opacity-60 group-hover:opacity-90 transition-opacity"></div>

                      <img
                        src={client.imageUrl}
                        alt={client.name}
                        className="relative w-16 h-16 rounded-full object-cover ring-4 ring-white"
                      />
                    </motion.div>

                    {/* Name & Designation */}
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {client.designation}
                    </p>

                    {/* ⭐ Star Ratings */}
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <HiStar
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                  </div>

                  {/* Subtle Glow Border */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-900/5 group-hover:ring-purple-400/50 transition-all"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <HiUsers className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">
              No testimonials yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
