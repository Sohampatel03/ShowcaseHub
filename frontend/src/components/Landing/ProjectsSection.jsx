const ProjectsSection = ({ projects }) => {
  return (
    <section id="projects" className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Our Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
            >
              <div className="h-40 bg-gray-100">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 flex-1">
                  {project.description}
                </p>
                <button
                  className="mt-4 text-sm font-medium text-blue-600"
                  type="button"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-gray-500">
              No projects added yet. Please check back later.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
