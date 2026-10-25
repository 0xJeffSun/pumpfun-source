"""Read-only original-byte anchors and isolated source snapshot; no target runtime."""
import hashlib,importlib.util,json,struct
from pathlib import Path
R=Path.cwd();W=R/'work/buy-v3-composition-review'
spec=importlib.util.spec_from_file_location('elf',R/'repro/pump/buy-v3-quote-vault-contract/elf_reader.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);e=m.ELF(R/'evidence/original/pump/deployed.so')
assert hashlib.sha256(e.b).hexdigest()=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
pcs=[0x80ea0,0x80ef0,0x80f70,0x80fd8,0x80fe8,0x81010,0x815f0,0x81638,0x10c40,0x10c50]
a=[]
for pc in pcs:
 b=e.at(pc,8);op,regs,off,imm=struct.unpack('<BBhi',b);v=dict(pc=hex(pc),bytes=b.hex(),immediate=imm)
 if op==0x85 and regs==0x10:v['call_target']=hex(pc+8+imm*8)
 if op&7 in(5,6) and op not in(0x85,0x95):v['branch_target']=hex(pc+8+off*8)
 a.append(v)
assert e.at(0x1b7303,35)==b'buyback fee is at most protocol_fee'
assert e.at(0x1b72dd,38)==b'buyback_fee never exceeds protocol_fee'
assert e.at(0x1b616c,15)==b'TryFromIntError'
assert int.from_bytes(e.at(0x1bde60,8),'little')>>32==0x10c20
files=[R/'work/buy-v3-partial-fill-audit/compose.py',R/'work/buy-v3-partial-fill-audit/source/programs/pump/src/buy_v3_recovered.rs']
files+=list((R/'work/buy-v3-partial-fill-audit/source/programs/pump/src/buy_v3_recovered').glob('*.rs'))
for n in ['optional-fill','preparation','typed-parser','quote-vault','fee-mode','residual-pricing','settlement','event-exit','whitelist-mode']:
 p=R/f'repro/pump/buy-v3-{n}-contract'; files.extend(x for x in [p/'REPORT.md',p/'README.md',p/'contract.json',p/'arithmetic-contract.json'] if x.exists())
out={'scope':'Static source/effect-order review; no build, target execution, fixture, shared-source mutation, publication or full-equivalence claim','inputs':{str(p.relative_to(R)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files},'panic_anchors':a,'panic_type_debug_literal':{'address':'0x1b616c','length':15,'text':'TryFromIntError'},'high_limb_expect_message':{'address':'0x1b7303','length':35,'text':'buyback fee is at most protocol_fee'},'bound_assert_message':{'address':'0x1b72dd','length':38,'text':'buyback_fee never exceeds protocol_fee'},'high_limb_error_vtable':{'address':'0x1bde48','raw':e.at(0x1bde48,32).hex(),'debug_target':'0x10c20','relocations':[r for r in e.reloc if 0x1bde48<=r['offset']<0x1bde68]},'whole_handler_identity':False}
(W/'order-review-v2.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({'static_verified':True,'source_sha256':out['inputs'][str(files[1].relative_to(R))],'original_anchors':len(a)}))
