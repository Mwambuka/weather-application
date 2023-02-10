import React, { useState, useEffect} from 'react'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
        setLoading(true)
      axios.get(url).then((response) => {
        setData({
          name: response.data.name,
          temp: response.data.main.temp,
          max: response.data.main.temp_max,
          min: response.data.main.temp_min,
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description,
          country: response.data.sys.country,
          feelsLike:response.data.main.feels_like
        })
        console.log(response.data)
        setLoading(false) 
      })
      setLocation('')
    }
  }
  
  console.log(data.country)
  // useEffect(() => {
  //     setLocation("Delhi")
  // }, [searchLocation])

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className=" flex justify-center">
        <input
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full m-5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      {
          loading ? 
          <ClipLoader color={"#76D736"} loading={loading} size={150} />
          :
      <div className="flex justify-center mt-5">
        <div className="border font-serif border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-5 w-full p-5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div className="">
            <p className="block font-serif text-gray-700 text-2xl font-bold mb-2">{data.name} | {data.country}</p>
          </div>
            {data.temp ? 
          <div className="ml-5 flex justify-between">
            <div>
                <h1 className="font-serif block text-gray-700 text-6xl font-bold">{data.temp.toFixed()}°C</h1>
                <h4 className="font-serif block text-gray-700 text-xl font-bold">Max: {data.max.toFixed()}°C | Min: {data.min.toFixed()}°C</h4>
            </div>
            <div className="">
              <img
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt="weather description"
              />
              <p className="m-0 font-serif text-gray-700 text-xl font-bold">{data.description}</p>
              <h4 className="font-serif block text-gray-700 text-sm font-bold">Feels Like: {data.feelsLike.toFixed()}°C</h4>
            </div>
          </div> :null}
      </div>
      </div>}
      </div>
    
  );
}

export default App;
