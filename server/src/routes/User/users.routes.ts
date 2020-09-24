import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload';

import verifyAuthenticated from '../../middlewares/verifyAuthenticated';

import UserCreateService from '../../services/User/UserCreateService';
import UserUpdateAvatarService from '../../services/User/UserUpdateAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response)=>{
    const { name, email, password } = request.body;

    const createUser = new UserCreateService();

    const user = await createUser.execute({
        name: name,
        email: email,
        password: password
    });

    //Remover a senha para não passar para o front
    delete user.password;

    return response.json(user);
});

usersRouter.patch('/avatar', verifyAuthenticated, upload.single('avatar'), async(request, response) => {
    const updateUserAvatar = new UserUpdateAvatarService();

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
    });
    //Remove o password do json de retorno pro front
    delete user.password;

    return response.json(user);
});

export default usersRouter;