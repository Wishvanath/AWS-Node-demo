const router = require("express").Router()
const pool = require('../db')
const authorize = require('../middleware/authorization')

//register routes
router.post("/uploadVideo", authorize , async(req,res)=>{
    try {
        const  {  videoId , propertyId } = req.body
        console.log( req.user);
        console.log(req.user, videoId, propertyId);
        if(typeof videoId === 'undefined' ){
            return res.status(500).send({msg: " Invalid video URL"});
        }
            let updateVideo  = await pool.query(`UPDATE property SET video = $1 WHERE users_owner_id = $2 AND id= $3 RETURNING *`,[
                videoId, req.user, propertyId
              ])
            if (updateVideo.rows.length !== 0){
                    return  res.status(200).send({ msg: "Video URL successfully added" });
            }else{
                  return res.status(500).send({msg: "Failed to add video URL"});
            }
            
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})




module.exports = router