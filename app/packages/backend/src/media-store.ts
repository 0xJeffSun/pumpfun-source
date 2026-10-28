/**
 * In-memory media store seeded from a JSON file.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './media-seed.json' with { type: 'json' };
import { DATA_SOURCE } from './users-store.js';

export { DATA_SOURCE };

export interface Media {
  mediaId: string;
  uploaderWallet: string;
  type: 'image' | 'video' | 'gif';
  status: 'processing' | 'ready' | 'failed';
  url: string;
  thumbnailUrl: string | null;
  mimeType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  duration: number | null;
  createdAt: string;
}

/** Validated seed media. */
const mediaItems: Media[] = seedData as Media[];

export const SYNTHETIC_MEDIA_SEED: readonly Media[] = mediaItems;

/** Monotonic counter for synthetic media IDs. */
let nextMediaSeq = 1000;

export class MediaStore {
  private media: Media[];
  private byMediaId: Map<string, Media>;
  private byUploader: Map<string, Media[]>;

  constructor(seed?: Media[]) {
    this.media = seed ?? mediaItems;
    this.byMediaId = new Map(this.media.map(m => [m.mediaId, m]));

    this.byUploader = new Map();
    for (const m of this.media) {
      const list = this.byUploader.get(m.uploaderWallet);
      if (list) {
        list.push(m);
      } else {
        this.byUploader.set(m.uploaderWallet, [m]);
      }
    }
  }

  /** Get a single media item by ID. Returns undefined for misses. */
  getMedia(mediaId: string): Media | undefined {
    return this.byMediaId.get(mediaId);
  }

  /** Get media items by uploader wallet with optional offset/limit, newest first. */
  getMediaByUploader(wallet: string, opts: { offset?: number; limit?: number }): Media[] {
    const list = this.byUploader.get(wallet) ?? [];
    const sorted = [...list].sort((a, b) => {
      const tA = new Date(a.createdAt).getTime();
      const tB = new Date(b.createdAt).getTime();
      return tB - tA;
    });
    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? sorted.length;
    return sorted.slice(offset, offset + limit);
  }

  /**
   * Generate a synthetic presigned upload URL and media ID.
   * In a real system this would call S3/IPFS; here we return deterministic URLs.
   */
  getUploadUrl(_wallet: string, filename: string, mimeType: string): { uploadUrl: string; mediaId: string } {
    const seq = nextMediaSeq++;
    const mediaId = `media-upload-${seq}`;
    const safeName = encodeURIComponent(filename);
    const uploadUrl = `https://pump-uploads.synthetic.local/presigned/${mediaId}/${safeName}?mime=${encodeURIComponent(mimeType)}`;
    return { uploadUrl, mediaId };
  }
}

/** Singleton store for the application. */
export const defaultMediaStore = new MediaStore();
