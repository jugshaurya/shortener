const { isValidUrl, isValidName } = require("../utils/validations");

const getCollection = async client => {
  await client.connect();
  console.log("DB Connected");
  const db = await client.db("db");
  const collection = await db.collection("mapped_urls");
  return collection;
};

const shortIt = client => async (req, res, next) => {
  try {
    const { url, name } = req.body;
    const isValidPair = isValidUrl(url) && isValidName(name);
    if (!isValidPair) {
      const error = new Error("URL or Short Name is Invalid!");
      error.status = 400; // Bad Request
      throw error;
    }

    const collection = await getCollection(client);
    const isAvailable = await collection.findOne({ name });
    if (isAvailable) {
      const error = new Error("Choose other Short Name");
      error.status = 403; // Forbidden
      throw error;
    }

    const newDoc = await collection.insertOne({ url, name });
    res.json({
      url: newDoc.ops[0].url,
      name: newDoc.ops[0].name
    });
  } catch (err) {
    next(err);
  }
};

const redirectIt = client => async (req, res, next) => {
  try {
    const { shortName } = req.params;
    if (!isValidName(shortName)) {
      return res.render("404", {
        message: "Not a Valid Short Name",
        status: 404 // Not Found
      });
    }

    const collection = await getCollection(client);
    const doc = await collection.findOne({ name: shortName });
    if (!doc) {
      return res.render("404", {
        message: "No URL Found For this short URL",
        status: 404 // Not Found
      });
    }

    res.redirect(`${doc.url}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  shortIt,
  redirectIt
};
