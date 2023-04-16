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
    <div className=' '>
      
<div className='w-[100vw] lg:w-[75vw] lg:ml-[15%] flex flex-col mt-4'>
<h1 className='text-white flex justify-center items-center'>FEATURED</h1>
{MOD.map((mod) => {
     const fixtureDate = new Date(mod.fixture.date);
     const fixtureDateString = fixtureDate.toDateString();
     const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});

     return (
 
   <div className = ' h-[350px] border  px-4 pt-4 bg-[url("./Ppl.png")]  bg-cover relative'>
    
<div className='flex justify-around items-center  border-b border-b border-cyan-300 '> <p>Premier league</p> <p className=''></p>{mod?.fixture?.venue?.name}</div>
<div className='flex flex-col  justify-center p-4 w-[90%] absolute lg:left-8  bottom-[-30px]  bg-gradient-to-r from-green-500 to-cyan-500'>
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

     );
      })}
</div>

<div className='w-[90%]  mt-16 '  >
<h1 className='text-white flex justify-center items-center '>FIXTURES</h1> 
     <div  className=' text-white bg-gray-700 lg:p-4 border rounded-3xl border-none   lg:flex-row flex flex-col lg:w-[90vw] md:w-[50%] ml-8 'style={{ overflowX: 'auto' }} >
    
    
    {fixtures.map((fixture) => 
     {
      const fixtureDate = new Date(fixture?.fixture?.date);
      const fixtureDateString = fixtureDate.toDateString();
      const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});
      return (
  
    <div className=' lg:p-4 m-4 border rounded-lg border-none bg-gray-950 text-sm  md:'>
   <p className='flex justify-center items-center text-lime-300 '>{fixture?.league?.round}</p>
   <p className='flex justify-center items-center text-cyan-300'><p className='mr-4'><MdStadium  /></p>{fixture?.fixture?.venue?.name}</p> 
   <p className='flex justify-center items-center text-cyan-300 '>{fixtureDateString }&nbsp;&nbsp;&nbsp;{fixtureTimeString}</p>
    <div className='flex justify-center items-center text-lime-300'>
  <div className='flex flex-col p-4'><img src={fixture?.teams?.home?.logo} className=" w-8 h-8 "/> <p className='pr-2'> {fixture?.teams?.home?.name}</p> </div> VS <div className='flex flex-col p-4'><img src={fixture?.teams?.away?.logo} className="  w-8 h-8 "/><p className='pr-2' >{fixture?.teams?.away?.name}</p></div>
  
    </div> </div>
    );
        })} </div>
    
  </div>
<div className='lg:w-full w-[80%] lg:grid lg:grid-cols-2 lg:gap-4 grid grid-cols-1 m-8 '>
<div><h1 className='flex justify-center items-center'>TOP SCORER</h1>
<div className='bg-gray-950  text-white border-black lg:border rounded-3xl  h-[400px] overflow-auto flex justify-center '>

<table className="table-auto  ">
  <thead className=''>
    <tr className='border-b  border-cyan-300 text-lime-300 lg:flex lg:justify-between flex justify-evenly m-6  '>
      <th className=''>PLAYER</th>
      <th className=''>TEAM</th>
      <th className=''>GOALS</th>
    </tr>
  </thead>
  {scorers.map((scorer) => (
  <tbody className='' >
    <tr className='border-b border-cyan-300 grid grid-cols-3 lg:gap-4 gap-18'>
      <td className='flex '><img src={scorer.player.photo} className=" w-7 m-2 border-none h-7 border rounded-full"/><p className='mt-[7px] text-cyan-300'>{scorer.player.name} </p></td>
      <td className='flex sm:ml-8'><p className='flex hidden '>{scorer.statistics[0].team.name}</p><img src={scorer.statistics[0].team.logo} className=" w-7 border-none h-7 border rounded-full hidden"/></td>
      <td className='lg:pl-28 m-2'>{scorer.statistics[0].goals.total}</td>
    </tr>
    
  </tbody>))}  
</table></div>
</div>


<div>  <h1 className='flex justify-center items-center'>TOP SCORER</h1>
<div className='bg-gray-950  text-white border-black lg:border rounded-3xl  h-[400px] overflow-auto flex justify-center '>

<table className="table-auto  ">
  <thead className=''>
    <tr className='border-b  border-cyan-300 text-lime-300 lg:flex lg:justify-between flex justify-evenly m-6  '>
      <th className=''>PLAYER</th>
      <th className=''>TEAM</th>
      <th className=''>ASSISTS</th>
    </tr>
  </thead>
  {assists.map((assist) => (
  <tbody className='' >
    <tr className='border-b border-cyan-300 grid grid-cols-3 lg:gap-4 gap-12'>
      <td className='flex '><img src={assist.player.photo} className=" w-7 m-2 border-none h-7 border rounded-full"/><p className='mt-[7px] text-cyan-300'>{assist.player.name} </p></td>
      <td className='flex sm:ml-8 '><p className='flex hidden'>{assist.statistics[0].team.name}</p><img src={assist.statistics[0].team.logo} className=" w-7 border-none h-7 border rounded-full "/></td>
      <td className='lg:pl-28 m-2'>{assist.statistics[0].goals.total}</td>
    </tr>
    
  </tbody>))}  
</table></div>
</div>
</div> 

<div className=' bg-gray-700 m-8  grid grid-cols-1 '>
<h1 className='text-white lg:flex lg:justify-center lg:items-center lg:p-8'>LEAGUE TABLE</h1>
<div className='bg-gray-950 pt-8 lg:flex lg:justify-center lg:items-center'style={{ overflowX: 'auto', maxWidth: '100%' }}>
<table className='table-auto m-4'>
      <thead>
        <tr className='text-lime-300 px-4 border-b border-cyan-300'>
          <th className='px-4'>Rank</th>
          <th className=''>Team</th>
          <th className='px-4'>Played</th>
          <th className='px-4'>Form</th>
          <th className='px-4'>GD</th>
          <th className='px-4'>PTS</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team) => (
          <tr key={team.team.id} className='border-b border-cyan-300 text-cyan-300'>
            <td className='px-4'>{team?.rank}</td>
            <td className='px-4 flex items-center' style={{ whiteSpace: 'nowrap' }}>
              {team?.team?.name}
              <img src={team?.team?.logo} className="w-7 m-2 border-none h-7 border rounded-full"/>
            </td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.all?.played}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.form}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.goalsDiff}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
</div>


</div>


  );
}

export default Discover;
