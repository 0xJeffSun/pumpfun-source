import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Home</p>
          <h1>Feed</h1>
        </div>
        <Link className="page-heading-link" href="/explore">
          Explore coins →
        </Link>
      </div>
      <div className="tabs" aria-label="Feed views">
        <strong>For you</strong>
        <span>Following</span>
      </div>
      <section className="empty-state" data-product-state="unavailable">
        <div className="empty-state-content">
          <span className="empty-mark" aria-hidden="true">
            P
          </span>
          <h2>Feed data is not available locally</h2>
          <p>
            The shared shell is functional, but the native feed service has not
            been reconstructed or qualified.
          </p>
          <p className="muted">
            No historical fixture is presented as live activity.
          </p>
        </div>
      </section>
    </>
  );
}
