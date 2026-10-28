from pathlib import Path
import json,datetime,collections
P=Path('C:/Users/ahi20/Documents/ChatGPT/pumpfun-contribution-review');T=P/'amm-fee-selection-resume-20261028'
exec((P/'amm-inverse-arithmetic-20261028/publish.py').read_text().split("assert api('user')")[0])
recent=api('repos/lalalune/pumpfun-source/pulls?state=all&sort=updated&direction=desc&per_page=25');out={'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'recent':recent}
for p in recent:print(p['number'],p['state'],p['user']['login'],p['head']['sha'][:10],p['title'])
own=api('repos/lalalune/pumpfun-source/pulls?state=open&per_page=100');out['own_open']=[p for p in own if p['user']['login'].lower()=='hongikan'];print('own open',[p['number'] for p in out['own_open']])
for n in [408,411]:
 p=api(f'repos/lalalune/pumpfun-source/pulls/{n}');checks=api('repos/lalalune/pumpfun-source/commits/'+p['head']['sha']+'/check-runs?per_page=100');out[str(n)]={'pr':p,'checks':checks};print(n,p['state'],p['merged_at'],p['head']['sha'],dict(collections.Counter(str((r['status'],r['conclusion'])) for r in checks['check_runs'])))
(P/'amm-fee-selection-resume-20261028/scope-refresh.json').write_text(json.dumps(out,indent=2)+'\n')
