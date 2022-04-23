// APIs
// POST /api/todos
// Body is in JSON with fields: text, done
// id is autogenerated
// UPDATE /api/todos/{id}
// Body is in JSON with fields: text (optional), done (optional)
// optional = ignore if empty
// DELETE /api/todos/{id}
// GET /api/todos

// ToDo Data Model
// id (unique) : integer
// text : string
// done : boolean
var express = require('express')
var app = express()

app.use(express.json())

// {
//     1: {
//         text: "",
//         done: true
//     }   
//    2: {}
// }
var data = {}

app.get('/api/todos',  function(req, res){
    res.send(data)
})

app.post('/api/todos', function(req, res) {
    const text = req.body.text
    if(text == ''){
        res.status(400).send('Error: text is empty')
        return
    }
    const id = Math.floor((Math.random() * 100) + 1) // generate 1 - 100
    data[id] = {
        text: text,
        done: false
    }

    res.send("todo added")
});

app.put('/api/todos/:id', function (req,res){
      const id = req.params.id;
      const text = req.body.text;
      const done = req.body.done;
      if(id in data) {
         
          if(text !== ''){
          data[id] = {
              text: text,
              done: done,
          }
          res.send('data updated');
          return; }    
      }
      res.status(400).send('Error');
});

app.delete('/api/todos/:id', function(req, res) {
    const id = req.params.id;
    if(id in data) {
    delete data[id]
    res.send('data deleted')
    return; }    
res.status(400).send('Error');
})

app.listen(3000, ()=>{
    console.log("server running")
})

