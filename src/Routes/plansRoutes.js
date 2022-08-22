const express = require('express');
const {
getallPlansController,
getplanController,
updateplanController,
deleteplanController,
createplanController
} = require('../controller/plansController');
const planRouter = express.Router();
planRouter.route("/")
.get(getallPlansController)
.post(createplanController);
planRouter.route("/:id")
.get(getplanController)
.patch(updateplanController)
.delete(deleteplanController);
module.exports = planRouter;