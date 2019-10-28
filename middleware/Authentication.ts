import * as jwt from "jsonwebtoken";
import express = require('express');

//==================================
//     Verificación del token
//==================================

const SEED = 'TEST_SEED';

export const verifyToken = ( req:express.Request, res:express.Response, next:Function ) => {
  
  const token = <string>req.headers["auth"];

  try {
    res.locals.user = <any>jwt.verify(token, SEED);
    console.log(res.locals.user)
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }
  
  next();
}