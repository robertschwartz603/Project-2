const router = require('express').Router();
const userRoutes = require('./userRoutes');
const hotdogRoutes = require('./hotdogRoutes');

router.use('/users', userRoutes);
router.use('/hotdog', hotdogRoutes);

module.exports = router;