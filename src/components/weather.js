import React from 'react';

const Weather = props => (
    <div className="weather__info">
      {
        props.city &&
        <div className='weather__key'>Location:
          <span className='weather__value'> {props.city}</span>
        </div>
      }
      {
        props.temperature &&
        <div className='weather__key'>Temperature:
          <span className='weather__value'> {props.temperature} &#176;C</span>
        </div>
      }
      {
        props.min_temp &&
        <div className='weather__key'>Min Temp:
          <span className='weather__value'> {props.min_temp} &#176;C</span>
        </div>
      }
      {
        props.max_temp &&
        <div className='weather__key'>Max Temp:
          <span className='weather__value'> {props.max_temp} &#176;C</span>
        </div>
      }
      {
        props.humidity &&
        <div className='weather__key'>Humidity:
          <span className='weather__value'> {props.humidity} %</span>
        </div>
      }
      {
        props.description &&
        <div className='weather__key'>Weather:
          <span className='weather__value'> {props.description}</span>
        </div>
      }
      {
        props.wind_speed &&
        <div className='weather__key'>Wind Speed:
          <span className='weather__value'> {props.wind_speed} meter/sec</span>
        </div>
      }
      {
        props.wind_deg &&
        <div className='weather__key'>Wind Degree:
          <span className='weather__value'> {props.wind_deg}</span>
        </div>
      }
      {
        props.error && <div className='error'>{props.error}</div>
      }
    </div>
  );

export default Weather;
