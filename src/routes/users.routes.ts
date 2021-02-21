import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/createUserService';
import GetUserService from '../services/getUserService';
import DeleteUserService from '../services/deleteUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    const { username, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
        email,
        password,
        username,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.get('/', async (request, response) => {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
    const { id } = request.params;
    const getUserService = new GetUserService();
    const user = await getUserService.execute(id);

    delete user.password;

    return response.json(user);
});

usersRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute(id);

    return response.status(204).send();
});

export default usersRouter;
