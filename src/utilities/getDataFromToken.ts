import {NextRequest} from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getDataFromToken = (token: string): JwtPayload | undefined => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      return decodedToken as JwtPayload; 
    } catch (err: any) {
      console.log(err);
      return undefined;
    }
  };