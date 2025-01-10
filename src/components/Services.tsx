const services = [
  {
    title: "PANES",
    image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4", // Clear glass roof image
  },
  {
    title: "FRAMES",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334", // Silver iMac image
  },
  {
    title: "TRACKS",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", // Software/web code image
  },
  {
    title: "HARD WATER",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716", // Concrete bridge and waterfalls
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