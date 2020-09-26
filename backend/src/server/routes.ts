import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import JWTController from '../app/controllers/JWTController';
import SubjectController from '../app/controllers/SubjectController';
import ContentController from '../app/controllers/ContentController';

const routes = Router();

routes.get('/token', JWTController.getToken); //Ok

routes.post('/user', UserController.store); // Ok
routes.get('/user', UserController.get); // Ok
routes.delete('/user', UserController.delete); // Ok

routes.post('/subject', SubjectController.store); // Ok
routes.delete('/subject/:id', SubjectController.delete); // Ok
routes.get('/subjects', SubjectController.index); // Ok

routes.get('/:subjectId/contents', ContentController.index); // Ok
routes.post('/:subjectId/content', ContentController.store); // Ok
routes.get('/content/:contentId', ContentController.get); // Ok
routes.put('/content/:contentId', ContentController.update);
routes.delete('/content/:contentId/', ContentController.delete); // Ok

export default routes;
