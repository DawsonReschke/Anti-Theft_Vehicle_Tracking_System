// interfaces with the backend creating requests and formatting data to present in the HTML
const GET_EXAMPLE_TRIPS = '/api/journey/example_1';
const GET_TRIP = '/api/waypoint/';
const TARGET = 'trip_selector';

/** 
* Creates an array of HTML Elements that contains the trip date, time, and duration  
*/
const createListElement  = (tripList) => tripList.map((current) =>{
    let startDate = new Date(current.start_time)
    let endDate = new Date(current.end_time)
    
    let list = document.createElement('li')
    list.setAttribute('id',current.trip_id)
    list.innerText =`
        Date: ${startDate.toLocaleDateString()}
        Time: ${startDate.toLocaleTimeString()}
        Duration: ${Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60)} minutes   
    ` 
    return list;  
})


/** 
* Creates empty divs with id of the trip coordinate id (index) exact id = `id:index` and the localeTimeStr as the title 
* accepts Data like in the `TRIP_EXAMPLE`
*
* Used for hover over effect. The title is the text displayed.
* This data is stored in the hoverOverDivs var
*/
const createTitledDivs = (tripInfo) => 
    tripInfo.locations.map(({time},index) =>{
        let div = document.createElement('div'); 
        div.setAttribute('title',new Date(time).toLocaleTimeString())
        div.setAttribute('id','id:'+index);
        div.setAttribute('class','marker')
        div.innerText = index+1
        return div;  
    })

const removeTitledDivs = (titledDivs) => titledDivs.forEach(div => div.remove()); 

/** 
* @class TripGetter
* This class is responsible for making requests to the backend to get information 
* regarding GPS tracked trips
*/
class TripGetter {
    trips = []; 
    currentTrip = {}; 
    tripElements = []; 
    hoverOverDivs = []; 
    constructor(){}
    
    /** 
    * Method responsible for getting the list of trip ids and other important trip info
    * this method should be called once at load.  
    */
    
    async getTrips(){
        // create a get request, store the response in trips variable and return
        // this.trips = LIST_OF_TRIPS_EXAMPLE; 
        let response = await fetch(GET_EXAMPLE_TRIPS);
        let data = await response.json();
        this.tripElements = createListElement(data.trips)
        this.showTrips();
        return this.tripElements;
    }
    
    /** 
    * Method to get all of the locations and other info for a given trip 
    */
    async getTripInfo(trip_id){
        // create a get request, store the trip info in currentTrip variable and return
        removeTitledDivs(this.hoverOverDivs);
        let response = await fetch(GET_TRIP+trip_id);
        let data = await response.json();
        this.currentTrip = data;
        this.hoverOverDivs = createTitledDivs(this.currentTrip);
        this.hoverOverDivs.forEach(div => document.getElementsByTagName('body')[0].appendChild(div)); 
        return this.currentTrip; 
    }

    /** 
    * After obtaining a list of trips draw them to the screen in list format.  
    */
    showTrips(){
        this.tripElements.forEach((val) => document.getElementById(TARGET).appendChild(val))
    }
}

export {TripGetter}; 