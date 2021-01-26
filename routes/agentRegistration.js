const router = require("express").Router()
const pool = require('../db')
const authorize = require('../middleware/authorization')

//register agent routes
router.post("/addAgent", authorize , async(req,res)=>{
    try {
        const  {  name , designation, mobileNo } = req.body
        console.log( req.user);
        console.log(req.user, name, designation, mobileNo);
        if(!/^\d{10}$/.test(mobileNo) ){
            return res.status(500).send({msg: " Invalid mobile number"});
        }
 
            let addAgent  = await pool.query(`INSERT INTO agent (name, designation, mobile_no, users_owner_id) VALUES($1, $2, $3, $4) RETURNING *`,[
                name, designation, mobileNo, req.user
              ])
            if (addAgent.rows.length !== 0){
                    return  res.status(200).send({ msg: "Agent registration successful " });
            }else{
                    return res.status(500).send({msg: "Failed to register agent. Please try again"});
            }
            
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})


router.get("/getAgents", authorize, async (req, res) => {
    try {
      const user = await pool.query(
        "SELECT * FROM agent where users_owner_id = $1 order by id", [ req.user ]
      ); 
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/updateAgentInfo", authorize, async (req, res) => {
      console.log(req.body);
      let {id, name, mobileNo, designation} = req.body
      console.log(req.user);
      try {
          let updateAgentInfo = await pool.query(
              "UPDATE agent SET name = $1, designation = $2, mobile_no = $3 WHERE id = $4  RETURNING * ",
              [name,  designation, mobileNo,  id ]
            )
            
            if (updateAgentInfo.rows.length !== 0) {
                  return res.status(202).json("Successfully updated");
            } else{
                  return res.status(500).json("Server error");
            }
      } catch (error) {
          console.error(error.message);
              res.status(500).send("Server error");   
      }
   
  });

  router.post("/deleteAgent", authorize, async (req, res) => {
    console.log(req.body);
    let {id} = req.body
    console.log(req.user);
    try {
        let deleteAgent = await pool.query(
            "DELETE FROM agent   WHERE id = $1  RETURNING * ",
            [  id ]
          )
          
          if (deleteAgent.rows.length !== 0) {
                return res.status(202).json("Successfully deleted");
          } else{
                return res.status(500).json("Server error");
          }
    } catch (error) {
        console.error(error.message);
            res.status(500).send("Server error");   
    }
 
});

 



router.post("/assignAgent", authorize, async (req, res) => {
  console.log(req.body);
  const  {  agentId, propertyId } = req.body
  console.log(req.user);
  try {
      let assignAgent = await pool.query(
          "UPDATE property SET agent_id = $1 WHERE id = $2 AND users_owner_id = $3  RETURNING * ",
          [ agentId, propertyId , req.user]
        )
        
        if (assignAgent.rows.length !== 0) {
              return res.status(200).json("Successfully assigned");
        } else{
              return res.status(500).json("Server error");
        }
  } catch (error) {
      console.error(error.message);
          res.status(500).send("Server error");   
  }
});



module.exports = router