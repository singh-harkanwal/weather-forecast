import React from 'react';
import Title from './components/title';
import Form from './components/form';
import Weather from './components/weather';
import img from './img/default-weather.jpeg';

require('dotenv').config();
const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  state = {
    temperature: undefined,
    temp_min: undefined,
    temp_max: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    humidity: undefined,
    description: undefined,
    wind_speed: undefined,
    wind_deg: undefined,
    wiki_source: undefined,
    error: undefined,
  }

  getWeather = async (e) => {

    //openweathermap API call
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    //if there is no error
    if(city && country && data.cod!== '404' && data.cod!== '401' && data.cod!== '429') {
      this.setState({
        temperature: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        city: data.name,
        country: data.sys.country,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        error: ''
      });

      //wikipedia API call to get main image of the city enter by the user
      let url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageimages&pithumbsize=600&titles=${city}&format=json`;
      fetch(url)
        .then(response => response.json())
        .then(wiki_data => {
          const pages = wiki_data.query.pages;
          for (let page in pages) {
            const wiki_img = pages[page].thumbnail?pages[page].thumbnail: img;
            this.setState({ wiki_source: wiki_img.source });
          }
        })
        .catch(err => this.setState({ error: err }))

    } else if(data.cod === '429') {
      this.setState({
        temperature: undefined,
        temp_min: undefined,
        temp_max: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        humidity: undefined,
        description: undefined,
        wind_speed: undefined,
        wind_deg: undefined,
        error: 'The App is down, please try again after few hours.'
      });
    } else {
      this.setState({
        temperature: undefined,
        temp_min: undefined,
        temp_max: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        humidity: undefined,
        description: undefined,
        wind_speed: undefined,
        wind_deg: undefined,
        error: 'Please enter correct City & Country.'
      });
    }
  }
  render() {
    return(
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='col-10 col-md-6 title-container'
                  style={ this.state.wiki_source!= undefined? { backgroundImage : "url('"+this.state.wiki_source+"')"} : {}}
                >
                  <Title/>
                </div>
                <div className='col-10 col-md-6 form-container'>
                  <Form getWeather={this.getWeather}/>
                  <Weather
                    temperature={this.state.temperature}
                    min_temp={this.state.temp_min}
                    max_temp={this.state.temp_max}
                    city={this.state.city}
                    country={this.state.country}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    wind_speed={this.state.wind_speed}
                    wind_deg={this.state.wind_deg}
                    error = {this.state.error}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
