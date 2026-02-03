const Secret = require("../models/Secret.js");
const mongoose = require("mongoose");

const getSecrets = async (req, res) => {
  try {
    const secrets = await Secret.find().sort({ createdAt: -1 });
    res.status(200).json(secrets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSecret = async (req, res) => {
  const { text, category } = req.body;

  try {
    const newSecret = await Secret.create({ text, category });
    res.status(201).json(newSecret);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeSecret = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such secret" });
  }

  try {
    const secret = await Secret.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!secret) {
      return res.status(404).json({ error: "No such secret" });
    }

    res.status(200).json(secret);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSecrets,
  createSecret,
  likeSecret,
};
