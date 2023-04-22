import {Route,Routes} from 'react-router-dom'
import Discover from './Discover'
import Highlights from './Highlights'
import Stats from './Stats'
import Asidebar from './Asidebar'


function Homepage() {
  
  
  return (
    <div className='w-[100%] h-screen  overflow-hidden  flex  mx-auto bg-purple-950'>
       <Asidebar  />           
      <div>
         <Routes >
         <Route  path ="/" element={<Discover />} />
         <Route path ="/Highlights" element={<Highlights  />} />
         <Route path ="/Stats" element={<Stats />} />
         <Route path ="/Asidebar" element={<Asidebar  />} />
        
       </Routes>
       
       </div>
  </div>
  );
}

export default Homepage;
