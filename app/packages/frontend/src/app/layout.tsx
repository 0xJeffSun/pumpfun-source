import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Pump reconstruction', description: 'Local reconstruction workspace — compatibility under development' };
const links = [['/','Home'],['/explore','Explore'],['/leaderboard','Leaderboard'],['/live','Live'],['/go','GO'],['/mayhem','Mayhem'],['/holder-rewards','Holder rewards']];
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en"><body><aside><Link className="brand" href="/">◒ pump.fun <small>local</small></Link><nav>{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav><Link className="create" href="/create">Create a coin</Link><footer>Reconstruction workspace<br/>Read-only development shell</footer></aside><div className="workspace"><header><form action="/explore"><input name="q" aria-label="Search coins and users" placeholder="Search for coins and users..."/></form><span className="status">Local mode</span></header><main>{children}</main></div></body></html> }
