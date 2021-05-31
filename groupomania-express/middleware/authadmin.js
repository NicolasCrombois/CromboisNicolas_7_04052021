const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res , next) =>  {
    try {
        const decodedToken = jsonwebtoken.verify(req.headers.authorization, 't0Ken_Generator-K3y_');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          throw 'L\'id utilisateur n\'est pas correct';
        } else {
          next();
        }
        console.log(userId)
        User.findOne({ where: {id: userId}})
        .then( user => {
          if(user.status == "RH"){
            next()
          }else{
            res.status(401).json('Requête non authentifiée !')
          }
        })
        .catch(error => {
          res.status(500).json(error)
        })
    } catch (error){
        res.status(401).json('Requête non authentifiée !')
    }
}