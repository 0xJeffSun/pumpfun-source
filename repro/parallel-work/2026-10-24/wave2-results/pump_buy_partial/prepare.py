from pathlib import Path
import json,hashlib,shutil,re,subprocess
R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source'); P=Path(__file__).resolve().parent
h=lambda b:hashlib.sha256(b).hexdigest()
def put(n,b):
 p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def js(n,x):put(n,(json.dumps(x,indent=2,sort_keys=True)+'\n').encode())
inputs=[]
def copy(src,name):
 b=(R/src).read_bytes();put(name,b);inputs.append(dict(path=name,origin=src,sha256=h(b),bytes=len(b)))
copy('evidence/original/pump/deployed.so','evidence/original.so')
copy('work/cli-swarm-2026-10-24/pump_partials/priority-evidence.json','evidence/prior-filter.json')
for name in ['buy','v3_configured_fee']:
 copy(f'repro/pump/bonding-curve-serializer-fortyeight/differential/{name}.json.gz',f'evidence/{name}.json.gz')
for name in ['docs/COMPLETION.md','repro/status.json','repro/pump/bonding-curve-serializer-fortyeight/receipt-build-bindings.json']:
 copy(name,'evidence/'+Path(name).name)
slices=[]
for src,lo,hi,name in [('lib.rs',100,100,'entry'),('lib.rs',415,422,'option-bool'),('trade.rs',114,181,'buy'),('trade_types.rs',1,24,'curve-fields'),('trade_types.rs',55,99,'event-fields')]:
 path='programs/pump/src/'+src
 b=subprocess.check_output(['git','-C',str(R),'show','8099031:'+path]); lines=b.splitlines(keepends=True); start=sum(map(len,lines[:lo-1]));end=sum(map(len,lines[:hi]));out='source/'+name+'.rs';put(out,b[start:end]);slices.append(dict(path=out,origin=path,commit='8099031',lines_inclusive=[lo,hi],bytes_half_open=[start,end],sha256=h(b[start:end]),full_source_sha256=h(b),current_source_matches=(R/path).read_bytes()==b))
asm=(R/'research/imported-lab/analysis/pump_fun/pump.asm').read_bytes(); windows=[]
for name,start,end in [('wrapper',1214152,1215528),('body',1342368,1346040)]:
 lines=[]
 for l in asm.decode().splitlines(keepends=True):
  m=re.match(r'\s*([0-9a-f]+):',l)
  if m and start<=int(m[1],16)<end:lines.append(l)
 put(name+'.asm',''.join(lines).encode());windows.append(dict(path=name+'.asm',address_half_open=[start,end],boundary='inferred direct-call entry to next entry; not historical function identity'))
js('inputs.json',inputs);js('source-ranges.json',slices);js('windows.json',windows)
js('asm-provenance.json',dict(origin='research/imported-lab/analysis/pump_fun/pump.asm',sha256=h(asm),note='Verbatim selected lines; raw instruction bytes checked against ELF; printed symbolic branch annotations are not used.'))
