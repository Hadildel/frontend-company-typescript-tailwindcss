import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/images/R__1_-removebg-preview.png";

// Define TypeScript interface
interface NavItem {
  name: string;
  path: string;
  display: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", path: "/", display: "Home" },
    { name: "About", path: "/About", display: "About" },
    { name: "SignIn", path: "/SignIn", display: "Sign In" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavClick = (page: string) => {
    setActive(page);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] w-full shadow-md backdrop-blur-lg transition-all duration-300  ${
        scrolled ? "bg-[#cdd7d9]/80" : "bg-[#cdd7d9]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            onClick={() => handleNavClick("Home")}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto transition-transform duration-500 hover:scale-110"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavClick(item.name)}
              className="group relative px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              {item.display}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ease-out ${
                  active === item.name
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </Link>
          ))}
          <Link
            to="/SignUp"
            onClick={() => handleNavClick("SignUp")}
            className="block w-4xs mt-2 px-4 py-3 text-center text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-103 hover:shadow-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-blue-600 hover:text-blue-900 focus:outline-none transition-all duration-500 cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <div className="relative w-6 h-6">
            <span
              className={`absolute h-0.5 w-6 bg-blue-600 transform transition-all duration-500 ease-in-out ${
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-6 bg-blue-600 transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-6 bg-blue-600 transform transition-all duration-500 ease-in-out ${
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-1 px-4 pt-2 pb-4 bg-sky-50 shadow-inner">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavClick(item.name)}
              className={`block px-4 py-3 text-base font-medium rounded-md transform transition-all duration-300 ${
                active === item.name
                  ? "text-blue-600 bg-blue-50 translate-x-2"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:translate-x-2"
              }`}
            >
              {item.display}
            </Link>
          ))}
          <Link
            to="/SignUp"
            onClick={() => handleNavClick("SignUp")}
            className="block w-full mt-2 px-4 py-3 text-center text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-103 hover:shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
