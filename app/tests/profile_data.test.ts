import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  POSTS_SEED_SHA256,
  USERS_SEED_SHA256,
} from "../packages/frontend/src/components/feed/feed-data.ts";
import {
  LOCAL_PROFILE_DATA_SOURCE,
  ProfileDataError,
  isValidProfileIdentifier,
  parseProfileSeedBytes,
  resolveLocalProfile,
  sha256,
  validateLocalProfiles,
} from "../packages/frontend/src/components/profile/profile-data.ts";

const postsSeed = new URL(
  "../packages/backend/src/posts-seed.json",
  import.meta.url,
);
const usersSeed = new URL(
  "../packages/backend/src/users-seed.json",
  import.meta.url,
);

async function checkedInSeeds() {
  const [postsBytes, usersBytes] = await Promise.all([
    readFile(postsSeed),
    readFile(usersSeed),
  ]);
  return {
    postsBytes,
    usersBytes,
    posts: parseProfileSeedBytes("posts", postsBytes, POSTS_SEED_SHA256),
    users: parseProfileSeedBytes("users", usersBytes, USERS_SEED_SHA256),
  };
}

function user(overrides: Record<string, unknown> = {}) {
  return {
    address: "11111111111111111111111111111111",
    userId: "user-one",
    username: "Example author",
    profile_image: null,
    bio: "Local bio",
    followers: 2,
    following: 3,
    x_username: null,
    kind: "person",
    member_count: 0,
    group_badges: [],
    is_banned: false,
    is_pump_user: true,
    canonical_svm_wallet: "11111111111111111111111111111111",
    ...overrides,
  };
}

function post(overrides: Record<string, unknown> = {}) {
  return {
    postId: "post-one",
    authorId: "user-one",
    kind: "root",
    content: "Local example content",
    mediaUrl: null,
    createdAt: "2024-01-01T00:00:00.000Z",
    parentPostId: null,
    rootPostId: null,
    quotedPostId: null,
    repostedPostId: null,
    likeCount: 0,
    replyCount: 0,
    repostCount: 0,
    quoteCount: 0,
    mentions: [],
    deleted: false,
    hidden: false,
    ...overrides,
  };
}

test("authenticates and validates the exact checked-in profile seeds", async () => {
  const { postsBytes, usersBytes, posts, users } = await checkedInSeeds();
  assert.equal(sha256(postsBytes), POSTS_SEED_SHA256);
  assert.equal(sha256(usersBytes), USERS_SEED_SHA256);

  const dataset = validateLocalProfiles(posts, users);
  assert.equal(dataset.dataSource, LOCAL_PROFILE_DATA_SOURCE);
  assert.equal(dataset.profiles.length, 5);
  const alice = resolveLocalProfile(dataset, "user-001");
  assert.equal(alice?.address, "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU");
  assert.equal(alice?.displayName, "alice_pump");
  assert.deepEqual(
    alice?.posts.map(({ id }) => id),
    ["00000000-0000-4000-8000-000000000001"],
  );
  assert.doesNotMatch(JSON.stringify(dataset), /QmAlice|QmBob|QmChad/);
});

test("resolves only exact known user ids and wallet addresses", async () => {
  const { posts, users } = await checkedInSeeds();
  const dataset = validateLocalProfiles(posts, users);
  const byId = resolveLocalProfile(dataset, "user-004");
  const byWallet = resolveLocalProfile(
    dataset,
    "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
  );
  assert.equal(byId?.address, byWallet?.address);
  assert.equal(byId?.kind, "group");
  assert.equal(byId?.memberCount, 42);
  assert.equal(resolveLocalProfile(dataset, "chad_group"), undefined);
  assert.equal(resolveLocalProfile(dataset, " user-004"), undefined);
  assert.equal(resolveLocalProfile(dataset, "USER-004"), undefined);
});

test("rejects corrupted hashes and malformed seed JSON", async () => {
  const { usersBytes } = await checkedInSeeds();
  const corrupted = Buffer.from(usersBytes);
  corrupted[0] ^= 1;
  assert.throws(
    () => parseProfileSeedBytes("users", corrupted, USERS_SEED_SHA256),
    /SHA-256 mismatch/,
  );

  const malformed = Buffer.from("{not-json", "utf8");
  assert.throws(
    () => parseProfileSeedBytes("users", malformed, sha256(malformed)),
    /not valid UTF-8 JSON/,
  );
});

test("rejects duplicate identities and inconsistent post authors", () => {
  assert.throws(
    () => validateLocalProfiles([post()], [user(), user({ address: "2222" })]),
    /repeats an identity/,
  );
  assert.throws(
    () => validateLocalProfiles([post({ authorId: "missing" })], [user()]),
    /unknown author/,
  );
  assert.throws(
    () => validateLocalProfiles([post(), post()], [user()]),
    /repeats a post identity/,
  );
});

test("rejects unsupported account kinds, counters, wallets and timestamps", () => {
  for (const invalidUser of [
    user({ kind: "robot" }),
    user({ followers: -1 }),
    user({ following: 1.5 }),
    user({ member_count: Number.MAX_SAFE_INTEGER + 1 }),
    user({ canonical_svm_wallet: "another-wallet" }),
  ]) {
    assert.throws(
      () => validateLocalProfiles([post()], [invalidUser]),
      ProfileDataError,
    );
  }
  assert.throws(
    () => validateLocalProfiles([post({ createdAt: "not-a-time" })], [user()]),
    /invalid timestamp/,
  );
});

test("uses wallet fallback and honest missing profile fields", () => {
  const dataset = validateLocalProfiles(
    [],
    [
      user({
        username: null,
        bio: null,
        profile_image: null,
        followers: 0,
        following: 0,
      }),
    ],
  );
  const profile = dataset.profiles[0];
  assert.equal(profile?.displayName, "111111…1111");
  assert.equal(profile?.bio, null);
  assert.equal(profile?.hasRecordedAvatar, false);
  assert.deepEqual(profile?.posts, []);
});

test("filters hidden, deleted and reply records and keeps stable post order", () => {
  const dataset = validateLocalProfiles(
    [
      post({ postId: "later", createdAt: "2024-02-01T00:00:00.000Z" }),
      post({ postId: "same-b", createdAt: "2024-01-02T00:00:00.000Z" }),
      post({ postId: "same-a", createdAt: "2024-01-02T00:00:00.000Z" }),
      post({
        postId: "reply",
        kind: "reply",
        parentPostId: "later",
        rootPostId: "later",
      }),
      post({ postId: "hidden", hidden: true }),
      post({ postId: "deleted", deleted: true }),
    ],
    [user()],
  );
  assert.deepEqual(
    dataset.profiles[0]?.posts.map(({ id }) => id),
    ["later", "same-a", "same-b"],
  );
});

test("preserves banned and group classifications without inventing relationships", () => {
  const dataset = validateLocalProfiles(
    [],
    [
      user({ is_banned: true }),
      user({
        address: "22222222222222222222222222222222",
        canonical_svm_wallet: "22222222222222222222222222222222",
        userId: "group-two",
        kind: "group",
        member_count: 7,
      }),
    ],
  );
  assert.equal(dataset.profiles[0]?.banned, true);
  assert.equal(dataset.profiles[1]?.kind, "group");
  assert.equal(dataset.profiles[1]?.memberCount, 7);
});

test("validates profile identifier boundaries", () => {
  assert.equal(isValidProfileIdentifier("user-001"), true);
  assert.equal(isValidProfileIdentifier(""), false);
  assert.equal(isValidProfileIdentifier(" user-001"), false);
  assert.equal(isValidProfileIdentifier("user/001"), false);
  assert.equal(isValidProfileIdentifier("a".repeat(129)), false);
});
