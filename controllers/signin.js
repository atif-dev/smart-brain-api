const handleSignin = (req, res, db, bcrypt)=> {

// Load hash from your password DB.
// bcrypt.compare("apples", '$2b$10$X2t7tBgJa60h8sFYTBfia.clmtq/TtCCiMacV7.Vemg6LvlRFUuiK', function(err, result) {
//     console.log('first:',result)
// });
// bcrypt.compare('someOtherPlaintextPassword', '$2b$10$X2t7tBgJa60h8sFYTBfia.clmtq/TtCCiMacV7.Vemg6LvlRFUuiK', function(err, result) {
//     console.log('second:',result)
// });
  const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json('incorrect form submission')
  }

  db.select('email', 'hash').from('login')
    .where('email' , '=' , email)
    .then(data =>{
      // console.log(data)
      const isValid = bcrypt.compareSync(password, data[0].hash);
      // console.log(isValid)
      if(isValid){
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user =>{
            // console.log(user)
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      }else{
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}
module.exports = {
  // handleSignin: handleSignin
  handleSignin //shorthand
}