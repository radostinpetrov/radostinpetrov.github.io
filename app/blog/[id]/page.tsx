import { getPostData, getAllPostIds } from '@/lib/posts';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './blog.module.css';

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
      <article className={styles.article}>
        <div className={styles.header}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to all posts
          </Link>
          <h1 className={styles.title}>{postData.title}</h1>
          <div className={styles.date}>
            {format(new Date(postData.date), 'MMMM d, yyyy')}
          </div>
        </div>
        
        <div 
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
        />
      </article>
    );
  } catch (error) {
    console.error(`Error loading post ${id}:`, error);
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>Error Loading Post</h1>
        <p className={styles.errorText}>Unable to load the requested blog post.</p>
        <Link href="/blog" className={styles.errorLink}>
          Return to blog
        </Link>
      </div>
    );
  }
}