const services = [
  {
    title: "PANES",
    description: "Crystal clear window panes that sparkle",
    image: "", // Placeholder for new image
  },
  {
    title: "FRAMES",
    description: "Clean and maintained window frames",
    image: "", // Placeholder for new image
  },
  {
    title: "TRACKS",
    description: "Smooth operating window tracks",
    image: "", // Placeholder for new image
  },
  {
    title: "HARD WATER",
    description: "Hard water stain removal",
    image: "", // Placeholder for new image
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-rubik font-bold text-center mb-16">
          WHAT WE DO
        </h2>
        <div className="flex justify-between items-start gap-4">
          {services.map((service) => (
            <div key={service.title} className="text-center w-1/4">
              <div className="relative mb-4 w-48 h-48 mx-auto overflow-hidden rounded-lg bg-gray-100">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                )}
              </div>
              <h3 className="font-rubik font-bold text-xl mb-2">{service.title}</h3>
              <p className="font-nunito text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};