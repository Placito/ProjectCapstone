const axios = require("axios")

const getCityLocation = async(city, username) => {
    const {data} = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`)
    
    if(!data.geonames.length){
        const errMsg = {
            message: "No city with that name. Please make sure of your spelling",
            error: true
        }
        return errMsg
    }

    const { name, lat, lng } = await data.geonames[0]
    console.log({ name, lat, lng })
    return { name, lat, lng }
}

module.exports =  {getCityLocation}