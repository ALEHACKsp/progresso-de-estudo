import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import JWTController from '../app/controllers/JWTController';
import SubjectController from '../app/controllers/SubjectController';
import ContentController from '../app/controllers/ContentController';

import LoginMiddleware from '../app/middlewares/LoginMiddleware';

const routes = Router();

routes.get('/token', JWTController.getToken); //Ok

routes.post('/user', UserController.store); // Ok

routes.get(
  '/user', 
  LoginMiddleware.userIsLogged,
  UserController.get
); // Ok

routes.delete(
  '/user', 
  LoginMiddleware.userIsLogged, 
  UserController.delete
); // Ok

routes.post(
  '/subject', 
  LoginMiddleware.userIsLogged, 
  SubjectController.store
); // Ok

routes.delete(
  '/subject/:id', 
  LoginMiddleware.userIsLogged, 
  SubjectController.delete
); // Ok

routes.get(
  '/subjects', 
  LoginMiddleware.userIsLogged, 
  SubjectController.index
); // Ok

routes.get(
  '/:subjectId/contents', 
  LoginMiddleware.userIsLogged, 
  ContentController.index
); // Ok

routes.post(
  '/:subjectId/content', 
  LoginMiddleware.userIsLogged, 
  ContentController.store
); // Ok

routes.get(
  '/content/:contentId', 
  LoginMiddleware.userIsLogged, 
  ContentController.get
); // Ok

routes.put(
  '/content/:contentId', 
  LoginMiddleware.userIsLogged, 
  ContentController.update
);

routes.delete(
  '/content/:contentId/', 
  LoginMiddleware.userIsLogged, 
  ContentController.delete
); // Ok

export default routes;
