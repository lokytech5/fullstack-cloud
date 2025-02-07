import Link from "next/link";
import ArticlePage from "./article/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      {/* Navbar */}
      <nav className="navbar bg-base-100 shadow-md px-6 w-full">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold">MyBlog</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 space-x-4 hidden md:flex">
          <li>
            <Link href="/manage-articles" className="btn btn-primary">
              Articles
            </Link>
          </li>
          <li>
            <Link href="/about" className="btn btn-ghost">
              About
            </Link>
          </li>
        </ul>
          
          {/* Mobile Menu Button */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              ☰
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
               <li>
              <Link href="/" className="btn btn-ghost">
                Home
              </Link>
            </li>
            <li>
              <Link href="/manage-articles" className="btn btn-primary">
                Articles
              </Link>
            </li>
            <li>
              <Link href="/about" className="btn btn-ghost">
                About
              </Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero and Form Side by Side on Large Screens */}
      <main className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-12">
        {/* Hero Section */}
        <div className="lg:w-1/2 w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 px-10 text-center rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold">Write & Share Articles</h1>
          <p className="mt-4 text-lg text-gray-300">
            Share your thoughts, stories, and knowledge with the world.
          </p>
        </div>

        {/* Article Form Section */}
        <div className="lg:w-1/2 w-full bg-white shadow-lg rounded-lg p-8">
          <ArticlePage />
        </div>
      </main>
    </div>
  );
}
