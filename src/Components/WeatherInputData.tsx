import React, { ReactElement } from 'react';
import  WeatherModel  from '../Models/weatherModel';
import axios from 'axios';
import WeatherShow from './WeatherShow';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { tempType } from '../Models/tempType';

function WeatherInputData():ReactElement {
    const API_KEY:string = 'd9fc5e7986aad5f2bd59d51c28da6be2';
    const [cityName,setCityName]=React.useState<string>('');
    const [exception,setException] = React.useState<string>('');
    const [isReady,setIsReady] = React.useState<boolean>(false);
    const [tempTypeById,setTempTypeById] = React.useState<number>(0);
    const [weatherData,setWeatherData] = React.useState<WeatherModel>({
        city: '',
        country:'',
        tempByKelvin:0,
        visibility:0,
        weather:'',
        weatherDescription:'',
        windSpeed:0
    });
    const handlerCityNameChange=(e: React.FormEvent<HTMLInputElement>):void=>{
        e.preventDefault();
        setCityName(e.currentTarget.value);
    };
    const handlerSelectedTempTypeByIdChange=(e: React.ChangeEvent<HTMLSelectElement>):void=>{
        e.preventDefault();
        setTempTypeById(parseInt(e.currentTarget.value));
    }
    function getWeatherDataFromAPI(){
        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_KEY)
        .then((response) =>{
            setIsReady(true);
                setWeatherData({
                    city:response.data.name,
                    country:response.data.sys.country,
                    tempByKelvin:response.data.main.temp,
                    visibility:response.data.visibility,
                    weather:response.data.weather[0].main,
                    weatherDescription:response.data.weather[0].description,
                    windSpeed:response.data.wind.speed
            });
        })
        .catch((error) =>{
            setIsReady(false);
           setException(error.message);
            console.log(error);
        });
    }
    const listTypes = Object.values(tempType).map((key,index) =>(<option key={index} value={index}>{key}</option>));
    const RequestSendClick=()=>{
    getWeatherDataFromAPI();
    }
    return (
    <div className='container'>
    <input type="text" className='form-control' value={cityName} placeholder='city' onChange={handlerCityNameChange}/>
    <select className="form-select"  onChange={handlerSelectedTempTypeByIdChange}>
        {listTypes}
    </select>
    <button type='button'className='btn btn-primary form-control' onClick={RequestSendClick}>Request</button>
    {isReady?<WeatherShow  selectedTempTypeId={tempTypeById} weather={weatherData}/>:<h1 className='text-center'>{exception}</h1>}
    </div>
    );
}

export default WeatherInputData;