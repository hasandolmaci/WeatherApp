import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Typewriter from "typewriter-effect"

function App() {
  
const[userInput, setUserInput] = useState('');
const[temp, setTemp] = useState()
const[weather, setWeather] = useState()
const key = "6bf7f9c24720fa1ed84f4359815f92de"
const[city, setCity] = useState()

function getWeatherData(userInput){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${key}&units=metric`)
  .then(response => {
    return response.json()
    .then(data => {
      if(data.cod === 200){
        setTemp(Math.round(data.main.temp))
        setWeather(data.weather[0].description)
      }else{
        setTemp(null)
        setWeather(null)
      }
      
    })
  })
}

const handleChange = (e) =>  {
  setUserInput(e.target.value)
}

const handleSubmit = (event) => {
  event.preventDefault();
  setCity(userInput)
  getWeatherData(userInput)

  if (!userInput.trim()) 
    setWeather(null);
    setTemp(null);
    return;

}




  return (
    <>
      <div className="flex justify-between mr-5 my-30">
        <div>
          <p className='text-white font-bold ml-5'>WeatherAI</p>
        </div>

        <div>
          <button className='sign-in px-2 py-1 mx-2 transition-transform duration-500 hover:scale-110 hover:shadow-lg'>Sign In</button>
          <button className='sign-in px-2 py-1 transition-transform duration-500 hover:scale-110 hover:shadow-lg'>Sign Up</button>
        </div>
      </div>

      <div className='flex flex-col justify-between mr-5 ml-3 lg:flex-row'>
        <div className='flex flex-wrap flex-col'>

        <p className='text-white ml-3 text-6xl text-wrap font-bold bg-transparent'>Search For Weather In</p>

        <p className='text-green-500 ml-3 text-6xl text-wrap font-bold bg-transparent'>
          <Typewriter options={{
            strings: ["Miami","Istanbul","Moscow","Tokyo","London","Paris"],
            autoStart: true,
            loop: true,

          }}/>
        </p>

          <div className='ml-3 pt-10 flex'>
            
          <input
          className="w-full text-white bg-transparent placeholder:text-slate-400 text-sm border border-slate-200 pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Enter A City"
          value={userInput}
          onChange={handleChange}
          />

          <button onClick={handleSubmit} className="Search p-3 shadow-lg transition-transform duration-500 hover:scale-110 hover:shadow-lg">Search</button>

          </div>
          

         </div>
        
          <div className='mr-5 lg:w-250'>
            {city && temp !== null && weather && <p className='text-white ml-3 text-6xl text-wrap font-bold bg-transparent'>Weather in {city} is {temp} celsius degrees with {weather}</p>}
          </div>

      </div>
    </>
  )
}

export default App
