const Listing = require('../models/listingModel');

// @desc    Get all listings (approved by default)
// @route   GET /api/listings
// @access  Public
const getListings = async (req, res, next) => {
  try {
    const { status, featured } = req.query;
    
    // Build query filters
    const filter = {};
    if (status) {
      if (status !== 'all') {
        filter.status = status;
      }
    } else {
      filter.status = 'approved'; // Default to only showing approved accounts
    }
    
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      res.status(404);
      throw new Error('Listing not found');
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new listing
// @route   POST /api/listings
// @access  Public
const createListing = async (req, res, next) => {
  try {
    const {
      title,
      price,
      level,
      rank,
      vault,
      gunSkin,
      evoGunsCount,
      diamonds,
      loginMethod,
      sellerName,
      badgesCount,
      emotesCount,
      accountUid,
      description,
      rareItems,
      screenshots,
      status,
      featured,
    } = req.body;

    const listing = await Listing.create({
      title,
      price,
      level,
      rank,
      vault,
      gunSkin,
      evoGunsCount,
      diamonds,
      loginMethod,
      sellerName,
      badgesCount,
      emotesCount,
      accountUid,
      description,
      rareItems: rareItems || [],
      screenshots: screenshots || [],
      status: status || 'pending',
      featured: featured || false,
    });

    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// @desc    Update listing status (e.g. approve/reject)
// @route   PATCH /api/listings/:id/status
// @access  Private/Admin
const updateListingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status value');
    }

    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      res.status(404);
      throw new Error('Listing not found');
    }

    listing.status = status;
    const updatedListing = await listing.save();
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// @desc    Update listing details
// @route   PUT /api/listings/:id
// @access  Public (or Private/Admin in production)
const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      res.status(404);
      throw new Error('Listing not found');
    }

    // Update fields dynamically
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        listing[key] = req.body[key];
      }
    });

    const updatedListing = await listing.save();
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Public
const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      res.status(404);
      throw new Error('Listing not found');
    }

    await listing.deleteOne();
    res.status(200).json({ message: 'Listing removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListingStatus,
  updateListing,
  deleteListing,
};
