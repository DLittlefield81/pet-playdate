const router = require("express").Router();
const {PlayDate, User, Pet} = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
    try {
      const newPlayDate = await PlayDate.create({
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        user_id: req.session.user_id,
      });
      const user = await User.findByPk(req.session.user_id, {
        include:[{model: Pet}, {model: PlayDate}]
      });
      const playDate = user.playdates[user.playdates.length - 1]
      for(let i = 0;i < user.pets.length; i++) {
        await playDate.addPet(user.pets[i]);
      }
      res.status(200).json(newPlayDate);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/', withAuth, async (req, res) => {
    try {
      const playDateData = await PlayDate.findByPk(req.body.id);
      const user = await User.findByPk(req.session.user_id, {
        include:[{model: Pet}]
      });
      for(let i = 0;i < user.pets.length; i++) {
        await playDateData.addPet(user.pets[i]);
      }
      res.status(200).json(playDateData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/', withAuth, async (req, res) => {
    try {
      const PlayDateData = await PlayDate.destroy({
        where: {
          id: req.body.id,
        },
      });
      if (!PlayDateData) {
        res.status(404).json({ message: 'No PlayDate found with this id!' });
        return;
      }
      res.status(200).json(PlayDateData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const playDateData = await PlayDate.findByPk(req.params.id, {
        include: [{ model: User}]
      });
      const play = playDateData.get({ plain: true });
      console.log(play);
      // console.log(playDates);
      res.status(200).json(play);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;