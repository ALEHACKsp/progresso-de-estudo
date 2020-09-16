import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import JWTController from '../app/controllers/JWTController';

const routes = Router();

routes.get('/token', JWTController.getToken);
routes.post('/user', UserController.store);
routes.get('/materias', () => {});
routes.get('/:materia/conteudos', () => {});
routes.get('/:materia/:conteudo', () => {});
routes.get('/check/:materia/:conteudo', () => {});
routes.get('/materias', () => {});

export default routes;
