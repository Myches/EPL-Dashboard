import logo from './logo.svg';
import './App.css';
import './index.css'
import   'slick-carousel/slick/slick.css'  
import   'slick-carousel/slick/slick-theme.css'  

import {HashRouter} from 'react-router-dom'
import Homepage from './pages/Homepage';

function App() {

  
  return (
    <div>
       <HashRouter>
       <Homepage />
       </HashRouter>
  </div>
  );
}

export default App;
