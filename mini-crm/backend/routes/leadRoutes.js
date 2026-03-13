const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/leads
// @desc    Get all leads
// @access  Private
router.get('/', auth, leadController.getLeads);

// @route   POST api/leads
// @desc    Add new lead
// @access  Private
router.post('/', auth, leadController.addLead);

// @route   PUT api/leads/:id
// @desc    Update a lead
// @access  Private
router.put('/:id', auth, leadController.updateLead);

// @route   DELETE api/leads/:id
// @desc    Delete a lead
// @access  Private
router.delete('/:id', auth, leadController.deleteLead);

// @route   POST api/leads/:id/notes
// @desc    Add a note to a lead
// @access  Private
router.post('/:id/notes', auth, leadController.addNote);

module.exports = router;
