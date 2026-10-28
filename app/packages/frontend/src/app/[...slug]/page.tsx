import { notFound } from 'next/navigation';
const routes: Record<string,[string,string]> = {
 explore:['Explore','Search, filters, coin rankings and discovery.'],
 leaderboard:['Leaderboard','Trader PnL, groups, competitions and creator payouts.'],
 live:['Live','Livestream discovery and viewing.'],
 go:['GO','Campaign discovery and participation.'],
 mayhem:['Mayhem','Mayhem overview, coin lists and traders.'],
 'holder-rewards':['Holder rewards','Reward discovery and claim integration.'],
 create:['Create a coin','Metadata, media, quote asset and SDK transaction composition.'],
 perps:['Perps','External Hyperliquid integration; deferred pending scope decision.'],
 'docs/fees':['Fees','Fee schedule and SDK integration.'],
 'docs/privacy-policy':['Privacy policy','Reference material captured for reconstruction.'],
 'docs/terms-and-conditions':['Terms and conditions','Reference material captured for reconstruction.'],
};
export function generateStaticParams(){return Object.keys(routes).map(path=>({slug:path.split('/')}));}
export default async function Page({params, searchParams}:{params:Promise<{slug:string[]}>;searchParams:Promise<{q?:string}>}) {
 const {slug}=await params; const path=slug.join('/'); const info=routes[path];if(!info)notFound();
 const {q}=await searchParams;
 return <><p className="eyebrow">PUMP RECONSTRUCTION</p><h1>{info[0]}</h1><p className="description">{info[1]}</p>{q&&<p>Search: {q}</p>}<section className="empty"><h2>Implementation workspace</h2><p>This route is scaffolded. Product behavior and visual parity remain unqualified.</p><p className="muted">See the route inventory and PRD for captured evidence and acceptance criteria.</p></section></>;
}
