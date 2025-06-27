const CarbonFootprint = require('../models/CarbonFootprint');
const User = require('../models/User');

// @desc    Get all carbon footprints for a user
// @route   GET /api/carbon
// @access  Private
exports.getCarbonFootprints = async (req, res) => {
  try {
    const footprints = await CarbonFootprint.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: footprints.length,
      data: footprints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

// @desc    Get single carbon footprint
// @route   GET /api/carbon/:id
// @access  Private
exports.getCarbonFootprint = async (req, res) => {
  try {
    const footprint = await CarbonFootprint.findById(req.params.id);

    if (!footprint) {
      return res.status(404).json({
        success: false,
        message: 'Carbon footprint not found'
      });
    }

    // Make sure user owns the footprint
    if (footprint.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this footprint'
      });
    }

    res.status(200).json({
      success: true,
      data: footprint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

// @desc    Create new carbon footprint
// @route   POST /api/carbon
// @access  Private
exports.createCarbonFootprint = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const footprint = await CarbonFootprint.create(req.body);

    res.status(201).json({
      success: true,
      data: footprint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

// @desc    Update carbon footprint
// @route   PUT /api/carbon/:id
// @access  Private
exports.updateCarbonFootprint = async (req, res) => {
  try {
    let footprint = await CarbonFootprint.findById(req.params.id);

    if (!footprint) {
      return res.status(404).json({
        success: false,
        message: 'Carbon footprint not found'
      });
    }

    // Make sure user owns the footprint
    if (footprint.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this footprint'
      });
    }

    footprint = await CarbonFootprint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: footprint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

// @desc    Delete carbon footprint
// @route   DELETE /api/carbon/:id
// @access  Private
exports.deleteCarbonFootprint = async (req, res) => {
  try {
    const footprint = await CarbonFootprint.findById(req.params.id);

    if (!footprint) {
      return res.status(404).json({
        success: false,
        message: 'Carbon footprint not found'
      });
    }

    // Make sure user owns the footprint
    if (footprint.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this footprint'
      });
    }

    await footprint.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
}; 