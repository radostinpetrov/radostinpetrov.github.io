import { getSortedPostsData } from '@/lib/posts';
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

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
        <h2 className="text-xl md:text-2xl mb-8 h-8">
          <span className="font-mono">{`Welcome to my space.`}</span>
          <span className="animate-pulse">|</span>
        </h2>
        <p className={`max-w-lg text-lg ${ 'text-black-300' }`}>
          Passionate about passion. 
        </p>

        {/* Social links */}
        <div className="flex gap-6 mt-8">
          <a href="https://github.com/radostinpetrov" className="transform hover:scale-110 transition-transform" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a href="https://twitter.com/yourusername" className="transform hover:scale-110 transition-transform" aria-label="Twitter">
            <Twitter size={24} />
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
            experience.
          </p>
        </div>
      </section>

      {/* Projects section */}
      <section id="projects" className={`py-16 px-4 ${ 'bg-gray-800' }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`rounded-lg overflow-hidden shadow-md ${ 'bg-gray-700' }`}>
                <img
                  src={`/api/placeholder/600/400?text=Project ${item}`}
                  alt={`Project ${item}`}
                  className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Project Title {item}</h3>
                  <p className={`mb-4 ${ 'text-gray-300' }`}>
                    A brief description of this amazing project and the technologies used to build it.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="flex items-center gap-1 text-sm">
                      <Github size={16} /> <span>Source</span>
                    </a>
                    <a href="#" className="flex items-center gap-1 text-sm">
                      <ExternalLink size={16} /> <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
            <a href="https://twitter.com/yourusername" aria-label="Twitter">
              <Twitter size={20} />
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
