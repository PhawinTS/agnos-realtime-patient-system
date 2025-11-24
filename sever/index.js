const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())


const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: '*' }
})


// simple in-memory store for demo
let patients = []
let idCounter = 1


io.on('connection', (socket) => {
    console.log('socket connected', socket.id)


    // Optionally send existing patients
    socket.emit('init:patients', patients)


    socket.on('patient:create', (data, ack) => {
        const newPatient = { id: idCounter++, ...data }
        patients.unshift(newPatient)
        // broadcast to staff (all clients)
        io.emit('patient:created', newPatient)
        if (ack) ack({ success: true, id: newPatient.id })
    })


    socket.on('patient:update', (payload, ack) => {
        const idx = patients.findIndex(p => p.id === payload.id)
        if (idx !== -1) {
            patients[idx] = { ...patients[idx], ...payload }
            io.emit('patient:updated', patients[idx])
            if (ack) ack({ success: true })
        } else {
            if (ack) ack({ success: false, error: 'not found' })
        }
    })


    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id)
    })
})


app.get('/', (req, res) => res.send('Socket server running'))


const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Socket server running on ${PORT}`))