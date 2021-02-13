const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const route = express();
const Image = mongoose.model('images');
const upload = require('../services/upload');

//route POST image/create/
//desc Add  an image
//access Private route
route.post('/create', upload.single('picture'), async (req, res) => {
  try {
    const errors = {};

    if (req.file && req.file.path) {
      const image = new Image({
        picture: req.file.path,
        description: req.body.description,
        title: req.body.title,
      });
      await image.save();
      return res.status(201).json(image);
    } else {
      console.log(req.file);
      errors.invalidImage = 'That is not valid file';
      return res.status(422).json(errors);
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//route GET image/images/
//desc get  all images
//access Public route
route.get('/all_images', async (req, res) => {
  try {
    const errors = {};
    const images = await Image.find({}, '-__v');

    if (!images) {
      errors.noimage = 'No image found!';
      return res.status(404).json(errors);
    }

    return res.status(200).json({ images, msg: 'Image info fetched!' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = route;
