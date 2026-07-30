const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    level: {
      type: Number,
      required: [true, 'Please add a level'],
    },
    rank: {
      type: String,
      required: [true, 'Please add a rank'],
    },
    vault: {
      type: Number,
      default: 0,
    },
    gunSkin: {
      type: Number,
      default: 0,
    },
    evoGunsCount: {
      type: Number,
      default: 0,
    },
    diamonds: {
      type: Number,
      default: 0,
    },
    loginMethod: {
      type: String,
      required: [true, 'Please add a login method'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    sellerName: {
      type: String,
      required: [true, 'Please add a seller name'],
    },
    badgesCount: {
      type: Number,
      default: 0,
    },
    emotesCount: {
      type: Number,
      default: 0,
    },
    accountUid: {
      type: String,
      required: [true, 'Please add an account UID'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    rareItems: {
      type: [String],
      default: [],
    },
    screenshots: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
