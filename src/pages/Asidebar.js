import { Link } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react';
import logo from './logo.jpeg'
import images from './images.png'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'




function Asidebar() {
 
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[10vw] h-[100vh] lg:bg-gray-950  flex flex-col items-center text-cyan-500  ">
    <button className="block md:hidden  absolute right-2 top-2 bg-purple-950" onClick={toggleMenu}>
      <AiOutlineMenu size={20}/>
      </button>
      <div
        className={`w-[120px] lg:w-[10vw] h-[100vh] z-20 bg-gray-950 mx-auto px-4 text-cyan-500 ${
          isOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <p>  
          <img src={images} className="   mt-8 border-none" />
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
          <Link to="/Livescores" onClick={toggleMenu}>
            Livescores
          </Link>
        </p>
      </div>
    </div> 
  );
}

export default Asidebar;
