import { Router } from 'express';
import { userControllers } from '.';

const router = Router();

router.post('/users', (request, response) => {
  return userControllers.createUser(request, response);
})

export { router }

