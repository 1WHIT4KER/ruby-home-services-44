import { Link } from "react-router-dom";

export const AdminNavbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-2">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/77ce0bf0-17d7-43e2-b81f-3a314b8484c0.png"
            alt="Ruby Logo"
            className="h-12"
          />
        </Link>
      </div>
    </nav>
  );
};