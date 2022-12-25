WEATHER = JSON.parse(localStorage.getItem('weather')) || [];


const searchBtn = document.querySelector('form');
const searchInput = document.querySelector('#input');


window.addEventListener('load', () => {
   
    let dateTime = new Date();
   document.querySelector('.date').innerHTML = dateTime;

   WEATHER.forEach(data => {
    display(data)
   })

})


searchBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    let searchValue = searchInput.value
    if(!searchValue) {
        return
    }

    const weather = {
        myKey: '1e80b7f55fad87c84b0c42cc3fb97235',
        getWeather: function() {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${this.myKey}`)
            .then(res => res.json())
            .then(val =>{
            display(val);
            storing(val);
            })
        },
       
    }

    function storing(val) {
        WEATHER.push(val);
        localStorage.setItem('weather', JSON.stringify(WEATHER));
    }
    
    weather.getWeather()
    searchBtn.reset()
    searchInput.focus()
   
})

function display(val) {
    let temp = val.main.temp
    document.querySelector('.weather').innerHTML = val.weather[0].description
    document.querySelector('.city').innerHTML = val.name;
    document.querySelector('.temperature').innerHTML = `${temp}°C`

    document.querySelector('.temperature').addEventListener('click', () => {
        document.querySelector('.temperature').innerHTML = temp * 9 / 5 + 32 + '°F';

        setTimeout(change, 3000);

    })


    function change() {
        document.querySelector('.temperature').innerHTML = `${temp}°C`
    }

}