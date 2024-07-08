// impedir comportamento padrão do submit
document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if(!cityName) {
        const show = document.querySelector('#weather').classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = 'cc23192aeae3fb043451915bf8a7844a'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`; //encode para recolhecer os acentos
                                                                                                                                        //&units para reconhecer em celsius
                                                                                                                                        //&lang pra especificar a linguagem
    

    const results = await fetch(apiUrl);
    const json = await results.json();
    
    if(json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        })
    }else {
        const show = document.querySelector('#weather').classList.remove('show');
        showAlert(`
            Cidade não encontrada.
            <img src="src/imagens/undraw_location_search_re_ttoj.svg" alt="">
        `);
    }

})

function showInfo(json) {
    showAlert('');
    const show = document.querySelector('#weather').classList.add('show');
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity} %`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} Km/h`
}

const showAlert = (alerta) => {
    document.querySelector('#alert').innerHTML = alerta;
}


