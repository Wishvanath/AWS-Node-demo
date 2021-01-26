const router = require("express").Router()
const pool = require('../db')
const authorize = require('../middleware/authorization')

//register routes
router.post("/addLogisticPark", authorize , async(req,res)=>{
    try {
        console.log(req.body);
        var  { 
            landArea, proposedBuiltupArea, currentBuiltupArea,  ratioGreenBuiltupArea, hasBoundary,
            yearOperation, landApproval, areaBTS, areaRTM, hasCASecurity, CASecurity, hasOperMainProperty,
            OperMainProperty, hasOperMainCommonArea, OperMainCommonArea, hasMainLandscapeGreenary, 
            mainLandscapeGreenary, hasSTPWTP, STPWTP, otherInfo } = req.body
            console.log(proposedBuiltupArea);
            console.log(parseInt(proposedBuiltupArea));

            if (landArea.length === 0 ) {
                landArea = null
            }
            if (proposedBuiltupArea.length === 0 ) {
                proposedBuiltupArea = null
            }
            if (currentBuiltupArea.length === 0 ) {
                currentBuiltupArea = null
            }
            if (ratioGreenBuiltupArea.length === 0 ) {
                ratioGreenBuiltupArea = null
            }
            if (yearOperation.length === 0 ) {
                yearOperation = null
            }   
            if (areaBTS.length === 0 ) {
                areaBTS = null
            }   
            if (areaRTM.length === 0 ) {
                areaRTM = null
            }
    

            console.log(req.body);
            console.log( req.user);
            let insertProperty = await pool.query(`INSERT INTO property(users_owner_id,type) values($1, $2) RETURNING *`,[
                req.user, 1
            ])
            if (insertProperty.rows.length !== 0){
                let insertLogsticPark = await pool.query(
                    `INSERT INTO logistic_park( land_area, prop_built_area, curr_built_area, ratio_gb_area, year_oper,land_appr,
                        area_bts , area_rtm,has_ca_security, ca_security,has_op_mtn_property, op_mtn_property,
                        has_op_mtn_ca, op_mtn_ca, has_mtn_lg, mtn_lg,has_stp_wtp, stp_wtp, other_info,
                        users_owner_id, property_id )
                        VALUES  ($1,$2 ,$3, $4, $5, $6, 
                        $7 ,$8, $9, $10, $11,$12,   
                        $13, $14, $15, $16, $17, $18, $19,
                        $20, $21 )   RETURNING * `,
                [       landArea, proposedBuiltupArea, currentBuiltupArea,  ratioGreenBuiltupArea,yearOperation, landApproval, 
                        areaBTS, areaRTM, hasCASecurity, CASecurity, hasOperMainProperty, OperMainProperty, 
                        hasOperMainCommonArea, OperMainCommonArea, hasMainLandscapeGreenary,  mainLandscapeGreenary, hasSTPWTP, STPWTP, otherInfo, 
                         req.user,  insertProperty.rows[0].id ]
                  );
                    if (insertLogsticPark.rows.length !== 0) {
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