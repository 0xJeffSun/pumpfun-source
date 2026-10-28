/**
 * In-memory coin creation / media store seeded from JSON files.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './coin-creation-seed.json' with { type: 'json' };

export interface ValidationError {
  field: string;
  message: string;
}

export interface CoinDraft {
  draftId: string;
  creatorWallet: string;
  status: 'draft' | 'pending' | 'confirmed' | 'failed';
  name: string;
  symbol: string;
  description: string | null;
  imageUri: string | null;
  metadataUri: string | null;
  bondingCurve: string | null;
  initialBuyAmount: number | null;
  txSignature: string | null;
  mint: string | null;
  createdAt: string;
  updatedAt: string;
  validationErrors: ValidationError[] | null;
}

export interface DraftValidation {
  valid: boolean;
  errors: ValidationError[];
}

const drafts: CoinDraft[] = seedData as CoinDraft[];

export class CoinCreationStore {
  private byId: Map<string, CoinDraft>;
  private byCreator: Map<string, CoinDraft[]>;
  private byMint: Map<string, CoinDraft>;

  constructor(seed?: CoinDraft[]) {
    const data = seed ?? drafts;
    this.byId = new Map(data.map(d => [d.draftId, d]));
    this.byMint = new Map();
    this.byCreator = new Map();
    for (const d of data) {
      if (d.mint) this.byMint.set(d.mint, d);
      const list = this.byCreator.get(d.creatorWallet) ?? [];
      list.push(d);
      this.byCreator.set(d.creatorWallet, list);
    }
  }

  /** Get a draft by ID. */
  getDraft(draftId: string): CoinDraft | undefined {
    return this.byId.get(draftId);
  }

  /** Get drafts by creator wallet. */
  getDraftsByCreator(wallet: string, opts: { offset?: number; limit?: number } = {}): CoinDraft[] {
    const list = this.byCreator.get(wallet) ?? [];
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? list.length);
    return list.slice(offset, offset + limit);
  }

  /** Get creation record for a confirmed mint. */
  getCreationRecord(mint: string): CoinDraft | undefined {
    return this.byMint.get(mint);
  }

  /** Validate a draft. Returns validation result. */
  validateDraft(draft: Partial<CoinDraft>): DraftValidation {
    const errors: ValidationError[] = [];
    if (!draft.name || draft.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Name is required' });
    } else if (draft.name.length > 32) {
      errors.push({ field: 'name', message: 'Name must be 32 characters or fewer' });
    }
    if (!draft.symbol || draft.symbol.trim().length === 0) {
      errors.push({ field: 'symbol', message: 'Symbol is required' });
    } else if (draft.symbol.length > 10) {
      errors.push({ field: 'symbol', message: 'Symbol must be 10 characters or fewer' });
    }
    if (draft.description && draft.description.length > 500) {
      errors.push({ field: 'description', message: 'Description must be 500 characters or fewer' });
    }
    if (draft.initialBuyAmount !== undefined && draft.initialBuyAmount !== null) {
      if (draft.initialBuyAmount < 0) {
        errors.push({ field: 'initialBuyAmount', message: 'Initial buy amount cannot be negative' });
      }
      if (draft.initialBuyAmount > 100) {
        errors.push({ field: 'initialBuyAmount', message: 'Initial buy amount cannot exceed 100 SOL' });
      }
    }
    return { valid: errors.length === 0, errors };
  }
}

/** Singleton store for the application. */
export const defaultCoinCreationStore = new CoinCreationStore();
