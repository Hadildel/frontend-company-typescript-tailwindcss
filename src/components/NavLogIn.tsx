import React from "react";
import { FaBars, FaSearch } from "react-icons/fa";
const NavLogIn: React.FC = () => {
  return (
    <nav className="bg-gray-800 px-4 py-3 flex justify-between">
      <div className="flex items-center text-xl">
        <FaBars className="text-white me-4 text-xl" />

        <span className="text-white font-semibold">E-commerce</span>
      </div>
      <div
        className="
      flex items-center gap-x5"
      >
        <div className="relative md:w-65">
          <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 focus.outline-none text-white md:text-black">
              <FaSearch />
            </button>
            <input
              type="text"
              className="x-full px-4 py-1 pl-12 rounded shadow outline-none hidden md-block "
            />
          </span>
        </div>
      </div>
    </nav>
  );
};
export default NavLogIn;
