const express = require('express')
const request = require('request')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(__dirname+'index.html')
})

app.get('/expand', (req, res) => {
    
    let shortUrl = req.query.shortUrl
    if(!shortUrl.startsWith('http')) shortUrl = 'https://' + shortUrl
    
    request(
        {
            url: shortUrl,
            method: "HEAD",
            followAllRedirects: true
        },
        (err, response, body) => {
            if (err) {
                console.log(err)
                res.send("Some error occurred")
            }else{
                res.send(response.request.href)
            }
        }
    )
})

app.listen(3000, ()=>{
    console.log(`Server is listening on port: 3000`)
})