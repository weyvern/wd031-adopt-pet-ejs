import express from 'express';
import pets from './helper.js';

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.get('/', (req, res) =>
  res.render('home', {
    petTypes: [
      { type: 'Dogs', emoji: '🐶' },
      { type: 'Cats', emoji: '😺' },
      { type: 'Rabbits', emoji: '🐰' }
    ]
  })
);

app.get('/animals/:pet_type', (req, res) => {
  const petType = req.params.pet_type.toLowerCase();
  const availablePets = pets[petType];

  if (!availablePets)
    return res.render('error', {
      message: `Sorry we don't have ${req.params.pet_type}`
    });

  res.render('animals', { petType, availablePets });
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const availablePets = pets[req.params.pet_type.toLowerCase()];

  if (!availablePets)
    return res.render('error', {
      message: `Sorry we don't have ${req.params.pet_type}`
    });

  const selectedPet = availablePets.find(pet => pet.name === req.params.pet_id);

  if (!selectedPet)
    return res.render('error', {
      message: `Sorry. Either ${req.params.pet_id.toLowerCase()} got adopted or this page does not exist`
    });

  res.render('singlePet', { selectedPet });
});

app.use('*', (req, res) => res.render('error', { message: 'This page does not exist' }));

app.listen(port, () => console.log(`Server running on port ${port}`));
