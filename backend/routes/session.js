// routes/session.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({sessionId: req.sessionID});
});

module.exports = router;
