exports.seed = function (knex, Promise){
    return knex('plots').del()
        .then(function (){
            return knex('plots').insert([
                {
                    plot_id: 100,
                    trip_id:0,
                    time:new Date(),
                    latitude: -123.16058,
                    longitude: 44.26408
                },
                {
                    plot_id: 101,
                    trip_id:1,
                    time:new Date(),
                    latitude: -123.16058,
                    longitude: 44.26408
                },
                {
                    plot_id: 102,
                    trip_id:2,
                    time:new Date(),
                    latitude: -123.16058,
                    longitude: 44.26408
                },
            ])
        })
}