const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3000;
const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,"build")))

const pool = new Pool ({
    // user:'bhernandezortiz',
    // password:'',
    // port: 5432,
    // database:'task_list',
    // host:'localhost'
    connectionString: process.env.DATABASE_URL,
})

pool.connect();

app.get("/", (req,res) => {
    try {
        res.sendFile(path.join(__dirname, "build","index.html"));
    }catch(error){
        console.error(error)
    }
});

app.route('/home')
.get(async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM task_list ORDER BY id ASC");
        res.status(200).type('application/json').json(result.rows)
    } catch (err) {
            console.log(err.message)
        }
    })
    .post(async (req, res) => {
        let {task} = req.body
        try {
            const newTask = await pool.query(`INSERT INTO task_list (task) VALUES ('${task}') RETURNING *`);
            const rows = newTask.rows
            res.status(201).send(rows)
        }catch(err){
            console.log(err.message)
        }
    })

app.route('/home/:id')
    .get (async(req,res) => {
        const id = req.params.id
        try{
            const task = await pool.query(`SELECT * FROM task_list WHERE id = ${id}`);
            const rows = task.rows
            res.status(200).send(rows)
        }catch(err){
            console.log(err.message)
        }
    })

    .delete(async (req, res) => {
        const id = req.params.id
        try{
            const deleted = await pool.query(`DELETE FROM task_list WHERE id = ${id} RETURNING *`)
            const rows = deleted.rows
            res.send(rows)
        }catch(err){
            console.log(err.message)
        }
    })

    .put (async(req, res) => {
        try{
            const id = req.params.id
            const {task} = req.body
            const result = await pool.query(`SELECT * FROM task_list where id = ${id}`);
            if (result.rows.length === 0){
                res.status(404).type('text/plain').send('Not found')
            }else{
                const edit = await pool.query(`UPDATE task_list SET task = '${task}' WHERE id = '${id}' RETURNING *`);
                const rows = edit.rows
                res.send(rows)
            }
        }catch(err){
            console.log(err.message)
        }
    })

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })