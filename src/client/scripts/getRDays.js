// function to get the remainig days from the day that the user fill the form to the actual trip
const getRDays = (date) => {
    // set the start(now) and end date(travelDate) 
    const now = new Date()
    const travelDate = new Date(date)

    const timeDifference = travelDate.getTime() - now.getTime()

    // calculates the number of days between two dates based on a given timeDifference in milliseconds. 1000 milliseconds in one second,
    // 3600 seconds in one hour (60 seconds * 60 minutes),
    // 24 hours in one day.
    // So, 1000 * 3600 * 24 gives the total number of milliseconds in 24 hours, i.e., one day.
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24))

    // return remainnig days
    return remainingDays === -0 ? 0 : remainingDays;
}

module.exports = { getRDays };
