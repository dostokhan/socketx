# Backend api for auth endpoints and socket connection for getting realtime data

On start this drops db tables(user, datapoint) and create 2 users user1 and user2 with username as password.
Also a script starts seeding datapoint table for available users from usertable at random(1-5) seconds interval.

2 REST endpoints for signup and signin
`/v1/auth/signup`  and `v1/auth/signin`

json webtoken is used for authentication and expected in request headers.

Socket connection is available at port **4004**.

## Quick Start
node >=8 is expected and a mongodb instance should be running.


```bash
# Install dependencies
npm install
# start project
npm start
# api should be available at http://localhost:8000
```

## Tech Stack
1. Expressjs as backend framework
2. bcrypt for hashing password 
3. mongoose as ORM.
4. socket.io for socket connections.
5. dotenv, jsonwebtoken, nodemon and others.
