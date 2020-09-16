import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import JWTController from '../app/controllers/JWTController';
import SubjectController from '../app/controllers/SubjectController';

const routes = Router();

routes.get('/token', JWTController.getToken); //Ok
routes.post('/user', UserController.store); // Ok
routes.get('/user', UserController.get); // Ok
routes.delete('/user', UserController.delete); // Ok
routes.post('/subject', SubjectController.store);
routes.get('/subjects', () => {});
routes.get('/:subject/contents', () => {});
routes.get('/:subject/:content', () => {});
routes.get('/check/:subject/:content', () => {});
routes.get('/subjects', () => {});

export default routes;
