import axios from 'axios'
import { useState, useEffect} from 'react';
import {MdStadium} from 'react-icons/md'
import   Slider from 'react-slick'
import   'slick-carousel/slick/slick.css'  
import   'slick-carousel/slick/slick-theme.css'

import epl from './epl.mp4'




function Discover() {


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
    'https://v3.football.api-sports.io/players/topscorers?season=2023&league=39',
    {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'dcae5708933639629a715178535f464b',
    
    }}
  );
  setScorers(scorers.data.response);
  console.log(scorers.data.response)


  const assists = await axios.get(
    'https://v3.football.api-sports.io/players/topassists?season=2023&league=39',
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
    "https://v3.football.api-sports.io/standings?league=39&season=2023",
    {
      headers: {
        "x-rapidapi-key":'dcae5708933639629a715178535f464b' ,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    }
  );
  setStandings(standings.data.response[0].league.standings[0]);
  console.log(standings.data.response[0].league.standings[0])
  

 } 
   
 useEffect(() => {
   fetchFootballData();
 }, []);
 
 
 const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  autoPlay:true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};






  return (
    <div className='lg:w-[85vw] mt-8 pb-12 w-[95%] h-[100vh]  overflow-y-auto  overflow-x-hidden md:px-8 md:m-8 lg:px-0 lg:m-0' >
  <h1 className='text-cyan-300 m-8'>Welcome to the English Premier League Dashboard </h1>
<div className='w-full lg:w-[90%] mx-auto   flex flex-col mt-4'>
<h1 className='text-cyan-500 flex justify-center items-center'>FEATURED</h1>
{MOD.map((mod,index) => {
     const fixtureDate = new Date(mod.fixture.date);
     const fixtureDateString = fixtureDate.toDateString();
     const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});

     return (
 
   <div className = ' h-[350px] relative ' key={index}>
    <video autoPlay playsInline loop muted className='absolute top-0 left-0 w-full h-full object-cover  lg:border lg:rounded-3xl border-none z-0'>
        <source src={epl} type='video/mp4' />
      </video>


<div className='flex flex-col  justify-center p-4 w-[87vw] md:w-[77vw] lg:w-[90%] absolute lg:left-14 left-2 md:left-0  bottom-[-30px]  bg-gradient-to-r from-green-500 to-cyan-500'>
<div className='flex justify-between lg:mx-6 mx-auto '>
<div className='flex '> <p className='lg:pt-2 '>{mod?.teams?.home?.name}<p className=' hidden lg:block'> HOME</p></p><img src={mod?.teams?.home?.logo} className="  lg:w-14 lg:h-14 w-5 h-5 hidden lg:block"/>  </div>

 <div className='flex flex-col justify-center items-center ml-2 text-center sm:text-left'><p className='border rounded-lg text-blue-900 bg-gray-300 p-2 text-sm mx-2'>VS</p>
 <p className='mt-4 w-full sm:w-auto'>{fixtureDateString}</p>
  <p className='w-full sm:w-auto'> {fixtureTimeString}</p>
 </div> 

  <div className='flex '><img src={mod?.teams?.away?.logo} className="lg:ml-2  lg:w-14 lg:h-14 w-5 h-5 hidden lg:block"/> <p className='lg:pt-2 '>{mod?.teams?.away?.name}<p className='lg:pl-4 hidden lg:block'>AWAY</p></p> </div>
  </div>
 
  </div> 
</div>

     );
      })}
</div>

<div className='lg:w-[90%] w-full  mt-16 sm:mx-auto'  >
<h1 className='text-cyan-500 flex justify-center items-center '>FIXTURES</h1> 


     <div  className=' text-white bg-gray-700  border rounded-3xl border-none  hidden lg:block  ' >
     
     <Slider {...sliderSettings}>
   { fixtures.map((fixture,index) => 
     {
      const fixtureDate = new Date(fixture?.fixture?.date);
      const fixtureDateString = fixtureDate.toDateString();
      const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});
      return (
        
    <div className=' p-6 m-8 mx-18 border border-lime-300 rounded-lg  bg-gray-950 text-sm  w-[250px] h-[200px]' key={index}  >
   <p className='flex justify-center items-center text-lime-300 '>{fixture?.league?.round}</p>
   <p className='flex justify-center items-center text-cyan-300'><p className='mr-4'><MdStadium  /></p>{fixture?.fixture?.venue?.name}</p> 
   <p className='flex justify-center items-center text-cyan-300 '>{fixtureDateString }&nbsp;&nbsp;&nbsp;{fixtureTimeString}</p>
    <div className='flex justify-center items-center text-lime-300'>
  <div className='flex flex-col mx-6'><img src={fixture?.teams?.home?.logo} className=" w-8 h-8 "/> <p className='pr-2'> {fixture?.teams?.home?.name}</p> </div> VS <div className='flex flex-col p-4'><img src={fixture?.teams?.away?.logo} className="  w-8 h-8 "/><p className='pr-2' >{fixture?.teams?.away?.name}</p></div>
  
    </div> </div>
    );
        })}</Slider> </div>


<div  className=' text-white bg-gray-700  border rounded-3xl border-none  block lg:hidden py-4 lg:w-[90vw] md:w-[50%] sm:flex flex-col  sm:mx-auto ' >
     
   
   { fixtures.map((fixture,index) => 
     {
      const fixtureDate = new Date(fixture?.fixture?.date);
      const fixtureDateString = fixtureDate.toDateString();
      const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});
      return (
        
    <div className='  md:mx-auto border rounded-lg border-none bg-gray-950 text-sm  p-6 m-4 w-[270px] mx-auto' key={index}  >
   <p className='flex justify-center items-center text-lime-300 '>{fixture?.league?.round}</p>
   <p className='flex justify-center items-center text-cyan-300'><p className='mr-4'><MdStadium  /></p>{fixture?.fixture?.venue?.name}</p> 
   <p className='flex justify-center items-center text-cyan-300 '>{fixtureDateString }&nbsp;&nbsp;&nbsp;{fixtureTimeString}</p>
    <div className='flex justify-center items-center text-lime-300'>
  <div className='flex flex-col mx-6'><img src={fixture?.teams?.home?.logo} className=" w-8 h-8 "/> <p className='pr-2'> {fixture?.teams?.home?.name}</p> </div> VS <div className='flex flex-col p-4'><img src={fixture?.teams?.away?.logo} className="  w-8 h-8 "/><p className='pr-2' >{fixture?.teams?.away?.name}</p></div>
  
    </div> </div>
    );
        })}</div>


  </div>
<div className='lg:w-[95%] w-full lg:grid lg:grid-cols-2 gap-8 grid grid-cols-1 mt-8    sm:mx-auto '>
<div><h1 className='flex justify-center items-center text-cyan-500'>TOP SCORERS</h1>
<div className='bg-gray-950  text-white border-black lg:border rounded-3xl w-full h-[400px] overflow-auto flex justify-center '>

<table className="table-auto  ">
  <thead className=''>
    <tr className='border-b  border-cyan-300 text-gray-600 lg:flex lg:justify-between flex justify-evenly m-6  '>
      <th className=''>PLAYER</th>
      <th className=''>TEAM</th>
      <th className=''>GOALS</th>
    </tr>
  </thead>
  {scorers.map((scorer ,index) => (
  <tbody className='' >
    <tr className='border-b border-cyan-300 grid grid-cols-3 text-lime-300  lg:gap-8 gap-0' key={index}>
      <td className='flex text-cyan-300'><img src={scorer.player.photo} className=" w-7 m-2 border-none h-7 border rounded-full"/><p className='mt-[7px] '>{scorer.player.name} </p></td>
      <td className='flex ml-8 mt-2  '><p className='flex  hidden sm:block'>{scorer.statistics[0].team.name}</p><img src={scorer.statistics[0].team.logo} className=" w-7 border-none h-7 border rounded-full "/></td>
      <td className='md:pl-20 m-2'>{scorer.statistics[0].goals.total}</td>
    </tr>
    
  </tbody>))}  
</table></div>
</div>


<div>  <h1 className='flex justify-center items-center text-cyan-500'>TOP ASSISTS</h1>
<div className='bg-gray-950   border-black lg:border rounded-3xl w-full h-[400px] overflow-auto flex justify-center '>

<table className="table-auto  ">
  <thead className=''>
    <tr className='border-b  border-cyan-300 text-gray-600 lg:flex lg:justify-between flex justify-evenly m-6  '>
      <th className=''>PLAYER</th>
      <th className=''>TEAM</th>
      <th className=''>ASSISTS</th>
    </tr>
  </thead>
  {assists.map((assist,index) => (
  <tbody className='' >
    <tr className='border-b border-cyan-300 text-lime-300 grid grid-cols-3 lg:gap-8 gap-0 ' key={index}>
      <td className='flex text-cyan-300'><img src={assist.player.photo} className=" w-7 m-2 border-none h-7 border rounded-full"/><p className='mt-[7px] '>{assist.player.name} </p></td>
      <td className='flex ml-8 mt-2  '><p className='flex hidden sm:block'>{assist.statistics[0].team.name}</p><img src={assist.statistics[0].team.logo} className=" w-7 border-none h-7 border rounded-full "/></td>
      <td className='md:pl-24 m-2 '>{assist.statistics[0].goals.total}</td>
    </tr>
    
  </tbody>))}  
</table></div>
</div>
</div> 

<div className=' bg-gray-700 m-8 lg:w-[80%] w-full mx-auto grid grid-cols-1 border rounded-3xl border-none '>
<h1 className='text-cyan-500 flex justify-center items-center p-8'>LEAGUE TABLE</h1>
<div className='bg-gray-950 pt-8 lg:flex lg:justify-center lg:items-center'style={{ overflowX: 'auto', maxWidth: '100%' }}>
<table className='table-auto m-4'>
      <thead>
        <tr className='text-gray-600 px-4 border-b border-cyan-300'>
          <th className='px-4'>Rank</th>
          <th className=''>Team</th>
          <th className='px-4'>Played</th>
          <th className='px-4'>Form</th>
          <th className='px-4'>Win</th>
          <th className='px-4'>Lose</th>
          <th className='px-4'>Draw</th>
          <th className='px-4'>GD</th>
          <th className='px-4'>PTS</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team) => (
          <tr key={team.team.id} className='border-b border-cyan-300 text-lime-300'>
            <td className='px-4  text-cyan-300'>{team?.rank}</td>
            <td className='px-4 flex items-center ' style={{ whiteSpace: 'nowrap' }}>
              {team?.team?.name}
              <img src={team?.team?.logo} className="w-7 m-2 border-none h-7 border rounded-full"/>
            </td>
            <td className='px-4 ' style={{ whiteSpace: 'nowrap' }}>{team?.all?.played}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.form}</td>
            <td className='px-4 ' style={{ whiteSpace: 'nowrap' }}>{team?.all?.win}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.all?.lose}</td>
            <td className='px-4 ' style={{ whiteSpace: 'nowrap' }}>{team?.all?.draw}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.goalsDiff}</td>
            <td className='px-4 ' style={{ whiteSpace: 'nowrap' }}>{team?.points}</td>
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
