import axios from 'axios'
import { useState, useEffect} from 'react';
import {MdStadium} from 'react-icons/md'


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
    'https://v3.football.api-sports.io/leagues?season=2022&id=39',
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
 
 
 




  return (
    <div className='text-black   mt-4 mx-4 '>
      <p className='text-cyan-300 m-8'>Hi ,Welcome to your EPL Dasboard 😎</p>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-col  '>
   <h1 className='text-white lg:flex justify-center items-center'>FEATURED</h1>
   {MOD.map((mod) => {
     const fixtureDate = new Date(mod.fixture.date);
     const fixtureDateString = fixtureDate.toDateString();
     const fixtureTimeString = fixtureDate.toLocaleTimeString();

     return (
  <div >
   <div className = 'lg:w-[55vw] w-[100%] lg:h-[350px] border  px-4 lg:pt-4 bg-[url("./Ppl.png")]  bg-cover '>
    
<div className='flex justify-around items-center  border-b border-b border-cyan-300 '> <p>Premier league</p> <p className=''></p>{mod?.fixture?.venue?.name}</div>
<div className='flex flex-col  justify-center p-4 mt-[20vh]  bg-gradient-to-r from-green-500 to-cyan-500'>
<div className='flex  justify-around  '>
<div className='flex '> <p className='lg:pt-2 '>{mod?.teams?.home?.name}<p className='lg:pl-4 hidden lg:block'> HOME</p></p><img src={mod?.teams?.home?.logo} className="lg:ml-2  lg:w-14 lg:h-14 w-7 h-7"/>  </div>

 <div className='flex flex-col justify-center items-center ml-2 text-center sm:text-left'><p className='border rounded-lg text-blue-900 bg-gray-300 px-2 text-sm '>MATCHDAY</p>
  <p className='mt-4 w-full sm:w-auto'>{fixtureDateString}</p>
  <p className='w-full sm:w-auto'> {fixtureTimeString}</p></div> 

  <div className='flex '> <p className='lg:pt-2 '>{mod?.teams?.away?.name}<p className='lg:pl-4 hidden lg:block'>AWAY</p></p> <img src={mod?.teams?.away?.logo} className="lg:ml-2  lg:w-14 lg:h-14 w-7 h-7"/></div>
  </div></div>
</div>




</div>     );
      })} </div>


</div>
<div className='lg:flex-row justify-around  w-[87vw] flex flex-col '>
<div className=' text-white lg:w-[60%] bg-gray-700  p-4 border rounded-3xl border-none '> 
  <div className='  '>
    <h1 className='text-white flex justify-center items-center'>LEAGUE TABLE</h1>
    <div className='bg-gray-950 pt-8' style={{ overflowX: 'auto' }}>
      <table className='table-auto m-4'>
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
</div>


<div className='flex flex-col'>
<div className=' text-white mt-8 bg-gray-700 p-4 border rounded-3xl border-none'>
<h1 className='flex justify-center items-center'>TOP SCORER</h1>

<div className=' bg-gray-950 text-white border-black border rounded-3xl  h-[400px] overflow-auto'>

<table className="table-auto m-4  ">
  <thead >
    <tr className='border-b border-cyan-300 text-lime-300'>
      <th className='pr-4'>Player</th>
      <th className='pr-4'>Team</th>
      <th className=''>Goals</th>
    </tr>
  </thead>
  {scorers.map((scorer) => (
  <tbody className='' >
    <tr className='border-b border-cyan-300 '>
      <td className='flex pr-4'><img src={scorer.player.photo} className=" w-7 m-2 border-none h-7 border rounded-full"/><p className='mt-[7px] text-cyan-300'>{scorer.player.name} </p></td>
      <td className='pr-4'><img src={scorer.statistics[0].team.logo} className=" w-7 m-2 border-none h-7 border rounded-full"/></td>
      <td className='pl-4'>{scorer.statistics[0].goals.total}</td>
    </tr>
    
  </tbody>))}  
</table>
</div> 
</div>
<div className=' text-white mt-8 bg-gray-700 p-4 border rounded-3xl border-none'>
<h1 className='flex justify-center items-center'>TOP ASSISTS</h1>

<div className='bg-gray-950  text-white border-black border rounded-3xl  h-[400px] overflow-auto'>

<table className="table-auto m-4  ">
  <thead >
    <tr className='border-b border-cyan-300 text-lime-300'>
      <th className='pr-4'>Player</th>
      <th className='pr-4'>Team</th>
      <th className=''>Assits</th>
    </tr>
  </thead>
  {assists.map((assist) => (
  <tbody className='' >
    <tr className='border-b border-cyan-300 '>
      <td className='flex pr-4'><img src={assist.player.photo} className=" w-7 m-2 border-none h-7 border rounded-full"/><p className='mt-[7px] text-cyan-300'>{assist.player.name} </p></td>
      <td className='pr-4'><img src={assist.statistics[0].team.logo} className=" w-7 m-2 border-none h-7 border rounded-full"/></td>
      <td className='pl-4'>{assist.statistics[0].goals.total}</td>
    </tr>
    
  </tbody>))}  
</table>
</div> 
</div>
</div>
</div>
<div className="h-30 bg-black mt-24">
ytttfhhbhhggghhhhhhhhhhhrrjjjjh
</div>


</div>
  );
}

export default Discover;
