import * as v2 from 'firebase-functions/v2';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

admin.initializeApp();

export const fetchPostsFromFirestore = functions.https.onRequest(async (request, response) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('postsIds').get();
    const posts = snapshot.docs.map(doc => doc.data());
    response.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error);
    response.status(500).json({ status: 'error', message: 'Failed to fetch posts from Firestore.' });
  }
});
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
