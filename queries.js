const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const getIdeas = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        pool.query('SELECT * FROM ideas ORDER BY ideaid ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getIdeaById = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const id = parseInt(request.params.id)
        pool.query('SELECT * FROM ideas WHERE ideaid = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const createIdea = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const { name, cost, ldr_alt, morning, afternoon, evening, overnight } = request.body

        pool.query('INSERT INTO ideas (name, cost, ldr_alt, morning, afternoon, evening, overnight) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, cost, ldr_alt, morning, afternoon, evening, overnight], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Idea added.`)
            console.log(results)
        })
    }
}

const updateIdea = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const id = parseInt(request.params.id)
        const { name, cost, ldr_alt, morning, afternoon, evening, overnight} = request.body

        pool.query(
            'UPDATE ideas SET name = $1, cost = $2, ldr_alt = $3, morning = $4, afternoon = $5, evening = $6, overnight = $7 WHERE ideaid = $8',
            [name, cost, ldr_alt, morning, afternoon, evening, overnight, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Idea modified with ID: ${id}`)
            }
        )
    }
}

const deleteIdea = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const id = parseInt(request.params.id)

        pool.query('DELETE FROM ideas WHERE ideaid = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Delete attempt made for Idea with ideaid of ${id}`)
        })
    }
}

const getIdeasByCostMinMax = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const min = parseInt(request.params.min)
        const max = parseInt(request.params.max)

        pool.query('SELECT * FROM ideas WHERE cost >= $1 AND cost <= $2 ORDER BY ideaid ASC', [min, max], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getIdeasByDayparts = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const morning = request.params.morning == 'true' ? 'morning = true' : ''
        const afternoon = request.params.afternoon == 'true' ? 'afternoon = true' : ''
        const evening = request.params.evening == 'true' ? 'evening = true' : ''
        const overnight = request.params.overnight == 'true' ? 'overnight = true' : ''
        const selectedParts = [morning, afternoon, evening, overnight].filter(item => item).join(' OR ')
        pool.query('SELECT * FROM ideas' + (selectedParts ? ' WHERE ' + selectedParts : '') + ' ORDER BY ideaid ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getIdeasByCostAndDayparts = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const min = parseInt(request.params.min)
        const max = parseInt(request.params.max)
        const morning = request.params.morning == 'true' ? 'morning = true' : ''
        const afternoon = request.params.afternoon == 'true' ? 'afternoon = true' : ''
        const evening = request.params.evening == 'true' ? 'evening = true' : ''
        const overnight = request.params.overnight == 'true' ? 'overnight = true' : ''
        const selectedParts = [morning, afternoon, evening, overnight].filter(item => item).join(' OR ')
        pool.query('SELECT * FROM ideas WHERE cost >= $1 AND cost <= $2' + (selectedParts ? ' AND (' + selectedParts + ')' : '') + ' ORDER BY ideaid ASC', [min, max], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

module.exports = {
    getIdeas,
    getIdeaById,
    createIdea,
    updateIdea,
    deleteIdea,
    getIdeasByCostMinMax,
    getIdeasByDayparts,
    getIdeasByCostAndDayparts
}