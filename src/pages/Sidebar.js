import { Link } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react';
import logo from './logo.jpeg'




function Sidebar () {





 return (
    <div >
 <div className="w-[10vw] h-[100%] hidden bg-gray-900 flex flex-col  items-center text-white ">
 
 <p > <img src={logo} className="ml-2  w-14 h-14 border rounded-full  mt-8"/></p>
         <p className="pt-28 pb-8" >
            <Link to="/">
              Discover
            </Link>
          </p>
          <p className="pb-8">
            <Link to="/Highlights">
             Highlights
            </Link>
          </p>
          <p className="pb-8">
            <Link to="/Stats">
            Statistics
            </Link>
          </p>
  </div></div>
    
 )
}

export default Sidebar