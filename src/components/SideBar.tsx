import React from "react";
import { FaHome, FaRegFileAlt, FaPoll, FaRegEnvelope } from "react-icons/fa";
const SideBar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 fixed h-full">
      <div>
        <h1 className="text-2x text-white font-bold">Admin Dashboard</h1>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold  ">
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="">
            <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
            Home
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="">
            <FaRegFileAlt className="inline-block w-6 h-6 mr-2 -mt-2" />
            Blogs
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="">
            <FaPoll className="inline-block w-6 h-6 mr-2 -mt-2" />
            Inbox
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="">
            <FaRegEnvelope className="inline-block w-6 h-6 mr-2 -mt-2" />
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SideBar;
