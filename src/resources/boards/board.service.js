const bordRepo = require('./board.memory.repository');

const getAll = () => bordRepo.getAll();

module.exports = { getAll };
