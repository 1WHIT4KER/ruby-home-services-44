const services = [
  {
    title: "PANES",
    description: "Crystal clear window panes that sparkle",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
  },
  {
    title: "FRAMES",
    description: "Clean and maintained window frames",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80",
  },
  {
    title: "TRACKS",
    description: "Smooth operating window tracks",
    image: "https://images.unsplash.com/photo-1590586029974-2c89f9dfd898?auto=format&fit=crop&q=80",
  },
  {
    title: "HARD WATER",
    description: "Hard water stain removal",
    image: "https://images.unsplash.com/photo-1562886877-6543c99c214f?auto=format&fit=crop&q=80",
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-rubik font-bold text-center mb-16">
          WHAT WE DO
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="text-center">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
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