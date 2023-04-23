
import axios from 'axios'
import { useState, useEffect } from 'react';




function Livescores () {

    const [livescores, setLivescores] = useState([]);

    useEffect(() => {
      axios
        .get(
          'http://livescore-api.com/api-client/scores/live.json?key=ycxBKjkI3A3zVUl6&secret=Vvb9yJTnsLJDT0wsc43XnnFrXI0TCmZx'
        )
        .then((response) => {
         setLivescores(response.data.items)
         console.log(response.data.items)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);




}

export default Livescores