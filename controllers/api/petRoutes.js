const router = require("express").Router();
const {Pet} = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
    try {
      const newPet = await Pet.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPet);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/', withAuth, async (req, res) => {
    try {
      const petData = await Pet.destroy({
        where: {
          pet_name: req.body.pet_name,
        },
      });
      if (!petData) {
        res.status(404).json({ message: 'No pet found with this name!' });
        return;
      }
      res.status(200).json(petData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;