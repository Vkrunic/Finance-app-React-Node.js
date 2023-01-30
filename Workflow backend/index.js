const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors = require('cors')

app.use(bodyparser.json());
app.use(cors({
    origin: '*'
}));

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'workflow_db'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log("connected")
    else
        console.log("not connected" + JSON.stringify(err, undefined, 2))
});
app.listen(3005, () =>
    console.log('express server is running at port 3005')
)

//Delete by employee id
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM radnik WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send("Delete successiful")
        else
            console.log(err);
    })
});
//add projects
app.post("/addProject", (req, res) => {
    const project = req.body.project
    const client = Number(req.body.client)

    mysqlConnection.query(
        "INSERT INTO projects (project_name,client_id) VALUES (?,?)",
        [project, client],
        (err, result) => {
            console.log(err)
        }
    )
    res.send("MORE")
})
//add worker
app.post("/addWorker", (req, res) => {
    const worker_name = req.body.worker_name
    const worker_lastname = req.body.worker_lastname
    const pay = req.body.pay
    const specialisation = req.body.specialisation

    mysqlConnection.query(
        "INSERT INTO worker (worker_name, worker_lastname, pay, specialisation) VALUES (?, ?, ?, ?)",
        [worker_name, worker_lastname, pay, specialisation],
        (err, res) => {
            console.log(err)
        }
    )
    res.send("Added successifully")
})
//add Client
app.post("/addClient", (req, res) => {
    const client = req.body.client

    mysqlConnection.query(
        "INSERT INTO client (client_name) VALUES (?)",
        [client],
        (err, res) => {
            console.log(err)
        }
    )
    res.send("Added succesifuly")
})
app.post("/addTask", (req, res) => {
    const task_name = req.body.task_name
    const project_id = Number(req.body.project_id)
    const worker_id = Number(req.body.worker_id)
    const earnings = req.body.earnings
    const costs = req.body.costs
    const date = req.body.date

    mysqlConnection.query(
        "INSERT INTO tasks (task_name, project_id, worker_id, earnings, costs, date) VALUES (?, ?, ?, ?, ?, ?)",
        [task_name, project_id, worker_id, earnings, costs, date],
        (err, res) => {
            console.log(err)
        }
    )
    res.send("Added succesifuly")
})

app.post("/addExpence", (req, res) => {
    const expence_name = req.body.expence_name
    const expence_amount = req.body.expence_amount
    const expence_date = req.body.expence_date
    mysqlConnection.query(
        "INSERT INTO expences (expence_name, expence_amount, expence_date) VALUES (?, ?, ?)",
        [expence_name, expence_amount, expence_date],
        (err, res) => {
            console.log(err)
        }
    )
    res.send("Added succesifuly")
})
//get Client
app.get('/getClient', (req, res) => {
    mysqlConnection.query('SELECT * FROM client', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err);
    })
});
app.get('/getProjects', (req, res) => {
    mysqlConnection.query('SELECT * FROM projects', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err);
    })
});
app.get('/getWorkers', (req, res) => {
    mysqlConnection.query('SELECT * FROM worker', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err);
    })
});
app.get('/getTasks', (req, res) => {
    mysqlConnection.query('SELECT * FROM tasks', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err);
    })
});
app.get('/getExpences', (req, res) => {
    mysqlConnection.query('SELECT * FROM expences', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err);
    })
});




