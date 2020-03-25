const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong =  await connection('ONGS')
        .where('id', id)
        .select('ong_name')
        .first();

        if (!ong) {
            return response.status(400).json({ error: 'Operation not permited - ONG not find' });
        }

        return response.json(ong);

    },

}