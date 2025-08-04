import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml?: string;
}

export function getSortedPostsData(): PostData[] {
  try {
    // Get file names under /posts
    if (!fs.existsDirectory(postsDirectory)) {
      console.warn(`Posts directory not found at ${postsDirectory}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    
    if (!fileNames.length) {
      console.warn("No post files found in posts directory");
      return [];
    }
    
    
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
          id,
          ...(matterResult.data as { title: string; date: string; description: string }),
        };
      });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error getting sorted posts data:", error);
    return [];
  }
}

export function getAllPostIds() {
  try {
    // Ensure the posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory not found at ${postsDirectory}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        return {
          id: fileName.replace(/\.md$/, ''),
        };
      });
  } catch (error) {
    console.error("Error getting all post IDs:", error);
    return [];
  }
}

export async function getPostData(id: string): Promise<PostData> {
  if (!id) {
    throw new Error("Post ID is required");
  }
  
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post file not found: ${fullPath}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  // Configure to allow raw HTML
  const processedContent = await remark()
    .use(html, {
      sanitize: false  // Allow raw HTML tags
    })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; description: string }),
  };
}