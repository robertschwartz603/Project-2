const router = require('express').Router();
const { Hotdog } = require('../../models');
const withAuth = require('../../utils/auth');

//withAuth
router.post('/', async (req, res) => {
    try {
        const newHotdog = await Hotdog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newHotdog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const hotdogData = await Hotdog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!hotdogData) {
            res.status(404).json({ message: 'No hotdogs here, partner'});
            return;
        }

        res.status(200).json(hotdogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;