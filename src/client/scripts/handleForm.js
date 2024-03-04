import axios from "axios";
import { getRDays } from "./getRDays"

const form = document.querySelector("form");
const dateInp = document.querySelector("#flightDate");
const cityInp = document.querySelector("#city");
const city_error = document.querySelector("#city_error");
const date_error = document.querySelector("#date_error");

// Initialize display settings
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".flight_data").forEach(el => {
    el.style.display = "none";
  });
});

const handleSubmit = async(e) => {
    e.preventDefault()

    // validate the inputs
    if(!validateInputs()){
      return;
    }

    const Location = await getCity();
    //erro handler
    if (Location.error) {
      city_error.innerHTML = `${Location.message}`
      city_error.style.display = "block"
      return
    }
    const {name, lng, lat} = Location;

    //get the input value
    const date = dateInp.value;
    const remainingDays = getRDays(date);

    const Weather = await getWeather(lng, lat, remainingDays);

    const Picture = await getCityPic(name);

    updateUI(remainingDays, name, Picture, Weather, dateInp, cityInp);

}


//getting the city name from Geonames API
const getCity = async () => {
    const { data } = await axios.post("/getCity", form, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(data)
    return data;
}

//getting the weather from weatherbit API
const getWeather = async (lng, lat, remainingDays) => {
    const { data } = await axios.post("/getWeather", {
        lng,
        lat,
        remainingDays
    }) 
    return data;
};

//getting the city picture from pixabay API
const getCityPic = async (name) => {
    const { data } = await axios.post("/getCityPic", {
      name,
    });
    const { image } = await data;
    return image;
  };

  /**
 * Updates the User Interface (UI) with trip, weather, and location information.
 * 
 * @param {number} remainingDays - The number of days remaining until the trip starts.
 * @param {string} name - The name of the city where the trip is planned.
 * @param {string} Picture  - The URL of the Picture ture representing the city.
 * @param {Object} weather - An object containing weather data such as description, temperature, 
 *                           and expected minimum and maximum temperatures.
 */
  const updateUI = (remainingDays, name, Picture, weather, dateInp, cityInp) => {
    // Update the countdown to the trip start date.
    // Display the city name.
    document.querySelector(".cityName").innerHTML = name;
    document.querySelector("#Rdays").innerHTML = `
      Your trip to ${name} is in ${remainingDays} day(s) away
    `;
  
    // Display the weather description. If the trip is in less than a week away from now, it uses general terms;
    // otherwise, it specifies the expected weather.
    document.querySelector(".weather").innerHTML =
      remainingDays < 7
        ? `Weather is: ${weather.description}`
        : `Weather is expected to be: ${weather.description}`;
  
    // Display the current or forecasted temperature, formatted in degrees Celsius.
    // The distinction is made based on whether the trip is more than 7 days away.
    document.querySelector(".temp").innerHTML =
      remainingDays >= 7
        ? `Forecast: ${weather.temp}&degC`
        : `Temperature: ${weather.temp} &degC`;
  
    // Display the maximum temperature if the trip is more than a week away, otherwise it's left blank.
    document.querySelector(".max-temp").innerHTML =
      remainingDays > 7 ? `High: ${weather.app_max_temp}&degC` : "";
  
    // Similarly, display the minimum temperature for trips more than a week away.
    document.querySelector(".min-temp").innerHTML =
      remainingDays > 7 ? `Low: ${weather.app_min_temp}&degC` : "";
  
    // Insert an image of the city into the page. The alt attribute provides a description for accessibility.
    document.querySelector(".cityPic").innerHTML = `
      <img 
        src="${Picture}" 
        style="width: 100%; max-width: 300px; height: 300px; object-fit: cover; border-radius: 15px; margin: 5px;"
        alt="An image that describes the city nature"
      >
    `;

    dateInp.value = "";
    cityInp.value = "";
    
    // Make the flight data section visible.
    document.querySelector(".flight_data").style.display = "block";
    return;
    
  };
   /// validate the form inputs
 const validateInputs = () => {
  console.log("I am working");
    if(!cityInp.value) {
      city_error.innerHTML = `You need to enter your destination.`
      city_error.style.display = "block";
      return ;
    } else if(!dateInp.value) {
      date_error.innerHTML = `You need to enter a valid date.`
      date_error.style.display = "block";
      return ;
    } else if(getRDays(dateInp.value) < 0) {
      date_error.innerHTML = `Date cannot be in the past`
      date_error.style.display = "block";
      return ;
    }
    city_error.style.display = "none";
    date_error.style.display = "none";
    return true;
 }


export { handleSubmit }