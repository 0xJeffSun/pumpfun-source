from pathlib import Path
import json,hashlib,difflib
R=Path.cwd();W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
specs={
'pump':('repro/pump/admin-cto-owned6083-main-fortyeight','repro/pump/admin-cto-error-batch-main-fortyeight','main/source','main/source'),
'pump_fees':('repro/pump_fees/sharing-second-pump-cpi-main-v144','repro/pump_fees/sharing-fourth-cpi-main-v144','source','source'),
'pump_amm':('repro/pump_amm/init-logical-module-main-v144','repro/pump_amm/init-logical-module-main-v144','main/source','main/source'),
'mayhem':('repro/mayhem/sell-result-error-main-twentyfour','repro/mayhem/sell-result-error-main-twentyfour','source','source')}
report={};inputs={}
for name,(old,new,op,np)in specs.items():
 old=R/old;new=R/new;br=J(old/'main/build-comparison.json');nr=J(new/'main/build-comparison.json');base=br['source_sha256'];cur=nr['source_sha256'];assert set(base)==set(cur);changes=[n for n in cur if base[n]!=cur[n]]
 for package,root,mapping in [(old,op,base),(new,np,cur)]:
  inputs[str((package/'main/build-comparison.json').relative_to(R))]=H(package/'main/build-comparison.json')
  for n,h in mapping.items():assert H(package/root/n)==h,n
 for n,h in cur.items():assert H(R/n)==h,(name,n)
 patches=[]
 for n in changes:
  a=(old/op/n).read_text();b=(new/np/n).read_text();d=W/'changed'/name/n;d.parent.mkdir(parents=True,exist_ok=True);d.with_name(d.name+'.before').write_text(a);d.with_name(d.name+'.after').write_text(b);patches.extend(difflib.unified_diff(a.splitlines(True),b.splitlines(True),fromfile='before/'+n,tofile='after/'+n))
 # Pump README is intentionally excluded from compiler source37; bind its final snapshots separately.
 if name=='pump':
  n='programs/pump/README.md';a=(old/'main/README.final.md').read_text();b=(new/'main/README.final.md').read_text();assert(R/n).read_text()==b;patches.extend(difflib.unified_diff(a.splitlines(True),b.splitlines(True),fromfile='before/'+n,tofile='after/'+n));readme={'path':n,'before_sha256':H(old/'main/README.final.md'),'after_sha256':H(new/'main/README.final.md'),'compiled_input':False}
 else:readme=None
 (W/(name+'.patch')).write_text(''.join(patches));report[name]={'before_package':str(old.relative_to(R)),'after_package':str(new.relative_to(R)),'before_map':base,'compiled_map':cur,'changed_compiled_inputs':changes,'source_count':len(cur),'README_separate':readme,'actual_current_source_aligned':True,'candidate_sha256':nr['comparison']['candidate_sha256']}
old=R/'repro/donation-relay/source-build-11-idl-discriminator';new=R/'repro/donation-relay/source-build-12-idl-discriminator-owned';base=J(old/'launcher/resolved-source-sha256.json');cur=J(new/'launcher/resolved-source-sha256.json');assert len(base)==len(cur)==23;changes=[n for n in cur if cur[n]!=base[n]];assert sorted(changes)==['src/exit_error.rs','src/idl.rs'];patch=[]
for package,mapping in [(old,base),(new,cur)]:
 for n,h in mapping.items():assert H(package/'source'/n)==h
 inputs[str((package/'launcher/resolved-source-sha256.json').relative_to(R))]=H(package/'launcher/resolved-source-sha256.json')
for n in changes:
 a=(old/'source'/n).read_text();b=(new/'source'/n).read_text();patch.extend(difflib.unified_diff(a.splitlines(True),b.splitlines(True),fromfile='before/'+n,tofile='after/'+n))
(W/'relay.patch').write_text(''.join(patch));report['donation_relay']={'before_package':str(old.relative_to(R)),'after_package':str(new.relative_to(R)),'before_map':base,'compiled_map':cur,'changed_compiled_inputs':changes,'source_count':23,'ownership':'immutable publication snapshots; not an active programs crate','candidate_sha256':H(new/'candidate.so')}
(W/'source-maps.json').write_text(json.dumps(report,indent=2)+'\n');(W/'inputs.json').write_text(json.dumps(inputs,indent=2)+'\n');print({k:v['changed_compiled_inputs']for k,v in report.items()})
