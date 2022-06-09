const { trainingsSerializes } = require('./training.serialize');
const { usersSerializes } = require('./users.serialize');
const { booksSerializes } = require('./book.serialize');

exports.usersSerializes = usersSerializes;
exports.trainingsSerializes = trainingsSerializes;
exports.booksSerializes = booksSerializes;
