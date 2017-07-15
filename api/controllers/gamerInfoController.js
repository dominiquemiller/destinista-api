exports.sign_in = (req, res) => {
  console.log(req.body);      // your JSON
  res.send(req.body);
};