const express = require('express')
const app = express()
const port = 5000
const mongoDB= require("./db")
mongoDB();

//An option is set the CORS origin from within server. It is use for connecting to diff server
// CORS is a mechanism that indicates the origin that is allowed access to resources on the server. This is useful to stop unwanted requests to an API from unknown origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/* not in use somthing wrong 
// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Header",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })
*/

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})