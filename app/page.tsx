import { getSortedPostsData } from '@/lib/posts';
import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import ExperienceItem from './experience-item.component';
import experiences from './experiences.constant';
import styles from './page.module.css';
import Image from 'next/image'

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div>
      <div>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.profileImage}>
            <Image
              src="/me.jpeg"
              alt="Your profile"
              width="300"
              height="300"
            />
          </div>
          <h1 className={styles.heroTitle}>Hey, I&apos;m Rado</h1>
          <p className={styles.heroSubtitle}>
            Welcome to my space.
          </p>

          {/* Social links */}
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/radostinpetrov" 
              className={styles.socialLink} 
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/radostin-petrov" 
              className={styles.socialLink} 
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:radostin.petrov99@gmail.com" 
              className={styles.socialLink} 
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </section>

        {/* About section */}
        <section id="about" className={styles.aboutSection}>
          <div className={styles.aboutContainer}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.aboutText}>
              I&apos;m a software engineer based in London, UK. I have graduated from Imperial College London with 
              a MEng in Computing. I worked as a software developer in the hedge fund space and have full-stack 
              experience. I enjoy working in an agile setting, and researching cutting-edge tools to solve hefty problems.
            </p>
          </div>
        </section>

        {/* Journey section */}
        <section id="projects" className={styles.journeySection}>
          <div className={styles.journeyContainer}>
            <h2 className={styles.journeyTitle}>Journey</h2>
            <div className={styles.experienceGrid}>
              {experiences.map((exp, index) => 
                <ExperienceItem
                  key={index}
                  dateStart={exp.dateStart}
                  dateEnd={exp.dateEnd}
                  name={exp.name}
                  description={exp.description}
                  technologies={exp.technologies}
                  className=''
                />
              )}
            </div>
          </div>
        </section>

        {/* Blog preview section */}
        <section className={styles.blogSection}>
          <div className={styles.blogContainer}>
            <div className={styles.blogHeader}>
              <h2 className={styles.blogTitle}>Latest Posts</h2>
              <Link href="/blog" className={styles.viewAllLink}>
                View all <ExternalLink size={16} />
              </Link>
            </div>
            <div className={styles.blogList}>
              {allPostsData.map(({ id, title }) => (
                <div key={id} className={styles.blogCard}>
                  <h2 className={styles.blogPostTitle}>
                    <Link 
                      href={`/blog/${id}`}
                      className={styles.blogPostLink}
                    >
                      {title}
                    </Link>
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactContainer}>
            <h2 className={styles.contactTitle}>Get In Touch</h2>
            <a
              href="mailto:radostin.petrov99@gmail.com"
              className={styles.contactButton}
            >
              Say Hello
            </a>

            <div className={styles.contactSocialLinks}>
              <a 
                href="https://github.com/radostinpetrov" 
                className={styles.contactSocialLink}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/radostin-petrov" 
                className={styles.contactSocialLink}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:radostin.petrov99@gmail.com" 
                className={styles.contactSocialLink}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}