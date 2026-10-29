"use client";

import { AuthControl } from "./auth-control";
import { unavailableAuthAdapter } from "./auth-model";

/** The product entrypoint has no configurable provider, session or test-mode input. */
export function SignInControl({
  triggerClassName,
}: {
  /** Presentation only; no provider, session or test-mode input is accepted. */
  triggerClassName?: string;
} = {}) {
  return (
    <AuthControl
      adapter={unavailableAuthAdapter}
      triggerClassName={triggerClassName}
    />
  );
}
