const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getBookingAll = (req, res) => {
  db.query("SELECT * FROM booking", (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getOneBookingById = (req, res) => {
  let { id } = req.params;
  db.query(`SELECT * FROM booking WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const createBooking = (req, res) => {
  const { name, address, location, description, price, ownerId } = req.body;
  db.query(
    `
    INSERT INTO booking (name, address, location, description, price, ownerId)
    VALUES(?, ?, ?, ?, ?, ?)
    `,
    [name, address, location, description, price, ownerId],
    (error, result) => {
      if (error) {
        console.log(`Error adding new booking`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi booking qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updateBookingById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE booking SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Booking updated successfully" });
    }
  );
};

const removeBookingById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM booking WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Booking deleted successfully" });
  });
};

module.exports = {
  getBookingAll,
  getOneBookingById,
  createBooking,
  updateBookingById,
  removeBookingById,
};
