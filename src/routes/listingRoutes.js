const express = require('express');
const {
  getListings,
  getListingById,
  createListing,
  updateListingStatus,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');

const router = express.Router();

router.route('/')
  .get(getListings)
  .post(createListing);

router.route('/:id')
  .get(getListingById)
  .put(updateListing)
  .delete(deleteListing);

router.route('/:id/status')
  .patch(updateListingStatus);

module.exports = router;
