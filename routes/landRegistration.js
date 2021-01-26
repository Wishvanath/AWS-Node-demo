const router = require("express").Router()
const pool = require('../db')
const authorize = require('../middleware/authorization')

//register routes
router.post("/addLand", authorize , async(req,res)=>{
    try {
        const  { 
            totalArea, hasBoundary,   municipality,  titleOwnership ,titleNature,
            isKhataRegistered,  litigationInfo,   isDocumentsAvailable,  landUsePermission,
            constructionApprovals,  encumbrance, taxPaymentStatus} = req.body
    
            console.log(req.body);
            console.log( req.user);
            let insertProperty = await pool.query(`INSERT INTO property(users_owner_id,type) values($1, $2) RETURNING *`,[
                req.user, 2
            ])
            if (insertProperty.rows.length !== 0){
                let insertLand = await pool.query(
                    `INSERT INTO land(users_owner_id, total_area, has_boundary, municipality, title_ownership, title_nature,
                        is_khata_registered , litigation_info , is_documents_avail, land_use_perm, cons_approval , encumbrance, 
                        tax_payment, property_id )
                     VALUES  ($1,$2 ,$3, $4, $5, $6,
                        $7 ,$8, $9, $10, $11,$12, 
                        $13, $14 )   RETURNING * `,
                    [ req.user, totalArea, hasBoundary,   municipality,  titleOwnership ,titleNature,
                        isKhataRegistered,  litigationInfo,   isDocumentsAvailable,  landUsePermission, constructionApprovals,  encumbrance,
                         taxPaymentStatus, insertProperty.rows[0].id]
                  );
                    if (insertLand.rows.length !== 0) {
                        return res.json(200, {
                                status: 200,
                                message: "Successfully upated",
                                propertyId: insertProperty.rows[0].id
                            })
                        } else {
                            return res.json(500, {
                                status: 500,
                                message: "Server error. Please try later"
                            })
                        }
            }else{
                return res.json(500, {
                    status: 500,
                    message: "Server error. Please try later"
                })
            }

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})




module.exports = router