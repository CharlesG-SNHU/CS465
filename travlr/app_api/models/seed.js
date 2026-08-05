const mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Run the seeding, then close the connection
seedDB().then(async () => {
    await mongoose.connection.close();
    console.log('Database seeded and connection closed');
    process.exit(0);
});