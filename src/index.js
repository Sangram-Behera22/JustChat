const {server} = require("./app");
const PORT = process.env.PORT || 4000;
server.listen(PORT,"0.0.0.0",() => {
  console.log(`Server is running on port ${PORT}`);
});