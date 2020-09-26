import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import JWTController from '../app/controllers/JWTController';
import SubjectController from '../app/controllers/SubjectController';
import ContentController from '../app/controllers/ContentController';

import LoginMiddleware from '../app/middlewares/LoginMiddleware';
import SubjectOwnerMiddleware from '../app/middlewares/SubjectOwnerMiddleware';
import ContentOwnerMiddleware from '../app/middlewares/ContentOwnerMiddleware';

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
  '/subject/:subjectId',
  LoginMiddleware.userIsLogged, 
  SubjectOwnerMiddleware.userIsOwnerOfThisSubject,
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
  SubjectOwnerMiddleware.userIsOwnerOfThisSubject,
  ContentController.index
); // Ok

routes.post(
  '/:subjectId/content', 
  LoginMiddleware.userIsLogged, 
  SubjectOwnerMiddleware.userIsOwnerOfThisSubject,
  ContentController.store
); // Ok

routes.get(
  '/content/:contentId', 
  LoginMiddleware.userIsLogged, 
  ContentOwnerMiddleware.userIsOwnerOfThisContent,
  ContentController.get
); // Ok

routes.put(
  '/content/:contentId', 
  LoginMiddleware.userIsLogged, 
  ContentOwnerMiddleware.userIsOwnerOfThisContent,
  ContentController.update
);

routes.delete(
  '/content/:contentId/', 
  LoginMiddleware.userIsLogged, 
  ContentOwnerMiddleware.userIsOwnerOfThisContent,
  ContentController.delete
); // Ok

export default routes;
