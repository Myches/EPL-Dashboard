
import axios from 'axios'
import { useState, useEffect } from 'react';




function Livescores () {

    const [livescores, setLivescores] = useState([]);
    useEffect(() => {
      axios.get('https://v3.football.api-sports.io/fixtures', {
        params: {
          live: 'all'
        },
        headers: {
          'x-rapidapi-key': 'dcae5708933639629a715178535f464b',
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      })
      .then((response) => {
        setLivescores(response.data.response);
        console.log(response.data.response)
      })
      .catch((error) => {
        console.error(error);
      });
    }, []);



    return (
      <div className='w-[100vw]  h-[100vh] overflow-y-auto overflow-x-hidden bg-gray-950'>
        <h1 className='w-[80%] flex justify-center items-center my-12'>LIVE MATCHES</h1>
       
       
          {livescores.map((match) => (

<div className='md:ml-16'>
       <div className='flex text-gray-300 ml-4 underline '>     <p>{match.league.country}</p>-<p>{match.league.name}</p><img src={match.league.logo} className="w-7 ml-2 border-none h-7 "/></div>
            
       <div key={match.fixture.id} className='grid grid-cols-2 gap-24  ml-8 text-lime-300 w-[100vw]  py-4 '>
       <div className='flex flex-col'><p className='flex'> <img src={match.teams.home.logo} className="w-7 m-2 border-none h-7 "/>
        <p className='mt-2'>{match.teams.home.name}</p> </p>
        
       <p className='flex'> <img src={match.teams.away.logo} className="w-7 m-2 border-none h-7 "/> <p className='mt-2'>{match.teams.away.name}</p></p></div>

       <div className='flex flex-col ml-12'><p className='py-4'>{match.goals.home}</p><p>{match.goals.away}</p></div>
       </div> </div>
           
          ))}
        </div>
      
    );
  }

export default Livescores