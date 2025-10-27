
// users.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory user "database"
const users = [];

// Create a new user
router.post('/', (req, res) => {
  const user = { id: uuidv4(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Update a user by ID
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users[index] = { id: req.params.id, ...req.body };
  res.json(users[index]);
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
