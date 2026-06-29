import { withBaseUrl } from "@/lib/utils";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  thumbnail?: string;
}

// Import all markdown files from content/blogs
const blogModules = import.meta.glob('/src/content/blogs/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

function parseFrontmatter(content: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }

  const frontmatterStr = match[1];
  const markdownContent = match[2];
  
  const data: Record<string, string> = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });

  return { data, content: markdownContent };
}

export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, rawContent] of Object.entries(blogModules)) {
    const slug = path.replace('/src/content/blogs/', '').replace('.md', '');
    const { data, content } = parseFrontmatter(rawContent as string);
    
    posts.push({
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      content,
      date: data.date || '',
      readTime: data.readTime || '5 min read',
      category: data.category || 'General',
      thumbnail: withBaseUrl(data.thumbnail || undefined),
    });
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find(post => post.slug === slug);
}
