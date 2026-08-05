// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* GET travel page */
const travel = async (req, res) => {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            if (!Array.isArray(json)) {
                res.render('travel', { title: 'Travlr Getaways', trips: [], message: 'API response was not an array' });
            } else if (json.length === 0) {
                res.render('travel', { title: 'Travlr Getaways', trips: [], message: 'No trips found' });
            } else {
                res.render('travel', { title: 'Travlr Getaways', trips: json });
            }
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    travel
};