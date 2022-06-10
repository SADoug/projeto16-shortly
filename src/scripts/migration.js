import  db  from "../database/db.js";
import fs from "fs";
import path from "path";

const execute = async () => {
  console.log("\nCriando Banco...\n");

  const __dirname = path.resolve(path.dirname(""));
  const sql = fs.readFileSync(__dirname + "/src/database/migration/initial.sql", { encoding: "UTF-8" });
  await db.query(sql);
};

execute()
  .then(() => console.log("Banco de dados criado com sucesso\n"))
  .catch((err) => console.log({ error: err, message: "Erro ao criar banco de dados"