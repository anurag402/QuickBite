const express = require('express')
const app = express()
const port = 4000
const connectTo = require('./db.js')
connectTo();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://quick-bite-peach.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use("/api/v1", require("./Routes/createuser.js"));
app.use("/api/v1", require("./Routes/displayData.js"));
app.use("/api/v1", require("./Routes/orderData.js"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})