import json,hashlib,sys
from pathlib import Path
r=Path(sys.argv[1]);p=Path(__file__).resolve().parent;sys.path.insert(0,str(p));from decode import decode
sha=lambda b:hashlib.sha256(b).hexdigest()
inv=json.loads((r/'work/fees-mayhem-function-inventory/mayhem-functions.json').read_text());b=(r/'evidence/original/mayhem/deployed.so').read_bytes()
rows=[]
for st,label in [(519296,'withdraw_sol_wrapper'),(519952,'withdraw_quote_wrapper'),(524888,'update_wrapper'),(522120,'reset_wrapper'),(0xc138,'withdraw_sol_body'),(0xc560,'withdraw_quote_body'),(0xcb08,'update_body'),(0x66fd0,'global_serializer'),(0x2b468,'withdraw_sol_rate'),(0x2b768,'withdraw_quote_rate'),(0x2ba68,'update_setter')]:
 row=next(x for x in inv['original_rows'] if x['original_start']==st);en=row['original_end'];raw=b[st:en];path=f'windows/{label}.bin';(p/path).write_bytes(raw);(p/f'windows/{label}.asm').write_text(decode(raw,st));rows.append(dict(label=label,start=st,end=en,sha256=sha(raw),path=path,bounds='retained next-known-entry inventory window; not historical symbol identity',inventory_row=row))
(p/'windows.json').write_text(json.dumps(rows,indent=2)+'\n')
refs=[]
for rel,dest in [('repro/mayhem/field-role-crosswalk/crosswalk.json','crosswalk.json'),('repro/mayhem/field-role-crosswalk/inputs.json','crosswalk-inputs.json')]:
 raw=(r/rel).read_bytes();(p/'inputs'/dest).write_bytes(raw);refs.append(dict(source=rel,copy='inputs/'+dest,sha256=sha(raw)))
lib=(r/'programs/mayhem/src/lib.rs').read_bytes();lines=lib.splitlines(keepends=True)
for a,z in [(24,116),(127,310),(348,462)]:
 raw=b''.join(lines[a-1:z]);dest=f'inputs/lib-{a}-{z}.rs';(p/dest).write_bytes(raw);refs.append(dict(source='programs/mayhem/src/lib.rs',source_sha256=sha(lib),line_start=a,line_end=z,copy=dest,sha256=sha(raw)))
for f in (r/'programs/mayhem/src/instructions').glob('*.rs'):
 raw=f.read_bytes();dest='inputs/'+f.name;(p/dest).write_bytes(raw);refs.append(dict(source=str(f.relative_to(r)),copy=dest,sha256=sha(raw)))
(p/'provenance.json').write_text(json.dumps(dict(checkpoint='8099031',original_sha256=sha(b),candidate_sha256=sha((r/'repro/mayhem/twentyfour/mayhem_recovered.so').read_bytes()),inputs=refs,inventory_source='work/fees-mayhem-function-inventory/mayhem-functions.json',inventory_sha256=sha((r/'work/fees-mayhem-function-inventory/mayhem-functions.json').read_bytes())),indent=2)+'\n')
