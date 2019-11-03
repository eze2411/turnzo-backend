import * as jwt from "jsonwebtoken";
import express = require('express');
import User from "../DTO/User";

//==================================
//     Verificación del token
//==================================

const SEED = 'TEST_SEED';

export const verifyToken = ( req:express.Request, res:express.Response, next:Function ) => {
  
  const token = <string>req.headers["auth"];

  try {
    let desencrypted = <any>jwt.verify(token, SEED);
    res.locals.user = desencrypted.user
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({
      message: "Authentication has failed"
    });
    return;
  }
  
  next();
}

//==================================
//     Verificación del rol
//==================================
export const verifyAdminRole = (req:express.Request, res:express.Response, next:Function ) =>{

  let user = res.locals.user

  if(user.role === 'ADMIN'){
    next();
  }else {
    res.status(401).json({
      ok: false,
      err: {
        message: 'You are not allow, please log in with the proper user'
      }
    })
  }
}