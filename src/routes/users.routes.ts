import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import GetUserService from '../services/GetUserService';
import DeleteUserService from '../services/DeleteUserService';

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
