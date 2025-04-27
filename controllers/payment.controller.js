const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getPaymentAll = (req, res) => {
  db.query("SELECT * FROM payment", (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getOnePaymentById = (req, res) => {
  let { id } = req.params;
  db.query(`SELECT * FROM payment WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const createPayment = (req, res) => {
  const { name, address, location, description, price, ownerId } = req.body;
  db.query(
    `
    INSERT INTO payment (name, address, location, description, price, ownerId)
    VALUES(?, ?, ?, ?, ?, ?)
    `,
    [name, address, location, description, price, ownerId],
    (error, result) => {
      if (error) {
        console.log(`Error adding new Payment`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi Payment qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updatePaymentById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE payment SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Payment updated successfully" });
    }
  );
};

const removePaymentById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM payment WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Payment deleted successfully" });
  });
};

module.exports = {
  getPaymentAll,
  getOnePaymentById,
  createPayment,
  updatePaymentById,
  removePaymentById,
};
