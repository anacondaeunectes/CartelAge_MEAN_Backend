const { OAuth2Client } = require('google-auth-library');
const keys = require('../../info.json')

const client = new OAuth2Client( keys.web.client_id );

const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');


// This method gets a token and both verify user identity and generates a JWT
const googleSignIn = async (req, res) => {

    // console.log('22: ', req.header('user-agent'))
    
    const { userToken } = req.body;  

    let usuario;

    try {
        const { name, imgSrc, email } = await googleVerify(userToken);

        //Search the user by it's email in the DB
        usuario = await Usuario.findOne({ email });

        

        //If no user it's found on DB, a new record will be created in DB.
        if(!usuario){

            usuario = await new Usuario({name, imgSrc, email}).save();
            if(usuario){
                console.log('A new user has been succesfully recorded')
            }

        }

        const token = await generarJWT( usuario._id );
        
        res.json({
            usuario,
            // token
        });

        

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }

}

// Google verification by the token previously generated. It returns info about the user.
const googleVerify = async( idToken ) => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: keys.web.client_id
    });

  
    const { name, 
            picture: imgSrc, 
            email
          } = ticket.getPayload();
    
    return { name, imgSrc, email };
} 

// Generates Json web token.
const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, keys.web.client_secret, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

module.exports = {
    googleSignIn
}