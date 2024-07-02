import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as v2 from 'firebase-functions/v2';

initializeApp();

export const setCustomUserClaims = v2.https.onRequest((request, response) => {
  debugger;
  try {
    getAuth().getUserByEmail('lukasz.jablonski1991@gmail.com').then((res) => {
      getAuth().setCustomUserClaims(res.uid, { admin: true }).then((res) => {

       console.log('Admin role set successfully.', res);
      });
    });
  } catch (error) {
    console.error('Error setting custom claims:', error);
    response.status(500).json({ status: 'error', message: 'Failed to set admin role.' });
  }
});
