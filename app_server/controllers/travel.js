const tripsEndPoint = 'http://localhost:3000/api/trips';
const options  = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* Get Travel view*/ 
const travel = async function (req, res, next ) {
    // console.log('TRAVEL CONTROLLER BEGIN');
    await fetch(tripsEndPoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
              message = "API Lookup Error";
              json = [ ];
            } else {
              if (!json.length) {
                message = "No trips exist in our database!";
              }
            }
            res.render('travel', {title: 'Travlr Getaways', trips: json});

        })
        .catch(err => res.status(500).send(e.message));

    
};


module.exports = {
    travel
};