import axios from 'axios'
import { useState, useEffect} from 'react';




function Highlights () {
    const [highlights, setHighlights] = useState([]);
    useEffect(() => {
        axios.get('https://www.scorebat.com/video-api/v3/competition/england-premier-league/?token=[NzUxNTRfMTY4MTM4MjA1Ml9kNjM1YjMxZWRmNzM3OTIzYjk0YzA1NjlhNzliMTljYzkyODMwODkw]')
          .then(response => {
            setHighlights(response.data.items);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

return(
    <div>
   
  </div>
)
 
}

export default Highlights