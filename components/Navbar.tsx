import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Home
              </Link>
            </div>
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/blog" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Blog
              </Link> 
              <Link 
                href="/RadostinPetrovCV.pdf" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV
              </Link>
              <Link 
                href="/chess" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Chess
              </Link>
                <Link 
                href="/music" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Music
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}