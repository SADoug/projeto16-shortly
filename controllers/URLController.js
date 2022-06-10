import db from "../src/bancoDeDados.js";
import { nanoid } from 'nanoid';

export async function addURL(req, res) {
  console.log("CHEGUEI AQUI URL2");
  const { url } = req.body
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer', '').trim()
  const shortly = nanoid(10)
  if (!token)
  return res.status(401).send(`erro em encontrar o token: ${token}`)
  try {
    const header = await db.query(`SELECT * 
    FROM sessions 
    JOIN users ON sessions."userID" = users.id 
    WHERE token = $1`,  [token]);
    if (header.rowCount === 0) {
      return res.sendStatus(404); 
    }
    const result = await db.query(`
    INSERT INTO shortlys ("userID",url,"shortUrl")
    VALUES($1,$2,$3);
        `, [
          user.rows[0].id,
          url,
          shortly
        ]);

        res.status(201).send({ shortUrl: shortly })
  } catch (error) {
    console.log(error)
    res.status(422).send(error)
 }
}

export async function getURLId(req, res) {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.sendStatus(400); // bad request
  }

  try {
    const result = await db.query(`SELECT * FROM shortlys WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return res.sendStatus(404); // not found
    }

    res.status(200).send(req.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // internal server error
  }
}


export async function getURLId2(req, res) {
  const { shortUrl } = req.params;
  const contagem = 0;
  try {
    const result = await db.query(`SELECT * FROM shortlys WHERE shortUrl = $1`, [shortUrl]);
    if (result.rowCount === 0) {
      return res.sendStatus(404); // not found
    }
    contagem++;
    res.redirect([200], shortUrl)
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // internal server error
  }
}

export async function deleteUrl(req, res){
  const urlId = req.params.id
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer', '').trim()
  try{
      const owner = await db.query(`
          SELECT sessions.*
          FROM sessions WHERE token = $1`
      , [token])
      const urlExists = await db.query(`
          SELECT * FROM shortlys WHERE id = $1`
      , [urlId])
      if(owner.rows[0].userId != urlExists.rows[0].userId) return res.sendStatus(401)
      await db.query(`
          DELETE FROM shortlys WHERE id = $1
          `
      , [urlId])
      res.sendStatus(204)
  }catch(err){
      console.log(err)
      res.sendStatus(500)
  }
}
