import React from 'react';

const Form = props =>
    <div>
      <form onSubmit={props.getWeather}>
        <input type="text" name="city" placeholder="City..." maxlength="20" pattern="[A-Za-z\s]{1,20}"
        title="Maximum 20 letters only."/>
        <input type="text" name="country" placeholder="Country..." maxlength="20" pattern="[A-Za-z\s]{1,20}"
        title="Maximum 20 letters only."/>
        <button>Weather</button>
      </form>
    </div>

export default Form;
