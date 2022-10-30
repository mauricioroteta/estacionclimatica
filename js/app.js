class iconTiempo{
    
}

class Ciudad{
    constructor (l, g){
        this.latitud = l;
        this.longitud = g;
        this.Nombre = '';
        this.temperatura = 0;
    }
}

function nuvosidad(n){
    if (n > 85){
        return 'img/73.png'
    } else if (n > 60){
        return 'img/37.png'
    } else if (n>40){
        return 'img/25.png'
    } else if (n>30){
        return 'img/19.png'
    }else if (n>15){
        return 'img/13.png'
    } else {
        return 'img/3.png'
    }
}

// Calculo de la posicion del viento de grados
function direccionDelViento(n){
    if ((n > 337.5) || (n < 22.5)){
        return 'Norte'
    } else if (n > 292.5){
        return 'Noroeste'
    } else if (n > 247.5){
        return 'Oeste'
    } else if (n > 202.5){
        return 'Sudoeste'
    } else if (n > 157.5){
        return 'Sur'
    } else if (n > 111.5){
        return  'Sudeste'
    } else if (n > 202.5){
        return 'Este'
    } else 
    if (n > 22.5){
        return 'Noreste'
    }
}

function ObtenerNombreLocalidad(lat, long){
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + long)
    .then(response => response.json())
    .then(json => {
        document.getElementById('localidad').textContent = json.address.state_district + " - " + json.address.state + ' - ' + json.address.country
    })  
}
// Completa los dias de la semana en el pronostico semanal
function CompletarDias(){
    var today = new Date();
    var options = { weekday: 'short'};
    var i 
    for (i=1;i<=5;i+=1) { 
        today.setDate(today.getDate() + 1);
        document.getElementById('NombreDia' + i).textContent = today.toLocaleString('es-LA', options)
    }
}

// Obtiene proostico del tiempo para las coordenadas
function ObtenerPronostico(lat, long){
    obtenerPos()
    x = new Ciudad(lat, long)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + x.latitud + '&longitude=' + x.longitud + '&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&hourly=temperature_2m,cloudcover&timezone=auto')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            document.getElementById('temperaturaActual').textContent = json.current_weather.temperature + ' °C'
            document.getElementById('viento').textContent = json.current_weather.windspeed + ' km/h - ' + direccionDelViento(parseInt(json.current_weather.winddirection))
            document.getElementById('localidad').textContent = ObtenerNombreLocalidad(x.latitud, x.longitud)
            CompletarDias()

            const nuves = []

            let rep = 0
            let sumNuves = 0
            let nuveAhora = 0
            
            let dia = json.hourly.time[0].substring(0, 10)

            for (i in json.hourly.time){
                if (dia == json.hourly.time[i].substring(0, 10)){
                    if ((json.current_weather.time >= json.hourly.time[i]) && (json.current_weather.time <= json.hourly.time[i])){
                        nuveAhora = json.hourly.cloudcover[i]
                        //console.log(json.current_weather.time + ' comparado con ' + json.hourly.time[i] + ' = ' + json.hourly.cloudcover[i])
                    }
                    rep++
                    sumNuves = sumNuves + json.hourly.cloudcover[i]
                } else {
                    nuves.push(sumNuves / rep)
                    rep = 0
                    dia = json.hourly.time[i].substring(0, 10)
                    sumNuves = json.hourly.cloudcover[i]
                }
            }

            document.getElementById('icnDia').src = nuvosidad(parseInt(nuveAhora))

            document.getElementById('tempDia1').textContent = json.daily.temperature_2m_max[0] + ' / ' + json.daily.temperature_2m_min[0]
            document.getElementById('iconDia1').src = nuvosidad(parseInt(nuves[1]))
            document.getElementById('precipDia1').textContent = json.daily.precipitation_sum[0] + 'mm'

            document.getElementById('tempDia2').textContent = json.daily.temperature_2m_max[1] + ' / ' + json.daily.temperature_2m_min[1]
            document.getElementById('iconDia2').src = nuvosidad(parseInt(nuves[2]))
            document.getElementById('precipDia2').textContent = json.daily.precipitation_sum[1] + 'mm'

            document.getElementById('tempDia3').textContent = json.daily.temperature_2m_max[2] + ' / ' + json.daily.temperature_2m_min[2]
            document.getElementById('iconDia3').src = nuvosidad(parseInt(nuves[3]))
            document.getElementById('precipDia3').textContent = json.daily.precipitation_sum[2] + 'mm'

            document.getElementById('tempDia4').textContent = json.daily.temperature_2m_max[3] + ' / ' + json.daily.temperature_2m_min[3]
            document.getElementById('iconDia4').src = nuvosidad(parseInt(nuves[4]))
            document.getElementById('precipDia4').textContent = json.daily.precipitation_sum[3] + 'mm'

            document.getElementById('tempDia5').textContent = json.daily.temperature_2m_max[4] + ' / ' + json.daily.temperature_2m_min[4]
            document.getElementById('iconDia5').src = nuvosidad(parseInt(nuves[5]))
            document.getElementById('precipDia5').textContent = json.daily.precipitation_sum[4] + 'mm'
        })  
}

// Obtiene Posicion del dispositivo (coordenadas)
function obtenerPos(){
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            long = position.coords.longitude;

            var geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=false';

            ObtenerPronostico(lat, long);
        });   
    }}