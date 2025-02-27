import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-black/50 backdrop-blur-lg shadow-lg fixed top-0 left-0 z-50 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-white">📚 AI Flashcard Generator</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-white items-center">
          <Link to="/" className="hover:text-purple-400 transition">Home</Link>
          <Link to="/flashcards" className="hover:text-purple-400 transition">Flashcards</Link>
          <Link to="/todo" className="hover:text-purple-400 transition">Todo-List</Link>
          <Link to="/youtube" className="hover:text-purple-400 transition">Youtube</Link>
          <Link to="/gglimg" className="hover:text-purple-400 transition">Image-AI</Link>
          <Link to="/about" className="hover:text-purple-400 transition">About</Link>

          {/* Show Sign In when logged out */}
          <SignedOut>
            <SignInButton mode="modal">
              <span className="cursor-pointer hover:text-purple-400 transition">Sign In</span>
            </SignInButton>
          </SignedOut>

          {/* Show User Button when logged in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md flex flex-col items-center justify-center transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button className="absolute top-5 right-6 text-white" onClick={() => setIsOpen(false)}>
          <X size={32} />
        </button>
        <nav className="flex flex-col space-y-6 text-white text-xl">
          <Link to="/" className="hover:text-purple-400 transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/flashcards" className="hover:text-purple-400 transition" onClick={() => setIsOpen(false)}>Flashcards</Link>
          <Link to="/about" className="hover:text-purple-400 transition" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/todo" className="hover:text-purple-400 transition">Todo-List</Link>
          <Link to="/youtube" className="hover:text-purple-400 transition">Youtube</Link>
          <Link to="/gglimg" className="hover:text-purple-400 transition">Image-AI</Link>
          <Link to="/about" className="hover:text-purple-400 transition">About</Link>

          {/* Show Sign In when logged out */}
          <SignedOut>
            <SignInButton mode="modal">
              <span className="cursor-pointer hover:text-purple-400 transition" onClick={() => setIsOpen(false)}>Sign In</span>
            </SignInButton>
          </SignedOut>

          {/* Show User Button when logged in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};

export default Header;
