import db from "../src/bancoDeDados.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

export async function SignInCliente(req, res) {
  const { email, password } = req.body;
  const token = v4();
  console.log("CHEGUEI AQUI CONTROLLER");
  try {
    //Validação de email e senha
    const usuarioID = await db.query(`SELECT id FROM usuarios WHERE email = $1;`, [email]);
    if (usuarioID.rowCount === 0 || !bcrypt.compareSync(password, resultado.rows[0].password)) {
      return res.sendStatus(401); 
    }
    const result = await db.query(`
          INSERT INTO sessões (userID, token)
          VALUES ($1,$2);
        `, [usuarioID, token]);

    res.status(200).send(token);
  } catch (e) {
    res.status(422).send("Ocorreu ao cliente!");
  }
}