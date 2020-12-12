
const {User} =  require('../sequelize-config');


const getLoginUser = async (req,res)=>{
    try{
        const username = req.body.userName;
        const pass = req.body.password;
        if(username){
            if(pass){
                const userlogged = await User.findOne({where:{
                    userName: username,
                    password: pass
                }})

                if(userlogged){
                    res.status(201).json({message:`${username} logged in successfully`})
                }else
                {
                    res.status(404).json({message:"user not found"})
                }
            }else{
                res.status(400).json({message:"password is mandatory"})
            }
           
        }else{
            res.status(400).json({message:"username is mandatory"})
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

module.exports={getLoginUser}