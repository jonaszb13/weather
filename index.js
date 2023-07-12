const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const notFound = document.querySelector('.not-found');
const weather = document.querySelector('.weather');
const details = document.querySelector('.details');
const inputField = document.querySelector('.search input');

inputField.addEventListener('keydown', function(e) {
    if (e.key === "Enter") { 
        startSearch();
    }
});


function startSearch() {

    console.log('starting search...');

    const apiKey = '4b1851f15151565fe499e043f0c3d6f6';
    const city = document.querySelector('.search input').value;

    if (city === '')
    return;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            notFound.style.display = 'block';
            weather.style.display = 'none';
            details.style.display = 'none';
            container.style.height = '400px';
            return;
        };

        console.log('city found')

        notFound.style.display = 'none';

        const image = document.querySelector('.weather img');
        const temp = document.querySelector('.weather .temp');
        const description = document.querySelector('.weather .description');
        const humidity = document.querySelector('.details .humidity span');
        const wind = document.querySelector('.details .wind span')

        console.log('getting weather information...');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/sun.png'
                break
            case 'Rain':
                image.src = 'images/rain.png'
                break
            case 'Snow': 
                image.src = 'images/snow.png'
                break
            case 'Thunderstorm':
                image.src = 'images/storm.png'
                break
            case 'Clouds':
                image.src = 'images/clouds.png'
                break

            default:
                image.src = '';
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${parseInt(json.clouds.all)}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`

        console.log('weather information found');

        weather.style.display = 'block';
        details.style.display = 'block';
        container.style.height = '600px';

    })
}
