const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const { ong_name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(16).toString('HEX');

        await connection('ONGS').insert({
            id,
            ong_name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    },

    async index(request, response) {
        const ongs = await connection('ONGS').select('*');
        return response.json(ongs);
    }


}