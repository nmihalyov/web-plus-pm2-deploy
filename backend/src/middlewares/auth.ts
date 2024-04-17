import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config';
import UnauthorizedError from '../errors/unauthorized-error';

interface JwtPayload {
  _id: string
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.jwt || req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError('Токен не передан');
    }
    token = token.replace('Bearer ', '');
    let payload: JwtPayload | null = null;

    payload = jwt.verify(token, JWT_PRIVATE_KEY) as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

export default auth;
