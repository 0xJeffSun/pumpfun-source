"use client";

import { AuthControl } from "./auth-control";
import { unavailableAuthAdapter } from "./auth-model";

/** The product entrypoint has no configurable provider, session or test-mode input. */
export function SignInControl() {
  return <AuthControl adapter={unavailableAuthAdapter} />;
}
