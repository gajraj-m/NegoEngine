const Nego = require("../models/nego.model.js");
const similarity = require('compute-cosine-similarity');

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
    // console.log(negos)
    const len = negos.negos.length;
    const result = 0;
    if(len > 1) {
      const nego1 = negos.negos[len-1];
      const nego2 = negos.negos[len-2]; 
      // console.log(nego1);
      // console.log(nego2);
      result = Math.round(calculateOverallSimilarity(nego1, nego2) * 100);
    }

    // negos.curr_similarity = result;
    await Nego.findOneAndUpdate(
      { nego_id: req.params.id },
      {
        $set: {
          curr_similarity : result,
        },
      },
      { new: true }
    );
    console.log(negos);
    // Object.keys(nego1).forEach(key => {
    //   console.log(`${key}: ${typeof nego1[key]}`);
    // });
    // console.log(typeof(nego1.declared_price))
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};


function calculateOverallSimilarity(order1, order2) {
    const order1Values = [
        order1.declared_price,
        order1.withholding_amount,
        order1.settlement_window*1000,
        order1.commission,
        order1.return_window*1000,
        order1.cancel_window*1000,
    ];

    const order2Values = [
        order2.declared_price,
        order2.withholding_amount,
        order2.settlement_window*1000,
        order2.commission,
        order2.return_window*1000,
        order2.cancel_window*1000,
    ];

    const numericalSimilarity = similarity(order1Values, order2Values);
    // const numericalSimilarity = levenshtein.get(order1Values, order2Values);
    console.log(numericalSimilarity);

    const paymentSimilarity = (order1.payment_collector == order2.payment_collector) ? 1 : 0;
    const settlementSimilarity = (order1.settlement_basis == order2.settlement_basis) ? 1 : 0;

    // Calculate overall similarity considering weights for different attribute types
    const overallSimilarity = (0.5 * numericalSimilarity + 0.25 * paymentSimilarity + 0.25 * settlementSimilarity);
    return overallSimilarity;
}

module.exports = {
  getNego,
  postNego,
};
