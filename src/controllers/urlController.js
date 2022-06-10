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
        res.status(422).send(error);
    }   
}

export async function getShortenedUrl(req, res) {
    const { id } = req.params;
    
    try {
        const url = await connection.query(`SELECT * FROM "urls" WHERE "id" = $1`, [id]);
        const data = {id, shortUrl: url.rows[0].shortUrl, url: url.rows[0].url};

        res.status(200).send(data);

    } catch (error) {
        res.sendStatus(404);
    }
}

export async function getUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const url = await connection.query(`SELECT * FROM "urls" WHERE "shortUrl" = $1`, [shortUrl]);
        
        await connection.query(`UPDATE "urls" SET "viewCount" = "viewCount" + 1 WHERE "id" = $1`, [url.rows[0].id]);	

        res.redirect(url.rows[0].url);
        
    } catch (error) {
        res.sendStatus(404)
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    try {
        const url = await connection.query(`SELECT * FROM "urls" WHERE "id" = $1`, [id]);
        if (url.rows[0].userId !== user.id) {
            return res.sendStatus(401);
        } 

        await connection.query(`DELETE FROM "urls" WHERE "id" = $1`, [id]);
        res.sendStatus(204);

    } catch (error) {
        res.sendStatus(404);
    }
}