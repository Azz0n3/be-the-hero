const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        const id = crypto.randomBytes(8).toString('HEX');

        await connection('INCIDENTS').insert({
            id,
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('INCIDENTS')
            .count();

        const incidents = await connection('INCIDENTS')
            .join('ONGS', 'ONGS.id', '=', 'INCIDENTS.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'INCIDENTS.*',
                'ONGS.ong_name',
                'ONGs.email',
                'ONGS.whatsapp',
                'ONGS.city',
                'ONGS.uf'
            ]);

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

    async indexOf(request, response) {
        const { id } = request.params;
        const { page = 1 } = request.query;


        const [count] = await connection('INCIDENTS')
            .count();

        const incidents = await connection('INCIDENTS')
            .join('ONGS', 'ONGS.id', '=', 'INCIDENTS.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'INCIDENTS.*',
                'ONGS.ong_name',
                'ONGs.email',
                'ONGS.whatsapp',
                'ONGS.city',
                'ONGS.uf'
            ])
            .where('ong_id', id);

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('INCIDENTS')
            .select('ong_id')
            .where('id', id)
            .first();


        if (!incident) {
            return response.status(400).json({ error: "Operation not permited - Incident doesnt exists" });
        }

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permited - Incident doesnt belong to this ONG" });
        }

        await connection('INCIDENTS')
            .where('id', id)
            .delete();

        return response.status(204).send();
    }

}