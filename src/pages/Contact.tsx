import { Layout } from "@/components/Layout";
import { Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="page-container flex items-center min-h-[80vh]">
        <div className="content-container">
          {/* Header */}
          <div className="text-center mb-16 2xl:mb-20 animate-fade-in">
            <h1 className="section-title mb-4">Get in Touch</h1>
            <div className="w-16 2xl:w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-lg 2xl:max-w-xl mx-auto text-base 2xl:text-lg">
              I'm always interested in discussing research collaborations, speaking opportunities, 
              or just connecting with fellow researchers.
            </p>
          </div>

          {/* Contact cards */}
          <div className="max-w-2xl 2xl:max-w-3xl mx-auto grid md:grid-cols-2 gap-6 2xl:gap-8">
            {/* Email */}
            <a
              href="mailto:praveen2vsp@gmail.com"
              className="glass-panel p-8 2xl:p-10 text-center group hover-glow animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 2xl:w-20 2xl:h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 2xl:w-10 2xl:h-10 text-primary" />
              </div>
              <h3 className="text-lg 2xl:text-xl font-semibold text-foreground mb-2">Email</h3>
              <p className="text-primary font-medium group-hover:underline text-base 2xl:text-lg">
                praveen2vsp@gmail.com
              </p>
            </a>

            {/* Address */}
            <div
              className="glass-panel p-8 2xl:p-10 text-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 2xl:w-20 2xl:h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 2xl:w-10 2xl:h-10 text-primary" />
              </div>
              <h3 className="text-lg 2xl:text-xl font-semibold text-foreground mb-2">Office</h3>
              <p className="text-muted-foreground text-sm 2xl:text-base leading-relaxed">
                Centre of Excellence for studying Critical Transitions in Complex Systems (CoE - CTCS)<br />
                Room 416, New Academic Complex 2<br />
                Indian Institute of Technology Madras<br />
                Chennai, India 600 036.
              </p>
            </div>
          </div>

          {/* Decorative element */}
          <div className="mt-16 2xl:mt-20 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-muted-foreground text-sm 2xl:text-base">
              Response time: Usually within 1-2 working days
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
