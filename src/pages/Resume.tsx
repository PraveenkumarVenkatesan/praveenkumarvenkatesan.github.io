import { Layout } from "@/components/Layout";
import { Download, Briefcase, GraduationCap, Award, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const experience = [
  {
    title: "Project Associate",
    organization: "Indian Institute of Technology Madras",
    period: "2022 - 2024",
    description: "Network Structure of Transitions in Thermo Fluid Systems in Nature and Engineering",
  },

];

const education = [
  {
    degree: "Ph.D. in Aerospace Engineering",
    institution: "Indian Institute of Technology Madras",
    period: "2024 - present",
  },
  {
    degree: "M.Sc. in Physics",
    institution: "Bharathidasan University, Tiruchirappalli",
    year: "2022",
  },
  {
    degree: "B.Sc. in Physics",
    institution: "Periyar University, Salem",
    year: "2020",
  },
];

const awards = [
  { title: "NSF CAREER Award", year: "2023" },
  { title: "AGU Early Career Scientist Award", year: "2022" },
  { title: "Best Paper Award - Journal of Climate", year: "2021" },
  { title: "MIT Presidential Fellowship", year: "2012" },
];

const skills = [
  "Python", "Fortran", "C++", "HPC Computing",
  "Data Visualization", "CDO", "LaTex",  "Git",
];

const Resume = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="content-container">
          {/* Header */}
          <div className="text-center mb-16 2xl:mb-20 animate-fade-in">
            <h1 className="section-title mb-4">Resume</h1>
            <div className="w-16 2xl:w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            
            <Button asChild className="gap-2 bg-primary hover:bg-primary/90 2xl:text-base 2xl:px-6 2xl:py-3">
              <a href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
               <Download className="w-4 h-4 2xl:w-5 2xl:h-5" />
               View CV
               </a>
                </Button>

          </div>

          <div className="grid lg:grid-cols-3 gap-8 2xl:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8 2xl:space-y-10">
              {/* Experience */}
              <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
                  <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl 2xl:text-3xl font-serif font-semibold">Experience</h2>
                </div>
                <div className="space-y-4 2xl:space-y-6">
                  {experience.map((item, index) => (
                    <div key={index} className="glass-panel p-6 2xl:p-8 relative overflow-hidden group">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 group-hover:bg-primary transition-colors" />
                      <div className="pl-4 2xl:pl-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h3 className="text-lg 2xl:text-xl font-semibold text-foreground">{item.title}</h3>
                          <span className="text-sm 2xl:text-base text-primary font-medium">{item.period}</span>
                        </div>
                        <p className="text-muted-foreground font-medium mb-2 text-base 2xl:text-lg">{item.organization}</p>
                        <p className="text-muted-foreground text-sm 2xl:text-base">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
                  <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl 2xl:text-3xl font-serif font-semibold">Education</h2>
                </div>
                <div className="glass-panel p-6 2xl:p-8 space-y-4 2xl:space-y-6">
                  {education.map((item, index) => (
                    <div key={index} className="flex justify-between items-start border-b border-border/30 last:border-0 pb-4 2xl:pb-6 last:pb-0">
                      <div>
                        <h3 className="font-semibold text-foreground text-base 2xl:text-lg">{item.degree}</h3>
                        <p className="text-muted-foreground text-sm 2xl:text-base">{item.institution}</p>
                      </div>
                      <span className="text-primary font-medium text-sm 2xl:text-base">{item.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
           
              {/* Skills */}
              <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
                  <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Code className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary" />
                  </div>
                  <h2 className="text-xl 2xl:text-2xl font-serif font-semibold">Skills</h2>
                </div>
                <div className="glass-panel-subtle p-6 2xl:p-8">
                  <div className="flex flex-wrap gap-2 2xl:gap-3">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 2xl:px-4 2xl:py-2 bg-primary/10 text-primary text-xs 2xl:text-sm font-medium rounded-md border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Resume;
