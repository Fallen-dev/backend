# Backend
An rest Api that calls GitHub's Api.

### Usage
This Api has only two endpoints.
| Endpoint | Description |
|--|--|
| `/:name` | Takes one parameter as a user's name and returns the details about the user. |
| `/repos/:name` | Takes same parameter as mentioned above and returns the repositories of the user. |

### Packages used
Express js
axios
nodemon for auto reloading
supertest for unit testing

### Start the project
Clone it
```bash
git clone https://github.com/Fallen-dev/backend.git && cd backend
```
Run the project
```bash
npm start
```
For unit testing
```bash
npm test
```

Open the url `http://localhost:1630` in browser

Use `http://localhost:1630/<name>` to get user's details and `http://localhost:1630/repos/<name>` to get the repositories.