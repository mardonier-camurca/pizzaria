import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string         //sub tem o id do usuário 
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
)
{

    // receber o token
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try {
        // validar o todken
        const { sub} = verify(   // sub - para pegar o id do usuário
            token,
            process.env.JWT_SECRET
        ) as Payload; // vai devolver o tipo Payload

        // Recuperar o id do token e colocar dentro de uma variável user_id dentro do req (request)
        req.user_id  = sub;

        return next();

    } catch (err) {
        return res.status(401).end();
    }
    
}