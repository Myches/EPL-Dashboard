import axios from 'axios'
import { useState, useEffect} from 'react';
import {MdStadium} from 'react-icons/md'


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
  

 } 
   
 useEffect(() => {
   fetchFootballData();
 }, []);
 
 
 




  return (
    <div className='text-black   m-4 '>
      <p className='text-cyan-300 m-8'>Hi ,Welcome to your EPL Dasboard 😎</p>
      <div className='flex '>
        <div className='flex flex-col  '>
   <h1 className='text-white flex justify-center items-center'>FEATURED</h1>
   {MOD.map((mod) => (
  <div >
   <div className = 'w-[55vw] lg:h-[350px] border  px-4 lg:pt-4 bg-[url("./Ppl.png")]  bg-cover '>
    
<div className='flex justify-around items-center  border-b border-b border-cyan-300 '> <p>Premier league</p> <p className=''></p>{mod?.fixture?.venue?.name}</div>
<div className='flex flex-col  justify-center p-4 mt-[150px] bg-gradient-to-r from-green-500 to-cyan-500'>
<div className='flex  justify-around  '>
<div className='flex '> <p className='pt-2'>{mod?.teams?.home?.name}<p className='pl-4'> HOME</p></p><img src={mod?.teams?.home?.logo} className="ml-2  w-14 h-14 "/>  </div>

 <div className='flex flex-col justify-center items-center'><p className='border rounded-lg text-blue-900 bg-gray-300 px-2'>MATCH OF THE DAY</p>
  <p>{mod?.fixture?.date}</p>
  <p></p></div> 

  <div className='flex '> <p className='pt-2'>{mod?.teams?.away?.name}<p className='pl-4'>AWAY</p></p> <img src={mod?.teams?.away?.logo} className="ml-2  w-14 h-14 "/></div>
  </div></div>
</div>




</div> ))}</div>
<div className='mx-12 '>

   

   
     
   <div  className='flex flex-col text-white bg-gray-700 p-4 border rounded-3xl border-none  h-[450px] overflow-auto' >
   <h1 className='text-white flex justify-center items-center'>FIXTURES</h1> 

  {fixtures.map((fixture) => (
   

  <div className=' p-4 m-4 border rounded-lg border-none bg-gray-950 text-sm'>
 <p className='flex justify-center items-center text-lime-300 '>{fixture?.league?.round}</p>
 <p className='flex justify-center items-center text-cyan-300'><p className='mr-4'><MdStadium  /></p>{fixture?.fixture?.venue?.name}</p> 
 <p className='flex justify-center items-center text-cyan-300'>{fixture?.fixture?.date}</p>
  <div className='flex justify-center items-center text-lime-300'>
<div className='flex flex-col p-4'><img src={fixture?.teams?.home?.logo} className=" w-8 h-8 "/> <p> {fixture?.teams?.home?.name}</p> </div> VS <div className='flex flex-col p-4'><img src={fixture?.teams?.away?.logo} className="  w-8 h-8 "/><p>{fixture?.teams?.away?.name}</p></div>

  </div> </div>
  ))} </div>
  
</div>

</div>
<div className='flex justify-around  w-[87vw] '>
<div className=' text-white w-[60%] '> 
<div className='  '>
  
  <h1 className='text-white flex justify-center items-center'>LEAGUE TABLE</h1>

  <div className='bg-gray-950 pt-8'> 
<table className='table-auto m-4   '>
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
  {standings.map((team) =>
   
      <tr key={team.team.id}className='border-b border-cyan-300 text-cyan-300' >
        <td className='px-4'>{team?.rank}</td>
        <td className='px-4 flex  items-center'>{team?.team?.name}<img src={team?.team?.logo} className=" w-7 m-2 border-none h-7 border rounded-full"/> </td>
        <td className='px-4'>{team?.all?.played}</td>
        <td className='px-4'>{team?.form}</td>
        <td className='px-4'>{team?.goalsDiff}</td>
        <td className='px-4'>{team?.points}</td>
      </tr>
   
  )}
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
<div className="h-30 bg-black m-12">
ytttfhhbhhggghhhhhhhhhhhrrjjjjh
</div>


</div>
  );
}

export default Discover;
