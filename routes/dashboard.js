const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");


router.get("/", authorize, async (req, res) => {
  console.log('dashboard route');
  try {
    const user = await pool.query(
      "SELECT name, email, registered_office, tenants, oper_cities, ST_Y(location) as lat, ST_X(location) as lng  FROM users_owner WHERE id = $1",
      [req.user] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;