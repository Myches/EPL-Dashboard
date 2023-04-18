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
        setHighlights(response.data.response);
        console.log(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='p-8'>
      <p className='text-white m-8 flex justify-center items-center '>MATCH HIGHLIGHTS</p>

      <div className='lg:grid lg:grid-cols-4  gap-4 grid grid-cols-1'>
        {highlights.map((highlight, index) => (
          <div key={index} className=''>
            <a href={highlight.competitionUrl} target='_blank' rel='noreferrer'>
              <img src={highlight.thumbnail} alt='pic' />
            </a>
            
            <p className='text-lime-300 flex justify-center items-center m-2'>{highlight.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlights;

