import axios from 'axios'
import { useState, useEffect} from 'react';





function Highlights() {
const [highlights, setHighlights] = useState([]);

useEffect(() => {
  axios
    .get(
      'https://www.scorebat.com/video-api/v3/feed/?token=[NzUxNTRfMTY4MTgwOTM0Ml85NGIyNjhlMzlmYjg0Y2UwNmUyMWMxM2M4ODg0ZjNkNjNhZTdmYzRk]'
    )
    .then((response) => {
      const filteredHighlights = response.data.response.filter(
        (highlight) => highlight.competition === "ENGLAND: Premier League"
      );
      setHighlights(filteredHighlights);
      console.log(filteredHighlights);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

  return (
    <div className='p-8 h-[100vh] overflow-auto '>
      <p className=' m-8 flex justify-center items-center text-cyan-300 '>MATCH HIGHLIGHTS</p>

      <div className='lg:grid lg:grid-cols-4  gap-8 grid grid-cols-1 '>
        {highlights.map((highlight, index) => (
          <div key={index} className='border-none  bg-gray-900 border-cyan-300 hover:scale-110 transition ease-in-out  '>
            <a href={highlight.matchviewUrl} target='_blank' rel='noreferrer'>
              <img src={highlight.thumbnail} alt='pic' className='border-none border '/>
            </a>
            
            <p className='text-lime-300 flex justify-center items-center m-2'>{highlight.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlights;

