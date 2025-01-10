import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "They did an amazing job cleaning our windows! The hard water stains that had been there for years are completely gone.",
    date: "March 2024"
  },
  {
    name: "Michael Chen",
    rating: 5,
    text: "Professional service from start to finish. The team was punctual, courteous, and thorough with their work.",
    date: "February 2024"
  },
  {
    name: "Emily Rodriguez",
    rating: 5,
    text: "Best window cleaning service in the area! They restored our shower glass to like-new condition.",
    date: "January 2024"
  }
];

export const Reviews = () => {
  return (
    <section className="py-20 bg-ruby-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-rubik font-bold text-center mb-16">
          REVIEWS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-white">
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
          ))}
        </div>
      </div>
    </section>
  );
};