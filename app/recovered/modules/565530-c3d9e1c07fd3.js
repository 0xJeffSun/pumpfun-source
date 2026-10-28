// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(311629),
    r = r;
  class n extends Error {
    toString() {
      return `${this.type}${this.privyErrorCode ? `-${this.privyErrorCode}` : ""}: ${this.message}${this.cause ? ` [cause: ${this.cause}]` : ""}`;
    }
    constructor(e, t, r) {
      (super(e),
        t instanceof Error && (this.cause = t),
        (this.privyErrorCode = r));
    }
  }
  class s extends n {
    constructor(e, t, r, n, s, i) {
      (super(r, n, s), (this.type = e), (this.status = t), (this.data = i));
    }
  }
  class i extends n {
    constructor(e, t, r) {
      (super(e, t, r), (this.type = "client_error"));
    }
  }
  class o extends n {
    constructor(e, t, r) {
      (super(e, t, r), (this.type = "connector_error"));
    }
  }
  let a = (e) =>
    e instanceof n
      ? e
      : e instanceof Error
        ? new i(e.message, e)
        : new i(`Internal error: ${e}`);
  var u =
    (((t = {}).OAUTH_ACCOUNT_SUSPENDED = "oauth_account_suspended"),
    (t.MISSING_OR_INVALID_PRIVY_APP_ID = "missing_or_invalid_privy_app_id"),
    (t.MISSING_OR_INVALID_PRIVY_ACCOUNT_ID =
      "missing_or_invalid_privy_account_id"),
    (t.MISSING_OR_INVALID_TOKEN = "missing_or_invalid_token"),
    (t.INVALID_DATA = "invalid_data"),
    (t.INVALID_CAPTCHA = "invalid_captcha"),
    (t.LINKED_TO_ANOTHER_USER = "linked_to_another_user"),
    (t.CANNOT_LINK_MORE_OF_TYPE = "cannot_link_more_of_type"),
    (t.FAILED_TO_LINK_ACCOUNT = "failed_to_link_account"),
    (t.FAILED_TO_UPDATE_ACCOUNT = "failed_to_update_account"),
    (t.USER_EXITED_UPDATE_FLOW = "exited_update_flow"),
    (t.ALLOWLIST_REJECTED = "allowlist_rejected"),
    (t.OAUTH_USER_DENIED = "oauth_user_denied"),
    (t.OAUTH_UNEXPECTED = "oauth_unexpected"),
    (t.UNKNOWN_AUTH_ERROR = "unknown_auth_error"),
    (t.USER_EXITED_AUTH_FLOW = "exited_auth_flow"),
    (t.USER_EXITED_LINK_FLOW = "exited_link_flow"),
    (t.USER_EXITED_SET_PASSWORD_FLOW = "user_exited_set_password_flow"),
    (t.MUST_BE_AUTHENTICATED = "must_be_authenticated"),
    (t.UNKNOWN_CONNECT_WALLET_ERROR = "unknown_connect_wallet_error"),
    (t.GENERIC_CONNECT_WALLET_ERROR = "generic_connect_wallet_error"),
    (t.CLIENT_REQUEST_TIMEOUT = "client_request_timeout"),
    (t.INVALID_CREDENTIALS = "invalid_credentials"),
    (t.MISSING_MFA_CREDENTIALS = "missing_or_invalid_mfa"),
    (t.UNKNOWN_MFA_ERROR = "unknown_mfa_error"),
    (t.EMBEDDED_WALLET_ALREADY_EXISTS = "embedded_wallet_already_exists"),
    (t.EMBEDDED_WALLET_NOT_FOUND = "embedded_wallet_not_found"),
    (t.EMBEDDED_WALLET_CREATE_ERROR = "embedded_wallet_create_error"),
    (t.UNKNOWN_EMBEDDED_WALLET_ERROR = "unknown_embedded_wallet_error"),
    (t.EMBEDDED_WALLET_PASSWORD_UNCONFIRMED =
      "embedded_wallet_password_unconfirmed"),
    (t.EMBEDDED_WALLET_PASSWORD_ALREADY_EXISTS =
      "embedded_wallet_password_already_exists"),
    (t.EMBEDDED_WALLET_RECOVERY_ALREADY_EXISTS =
      "embedded_wallet_recovery_already_exists"),
    (t.TRANSACTION_FAILURE = "transaction_failure"),
    (t.UNSUPPORTED_CHAIN_ID = "unsupported_chain_id"),
    (t.NOT_SUPPORTED = "not_supported"),
    (t.CAPTCHA_TIMEOUT = "captcha_timeout"),
    (t.INVALID_MESSAGE = "invalid_message"),
    (t.UNABLE_TO_SIGN = "unable_to_sign"),
    (t.CAPTCHA_FAILURE = "captcha_failure"),
    (t.CAPTCHA_DISABLED = "captcha_disabled"),
    (t.SESSION_STORAGE_UNAVAILABLE = "session_storage_unavailable"),
    (t.TOO_MANY_REQUESTS = "too_many_requests"),
    (t.USER_LIMIT_REACHED = "max_accounts_reached"),
    (t.DISALLOWED_LOGIN_METHOD = "disallowed_login_method"),
    (t.DISALLOWED_PLUS_EMAIL = "disallowed_plus_email"),
    (t.PASSKEY_NOT_ALLOWED = "passkey_not_allowed"),
    (t.USER_DOES_NOT_EXIST = "user_does_not_exist"),
    (t.INSUFFICIENT_BALANCE = "insufficient_balance"),
    (t.ONRAMP_MINIMUM_IDENTITY_VERIFICATION_REQUIRED =
      "onramp_minimum_identity_verification_required"),
    (t.ONRAMP_IDENTITY_VERIFICATION_REQUIRED =
      "onramp_identity_verification_required"),
    (t.ONRAMP_DOCUMENT_VERIFICATION_REQUIRED =
      "onramp_document_verification_required"),
    (t.ONRAMP_UNSUPPORTED_INFORMATION = "onramp_unsupported_information"),
    (t.ONRAMP_TRANSACTION_LIMIT_REACHED = "transaction_limit_reached"),
    (t.ONRAMP_QUOTE_EXPIRED = "onramp_quote_expired"),
    (t.ONRAMP_PAYMENT_METHOD_DECLINED = "onramp_payment_method_declined"),
    (t.ONRAMP_WALLET_OWNERSHIP_REQUIRED = "onramp_wallet_ownership_required"),
    (t.ACCOUNT_TRANSFER_REQUIRED = "account_transfer_required"),
    (t.BUFFER_NOT_DEFINED = "buffer_not_defined"),
    (t.UNSUPPORTED_WALLET_TYPE = "unsupported_wallet_type"),
    (t.NO_SOLANA_ACCOUNTS = "no_solana_accounts"),
    (t.UNKNOWN_FUNDING_ERROR = "unknown_funding_error"),
    t);
  e.s(
    [
      "P",
      0,
      i,
      "a",
      0,
      u,
      "b",
      0,
      n,
      "c",
      0,
      s,
      "d",
      0,
      class extends i {
        constructor() {
          super(
            "Method called before `ready`. Ensure you wait until `ready` is true before calling.",
          );
        }
      },
      "e",
      0,
      o,
      "f",
      0,
      (e) => {
        if (e instanceof n) return e;
        if (!(e instanceof r.F)) return a(e);
        if (!e.response) return new s("api_error", null, e.message, e);
        let { type: t, message: i, error: o, code: u } = e.data;
        return new s(t || "ApiError", e.response.status, i || o, e, u, e.data);
      },
      "g",
      0,
      class extends i {
        constructor() {
          super("Request timed out", void 0, "client_request_timeout");
        }
      },
      "h",
      0,
      a,
      "i",
      0,
      class extends o {
        constructor() {
          super(
            "No Solana accounts found in wallet",
            void 0,
            "no_solana_accounts",
          );
        }
      },
      "j",
      0,
      class extends i {
        constructor(e) {
          super(
            "This application is in development mode and must be upgraded to production to log in new users.",
            e,
            "max_accounts_reached",
          );
        }
      },
      "k",
      0,
      class extends i {
        constructor(e = "Embedded wallet error", t) {
          super(e, t, "unknown_embedded_wallet_error");
        }
      },
      "l",
      0,
      class extends i {
        constructor(e = "User must be authenticated") {
          super(e, void 0, "must_be_authenticated");
        }
      },
    ],
    565530,
  );
};
