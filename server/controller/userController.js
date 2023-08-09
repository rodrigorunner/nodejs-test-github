const pool = require('../config/db')
const { v4: uuid } = require('uuid')

module.exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT c.client_id, c.client_name, cc.client_whatsapp, cc.client_email, ca.street, ca.city, ca.zipcode FROM client_contact cc INNER JOIN client c ON cc.client_id = c.client_id INNER JOIN client_address ca ON ca.client_id = c.client_id ORDER BY c.client_id ASC")

        res.status(200).json({ users: result.rows })
    } catch (err) {
        console.log(err)
    }
}

module.exports.getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query("SELECT c.client_name, cc.client_whatsapp, cc.client_email, ca.street, ca.city, ca.zipcode FROM client_contact cc INNER JOIN client c ON cc.client_id = c.client_id INNER JOIN client_address ca ON ca.client_id = c.client_id WHERE c.client_id = $1", [id])

        res.status(200).json(result.rows[0])
    } catch (err) {
        console.log(err)
    }
}

module.exports.createUser = async (req, res) => {
    const { client_name, client_whatsapp, client_email, street, city, zipcode } = req.body
    const id = uuid()

    await pool.query("INSERT INTO client(client_id, client_name) VALUES($1, $2)", [id, client_name])

    await pool.query("INSERT INTO client_contact(client_whatsapp, client_email, client_id) VALUES($1, $2, $3)", [client_whatsapp, client_email, id])

    await pool.query("INSERT INTO client_address(street, city, zipcode, client_id) VALUES($1, $2, $3, $4)", [street, city, zipcode, id])

    res.status(200).json({  message: `User created: ${id}` })
}

module.exports.updateUser = async (req, res) => {
    const { client_name, client_email, client_whatsapp, street, city, zipcode } = req.body
    const { id } = req.params

    try {
        await pool.query("UPDATE client SET client_name = $1 WHERE client_id = $2", [client_name, id])

        await pool.query("UPDATE client_contact SET client_email = $1, client_whatsapp = $2 WHERE client_id = $3", [client_email, client_whatsapp, id])

        await pool.query("UPDATE client_address SET street = $1, city = $2, zipcode = $3 WHERE client_id = $4", [street, city, zipcode, id])

        res.status(200).json({ message: `User updated: ${id}` })
    } catch (err) {
        console.log(err)
    }

}

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        await pool.query("DELETE FROM client WHERE client_id = $1", [id])

        res.status(200).json({ id: id })
    } catch (err) {
        console.log(err)
    }
}