const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");

const connection = mysql.createConnection(config);

const criarTabela = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);`;
connection.query(criarTabela);

app.get("/", (req, res) => {
  const inserirPessoa = `INSERT INTO people(name) values('Augusto')`;
  connection.query(inserirPessoa);

  let visualizacaoTabela =
    "<table><thead><tr><th>Id</th><th>Name</th></tr></thead><tbody>";

  const consultaSql = `SELECT id, name FROM people`;

  connection.query(consultaSql, (error, results, fields) => {
    if (error) {
      throw error;
    }

    for (let item of results) {
      visualizacaoTabela += `<tr><td>${item.id}</td><td>${item.name}</td></tr>`;
    }

    visualizacaoTabela += "</tbody></table>";

    res.send("<h1>Full Cycle Rocks!</h1><br /><br />" + visualizacaoTabela);
  });

  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
