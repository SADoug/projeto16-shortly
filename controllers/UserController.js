import db from "../src/bancoDeDados.js";

export async function addCliente(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    try {
      const result = await db.query(`
          INSERT INTO usuarios (name, email, password, "ConfirmPassword")
          VALUES ($1,$2,$3,$4);
        `, [name, email, password, confirmPassword]);
  
      res.sendStatus(201);
    } catch (e) {
      res.status(422).send("Ocorreu um erro registrar o cliente!");
    }
  }