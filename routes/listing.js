const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js")

//index route
router.get("/",wrapAsync(listingController.index));

//new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//create route
router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListings)); 

//show route
router.get("/:id", wrapAsync(listingController.showListings));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListings));

//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;