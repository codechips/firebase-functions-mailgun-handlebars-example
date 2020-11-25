import * as functions from 'firebase-functions';
import { send } from './email';

export const sendEmail = functions.https.onCall(async data => {
  const { subscribers } = data;

  try {
    await send(subscribers);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});
