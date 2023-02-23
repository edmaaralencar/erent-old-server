import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer from 'nodemailer'

type TemplateVariable = {
  [key: string]: string | number
}

type SendMail = {
  to: string
  subject: string
  variables: TemplateVariable
  file: string
}

export default class EtherealMailProvider {
  public parseEmailTemplate(file: string, variables: TemplateVariable) {
    const templateFileContent = fs.readFileSync(file).toString('utf-8')
    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }

  public async sendMail({ to, variables, subject, file }: SendMail) {
    const account = await nodemailer.createTestAccount()

    const emailTemplateAsHTML = this.parseEmailTemplate(file, variables)

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })

    const message = await transporter.sendMail({
      to,
      from: 'ERent <noreplay@erent.com.br>',
      subject,
      html: emailTemplateAsHTML
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
