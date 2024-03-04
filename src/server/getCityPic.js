const axios = require("axios")


const getCityPic = async(name, pixabay_key) => {
    const {data} = await axios.get(`https://pixabay.com/api/?key=${pixabay_key}&q=${name}&image_type=photo`)

    // Since not all cities may have a corresponding image on Pixabay, we implement a fallback mechanism.
    // We first attempt to fetch the city image from the Pixabay data. If an image exists (data.hits[0] is truthy),
    // we use its 'webformatURL'. If no image is found for the city (data.hits[0] is falsy),
    // we default to a random city image from Unsplash using a specific URL structure to include tags like 'city', 'morning', and 'night'.
    // This ensures that our application always has an image to display.
    const image = await data.hits[0] ? await data.hits[0].webformatURL : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1";

    // If the 'image' variable is truthy (which it always should be, given the fallback),
    // we prepare and return an object with the image URL encapsulated within the 'image' property.
    if(image){
        return {image};
    }

}

module.exports = {
    getCityPic
}