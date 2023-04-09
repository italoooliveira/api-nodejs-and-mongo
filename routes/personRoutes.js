const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (request, response) => {
    const {
        name,
        salary,
        approved
    } = request.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)

        response.status(201).json({
            message: "Pessoa inserida com sucesso"
        })
    } catch (error) {
        response.status(500).json({
            error: error
        })
    }
})

router.get('/', async (request, response) => {
    try {
        const people = await Person.find()

        response.status(200).json(people)
    } catch (error) {
        response.status(500).json({
            erro: error
        })
    }
})

router.get('/:id', async (request, response) => {
    const id = request.params.id

    try {
        const person = await Person.findOne({
            _id: id
        })

        if (!person) {
            response.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }

        response.status(200).json(person)
    } catch (error) {
        response.status(500).json({
            erro: error
        })
    }
})

router.patch('/:id', async (request, response) => {
    const id = request.params.id

    const {
        name,
        salary,
        approved
    } = request.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({
            _id: id
        }, person)

        if (updatedPerson.matchedCount === 0) {
            response.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }

        response.status(200).json(person)
    } catch (error) {
        response.status(500).json({
            erro: error
        })
    }
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id

    const person = await Person.findOne({
        _id: id
    })

    if (!person) {
        response.status(422).json({
            message: 'Usuário não encontrado!'
        })
        return
    }

    try {
        await Person.deleteOne({
            _id: id
        })

        response.status(200).json({
            message: 'Usuário removido com sucesso!'
        })
    } catch (error) {
        response.status(500).json({
            erro: error
        })
    }
})

module.exports = router