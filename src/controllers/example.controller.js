const { exampleService: service } = require('../services');

const getSomeObject = async (req, res) => {
  const someObject = await service.addSomeObject();
  res.status(200).send(someObject);

  // никаких ошибок тут обрабатывать не нужно
  // задача получить успешный ответ и передать его на клиент
  // основаную логику и обработку ошибок переносите в сервис
};

exports.exampleController = {
  getSomeObject,
};
