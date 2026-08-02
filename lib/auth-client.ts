import { createAuthClient } from "better-auth/react";

// React hooks and functions for use inside Client Components. The server
// config lives in `lib/auth.ts` — this file talks to it over the
// `/api/auth/*` route handler.
export const { signIn, signUp, signOut, useSession, updateUser, changePassword } =
  createAuthClient();
