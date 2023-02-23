import prisma from '@shared/database/prismaClient'
import { stripe } from '@shared/lib/stripe'
import EtherealMailProvider from '@shared/providers/EmailProvider/EtherealMailProvider'
import { Request, Response } from 'express'
import { resolve } from 'path'
import Stripe from 'stripe'

// Stripe webhook: ./stripe listen --forward-to localhost:3333/webhooks

async function StripeWebHook(req: Request, res: Response) {
  const etherealEmailProvider = new EtherealMailProvider()

  const templatePath = resolve(
    __dirname,
    '..',
    'views',
    'rentedSucessfully.hbs'
  )

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
    case 'checkout.session.completed': {
      const data = await prisma.rentals.update({
        where: {
          id: session.id
        },
        data: {
          status: session.status
        },
        include: {
          user: true,
          property: true
        }
      })

      await etherealEmailProvider.sendMail({
        to: data.user.email,
        variables: {
          name: data.user.name,
          property_name: data.property.name,
          property_checkin: data.check_in.toLocaleDateString(),
          property_checkout: data.checkout.toLocaleDateString(),
          property_total: data.total
        },
        subject: 'Aluguel da propriedade',
        file: templatePath
      })
      break
    }
    case 'payment_intent.payment_failed':
      console.log({ message: 'Pagamento falho' })
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
      break
  }

  res.json({ ok: true })
}

export default StripeWebHook
