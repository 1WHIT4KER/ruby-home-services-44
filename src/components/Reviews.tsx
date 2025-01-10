import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Meg B.",
    rating: 5,
    text: "They showed up when they said they would, did an excellent job making my windows sparkling clean and were such lovely guys, polite, friendly and professional!",
    date: "2024"
  },
  {
    name: "Jordan M.",
    rating: 5,
    text: "Reuben and has crew did an excellent job! They were very efficient and finished quickly! They added the sparkle I needed. ✨",
    date: "2024"
  },
  {
    name: "Merrit W.",
    rating: 5,
    text: "They were prompt and courteous and guaranteed their work. I will be using them again and again!",
    date: "2024"
  },
  {
    name: "Dave B.",
    rating: 5,
    text: "Finally we have lights that look professional and stunning! And they put them up really swiftly. Very polite well mannered young men and I would hire them again in a heart beat!!👌🏻I have recommended them to my neighbors and friend:)",
    date: "2024"
  },
  {
    name: "Erin H.",
    rating: 5,
    text: "They we're prompt and did a great job! I will use them again.",
    date: "2024"
  }
];

export const Reviews = () => {
  return (
    <section className="py-20 bg-ruby-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-rubik font-bold text-center mb-16">
          REVIEWS
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-white h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 font-nunito">{review.text}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="font-semibold">{review.name}</span>
                      <span>{review.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
