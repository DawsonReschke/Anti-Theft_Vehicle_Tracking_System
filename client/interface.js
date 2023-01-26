// interfaces with the backend creating requests and formatting data to present in the HTML

const API = process.env.API_URL;
const TARGET = 'trip_selector';
const LIST_OF_TRIPS_EXAMPLE = [
           {
               "trip_id": 0,
               "trip_start_time":1674433704046,
               "trip_end_time":1674433714046  
           },
           {
               "trip_id": 1,
               "trip_start_time":1674433804046,
               "trip_end_time":1674433913046  
           },
           {
               "trip_id": 2,
               "trip_start_time":1674434104046,
               "trip_end_time":  1674434733046  
           }
       ]
   

   const TRIP_EXAMPLE = {
            "trip":[
                {
                    "coordinates": [44.26408,-123.16058],
                    "time":1674433704046
                },
                {
                    "coordinates":[44.26793,-123.16486],
                    "time":1674433706046
                },
                {
                    "coordinates":[44.27227,-123.16617],
                    "time":1674433710046
                },
                {
                    "coordinates":[44.27365,-123.15951],
                    "time":1674433714046
                }
            ]
        }

/** 
* Creates an array of HTML Elements that contains the trip date, time, and duration  
*/
const createListElement  = (tripList) => tripList.map((current) =>{
    let startDate = new Date(current.trip_start_time)
    let endDate = new Date(current.trip_end_time)
    
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
    tripInfo.trip.map(({time},index) =>{
        let div = document.createElement('div'); 
        div.setAttribute('title',new Date(time).toLocaleTimeString())
        div.setAttribute('id',"id:"+index);
        div.setAttribute('class','marker')
        div.innerText = 'randomText'
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
        this.trips = LIST_OF_TRIPS_EXAMPLE; 
        this.tripElements = createListElement(this.trips)
        this.showTrips();
        return this.tripElements;
    }
    
    /** 
    * Method to get all of the locations and other info for a given trip 
    */
    async getTripInfo(trip_id){
        // create a get request, store the trip info in currentTrip variable and return
        removeTitledDivs(this.hoverOverDivs); 
        this.currentTrip = TRIP_EXAMPLE;
        console.log(this.hoverOverDivs)
        this.hoverOverDivs = createTitledDivs(this.currentTrip);
        console.log(this.hoverOverDivs)
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