const Nego = require("../models/nego.model.js");

const getNego = async (req, res, next) => {
  try {
    // Check if negotiations exist for the given nego_id
    const [buyer_id, seller_id] = req.params.id.split("_");
    let nego = await Nego.find({
      nego_id: req.params.id,
    });

    // If no negotiations found, create a new one
    if (!nego || nego.length === 0) {
      // Create a new negotiation object
      nego = await Nego.create({
        nego_id: req.params.id,
        buyer_id: buyer_id,
        seller_id: seller_id,
        // Add any other default properties for the negotiation object
      });
    }

    // Respond with the negotiations
    res.status(200).json(nego[0]);
  } catch (error) {
    next(error);
  }
};

const postNego = async (req, res) => {
  try {
    const negos = await Nego.findOneAndUpdate(
      { nego_id: req.params.id },
      {
        $push: {
          negos: req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(negos[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getNego,
  postNego,
};
