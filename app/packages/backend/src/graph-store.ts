/**
 * In-memory follow-graph store seeded from a JSON file.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './graph-seed.json' with { type: 'json' };
import { User, UserStore, defaultStore } from './users-store.js';

export interface FollowEdge {
  followerId: string;
  followeeId: string;
  createdAt: string;
}

export interface GroupMemberEdge {
  groupId: string;
  memberId: string;
  role: string;
  joinedAt: string;
}

export interface UserProfile {
  address: string;
  userId?: string;
  username: string | null;
  profile_image: string | null;
  bio: string | null;
  followers: number;
  following: number;
}

function toProfile(u: User): UserProfile {
  return {
    address: u.address,
    userId: u.userId,
    username: u.username,
    profile_image: u.profile_image,
    bio: u.bio,
    followers: u.followers,
    following: u.following,
  };
}

/** Stub profile for addresses that exist in the graph but not in UserStore. */
function stubProfile(address: string): UserProfile {
  return {
    address,
    username: null,
    profile_image: null,
    bio: null,
    followers: 0,
    following: 0,
  };
}

const seed = seedData as { follows: FollowEdge[]; groupMembers: GroupMemberEdge[] };

export class GraphStore {
  private follows: FollowEdge[];
  private groupMembers: GroupMemberEdge[];
  /** followeeId → followerId[] (who follows this user) */
  private followerIndex: Map<string, string[]>;
  /** followerId → followeeId[] (who this user follows) */
  private followingIndex: Map<string, string[]>;
  /** "followerId:followeeId" → true */
  private edgeSet: Set<string>;
  /** groupId → GroupMemberEdge[] */
  private groupIndex: Map<string, GroupMemberEdge[]>;
  private userStore: UserStore;

  constructor(seedOverride?: { follows: FollowEdge[]; groupMembers: GroupMemberEdge[] }, userStore?: UserStore) {
    const data = seedOverride ?? seed;
    this.follows = data.follows;
    this.groupMembers = data.groupMembers;
    this.userStore = userStore ?? defaultStore;

    this.followerIndex = new Map();
    this.followingIndex = new Map();
    this.edgeSet = new Set();
    for (const edge of this.follows) {
      const followers = this.followerIndex.get(edge.followeeId) ?? [];
      followers.push(edge.followerId);
      this.followerIndex.set(edge.followeeId, followers);

      const following = this.followingIndex.get(edge.followerId) ?? [];
      following.push(edge.followeeId);
      this.followingIndex.set(edge.followerId, following);

      this.edgeSet.add(`${edge.followerId}:${edge.followeeId}`);
    }

    this.groupIndex = new Map();
    for (const gm of this.groupMembers) {
      const members = this.groupIndex.get(gm.groupId) ?? [];
      members.push(gm);
      this.groupIndex.set(gm.groupId, members);
    }
  }

  /** Resolve an address to a UserProfile, falling back to a stub. */
  private resolve(address: string): UserProfile {
    const u = this.userStore.getById(address);
    return u ? toProfile(u) : stubProfile(address);
  }

  /** Get followers of a user with pagination. */
  getFollowers(userId: string, opts: { offset?: number; limit?: number } = {}): { followers: UserProfile[]; total: number; hasMore: boolean } {
    const ids = this.followerIndex.get(userId) ?? [];
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? 20);
    const page = ids.slice(offset, offset + limit);
    return {
      followers: page.map(id => this.resolve(id)),
      total: ids.length,
      hasMore: offset + limit < ids.length,
    };
  }

  /** Get users that a user is following with pagination. */
  getFollowing(userId: string, opts: { offset?: number; limit?: number } = {}): { following: UserProfile[]; total: number; hasMore: boolean } {
    const ids = this.followingIndex.get(userId) ?? [];
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? 20);
    const page = ids.slice(offset, offset + limit);
    return {
      following: page.map(id => this.resolve(id)),
      total: ids.length,
      hasMore: offset + limit < ids.length,
    };
  }

  /** Check if followerId follows followeeId. */
  isFollowing(followerId: string, followeeId: string): boolean {
    return this.edgeSet.has(`${followerId}:${followeeId}`);
  }

  /** Batch-check whether viewerId follows each of targetIds. */
  batchIsFollowing(viewerId: string, targetIds: string[]): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    for (const t of targetIds) {
      result[t] = this.isFollowing(viewerId, t);
    }
    return result;
  }

  /** Get mutual followers between two users. */
  getMutualFollowers(userId1: string, userId2: string, opts: { offset?: number; limit?: number } = {}): UserProfile[] {
    const f1 = new Set(this.followerIndex.get(userId1) ?? []);
    const f2 = new Set(this.followerIndex.get(userId2) ?? []);
    const mutual: string[] = [];
    for (const id of f1) {
      if (f2.has(id)) mutual.push(id);
    }
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? 20);
    return mutual.slice(offset, offset + limit).map(id => this.resolve(id));
  }

  /** Get members of a group with optional role filter. */
  getGroupMembers(groupId: string, opts: { offset?: number; limit?: number; role?: string } = {}): { members: UserProfile[]; total: number } {
    let members = this.groupIndex.get(groupId) ?? [];
    if (opts.role) {
      members = members.filter(m => m.role === opts.role);
    }
    const total = members.length;
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? 20);
    const page = members.slice(offset, offset + limit);
    return {
      members: page.map(m => this.resolve(m.memberId)),
      total,
    };
  }
}

/** Singleton store for the application. */
export const defaultGraphStore = new GraphStore();
