const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Contacts - Index
router.get('/', function(req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) {
            return res.json(err);
        }
        res.render('contacts/index', {contacts: contacts});
    });
});

// Contacts - New
router.get('/new', function (req, res) {
    res.render('contacts/new');
});

// Contacts - Create
router.post('/', function (req, res) {
    Contact.create(req.body, function (err, contact) {
        if (err) {
            return res.json(err);
        }
        res.redirect('contacts');
    });
});

// Contacts - Show
router.get('/:id', function (req, res) {
    Contact.findOne({_id: req.params.id}, function (err, contact) {
        if (err) {
            return res.json(err);
        }
        res.render('contacts/show', {contact:contact});
    });
});

// Contacts - Edit
router.get('/:id/edit', function (req, res) {
    Contact.findOne({_id : req.params.id}, function (err, contact) {
        if (err) {
            return res.json(err);
        }
        res.render('contacts/edit', {contact: contact});
    });
});

// Contacts - Update
router.put('/:id', function (req, res) {
    Contact.findOneAndUpdate({_id: req.params.id}, req.body, function (err, contact) {
        if (err) {
            return res.json(err);
        }
        res.redirect('/contacts/' + req.params.id);
    });
});

router.delete('/:id', function (req, res) {
    Contact.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            return res.json(err);
        }
        res.redirect('/contacts');
    });
});

module.exports = router;