import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const routes = Router();

routes.post('/login', () => {});
routes.post('/user', UserController.store);
routes.get('/materias', () => {});
routes.get('/:materia/conteudos', () => {});
routes.get('/:materia/:conteudo', () => {});
routes.get('/check/:materia/:conteudo', () => {});
routes.get('/materias', () => {});

export default routes;
