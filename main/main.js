const home = [-123.16058,44.26408]
import './style.css';
import {Feature, Map, View} from 'ol';
import Overlay from 'ol/Overlay.js';
import * as olProj from 'ol/proj';
import OSM from 'ol/source/OSM';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import VectorSource from 'ol/source/Vector';
import {Circle, Point} from 'ol/geom.js';
import { TripGetter } from './interface';

const VSource = new VectorSource({features:[]})
const VLayer = new VectorLayer({source:VSource})

const TGetter = new TripGetter(); 

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    VLayer,
  ],
  view: new View({
    center: olProj.fromLonLat(home),
    zoom: 3
  })
});


/** 
* Removes all overlays from the map (the hoverover markers) 
*/
function removeOverlays(){
  map.getOverlays().clear()
}

function createOverLay(coordinates, index){
  console.log(coordinates,index)
  map.addOverlay(new Overlay({
    position:olProj.fromLonLat([...coordinates].reverse()),
    positioning:'center-center',
    element:document.getElementById('id:'+index),
    stopEvent:false,
  }))
}

let currentTrip = {}; 
let tripElements = await TGetter.getTrips();
tripElements.forEach(async (current) => current.addEventListener('click',async ()=>{
  VSource.clear(); 
  removeOverlays(); 
  currentTrip = await TGetter.getTripInfo(current.getAttribute('id'))
  currentTrip.trip.forEach((current,index) => createOverLay(current.coordinates,index))
  let features = createPointArray(currentTrip.trip); 
  VSource.addFeatures(features); 
}))

// const home = [44.26408,-123.16058]

// converts [lon,lat](EPSG:4326){GPS coord} -> (EPSG:3857){ what maps like Google Maps or OpenLayers use }
const getLonLat = (coord) => olProj.transform(coord,'EPSG:4326', 'EPSG:3857');

const createPoint = (coord) => new Feature({geometry:new Point(getLonLat(coord))})

/** 
* function accepts an array of trip info {lat:num,long:num,time:num} 
* returns an array of Point Features
*/
function createPointArray(tripCoordinates){
  return tripCoordinates.map(current => createPoint([...current.coordinates].reverse()))
}
