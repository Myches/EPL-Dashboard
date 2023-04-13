import axios from 'axios'
import { useState, useEffect} from 'react';
import {MdStadium} from 'react-icons/md'
import   Slider from 'react-slick'
import   'slick-carousel/slick/slick.css'  
import   'slick-carousel/slick/slick-theme.css'


function Discover() {

  const [league, setLeague] = useState([]);
  const [standings, setStandings] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [scorers, setScorers] = useState([]);
  const [assists, setAssists] = useState([]);

  const [MOD, setMOD] = useState([]);


  // Fetch teams data
  const fetchFootballData = async () => {
 
   const fixtures = await axios.get(
     "https://v3.football.api-sports.io/fixtures?league=39&next=5",
     {
       headers: {
         "x-rapidapi-key":'dcae5708933639629a715178535f464b' ,
         "x-rapidapi-host": "v3.football.api-sports.io",
       },
     }
   );
   setFixtures(fixtures.data.response);
  console.log(fixtures.data.response)
 

  const scorers = await axios.get(
    'https://v3.football.api-sports.io/players/topscorers?season=2022&league=39',
    {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'dcae5708933639629a715178535f464b',
    
    }}
  );
  setScorers(scorers.data.response);
  console.log(scorers.data.response)


  const assists = await axios.get(
    'https://v3.football.api-sports.io/players/topassists?season=2022&league=39',
    {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'dcae5708933639629a715178535f464b',
    
    }}
  );
  setAssists(assists.data.response);
  console.log(assists.data.response)


  const MOD = await axios.get(
    "https://v3.football.api-sports.io/fixtures?league=39&next=1",
    {
      headers: {
        "x-rapidapi-key":'dcae5708933639629a715178535f464b' ,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    }
  );
  setMOD(MOD.data.response);
 

  const standings = await axios.get(
    "https://v3.football.api-sports.io/standings?league=39&season=2022",
    {
      headers: {
        "x-rapidapi-key":'dcae5708933639629a715178535f464b' ,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    }
  );
  setStandings(standings.data.response[0].league.standings[0]);
  console.log(standings.data.response[0].league.standings[0])
  
  const league = await axios.get(
    'https://v3.football.api-sports.io/leagues',
    {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'dcae5708933639629a715178535f464b',
    
    }}
  );
  setLeague(league.data.response);
  console.log(league.data.response)
 } 
   
 useEffect(() => {
   fetchFootballData();
 }, []);
 
 
 
 var settings ={
  dots:true,
  infinite:true,
  slidesToShow:4,
  slidesToScroll:6,
  Speed:500,
 
  responsive : [
 
      { breakpoint :600,
          settings :{
              slidesToShow:2,
              slidesToScroll:2,
              infinite:true,
              dots:true,


          }

      },
      {breakpoint :480,
          settings :{
              slidesToShow:1,
              slidesToScroll:1,
              infinite:true,
              dots:true,


          }

      },
  ]
 
 } 





  return (
    <div className='text-black   mt-4 mx-4 '>
      <p className='text-cyan-300 m-8'>Hi ,Welcome to your EPL Dasboard 😎</p>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-col  '>
   <h1 className='text-white lg:flex justify-center items-center'>FEATURED</h1>
   {MOD.map((mod) => {
     const fixtureDate = new Date(mod.fixture.date);
     const fixtureDateString = fixtureDate.toDateString();
     const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});

     return (
  <div >
   <div className = 'lg:w-[55vw] w-[100%] lg:h-[350px] border  px-4 lg:pt-4 bg-[url("./Ppl.png")]  bg-cover '>
    
<div className='flex justify-around items-center  border-b border-b border-cyan-300 '> <p>Premier league</p> <p className=''></p>{mod?.fixture?.venue?.name}</div>
<div className='flex flex-col  justify-center p-4 mt-[20vh]  bg-gradient-to-r from-green-500 to-cyan-500'>
<div className='flex justify-between mx-6'>
<div className='flex '> <p className='lg:pt-2 '>{mod?.teams?.home?.name}<p className=' hidden lg:block'> HOME</p></p><img src={mod?.teams?.home?.logo} className="  lg:w-14 lg:h-14 w-7 h-7"/>  </div>

 <div className='flex flex-col justify-center items-center ml-2 text-center sm:text-left'><p className='border rounded-lg text-blue-900 bg-gray-300 px-2 text-sm '>VS</p>
 <p className='mt-4 w-full sm:w-auto'>{fixtureDateString}</p>
  <p className='w-full sm:w-auto'> {fixtureTimeString}</p>
 </div> 

  <div className='flex '><img src={mod?.teams?.away?.logo} className="lg:ml-2  lg:w-14 lg:h-14 w-7 h-7"/> <p className='lg:pt-2 '>{mod?.teams?.away?.name}<p className='lg:pl-4 hidden lg:block'>AWAY</p></p> </div>
  </div>
 
  </div> 
</div>




</div>     );
      })} </div>

<div className='lg:mx-12 lg:mt-[-50px] mt-0'>
     
   <div  className=' text-white bg-gray-700 lg:p-4 border rounded-3xl border-none m-4   sm:overflow-auto flex flex-row lg:flex-col' >
   <h1 className='text-white lg:flex justify-center items-center '>FIXTURES</h1> 
  
  {fixtures.map((fixture) => 
   {
    const fixtureDate = new Date(fixture?.fixture?.date);
    const fixtureDateString = fixtureDate.toDateString();
    const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});
    return (

  <div className=' lg:p-4 m-4 border rounded-lg border-none bg-gray-950 text-sm '>
 <p className='flex justify-center items-center text-lime-300 '>{fixture?.league?.round}</p>
 <p className='flex justify-center items-center text-cyan-300'><p className='mr-4'><MdStadium  /></p>{fixture?.fixture?.venue?.name}</p> 
 <p className='flex justify-center items-center text-cyan-300 '>{fixtureDateString }&nbsp;&nbsp;&nbsp;{fixtureTimeString}</p>
  <div className='flex justify-center items-center text-lime-300'>
<div className='flex flex-col p-4'><img src={fixture?.teams?.home?.logo} className=" w-8 h-8 "/> <p className='pr-2'> {fixture?.teams?.home?.name}</p> </div> VS <div className='flex flex-col p-4'><img src={fixture?.teams?.away?.logo} className="  w-8 h-8 "/><p className='pr-2' >{fixture?.teams?.away?.name}</p></div>

  </div> </div>
  );
      })} </div>
  
</div>

</div>


<div className='lg:flex-row justify-around  w-[87vw]  '>
<div className=' text-white lg:w-[60%] bg-gray-700   border rounded-3xl border-none lg:mt-[-700px] mt-0'> 
<h1 className='flex justify-center items-center'>TOP ASSISTS</h1>
<div className='h-[200px] border flex flex-row' style={{  overflowX: 'auto' }} >
<div className='flex justify-center '>
  {scorers.map((scorer) => (
    <div className='flex flex-col items-center m-4 space-x-8 text-sm' key={scorer.player.id}>
      <img src={scorer.player.photo} className="w-16 h-16 border-none rounded-full " />
      <p className='mt-2  pl-[-10px] text-lime-300 flex justify-start items-start' >{scorer.player.name}</p>
      <p className='text-cyan-300'>{scorer.statistics[0].goals.total}</p>
    </div>
  ))}
</div>


</div>



</div>
</div>

<div className='  lg:w-[60%] bg-gray-700  mt-8  w-[350px]' >
    <h1 className='text-white flex justify-center items-center' >LEAGUE TABLE</h1>
    <div className='bg-gray-950 pt-8 w-[100%]' >
      <table className='table-auto m-4'style={{  overflowX: 'auto' }} >
        <thead className='  '>
          <tr className='  text-lime-300 px-4 border-b border-cyan-300' >
            <th className='px-4' >Rank</th>
            <th className=''>Team</th>
            <th className='px-4'>Played</th>
            <th className='px-4'>Form</th>
            <th className='px-4'>GD</th>
            <th className='px-4'>PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team.id} className='border-b border-cyan-300 text-cyan-300' >
              <td className='px-4'>{team?.rank}</td>
              <td className='px-4 flex items-center'>
                {team?.team?.name}
                <img src={team?.team?.logo} className="w-7 m-2 border-none h-7 border rounded-full"/>
              </td>
              <td className='px-4'>{team?.all?.played}</td>
              <td className='px-4'>{team?.form}</td>
              <td className='px-4'>{team?.goalsDiff}</td>
              <td className='px-4'>{team?.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
<div className="h-30 bg-black">
ytttfhhbhhggghhhhhhhhhhhrrjjjjh
</div>


</div>
  );
}

export default Discover;
