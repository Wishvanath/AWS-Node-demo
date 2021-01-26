const router = require("express").Router()
const pool = require('../db')
const authorize = require('../middleware/authorization')

router.post("/updateLand", authorize , async(req,res)=>{
    try {
        const  { 
            totalArea, hasBoundary,   municipality,  titleOwnership ,titleNature,
            isKhataRegistered,  litigationInfo,   isDocumentsAvailable,  landUsePermission,
            constructionApprovals,  encumbrance, taxPaymentStatus} = req.body.landPropertyDetails
        const propertyId = req.body.propertyId
    
        console.log( req.body);
        console.log( req.user);

            let updateLand = await pool.query(
                `UPDATE land SET  total_area = $1, has_boundary = $2 , municipality = $3, title_ownership = $4, title_nature = $5,
                    is_khata_registered = $6, litigation_info = $7, is_documents_avail = $8, land_use_perm = $9, cons_approval = $10, 
                    encumbrance = $11, tax_payment = $12  WHERE users_owner_id =  $13 AND property_id = $14
                    RETURNING * `,
                [   totalArea, hasBoundary,   municipality,  titleOwnership ,titleNature,
                    isKhataRegistered,  litigationInfo,   isDocumentsAvailable,  landUsePermission,constructionApprovals,
                    encumbrance, taxPaymentStatus, req.user, propertyId]
                );
                if (updateLand.rows.length !== 0) {
                    return res.json(200, {
                            status: 200,
                            message: "Successfully upated",
                        })
                    } else {
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