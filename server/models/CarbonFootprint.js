const mongoose = require('mongoose');

const CarbonFootprintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    required: [true, 'Please add a carbon score']
  },
  breakdown: {
    bills: {
      type: Number,
      default: 0
    },
    food: {
      type: Number,
      default: 0
    },
    healthEducation: {
      type: Number,
      default: 0
    },
    transport: {
      type: Number,
      default: 0
    },
    miscellaneous: {
      type: Number,
      default: 0
    }
  },
  isLessThanAverage: {
    type: Boolean,
    default: false
  },
  percentDiff: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CarbonFootprint', CarbonFootprintSchema); 