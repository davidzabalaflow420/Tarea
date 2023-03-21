const router = require('express').Router();
const Gallery = require('../models/Gallery');
const Appointment = require('../models/Appointment');

// Get all galleries
router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get gallery by id
router.get('/:id', getGallery, (req, res) => {
  res.json(res.gallery);
});

// Create new gallery
router.post('/', async (req, res) => {
  const gallery = new Gallery({
    title: req.body.title,
    artist: req.body.artist,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const newGallery = await gallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update gallery
router.patch('/:id', getGallery, async (req, res) => {
  if (req.body.title != null) {
    res.gallery.title = req.body.title;
  }

  if (req.body.artist != null) {
    res.gallery.artist = req.body.artist;
  }

  if (req.body.description != null) {
    res.gallery.description = req.body.description;
  }

  if (req.body.image != null) {
    res.gallery.image = req.body.image;
  }

  try {
    const updatedGallery = await res.gallery.save();
    res.json(updatedGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete gallery
router.delete('/:id', getGallery, async (req, res) => {
  try {
    await res.gallery.remove();
    res.json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get gallery by id
async function getGallery(req, res, next) {
  let gallery;

  try {
    gallery = await Gallery.findById(req.params.id);

    if (gallery == null) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.gallery = gallery;
  next();
}

// Create new appointment
router.post('/:id/appointments', getGallery, async (req, res) => {
  const appointment = new Appointment({
    gallery: req.params.id,
    date: req.body.date,
    time: req.body.time,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all appointments for a gallery
router.get('/:id/appointments', getGallery, async (req, res) => {
  try {
    const appointments = await Appointment.find({ gallery: req.params.id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
