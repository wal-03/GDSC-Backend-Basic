const {Router} = require('express')
var {getRandomInt} = require('../utils/randomNumber.js')
const {mylogger} = require('../middleware/logger.js')
const {checkInput} = require('../middleware/inputCheck.js')

const posts = []

/**
 * 
 * @param {Router} router 
 */
function setupPostHandler(router) {

    router.get('/', mylogger, (req, res) => {
        console.log(req.params, req.query)
        res.json({
          "data": posts
        })
      })
      
    router.post('/', (req, res) => {
        console.log(req.body)
        posts.push({
          "id": getRandomInt(9999999999999),
          "name": req.body.name,
          "age": req.body.age,
          "create_at": req.requestTime
      })
        res.json({
          "message": "success"
        })
      })
      
    router.put('/:postId', checkInput, (req, res) => {
      // res.send('Got a PUT request at /user')

      console.log(req.params.postId)

      const { title, description } = req.body

      for(let i = 0; i < posts.length; i++) {
          if(posts[i].id == req.params.postId) {
              if(title) {
                  posts[i].title = title
              }

              if(description) {
                  posts[i].description = description
              }
    
              res.end(JSON.stringify({
                  status: true,
                  message: "Successfully update data"
              }))
              return
          }
      }

      res.json({
          "message": `post with id ${req.params.postId} is not found`
      })

  })
      
    router.delete('/:postId', (req, res) => {
      
        console.log(req.params.postId)
      
        for(let i = 0; i < posts.length; i++) {
          if(posts[i].id == req.params.postId) {
            posts.splice(i, 1)
      
            res.end(JSON.stringify({
              status: true,
              message: "Successfully update data"
            }))
            return
          }
        }
      
        res.json({
          "message": `post with id ${req.params.postId} is not found`
        })
      })
      return router
}

module.exports = {setupPostHandler}