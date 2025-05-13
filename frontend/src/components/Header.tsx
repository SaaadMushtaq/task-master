import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    toast.success("Logged out successfully!");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 transition-all duration-300 hover:scale-105 group"
          >
            <span className="text-white bg-indigo-700 group-hover:bg-indigo-800 p-2 rounded-lg transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </span>
            <h2 className="font-bold text-xl sm:text-2xl text-white bg-clip-text bg-gradient-to-r from-white to-gray-200">
              Task Master
            </h2>
          </Link>
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-white hover:bg-white/20 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>

        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          ref={dropdownRef}
        >
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <div className="md:hidden w-full px-4 py-3 bg-white/10 rounded-lg text-white">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                  <FaUserCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium truncate">
                    {localStorage.getItem("username")}
                  </p>
                  <p className="text-xs text-white/80 truncate">
                    {localStorage.getItem("email")}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer shadow-md hover:shadow-lg ring-2 ring-white/30 hover:ring-white/50"
                id="user-menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                {getInitials(localStorage.getItem("username") ?? "")}
              </button>

              <div
                className={`absolute right-0 mt-2 z-50 w-56 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black/5 transition-all duration-300 ease-out ${
                  dropdownOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-full">
                      <FaUserCircle className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {localStorage.getItem("username")}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {localStorage.getItem("email")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer group"
                  >
                    <FaSignOutAlt className="mr-3 text-red-500 group-hover:text-red-600 transition-colors duration-200" />
                    <span className="font-medium">Sign out</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="md:hidden w-full flex items-center justify-center px-4 py-3 text-sm text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer rounded-lg"
            >
              <FaSignOutAlt className="mr-3" />
              <span className="font-medium">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
