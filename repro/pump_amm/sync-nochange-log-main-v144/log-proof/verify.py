from pathlib import Path
import argparse,json,gzip,hashlib,struct
W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args()
for n,h in json.loads((W/'manifest.json').read_text()).items():assert H(W/n)==h,n
if a.repo:
 for n,h in json.loads((W/'bindings.json').read_text()).items():assert H(a.repo/n)==h,n
 b=(a.repo/'evidence/original/pump_amm/deployed.so').read_bytes();I=lambda a:struct.unpack_from('<BBhi',b,a);branch=lambda a:a+8+I(a)[2]*8
 assert branch(0x5dc70)==branch(0x5dc88)==branch(0x5dca8)==0x5de10
 assert branch(0x5dc58)==0x5dda0
 assert b[0x11ce7c:0x11ce7c+35]==b'No changes in accumulator for user='
 assert struct.unpack_from('<I',b,0x122594)[0]==0x11ce7c and struct.unpack_from('<Q',b,0x122598)[0]==35
rows=json.loads((W/'rows.json').read_text());formatter=next(r for r in rows['original']if r['start']==0x10e970);assert any(m['normalized_equal']and any('Pubkey' in n and('Display'in n or'Debug'in n)for n in m['names'])for m in formatter['candidate_matches'])
d=json.load(gzip.open(W/'existing-sync-receipt.json.gz'));found=[]
for i,c in enumerate(d['cases']):
 o=[v for v in c['original'].get('logs',[])if 'No changes in accumulator for user='in v];n=[v for v in c['candidate'].get('logs',[])if 'No changes in accumulator for user='in v]
 if o:assert not n and not c['diff'];found.append(i)
assert len(found)==113 and d['case_count']==222
assert "if k!='logs'"in (W/'existing-harness.py').read_text()
s=(W/'before.rs').read_text();a=s.index('pub fn sync(');b=s.index('#[event_cpi]',a);needle='        emit!(event.clone());emit_cpi!(event);\n    }';new='        emit!(event.clone());emit_cpi!(event);\n    }else{\n        msg!("No changes in accumulator for user={}",ctx.accounts.user.key());\n    }';assert s[a:b].count(needle)==1;assert (W/'after.rs').read_text()==s[:a]+s[a:b].replace(needle,new)+s[b:]
print('PASS: original CFG/format evidence,113 existing no-change log discrepancies,and exact else-only proposal; no new build/runtime')
