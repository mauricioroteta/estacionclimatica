var canvas = document.getElementById('myChart');
var heightRatio = 0.7;
canvas.height = canvas.width * heightRatio;

var retorno

async function ObtenerNombreLocalidad(lat, long){

    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + parseFloat(lat) + '&lon=' + parseFloat(long) + '&zoom=10&format=jsonv2')
    .then(response => response.json())
    .then(json => {
        document.getElementById('localidad').textContent = json.name + " - " + json.address.state_district + ' - ' + json.address.country
        retorno = json.name + " - " + json.address.state_district + ' - ' + json.address.country
    })  
    return retorno
}

async function Grafico(dias, tempMax, tempMin){

var ctx = document.getElementById('myChart').getContext('2d');
if (window.grafica) {
    window.grafica.clear();
    window.grafica.destroy();
}
window.grafica = 
new Chart(ctx, {
  type: 'line',
  data: {
    labels: dias,
    datasets: [{
      label: 'Temp. Maximas',
      data: tempMax,
      borderWidth: 1,
      borderColor: "#FF0000"
    },
    {
        label: 'Temp. Minimas',
        data: tempMin,
        borderWidth: 1,
        borderColor: "#0000FF"
      }]
  },
  options: {
        responsive:true,
        plugins: {
            title: {
                display: true,
                text: 'Gráfico de Temperaturas',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
  }
});
}

class DatosDia {
    constructor (i, datos){
        this._dia = datos.time[i];
        this._tempMax = datos.temperature_2m_max[i];
        this._tempMin = datos.temperature_2m_min[i];
        this._sunrise = datos.sunrise[i];
        this._sunset = datos.sunset[i];
        this._precipitaciones = datos.precipitation_sum[i];
        this._sensacionTermicaMax = datos.apparent_temperature_max[i];
        this._sensacionTermicaMin = datos.apparent_temperature_min[i];
        this._weathercode = datos.weathercode[i];
        this._direccionViento = datos.winddirection_10m_dominant[i]
        this._velocidadViento = datos.windspeed_10m_max[i]
    }
}

class Ciudad{
    constructor (l, g, j,){
        this._latitud = l;
        this._longitud = g;
        this._nombre = ObtenerNombreLocalidad(parseFloat(l), parseFloat(g));
        this._temperatura = j.current_weather.temperature;
        this._vientoDireccion = j.current_weather.winddirection;
        this._vientoVelocidad = j.current_weather.windspeed;
        
        fetch("/js/clima.json")
            .then((response) => response.json())
            .then((data) => {
                
                this._tiempoResumido = data[parseInt(j.current_weather.weathercode)].Descripcion;
            });

        this._weathercode = j.current_weather.weathercode;
        this._dia = []
        for (let i in j.daily.time){
            let x = new DatosDia(i, j.daily)
            this._dia.push(x)
        }
    }
    set_icon(i){
        this._icon = i;
    }
    get_icon(){
        return this._icon;
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

function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

var pronostico;
var datos;

// Obtiene proostico del tiempo para las coordenadas
async function ObtenerPronostico(lat, long){
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + long + '&daily=windspeed_10m_max,winddirection_10m_dominant,weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&hourly=temperature_2m,cloudcover&timezone=auto')
        .then(response => response.json())
        .then(json => {
            const x = new Ciudad(lat, long, json)

            let dias = json2array(json.daily.time)
            let tempMax = json2array(json.daily.temperature_2m_max)
            let tempMin = json2array(json.daily.temperature_2m_min)

            Grafico(dias, tempMax, tempMin)
            


            fetch("/js/clima.json")
            .then((response) => response.json())
            .then((data) => {
                
                EsDeDia()?x.set_icon(data[x._weathercode].iconDia):x.set_icon(data[x._weathercode].iconNoche);
                datos = data

            document.getElementById('temperaturaActual').textContent = x._temperatura + ' °C'
            document.getElementById('viento').textContent = x._vientoVelocidad + ' km/h - ' + direccionDelViento(parseInt(x._vientoDireccion))
            document.getElementById('localidad').textContent = x._nombre
            document.getElementById('resumen').textContent = x._tiempoResumido
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

            pronostico = x;

            
            document.getElementById('icnDia').src = 'img/' + x._icon + '.png'

            document.getElementById('tempDia1').textContent = x._dia[1]._tempMax + ' / ' + x._dia[1]._tempMin
            document.getElementById('iconDia1').src = 'img/' + data[x._dia[1]._weathercode].iconDia + '.png'
            if (json.daily.precipitation_sum[1] > 0){
                document.getElementById('precipDia1').textContent = x._dia[1]._precipitaciones + 'mm'
            } else {document.getElementById('precipDia1').textContent = '--'}
            
            document.getElementById('tempDia2').textContent = x._dia[2]._tempMax + ' / ' + x._dia[2]._tempMin
            document.getElementById('iconDia2').src = 'img/' + data[x._dia[2]._weathercode].iconDia + '.png'
            if (json.daily.precipitation_sum[2] > 0){
                document.getElementById('precipDia2').textContent = x._dia[2]._precipitaciones + 'mm'
            } else {document.getElementById('precipDia2').textContent = '--'}

            document.getElementById('tempDia3').textContent = x._dia[3]._tempMax + ' / ' + x._dia[3]._tempMin
            document.getElementById('iconDia3').src = 'img/' + data[x._dia[3]._weathercode].iconDia + '.png'
            if (json.daily.precipitation_sum[3] > 0){
                document.getElementById('precipDia3').textContent = x._dia[3]._precipitaciones + 'mm'
            } else {document.getElementById('precipDia3').textContent = '--'}

            document.getElementById('tempDia4').textContent = x._dia[4]._tempMax + ' / ' + x._dia[4]._tempMin
            document.getElementById('iconDia4').src = 'img/' + data[x._dia[4]._weathercode].iconDia + '.png'
            if (json.daily.precipitation_sum[4] > 0){
                document.getElementById('precipDia4').textContent = x._dia[4]._precipitaciones + 'mm'
            } else {document.getElementById('precipDia4').textContent = '--'}

            document.getElementById('tempDia5').textContent = x._dia[5]._tempMax + ' / ' + x._dia[5]._tempMin
            document.getElementById('iconDia5').src = 'img/' + data[x._dia[5]._weathercode].iconDia + '.png'
            if (json.daily.precipitation_sum[5] > 0){
                document.getElementById('precipDia5').textContent = x._dia[5]._precipitaciones + 'mm'
            } else {document.getElementById('precipDia5').textContent = '--'}

            // BUSCA ALERTA METEOROLOGICO
            getAlerta()
        });
        })  
}

// Obtiene Posicion del dispositivo (coordenadas)
function obtenerPos(){
    let j 
    j = JSON.parse(localStorage.getItem("favorito"))
    if (j == null){
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            long = position.coords.longitude;

            var geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=false';

            ObtenerPronostico(lat, long);
        });
    }}else{
        ObtenerPronostico(j.lat, j.lon);
        document.getElementById("fav").src="/img/favorito.svg";
    }
}

// Devuelve verdadero si es de dia y Falso si es de noche para mostrar el icono correspondiente
// Criterio Noche = Entre las 21 y las 6hs
function EsDeDia(){
    let ahora=new Date(); 
    let hora=ahora.getHours();
    let dia 

    (hora>21) || (hora<6) ?dia = false: dia = true;

    return dia;
}

// Muestra Pronostico del día seleccionado
function mostrarPronostico(dia) {
    document.getElementById('iconDiaR').src = 'img/' + datos[parseInt(pronostico._dia[parseInt(dia)]._weathercode)].iconDia + '.png'
    document.getElementById('InfoDia').textContent = pronostico._dia[parseInt(dia)]._dia
    document.getElementById('tblMax').textContent = pronostico._dia[parseInt(dia)]._tempMax
    document.getElementById('tblMin').textContent = pronostico._dia[parseInt(dia)]._tempMin
    document.getElementById('tblSol').textContent = moment(pronostico._dia[parseInt(dia)]._sunrise).format('LT') + '  /  ' + moment(pronostico._dia[parseInt(dia)]._sunset).format('LT');
    document.getElementById('tblViento').textContent = pronostico._dia[parseInt(dia)]._velocidadViento + ' km/h - ' + direccionDelViento(pronostico._dia[parseInt(dia)-1]._direccionViento)
    if (pronostico._dia[parseInt(dia)]._precipitaciones == 0){
        document.getElementById('tblPrecip').textContent = 'No se registran'
    } else
        document.getElementById('tblPrecip').textContent = pronostico._dia[parseInt(dia)]._precipitaciones + ' mm';

        fetch("/js/clima.json")
        .then((response) => response.json())
        .then((data) => {
            
            document.getElementById('pronosticoDia').textContent = data[pronostico._dia[parseInt(dia)]._weathercode].Descripcion;})
}

function borrar() {
        var options = document.querySelectorAll('#localidades');
        options.forEach(o => o.remove());
    }

async function selectLocalidad(){
        var combo = document.getElementById("localidades");
        var selected = combo.options[combo.selectedIndex].text;

        fetch('https://nominatim.openstreetmap.org/search.php?q=' + selected + '&format=jsonv2')
        .then(response => response.json())
        .then(json => {
            localidades = json;
            ObtenerPronostico(localidades[0].lat, localidades[0].lon);
        }
)}


async function buscarLocalidad(){
        var selectobject = document.getElementById("localidades");
        for (var i = selectobject.length - 1; i >= 0; --i) {
                selectobject.remove(i);
        }
        var localidades = document.querySelector('#localidades');
        localidades.innerHTML = localidades.innerHTML  + 
                    '<option value=' + 0 + '>' +  'Seleccione una localidad' + '</option>'

        fetch('https://nominatim.openstreetmap.org/search.php?q=' + document.getElementById('campobuscar').value + '&format=jsonv2')
        .then(response => response.json())
        .then(json => {
            localidades = json;

            for(var i=0;i<json.length;i++){
                if (json[i].category == 'boundary'){
                    var localidades = document.querySelector('#localidades');

                    localidades.innerHTML = localidades.innerHTML  + 
                    '<option value=' + i + '>' +  json[i].display_name + '</option>'
                }
            }
        }
        )}

// Agrega A Favorito
function AddFav(x) {
    let j 
    j = JSON.parse(localStorage.getItem("favorito"))
    if (j != null){
        Swal.fire({
            title: 'Esta usted seguro?',
            text: "Desea borrar esta ubicacion favorita?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF0000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrada!',
                    'La localidad ha sido borrada.',
                    'Borrada'
            )
            GuardarLocaldadLS()
            }
        })}else{
            Swal.fire({
                title: 'Esta usted seguro?',
                text: "Desea guardar esta ubicacion como favorita?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Guardar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Guardada!',
                        'La localidad ha sido grabada.',
                        'Grabado'
                )
                GuardarLocaldadLS()
                }
            })
        }
}

function GuardarLocaldadLS(){

    let j 
    j = JSON.parse(localStorage.getItem("favorito"))
    if (j == null){

    const favorito = {
        name : "Fav",
        lat : pronostico._latitud,
        lon : pronostico._longitud,
        localidad : ObtenerNombreLocalidad(parseFloat(pronostico._latitud), parseFloat(pronostico._longitud))
      }
      
      window.localStorage.setItem("favorito", JSON.stringify(favorito));
      document.getElementById("fav").src="/img/favorito.svg";
    }else{
        window.localStorage.removeItem("favorito")
        document.getElementById("fav").src="/img/save.svg";
    }

}

function ObtenerLocaldadLS(){
      alert(JSON.parse(localStorage.getItem("favorito")))
}

function iconoSobre(objeto) {
    let j 
    j = JSON.parse(localStorage.getItem("favorito"))
    if (j == null){
        document.getElementById("fav").src="/img/favorito.svg";
    }else{
        document.getElementById("fav").src="/img/delete.svg";
    }
}

function iconoSale(objeto) {
    let j 
    j = JSON.parse(localStorage.getItem("favorito"))
    if (j == null){
       document.getElementById("fav").src="/img/Save.svg";
    }else{
        document.getElementById("fav").src="/img/favorito.svg";
    }
}

// Alerta Meteorologico
function getAlerta(){

    // URL SMN GeoRSS
    const RSS_URL = 'https://ssl.smn.gob.ar/feeds/avisocorto_GeoRSS.xml';

    // Prueba fallida para evitar el uso del plugin Moesif CORS
    
//    const form = new URLSearchParams();
//    fetch(RSS_URL, {
//        method: 'POST',
//        mode: 'no-cors',
//        headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//            'Accept-Language': 'en-GB',
//            'Accept-Encoding': 'gzip, deflate',
//            Connection: 'Keep-alive',
//        },
//        body: form,
//    })*/
    fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
    

        // Coordenadas locales (solo positivas y long + lat)
        var pt = turf.point([pronostico._longitud*-1, pronostico._latitud*-1]);
        
        // Items 
        const items = data.querySelectorAll("item");

        if (items.length == 0 || items[0].childNodes.length < 9)
        {
            Swal.fire({
                title: 'No hay Alertas!',
                text: 'El SMN no registra Alertas en Argentina',
                icon: 'success',
                confirmButtonText: 'Ok'
              })       
        }else
        {
            for(let j=0; j<items.length; j++) {
            
            let str = items[j].childNodes[9].innerHTML;
            let arr = str.split(' '); 
            //dividir la cadena de texto por una coma
            //var pt = turf.point([-58.93*-1,-35.86*-1]);
            let poligono = turf.polygon([[
                [-81, 41],
                [-81, 47],
                [-72, 47],
                [-72, 41],
                [-81, 41]
              ]]);

              for(let i=0; i<arr.length; i++) {
                poligono.geometry.coordinates[0].push([arr[i+1]*-1,arr[i]*-1])
                i++
              }
            poligono.geometry.coordinates[0].push([arr[1]*-1, arr[0]*-1])
            poligono.geometry.coordinates[0].splice(0, 5)

            if (turf.booleanPointInPolygon(pt, poligono)){
                Swal.fire({
                    title: 'ALERTA!',
                    html:
                    'Puede acceder a mas detalles ' +
                    '<a href="https://www.smn.gob.ar/avisos_a_muy_corto_plazo">aqui</a> ',
                    text: 'El SMN registra Alerta Meteorologico para la zona en las proximas horas',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                  })  
            }else{
            }
        }
        }
    });   

}
