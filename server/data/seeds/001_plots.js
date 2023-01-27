const trips = require('./trip.json').trips

let allTrips = []
trips.forEach(({trip,trip_id})=>{
    allTrips = allTrips.concat(trip.map(({coordinates,time})=>{
        return{
            trip_id,
            time:new Date(time),
            latitude:coordinates[0],
            longitude:coordinates[1],
        }
    }))
})

exports.seed = function (knex, Promise){
    return knex('plots').del()
        .then(function (){
            return knex('plots').insert(allTrips);
        })
}
