# frontend React+NextJS app with basic authentication and realtime data visualization.

Basic signup, signin functionality.

Successfull signup logins sets user auth token in cookie. 
all subsequent requests will have token in header for authorization.
for security ssl should be used. not needed for demonstration purposes.

Home page creates a connection to server over websocket.
Initial datapoints are sent on successfull connection.
Simulated realtime data is sent over the connection on regular intervals.


## Quick Start
node >=8 is expected 

```bash
# Install dependencies
npm install
# start project
npm start
# frontend should be available at http://localhost:4000
```

##Tech Stack
1. Reactjs
2. Nextjs,
3. Milligram 
4. socket.io 
5. chart.js 
