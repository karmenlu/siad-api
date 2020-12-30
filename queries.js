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
        const { name, cost, ldr_alt } = request.body

        pool.query('INSERT INTO ideas (name, cost, ldr_alt) VALUES ($1, $2, $3)', [name, cost, ldr_alt], (error, results) => {
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
        const { name, cost, ldr_alt } = request.body

        pool.query(
            'UPDATE ideas SET name = $1, cost = $2, ldr_alt = $3 WHERE ideaid = $4',
            [name, cost, ldr_alt, id],
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

const getDayparts = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        pool.query('SELECT * FROM dayparts ORDER BY daypartid ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getIdeaToParts = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        pool.query('SELECT * FROM ideatoparts ORDER BY ideatopartid ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getIdeaToPartById = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const id = parseInt(request.params.id)
        pool.query('SELECT * FROM ideatoparts WHERE ideatopartid = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const createIdeaToPart = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const { ideaid, daypartid } = request.body

        pool.query('INSERT INTO ideatoparts (ideaid, daypartid) VALUES ($1, $2)', [ideaid, daypartid], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`IdeaToPart added.`)
            console.log(results)
        })        
    }
}

const updateIdeaToPart = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const id = parseInt(request.params.id)
        const { ideaid, daypartid } = request.body

        pool.query(
            'UPDATE ideatoparts SET ideaid = $1, daypartid = $2 WHERE ideatopartid = $3',
            [ideaid, daypartid, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`IdeaToPart modified with ID: ${id}`)
            }
        )
    }
}

const deleteIdeaToPart = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const id = parseInt(request.params.id)

        pool.query('DELETE FROM ideatoparts WHERE ideatopartid = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Delete attempt made for IdeaToPart with ideatopartid of ${id}`)
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

const getDaypartIdByDaypartName = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        pool.query('SELECT daypartid FROM dayparts WHERE name = $1', [request.params.name], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getIdeasByDaypartId = (request, response) => {
    if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
        response.status(401).json({status: 'error', message: 'Unauthorized. Missing/incorrect API key.'})
    } else {
        const daypartid = parseInt(request.params.daypartid)
        pool.query('SELECT * FROM ideas WHERE ideaid IN (SELECT ideaid FROM ideatoparts WHERE daypartid = $1) GROUP BY ideaid', [daypartid],(error, results) => {
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
    getDayparts,
    getIdeaToParts,
    getIdeaToPartById,
    createIdeaToPart,
    updateIdeaToPart,
    deleteIdeaToPart,
    getIdeasByCostMinMax,
    getDaypartIdByDaypartName,
    getIdeasByDaypartId,
}