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

router.get('/person', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({
            erro: error
        })
    }
})

router.get('/person/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({
            _id: id
        })

        if (!person) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({
            erro: error
        })
    }
})

router.patch('/person/:id', async (req, res) => {
    const id = req.params.id

    const {
        name,
        salary,
        approved
    } = req.body

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
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({
            erro: error
        })
    }
})

router.delete('/person/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({
        _id: id
    })

    if (!person) {
        res.status(422).json({
            message: 'Usuário não encontrado!'
        })
        return
    }

    try {
        await Person.deleteOne({
            _id: id
        })

        res.status(200).json({
            message: 'Usuário removido com sucesso!'
        })
    } catch (error) {
        res.status(500).json({
            erro: error
        })
    }
})

module.exports = router