"""One-time packaging of already retained public bytes; no network/build/runtime."""
from pathlib import Path
import json, hashlib, shutil, importlib.util
P=Path(__file__).resolve().parent; ROOT=P.parents[1]
def h(b):return hashlib.sha256(b).hexdigest()
def dump(n,v): (P/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
# Remove unneeded exploration windows from this new, never-sealed package only.
selected=sorted(set([3,6,16,19,24,35,50,52,77,80,84,88,169]+list(range(170,178))+list(range(205,219))+[280,281,282,283,284,285,286,287,290,294,296,297,298,300,301,307,320,322,324,325,326,327,328,329,330,331,332,333,338,340,341,353]))
s=importlib.util.spec_from_file_location('d',P/'disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d)
for q in (P/'evidence').glob('*.asm'):
 if int(q.stem) not in selected:q.unlink()
for n in selected:(P/'evidence'/f'{n}.asm').write_text(d.render(n))
dump('selected-windows.json',selected)
inputs=[]
def bind(local,source,kind):
 src=ROOT/source;dst=P/local;dst.parent.mkdir(parents=True,exist_ok=True)
 if src.resolve()!=dst.resolve():shutil.copyfile(src,dst)
 inputs.append(dict(local=local,source=source,kind=kind,size=dst.stat().st_size,sha256=h(dst.read_bytes())))
bind('inputs/deployed.so','evidence/dependencies/donation_relay/deployed.so','captured original ELF; immutable full bytes')
for name in ['manifest.json','result.json','proposal/dispatch.rs','proposal/interfaces.rs']:
 bind('inputs/n09/'+name,'work/relay-dispatch-source-proposal/'+name,'explicitly approved frozen N09; selected files only, not whole predecessor copy')
bind('inputs/prior-windows.json','work/relay-dispatch-source-proposal/inputs/prior-windows.json','retained window-boundary inventory; source identities not proved by boundaries')
for name in ['codec-report.md','error-report.md']:
 bind('inputs/'+name,'repro/parallel-work/2026-10-25/handler-results/relay_epoch_whitelist_handlers/inputs/'+name,'public retained codec/error report; contextual evidence only')
for name in ['manifest.json','source/model.rs','source/runtime.rs','source/codec/constants.rs']:
 bind('inputs/integrated/'+name,'work/cli-swarm-2026-10-25/relay_integrated_source_hypothesis/publication/'+name,'explicitly approved frozen integrated source subset; not re-verification of whole package')
dump('input-provenance.json',{'original_sha256':'367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','n09_manifest_sha256':'a44dd8e7b2b706e196995a49f6d43f14a0a9b096e2a0c9553e6419f93c21b655','read_scope':'public retained original, explicitly approved N09/integrated subsets and public codec/error reports; no unrelated sources/caches/network','inputs':inputs})
