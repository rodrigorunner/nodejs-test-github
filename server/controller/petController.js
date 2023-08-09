const pool = require('../config/db')

module.exports.getPet = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query("SELECT c.client_id, a.animal_id, a.animal_name, a.animal_age, a.animal_breed, a.animal_type FROM animal a INNER JOIN client c ON a.client_id = c.client_id WHERE c.client_id = $1", [id])
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
    }
}

module.exports.createPet = async (req, res) => {
    const { animal_name, animal_age, animal_type, animal_breed } = req.body
    const { id } = req.params

    try {
        await pool.query("INSERT INTO animal(animal_name, animal_age, animal_type, animal_breed, client_id) VALUES($1, $2, $3, $4, $5)", [animal_name, animal_age, animal_type, animal_breed, id])
    
        res.status(201).json({ message: `Pet created by user : ${id}` })
    } catch (err) {
        console.log(err)
    }
}

module.exports.updatePet = async (req, res) => {
    const { animal_name, animal_age, animal_type, animal_breed } = req.body
    const { id } = req.params

    try {
        await pool.query("UPDATE animal SET animal_name = $1, animal_age = $2, animal_type = $3, animal_breed = $4 WHERE animal_id = $5", [animal_name, animal_age, animal_type, animal_breed, id])

        res.status(200).json({ message: `Pet updated: ${id}` })
    } catch (err) {
        console.log(err)
    }
}

module.exports.deletePet = async (req, res) => {
    const { id } = req.params
    try {
        await pool.query("DELETE FROM animal WHERE animal_id = $1", [id])

        res.status(200).json({ id: id })
    } catch (err) {
        console.log(err)
    }
}


