const axios = require("axios")

const getWeather = async (lng, lat, remainingDays, weather_key) => {
    if (remainingDays < 0) {
        const errMsg = {
            message: "Date cannot be in the past",
            error: true
        }
        return errMsg
    }

    if (remainingDays > 0 && remainingDays <= 7) {
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${weather_key}`)
        const {weather , temp} = data.data[0];
        const {description} = weather;
        const weather_data = {description, temp}
        console.log(weather_data);
        return weather_data
        
    } else if (remainingDays > 7){
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainingDays}&key=${weather_key}`)
        const {weather, temp, app_max_temp, app_min_temp} = data.data[data.data.length -1]; //give the last element in the array
        const {description} = weather;
        const weather_data = {description, temp, app_max_temp, app_min_temp}
        console.log(weather_data);
        return weather_data
    }
}

module.exports =  {getWeather}