import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import JWTController from '../app/controllers/JWTController';
import SubjectController from '../app/controllers/SubjectController';
import ContentController from '../app/controllers/ContentController';

import LoginMiddleware from '../app/middlewares/LoginMiddleware';
import SubjectOwnerMiddleware from '../app/middlewares/SubjectOwnerMiddleware';
import ContentOwnerMiddleware from '../app/middlewares/ContentOwnerMiddleware';
import RequestValidationErrorMiddleware from '../app/middlewares/RequestValidationErrorMiddleware';

import TokenValidator from '../app/validators/TokenValidator';
import UserValidator from '../app/validators/UserValidator';
import SubjectValidator from '../app/validators/SubjectValidator';
import ContentValidator from '../app/validators/ContentValidator';

const routes = Router();

routes.get(
  '/token',

  //Validators
  TokenValidator.get,

  //Middlewares
  RequestValidationErrorMiddleware.hasError, 
  
  //Controller method
  JWTController.getToken
); //Ok

routes.post(
  '/user', 

  UserValidator.create,

  RequestValidationErrorMiddleware.hasError,

  UserController.store
); // Ok

routes.get(
  '/user',

  TokenValidator.passedToken,

  RequestValidationErrorMiddleware.hasError, 

  LoginMiddleware.userIsLogged,

  UserController.get
); // Ok

routes.delete(
  '/user', 
  TokenValidator.passedToken,

  RequestValidationErrorMiddleware.hasError, 

  LoginMiddleware.userIsLogged,

  UserController.delete
); // Ok

routes.post(
  '/subject', 

  TokenValidator.passedToken,
  SubjectValidator.create,

  RequestValidationErrorMiddleware.hasError, 
  LoginMiddleware.userIsLogged,

  SubjectController.store
); // Ok

routes.delete(
  '/subject/:subjectId',
  
  TokenValidator.passedToken,
  SubjectValidator.delete,

  RequestValidationErrorMiddleware.hasError, 
  LoginMiddleware.userIsLogged,
  SubjectOwnerMiddleware.userIsOwnerOfThisSubject,
  
  SubjectController.delete
); // Ok

routes.get(
  '/subjects', 
  
  TokenValidator.passedToken,
  
  RequestValidationErrorMiddleware.hasError, 
  
  LoginMiddleware.userIsLogged,
  
  SubjectController.index
); // Ok

routes.get(
  '/:subjectId/contents', 
  
  TokenValidator.passedToken,
  ContentValidator.index,
  
  RequestValidationErrorMiddleware.hasError, 
  LoginMiddleware.userIsLogged,
  SubjectOwnerMiddleware.userIsOwnerOfThisSubject,
  
  ContentController.index
); // Ok

routes.post(
  '/:subjectId/content', 
  
  TokenValidator.passedToken,
  ContentValidator.store,
  
  RequestValidationErrorMiddleware.hasError, 
  LoginMiddleware.userIsLogged,
  SubjectOwnerMiddleware.userIsOwnerOfThisSubject,
  
  ContentController.store
); // Ok

routes.get(
  '/content/:contentId', 
  
  TokenValidator.passedToken,
  ContentValidator.get,
  
  RequestValidationErrorMiddleware.hasError, 
  LoginMiddleware.userIsLogged,
  ContentOwnerMiddleware.userIsOwnerOfThisContent,
  
  ContentController.get
); // Ok

routes.put(
  '/content/:contentId', 
  
  TokenValidator.passedToken,
  ContentValidator.update,
  
  RequestValidationErrorMiddleware.hasError, 
  LoginMiddleware.userIsLogged,
  ContentOwnerMiddleware.userIsOwnerOfThisContent,
  
  ContentController.update
);

routes.delete(
  '/content/:contentId/', 
  
  TokenValidator.passedToken,
  ContentValidator.delete,
  
  RequestValidationErrorMiddleware.hasError, 
  LoginMiddleware.userIsLogged,
  ContentOwnerMiddleware.userIsOwnerOfThisContent,
  
  ContentController.delete
); // Ok

export default routes;
