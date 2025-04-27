const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getStadiumAll = (req, res) =>{
    db.query("SELECT * FROM stadium", (err, result) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    });
};

const getOneStadiumById = (req, res) => {
    let { id } = req.params;
    db.query(`SELECT * FROM stadium WHERE id = ?`, [id], (err, result) => {
         if(err) {
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    });
};

const createStadium = (req, res) => {
  const { name, address, location, description, price, ownerId } = req.body;
  db.query(
    `
    INSERT INTO stadium (name, address, location, description, price, ownerId)
    VALUES(?, ?, ?, ?, ?, ?)
    `,
    [name, address, location, description, price, ownerId],
    (error, result) => {
      if (error) {
        console.log(`Error adding new stadium`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi stadium qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updateStadiumById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE stadium SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Stadium updated successfully" });
    }
  );
};



const removeStadiumById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM stadium WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Stadium deleted successfully" });
  });
};

module.exports = {
    getStadiumAll,
    getOneStadiumById,
    createStadium,
    updateStadiumById,
    removeStadiumById,
};