const router = require('express').Router();
const contactsArray = [];
const path = require('path');
const express = require('express');
router.use(express.static(path.join(__dirname, '../public')));

router.post('/add', async (req, res) => {
    const { fname,lname,address1,address2,city,state,zipcode,phone,email } = req.body;
    contactsArray.push({"fname": fname, "lname": lname, "city": city, "state": state, "zipcode": zipcode, "address1": address1, "address2": address2, "phone": phone, "email":email, "fav":false});
});
  
router.get('/add', (req, res) => {
    res.render('contact-form');
});

router.get('/list', (req, res) => {
    res.render('contact-list', {contactsArray});
});

router.post('/list', (req, res) => {
    contactsArray.splice(req.body.index,1);
    res.render('contact-list', {contactsArray});
});

router.get('/edit', (req, res) => {
    res.render('contact-list', {contactsArray});
});

router.post('/edit', (req, res) => {
    contactsArray[req.body.indexEdit].fname = req.body.fname;
    contactsArray[req.body.indexEdit].lname = req.body.lname;
    contactsArray[req.body.indexEdit].address1 = req.body.address1;
    contactsArray[req.body.indexEdit].address2 = req.body.address2;
    contactsArray[req.body.indexEdit].city = req.body.city;
    contactsArray[req.body.indexEdit].state = req.body.state;
    contactsArray[req.body.indexEdit].zipcode = req.body.zipcode;
    contactsArray[req.body.indexEdit].phone = req.body.phone;
    contactsArray[req.body.indexEdit].email = req.body.email;
    res.render('contact-list', {contactsArray});
});

router.post('/search', (req, res) => {
    const searchArray = [];
    const matchRegExp = new RegExp(req.body.search, 'i');
    for(let i = 0; i < contactsArray.length; i++) {
        if((contactsArray[i].fname.match(matchRegExp)) || (contactsArray[i].lname.match(matchRegExp))) {
            searchArray.push(contactsArray[i]);
        }
    }
    res.render('contact-list', {contactsArray: searchArray});
});

router.post('/favorite',(req, res) => {
    if(contactsArray[`${req.body.id}`].fav === true) {
        contactsArray[`${req.body.id}`].fav = false;
    } else {
        contactsArray[`${req.body.id}`].fav = true;
    }
});

router.get('/favorite',(req, res) => {
    const favArray = [];
    for(let i = 0; i < contactsArray.length; i++) {
        if(contactsArray[i].fav === true) {
            favArray.push(contactsArray[i]);
        }
    }
    res.render('contact-list', {contactsArray: favArray});
});

module.exports = router;