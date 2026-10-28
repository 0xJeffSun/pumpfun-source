/**
 * In-memory livestream store seeded from a JSON file.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './livestream-seed.json' with { type: 'json' };

export interface LiveStream {
  streamId: string;
  hostWallet: string;
  hostUsername: string;
  title: string;
  coinMint: string | null;
  status: 'live' | 'ended' | 'scheduled';
  viewerCount: number;
  peakViewerCount: number;
  startedAt: string | null;
  endedAt: string | null;
  scheduledAt: string | null;
  thumbnailUrl: string;
  tags: string[];
  chatEnabled: boolean;
  livekitRoom: string | null;
  duration: number | null;
}

const streams: LiveStream[] = seedData as LiveStream[];

export class LivestreamStore {
  private streams: LiveStream[];
  private byId: Map<string, LiveStream>;
  private byHost: Map<string, LiveStream[]>;
  private byCoin: Map<string, LiveStream>;

  constructor(seed?: LiveStream[]) {
    this.streams = seed ?? streams;
    this.byId = new Map(this.streams.map(s => [s.streamId, s]));

    this.byHost = new Map();
    for (const s of this.streams) {
      const list = this.byHost.get(s.hostWallet) ?? [];
      list.push(s);
      this.byHost.set(s.hostWallet, list);
    }

    this.byCoin = new Map();
    for (const s of this.streams) {
      if (s.coinMint && s.status === 'live') {
        this.byCoin.set(s.coinMint, s);
      }
    }
  }

  /** List streams with optional status filter, sort and pagination. */
  getLiveStreams(opts: { status?: string; offset?: number; limit?: number; sort?: string } = {}): LiveStream[] {
    let result = [...this.streams];
    if (opts.status) {
      result = result.filter(s => s.status === opts.status);
    }
    if (opts.sort === 'viewers') {
      result.sort((a, b) => b.viewerCount - a.viewerCount);
    } else {
      result.sort((a, b) => {
        const tA = new Date(a.startedAt ?? a.scheduledAt ?? '').getTime() || 0;
        const tB = new Date(b.startedAt ?? b.scheduledAt ?? '').getTime() || 0;
        return tB - tA;
      });
    }
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? 20);
    return result.slice(offset, offset + limit);
  }

  /** Get a single stream by ID. */
  getStream(streamId: string): LiveStream | undefined {
    return this.byId.get(streamId);
  }

  /** Get streams by host wallet. */
  getStreamsByHost(wallet: string, opts: { offset?: number; limit?: number } = {}): LiveStream[] {
    const list = this.byHost.get(wallet) ?? [];
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? 20);
    return list.slice(offset, offset + limit);
  }

  /** Get the live stream for a coin. */
  getStreamByCoin(mint: string): LiveStream | undefined {
    return this.byCoin.get(mint);
  }

  /** List scheduled streams. */
  getScheduledStreams(opts: { offset?: number; limit?: number } = {}): LiveStream[] {
    const scheduled = this.streams
      .filter(s => s.status === 'scheduled')
      .sort((a, b) => {
        const tA = new Date(a.scheduledAt ?? '').getTime() || 0;
        const tB = new Date(b.scheduledAt ?? '').getTime() || 0;
        return tA - tB;
      });
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? 20);
    return scheduled.slice(offset, offset + limit);
  }
}

/** Singleton store for the application. */
export const defaultLivestreamStore = new LivestreamStore();
