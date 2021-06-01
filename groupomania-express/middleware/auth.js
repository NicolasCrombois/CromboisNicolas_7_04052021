const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res , next) =>  {
    try {
        const decodedToken = jsonwebtoken.verify(req.headers.authorization, 't0Ken_Generator-K3y_');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          throw 'L\'id utilisateur n\'est pas correct';
        } else {
          next();
        }
    } catch (error){
        res.status(401).json({error : 'Requête non authentifiée !'})
    }
}