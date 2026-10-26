from pathlib import Path
import json,hashlib,struct
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify():
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 assert H(P/'reviewed-scope/manifest.json')=='3b63d12fe875a52592aaa1e3ad0b5d5c930ab493995410c25a49e2bf594f4d99';ad=J(P/'new-admission-record.json');assert ad['new_original_bodies']==[114,116] and not ad['prior_admission_claimed'] and not ad['recursive_new_callee_bodies']
 original=(P/'reviewed-scope/method/original.so').read_bytes();assert hashlib.sha256(original).hexdigest()=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
 rows=J(P/'newly-admitted/original-metadata.json')
 for ordinal in[114,116]:
  f=next(x for x in rows if x['ordinal']==ordinal);b=(P/f'newly-admitted/original-{ordinal}.bin').read_bytes();assert hashlib.sha256(b).hexdigest()==f['raw_sha256'] and original[f['start']:f['end']]==b;at=0;pcs=[]
  while at<len(b):pcs.append(f['start']+at);at+=16 if b[at]==24 else 8
  assert at==len(b);record=next(x for x in J(P/'complete-structural-coverage.json') if x['ordinal']==ordinal);assert pcs==record['instruction_starts'] and record['structural_all_bytes_covered']
 a=(P/'newly-admitted/original-114.bin').read_bytes();b=(P/'newly-admitted/original-116.bin').read_bytes();ins=lambda x,s,pc:struct.unpack_from('<BBhi',x,pc-s)
 assert ins(a,143608,143984)==(21,2,309,8);assert ins(a,143608,146472)==(7,2,0,-18);assert ins(a,143608,149376)==(183,3,0,18);assert ins(a,143608,149384)==(106,2,16,30575)
 name=struct.pack('<Q',struct.unpack_from('<I',a,149352-143608+4)[0]+(struct.unpack_from('<I',a,149352-143608+12)[0]<<32))+struct.pack('<Q',struct.unpack_from('<I',a,149328-143608+4)[0]+(struct.unpack_from('<I',a,149328-143608+12)[0]<<32))+struct.pack('<H',30575);assert name==b'ArithmeticOverflow'
 assert ins(b,152552,153448)==(183,3,0,19);assert ins(b,152552,153936)==(141,0,0,4);messages=J(P/'direct-message-extents.json');assert len(messages)==34
 for r in messages:
  raw=bytes.fromhex(r['hex']);assert original[r['target']:r['target']+r['bytes']]==raw;pc=r['lddw_pc'];assert original[pc]==24;assert struct.unpack_from('<I',original,pc+4)[0]+(struct.unpack_from('<I',original,pc+12)[0]<<32)==r['target'];assert struct.unpack_from('<BBhi',original,pc+16)==(183,3,0,r['bytes']);assert len(raw)==r['bytes'] and hashlib.sha256(raw).hexdigest()==r['sha256'] and raw.decode()==r['utf8']
 assert next(r for r in messages if r['lddw_pc']==153432)['utf8']=='Arithmetic overflow';assert original[772792:772824]==(P/'direct-formatter-writer-prefix.bin').read_bytes();assert J(P/'direct-formatter-writer-prefix.json')['raw_hex']==(P/'direct-formatter-writer-prefix.bin').read_bytes().hex()
 source=(P/'candidate-source/exit_error.rs').read_text();assert 'impl From<AnchorError> for Error' in source and 'Self::AnchorError(Box::new(ae))' in source and 'error_name: code.name()' in source and 'error_msg: code.to_string()' in source
 return {'status':'PASS_NEW_STATIC_ADMISSION','new_original_bodies':[114,116],'owned_error_code':6008,'name_bytes':18,'message_bytes':19,'box_bytes':160,'direct_message_objects':34,'new_callee_bodies_decoded':0,'source_patch':False,'new_compiler_or_VM_runs':0,'remaining_indirect_writer_closure':True}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
