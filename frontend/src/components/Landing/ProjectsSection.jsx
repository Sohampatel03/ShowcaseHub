import { motion } from "framer-motion";
import { HiArrowRight, HiFolder } from "react-icons/hi";

const ProjectsSection = ({ projects = [] }) => {
  // Debug – you can keep or remove this later
  console.log("ProjectsSection received projects:", projects);

  return (
    <section
      id="projects"
      className="relative z-10 py-20 md:py-28 bg-white"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-4"
          >
            <HiFolder className="w-4 h-4" />
            <span>Our Portfolio</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest work and see how we help businesses transform
            their digital presence.
          </p>
        </motion.div>

        {/* Projects grid */}
        {projects && projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Image container */}
                <div className="relative h-56 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>

                  <motion.button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all"
                    whileHover={{ x: 4 }}
                  >
                    Read More
                    <HiArrowRight className="w-4 h-4" />
                  </motion.button>
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
              <HiFolder className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">
              No projects added yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
