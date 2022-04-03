const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

// .env
const PORT = 3001
const JWT_SECRET_KEY = 'MyAccountSecretKey'
const JWT_EXPIRES_IN = '10h'

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(middlewares)

server.post('/auth/login', (req, res) => {
  const { body } = req
  const payload = { phone: body.phone, password: body.password }
  const user = router.db.get('users').find({ phone: payload.phone }).value() || null
  if (user) {
    if (payload.password === user.password) {
      const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN })
      res.status(200).json({ token: accessToken, name: user.name, phone: user.phone, id: user.id })
    } else {
      res.json({ error: 'IncorrectPassword' })
    }
  } else {
    res.json({ error: 'UserNotFound' })
  }
})

server.get('/auth/autologin', (req, res) => {
  const token = req.headers.authorization
  const decodeToken = jwt.verify(token, JWT_SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err))
  if (decodeToken instanceof Error) {
    res.json({ error: 'AutologinTokenError' })
    return
  }
  const user = router.db.get('users').find({ phone: decodeToken.phone }).value() || null

  if (user) {
    if (decodeToken.password === user.password) {
      res.status(200).json({ phone: user.phone, name: user.name, id: user.id })
      return
    }
  }
  res.json({ error: 'AutologinError' })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (!req.headers.authorization) {
    res.json({ error: 'Token not found' })
    return
  }
  try {
    const token = req.headers.authorization
    const decodeToken = jwt.verify(token, JWT_SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err))
    if (decodeToken instanceof Error) {
      res.json({ error: 'Access token not provided' })
      return
    }
    next()
  } catch (err) {
    res.json({ error: 'Error access_token is revoked' })
  }
})

server.use(router)
server.listen(PORT, () => {
  console.log(`JSON Server is running on port: ${PORT}`)
})
