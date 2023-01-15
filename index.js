const express = require('express')
const axios = require('axios')
const reuqest = require('supertest')

const app = express()
const port = 1630

const url = 'https://api.github.com/users/'


app.get('/', (_, res) => {
  res.send(
    `<h1>Use url/:name to get response</h1>`
  )
})

app.get('/:name', async (req, res) => {
  axios.get(url + req.params.name)
  .then(raw => res.json({
    name: raw.data.login,
    img: raw.data.avatar_url,
    url: raw.data.html_url,
    real_name: raw.data.name,
    bio: raw.data.bio,
    twitter_username: raw.data.twitter_username,
    repos: raw.data.public_repos,
    followers: raw.data.followers,
    following: raw.data.following,
    location: raw.data.location
  }))
  .catch(e => {
    res.json({
      status: e.message.replace(/^\D+/, ''),
      message: 'failed',
      custom_message: 'That user doesn\'t exist',
      error: e
      })
    res.status(400)
  })
})

app.get('/repos/:name', async (req, res) => {
  axios.get(url + req.params.name + '/repos')
  .then(raw => res.json(raw.data.map(getData)))
  .catch(e => {
    res.json({
      status: e.message.replace(/^\D+/, ''),
      message: e.message,
      custom_message: 'That user doesn\'t exist'
      })
    res.status(400)
  })
})

reuqest(app)
.get(`/fallen-dev`)
.expect(200)
.end((error) => {
  if (error) {
    console.error('### SUPERTEST in `/`: ❎ Test failed')
    throw error
  }
  console.log('### SUPERTEST in `/`: ✅ Test passed')
})

reuqest(app)
.get(`/repos/fallen-dev`)
.expect(200)
.end((error) => {
  if (error) {
    console.error('### SUPERTEST in `/repos`: ❎ Test failed')
    throw error
  }
  console.log('### SUPERTEST in `/repos`: ✅ Test passed')
})


app.listen(port, () => console.log(`Server started at http://localhost:${port}`))

function getData(array) {
  const {name, html_url, description, topics, watchers_count, forks_count, open_issues_count} = array
  return {
    name,
    url: html_url,
    description,
    topics,
    views: watchers_count,
    forks: forks_count,
    open_issues: open_issues_count
  }
}
