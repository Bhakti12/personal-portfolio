import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache route for 1 hour

function parseMediumRSS(xmlText: string) {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];
    
    // Extract Title (handles CDATA and raw)
    let title = "";
    const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
    if (titleMatch) {
      title = titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
    }
    
    // Extract Link
    let link = "";
    const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
    if (linkMatch) {
      link = linkMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
    }
    
    // Extract pubDate
    let pubDate = "";
    const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    if (pubDateMatch) {
      pubDate = pubDateMatch[1].trim();
    }
    
    // Extract Content (for excerpt and image)
    let content = "";
    const contentMatch = itemContent.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
    if (contentMatch) {
      content = contentMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
    }
    
    // Extract first image src from content
    let coverImage = "";
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
      coverImage = imgMatch[1];
    }
    
    // Clean HTML tags and parse clean excerpt (first 140 chars)
    const cleanExcerpt = content
      .replace(/<[^>]+>/g, ' ') // remove tags
      .replace(/\s+/g, ' ')     // collapse spacing
      .trim()
      .substring(0, 140) + '...';
      
    // Calculate read time from content word count (approx 200 words/min)
    const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
    const readTime = Math.max(1, Math.ceil(words / 200));
    
    // Extract categories
    const categories: string[] = [];
    const catRegex = /<category>([\s\S]*?)<\/category>/g;
    let catMatch;
    while ((catMatch = catRegex.exec(itemContent)) !== null) {
      const cat = catMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
      categories.push(cat);
    }

    items.push({
      title,
      link,
      pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      excerpt: cleanExcerpt,
      coverImage: coverImage || null,
      source: 'Medium',
      readTime: `${readTime} min read`,
      tags: categories.slice(0, 3)
    });
  }
  return items;
}

export async function GET() {
  try {
    const res = await fetch('https://medium.com/feed/@sanghanibhakti922', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/xml, text/xml',
      },
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }
    
    const xmlText = await res.text();
    const posts = parseMediumRSS(xmlText);
    
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Medium feed:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
