import axios from 'axios'
import { useState, useEffect} from 'react';
import {MdStadium} from 'react-icons/md'
import   Slider from 'react-slick'
import   'slick-carousel/slick/slick.css'  
import   'slick-carousel/slick/slick-theme.css'
import intro from './intro.mp4'
import epl from './epl.mp4'



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
      <p className='text-cyan-300 m-8'>Hi ,Welcome to your EPL Dasboard 😎</p>
<div className='w-[100vw] lg:w-[80%] mx-auto   flex flex-col mt-4'>
<h1 className='text-white flex justify-center items-center'>FEATURED</h1>
{MOD.map((mod,index) => {
     const fixtureDate = new Date(mod.fixture.date);
     const fixtureDateString = fixtureDate.toDateString();
     const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});

     return (
 
   <div className = ' h-[350px] relative' key={index}>
    <video autoPlay playsInline loop muted className='absolute top-0 left-0 w-full h-full object-cover z-0'>
        <source src={epl} type='video/mp4' />
      </video>

<div className='flex justify-around items-center  border-b border-b border-cyan-300 '> <p>Premier league</p> <p className=''></p>{mod?.fixture?.venue?.name}</div>
<div className='flex flex-col  justify-center p-4 w-[90%] absolute lg:left-14 left-4  bottom-[-30px]  bg-gradient-to-r from-green-500 to-cyan-500'>
<div className='flex justify-between lg:mx-6 mx-auto '>
<div className='flex '> <p className='lg:pt-2 '>{mod?.teams?.home?.name}<p className=' hidden lg:block'> HOME</p></p><img src={mod?.teams?.home?.logo} className="  lg:w-14 lg:h-14 w-5 h-5 hidden lg:block "/>  </div>

 <div className='flex flex-col justify-center items-center ml-2 text-center sm:text-left'><p className='border rounded-lg text-blue-900 bg-gray-300 p-2 text-sm mx-2'>VS</p>
 <p className='mt-4 w-full sm:w-auto'>{fixtureDateString}</p>
  <p className='w-full sm:w-auto'> {fixtureTimeString}</p>
 </div> 

  <div className=' flex '><img src={mod?.teams?.away?.logo} className="lg:ml-2  lg:w-14 lg:h-14 w-5 h-5 hidden lg:block"/> <p className='lg:pt-2 '>{mod?.teams?.away?.name}<p className='lg:pl-4 hidden lg:block'>AWAY</p></p> </div>
  </div>
 
  </div> 
</div>

     );
      })}
</div>

<div className='w-[90%]  mt-16 sm:mx-auto'  >
<h1 className='text-white flex justify-center items-center '>FIXTURES</h1> 
     <div  className=' text-white bg-gray-700 p-4 border rounded-3xl border-none   lg:flex-row flex flex-col lg:w-[90vw] md:w-[50%] ml-8 sm:mx-auto'style={{ overflowX: 'auto' }} >
    
    
    {fixtures.map((fixture,index) => 
     {
      const fixtureDate = new Date(fixture?.fixture?.date);
      const fixtureDateString = fixtureDate.toDateString();
      const fixtureTimeString = fixtureDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute:'numeric'});
      return (
  
    <div className=' p-4 m-4 border rounded-lg border-none bg-gray-950 text-sm ' key={index} >
   <p className='flex justify-center items-center text-lime-300 '>{fixture?.league?.round}</p>
   <p className='flex justify-center items-center text-cyan-300'><p className='mr-4'><MdStadium  /></p>{fixture?.fixture?.venue?.name}</p> 
   <p className='flex justify-center items-center text-cyan-300 '>{fixtureDateString }&nbsp;&nbsp;&nbsp;{fixtureTimeString}</p>
    <div className='flex justify-center items-center text-lime-300'>
  <div className='flex flex-col p-4'><img src={fixture?.teams?.home?.logo} className=" w-8 h-8 "/> <p className='pr-2'> {fixture?.teams?.home?.name}</p> </div> VS <div className='flex flex-col p-4'><img src={fixture?.teams?.away?.logo} className="  w-8 h-8 "/><p className='pr-2' >{fixture?.teams?.away?.name}</p></div>
  
    </div> </div>
    );
        })} </div>
    
  </div>
<div className='lg:w-[95%] w-[80%] lg:grid lg:grid-cols-2 gap-8 grid grid-cols-1 m-8   text-sm sm:mx-auto '>
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
  {scorers.map((scorer ,index) => (
  <tbody className='' >
    <tr className='border-b border-cyan-300 grid grid-cols-3 gap-12 ' key={index}>
      <td className='flex '><img src={scorer.player.photo} className=" w-7 m-2 border-none h-7 border rounded-full"/><p className='mt-[7px] text-cyan-300'>{scorer.player.name} </p></td>
      <td className='flex ml-8 mt-2'><p className='flex  hidden sm:block'>{scorer.statistics[0].team.name}</p><img src={scorer.statistics[0].team.logo} className=" w-7 border-none h-7 border rounded-full "/></td>
      <td className='lg:pl-28 m-2'>{scorer.statistics[0].goals.total}</td>
    </tr>
    
  </tbody>))}  
</table></div>
</div>


<div>  <h1 className='flex justify-center items-center '>TOP ASSISTS</h1>
<div className='bg-gray-950  text-white border-black lg:border rounded-3xl  h-[400px] overflow-auto flex justify-center '>

<table className="table-auto  ">
  <thead className=''>
    <tr className='border-b  border-cyan-300 text-lime-300 lg:flex lg:justify-between flex justify-evenly m-6  '>
      <th className=''>PLAYER</th>
      <th className=''>TEAM</th>
      <th className=''>ASSISTS</th>
    </tr>
  </thead>
  {assists.map((assist,index) => (
  <tbody className='' >
    <tr className='border-b border-cyan-300 grid grid-cols-3 ' key={index}>
      <td className='flex '><img src={assist.player.photo} className=" w-7 m-2 border-none h-7 border rounded-full"/><p className='mt-[7px] text-cyan-300'>{assist.player.name} </p></td>
      <td className='flex ml-8 mt-2'><p className='flex hidden sm:block'>{assist.statistics[0].team.name}</p><img src={assist.statistics[0].team.logo} className=" w-7 border-none h-7 border rounded-full "/></td>
      <td className='lg:pl-28 m-2'>{assist.statistics[0].goals.total}</td>
    </tr>
    
  </tbody>))}  
</table></div>
</div>
</div> 

<div className=' bg-gray-700 m-8 w-[80%] mx-auto grid grid-cols-1 border rounded-3xl border-none'>
<h1 className='text-white flex justify-center items-center p-8'>LEAGUE TABLE</h1>
<div className='bg-gray-950 pt-8 lg:flex lg:justify-center lg:items-center'style={{ overflowX: 'auto', maxWidth: '100%' }}>
<table className='table-auto m-4'>
      <thead>
        <tr className='text-lime-300 px-4 border-b border-cyan-300'>
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
        {standings.map((team,index) => (
          <tr key={team.team.id} className='border-b border-cyan-300 text-cyan-300' key={index}>
            <td className='px-4'>{team?.rank}</td>
            <td className='px-4 flex items-center' style={{ whiteSpace: 'nowrap' }}>
              {team?.team?.name}
              <img src={team?.team?.logo} className="w-7 m-2 border-none h-7 border rounded-full"/>
            </td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.all?.played}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.form}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.all?.win}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.all?.lose}</td>
            <td className='px-4' style={{ whiteSpace: 'nowrap' }}>{team?.all?.draw}</td>
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
