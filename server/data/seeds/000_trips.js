exports.seed = function (knex, Promise){
    return knex('trips').del()
        .then(function(){
            return knex('trips').insert([
                {
                    trip_id:0,
                    start_time:new Date(),
                    end_time:new Date(),
                    device_id:'example'
                },
                {
                    trip_id:1,
                    start_time:new Date(),
                    end_time:new Date(),
                    device_id:'example'
                },
                {
                    trip_id:2,
                    start_time:new Date(),
                    end_time:new Date(),
                    device_id:'example'
                },
            ])
        })
}