

let clima = []

let WWO = new Map();
WWO.set(0,'Ningún     desarrollo     nuboso     fue observado u observable.');
WWO.set(1,'Nubes en disolución o haciéndose menos desarrolladas.');
WWO.set(2,'Estado  de  cielo  sin  cambios  en  su conjunto.');
WWO.set(3,'Nubes  en  formación  o  en  vías  de desarrollo.');
WWO.set(4,'Visibilidad reducida por humo, quemazón de maleza o de bosques, humos industriales o cenizas volcánicas.');
WWO.set(5,'Bruma.');
WWO.set(6,'Polvo en suspensión en el aire, abarcando gran extensión, no levantados por el viento en el lugar de la observación o en sus alrededores en el momento de la observación.');
WWO.set(7,'Polvo o arena levantados por el viento en la estación o en sus alrededores en el momento de la observación, pero con ausencia de torbellino (s) de polvo o de arena bien desarrollado (s) sin tempestad de polvo o arena a la vista.');
WWO.set(8,'Torbellino (s) de polvo o de arena bien desarrollado (s), observado (s) en la estación o en sus alrededores durante la hora precedente, o en el momento de la observación, pero sin tempestad de polvo o de arena.');
WWO.set(9,'Tempestad de polvo o de arena a la vista en el momento de la observación, o en la estación misma durante la hora precedente.');
WWO.set(10,'Neblina.');
WWO.set(11,'Banco (s) delgado (s) de niebla o niebla helada en laestación, ya sea en tierra o en el mar, de un espesor no mayor de 2 metros sobre tierra o de 10 metros sobre el mar.');
WWO.set(12,'Capa delgada de niebla, o de niebla helada, más o menos continuas, en la estación, ya sea en tierra o en el mar, de un espesor no mayor de 2 metros sobre tierra o de 10 metros sobre el mar.');
WWO.set(13,'Relámpagos a la vista, sin oírse truenos.');
WWO.set(14,'Precipitación a la vista, que no llega al suelo o a la superficie del mar.');
WWO.set(15,'Precipitación a la vista, que llega al suelo o a la superficie del mar, pero distante (es decir, más de 5 Km) de la estación.');
WWO.set(16,'Precipitaciones  que  llegan  al  suelo  o  a  la  superficie  del  mar  cerca  de  la estación, pero no en la estación misma.');
WWO.set(17,'Tormenta (truenos, con relámpagos o sin ellos), pero sin precipitación en el momento de la observación.');
WWO.set(18,'Tormenta (truenos, con relámpagos o sin ellos), pero sin precipitación en el momento de la observación.');
WWO.set(19,'Tromba (s) terrestre (s) o marina (s) en la estación, o a la vista, durante la hora precedente o en el momento de la observación.');
WWO.set(20,'Llovizna  (no  congelándose  o  nieve granulada).');
WWO.set(21,'Lluvia (no congelándose).');
WWO.set(22,'Nieve.');
WWO.set(23,'Lluvia con nieve o granos de hielo.');
WWO.set(24,'Llovizna o lluvia congelándose.');
WWO.set(25,'Chaparrón (es) de lluvia.');
WWO.set(26,'Chaparrón (es) de nieve o de lluvia y nieve.');
WWO.set(27,'Chaparrón (es) de granizo, o de pedrisco, granizo blando, o de lluvia y granizo.');
WWO.set(28,'Niebla o niebla helada.');
WWO.set(29,'Tormenta (con precipitaciones o sin ellas).');
WWO.set(30,'Ligera     o     moderada,     que     ha disminuido  en  el  curso  de  la  hora precedente');
WWO.set(31,'Ligera o moderada, sin cambio apreciable en el curso de la hora precedente.');
WWO.set(32,'Ligera     o     moderada,     que     ha comenzado,  o  ha  aumentado,  en  el curso de la hora precedente.');
WWO.set(33,'Violenta, que ha disminuido en el curso de la hora precedente.');
WWO.set(34,'Violenta, sin cambio apreciable en el curso de la hora precedente.');
WWO.set(35,'Violenta, que ha comenzado, o ha aumentando, en el curso de la hora precedente.');
WWO.set(36,'Ventisca débil o moderada, generalmente baja (por debajo del nivel de la visual del observador).');
WWO.set(37,'Ventisca fuerte, generalmente baja (por debajo del nivel de la visual del observador).');
WWO.set(38,'Ventisca débil o moderada, generalmente elevada (por encima del nivel de la visual del observador).');
WWO.set(39,'Ventisca fuerte, generalmente elevada (por encima del nivel de la visual del observador).');
WWO.set(40,'Niebla o niebla helada a la distancia en el momento de la observación; la niebla o niebla helada se extiende hasta el nivel superior al del observador. No hubo niebla o niebla helada en la estación en el curso de la hora precedente.');
WWO.set(41,'Niebla, o niebla helada en bancos.');
WWO.set(42,'Niebla, o niebla helada, cielo visible.');
WWO.set(43,'Niebla, o niebla helada, cielo invisible.');
WWO.set(44,'Niebla, o niebla helada, cielo visible.');
WWO.set(45,'Niebla, o niebla helada, cielo invisible.');
WWO.set(46,'Niebla, o niebla helada, cielo visible.');
WWO.set(47,'Niebla, o niebla helada, cielo invisible.');
WWO.set(48,'Niebla, depositando cenceñada, cielo visible.');
WWO.set(49,'Niebla, depositando cenceñada, cielo invisible.');
WWO.set(50,'Llovizna intermitente, no congelándose.');
WWO.set(51,'Llovizna continua, no congelándose.');
WWO.set(52,'Llovizna intermitente, no congelándose.');
WWO.set(53,'Llovizna continua, no congelándose.');
WWO.set(54,'Llovizna intermitente, no congelándose.');
WWO.set(55,'Llovizna continua, no congelándose.');
WWO.set(56,'Llovizna débil, congelándose.');
WWO.set(57,'Llovizna moderada o fuerte (densa), congelándose.');
WWO.set(58,'Llovizna y lluvia, débil.');
WWO.set(59,'Llovizna y lluvia, moderada o fuerte.');
WWO.set(60,'Lluvia intermitente, no congelándose.');
WWO.set(61,'Lluvia continua, no congelándose.');
WWO.set(62,'Lluvia intermitente, no congelándose.');
WWO.set(63,'Lluvia continua, no congelándose.');
WWO.set(64,'Lluvia intermitente, no congelándose.');
WWO.set(65,'Lluvia continua, no congelándose.');
WWO.set(66,'Lluvia débil, congelándose.');
WWO.set(67,'Lluvia moderada o fuerte, congelándose.');
WWO.set(68,'Lluvia y nieve o llovizna y nieve, débil.');
WWO.set(69,'Lluvia y nieve o llovizna y nieve, moderada o fuerte.');
WWO.set(70,'Caída intermitente de copos de nieve.');
WWO.set(71,'Caída continua de copos de nieve.');
WWO.set(72,'Caída intermitente de copos de nieve.');
WWO.set(73,'Caída continua de copos de nieve.');
WWO.set(74,'Caída intermitente de copos de nieve.');
WWO.set(75,'Caída continua de copos de nieve.');
WWO.set(76,'Prismas de hielo (con niebla o sin ella).');
WWO.set(77,'Nieve granulada (con niebla o sin ella).');
WWO.set(78,'Cristales aislados de nieve en forma de estrellas (con niebla o sin ella).');
WWO.set(79,'Granos de hielo.');
WWO.set(80,'Chaparrón (es) de lluvia, débil (es).');
WWO.set(81,'Chaparrón (es) de lluvia, moderado (s) o fuerte (s).');
WWO.set(82,'Chaparrón (es) de lluvia, violento (s).');
WWO.set(83,'Chaparrón (es) de lluvia y nieve, débil (es).');
WWO.set(84,'Chaparrón (es) de lluvia y nieve, moderado (s) o fuerte (s).');
WWO.set(85,'Chaparrón (es) de nieve, débil (es).');
WWO.set(86,'Chaparrón (es) de nieve, moderado (s) o fuerte (s).');
WWO.set(87,'Chaparrón (es) de granizo o de granizo blando, con lluvia o sin ella o lluvia con nieve, débil (es).');
WWO.set(88,'Chaparrón (es) de granizo o de granizo blando, con lluvia o sin ella o lluvia con nieve, moderado (s) o fuerte (s).');
WWO.set(89,'Chaparrón (es) de pedrisco con lluvia, o sin ella, con nieve, débil (es), sin truenos.');
WWO.set(90,'Chaparrón (es) de pedrisco con lluvia, o    sin    ella    o    lluvia    con    nieve, moderado (s) o fuerte (s), sin truenos.');
WWO.set(91,'Lluvia débil en el momento de la observación.');
WWO.set(92,'Lluvia   moderada   o   fuerte   en   el momento de la observación');
WWO.set(93,'Caída débil de nieve o agua con nieve o granizo, granizo blando o pedrisco en el momento de la observación.');
WWO.set(94,'Caída moderada o fuerte de nieve o agua con nieve o granizo blando o pedrisco en el momento de la observación.');
WWO.set(95,'Tormenta débil o moderada sin granizo, granizo blando o pedrisco, pero con lluvia y/o nieve en el momento de la observación.');
WWO.set(96,'Tormenta débil o moderada con granizo, granizo blando o pedrisco en el momento de la observación.');
WWO.set(97,'Tormenta fuerte sin granizo, granizo blando o pedrisco pero con lluvia y/o nieve en el momento de la observación.');
WWO.set(98,'Tormenta con tempestad de polvo o de arena en el momento de la observación.');
WWO.set(99,'Tormenta fuerte, con granizo, granizo blando o pedrisco en el momento de la observación.');

var retorno

function ObtenerNombreLocalidad(lat, long){

    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + parseFloat(lat) + '&lon=' + parseFloat(long) + '&zoom=10&format=jsonv2')
    .then(response => response.json())
    .then(json => {
        console.log(json)
        document.getElementById('localidad').textContent = json.name + " - " + json.address.state_district + ' - ' + json.address.country
        retorno = json.name + " - " + json.address.state_district + ' - ' + json.address.country
    })  
    return retorno
}

function Grafico(dias, tempMax, tempMin){
//const ctx = document.getElementById('myChart');

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
    constructor (l, g, j, WWO){
        this._latitud = l;
        this._longitud = g;
        this._nombre = ObtenerNombreLocalidad(parseFloat(l), parseFloat(g));
        this._temperatura = j.current_weather.temperature;
        this._vientoDireccion = j.current_weather.winddirection;
        this._vientoVelocidad = j.current_weather.windspeed;
        this._tiempoResumido = WWO.get(parseInt(j.current_weather.weathercode))
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
function ObtenerPronostico(lat, long){
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + long + '&daily=windspeed_10m_max,winddirection_10m_dominant,weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&hourly=temperature_2m,cloudcover&timezone=auto')
        .then(response => response.json())
        .then(json => {
            const x = new Ciudad(lat, long, json, WWO)

            let dias = json2array(json.daily.time)
            let tempMax = json2array(json.daily.temperature_2m_max)
            let tempMin = json2array(json.daily.temperature_2m_min)

            Grafico(dias, tempMax, tempMin)

            console.log(json)

            console.log(x._icon)

            fetch("/js/clima.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                x.set_icon(data[x._weathercode].iconDia);
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

            console.log('img/' + x._icon + '.png')
            document.getElementById('icnDia').src = 'img/' + x._icon + '.png'
            //nuvosidad(parseInt(nuveAhora))

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

function mostrarPronostico(dia) {
    document.getElementById('iconDiaR').src = 'img/' + datos[parseInt(pronostico._dia[parseInt(dia)]._weathercode)].iconDia + '.png'
    document.getElementById('InfoDia').textContent = pronostico._dia[parseInt(dia)]._dia
    document.getElementById('tblMax').textContent = pronostico._dia[parseInt(dia)]._tempMax
    document.getElementById('tblMin').textContent = pronostico._dia[parseInt(dia)]._tempMin
    document.getElementById('tblViento').textContent = pronostico._dia[parseInt(dia)]._velocidadViento + ' km/h - ' + direccionDelViento(pronostico._dia[parseInt(dia)-1]._direccionViento)
    if (pronostico._dia[parseInt(dia)]._precipitaciones == 0){
        document.getElementById('tblPrecip').textContent = 'No se registran'
    } else
        document.getElementById('tblPrecip').textContent = pronostico._dia[parseInt(dia)]._precipitaciones + ' mm';

    document.getElementById('pronosticoDia').textContent = WWO.get(parseInt(pronostico._dia[parseInt(dia)]._weathercode))
}

function borrar() {
        var options = document.querySelectorAll('#localidades');
        options.forEach(o => o.remove());
    }

function selectLocalidad(){
        var combo = document.getElementById("localidades");
        var selected = combo.options[combo.selectedIndex].text;

        fetch('https://nominatim.openstreetmap.org/search.php?q=' + selected + '&format=jsonv2')
        .then(response => response.json())
        .then(json => {
            localidades = json;
            ObtenerPronostico(localidades[0].lat, localidades[0].lon);
        }
)}


function buscarLocalidad(){
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

    /*const favorito = {
        name : "Fav",
        lat : pronostico._latitud,
        lon : pronostico._longitud,
        localidad : ObtenerNombreLocalidad(parseFloat(pronostico._latitud), parseFloat(pronostico._longitud))
      }
      
      window.localStorage.setItem("favorito", JSON.stringify(favorito)); */
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

function getAlerta(){

    
    const RSS_URL = 'https://ssl.smn.gob.ar/feeds/CAP/avisocortoplazo/rss_acpCAP.xml';


    fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        const items = data.querySelectorAll("item");
        if (items.length > 1){
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
            width=600,height=300,left=100,top=100`;
        
            open("alerta.html", "test", params);
        }else{
            Swal.fire({
                title: 'No hay Alertas!',
                text: 'El SMN no registra Alertas en Argentina',
                icon: 'success',
                confirmButtonText: 'Ok'
              })       
        }
    });   

}

