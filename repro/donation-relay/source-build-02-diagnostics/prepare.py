from pathlib import Path
import json,hashlib,shutil,tarfile,io,datetime,re,collections
P=Path(__file__).resolve().parent;R=P.parents[1];B=R/'work/relay-source-build-02';L=R/'work/relay-corrected-source-build-launcher';H=lambda b:hashlib.sha256(b).hexdigest()
def copy(src,dst):
 p=P/dst;p.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,p)
for name in ['build-launch.json','build-result.json','build.stdout','build.stderr','tool-phase-before.json','tool-phase-after.json','dependency-source-after.json','retained-artifacts.json']:copy(B/name,'attempt/'+name)
for name in ['relay-source-build-02-launch.json','relay-source-build-02-launch.stdout','relay-source-build-02-launch.stderr','relay-source-build-02-precheck.json']:copy(R/'work'/name,'attempt/'+name)
for name in ['manifest.json','relay_build_once.py','resolved-source-sha256.json','tool-witness/tool-files.json','tool-witness/sdk-files.json']:copy(L/name,'launcher/'+name)
for f in (B/'source').rglob('*'):
 if f.is_file():copy(f,'source/'+str(f.relative_to(B/'source')))
copy(B/'retained/candidate.so','candidate.so');copy(B/'retained/unstripped.so','unstripped.so')
copy(R/'evidence/dependencies/donation_relay/deployed.so','original.so');copy(R/'repro/donation-relay/context-source-proposal/inputs/windows.json','original-windows.json')
# Keep source/runtime and preflight provenance manifests, not unrelated private inputs.
for src,dst in [(R/'work/relay-runtime-source-integration/manifest.json','prior/runtime-source-manifest.json'),(R/'work/relay-runtime-build-preflight/handoff/manifest.json','prior/preflight-manifest.json'),(R/'work/relay-first-build-launcher-correction/manifest.json','prior/launcher-correction-manifest.json')]:copy(src,dst)
rows=[];by=collections.defaultdict(list)
for i,line in enumerate((P/'attempt/build.stderr').read_text().splitlines(),1):
 if line.startswith('Error:'):
  m=re.search(r'(?:Function (.*?) Stack|in method (.*?) overwrites)',line);name=next(x for x in m.groups() if x) if m else None
  row={'line':i,'text':line,'symbol':name};rows.append(row);by[name].append(row)
summary=[]
for name,x in by.items():
 first=next((r for r in x if 'Stack offset' in r['text']),None);nums=re.search(r'Stack offset of (\d+) exceeded max offset of (\d+) by (\d+) bytes.*frame size: (\d+)',first['text']) if first else None
 summary.append({'symbol':name,'diagnostics':len(x),'stack_diagnostic':first,'stack_offset':int(nums[1]) if nums else None,'limit':int(nums[2]) if nums else None,'excess':int(nums[3]) if nums else None,'estimated_frame':int(nums[4]) if nums else None})
(P/'stack-diagnostics.json').write_text(json.dumps({'all':rows,'by_function':summary,'total':len(rows),'backend_exitcode_is_not_clean_build':True},indent=2)+'\n')
expected=json.loads((L/'resolved-source-sha256.json').read_text());actual={str(f.relative_to(P/'source')):H(f.read_bytes()) for f in (P/'source').rglob('*') if f.is_file()};assert actual==expected
s={}
for n in json.loads((L/'tool-witness/sdk-files.json').read_text()):
 f=B/'sdk'/n;s[n]={'sha256':H(f.read_bytes()),'mode':f.stat().st_mode&0o777,'size':f.stat().st_size}
assert s==json.loads((L/'tool-witness/sdk-files.json').read_text());(P/'SDK-source-after.json').write_text(json.dumps(s,indent=2)+'\n')
print(json.dumps({'critical_diagnostics':len(rows),'affected_functions':len(summary),'source_inputs':len(actual)}))
