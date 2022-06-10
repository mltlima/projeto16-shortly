import connection from "../db.js";

export async function getUser(req, res) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    try {
        //const user = await connection.query(`SELECT * FROM "users" WHERE "id" = $1`, [id]);

        const urls = await connection.query(`SELECT * FROM "urls" WHERE "userId" = $1`, [id]);
        const urlViews = await connection.query(`SELECT SUM("viewCount") AS "totalViews" FROM "urls" WHERE "userId" = $1`, [id]);
        
        const data = {id, name: user.name, visitCount: urlViews.rows[0].totalViews, shortnedUrls: urls.rows};
        res.status(200).send(data);
    } catch (error) {
        res.sendStatus(404);
    }
}