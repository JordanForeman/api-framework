import { verify } from 'jsonwebtoken';
import { secret } from 'config';

import { FORBIDDEN } from '../constant/HTTPStatusCodes';

export default async (request, response, next) => {
    const token = request.headers['x-access-token'];

    if (token) {
        request.user = await verify(token, secret);

        next();
    } else {
        response.status(FORBIDDEN);
        response.json({ message: 'Must be authorized to view this resource' });
    }
};