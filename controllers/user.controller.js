const { error } = require("console");
const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
//params, body, query
const createUser = (req, res) => {
    const { first_name, last_name, email, password, phone, role } = req.body;
  db.query(
    `
    INSERT INTO users(first_name, last_name, email, password, phone)
    VALUES(?, ?, ?, ?, ?)
    `,
    [first_name, last_name, email, password, phone, role],
    (error, result) => {
      if (error) {
        console.log(`Error adding new user`, error);
        return res.status(500).send({ message: "Serverda xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi user qo'shildi", 
        userId: result.insertId});
    }
  );
};

const getAllUsers = (req, res) =>{
    db.query(`SELECT * FROM users`, (error, result) =>{
        if(error) {
            console.log(`Error - get all users`, error);
            return res.status(500).send({message: "Serverda xatolik"});
        }
        res.send(result);
    });
};

const getUserById = (req, res) => {
    const id = req.params.id;
  db.query(`SELECT * FROM users where id=${id}`, (error, result) => {
    if (error) {
      console.log(`Error - get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik" });
    }
    res.send(result);
  });
};

const removeUserById = (req, res) => {
    let {id} = req.params;
    db.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) =>{
        if(err){
            res.status(500).send({message: `${err.message}`});
        }

        res.status(200).send({message: "User deleted seccessfully"});
    });
};

const updateUserById = (req, res) =>{
    let { id } = req.params;
    let data = req.body;
    updateValue = queryGenerate(data);
    let values = Object.values(data);

    db.query(
        `UPDATE users SET ${updateValue} WHERE id=?`,
        [...values, id],
        (err, result) =>{
            if(err){
                res.status(500).send({message: `${err.message}`});
            }
            res.status(200).send({message: "User updated successfully"});
        }
    );
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    removeUserById,
    updateUserById
};