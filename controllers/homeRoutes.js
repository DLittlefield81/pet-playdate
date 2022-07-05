const router = require('express').Router();

const { PlayDate, User, Pet } = require("../models");

const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
    try {
      const playDateData = await PlayDate.findAll({
        include: [{model: Pet}, {model: User}],
      });
      const playDates = playDateData.map((playDate) => playDate.get({ plain: true }));
      res.render('homepage', { 
        playDates,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Invdividual playdate route
router.get('/event/:id', withAuth, async (req, res) => {
    try {
      const playDateData = await PlayDate.findByPk(req.params.id, {
        include: [{model: User, include: [{ model: Pet }] },
          { model: Pet, include: [{ model: User }] }],
      });
      const playDate = playDateData.get({ plain: true });
      res.render('event-details', {
        playDate,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// route to profile 
router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Pet},{model: PlayDate}],
      });
      const user = userData.get({ plain: true });
      let play;
      if(user.pets[0]) {
        const playDates = await PlayDate.findAll({
          include: [{model: Pet, where: {id: user.pets[0].id}}]
        });
        play = playDates.map((playDate) => playDate.get({ plain: true }));
      }
      res.render('profile', {
        ...user,
        play,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/addevent', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }, { model: PlayDate }],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('add-event', {
      user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// route for new pet
router.get('/addpet', withAuth, (req, res) => { 
    res.render("add-pet",{logged_in: req.session.logged_in});
});


// route to login
router.get('/login', (req, res) => { 
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render("login");
});

module.exports = router;
