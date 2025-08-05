
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import styles from './blog-index.module.css';

export default function Blog() {
  
  try {
    const allPostsData = getSortedPostsData();
    console.log("Found posts:", allPostsData);
    
    if (allPostsData.length === 0) {
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.empty}>No blog posts found. Create some in the /posts directory!</p>
        </div>
      );
    }
    
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Blog</h1>
        <div className={styles.list}>
          {allPostsData.map(({ id, date, title, description }) => (
            <div key={id} className={styles.card}>
              <h2 className={styles.cardTitle}>
<Link 
  href={`/blog/${id}`}
  className={styles.cardLink}
>
  {title}
</Link>
              </h2>
              <div className={styles.date}>
                {format(new Date(date), 'MMMM d, yyyy')}
              </div>
              <p className={styles.description}>{description}</p>
              <div className={styles.readMoreWrap}>
                <Link 
  href={`/blog/${encodeURIComponent(id)}`}  // Make sure to encode the ID
  className={styles.readMore}
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
      <div className={styles.container}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.error}>Error loading blog posts. Check console for details.</p>
      </div>
    );
  }
}