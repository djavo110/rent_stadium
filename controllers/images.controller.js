const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getImagesAll = (req, res) => {
  db.query("SELECT * FROM images", (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getOneImagesById = (req, res) => {
  let { id } = req.params;
  db.query(`SELECT * FROM images WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const createImages = (req, res) => {
  const { name, address, location, description, price, ownerId } = req.body;
  db.query(
    `
    INSERT INTO images (name, address, location, description, price, ownerId)
    VALUES(?, ?, ?, ?, ?, ?)
    `,
    [name, address, location, description, price, ownerId],
    (error, result) => {
      if (error) {
        console.log(`Error adding new images`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi Images qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updateImagesById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE images SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Images updated successfully" });
    }
  );
};

const removeImagesById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM images WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Images deleted successfully" });
  });
};

module.exports = {
  getImagesAll,
  getOneImagesById,
  createImages,
  updateImagesById,
  removeImagesById,
};
