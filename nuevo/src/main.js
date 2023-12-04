import express from 'express'
import { PORT } from './config.js'

const app = express();
app.use

const palabras = ['Frase', 'Inicial']

app.get('/api/frase', (req, res) => {
    res.json({
        frase: palabras.join(' ')
    })
})

app.get('/palabra/posicion/:pos', (req, res) => {
    const posicion = parseInt(req.params.pos)
    if(posicion >= 0 && posicion <= palabras.length) {
        res.json({
            buscada: palabras[posicion -1]
        })
    } else {
        res.json({
            error: 'Invalid posicion'
    })
}})

app.post('/api/palabras', (req, res) => {
    const palabra = req.body.palabra
    if (palabra) {
        palabra.push(palabra)
        res.json({
            agregada: palabra,
            pos: palabras.length
        })
    } else {
        res.json({
            error: 'palabra agregada invalida'
    })
}})

const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
