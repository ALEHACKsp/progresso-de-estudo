import { Router } from 'express';

const routes = Router();

routes.post('/login', () => {});
routes.post('/user', () => {});
routes.get('/materias', () => {});
routes.get('/:materia/conteudos', () => {});
routes.get('/:materia/:conteudo', () => {});
routes.get('/check/:materia/:conteudo', () => {});
routes.get('/materias', () => {});

export default routes;
