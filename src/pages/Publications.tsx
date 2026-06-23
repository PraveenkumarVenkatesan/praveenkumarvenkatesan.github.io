import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllPublications, getPublicationLink, type Publication } from "@/lib/publicationLoader";

type PublicationType = "journal" | "conference" | "preprint";

const Publications = () => {
  const [activeTab, setActiveTab] = useState<PublicationType>("journal");
  const publications = getAllPublications();

  const filteredPublications = publications.filter(
    (pub) => pub.type === activeTab
  );

  return (
    <Layout>
      <div className="page-container">
        <div className="content-container">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 2xl:mb-16">
            <h1 className="section-title text-3xl sm:text-4xl mb-4">Publications</h1>
            <div className="w-16 2xl:w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 2xl:gap-4 mb-8 sm:mb-12 2xl:mb-16 flex-wrap px-2">
            {["journal", "conference", "preprint"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as PublicationType)}
                className={cn(
                  "tab-button text-xs sm:text-sm 2xl:text-base px-3 sm:px-6 2xl:px-8 py-1.5 sm:py-2 2xl:py-2.5",
                  activeTab === tab && "active"
                )}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Publications */}
          <div className="space-y-4 sm:space-y-6 2xl:space-y-8">
            {filteredPublications.map((pub, index) => {
              const pubLink = getPublicationLink(pub);

              return (
                <article key={pub.slug} className="publication-card 2xl:p-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 2xl:gap-8">
                    {/* Number - hidden on very small screens */}
                    <div className="hidden sm:block w-12 2xl:w-16 text-center shrink-0">
                      <span className="text-2xl 2xl:text-3xl font-serif font-bold text-muted-foreground/50">
                        {String(filteredPublications.length - index).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Graphical abstract - hidden on small screens */}
                    <div className="hidden md:block shrink-0">
                      {pub.abstractImage ? (
                        <img
                          src={pub.abstractImage}
                          alt="Graphical abstract"
                          className="w-24 h-20 2xl:w-32 2xl:h-24 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-24 h-20 2xl:w-32 2xl:h-24 bg-muted/50 rounded-lg flex items-center justify-center border">
                          <FileText className="w-8 h-8 2xl:w-10 2xl:h-10 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2 2xl:space-y-3 min-w-0">
                      {/* Mobile number indicator */}
                      <div className="sm:hidden text-xs text-muted-foreground/50 font-medium">
                        #{filteredPublications.length - index}
                      </div>
                      
                      {/* Title - sans-serif, blue color */}
                      <h3 className="leading-snug text-sm sm:text-base 2xl:text-lg font-sans text-primary font-semibold">
                        {pub.title}
                      </h3>

                      {/* Authors */}
                      <p className="text-xs sm:text-sm 2xl:text-base text-muted-foreground">
                        {pub.authors.split(", ").map((author, i) => (
                          <span key={i}>
                            {i > 0 && ", "}
                            <span
                              className={
                                ["Praveenkumar Venkatesan", "P. Venkatesan"].some((name) =>
                                  author.includes(name)
                                )
                                  ? "font-semibold text-foreground"
                                  : ""
                              }
                            >
                              {author}
                            </span>
                          </span>
                        ))}
                      </p>

                      {/* Venue */}
                      <p className="text-xs sm:text-sm 2xl:text-base italic text-muted-foreground">
                        {pub.venue} ({pub.year})
                        {pub.doi && (
                          <span className="not-italic block sm:inline">
                            <span className="hidden sm:inline"> · </span>
                            <span className="sm:hidden"><br /></span>
                            DOI: <span className="font-mono text-xs 2xl:text-sm break-all">{pub.doi}</span>
                          </span>
                        )}
                      </p>
                    </div>

                    {/* External link icon */}
                    {pubLink && (
                      <div className="hidden sm:flex items-center shrink-0">
                        <a
                          href={pubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                          title="View publication"
                        >
                          <ExternalLink className="w-4 h-4 2xl:w-5 2xl:h-5" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Publications;
