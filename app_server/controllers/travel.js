const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const travelPage = (req, res) => {
  res.render('travel', {
    title: 'Travlr Getaways',
    trips: trips
  });
};

module.exports = {
  travelPage
};