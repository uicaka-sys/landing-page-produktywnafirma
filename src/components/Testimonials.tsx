import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    content: "This platform transformed how we build products. Absolutely game-changing!",
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Product Designer",
    content: "The best tool I've used. It's intuitive, powerful, and just works.",
    initials: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    content: "We launched in weeks instead of months. This is the future of development.",
    initials: "ER",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Creators
          </h2>
          <p className="text-xl text-muted-foreground">
            See what people are saying
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar className="bg-gradient-to-br from-primary to-accent">
                    <AvatarFallback className="bg-transparent text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
