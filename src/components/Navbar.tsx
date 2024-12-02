import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, LogOut, Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { siteName, setSiteName } = useSite();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(siteName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim()) {
      setSiteName(editValue.trim());
    }
    setIsEditing(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-red-600 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="group relative">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="inline-block">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="bg-white text-red-600 text-3xl font-bold px-2 py-1 rounded"
                autoFocus
                onBlur={handleSubmit}
              />
            </form>
          ) : (
            <Link to="/" className="text-white text-3xl font-bold">
              {siteName}
              <Pencil
                size={20}
                className="hidden group-hover:inline-block absolute -right-7 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              />
            </Link>
          )}
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white">Welcome, {user.username}</span>
            <Link
              to="/add"
              className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <Plus size={20} />
              Add Video
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;