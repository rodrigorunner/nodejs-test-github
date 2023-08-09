const pool = require('../config/db')

module.exports.getPetById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query("SELECT c.client_id, a.animal_id, a.animal_name, a.animal_age, a.animal_breed, a.animal_type FROM animal a INNER JOIN client c ON a.client_id = c.client_id WHERE a.animal_id = $1", [id])
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.log(err)
    }
}
