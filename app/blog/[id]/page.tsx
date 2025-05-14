import { getPostData, getAllPostIds } from '@/lib/posts';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';



export async function generateStaticParams() {
  try {
    const posts = getAllPostIds();
    return posts;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Post({ params }: { params: Promise<{ id?: string }> }) {
  
  const resolvedParams = await params;
  
  const id = resolvedParams?.id;
  
  if (!id) {
    console.error("Missing id parameter");
    notFound();
  }
  
  try {
    const postData = await getPostData(id);
    
    return (
      <article className="max-w-3xl mx-auto py-10 px-4">
        <div className="mb-10">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to all posts
          </Link>
          <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
          <div className="text-gray-500">
            {format(new Date(postData.date), 'MMMM d, yyyy')}
          </div>
        </div>
        
        <div 
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
        />
      </article>
    );
  } catch (error) {
    console.error(`Error loading post ${id}:`, error);
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1>Error Loading Post</h1>
        <p>Unable to load the requested blog post.</p>
        <Link href="/blog" className="text-blue-600 hover:text-blue-800">
          Return to blog
        </Link>
      </div>
    );
  }
}