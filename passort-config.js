const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')  //per cifrare la password

function initialize(passport ,getUserByEmail){
    const authenticateUser = (email,password,done) => {
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, {messaggio: "Nessun utente trovato con questa email"})
        }

        try {
            if(await bcrypt.compare(password,user.password)){
                return done(null, user)
            } else{
                return done(null, false, {messaggio: "password sbagliata"})
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({username: 'email'}), authenticateUser)
    passport.serializeUser((user,done) => {
         
    })
    passport.deserializeUser((id,done) => {
         
    })
}

module.exports = initialize