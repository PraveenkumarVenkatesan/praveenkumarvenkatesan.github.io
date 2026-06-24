import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllBlogPosts, BlogPost } from "@/lib/blogLoader";

const Blogs = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const blogPosts = getAllBlogPosts();

  return (
    <Layout>
      <div className="page-container">
        <div className="content-container">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16 animate-fade-in">
            <h1 className="section-title text-3xl sm:text-4xl mb-4">Blogs</h1>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Thoughts on climate science, complex systems, and research insights
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={post.slug}
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
              <article
                className={`glass-panel overflow-hidden group h-full transition-all duration-300 ease-out cursor-pointer ${
                  hoveredIndex === null
                    ? ""
                    : hoveredIndex === index
                    ? "scale-[1.08] shadow-glow border-primary/60 z-20 relative -translate-y-2"
                    : "blur-[2px] opacity-40 scale-[0.97]"
                }`}
                onClick={() => setSelectedPost(post)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Thumbnail */}
                {post.thumbnail && (
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="p-5 sm:p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 mb-4">
                    {post.category}
                  </span>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground mb-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
              </div>
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className="glass-panel-subtle p-6 sm:p-8 text-center animate-fade-in">
              <p className="text-muted-foreground text-sm sm:text-base">
                No blog posts yet. Add markdown files to <code className="bg-muted px-2 py-1 rounded text-xs">src/content/blogs/</code>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Blog Post Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 lg:p-10 bg-background border-border">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                    {selectedPost.category}
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-serif font-semibold text-foreground">
                  {selectedPost.title}
                </DialogTitle>
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedPost.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </span>
                </div>
              </DialogHeader>
              <DialogDescription className="sr-only">
                {selectedPost.excerpt}
              </DialogDescription>
              <div className="mt-6 prose prose-sm sm:prose dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary prose-a:text-primary prose-li:text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Blogs;
