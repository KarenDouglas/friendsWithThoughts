const router = require('express').Router();
const apiRoutes = require('./api');
// routes start with /api
router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
