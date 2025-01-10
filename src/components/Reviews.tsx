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
    name: "Kathy B.",
    rating: 5,
    text: "Excellent service! They did a fantastic job on my windows and screens. Very professional and thorough. I highly recommend them.",
    date: "March 2024"
  },
  {
    name: "John D.",
    rating: 5,
    text: "Great service! They were on time, professional, and did an amazing job on my windows. I will definitely use them again.",
    date: "March 2024"
  },
  {
    name: "Mary S.",
    rating: 5,
    text: "They did an excellent job on my windows. Very professional and courteous. I highly recommend them.",
    date: "February 2024"
  },
  {
    name: "Robert M.",
    rating: 5,
    text: "Outstanding service! My windows have never looked better. The team was professional, efficient, and thorough.",
    date: "February 2024"
  },
  {
    name: "Patricia H.",
    rating: 5,
    text: "Fantastic work! They removed years of hard water stains from my windows. Very pleased with the results.",
    date: "January 2024"
  },
  {
    name: "James W.",
    rating: 5,
    text: "Excellent service and results! The team was professional and did a great job on my windows. Will definitely use them again.",
    date: "January 2024"
  },
  {
    name: "Linda K.",
    rating: 5,
    text: "Very satisfied with the service. They were prompt, professional, and did an excellent job cleaning my windows.",
    date: "December 2023"
  },
  {
    name: "William P.",
    rating: 5,
    text: "Great experience! The team was professional and thorough. My windows look amazing.",
    date: "December 2023"
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