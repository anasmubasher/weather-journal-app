/* Global Variables */

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '56e377c4177aa039d9e566cc42bdbebf&units=imperial';
        
// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate');
generate.addEventListener('click', getDataActivation);

/* Function called by event listener */
function getDataActivation(e) {
    // Zip code entered by user
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    // An API call
    getData(baseURL, zipCode, apiKey)
    // Post the data after we call it from the API
    .then(data => {
        console.log(data);
        postData('/addData', {temp:data.main.temp, date:newDate, userResponse:userResponse});
    });
    // Reuse the posted project data to update the user interface
    updateUI();
}
    
/* Function to GET Web API Data*/
const getData = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(`${baseURL + zipCode}&appid=${apiKey}`);
    
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
};
    
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
    
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const req = await fetch('/all');

    try {
        const allData = await req.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData[allData.length-1].date;
        document.getElementById('temp').innerHTML = allData[allData.length-1].temp;
        document.getElementById('content').innerHTML = allData[allData.length-1].userResponse;

    } catch (error) {
        console.log('error', error);
    }
};