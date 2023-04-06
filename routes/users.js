var express = require('express');
var router = express.Router();

const users = [];
for (let i = 0; i < 20; i++) {
  users.push({ id: i + 1, name: 'Sample name' })
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  setTimeout(() => res.json(users), 500 );
});

module.exports = router;
