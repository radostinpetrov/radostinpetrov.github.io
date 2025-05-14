
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';

export default function Blog() {
  
  try {
    const allPostsData = getSortedPostsData();
    console.log("Found posts:", allPostsData);
    
    if (allPostsData.length === 0) {
      return (
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-8">My Blog</h1>
          <p>No blog posts found. Create some in the /posts directory!</p>
        </div>
      );
    }
    
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">My Blog</h1>
        <div className="space-y-8">
          {allPostsData.map(({ id, date, title, description }) => (
            <div key={id} className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">
<Link 
  href={`/blog/${id}`}
  className="text-blue-600 hover:text-blue-800 hover:underline"
>
  {title}
</Link>
              </h2>
              <div className="text-gray-500 text-sm mb-3">
                {format(new Date(date), 'MMMM d, yyyy')}
              </div>
              <p className="text-gray-700">{description}</p>
              <div className="mt-4">
                <Link 
  href={`/blog/${encodeURIComponent(id)}`}  // Make sure to encode the ID
  className="text-blue-600 hover:text-blue-800 font-medium"
>
  Read more →
</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering blog index:", error);
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">My Blog</h1>
        <p className="text-red-500">Error loading blog posts. Check console for details.</p>
      </div>
    );
  }
}