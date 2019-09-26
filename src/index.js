/* global google */
import projects from './kauzy.json'
import './index.css'
require('smoothscroll-polyfill').polyfill()

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

const data = projects.map(place => ({
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
