"""Bind source-only recovery to original windows/calls; no runtime or compiler."""
import hashlib,importlib.util,json,struct
from pathlib import Path
R=Path.cwd();W=R/'work/buy-v3-quote-descriptor-review'
s=importlib.util.spec_from_file_location('e',R/'repro/pump/buy-v3-quote-vault-contract/elf_reader.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);e=m.ELF(R/'evidence/original/pump/deployed.so');digest=hashlib.sha256(e.b).hexdigest();assert digest=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
windows=[(0x94908,0x94e28),(0x94e28,0x950e0),(0x950e0,0x95360),(0x95360,0x95610),(0x17c3d8,0x17c548),(0x17c548,0x17c850),(0x17c850,0x17cae8),(0x1a0938,0x1a0a20),(0x84838,0x84978)]
records=[]
for a,z in windows:
 b=e.at(a,z-a);records.append(dict(start=hex(a),end=hex(z),bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),raw=b.hex()))
for v in json.loads((W/'calls.json').read_text()):
 p=int(v['pc'],16);op,reg,off,imm=struct.unpack('<BBhi',e.at(p,8));assert op==0x85 and reg==0x10 and p+8+imm*8==int(v['target'],16);assert not any(p<=r['offset']<p+8 for r in e.reloc)
clock=[r for r in e.reloc if r['offset']==0x1a0978];assert len(clock)==1 and clock[0]['symbol']['name']=='sol_get_clock_sysvar'
assert struct.unpack('<BBhi',e.at(0x17c868,8))[-1]==167
assert struct.unpack('<BBhi',e.at(0x17ca70,8))[-1]==108
assert struct.unpack('<BBhi',e.at(0x94d00,8))[-1]==6063
inputs=[W/'quote_descriptor.rs',W/'spl-token-2022-6.0.0-transfer-fee.rs',R/'repro/pump/buy-v3-quote-vault-contract/manifest.json',R/'repro/pump/buy-v3-settlement-contract/manifest.json',R/'repro/pump/buy-v3-event-exit-contract/manifest.json',R/'repro/pump/buy-v3-residual-pricing-contract/manifest.json']
out={'original_sha256':digest,'windows':records,'clock_syscall_relocation':clock,'source_and_sealed_packets':{str(p.relative_to(R)):hashlib.sha256(p.read_bytes()).hexdigest() for p in inputs},'source_compiled':False,'runtime_cases':0,'historical_source_or_native_abi_identity':False}
(W/'bindings.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(dict(static_verified=True,full_windows=len(windows),calls_checked=len(json.loads((W/'calls.json').read_text())),clock_syscall=clock[0]['symbol']['name'],runtime_cases=0)))
