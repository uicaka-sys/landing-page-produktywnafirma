import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary -z-10" />
      
      <div className="container mx-auto max-w-6xl text-center animate-fade-in">
        <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary animate-slide-up">
          🚀 Welcome to the Future
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Build Something Amazing Today
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Transform your ideas into reality with our powerful platform. 
          Fast, reliable, and built for creators like you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="text-lg px-8 group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 hover:scale-105 transition-all">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
