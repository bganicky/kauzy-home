/* global google */
require('smoothscroll-polyfill').polyfill()
import './index.css'

/** Parses a Degrees Minutes Seconds string into a Decimal Degrees number.
 * @param {string} dmsStr A string containing a coordinate in either DMS or DD format.
 * @return {Number} If dmsStr is a valid coordinate string, the value in decimal degrees will be returned. Otherwise NaN will be returned.
 */
let dmsRe = /^(-?\d+(?:\.\d+)?)[°:d]?\s?(?:(\d+(?:\.\d+)?)['′ʹ:]?\s?(?:(\d+(?:\.\d+)?)["″ʺ]?)?)?\s?([NSEW])?/i
function parseDms(dmsStr) {
  let output = NaN
  let dmsMatch = dmsRe.exec(dmsStr)
  if (dmsMatch) {
    let degrees = Number(dmsMatch[1])
    let minutes = typeof dmsMatch[2] !== 'undefined' ? Number(dmsMatch[2]) / 60 : 0
    let seconds = typeof dmsMatch[3] !== 'undefined' ? Number(dmsMatch[3]) / 3600 : 0
    let hemisphere = dmsMatch[4] || null
    if (hemisphere !== null && /[SW]/i.test(hemisphere)) {
      degrees = Math.abs(degrees) * -1
    }
    if (degrees < 0) {
      output = degrees - minutes - seconds
    } else {
      output = degrees + minutes + seconds
    }
  }
  return output
}

let data = [
  {
    name: `Rezidenční projekt Jeseniova 38`,
    description: `Novostavba bytového domu na místě bývalých studií a zázemí Českého rozhlasu. Stavba
má mít 8 podlaží se 181 byty a 227 parkovacími místy.`,
    url: `http://zizkovnezastavis.cz/kauzy/rezidencni-projekt-jeseniova-38/`,
    latDms: `50°05'09.0"N`,
    lngDms: `14°27'35.2"E`
  },
  {
    name: `Rezidenční park Na Vackově, 5. etapa`,
    description: `Projekt je součástí postupné zástavby oblasti Vackova. Investor Metrostav Development
a.s. hodlá v páté etapě této zástavby umístit k jižní části svahu i parku Židovské pece
11 bytových domů o 4-7 podlažích s celkovou kapacitou 298 bytů.`,
    url: `http://zizkovnezastavis.cz/kauzy/rezidencni-park-na-vackove-5-etapa/`,
    latDms: `50°05'19.8"N`,
    lngDms: `14°28'48.1"E`
  },
  {
    name: `Rezidenční obytný soubor Na Vackově – zóna A1`,
    description: `Šestá, nejmohutnější etapa chystané zástavby oblasti Vackova aneb Metrostav si to největší nechává na konec. Jedná se o soubor domů o 6-11 podlažích v bezprostřední blízkosti jižní asfaltové cesty parku Židovské pece.`,
    url: `http://zizkovnezastavis.cz/kauzy/rezidencni-obytny-soubor-na-vackove-zona-a-i/`,
    latDms: `50°05'16.8"N`,
    lngDms: `14°28'42.9"E`
  },
  {
    name: `Rezidence Parková čtvrť`,
    description: `Severní část areálu Nákladového nádraží je od roku 2016 ve vlastnictví Central Group. První etapa záměru stavby nové rezidenční čtvrti sestává z 5 bloků převážně bytových domů s otevřenými avšak pro veřejnost neprůchozími vnitrobloky. Výšková hladina záměru je max. 12 nadzemních podlaží. Součástí záměru je také stavba mateřské školy.`,
    url: `http://zizkovnezastavis.cz/kauzy/nakladove-nadrazi-zizkov-sever/`,
    latDms: `50°05'10.4"N`,
    lngDms: `14°28'20.3"E`
  },
  {
    name: `Žižkov City – revitalizace nákladového nádraží Praha – Žižkov`,
    description: `Investor Žižkov Station Development a.s. chystá rozvoj území pro cca 10 tisíc obyvatel, spolu s vybudováním zařízení občanské vybavenosti a nového parku. Záměr rovněž počítá s konverzí kulturní památky NNŽ na kulturně-vzdělávací centrum.`,
    url: `http://zizkovnezastavis.cz/kauzy/zizkov-city-revitalizace-nakladoveho-nadrazi-praha-zizkov/`,
    latDms: `50°05'06.7"N`,
    lngDms: `14°28'37.3"E`
  },
  {
    name: `Panorama Pražačka – bytový dům Na Krejcárku`,
    description: `Stavba pětipodlažního terasového domu s 26 byty právě probíhá.`,
    url: `http://zizkovnezastavis.cz/kauzy/panorama-prazacka-bytovy-dum-na-krejcarku/`,
    latDms: `50°05'38.3"N`,
    lngDms: `14°28'40.4"E`
  },
  {
    name: `Viktoria Žižkov Center`,
    description: `Polyfunkční soubor 5-7 podlažních domů, který kombinuje administrativu, služby a byty (176 bytů).`,
    url: `http://zizkovnezastavis.cz/kauzy/viktoria-zizkov-center/`,
    latDms: `50°05'03.8"N`,
    lngDms: `14°26'45.8"E`
  },
  {
    name: `Rezidenční komplex Ohrada`,
    description: `Studie z roku 2001 navrhuje osmipodlažní převážně bytový dům.`,
    url: `http://zizkovnezastavis.cz/kauzy/rezidencni-komplex-ohrada/`,
    latDms: `50°05'26.2"N`,
    lngDms: `14°28'01.0"E`
  },
  {
    name: `Bytové domy u Zásobní zahrady`,
    description: `Kvalitní architektonický návrh šestipodlažních bytových domů, který odkazuje na tradiční blokovou zástavbu s uzavřeným vnitroblokem.`,
    url: `http://zizkovnezastavis.cz/kauzy/bytove-domy-u-zasobni-zahrady/`,
    latDms: `50°05'04.2"N`,
    lngDms: `14°27'52.6"E`
  },
  {
    name: `Bytový dům Koněvova-Roháčova–Budovcova-Kaplířova`,
    description: `Kvalitní architektonický návrh šestipodlažních bytových domů, který odkazuje na tradiční blokovou zástavbu s uzavřeným vnitroblokem.`,
    url: `http://zizkovnezastavis.cz/kauzy/bytovy-dum-konevova-rohacova-budovcova-kaplirova/`,
    latDms: `50°05'16.5"N`,
    lngDms: `14°27'29.7"E`
  },
  {
    name: `Dům sociálních služeb Praha 3`,
    description: `Podoba domu zatím není známá. MČ Praha 3 oslovila v říjnu 2010 tři architektonické ateliéry, aby zpracovaly návrh řešení. Možným podobám objektu se věnovali v rámci semestrálních prací v roce 2016 studenti Fakulty architektury ČVUT.`,
    url: `http://zizkovnezastavis.cz/kauzy/dum-socialnich-sluzeb-praha-3/`,
    latDms: `50°05'40.8"N`,
    lngDms: `14°29'27.3"E`
  },
  {
    name: `Churchill Square`,
    description: `Projekt zahrnuje obytný komplex, hotel a kancelářské centrum. Rezidence Riegrovy sady bude sestávat ze 151 bytů od garsonek o 30m2 po čtyřpokojové rodinné jednotky o velikosti více než 150m2 v celkem pěti objektech. Hotel má mít kapacitu přibližně 215 pokojů. Na kanceláře potom připadá 27 tisíc čtverečních metrů ploch, na maloobchod 3.000 m2. Souhrnem má Churchill Square nabídnout 600 parkovacích míst. Mezi náměstím Winstona Churchilla a hlavním nádražím má vzniknout další malé průchozí náměstí.`,
    url: `http://zizkovnezastavis.cz/kauzy/churchill-square/`,
    latDms: `50°05'02.1"N`,
    lngDms: `14°26'21.9"E`
  },
  {
    name: `Zástavba parku pod ulicí Kunešova`,
    description: `Park pod ulicí Kunešova je v platném územním plánu zařazen mezi přírodní lesní pozemky spadající do tzv. celoměstského systému zeleně a mezi nezastavitelné plochy pro oddech. Podle návrhu Metropolitního územního plánu by se pozemky měly přičlenit do zastavitelné lokality Balkán s převážně obytným charakterem zástavby. Návrh Metropolitního územního plánu může být ještě před oficiálním projednáním podle zákona upraven. MČ Praha 3 v současnosti nemá jasné stanovisko, zda pozemky nechat nadále nezastavitelné. S cílem zabránit zástavbě zeleně vznikl Spolek pro ochranu zeleně Na Krejcárku, Pražačce a Na Balkáně, který na jaře 2017 proti zástavbě nasbíral přes 1,5 tis. podpisů místních obyvatel.`,
    url: `http://zizkovnezastavis.cz/kauzy/zastavba-parku-pod-ulici-kunesova/`,
    latDms: `50°05'40.1"N`,
    lngDms: `14°28'49.5"E`
  },
  {
    name: `Obytný soubor Červený dvůr – Tulipa Třebešín`,
    description: `Záměr se skládá z celkem 12 objektů pro bydlení (6 bytových domů a 5 viladomů), administrativní budovy při ulici K Červenému Dvoru, budovy malého supermarketu a objektu mateřské školy. V rámci záměru bude vybudována nová T křižovatka a vjezd z ulice U Červeného Dvora (od původní okružní křižovatky se upustilo).`,
    url: `http://zizkovnezastavis.cz/kauzy/obytny-soubor-cerveny-dvur-tulipa-trebesin/`,
    latDms: `50°05'04.4"N`,
    lngDms: `14°29'03.3"E`
  },
  {
    name: `Vítkovia II – Polyfunkční dům`,
    description: `Zástavba proluky na Husitské ulici polyfunkčním domem. Navrhovaný objekt má dvě suterénní podlaží a šest nadzemních podlaží. V suterénu je umístěno parkoviště pro 36 aut s vjezdem z ulice Pod Vítkovem. V přízemí se nachází obchodní prostor, v 2. až 5. podlaží kanceláře a 6. podlaží je navrženo pro 6 bytových jednotek.`,
    url: `http://zizkovnezastavis.cz/kauzy/vitkovia-ii-polyfunkcni-dum/`,
    latDms: `50°05'14.4"N`,
    lngDms: `14°27'04.6"E`
  },
  {
    name: `Zástavba proluky Pernerova`,
    description: `Pozemek je v současném územním plánu zařazen mezi nezastavitelné drážní pozemky. Vlastník pan Richard Sobotka požádal v prosinci 2016 o změnu územního plánu na plochy pro bytovou výstavbu (OV). Žádost je doplněna hmotovou studií, podle které má na pozemku vzniknout komplex budov, převážně bytových domů, součástí záměru však má být hotel i administrativa a doplňkové služby. V pokračování Peckovy ulice má být vytvořen menší dvouúrovňový veřejný prostor.`,
    url: `http://zizkovnezastavis.cz/kauzy/zastavba-proluky-pernerova/`,
    latDms: `50°05'22.9"N`,
    lngDms: `14°26'52.9"E`
  },
  {
    name: `Bytový dům Pod Vítkovem`,
    description: `Pětipodlažní bytový dům má vzniknout v ulici Pod Vítkovem přímo u pěší a cyklo stezky na bývalé železniční trati. Bývalý vlastník Pražské služby a.s. využívaly pozemek jako odstavné parkoviště, v roce 2014 ho prodaly slovenskému developerovi a architektu Peteru Vavricovi. Ten chystá zástavbu proluky i naproti přes ulici.`,
    url: `http://zizkovnezastavis.cz/kauzy/bytovy-dum-pod-vitkovem/`,
    latDms: `50°05'14.8"N`,
    lngDms: `14°27'03.2"E`
  },
  {
    name: `Obytný soubor Na Vackove, zóna A2 / etapa 08`,
    description: `Projekt je poslední osmou etapou zástavby lokality na Vackově. Projekt počítá s výstavbou 4 samostatných objektů na částečně společné podnoži. Objekty mají zahrnovat 235 bytových jednotek, 7 ateliérů, 12 nebytových prostor v parteru a dvoutřídní mateřskou školku v přízemí objektu D. Ve stavbě by mělo najít nový domov 570 obyvatel.`,
    url: `http://zizkovnezastavis.cz/kauzy/obytny-soubor-na-vackove-zona-a2-etapa-08/`,
    latDms: `50°05'16.4"N`,
    lngDms: `14°28'48.5"E`
  },
  {
    name: `Obytná čtvrť Jarov`,
    description: `Nejnovější urbanistická koncepce představená v lednu 2017 počítá s přeměnou ulice Na Jarově v lokální městskou třídu. K této ulici proto navrhuje smíšené využití s obchody, službami a lokálním městským centrem – malým náměstím. Profil ulice je zde rozšířený tak, aby chodníky mohly mít šířku alespoň 6 metrů umožňujících umístění stromořadí. Při ulici na Jarově je navržena kompaktní klasická zástavba s pevnou uliční čarou, východ území charakterizuje rozvolněnější zástavba odpovídající spíše charakteru Jarova. Základní výšková hladina je uvažována na hladině 6-7 podlaží, předpokládají se však i výškové dominanty odpovídající výšce sousedních panelových domů.`,
    url: `http://zizkovnezastavis.cz/kauzy/obytna-ctvrt-jarov/`,
    latDms: `50°05'20.6"N`,
    lngDms: `14°29'27.4"E`
  },
  {
    name: `Trojlístek`,
    description: `Novostavba bytového komplexu je v současnosti uvažována ve dvou variantách. V první variantě je komponován ze tří věží o výšce 17, 22 a 30 nadzemních podlaží (odtud Trojlístek), ve druhé variantě návrh uvažuje s umístěním čtyř samostatně stojících domů o 10 a 14 nadzemních podlažích. Kapacita záměru je cca 220 bytů a 300 parkovacích stání. Doplňující funkcí mají být pouze drobné obchodní plochy.`,
    url: `http://zizkovnezastavis.cz/kauzy/trojlistek/`,
    latDms: `50°05'38.3"N`,
    lngDms: `14°29'53.6"E`
  },
  {
    name: `Nové žižkovské schody - polyfunkční dům`,
    description: `Nový polyfunkční dům (obchod, administrativa, bydlení) má vzniknout na pozemcích, které přímo přiléhají ke stávajícímu tělesu lávky přes Husitskou ulici (původně most železniční tratě). Na úrovni cyklostezky má být v domě umístěno občerstvení. Novostavba má mít 6 nadzemních podlaží a jedno podzemní, přičemž 2 podlaží vystupují na úroveň lávky. Podmínkou pro stavbu je změna územního plánu - rozšíření plochy SV. Městská část Praha 3 vydala v roce 2017 souhlas s touto změnou územního plánu.`,
    url: `http://zizkovnezastavis.cz/kauzy/nove-zizkovske-schody-polyfunkcni-dum/`,
    latDms: `50°05'12.8"N`,
    lngDms: `14°26'40.7"E`
  },
  {
    name: `Polyfunkční dům Pitterova`,
    description: `Šestipodlažní polyfunkční dům v ulici Pitterova je umístěn na plochu označenou v územním plánu Prahy jako SV (všeobecně smíšené). V navrhovaném domě převládá bytová funkce doplněná o restauraci / kavárnu v přízemí.`,
    url: `http://zizkovnezastavis.cz/kauzy/polyfunkcni-dum-pitterova/`,
    latDms: `50°05'02.8"N`,
    lngDms: `14°27'54.5"E`
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
geocoder.geocode({ address: 'Praha 3, Czech Republic' }, (results, status) => {
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
arrow.addEventListener('click', ev => {
  document.getElementById('map').scrollIntoView({ behavior: 'smooth' })
  ev.preventDefault()
})
