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

const tripsAddTrip = async (req, res) => {
  try {
    const q = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });
    return res
      .status(201)
      .json(q);
  } catch (err) {
    return res
      .status(500)
      .json(err);
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    const q = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true }
    ).exec();

    if (!q) {
      return res
        .status(400)
        .json({ message: 'trip not found' });
    } else {
      return res
        .status(201)
        .json(q);
    }
  } catch (err) {
    return res
      .status(500)
      .json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};