const router = require('express').Router();
const path = require('path');
const express = require('express');
const pgp = require("pg-promise")();
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const models = require(`${__dirname}\\..\\models`);
const Contact = models.contact;
Contact.schema('public');

router.use(express.static(path.join(__dirname, '../public')));
const db = pgp("postgres://postgres:Arako200@localhost:5432/contactbook");


router.post('/add', async (req, res) => {
    /*const { fname,lname,address1,address2,city,state,zipcode,phone,email } = req.body;
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
    ]);*/
    await Contact.create({fname:req.body.fname, lname: req.body.lname, city:req.body.city, state:req.body.state, zipcode:req.body.zipcode, address1:req.body.address1, address2:req.body.address2, phone:req.body.phone, email:req.body.email, fav:false});
});
  
router.get('/list', async (req, res) => {
    //db.any("SELECT * from public.contacts;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));
    const contact = await Contact.findAll();
    res.render('contact-list', {contactsArray: contact});
});

router.post('/list', async (req, res) => {
    /*db.none("DELETE from public.contacts where id = $1;", [req.body.index]);
    db.any("SELECT * from public.contacts;").then((contacts) => res.render('contact-list', {contactsArray: contacts})); */
    await Contact.destroy({
        where: {
          id: req.body.index
        }
      });
    const contact = await Contact.findAll();
    res.render('contact-list', {contactsArray: contact});
});

router.get('/edit', async (req, res) => {
    //db.any("SELECT * from public.contacts;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));
    const contact = await Contact.findAll();
    res.render('contact-list', {contactsArray: contact});
});

router.post('/edit', async (req, res) => {
    /*db.none("UPDATE public.contacts set fname=$1,lname=$2,address1=$3,address2=$4,city=$5,state=$6,zipcode=$7,phone=$8,email=$9 where id=$10;", [req.body.fname,req.body.lname,req.body.address1,req.body.address2,req.body.city,req.body.state,req.body.zipcode,req.body.phone,req.body.email,req.body.indexEdit]);
    db.any("SELECT * from public.contacts;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));*/
    await Contact.update({fname:req.body.fname, lname: req.body.lname, city:req.body.city, state:req.body.state, zipcode:req.body.zipcode, address1:req.body.address1, address2:req.body.address2, phone:req.body.phone, email:req.body.email}, {
        where: {
          id: req.body.indexEdit
        }
      });
    const contact = await Contact.findAll();
    res.render('contact-list', {contactsArray: contact});
});

router.post('/search', async (req, res) => {
    const searchStr = `%${req.body.search}%`;
    //db.any("SELECT * from public.contacts where upper(fname) like upper($1) or upper(lname) like upper($1);", searchStr).then((contacts) => res.render('contact-list', {contactsArray: contacts}));
    const contact = await Contact.findAll({
        where: {
          [Op.or]: {
            fname: {
                [Op.like]: searchStr
              },
            lname: {
                [Op.like]: searchStr
              } 
          }
        }
    });
    res.render('contact-list', {contactsArray: contact});
});

router.post('/favorite',async (req, res) => {
    /*db.any("SELECT fav from public.contacts where id=$1;",[req.body.id]).then((contact) => {
        if(contact[0].fav) {
            db.none("UPDATE public.contacts set fav=false where id = $1;", [req.body.id]);
        } else {
            db.none("UPDATE public.contacts set fav=true where id = $1;", [req.body.id]);
        }
    });*/
    const contact = await Contact.findAll({
        attributes: ['fav'],
        where: {
          id: {
            [Op.eq]: req.body.id
          }
        }
    });
    console.log(contact);
    if(contact[0].fav) {
        await Contact.update({fav:false}, {
            where: {
              id: req.body.id
            }
        });
    } else {
        await Contact.update({fav:true}, {
            where: {
              id: req.body.id
            }
        });
    }
});

router.get('/favorite', async (req, res) => {
    //db.any("SELECT * from public.contacts where fav=true;").then((contacts) => res.render('contact-list', {contactsArray: contacts}));
    const contact = await Contact.findAll({
        where: {
          fav: {
            [Op.eq]: true
          }
        }
    });
    res.render('contact-list', {contactsArray: contact});
});

module.exports = router;