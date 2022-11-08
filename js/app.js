class DatosDia {
    constructor (i, datos){
        this._dia = datos.apparent_time[i];
        this._tempMax = datos.temperature_2m_max[i];
        this._tempMin = datos.emperature_2m_min[i];
        this._sunrise = datos.sunrise[i];
        this._sunset = datos.sunset[i];
        this._precipitaciones = datos.precipitation_sum[i];
        this._sensacionTermicaMax = datos.apparent_temperature_max[i];
        this._sensacionTermicaMin = datos.apparent_temperature_min[i];
    }
}

class Ciudad{
    constructor (l, g, j){
        this._latitud = l;
        this._longitud = g;
        this._nombre = ObtenerNombreLocalidad(l, g);
        this._temperatura = j.current_weather.temperature;
        this._vientoDireccion = j.current_weather.winddirection;
        this._vientoVelocidad = j.current_weather.windspeed;
        this._nuvosidad = 
        this._dias = [];
    }
}

function nuvosidad(n, p){
    if (n > 85){
        if (p > 0){
            return 'img/83.png'
        } else
        return 'img/43.png'
    } else if (n > 60){
        if (p > 0){
            return 'img/73.png'
        } else
        return 'img/37.png'
    } else if (n > 40){
        if (p > 0){
            return 'img/72.png'
        } else
        return 'img/25.png'
    } else if (n > 20){
        if (p > 0){
            return 'img/74.png'
        } else
        return 'img/19.png'
    }else if (n > 10){
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
        console.log(json)
        document.getElementById('localidad').textContent = json.address.town + " - " + json.address.state + ' - ' + json.address.country
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
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + long + '&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&hourly=temperature_2m,cloudcover&timezone=auto')
        .then(response => response.json())
        .then(json => {
            const x = new Ciudad(lat, long, json)
            console.log(json)
            document.getElementById('temperaturaActual').textContent = x._temperatura + ' °C'
            document.getElementById('viento').textContent = x._vientoVelocidad + ' km/h - ' + direccionDelViento(parseInt(x._vientoDireccion))
            document.getElementById('localidad').textContent = x._nombre //ObtenerNombreLocalidad(x._latitud, x._longitud)
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
            document.getElementById('iconDia1').src = nuvosidad(parseInt(nuves[1]), parseInt(json.daily.precipitation_sum[0]))
            if (json.daily.precipitation_sum[0] > 0){
                document.getElementById('precipDia1').textContent = json.daily.precipitation_sum[0] + ' mm'
            } else {document.getElementById('precipDia1').textContent = '--'}
            
            document.getElementById('tempDia2').textContent = json.daily.temperature_2m_max[1] + ' / ' + json.daily.temperature_2m_min[1]
            document.getElementById('iconDia2').src = nuvosidad(parseInt(nuves[2]), parseInt(json.daily.precipitation_sum[1]))
            if (json.daily.precipitation_sum[1] > 0){
                document.getElementById('precipDia2').textContent = json.daily.precipitation_sum[1] + ' mm'
            } else {document.getElementById('precipDia2').textContent = '--'}

            document.getElementById('tempDia3').textContent = json.daily.temperature_2m_max[2] + ' / ' + json.daily.temperature_2m_min[2]
            document.getElementById('iconDia3').src = nuvosidad(parseInt(nuves[3]), parseInt(json.daily.precipitation_sum[2]))
            if (json.daily.precipitation_sum[2] > 0){
                document.getElementById('precipDia3').textContent = json.daily.precipitation_sum[2] + ' mm'
            } else {document.getElementById('precipDia3').textContent = '--'}

            document.getElementById('tempDia4').textContent = json.daily.temperature_2m_max[3] + ' / ' + json.daily.temperature_2m_min[3]
            document.getElementById('iconDia4').src = nuvosidad(parseInt(nuves[4]), parseInt(json.daily.precipitation_sum[3]))
            if (json.daily.precipitation_sum[3] > 0){
                document.getElementById('precipDia4').textContent = json.daily.precipitation_sum[3] + ' mm'
            } else {document.getElementById('precipDia4').textContent = '--'}

            document.getElementById('tempDia5').textContent = json.daily.temperature_2m_max[4] + ' / ' + json.daily.temperature_2m_min[4]
            document.getElementById('iconDia5').src = nuvosidad(parseInt(nuves[5]), parseInt(json.daily.precipitation_sum[4]))
            if (json.daily.precipitation_sum[4] > 0){
                document.getElementById('precipDia5').textContent = json.daily.precipitation_sum[4] + ' mm'
            } else {document.getElementById('precipDia5').textContent = '--'}
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