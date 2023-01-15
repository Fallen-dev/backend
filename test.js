const reuqest = require('supertest')
const app = require('./index')

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