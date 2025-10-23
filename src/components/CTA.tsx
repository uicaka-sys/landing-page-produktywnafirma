import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary to-accent text-primary-foreground">
      <div className="container mx-auto max-w-4xl text-center animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-12 opacity-90">
          Join thousands of creators building amazing things every day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 group hover:scale-105 transition-all"
          >
            Start Building Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all"
          >
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
