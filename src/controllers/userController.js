import connection from "../db.js";

export async function getUser(req, res) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    try {
        const urls = await connection.query(`SELECT * FROM "urls" WHERE "userId" = $1`, [id]);
        const urlViews = await connection.query(`SELECT SUM("viewCount") AS "totalViews" FROM "urls" WHERE "userId" = $1`, [id]);
        
        const data = {id, name: user.name, visitCount: urlViews.rows[0].totalViews, shortnedUrls: urls.rows};
        res.status(200).send(data);
    } catch (error) {
        res.sendStatus(404);
    }
}

export async function ranking(req, res) {
    try {
        const users = await connection.query(`SELECT usr."id", usr."name", COUNT(url."id") AS "linksCount",
         COALESCE( SUM(url."viewCount"), 0) AS "visitCount" 
         FROM "users" usr 
         LEFT JOIN "urls" url ON usr."id" = url."userId"
         GROUP BY usr."id", usr."name"
         ORDER BY "visitCount" DESC LIMIT 10`);
        res.status(200).send(users.rows);
    } catch (error) {
        res.sendStatus(404);
    }
}