const list = require('./list');
const auth = require('./auth');
const list_item_map = require('./list_item_map');
const setting = require('./setting');
module.exports = app => {
  app.use('/api/list', list);
  app.use('/api/auth', auth);
  app.use('/api/setting', setting);
  app.use('/api/listItemMap', listItemMap);
}
