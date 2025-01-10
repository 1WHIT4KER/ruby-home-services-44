const services = [
  {
    title: "PANES",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c", // Window pane cleaning image
  },
  {
    title: "FRAMES",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705", // Window frame image
  },
  {
    title: "TRACKS",
    image: "https://images.unsplash.com/photo-1580741569354-f67ff23b11ce", // Window track/rail image
  },
  {
    title: "HARD WATER",
    image: "https://images.unsplash.com/photo-1585938761970-da8e8d447d63", // Water spots on glass image
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
              <h3 className="font-rubik font-bold text-xl">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};