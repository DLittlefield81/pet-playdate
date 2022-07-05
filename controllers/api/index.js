const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const eventRoutes = require('./eventRoutes');


router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/events', eventRoutes);


module.exports = router;