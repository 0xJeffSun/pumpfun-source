/**
 * In-memory settings store seeded from a JSON file.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './settings-seed.json' with { type: 'json' };

export interface NotificationPrefs {
  trades: boolean;
  follows: boolean;
  mentions: boolean;
  rewards: boolean;
}

export interface PrivacySettings {
  showPortfolio: boolean;
  showActivity: boolean;
}

export interface Settings {
  wallet: string;
  displayCurrency: string;
  language: string;
  theme: string;
  slippageBps: number;
  priorityFee: number;
  notifications: NotificationPrefs;
  privacy: PrivacySettings;
}

const settings: Settings[] = seedData as Settings[];

export class SettingsStore {
  private byWallet: Map<string, Settings>;

  constructor(seed?: Settings[]) {
    const data = seed ?? settings;
    this.byWallet = new Map(data.map(s => [s.wallet, s]));
  }

  /** Get full settings for a wallet. Returns undefined on miss. */
  getSettings(wallet: string): Settings | undefined {
    return this.byWallet.get(wallet);
  }

  /** Get notification preferences for a wallet. Returns undefined on miss. */
  getNotificationPreferences(wallet: string): NotificationPrefs | undefined {
    return this.byWallet.get(wallet)?.notifications;
  }

  /** Get privacy settings for a wallet. Returns undefined on miss. */
  getPrivacySettings(wallet: string): PrivacySettings | undefined {
    return this.byWallet.get(wallet)?.privacy;
  }
}

/** Singleton store for the application. */
export const defaultSettingsStore = new SettingsStore();
