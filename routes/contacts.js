const router = require('express').Router();
const contactsArray = [];
const path = require('path');
const express = require('express');
const pgp = require("pg-promise")();

router.use(express.static(path.join(__dirname, '../public')));
const db = pgp("postgres://postgres:Arako200@localhost:5432/contactbook");

router.post('/add', async (req, res) => {
    const { fname,lname,address1,address2,city,state,zipcode,phone,email } = req.body;
    db.none("INSERT into public.contacts(fname,lname,city,state,zipcode,address1,address2,phone,email,fav) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);", [
        fname,
        lname,
        city,
        state,
        zipcode,
        address1,
        address2,
        phone,
        email,
        false
    ]);
});
  
router.get('/list', (req, res) => {
    db.any("SELECT * from public.contacts;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));
});

router.post('/list', (req, res) => {
    db.none("DELETE from public.contacts where id = $1;", [req.body.index]);
    db.any("SELECT * from public.contacts;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));
});

router.get('/edit', (req, res) => {
    db.any("SELECT * from public.contacts;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));
});

router.post('/edit', (req, res) => {
    db.none("UPDATE public.contacts set fname=$1,lname=$2,address1=$3,address2=$4,city=$5,state=$6,zipcode=$7,phone=$8,email=$9 where id=$10;", [req.body.fname,req.body.lname,req.body.address1,req.body.address2,req.body.city,req.body.state,req.body.zipcode,req.body.phone,req.body.email,req.body.indexEdit]);
    db.any("SELECT * from public.contacts;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));
});

router.post('/search', (req, res) => {
    const searchStr = `%${req.body.search}%`;
    db.any("SELECT * from public.contacts where upper(fname) like upper($1) or upper(lname) like upper($1);", searchStr).then((contacts) => res.render('contact-list', {contactsArray: contacts}));
});

router.post('/favorite',(req, res) => {
    db.any("SELECT fav from public.contacts where id=$1;",[req.body.id]).then((contact) => {
        if(contact[0].fav) {
            db.none("UPDATE public.contacts set fav=false where id = $1;", [req.body.id]);
        } else {
            db.none("UPDATE public.contacts set fav=true where id = $1;", [req.body.id]);
        }
    });
});

router.get('/favorite',(req, res) => {
    db.any("SELECT * from public.contacts where fav=true;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));
});

module.exports = router;