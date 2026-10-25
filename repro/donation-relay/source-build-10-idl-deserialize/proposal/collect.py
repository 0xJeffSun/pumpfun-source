from pathlib import Path
import importlib.util,json,shutil,hashlib,struct
P=Path(__file__).resolve().parent;R=P.parents[1];S=R/'repro/donation-relay/source-build-09-idl-owned'
s=importlib.util.spec_from_file_location('d',P/'disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d)
H=lambda b:hashlib.sha256(b).hexdigest()
for n in ['original.so','candidate.so','unstripped.so']:shutil.copyfile(S/n,P/n)
o=d.a.Elf((P/'original.so').read_bytes());c=d.a.Elf((P/'unstripped.so').read_bytes());ors=json.loads((P/'original-function-ledger.json').read_text());crs=json.loads((P/'candidate-function-ledger.json').read_text())
def closure(rows,roots):
 by={r['start']:r for r in rows};seen=set();pending=list(roots)
 while pending:
  x=pending.pop()
  if x in seen or x not in by:continue
  seen.add(x);pending.extend(y['target']for y in by[x]['direct_calls'])
 return {'roots':roots,'windows':[by[x]for x in sorted(seen)],'unresolved_direct_targets':sorted({y['target']for x in seen for y in by[x]['direct_calls']if y['target']not in by}),'indirect_calls':[dict(window_start=x,**i)for x in sorted(seen)for i in by[x]['indirect_calls']]}
oc=closure(ors,[ors[x]['start']for x in [16,171,217,218,290,296,297,298]])
selected=[r for r in crs if any(x in ' '.join(r['names'])for x in ['idl5typed','idl11dispatch170','exit_error','error_report6report','error_report5lower'])]
cc=closure(crs,[r['start']for r in selected]);(P/'closures.json').write_text(json.dumps({'original':oc,'candidate':cc},indent=2)+'\n')
for label,elf,rs in [('original',o,oc['windows']),('candidate',c,cc['windows'])]:
 q=P/'disassembly'/label;q.mkdir(parents=True,exist_ok=True)
 for r in rs:(q/(str(r['start'])+'.asm')).write_text(d.render(elf,r['start'],r['end']))
literals={}
for text in ['AccountDidNotDeserialize','Failed to deserialize the account','Unexpected length of input','failed to fill whole buffer']:
 b=text.encode();matches=[]
 for section in o.sections:
  if section['type']==8 or not section['flags']&2:continue
  data=o.section_bytes(section);at=data.find(b)
  while at>=0:matches.append(section['address']+at);at=data.find(b,at+1)
 literals[text]={'bytes':len(b),'addresses':matches,'sha256':H(b)}
(P/'literals.json').write_text(json.dumps(literals,indent=2)+'\n')
q=P/'framework';q.mkdir(exist_ok=True);src=R/'work/fees-v144-cargo-home/registry/src/index.crates.io-1949cf8c6b5b557f/borsh-0.10.4/src/de/mod.rs';shutil.copyfile(src,q/'borsh-0.10.4-de.rs')
(P/'bindings.json').write_text(json.dumps({'current_index_sha256':H((R/'repro/donation-relay/current.json').read_bytes()),'checkpoint_manifest_sha256':H((S/'manifest.json').read_bytes()),'original_sha256':H((P/'original.so').read_bytes()),'candidate_sha256':H((P/'candidate.so').read_bytes()),'candidate_symbols_sha256':H((P/'unstripped.so').read_bytes()),'source_sha256':{n:H((P/'before'/n).read_bytes())for n in ['idl.rs','exit_error.rs']},'framework_source_role':'Retained candidate dependency evidence corroborates natural Borsh read_exact/error-map source; not original compiler provenance.'},indent=2)+'\n')
print(len(oc['windows']),len(cc['windows']),literals)
