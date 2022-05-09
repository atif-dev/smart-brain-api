const handleProfileGet = (db) => (req, res) => {//advance way of handling req, res
  const {id} = req.params;
  
  db.select('*').from('users').where({
    id: id//with ES6 we can use only id becasue property and value are same.
  }).then(user =>{
    
    if(user.length){
    res.json(user[0])
    }else{
      res.status(400).json('not found')
    }
  })
  .catch(err => res.status(400).json('error getting user'))

}
module.exports = {
  // handleProfileGet: handleProfileGet
  handleProfileGet
}