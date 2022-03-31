const router = require('express').Router();
const { Hotdog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const hotdogData = await Hotdog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const hotdogs = projectData.map((hotdog) => hotdog.get({ plain: true }));

        res.render('homepage', {
            hotdogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});