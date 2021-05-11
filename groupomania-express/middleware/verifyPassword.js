module.exports = (req, res, next) => {
    const errors = []
    if (req.body.password.length < 8){
        errors.push('contenir au moins 8 caractères')
    } $
    re = '/[a-z]/';
    if (!re.test(req.body.password)){
        errors.push('avoir au moins une minuscule')
    } 
    re = '/[A-Z]/';
    if (!re.test(req.body.password)){
        errors.push('avoir au moins une majuscule')
    } 
    re = '/[0-9]/';
    if (!re.test(req.body.password)){
        errors.push('avoir au moins un chiffre')
    }
    return errors;
};