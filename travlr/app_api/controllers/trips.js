const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const q = await Trip.find({}).exec();
    if (!q) {
      return res
        .status(404)
        .json({ message: 'trips not found' });
    } else {
      return res
        .status(200)
        .json(q);
    }
  } catch (err) {
    return res
      .status(404)
      .json(err);
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const q = await Trip.find({ code: req.params.tripCode }).exec();
    if (!q) {
      return res
        .status(404)
        .json({ message: 'trip not found' });
    } else {
      return res
        .status(200)
        .json(q);
    }
  } catch (err) {
    return res
      .status(404)
      .json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};