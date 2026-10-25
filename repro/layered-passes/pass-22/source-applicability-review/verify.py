from pathlib import Path
import argparse,json,hashlib,difflib
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();R=a.repo.resolve();W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();maps=json.loads((W/'source-maps.json').read_text())
for n,h in json.loads((W/'inputs.json').read_text()).items():assert H(R/n)==h,n
expected={'pump':['programs/pump/src/admin_cto.rs'],'pump_fees':['programs/pump-fees/README.md','programs/pump-fees/idls/pump_amm.json','programs/pump-fees/src/sharing.rs'],'pump_amm':[],'mayhem':[],'donation_relay':['src/exit_error.rs','src/idl.rs']}
for name,r in maps.items():
 assert sorted(r['changed_compiled_inputs'])==sorted(expected[name]);base,cur=r['before_map'],r['compiled_map'];assert set(base)==set(cur);assert sorted(n for n in cur if cur[n]!=base[n])==sorted(expected[name]);old=R/r['before_package'];new=R/r['after_package'];root='source'if name in ['pump_fees','mayhem','donation_relay']else'main/source'
 for package,mapping in [(old,base),(new,cur)]:
  for n,h in mapping.items():assert H(package/root/n)==h,(name,n)
 if name!='donation_relay':
  assert json.loads((new/'main/build-comparison.json').read_text())['source_sha256']==cur
  for n,h in cur.items():assert H(R/n)==h,(name,n)
 else:assert json.loads((new/'attempt/build-result.json').read_text())['source_after']==cur
 patch=[]
 for n in r['changed_compiled_inputs']:patch.extend(difflib.unified_diff((old/root/n).read_text().splitlines(True),(new/root/n).read_text().splitlines(True),fromfile='before/'+n,tofile='after/'+n))
 if name=='pump':
  n='programs/pump/README.md';x=old/'main/README.final.md';y=new/'main/README.final.md';assert(R/n).read_bytes()==y.read_bytes();assert H(x)==r['README_separate']['before_sha256']and H(y)==r['README_separate']['after_sha256'];patch.extend(difflib.unified_diff(x.read_text().splitlines(True),y.read_text().splitlines(True),fromfile='before/'+n,tofile='after/'+n))
 assert(W/('relay.patch'if name=='donation_relay'else name+'.patch')).read_text()==''.join(patch)
if(W/'manifest.json').exists():
 m=json.loads((W/'manifest.json').read_text());assert set(m)=={str(f.relative_to(W))for f in W.rglob('*')if f.is_file()and f not in[W/'manifest.json',W/'manifest.sha256']}
 for n,h in m.items():assert H(W/n)==h,n
 assert H(W/'manifest.json')==(W/'manifest.sha256').read_text().strip()
print('PASS: pass21→22 full compiled source maps and exact semantic-delta files; bounded security applicability only; no target execution.')
