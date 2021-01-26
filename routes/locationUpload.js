const router = require("express").Router()
const pool = require('../db')
const authorize = require('../middleware/authorization')

//register routes
router.post("/uploadLocation", authorize , async(req,res)=>{
    try {
        const  {  latlng , propertyId } = req.body
        console.log( req.user);
        console.log(req.user, latlng, propertyId);
        if(typeof latlng === 'undefined' ){
            return res.status(500).send({msg: " Invalid location. Please try again"});
        }
            let updateLocation  = await pool.query(`UPDATE property SET location =  ST_SetSRID(ST_POINT($1, $2), 4326) WHERE users_owner_id = $3 AND id= $4 RETURNING *`,[
                latlng.lng, latlng.lat, req.user, propertyId
              ])
            if (updateLocation.rows.length !== 0){
                    return  res.status(200).send({ msg: "Location successfully added" });
            }else{
                  return res.status(500).send({msg: "Failed to add location"});
            }
            
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})




module.exports = router