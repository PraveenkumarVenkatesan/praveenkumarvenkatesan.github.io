import { Layout } from "@/components/Layout";
import { GraduationCap, Award, BookOpen, Globe } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "M. Sc., Physics @ BDU",
  }
];

const About = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="content-container">
          {/* Header */}
          <div className="text-center mb-16 2xl:mb-20 animate-fade-in">
            <h1 className="section-title mb-4">About Me</h1>
            <div className="w-16 2xl:w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12 2xl:gap-16 items-start">
            {/* Bio section */}
            <div className="lg:col-span-3 space-y-6 2xl:space-y-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="glass-panel p-8 2xl:p-10 space-y-6 2xl:space-y-8">
                <h2 className="text-2xl 2xl:text-3xl font-serif font-semibold text-foreground">
                  Research Focus
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base 2xl:text-lg">
                  I study extreme climate events through the lens of complex systems theory, with an emphasis on 
                  understanding how nonlinear interactions, feedback processes, and emergent patterns shape their behavior. 
                  My research seeks to uncover the underlying mechanisms that lead to rare, high-impact events by analyzing how 
                  multiscale interactions within the climate system give rise to extremes, variability, and abrupt changes.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base 2xl:text-lg">
                  By integrating ideas from complexity science with climate data and physics-based models, I work toward identifying 
                  early warning signals of critical transitions, improving the predictability of extreme events, and advancing quantitative 
                  assessments of climate risk. This approach allows for a deeper understanding of tipping behavior and resilience in the climate system, 
                  with the broader goal of informing more effective adaptation and mitigation strategies.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base 2xl:text-lg">
                 Currently, I am based at the Centre of Excellence for Studying Critical Transitions at IIT Madras, where my research spans both dynamical 
                  systems theory and complex systems theory. At the centre, we investigate critical transitions in thermofluid systems, including applications 
                  to rocket engines and climate systems, using unified theoretical and data-driven frameworks to understand instability, loss of predictability, 
                  and abrupt regime shifts across disciplines.
                </p>
              </div>

              <div className="glass-panel p-8 2xl:p-10 space-y-4 2xl:space-y-6">
                <h2 className="text-2xl 2xl:text-3xl font-serif font-semibold text-foreground">
                  Research Interests
                </h2>
                <div className="flex flex-wrap gap-3 2xl:gap-4">
                  {[
                    "Complex Networks",
                    "Nonlinear Dynamics",
                    "Climate Dynamics",
                    "Extreme Weather",
                    "Tropical Meteorology",
                    "Neuron Models",
                    "High Performance Computing",
                  ].map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 2xl:px-5 2xl:py-2.5 bg-primary/10 text-primary text-sm 2xl:text-base font-medium rounded-full border border-primary/20"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights sidebar */}
            <div className="lg:col-span-2 space-y-4 2xl:space-y-6">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="glass-panel-subtle p-6 2xl:p-8 animate-fade-in hover-glow"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 2xl:gap-5">
                    <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 2xl:w-7 2xl:h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-base 2xl:text-lg">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm 2xl:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
