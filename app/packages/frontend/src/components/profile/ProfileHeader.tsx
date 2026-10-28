export type ProfileData = {
  address: string;
  name: string;
  bio: string;
  avatar?: string;
  followers: number;
  following: number;
  coinsCreated: number;
};

/** Profile header with avatar, name, stats, and action buttons. */
export function ProfileHeader({ profile }: { profile: ProfileData }) {
  const truncatedAddress = `${profile.address.slice(0, 6)}…${profile.address.slice(-4)}`;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bg-tertiary ring-2 ring-border-secondary sm:h-20 sm:w-20">
        {profile.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-text-accent">
            {profile.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-text-primary">
            {profile.name}
          </h1>
          <span className="rounded-md bg-bg-tertiary px-2 py-0.5 font-mono text-[11px] text-text-muted">
            {truncatedAddress}
          </span>
        </div>
        {profile.bio ? (
          <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-text-tertiary">
            {profile.bio}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-5 text-[13px]">
          <span>
            <strong className="text-text-primary">{profile.followers}</strong>{" "}
            <span className="text-text-tertiary">followers</span>
          </span>
          <span>
            <strong className="text-text-primary">{profile.following}</strong>{" "}
            <span className="text-text-tertiary">following</span>
          </span>
          <span>
            <strong className="text-text-primary">
              {profile.coinsCreated}
            </strong>{" "}
            <span className="text-text-tertiary">coins</span>
          </span>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          disabled
          className="h-9 rounded-lg bg-bg-accent px-4 text-[13px] font-bold text-text-on-accent disabled:cursor-not-allowed disabled:opacity-50"
          title="Disabled in reconstruction"
        >
          Follow
        </button>
        <button
          type="button"
          disabled
          className="h-9 rounded-lg border border-border-tertiary bg-transparent px-4 text-[13px] font-semibold text-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
          title="Disabled in reconstruction"
        >
          Share
        </button>
      </div>
    </div>
  );
}
