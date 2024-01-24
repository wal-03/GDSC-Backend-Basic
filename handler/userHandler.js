const {Router} = require('express')

const user = [
    {
        'name': "Barry",
        "age": 24
    }
]
/**
 *  
 * @param {Router} router 
 */

function setupUserHandler(router) {

    router.get('/user', (req, res) => {
        // console.log(req.params, req.query)
        console.log("this is get user")
        res.json({
          "data": user
        })
      })
      return router
}

module.exports = {setupUserHandler}