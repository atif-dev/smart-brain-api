const handleUsers = (db) => (req, res) => {
  //res.send('this is working');
  db.select('*').from('users')
    .then(data =>{
  res.send(data);
  console.log(data)
  })
  // .catch(err => res.json(err))
  .catch(err => res.json("Something is wrong"))
  
}
module.exports = {
  handleUsers
}