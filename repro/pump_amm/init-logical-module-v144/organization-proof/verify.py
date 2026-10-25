from pathlib import Path
import argparse,json,hashlib,struct
from elf_reader import Elf
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n
j=json.loads((w/'helper-proof.json').read_text());assert [x['offset']for x in j['differences']]==[2768,2776]
for row,file in zip(j['rows'],['evidence/original/pump_amm/deployed.so','repro/pump_amm/init-user-ownership-v144/unstripped.so']):
 b=(a.repo/file).read_bytes();s=row['start'];assert hashlib.sha256(b[s:s+7824]).hexdigest()==row['raw_sha256'];pc=row['filename_pointer_pc'];ptr=struct.unpack_from('<I',b,pc+4)[0]|struct.unpack_from('<I',b,pc+12)[0]<<32;assert ptr==row['filename_pointer'];assert b[ptr:ptr+row['filename_bytes']].decode()==row['filename'];assert struct.unpack_from('<i',b,s+2768+4)[0]==row['line'];assert struct.unpack_from('<i',b,s+2776+4)[0]==row['filename_bytes']
o=Elf(a.repo/'evidence/original/pump_amm/deployed.so');c=Elf(a.repo/'repro/pump_amm/init-user-ownership-v144/unstripped.so')
assert [i for i in range(0,7824,8)if o.normalized[0xd1290+i:0xd1290+i+8]!=c.normalized[0xdb278+i:0xdb278+i+8]]==[2768,2776]
assert j['rows'][0]['line']==8 and j['rows'][1]['line']==449
assert j['rows'][0]['filename']=='programs/pump-amm/src/instructions/token_incentives/init_user_volume_accumulator.rs'
b=(a.repo/'evidence/original/pump_amm/deployed.so').read_bytes();pc=0xd08a0;assert pc+8+struct.unpack_from('<i',b,pc+4)[0]*8==0xd1290
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H(w/n)==h,n
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: initializer derive ownership and authentic diagnostic path/line; original workspace/module contents remain unproved.')
