import prisma from '@shared/database/prismaClient'
import { stripe } from '@shared/lib/stripe'
import { Request, Response } from 'express'
import Stripe from 'stripe'

async function StripeWebHook(req: Request, res: Response) {
  const signature = req.headers['stripe-signature']

  if (!signature) return res.status(400).send('Missing Stripe Signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error: any) {
    return res.status(400).send(`Webhook error: ${error.message}`)
  }

  const session = event.data.object as Stripe.PaymentIntent

  switch (event.type) {
    case 'checkout.session.completed':
      await prisma.rentals.update({
        where: {
          id: session.id
        },
        data: {
          status: session.status
        }
      })
      break
    case 'payment_intent.payment_failed':
      console.log({ message: 'Pagamento falho' })
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
      break
  }

  // const type = event.type

  // console.log('Evento recebido: ', type)

  res.json({ ok: true })

  // const signature = req.headers['stripe-signature']
  // if (!signature) return console.log('Missing stripe signature')
  // let event: Stripe.Event
  // try {
  //   event = stripe.webhooks.constructEvent(
  //     req.body,
  //     signature as string,
  //     process.env.STRIPE_WEBHOOK_SECRET as string
  //   )
  // } catch (err: any) {
  //   return res.status(400).send(`Webhook error: ${err?.message} `)
  // }
  // console.log(event)
  // res.send()
  // const { type } = event
  // switch (type) {
  //   case 'checkout.session.completed':
  //     console.log({
  //       message: 'Pagamento ocorreu com sucesso.'
  //     })
  //     break
  //   default:
  //     console.log(`Unhandled event type ${event.type}`)
  //     break
  // }
}

export default StripeWebHook
