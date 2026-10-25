from pathlib import Path
import json,struct,hashlib,subprocess
R=Path.cwd();W=Path(__file__).resolve().parent;O=R/'evidence/original/mayhem/deployed.so';C=R/'repro/mayhem/sell-result-error-twentyfour/build01/artifacts/mayhem_recovered.so';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();b=O.read_bytes()
# All source-byte evidence here is restricted to the previously retained serializer.
spec=[('field_0',8,232,4,0x67010,0x67040),('field_1',12,236,4,0x67050,0x67080),('field_2',16,96,8,0x67090,0x670c0),('field_3',24,104,8,0x670d0,0x67100),('field_4',32,112,8,0x67110,0x67140),('field_5',40,120,8,0x67150,0x67180),('paused',48,245,1,0x67190,0x671c0),('admin',49,0,32,0x671d8,0x671e8),('trader',81,32,32,0x67200,0x67218),('sol_deployed',113,64,16,0x67228,0x67268),('field_9',129,128,8,0x67278,0x672a8),('field_6',137,244,1,0x672c0,0x672d8),('slot_138',138,136,8,0x672e8,0x67318),('field_7',146,144,8,0x67328,0x67358),('field_8',154,152,8,0x67368,0x67398),('version',162,240,4,0x673a8,0x673d8),('field_10',166,160,8,0x673e8,0x67418),('max_sol_per_sweep',174,168,8,0x67428,0x67458),('field_11',182,176,8,0x67468,0x67498),('field_12',190,184,8,0x674a8,0x674d8),('field_13',198,192,8,0x674e8,0x67518),('stable_deployed',206,80,16,0x67528,0x67568),('field_14',222,200,8,0x67578,0x675a8),('field_15',230,208,8,0x675b8,0x675e8),('slot_238',238,216,8,0x675f8,0x67628),('max_stable_per_sweep',246,224,8,0x67638,0x67668)]
rows=[];at=8
for name,wire,native,width,pc,call in spec:
 assert wire==at;at+=width
 op,reg,off,imm=struct.unpack_from('<BBhi',b,pc)
 if name in ['admin','trader','field_6']:assert (op==0xbf and native==0)or(op==0x07 and imm==native)
 else:assert off==native and op in [0x61,0x71,0x79]
 cop,cr,co,ci=struct.unpack_from('<BBhi',b,call);assert(cop,cr)==(0x85,0x10);target=call+8+ci*8;assert target==0x97730
 # Each serializer writer's immediate preceding instruction sets its byte count.
 assert struct.unpack_from('<BBhi',b,call-8)==(0xb7,3,0,width)
 rows.append({'field':name,'serialized_offset_including_discriminator':wire,'original_native_offset':native,'bytes':width,'source_instruction_pc':pc,'source_instruction_hex':b[pc:pc+8].hex(),'writer_call_pc':call,'writer_target':target,'type_limit':'transport width only; signedness and array-versus-integer not inferred'})
assert at==254
(W/'member-map.json').write_text(json.dumps(rows,indent=2)+'\n')
for r in json.loads((W/'current-codec-rows.json').read_text()):
 a,z=r['start'],r['end']
 assert hashlib.sha256(C.read_bytes()[a:z]).hexdigest()==r['raw_sha256']
 out=subprocess.check_output(['/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump','-d',f'--start-address={a}',f'--stop-address={z}',str(C)]);(W/(r['id']+'.asm')).write_bytes(out)
source=(R/'programs/mayhem/src/lib.rs').read_text();start=source.index('pub struct GlobalParams {');end=source.index('\n}\n',start)+3;(W/'current-GlobalParams.rs').write_text(source[start:end])
inputs=[O,C,R/'repro/mayhem/sell-result-error-twentyfour/static/complete-inventory.json.gz',R/'repro/mayhem/global-params-remaining-field-review/field-ledger.json',R/'repro/mayhem/global-params-remaining-field-review/prior/layer01/residual-ledger.json']
(W/'inputs.json').write_text(json.dumps({str(p.relative_to(R)):H(p)for p in inputs},indent=2)+'\n')
print('PASS:26 serializer member writes cover254 wire bytes including discriminator; two current codec windows bound; source excerpt only.')
