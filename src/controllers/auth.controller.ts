import { Request, Response } from 'express';
import * as Yup from 'yup';

type TRegister = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const registerValidateSchema = Yup.object({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required()
})

export default {
    async register (req: Request, res: Response) {
        const { 
            fullName, 
            username, 
            email, 
            password, 
            confirmPassword 
        } = req.body as unknown as TRegister;
        

        try {
            await registerValidateSchema.validate({ 
                fullName, 
                username, 
                email, 
                password, 
                confirmPassword })
            return res.status(200).json({ 
                message: 'User registered successfully',
                data: { fullName, username, email }
            })
        } catch (error) {
           const err = error as unknown as Error;
              return res.status(400).json({ 
                message: err.message,
                data: null
              })
        }
    }
}