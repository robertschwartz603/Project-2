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

        const hotdogs = hotdogData.map((hotdog) => hotdog.get({ plain: true }));

        res.render('homepage', {
            hotdogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

/* route for reviews*/
router.get('/reviews', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const projectData = await Project.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const projects = projectData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('reviews', { 
        projects, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/hotdog/:id', async (req, res) => {
    try {
        const hotdogData = await Hotdog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const hotdog = hotdogData.get({ plain: true });

        res.render('hotdog', {
            ...hotdog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Hotdog }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;