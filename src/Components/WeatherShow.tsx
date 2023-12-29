
import React,{ReactElement, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function WeatherShow(props:any):ReactElement {
    const [temp,setTemp]=React.useState<number>(props.weather.tempByKelvin);
    useEffect(()=>{
        ConvertTemp();
    });
    function ConvertTemp():void {
        switch(props.selectedTempTypeId){
            case 0:
                setTemp(props.weather.tempByKelvin-273.15);
                break;
            case 1:
                setTemp((props.weather.tempByKelvin-273.15)*1.8+32);
                break;
            default:
                setTemp(props.weather.tempByKelvin);
                break;
        }
    }
    return (
        <table className="table" >
            <thead className="thead-dark">
            <tr>
                <th scope="col">Город</th>
                <th scope="col">Страна</th>
                <th scope="col">Температура</th>
                <th scope="col">Видимость</th>
                <th scope="col">Погода</th>
                <th scope="col">Описание погоды</th>
                <th scope="col">Скорость ветра</th>
            </tr>
            </thead>
            <tbody className="">
            <tr>
            <td>{props.weather.city}</td>
            <td>{props.weather.country}</td>
            <td>{temp.toFixed(2)}</td>
            <td>{props.weather.visibility}</td>
            <td>{props.weather.weather}</td>
            <td>{props.weather.weatherDescription}</td>
            <td>{props.weather.windSpeed.toFixed(2)}</td>
            </tr>
            </tbody>
        </table>
    );
}

export default WeatherShow;