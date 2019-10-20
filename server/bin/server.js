const app = require('../app/index');

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}`));