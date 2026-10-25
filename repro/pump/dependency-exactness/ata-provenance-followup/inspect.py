"""Recheck existing ATA artifacts and provenance without executing programs/builds."""
from pathlib import Path
import json,hashlib,struct
ROOT=Path(__file__).resolve().parents[3];OUT=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
original=(ROOT/'evidence/dependencies/associated_token/deployed.so').read_bytes()
def sections(b):
 shoff=struct.unpack_from('<Q',b,40)[0];entsize,count,stridx=struct.unpack_from('<HHH',b,58)
 hdr=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*entsize) for i in range(count)];st=hdr[stridx];names=b[st[4]:st[4]+st[5]]
 return [{'name':names[h[0]:].split(b'\0',1)[0].decode(),'offset':h[4],'size':h[5],'type':h[1]} for h in hdr]
bindings={};comparisons=[]
for n in range(1,6):
 folder=f'repro/pump/ata-candidate-build-{n}' if n<5 else 'repro/pump/dependency-exactness/ata-candidate-build-5'
 p=ROOT/folder;candidate=(p/'spl_associated_token_account.so').read_bytes();record=json.loads((p/'comparison.json').read_text());manifest=json.loads((p/'source-manifest.json').read_text());tools=json.loads((p/'tool-versions.json').read_text())
 assert sha(candidate)==record['candidate_sha256'];assert sha(original)==record['original_sha256']
 diffs=[i for i,(a,b) in enumerate(zip(original,candidate)) if a!=b]
 sec=[]
 for s in sections(original):
  if s['type']!=8 and s['size']:sec.append({**s,'different_positions':sum(s['offset']<=i<s['offset']+s['size'] for i in diffs)})
 comparisons.append({'candidate':n,'source_commit':record['source_commit'],'bytes':len(candidate),'sha256':sha(candidate),'full_byte_equality':original==candidate,'first_difference':diffs[0] if diffs else None,'different_positions':len(diffs),'length_difference':len(candidate)-len(original),'section_counts':sec,'source_lockfile_sha256':manifest['Cargo.lock'],'source_manifest_sha256':sha((p/'source-manifest.json').read_bytes()),'selected_rustc_sha256':tools.get('selected_rustc_sha256'),'selected_rustc_version':tools.get('selected_rustc_version'),'image':record['image'],'commands':record['commands']})
 for name in ['comparison.json','source-manifest.json','tool-versions.json','build.log','image-inspect.json','hosted-run.json']:
  b=(p/name).read_bytes();bindings[f'{folder}/{name}']={'sha256':sha(b),'bytes':len(b)}
for rel in ['repro/pump/ata-layout-analysis.json','repro/pump/ata-release-attribution.json','repro/pump/ata-release-v1.1.0.json','repro/pump/ata-crate-source-candidate.json','repro/pump/ata-crate-vcs-info.json','repro/pump/ata-candidate-recipe-4/selection.json','repro/pump/dependency-exactness/ata-chronology-candidate.json','work/ata-provenance-followup/REPORT.md','work/ata-provenance-followup/sources.json']:
 b=(ROOT/rel).read_bytes();bindings[rel]={'sha256':sha(b),'bytes':len(b)}
prior=json.loads((ROOT/'work/ata-provenance-followup/sources.json').read_text())
for name,r in prior.items():
 b=(ROOT/'work/ata-provenance-followup'/name).read_bytes();assert sha(b)==r['sha256'];bindings['work/ata-provenance-followup/'+name]={'sha256':sha(b),'bytes':len(b),'url':r['url']}
r={'original_sha256':sha(original),'original_bytes':len(original),'artifact_comparisons':comparisons,'read_only_input_bindings':bindings,'no_builds_or_program_execution':True,'no_executable_mutation':True,'scope':'Independent local comparison/count and source-provenance reads; no source recovery or full identity claimed.'}
(OUT/'evidence.json').write_text(json.dumps(r,indent=2)+'\n')
print(json.dumps([{k:c[k] for k in ['candidate','source_commit','sha256','different_positions','first_difference']} for c in comparisons],indent=2))
