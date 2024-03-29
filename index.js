/*
    SET UP THE CLIENT
*/
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Passw0rd!',
    database: 'postgres'
});

client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

/*  
    SET UP THE EXPRESS APPLICATION
*/
import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/*
    SET UP THE ROUTES
*/
app.get('/', (req, res) => {

    const today = new Date().toISOString().split('T')[0]; 

    const query = {
        text: 'SELECT * FROM crm.companies WHERE next_date = $1',
        values: [today],
    };

    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        } else {
            res.render('index', { companies: result.rows, today: today });
        }
    });
});

// For inserting a new company
app.post('/submit_form', (req, res) => {
    const { url, contact, email, phone, notes, company, position } = req.body;
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);

    const query = {
        text: 'INSERT INTO crm.companies(url, contact, email, phone, notes, next_date, company, position) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [url, contact, email, phone, notes, nextDate, company, position],
    };

    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        } else {
            console.log('Row inserted');
            res.status(200).send('Row inserted');
        }
    });
});




// Company name search

app.get('/search', async (req, res) => {
    const { search } = req.query;
    const result = await client.query('SELECT * FROM crm.companies WHERE company LIKE $1', [`%${search}%`]);
    res.render('index', { companies: result.rows });
});



app.post('/update_company/:id', (req, res) => {
    const { id } = req.params;
    const { url, contact, email, phone, notes, company, position } = req.body;

    const query = {
        text: 'UPDATE crm.companies SET url = $1, contact = $2, email = $3, phone = $4, notes = $5, company = $6, position = $7 WHERE company_id = $8',
        values: [url, contact, email, phone, notes, company, position, id],
    };

    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        } else {
            console.log('Row updated');
            res.status(200).send('Row updated');
        }
    });
});
//
app.get('/company/:id', (req, res) => {
    const { id } = req.params;

    const query = {
        text: 'SELECT * FROM crm.companies WHERE company_id = $1',
        values: [id],
    };

    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        } else {
            res.render('company', { company: result.rows[0] });
        }
    });
});