const jwt= require('jsonwebtoken');

module.exports.verificacionUsuario=async (req,res,next)=>{
    let token=req.headers.authorization;
    console.log(token);
    if(token!=undefined){
        let tokenCheck=token.split(' ')[1];
        let resultado=jwt.verify(tokenCheck,process.env.SECRET_KEY);
        if(resultado){
            return next
        }else{
            throw new Error ('token no valido')
        }
    }else{
        res.status(400).json('Este sistema es privado necesitas un token para acceder');
    }
}