const router = require("express").Router()
const pool = require('../db')
const authorize = require('../middleware/authorization')

router.post("/addStandaloneWarehouse", authorize , async(req,res)=>{
    try {
        console.log(req.body);
        var  { 
            landArea, builtupArea,  municipality,  ratioGreenBuiltupArea,  hasBoundary,
            yearOperation,  landApproval,  spaceAvailability,  area,  availableDate,  carpetArea,
            length,  breadth,  centreHeight,  sideEaveHeight,  noDocks,  dockHeight,  isDockLevelerAvailable,
            floorDetails,  buildingType, skylightDetails,  hasFireProtection,  hasFireDetection,
            parkingArea,  hasMHEChargingPorts,  MHEChargingPorts,  powerOutlets,  hasToilet,   hasOfficeSpace } = req.body

            console.log(yearOperation);
            console.log(yearOperation.length);
            if (landArea.length === 0 )     {  landArea = null }
            if (builtupArea.length === 0 )  { builtupArea = null }
            if (yearOperation.length === 0 ) {yearOperation = null }
            if (area.length === 0 ) {area = null }
            if (availableDate.length === 0 ) {availableDate = null }
            if (carpetArea.length === 0 ) { carpetArea = null }   
            if (length.length === 0 ) { length = null }   
            if (breadth.length === 0 ) { breadth = null }
            if (centreHeight.length === 0 ) { centreHeight = null }
            if (sideEaveHeight.length === 0 ) { sideEaveHeight = null }
            if (noDocks.length === 0 ) { noDocks = null }
            if (dockHeight.length === 0 ) { dockHeight = null }
            if (parkingArea.length === 0 ) { parkingArea = null }
            if (MHEChargingPorts.length === 0 ) { MHEChargingPorts = null }
            if (powerOutlets.length === 0 ) { powerOutlets = null }

            console.log( req.user);
            let insertProperty = await pool.query(`INSERT INTO property(users_owner_id,type) values($1, $2) RETURNING *`,[
                req.user, 3
            ])
            if (insertProperty.rows.length !== 0){
                console.log(yearOperation);
                let insertStandAloneWarehouse = await pool.query(
                    `INSERT INTO warehouse( 
                        land_area, built_area, municipality,  year_oper,       land_appr, is_standalone,
                        space_avl , area, avail_date, carpet_area, length, breadth,
                        centre_height, eave_height, no_docks, dock_height, has_dock_lever, floor_info,
                        building_type, skylight_type, has_fire_protect, has_fire_detect,  park_area, has_charge_port ,
                        no_charge_port, no_power_outlet, has_toilet , has_office_space, 
                        users_owner_id, property_id 
        
                        )
                        VALUES  ($1,$2 ,$3, $4, $5, $6, 
                        $7 ,$8, $9, $10, $11,  $12 ,
                        $13, $14, $15 ,$16, $17, $18 ,                 
                        $19, $20, $21, $22, $23, $24,
                        $25, $26, $27, $28,
                        $29, $30


                   )   RETURNING * `,
                   [    landArea,  builtupArea,  municipality,  yearOperation,  landApproval, true ,
                        spaceAvailability,  area,  availableDate,  carpetArea,  length,  breadth,
                        centreHeight,  sideEaveHeight,   noDocks,  dockHeight,  isDockLevelerAvailable, floorDetails,
                        buildingType, skylightDetails,  hasFireProtection,  hasFireDetection,  parkingArea,  hasMHEChargingPorts,
                        MHEChargingPorts,  powerOutlets,  hasToilet,  hasOfficeSpace,  
                        req.user,  insertProperty.rows[0].id
                ]

                
                  );
                    if (insertStandAloneWarehouse.rows.length !== 0) {
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