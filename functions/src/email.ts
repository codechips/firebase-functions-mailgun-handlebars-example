import * as functions from 'firebase-functions';
import Mailgun from 'mailgun-js';
import * as Handlebars from 'handlebars/runtime';
import './templates';

const apiKey = functions.config().mg?.key;
const domain = 'mg.example.com';

const mg = new Mailgun({ apiKey, domain });

// import our email and text precompiles templates
const html = Handlebars.templates['html'];
const text = Handlebars.templates['text'];

export const send = (subscribers: string[]) => {
  const data = { title: 'Hello!', body: 'How are you?' };

  return mg.messages().send({
    from: 'Mailgun Test <noreply@mg.example.com>',
    to: subscribers,
    subject: data.title,
    text: text(data),
    html: html(data),
  });
};
