// Define the resetForm function
const resetForm = (event) => {
    event.preventDefault();
    console.log("Resetting form");
  
    // Clear input fields
    const dateInp = document.querySelector('#flightDate');
    const cityInp = document.querySelector('#city');
    dateInp.value = '';
    cityInp.value = '';
  
    // Hide error messages
    const city_error = document.querySelector('#city_error');
    const date_error = document.querySelector('#date_error');
    city_error.style.display = 'none';
    date_error.style.display = 'none';
    city_error.innerHTML = '';
    date_error.innerHTML = '';
  
    // Hide the flight data section again
    document.querySelectorAll(".flight_data").forEach(el => {
      el.style.display = "none";
    });
  };
  
  // Attach the event listener after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.querySelector('#resetForm');
    if (resetButton) {
        resetButton.addEventListener('click', resetForm);
    }
  });
  
  // Export the resetForm function
  export { resetForm };
  