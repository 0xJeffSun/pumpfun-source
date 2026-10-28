/**
 * In-memory auth/session store seeded from a JSON file.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './auth-seed.json' with { type: 'json' };

export interface Session {
  sessionId: string;
  wallet: string;
  userId: string;
  provider: 'privy' | 'wallet' | 'x';
  createdAt: string;
  expiresAt: string;
  scope: string[];
}

export interface ApiKey {
  keyId: string;
  wallet: string;
  prefix: string;
  scope: string[];
  orgId: string;
  createdAt: string;
  lastUsedAt: string | null;
  rateLimit: number;
}

export interface LinkedAccount {
  type: 'privy' | 'wallet' | 'x';
  id: string;
  linkedAt: string;
}

export interface Account {
  wallet: string;
  userId: string;
  linkedAccounts: LinkedAccount[];
}

export interface ApiKeyValidation {
  valid: boolean;
  keyId?: string;
  scope?: string[];
  rateLimit?: number;
  orgId?: string;
}

const seed = seedData as {
  sessions: Session[];
  apiKeys: ApiKey[];
  accounts: Account[];
};

export class AuthStore {
  private sessions: Map<string, Session>;
  private sessionsByWallet: Map<string, Session[]>;
  private apiKeys: Map<string, ApiKey>;
  private apiKeysByWallet: Map<string, ApiKey[]>;
  private accounts: Map<string, Account>;

  constructor(seedOverride?: typeof seed) {
    const data = seedOverride ?? seed;

    this.sessions = new Map(data.sessions.map(s => [s.sessionId, s]));
    this.sessionsByWallet = new Map();
    for (const s of data.sessions) {
      const list = this.sessionsByWallet.get(s.wallet) ?? [];
      list.push(s);
      this.sessionsByWallet.set(s.wallet, list);
    }

    this.apiKeys = new Map(data.apiKeys.map(k => [k.prefix, k]));
    this.apiKeysByWallet = new Map();
    for (const k of data.apiKeys) {
      const list = this.apiKeysByWallet.get(k.wallet) ?? [];
      list.push(k);
      this.apiKeysByWallet.set(k.wallet, list);
    }

    this.accounts = new Map(data.accounts.map(a => [a.wallet, a]));
  }

  /** Get a session by ID. */
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  /** Get all sessions for a wallet. */
  getSessionsByWallet(wallet: string): Session[] {
    return this.sessionsByWallet.get(wallet) ?? [];
  }

  /** Validate an API key prefix. */
  validateApiKey(keyPrefix: string): ApiKeyValidation {
    const key = this.apiKeys.get(keyPrefix);
    if (!key) return { valid: false };
    return {
      valid: true,
      keyId: key.keyId,
      scope: key.scope,
      rateLimit: key.rateLimit,
      orgId: key.orgId,
    };
  }

  /** Get all API keys for a wallet. */
  getApiKeys(wallet: string): ApiKey[] {
    return this.apiKeysByWallet.get(wallet) ?? [];
  }

  /** Get account info for a wallet. */
  getAccount(wallet: string): Account | undefined {
    return this.accounts.get(wallet);
  }

  /** Get linked accounts for a wallet. */
  getLinkedAccounts(wallet: string): LinkedAccount[] {
    return this.accounts.get(wallet)?.linkedAccounts ?? [];
  }
}

/** Singleton store for the application. */
export const defaultAuthStore = new AuthStore();
