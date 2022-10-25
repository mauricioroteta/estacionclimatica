class Ciudad{
    constructor (l, g){
        this.latitud = l;
        this.longitud = g;
        this.Nombre = '';
        this.temperatura = 0;
    }
}

// Calculo de la posicion del viento de grados
function direccionDelViento(n){
    let direccion
    if ((n > 337,5) || (n < 22,5)){
        return 'Norte'
    }
    if (n > 292,5){
        return 'Noroeste'
    }
    if (n > 247,5){
        return 'Oeste'
    }
    if (n > 202,5){
        return 'Sudoeste'
    }
    if (n > 157,5){
        return 'Sur'
    }
    if (n > 111,5){
        return 'Sudeste'
    }
    if (n > 202,5){
        return 'Este'
    }
    if (n > 22,5){
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
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + x.latitud + '&longitude=' + x.longitud + '&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=America%2FSao_Paulo')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            document.getElementById('temperaturaActual').textContent = json.current_weather.temperature + ' °C'
            document.getElementById('viento').textContent = json.current_weather.windspeed + ' km/h - ' + direccionDelViento(parseInt(json.current_weather.winddirection))
            document.getElementById('localidad').textContent = ObtenerNombreLocalidad(x.latitud, x.longitud)
            CompletarDias()
            document.getElementById('tempDia1').textContent = json.daily.temperature_2m_max[0] + ' / ' + json.daily.temperature_2m_min[0]
            document.getElementById('tempDia2').textContent = json.daily.temperature_2m_max[1] + ' / ' + json.daily.temperature_2m_min[1]
            document.getElementById('tempDia3').textContent = json.daily.temperature_2m_max[2] + ' / ' + json.daily.temperature_2m_min[2]
            document.getElementById('tempDia4').textContent = json.daily.temperature_2m_max[3] + ' / ' + json.daily.temperature_2m_min[3]
            document.getElementById('tempDia5').textContent = json.daily.temperature_2m_max[4] + ' / ' + json.daily.temperature_2m_min[4]
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