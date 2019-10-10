var express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog_exercise', { useNewUrlParser: true })

var blogSchema = new mongoose.Schema({
   title: String,
   subject: String,
   image: String,
   text: String
})

var Blog = mongoose.model('Blog', blogSchema)

app.set('view engine', 'ejs')
app.use(express.static('public'))

// Returns key-value pairs from the submitting form, see bodyParser.urlencoded([options])
app.use(bodyParser.urlencoded({ extended: true }))

//=======================
//       ROUTES
//=======================

// RE-DIRECTS TO LANDING PAGE
app.get('/', (req, res) => {
   var numBlogs = Blog.count('blogs')
   // numBlogs = numBlogs.length
   console.log(numBlogs)
   res.render('landing', { numBlogs: numBlogs })
})

// INDEX ROUTE
app.get('/blogs', (req, res) => {
   res.render('index')
})


app.get('/blogs/subjects', (req, res) => {
   Blog.find({}, (err, blog) => {
      res.render('subjects', {blog: blog})
   })
})

app.post('/blogs', (req, res) => {
   // var data = {title: req.body.title,
   //             subject: req.body.subject,
   //             image: req.body.image,
   //             text: req.body.text}
   var data = req.body.blog
   Blog.create(data, (err, blog) => {
      if (err) { err }
      else { res.render('show', { blog: blog }) }
   })
})

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
   res.render('new')
})

// SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
   var blog = req.query.title
   res.render('show', { blog: blog })
})

//=======================
//       ROUTES
//=======================
app.listen(3000, process.env.IP, () => {
   console.log('The JRS Day 1 Blog Exercise server has started...')
})