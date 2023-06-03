const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
})); //USE BODY-PARSER
app.use(express.static("public")); //CSS - static files

app.get("/", function(res, res) { //get HTML
  res.sendFile(__dirname + "/signup.html");
}); // end of APP.GET

app.post("/", function(req, res) { //BODY-PARSER ITEMS PICKED

  var firstName = req.body.first;
  var lastName = req.body.last;
  var myEmail = req.body.email;

  var data = {
    members: [{
      email_address: myEmail,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data)

  const url = "https://us9.api.mailchimp.com/3.0/lists/01e275d262"

  const options = {
    method: "POST",
    auth: "wilker1:274154d49347882d506a912ba6f1daeb-us9"
  };

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  }); // end of const request (inside APP.POST)

  request.write(jsonData);
  request.end();

}); //end of APP.POST

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() { //confirmation of the active server
  console.log("Server started on port 3000");
}); //end of APP.LISTEN

/*
API KEY
274154d49347882d506a912ba6f1daeb-us9

audience id (list id)
01e275d262
 */
