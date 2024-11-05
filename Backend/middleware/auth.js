import jwt from 'jsonwebtoken'

const authMiddlewere=async (req, res ,next)=>{

// get token from user using the headers
const {token} = req.headers;

//check token 
if(!token){
    return res.json({success:false, message:"Not Authorized Login Again"})
}
//if token available we will decode token
try {
  const token_decode=jwt.verify(token, process.env.JWT_SECRET);
  //when we decoded we have to get userId from dbs.from userid we can add, remove or get cart data

  //this will convert token to userid
  req.body.userId= token_decode.id;
  next();
} catch (error) {
   console.log(error);
  
   res.json ({success:false,message:"Error"})
}

}

export default authMiddlewere;