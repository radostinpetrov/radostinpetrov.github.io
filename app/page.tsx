import { getSortedPostsData } from '@/lib/posts';
import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import ExperienceItem from './experience-item.component';
import experiences from './experiences.constant';

export default function Home() {
  const allPostsData = getSortedPostsData();

    return (
    <div>
      <div>
      <section className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-16">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
          <img
            src="/me.jpeg"
            alt="Your profile"
            className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hey, I&apos;m Rado</h1>
        <p className={`max-w-lg text-lg ${ 'text-black-300' }`}>
          Welcome to my space.
        </p>

        {/* Social links */}
        <div className="flex gap-6 mt-8">
          <a href="https://github.com/radostinpetrov" className="transform hover:scale-110 transition-transform" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/radostin-petrov" className="transform hover:scale-110 transition-transform" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="mailto:radostin.petrov99@gmail.com" className="transform hover:scale-110 transition-transform" aria-label="Email">
            <Mail size={24} />
          </a>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <p className={`mb-4 ${ 'text-black-300' }`}>
            I&apos;m a software engineer based in London, UK. I have graduated from Imperial College London with 
            a MEng in Computing. I worked as a software developer in the hedge fund space and have full-stack 
            experience. I enjoy working in an agile setting, and researching cutting-edge tools to solve hefty problems.
          </p>
        </div>
      </section>

      {/* Journey section */}
      <section id="projects" className={`py-16 px-4 ${ 'bg-gray-200' }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Journey</h2>
          <div className="grid grid-cols-1 gap-6">
            {experiences.map((exp, index) => 
            <ExperienceItem
              key={index}
              dateStart={exp.dateStart}
              dateEnd={exp.dateEnd}
              name={exp.name}
              description={exp.description}
              technologies={exp.technologies}
              className=''
            />)}
          </div>
        </div>
      </section>

      {/* Blog preview section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Posts</h2>
            <Link href="/blog" className="flex items-center gap-1 text-sm">
              View all <ExternalLink size={16} />
            </Link>
          </div>
          <div className="space-y-6">
          {allPostsData.map(({ id, title }) => (
            <div key={id} className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">
<Link 
  href={`/blog/${id}`}
  className="text-blue-600 hover:text-blue-800 hover:underline"
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
      <section id="contact" className={`py-16 px-4 ${ 'bg-gray-800' }`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-2xl font-bold mb-6 ${ 'text-gray-300' }`}>Get In Touch</h2>
          <a
            href="mailto:radostin.petrov99@gmail.com"
            className={`inline-block px-6 py-3 rounded-lg font-medium ${ 'bg-blue-600 hover:bg-blue-700' } text-white transition-colors`}
          >
            Say Hello
          </a>

          <div className="flex justify-center gap-6 mt-8">
            <a href="https://github.com/yourusername" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/yourusername" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:your.email@example.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </section>

    </div>
    </div>
  );
}
