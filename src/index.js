/* global google */
require('smoothscroll-polyfill').polyfill()
import './index.css'

/** Parses a Degrees Minutes Seconds string into a Decimal Degrees number.
 * @param {string} dmsStr A string containing a coordinate in either DMS or DD format.
 * @return {Number} If dmsStr is a valid coordinate string, the value in decimal degrees will be returned. Otherwise NaN will be returned.
 */
let dmsRe = /^(-?\d+(?:\.\d+)?)[°:d]?\s?(?:(\d+(?:\.\d+)?)['′ʹ:]?\s?(?:(\d+(?:\.\d+)?)["″ʺ]?)?)?\s?([NSEW])?/i;
function parseDms(dmsStr) {
  let output = NaN;
  let dmsMatch = dmsRe.exec(dmsStr);
  if (dmsMatch) {
    let degrees = Number(dmsMatch[1]);
    let minutes = typeof dmsMatch[2] !== "undefined" ? Number(dmsMatch[2]) / 60 : 0;
    let seconds = typeof dmsMatch[3] !== "undefined" ? Number(dmsMatch[3]) / 3600 : 0;
    let hemisphere = dmsMatch[4] || null;
    if (hemisphere !== null && /[SW]/i.test(hemisphere)) {
      degrees = Math.abs(degrees) * -1;
    }
    if (degrees < 0) {
      output = degrees - minutes - seconds;
    } else {
      output = degrees + minutes + seconds;
    }
  }
  return output;
}

let data = [
  {
    name: `Rezidenční projekt Jeseniova 38`,
    description: `Novostavba bytového domu na místě bývalých studií a zázemí Českého rozhlasu. Stavba
má mít 8 podlaží se 181 byty a 227 parkovacími místy.`,
    url: `http://zizkovnezastavis.cz/kauzy/rezidencni-projekt-jeseniova-38/`,
    latDms: `50°05'09.0"N`,
    lngDms: `14°27'35.2"E`
  }, {
    name: `Rezidenční park Na Vackově, 5. etapa`,
    description: `Projekt je součástí postupné zástavby oblasti Vackova. Investor Metrostav Development
a.s. hodlá v páté etapě této zástavby umístit k jižní části svahu i parku Židovské pece
11 bytových domů o 4-7 podlažích s celkovou kapacitou 298 bytů.`,
    url: `http://zizkovnezastavis.cz/kauzy/rezidencni-park-na-vackove-5-etapa/`,
    latDms: `50°05'19.8"N`,
    lngDms: `14°28'48.1"E`
  }, {
    name: `Rezidenční obytný soubor Na Vackově – zóna A1`,
    description: `Šestá, nejmohutnější etapa chystané zástavby oblasti Vackova aneb Metrostav si to největší nechává na konec. Jedná se o soubor domů o 6-11 podlažích v bezprostřední blízkosti jižní asfaltové cesty parku Židovské pece.`,
    url: `http://zizkovnezastavis.cz/kauzy/rezidencni-obytny-soubor-na-vackove-zona-a-i/`,
    latDms: `50°05'16.8"N`,
    lngDms: `14°28'42.9"E`
  }, {
    name: `Nákladové nádraží Žižkov, sever`,
    description: `Dominantou záměru je rozsáhlé obchodní centrum, které je svou rozlohou 36 860 m 2 srovnatelné např. s OC Palladium na Náměstí Republiky. Záměr doplňují 4 administrativní budovy o výšce 8-14 nadzemních podlaží, hotel na Basilejském náměstí s kapacitou 151 pokojů a dva bytové domy při Malešické ulici. V létě
2016 koupil projekt Central Group, který deklaroval, že místo obchodního centra a administrativy bude stavět byty.`,
    url: `http://zizkovnezastavis.cz/kauzy/nakladove-nadrazi-zizkov-sever/`,
    latDms: `50°05'10.4"N`,
    lngDms: `14°28'20.3"E`
  }, {
    name: `Žižkov City – revitalizace nákladového nádraží Praha – Žižkov`,
    description: `Investor Žižkov Station Development a.s. chystá rozvoj území pro cca 10 tisíc obyvatel, spolu s vybudováním zařízení občanské vybavenosti a nového parku. Záměr rovněž počítá s konverzí kulturní památky NNŽ na kulturně-vzdělávací centrum.`,
    url: `http://zizkovnezastavis.cz/kauzy/zizkov-city-revitalizace-nakladoveho-nadrazi-praha-zizkov/`,
    latDms: `50°05'06.7"N`,
    lngDms: `14°28'37.3"E`
  }, {
    name: `Panorama Pražačka – bytový dům Na Krejcárku`,
    description: `Stavba pětipodlažního terasového domu s 26 byty právě probíhá.`,
    url: `http://zizkovnezastavis.cz/kauzy/panorama-prazacka-bytovy-dum-na-krejcarku/`,
    latDms: `50°05'38.3"N`,
    lngDms: `14°28'40.4"E`
  }, {
    name: `Viktoria Žižkov Center`,
    description: `Polyfunkční soubor 5-7 podlažních domů, který kombinuje administrativu, služby a byty (176 bytů).`,
    url: `http://zizkovnezastavis.cz/kauzy/viktoria-zizkov-center/`,
    latDms: `50°05'03.8"N`,
    lngDms: `14°26'45.8"E`
  }, {
    name: `Rezidenční komplex Ohrada`,
    description: `Studie z roku 2001 navrhuje osmipodlažní převážně bytový dům.`,
    url: `http://zizkovnezastavis.cz/kauzy/rezidencni-komplex-ohrada/`,
    latDms: `50°05'26.2"N`,
    lngDms: `14°28'01.0"E`
  }, {
    name: `Bytové domy u Zásobní zahrady`,
    description: `Kvalitní architektonický návrh šestipodlažních bytových domů, který odkazuje na tradiční blokovou zástavbu s uzavřeným vnitroblokem.`,
    url: `http://zizkovnezastavis.cz/kauzy/bytove-domy-u-zasobni-zahrady/`,
    latDms: `50°05'04.2"N`,
    lngDms: `14°27'52.6"E`
  }, {
    name: `Bytový dům Koněvova-Roháčova–Budovcova-Kaplířova`,
    description: `Kvalitní architektonický návrh šestipodlažních bytových domů, který odkazuje na tradiční blokovou zástavbu s uzavřeným vnitroblokem.`,
    url: `http://zizkovnezastavis.cz/kauzy/bytovy-dum-konevova-rohacova-budovcova-kaplirova/`,
    latDms: `50°05'16.5"N`,
    lngDms: `14°27'29.7"E`
  }, {
    name: `Dům sociálních služeb Praha 3`,
    description: `Podoba domu zatím není známá. MČ Praha 3 oslovila v říjnu 2010 tři architektonické ateliéry, aby zpracovaly návrh řešení. Možným podobám objektu se věnovali v rámci semestrálních prací v roce 2016 studenti Fakulty architektury ČVUT.`,
    url: `http://zizkovnezastavis.cz/kauzy/dum-socialnich-sluzeb-praha-3/`,
    latDms: `50°05'40.8"N`,
    lngDms: `14°29'27.3"E`
  }, {
    name: `Churchill Square`,
    description: `Projekt zahrnuje obytný komplex, hotel a kancelářské centrum. Rezidence Riegrovy sady bude sestávat ze 151 bytů od garsonek o 30m2 po čtyřpokojové rodinné jednotky o velikosti více než 150m2 v celkem pěti objektech. Hotel má mít kapacitu přibližně 215 pokojů. Na kanceláře potom připadá 27 tisíc čtverečních metrů ploch, na maloobchod 3.000 m2. Souhrnem má Churchill Square nabídnout 600 parkovacích míst. Mezi náměstím Winstona Churchilla a hlavním nádražím má vzniknout další malé průchozí náměstí.`,
    url: `http://zizkovnezastavis.cz/kauzy/churchill-square/`,
    latDms: `50°05'02.1"N`,
    lngDms: `14°26'21.9"E`
  }
]
data = data.map(place => ({
  ...place,
  lat: parseDms(place.latDms),
  lng: parseDms(place.lngDms)
}))

// Init map.
const map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: -34.397,
    lng: 150.644
  },
  zoom: 8,
  scrollwheel: false
})

// Geocoder.
const geocoder = new google.maps.Geocoder()
geocoder.geocode({ 'address': 'Praha 3, Czech Republic' }, (results, status) => {
  if (status === 'OK') {
    map.setCenter(results[0].geometry.location)
    map.fitBounds(results[0].geometry.bounds)
  } else {
    console.error('Geocode was not successful for the following reason: ' + status)
  }
})

// Render points.
let markers = []
let infoWindows = []
// Close infowindows on map click.
const closeInfoWindows = () => {
  for (let infoWindow of infoWindows) {
    infoWindow.close()
  }
}
data.forEach(item => {
  const latlng = new google.maps.LatLng(item.lat, item.lng)
  const infoContent = `<div class='info-window'>
    <h2>${item.name}</h2>
    <p>${item.description}</p>
    <p><a href="${item.url}" class="btn">Detail kauzy</a></p>
  </div>`

  const marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: item.name
  })
  const infoWindow = new google.maps.InfoWindow({
    content: infoContent
  })

  marker.addListener('click', () => {
    closeInfoWindows()
    infoWindow.open(map, marker)
  })

  markers.push(marker)
  infoWindows.push(infoWindow)
})

const fitBoundsToMarkers = markers => {
  let bounds = new google.maps.LatLngBounds()

  for (let marker of markers) {
    bounds.extend(marker.getPosition())
  }

  map.fitBounds(bounds)
}
fitBoundsToMarkers(markers)

// On map focus, turn on mousewheel.
let firstClickListener = map.addListener('click', () => {
  map.setOptions({
    scrollwheel: true
  })
  firstClickListener.remove()
})


// Map link.
const arrow = document.getElementById('maplink')
arrow.addEventListener('click', (ev) => {
  document.getElementById('map').scrollIntoView({ behavior: 'smooth' })
  ev.preventDefault()
})
