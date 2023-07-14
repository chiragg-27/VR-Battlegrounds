const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');

const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i = 0 ; i<50 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '64875ad1684fc004d0bc357c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt fuga id aliquid beatae dolores eius accusantium laudantium voluptates nulla quia dolor aut facere, nam corporis debitis, delectus corrupti labore in.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude , cities[random1000].latitude]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/dxq1sqhun/image/upload/v1686993510/YelpCamp/cjxbkt9mdtikzvhqwkbw.jpg',
                    filename: 'YelpCamp/cjxbkt9mdtikzvhqwkbw'
                },
                {
                    url: 'https://res.cloudinary.com/dxq1sqhun/image/upload/v1686993509/YelpCamp/rievk2ie8hwmpqrocbkk.jpg',
                    filename: 'YelpCamp/rievk2ie8hwmpqrocbkk'
                },
                {
                    url: 'https://res.cloudinary.com/dxq1sqhun/image/upload/v1686993510/YelpCamp/dqqcqrs002g3mbzt7ddk.jpg',
                    filename: 'YelpCamp/dqqcqrs002g3mbzt7ddk'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})