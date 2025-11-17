const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build Better Products with Our Team
          </h1>
          <p className="text-gray-600 mb-6">
            We deliver modern digital solutions for web, mobile, and cloud.
            Discover our projects, happy clients, and let&apos;s work together.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="flex-1">
          {/* Here you can use provided hero image/graphics */}
          <div className="w-full h-64 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-3xl shadow-inner flex items-center justify-center">
            <span className="text-gray-400">
              {/* Placeholder, replace with asset */}
              Hero Illustration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
