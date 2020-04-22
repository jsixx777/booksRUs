import * as express from 'express';
//import DB from '../db';
import authRouter from './auth';
import apiRouter from './api';
import * as stripeLoader from 'stripe'
import * as mailgunLoader from 'mailgun-js'
import config from '../config';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', apiRouter); 

const stripe = new stripeLoader (config.apiKeys.stripe)
const charge = (token: string, amt: number) => {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'statement description'
    })
}
router.post('/api/donate', async (req,res,next) => {
    try{
        let data = await charge(req.body.token.id, req.body.amount)
        console.log(data);
        res.send('Charged!');
    }catch(e){
        console.log(e);
        res.status(500);
    }
})

let mailgun = mailgunLoader({
    apiKey: config.apiKeys.mailGun,
    domain: config.apiKeys.mailGunDomain
})

const sendEmail = (to: string, from: string, subject: string, content: string) => {
    let data = {
        to,
        from,
        subject,
        text: content
    };
    return mailgun.messages().send(data)
};
router.post('/api/contact', async (req,res,next) =>{
    try{
        await sendEmail('jsixx77@hotmail.com', 'no-reply@test.com', 'Welcome', req.body.message)
        res.send('Email has been sent');
    }catch(e){
        console.log(e);
        res.status(500);
    }
})
export default router;