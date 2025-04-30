/**********************************************************************
 * reset-password.ts
 * -------------------------------------------------
 * Resets a Supabase user’s password via the Admin API.
 * -------------------------------------------------
 * USAGE (bash):
 *   export SUPABASE_URL="https://aqdbdmepncxxuanlymwr.supabase.co"
 *   export SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY_HERE"
 *   npx ts-node reset-password.ts \
 *        a3b3cf93-6956-41c7-bec0-1qwqwd42f26 'N3w-Pa$$w0rd!'
 *********************************************************************/

import { createClient } from '@supabase/supabase-js';

const [, , userId, newPassword] = process.argv;

if (!userId || !newPassword) {
  console.error('Usage: ts-node reset-password.ts <userId> <newPassword>');
  process.exit(1);
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Set SUPABASE_URL and SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

(async () => {
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await admin.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) {
    console.error('❌ Failed to reset password:', error.message);
    process.exit(1);
  }

  console.log(`✅ Password updated for user ${data?.id}`);
})();
