const express = require('express')
const axios = require('axios')

const app = express()
const port = 1630

const url = 'https://api.github.com/users/'

app.use((_, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (_, res) => {
  res.json({message: 'Route not found. Please use /<name> to get details of the specified user and /repos/<name> to get the repositories of that user.'})
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
    const status = e.message.replace(/^\D+/, '')
    res.status(+status).json({
    status: status,
    message: e.message,
    custom_message: 'That user doesn\'t exist',
    })
  })
})

app.get('/repos/:name', async (req, res) => {
  axios.get(url + req.params.name + '/repos')
  .then(raw => res.json(raw.data.map(getData)))
  .catch(e => {
    const status = e.message.replace(/^\D+/, '')
    res.status(+status).json({
      status: status,
      message: e.message,
      custom_message: 'That user doesn\'t exist'
    })
  })
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

module.exports = app