from pathlib import Path
import hashlib,json
root=Path('/Users/shawwalters/.local/share/rea-tools/rea-agents-6.8.0-sbpf')
manifest=Path(__file__).with_name('adapter-manifest.json');d=json.loads(manifest.read_text()); records={r['file']:r for r in d['files']}
annotation='annotation_policy: "atomic-function-entry-metadata-v1",'
label='local_sbpf_call_relocations: "ELF-R_BPF_64_32-in-ephemeral-memory-v1",'
limit='"Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.",'
for p in (root/'dist').rglob('*.js'):
 t=p.read_text();old=t
 if annotation in t:
  assert label not in t;t=t.replace(annotation,annotation+'\n'+label)
 needle='"The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.",'
 if needle in t:
  assert limit not in t;t=t.replace(needle,limit+'\n'+needle)
 if t!=old:
  p.write_text(t);rel=str(p.relative_to(root));original=records.get(rel,{}).get('original_sha256',hashlib.sha256(old.encode()).hexdigest());records[rel]={'file':rel,'original_sha256':original,'adapter_sha256':hashlib.sha256(t.encode()).hexdigest()}
p=root/'bridge/ghidra/ReaGhidraApplySeeds.java';records[str(p.relative_to(root))]['adapter_sha256']=hashlib.sha256(p.read_bytes()).hexdigest()
d['files']=list(records.values());manifest.write_text(json.dumps(d,indent=2)+'\n')
