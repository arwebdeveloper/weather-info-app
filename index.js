// fetch('api.openweathermap.org/').then(async (response)=>{
//     console.log(response);
//      const data = await response.json();
//     console.log(data);
// })

const input = document.querySelector('input');
const cityName = document.querySelector('#city-name');
const temp = document.querySelector('#temp');
const weatherCondition = document.querySelector('#weather-condition');
const maxminTemp = document.querySelector('#max-min-temp');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');

const fetchData = (city)=>{
   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=efbd3cc3fcb7f53e40e5f8423f47b9f0`)
  .then(response => response.json())
  .then((data) => {
      console.log(data)
      cityName.classList.remove('error')
      cityName.innerHTML = data.name;
      temp.innerHTML = `${parseInt(data.main.temp)}<sup id="deg">&#8451</sup>`;
      weatherCondition.innerHTML = `Weather : ${(data.weather[0].main)}`;
      maxminTemp.innerHTML = `Max/Min : ${parseInt(data.main.temp_max)}&deg/${parseInt(data.main.temp_min)}&deg`
      humidity.innerHTML = `Humidity : ${data.main.humidity}%`
      wind.innerHTML = `Wind : ${data.wind.speed} km/h`
  })
  .catch(()=>{
      if(input.value===""){
          cityName.classList.add('error')
          cityName.innerHTML = `Please enter a city name`;
          temp.innerHTML = `00<sup id="deg">&#8451</sup>`;
          weatherCondition.innerHTML = `Weather : ---`;
          maxminTemp.innerHTML = `Max/Min : --/--`
          humidity.innerHTML = `Humidity : --%`
          wind.innerHTML = `Wind : -- km/h`
      }else{
      cityName.classList.add('error')
      cityName.innerHTML = `No data found for city "${input.value}"`;
      temp.innerHTML = `00<sup id="deg">&#8451</sup>`;
      weatherCondition.innerHTML = `Weather : ---`;
      maxminTemp.innerHTML = `Max/Min : --/--`
      humidity.innerHTML = `Humidity : --%`
      wind.innerHTML = `Wind : -- km/h`
      }
  });
}


let timeoutId;
const onInput = (event)=>{
    if(timeoutId){
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(()=>{
        fetchData(event.target.value);
    },1000)
}
input.addEventListener('input',onInput)

