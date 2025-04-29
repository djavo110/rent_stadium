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

const getAllUsersByRole = (req, res) => {
  //query, body, params
  const  { role } = req.body;
  db.query("SELECT * FROM users WHERE role=?", [role], (error, results) => {
    if(error) {
      console.log(`Error get all users by role`, error);
      return res.status(500).send({message: "Severda xatolik"});
    }
    res.send(results);
  });
};

const getUserByAnyParams = (req, res) => {
  const {first_name, last_name, email, phone} = req.body;
  let where = "true";
  if(first_name){
    where+= ` AND first_name='${first_name}'`;
  }
  if(last_name){
    where += ` AND last_name='${last_name}'`;
  }
  if (email) {
    where += ` AND email='${email}'`;
  }
  if (phone) {
    where += ` AND phone='${phone}'`;
  }
  if(where == "true"){
    return res
      .status(400)
      .send({message: "Qidirish parametrlarini kiriting"});
  }
  db.query(
    `SELECT * FROM users WHERE ${where}`,
    (error, result) => {
      if(error) {
        console.log(`Error get users`, error);
        return res.status(500).send({message: "Serverda xatolik"});
      }
      res.send(result);
    }
  );
};

const findOwnerStadium = (req, res) => {
  const {first_name, last_name} = req.body;
  db.query( `SELECT u.first_name, u.phone, s.name FROM  users u
LEFT JOIN stadium s ON u.id = s.owner_id
LEFT JOIN images i ON s.id = i.stadion_id
WHERE first_name='${first_name}' and last_name='${last_name}'`, (error, results) => {
    if (error) {
      console.log(`Error get all users by role`, error);
      return res.status(500).send({ message: "Severda xatolik" });
    }
    res.send(results);
  });
};

const findOwnerPhone = (req, res) => {
  const { phone } = req.body;
  db.query(
    `SELECT u.first_name, u.phone, r.comment, s.name FROM users u
LEFT JOIN review r ON u.id = r.user_id
LEFT JOIN stadium s ON s.id = r.stadion_id
WHERE phone = '${phone}' `,
    (error, results) => {
      if (error) {
        console.log(`Error get all users by role`, error);
        return res.status(500).send({ message: "Severda xatolik" });
      }
      res.send(results);
    }
  );
};





module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    removeUserById,
    updateUserById,
    getAllUsersByRole,
    getUserByAnyParams,
    findOwnerStadium,
    findOwnerPhone
};