export interface Publication {
  slug: string;
  type: "journal" | "conference" | "preprint";
  title: string;
  authors: string;
  venue: string;
  year: string;
  link?: string;
  journalLink?: string;
  preprintLink?: string;
  doi?: string;
  abstractImage?: string;
}

// Import all markdown files from content/publications
const publicationModules = import.meta.glob('/src/content/publications/*.md', { 
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

export function getAllPublications(): Publication[] {
  const publications: Publication[] = [];

  for (const [path, rawContent] of Object.entries(publicationModules)) {
    const slug = path.replace('/src/content/publications/', '').replace('.md', '');
    const { data } = parseFrontmatter(rawContent as string);
    
    publications.push({
      slug,
      type: (data.type as "journal" | "conference" | "preprint") || "preprint",
      title: data.title || 'Untitled',
      authors: data.authors || '',
      venue: data.venue || '',
      year: data.year || '',
      link: data.link || undefined,
      journalLink: data.journalLink || undefined,
      preprintLink: data.preprintLink || undefined,
      doi: data.doi || undefined,
      abstractImage: data.abstractImage
        ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${data.abstractImage.startsWith('/') ? '' : '/'}${data.abstractImage}`
        : undefined,
    });
  }

  // Sort by year (newest first), then by slug for consistency
  return publications.sort((a, b) => {
    const yearDiff = parseInt(b.year || '0') - parseInt(a.year || '0');
    if (yearDiff !== 0) return yearDiff;
    return b.slug.localeCompare(a.slug);
  });
}

export function getPublicationLink(pub: Publication): string | undefined {
  if (pub.type === "journal") return pub.journalLink;
  if (pub.type === "preprint") return pub.preprintLink;
  return pub.link;
}
