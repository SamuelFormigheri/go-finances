import { Router } from 'express';

import UserAuthenticateService from '../../services/User/UserAuthenticateService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response)=>{   
    const { email, password } = request.body;

    const authenticateUser = new UserAuthenticateService();

    const authCredentials = await authenticateUser.execute({
        email: email,
        password: password
    });

     //Remover a senha para não passar para o front
     delete authCredentials.user.password;

    return response.json(authCredentials);
});

export default sessionsRouter;