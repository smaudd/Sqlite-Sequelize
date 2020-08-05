const express = require('express')
const app = express()
const port = 3000
const User = require('./model')
const sequelize = require('./db')

app.get('/', async (req, res) => {
    try {
        await sequelize.sync()
        const jisus = await User.create({
            name: 'Juan',
            email: 'foo@bar.com'
        })
    } catch (err) {
        console.log(err)
    }
    res.send('Hello World!')
})

app.get('/find', async (req, res) => {
    try {
        await sequelize.sync()
        const result = await User.findAll({
            // where: {
            //     name: 'Foo'
            // }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.get('/update', async (req, res) => {
    try {
        await sequelize.sync()
        const result = await User.update({ name: 'YII' }, {
            where: {
                name: 'Carlile'
            },
            returning: true,
            plain: true,
        })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
