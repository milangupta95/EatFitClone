const PlanUserModel = require('../model/plansModel');
async function getallPlansController(req,res) {
    try {
        let plans = await PlanUserModel.find();
        res.status(200).json({
            Allplans : plans
        });
    } catch(err) {
        res.status(500).json({
            result: "Server Error"
        });
    }
}
async function getplanController(req,res) {
    try {
        let id = req.params.id;
        let plan = await PlanUserModel.findById(id);
        if(plan) {
            res.status(200).json({
                plan: plan
            });
        } else {
            res.status(404).json({
                result: "Page Requested Not Found"
            })
        }
    } catch(err) {
        res.status(500).json({
            result: "Server Error"
        })
    }
}
async function updateplanController(req,res) {
    try {
        let dataToUpdated = req.body;
        let id = req.params.id;
        let planToBeUpdated = await PlanUserModel.findById(id);
        if(planToBeUpdated) {
            let isdataPresent = Object.keys(dataToUpdated).length > 0;
            if(isdataPresent) {
                for(let keys in dataToUpdated) {
                    planToBeUpdated[keys] = dataToUpdated[keys];
                }
                await planToBeUpdated.save();
                res.status(200).json({
                    result: "Data Updated SuccessFully",
                    data: planToBeUpdated
                });
            } else {
                res.send(404).json({
                    result: "No Data is found to update"
                })
            }
        } else {
            res.status(404).json({
                result: "Plan Not Found"
            });
        }
    } catch(err) {
        res.status(500).json({
            result: "Server Error"
        })
    }
}

async function deleteplanController(req,res) {
    try {
        let planId = req.params.id;
        let plan  = await PlanUserModel.findByIdAndDelete(planId);
        res.status(200).json({
            result: "User Deleted SuccessFully",
            plan: plan
        });
    } catch(err) {
        res.status(500).json({
            result: err.message
        })
    }
}

async function createplanController(req,res) {
    try {
        let planData = req.body;
        let isPlanDataValid = Object.keys(planData).length > 0;
        if(isPlanDataValid) {
            let plan = await PlanUserModel.create(planData);
            res.status(200).json({
                result: "Plan Has Been Created SuccessFully"
            })
        } else {
            res.status(404).json({
                result: "Data Not Found"
            });
        }
    } catch(err) {
        res.status(500).json({
            result: err.message,
        })
    }
}

module.exports = {
    getallPlansController,
    getplanController,
    updateplanController,
    deleteplanController,
    createplanController
};