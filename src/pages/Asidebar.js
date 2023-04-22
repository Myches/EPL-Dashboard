import { Link } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react';
import logo from './logo.jpeg'

import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'




function Asidebar() {
 
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[10vw] h-[100vh] lg:bg-gray-900 sm:transparent  flex flex-col items-center text-cyan-500 ">
      <button className="block md:hidden m-8 " onClick={toggleMenu}>
      <AiOutlineMenu size={20}/>
      </button>
      <div
        className={`w-[120px] lg:w-[10vw] h-[100vh] z-20 bg-gray-900 mx-auto px-4 text-cyan-500 ${
          isOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <p>
          <img src={logo} className="ml-2 w-14 h-14 border rounded-full mt-8" />
        </p>
        <p className="pt-28 pb-8">
          <Link to="/" onClick={toggleMenu}>
            Dashboard
          </Link>
        </p>
        <p className="pb-8">
          <Link to="/Highlights" onClick={toggleMenu}>
            Highlights
          </Link>
        </p>
        <p className="pb-8">
          <Link to="/Stats" onClick={toggleMenu}>
            Statistics
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Asidebar;
