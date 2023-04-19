import {Route,Routes} from 'react-router-dom'
import Discover from './Discover'
import Highlights from './Highlights'
import Stats from './Stats'
import Sidebar from './Sidebar'


function Homepage() {
  
  
  return (
    <div className='w-[100%] h-[100%]  overflow-auto flex bg-purple-950'>
       <Sidebar  />           
      <div>
         <Routes >
         <Route  path ="/" element={<Discover />} />
         <Route path ="/Highlights" element={<Highlights  />} />
         <Route path ="/Stats" element={<Stats />} />
         <Route path ="/Sidebar" element={<Sidebar  />} />
        
       </Routes>
       
       </div>
  </div>
  );
}

export default Homepage;
