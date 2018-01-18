import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import crypto from 'crypto'
import api from './api'
import urls from '../urls.json'
import sess_store from 'session-memory-store'
import history from 'connect-history-api-fallback'

let MemoryStore = sess_store(session)
let app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use( session({
        genid: function(req) {
            return crypto.randomBytes(48).toString('hex')
        },
        secret: crypto.randomBytes(128).toString('hex'),
        resave: true,
        saveUninitialized: true,
        store: new MemoryStore()
    })
)

app.use((req, res, next) => {
    console.log(req.originalUrl)
    console.log(req.sessionID)
    next()
})

app.use('/api', api(urls))

app.use(history({
    index: 'index.html'
}))

app.use(express.static('assets'))

app.listen((process.env.PORT || 3000), function () {
    console.log('Listening on port 3000!');
})

export default app
