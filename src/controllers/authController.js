import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import connection from '../db.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try{
        const checkUser = await connection.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkUser.rows[0]) {return res.status(409).send('User already exists');}

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query(`INSERT INTO "users" (name, email, password) VALUES ($1, $2, $3)`, [name, email, hashedPassword]);
       
        res.sendStatus(201);
    } catch (error) {
        res.status(422).send(error);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    const secretKey = process.env.JWT_SECRET;

    try {
        const user = await connection.query("SELECT * FROM users WHERE email = $1", [email]);
        if (!user.rows[0]) { return res.sendstatus(401).send('User not found'); }
        
        if(bcrypt.compare(password, user.rows[0].password)) {
            const data = {name: user.rows[0].name, email: user.rows[0].email, id: user.rows[0].id};
            const token = jwt.sign(data, secretKey);
            
            await connection.query(`INSERT INTO "sessions" ("userId", token) VALUES ($1, $2)`, [user.rows[0].id, token]);
            
            res.status(200).send(token);

        } else{
            res.status(401).send("Wrong password");
        }
    
    } catch (error) {
        res.status(422).send(error);
    }
}