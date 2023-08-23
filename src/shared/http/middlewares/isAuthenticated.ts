import auth from "@config/auth";
import AppErro from "@shared/erros/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
):void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppErro('JWT Token is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decodeToken = verify(token, auth.jwt.secret)
    return next()
  } catch (error) {
    throw new AppErro('Invalid JWT Token.')
  }

}