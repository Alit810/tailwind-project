let inputElem = document.querySelector("input");
let cityElem = document.querySelector(".country-name");
let tempElem = document.querySelectorAll(".temp");
let weatherCoundition = document.querySelectorAll(".wheather");
let dateElem = document.querySelector(".Date");
let timeElem = document.querySelector(".currTime");
let greetElem = document.querySelector(".greeting");
let windElem = document.querySelector(".wind-speed");
console.log(tempElem);


let apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "ae661b1c3bb029fc1ecf8b9ffb5511c7"
}

function fetchData(){
    countryValue = inputElem.value

    fetch(`${apiData.url}${countryValue}&appid=${apiData.key}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        showData(data);
    } 
    )
}

function showData(data){
    cityElem.innerHTML = `${data.name},${data.sys.country}`
    tempElem.forEach((element) => {
        element.innerHTML = `${Math.floor(data.main.temp - 273)}°`
    })
    weatherCoundition.forEach((element) => {
        element.innerHTML = `${data.weather[0].main}`;
    })
    windElem.innerHTML = `${data.wind.speed}`
    dateElem.innerHTML = showDate();
    timeElem.innerHTML = formatTime();
}

inputElem.addEventListener("keypress" , (e) =>{
    if(e.keyCode === 13){
        fetchData()
    }
    
});

function showDate(){
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let now = new Date();

    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    let date = now.getDate();

    return `${day} ${date} ${month} ${year}`;
}

function formatTime() {
    // دریافت زمان فعلی
    const now = new Date();
    
    // دریافت ساعت و دقیقه
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let welcome = greetElem;
    welcome.textContent = " "
    
    // تعیین AM یا PM
    const ampm = hours >= 12 ? 'Pm' : 'Am';
    
    // تبدیل ساعت به فرمت 12 ساعتی
    hours = hours % 12;
    hours = hours ? hours : 12; // اگر ساعت 0 بود، آن را به 12 تبدیل می‌کنیم
    
    // اگر دقیقه کمتر از 10 باشد، یک صفر اضافه می‌کنیم
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    // ساختن زمان نهایی در فرمت hh:mm am/pm
    const timeString = hours + ':' + minutes + ampm;

    if (hours >= 5 && hours < 12) {
        welcome = 'Good Morning';  // صبح (5:00 تا 11:59)
    } else if (hours >= 12 && hours < 17) {
        welcome = 'Good Afternoon'; // بعدازظهر (12:00 تا 16:59)
    } else if (hours >= 17 && hours < 21) {
        welcome = 'Good Evening';  // عصر (17:00 تا 20:59)
    } else {
        welcome = 'Good Night';   // شب (21:00 تا 4:59)
    }
    greetElem.textContent = welcome
    return timeString;
}

// فراخوانی تابع
console.log(formatTime()); // مثلا: 12:30pm
