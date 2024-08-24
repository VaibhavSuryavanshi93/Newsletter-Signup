const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(express.static("public")); // it is use for static files like images , CSS  and javascript..
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let email = req.body.email;
    console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            },
        ],
    };

    const SendData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/a111780c33";

    const options = {
      method: "POST",
      auth: "alan1:abfa5206ed5c47ab34bba247061d4db1-us18",
    };

    const request = https.request(url,options,(response)=>{
        response.on("data", (data)=>{ // check the data what data they sent us
            console.log(JSON.parse(data));
        })

    })

    request.write(SendData);
    request.end();


    // res.send("hellooo there...")
    console.log(res.statusCode);
    const status = res.statusCode;
    if (status === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
});
app.post("/failure",(req,res)=>{
    res.redirect("/")
})

const port = 3000;

app.listen(port, () => console.log("Turn on my engine !"));

// https.createServer((req,res)=>{
//     res.writeHead(301,{'Location':'http://localhost:3000/'});
// }).listen(port);