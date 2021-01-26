const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");
const path = require('path');
const fs = require('fs')

router.post("/upload", authorize, async (req, res) => {
  try {

    const {propertyId} = req.body
      console.log(propertyId);
      if (req.files === null) {
            res.status(400).json({ msg: 'No file uploaded' })
      }
      var multipleFiles = req.files.files

      if (!Array.isArray(multipleFiles)) { //If single image is uploaded
        multipleFiles = [multipleFiles]  // Push the single image json to an array
      }
      
      for (const file of multipleFiles) {
             console.log("--", file.name);
            //  var dir = `../public/images/${propertyId}`;
             var dir  = `./public/images/${propertyId}`
            if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
            }
            //  console.log(path.normalize(`${__dirname}/../public/uploads/${file.name}`));
            // const path_save = path.normalize(`${__dirname}/../../client/public/uploads/${file.name}`) //React public 
            const path_save =  path.normalize(`${__dirname}/../public/images/${propertyId}/${file.name}`) //Express public 
            console.log(path_save);
            await file.mv(path_save, err => {
              if (err) {
                console.error(err);
                return res.status(500).send(err);
              }
              // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
          })
      }
       
      // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      // res.json({ fileName: multipleFiles[0].name, filePath: `/static/images/${multipleFiles[0].name}` });
      // console.log(multipleFiles);
      var fileName = []
      await multipleFiles.forEach(element => {
        fileName.push({name:element.name, path:`images/${propertyId}/${element.name}`})
      });
      console.log(fileName, req.user, propertyId);
      let updatePhotograph = await pool.query(`UPDATE property SET photo = $1 WHERE users_owner_id = $2 AND id= $3 RETURNING *`,[
        fileName, req.user, propertyId
      ])
      if (updatePhotograph.rows.length !== 0){
          return  res.status(200).json({ fileName: fileName });
      }else{
        return res.status(500).json({msg: "Failed to save images"});
      }

      // res.status(200).json({ fileName: fileName });

    //   // const file = req.files.file
    // console.log();
    //   // console.log(`${__dirname}/..`);
    //   const path_save = path.normalize(`${__dirname}/../../client/public/uploads/${file.name}`)
    //   console.log(path_save);
    //   file.mv(path_save, err => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).send(err);
    //     }
    //     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    // })

    } catch (err) {
    console.error(err.message);
      res.status(500).send("Server error"); 
  }
});

module.exports = router;