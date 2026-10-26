from pathlib import Path
from collections import Counter
import json,hashlib,gzip,shutil,tomllib
R=Path.cwd();P=R/'work/relay15-linux-v148-existing-evidence-plan';Q=R/'work/pass26-pinned515-reconciliation-plan';PREFIX='repro/donation-relay/source-build-13-linux-v148-measurement/'
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def W(p,d):
 b=(json.dumps(d,indent=2)+'\n').encode()
 if p.exists():assert p.read_bytes()==b,'Preserve prior partial output'
 else:p.write_bytes(b)
assert H((Q/'manifest.json').read_bytes())=='2933991971d677c62714f02fda6d3092ba5bf80e4764bae844275a504e961610'
for n,r in J(Q/'manifest.json')['files'].items():
 b=(Q/n).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes']
paths={r['path']:r['after']for r in J(Q/'incoming-exact-358-records.json')};objects={r['git_oid']:r for r in J(Q/'opaque-object-inventory.json')['objects']}
def incoming(name):
 r=paths[PREFIX+name];o=objects[r['oid']];b=b''.join((Q/x['path']).read_bytes()for x in o['parts']);assert H(b)==r['sha256'];return b
lmanifest=incoming('manifest.json');lseal=H(lmanifest);assert incoming('manifest.sha256').decode().split()[0]==lseal
for n,h in json.loads(lmanifest).items():assert H(incoming(n))==h,n
D=R/'repro/donation-relay/source-build-15-owned-arithmetic/runtime-plan/static-proof';assert H((D/'manifest.json').read_bytes())=='1d1c5d5662ae73d892b00b6afc17bba914b3d146b0d1de3ad19be7efb58a886f'
for n,h in J(D/'manifest.json').items():assert H((D/n).read_bytes())==h,n
method=incoming('recipe-comparison/published-record/reference-build12-analyze.py');assert H(method)=='095fc2d63be0fe4233bdf4e5946cac8d03d9b1747fd39147eea9a98c12dda175' and method==(D/'reviewed-plan/method/analyze.py').read_bytes()
lo=json.loads(incoming('download/extracted/full-ledger/original-function-ledger.json'));do=J(D/'static/original-function-ledger.json');assert len(lo)==len(do)==492
fields=['ordinal','start','end','bytes','raw_sha256','normalized_sha256'];ow=[]
for a,b in zip(lo,do):
 x={k:a[k]for k in fields};assert x=={k:b[k]for k in fields};ow.append(x)
W(P/'common-original492-boundary-hash-witness.json',{'original_sha256':'367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','count':492,'same_complete_method_sha256':H(method),'records':ow,'new_original_body_or_data_decode':False})
lm=json.loads(incoming('download/extracted/full-ledger/match-ledger.json'));dm=J(D/'static/match-ledger.json');assert len(lm)==len(dm)==492
trans=[]
for a,b in zip(lm,dm):
 assert (a['ordinal'],a['start'],a['end'])==(b['ordinal'],b['start'],b['end'])
 trans.append({'ordinal':a['ordinal'],'start':a['start'],'end':a['end'],'Linux13':a,'Darwin15':b})
W(P/'complete492-cross-source-status-metadata.json',trans)
ls=json.loads(incoming('download/extracted/source-map.json'));ds=J(Q/'P25-known-bindings.json')['relay']['source23'];assert len(ls)==len(ds)==23 and set(ls)==set(ds)
changes=[{'path':k,'Linux13_sha256':ls[k],'Darwin15_sha256':ds[k]}for k in sorted(ds)if ls[k]!=ds[k]];assert len(changes)==5
W(P/'source23-hash-comparison.json',{'same_input_membership':True,'inputs_each':23,'same_manifest_and_lock':ls['Cargo.toml']==ds['Cargo.toml'] and ls['Cargo.lock']==ds['Cargo.lock'],'different_source_paths':changes,'source_body_semantics_newly_read':False,'source15':ds,'source13':ls})
(P/'frozen-source15').mkdir(exist_ok=True)
for n,h in ds.items():
 source=D/'source'/n;b=source.read_bytes();assert H(b)==h;target=P/'frozen-source15'/n;target.parent.mkdir(parents=True,exist_ok=True)
 if target.exists():assert target.read_bytes()==b
 else:target.write_bytes(b)
 assert H((R/'programs/donation-relay'/n).read_bytes())==h,'Current canonical15 not identical'
profile=tomllib.loads((P/'frozen-source15/Cargo.toml').read_text())['profile']['release'];lp=json.loads(incoming('download/extracted/plan.json'));assert profile=={k:v for k,v in lp['profile'].items()if k!='opt-level'}
commands=json.loads(incoming('download/extracted/compiled-log-links.json'))['actual_root_commands'];assert commands
assert all(any(x=='opt-level=3'and i>0 and cmd[i-1]=='-C' or x=='-Copt-level=3'for i,x in enumerate(cmd))for cmd in commands),'Require actual recorded compiler opt-level3, not just default assumption'
reg=D/'reviewed-plan/launcher/resolved-source-archive-equality.json';assert H(reg.read_bytes())==lp['registry_map_sha256']
refs=[]
def save(name,data,origin):
 dst=P/'retained'/name;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(data);refs.append({'copy':str(dst.relative_to(P)),'origin':origin,'sha256':H(data),'bytes':len(data)})
linux_names=['README.md','manifest.json','download/extracted/manifest.json','download/extracted/plan.json','download/extracted/source-map.json','download/extracted/result.json','download/extracted/build-state.json','download/extracted/compiler-tools.json','download/extracted/strip-tools.json','download/extracted/tools-after.json','download/extracted/registry-before.json','download/extracted/registry-after.json','download/extracted/control-conformance.json','download/extracted/capability.json','download/extracted/compiler/acquisition.json','download/extracted/strip/acquisition.json','download/extracted/compiled-log-links.json','download/extracted/receipts/program-build.json','download/extracted/receipts/compiler-version.json','download/extracted/receipts/strip.json','download/extracted/full-ledger/comparison-summary.json','download/extracted/full-ledger/original-function-ledger.json','download/extracted/full-ledger/candidate-function-ledger.json','download/extracted/full-ledger/match-ledger.json','recipe-comparison/published-record/reference-build12-analyze.py','recipe-comparison/published-record/REPORT.md','recipe-comparison/published-record/comparison-summary.json']
for n in linux_names:save('Linux13/'+n,incoming(n),'Git515:'+PREFIX+n)
for n in ['static/comparison-summary.json','static/original-function-ledger.json','static/candidate-function-ledger.json','static/match-ledger.json','reviewed-plan/method/analyze.py','build-records/tool-phase-before.json','build-records/tool-phase-after.json','backend-diagnostics.json','build-only-result.json','controller-exit.json']:
 save('Darwin15/'+n,(D/n).read_bytes(),str((D/n).relative_to(R)))
save('registry232-approved-map.json',reg.read_bytes(),str(reg.relative_to(R)))
metrics={}
for name,rows in [('Linux13',lm),('Darwin15',dm)]:metrics[name]={'windows':len(rows),'normalized':sum(bool(x['normalized_candidate_indices'])for x in rows),'raw':sum(bool(x['raw_candidate_indices'])for x in rows),'unmatched':sum(not x['normalized_candidate_indices']for x in rows)}
W(P/'MEASURED.json',{'method_same_exact_sha256':H(method),'common_original492_boundaries_and_hashes':True,'metrics':metrics,'source15_vs_source13_differences':len(changes),'causal_OS_or_compiler_only_claimed':False,'new_match_progress_claimed':False,'one_source15_Linux_v148_controlled_measurement_justified':True,'compiler_or_VM_executed':False,'new_original_decode_or_data':False})
W(P/'input-references.json',{'archive515_plan_seal':'2933991971d677c62714f02fda6d3092ba5bf80e4764bae844275a504e961610','Linux13_manifest_sha256':lseal,'Darwin15_static_manifest_sha256':'1d1c5d5662ae73d892b00b6afc17bba914b3d146b0d1de3ad19be7efb58a886f','retained':refs,'canonical_source15_hashes_only':True,'source_proposal_e591_modified':False,'archived_analyzer_driver_executed':False})
print(json.dumps({'common_boundaries':492,'method_sha256':H(method),'metrics':metrics,'different_source_paths':[r['path']for r in changes],'source15_profile_unchanged':True,'registry_map_sha256':H(reg.read_bytes()),'Linux13_manifest':lseal,'no_new_match_progress':True},indent=2))
