let express = require('express')
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors')


app.use(cors())
app.options('*', cors()) // include before other routes
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true")
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    next();
});

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    res.send(200);
})
const port = process.env.PORT || 3000; // default port to listen

app.get('/', (req, res) => {
    res.json({success: true})
})

var rpc = require('namecoin-rpc');
app.get('/getInfo', (req, res)=>{
    let name = req.query.name
    var client = new rpc.Client({
        host: 'localhost',
        port: 8336,
        user: 'namecoin',
        pass: 'namecoin',
        timeout: 30000
      });
      client.cmd('name_show',name, function(err, result, resHeaders){
        if (err) return console.log(err);
        result.value = JSON.parse(result.value)
        res.json(result)
      });

      
})




app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})

module.exports = app