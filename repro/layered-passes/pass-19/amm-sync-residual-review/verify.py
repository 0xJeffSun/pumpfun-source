from pathlib import Path
import argparse,json,hashlib,collections
W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args()
for n,h in json.loads((W/'manifest.json').read_text()).items():assert H(W/n)==h,n
if a.repo:
 for n,h in json.loads((W/'bindings.json').read_text()).items():assert H(a.repo/n)==h,n
r=json.loads((W/'rows.json').read_text());sums={}
for side,start,size in [('original',0x5dc20,2904),('candidate',0xaf120,2952)]:
 rows={x['start']:x for x in r[side]};root=rows[start];assert root['bytes']==size and len(root['direct_calls'])==10;sums[side]=collections.Counter(rows[c['target']]['normalized_sha256']for c in root['direct_calls'])
assert sums['original']==sums['candidate']
n=json.loads((W/'accepted-nochange-check.json').read_text());assert n['existing_message_cases']==113 and n['candidate_sha256']=='c96ed810bccdcc741ab811c846a2ad76bd50163c4f635ef3a61db6562114d69c'
assert 'msg!("No changes in accumulator for user={}",ctx.accounts.user.key())'in (W/'source.rs').read_text()
print('PASS: whole-window residual evidence and ten-callee multiset retained; no new source correction or equivalence claim')
