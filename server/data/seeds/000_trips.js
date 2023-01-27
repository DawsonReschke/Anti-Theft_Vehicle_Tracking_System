const trips = require('./trip.json').trips

exports.seed = function (knex, Promise){
    return knex('trips').del()
        .then(function(){
            return knex('trips').insert(trips.map(({start_time,end_time,device_id},trip_id)=>{
                return {
                    trip_id,
                    device_id,
                    start_time:new Date(start_time),
                    end_time: new Date(end_time)
                }
            }))
        })
}