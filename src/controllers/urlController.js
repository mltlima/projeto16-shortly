import { nanoid } from 'nanoid';

import connection from "../db.js";

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const { user } = JSON.parse(JSON.stringify(res.locals));
    
    try {
        const shortUrl = nanoid(10);
        await connection.query(`INSERT INTO "urls" ("url", "shortUrl", "userId") VALUES ($1, $2, $3)`, [url, shortUrl, user.id]);
        res.status(201).send({shortUrl});
    
    } catch (error) {
        res.status(500).send(error);
    }   
}