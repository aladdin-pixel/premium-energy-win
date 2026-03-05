import { CheckCircle2 } from "lucide-react";

const benefits = [
"Access to the Smart Energy Pay ecosystem",
"Participation in the future of energy and finance",
"Up to 25% discount on new BMW and Mercedes vehicles",
"Long-term utility, not short-term speculation"];


const Features = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            This starts with real-world benefits
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Getting a Smart Energy Pays Premium account gives you access to tangible, immediate advantages — independent of the game outcome.

          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((benefit) =>
          <div
            key={benefit}
            className="glass rounded-xl p-6 flex items-start gap-4 transition-all hover:border-primary/40 hover:glow-green">

              <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={22} />
              <span className="text-foreground text-base">{benefit}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default Features;