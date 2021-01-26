const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");


router.post("/setCompanyDetails", authorize, async (req, res) => {
  console.log('setCompanyDetails route')
    console.log(req.body);
    let {name, registeredOffice, tenants, latlng, operationalCities} = req.body
    // console.log(req.user)
    
    try {
        // console.log(parseInt(latlng.lat));
        // console.log(latlng.lng);

 
        let updateCompanyProfile = await pool.query(
            "UPDATE users_owner SET name = $1, registered_office = $2, tenants = $3 ,oper_cities = $4, location =  ST_SetSRID(ST_POINT($5, $6), 4326) WHERE id = $7  RETURNING * ",
            [name , registeredOffice ,  tenants , operationalCities, latlng.lng,   latlng.lat , req.user ]
          )
          
          if (updateCompanyProfile.rows.length !== 0) {
                return res.status(202).json("Successfully updated");
          } else{
                return res.status(500).json("Server error");
          }
    } catch (error) {
        console.error(error.message);
            res.status(500).send("Server error");   
    }
 
});

module.exports = router;