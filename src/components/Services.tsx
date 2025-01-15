const services = [
  {
    title: "PANES",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
  },
  {
    title: "FRAMES",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
  },
  {
    title: "TRACKS",
    image: "https://images.unsplash.com/photo-1580741569354-f67ff23b11ce",
  },
  {
    title: "HARD WATER",
    image: "https://images.unsplash.com/photo-1585938761970-da8e8d447d63",
  },
];

export const Services = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-rubik font-bold text-center mb-8 md:mb-16">
          WHAT WE DO
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {services.map((service) => (
            <div key={service.title} className="text-center">
              <div className="relative mb-3 md:mb-4 aspect-square mx-auto overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                )}
              </div>
              <h3 className="font-rubik font-bold text-lg md:text-xl">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};