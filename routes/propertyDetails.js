const router = require("express").Router()
const pool = require('../db')
const authorize = require('../middleware/authorization')





 router.get("/getAllProperties", authorize, async (req, res) => {
    try {
      const user = await pool.query(
        `select property.id as property_id,property.type, agent_id,photo , property_type.name as type_text, ST_X(location) as lat,ST_Y(location) as lng
        from property join property_type on  property_type.id = property.type where users_owner_id = $1 order by property_id` 
        , [ req.user ] );
  
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

  router.get("/getPropertyDetails", authorize, async (req, res) => {
    try {
      const user = await pool.query(
            `select property.id as property_id, photo, video,  ST_X(location) as lat,ST_Y(location) as lng, type, property.agent_id ,
            total_area, has_boundary, municipality, title_ownership, title_nature, is_khata_registered, litigation_info, is_documents_avail, land_use_perm,
            cons_approval, encumbrance, tax_payment
            from property join land on property.id = land.property_id
            where property.id = 176 and type = 2 and
            property.users_owner_id = $1` 
        , [ req.user ] );
  
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
module.exports = router