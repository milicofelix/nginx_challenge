const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people (name VARCHAR(50))`;
const insertValueA = `INSERT INTO people(name) values('Adriano');`;
const insertValueB = `INSERT INTO people(name) values('Shislene');`;

const queryPeople = `SELECT * FROM people;`;

connection.connect((err) => {
  if (err) return console.error(err.message);

  connection.query(createTable, (err, results, fields) => {
    if (err) return console.log(err.message);
    connection.query(insertValueA, (err, results, fields) => {
      if (err) return console.log(err.message);
      connection.query(insertValueB, (err, results, fields) => {
        if (err) return console.log(err.message);
      });
    });
  });
});

app.get("/", (req, res) => {
  connection.query(queryPeople, (err, results, fields) => {
    if (err) return console.log(err.message);
    const people = JSON.parse(JSON.stringify(results));
    const table = people
      ?.map((item) => `<tr><td>${item.name}</td></tr>`)
      .toString();
    res.send(`
    <div>
      <h1>Full Cycle</h1>
      <table>
        <tr>
          <th>Nome</th>
        </tr>
        ${table}
      </table>
    </div>`);
    console.log("result", people);
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
