from pathlib import Path
import hashlib,json,struct,difflib,tarfile
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda n:json.loads((P/n).read_text())
m=J('manifest.json');assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
files=set()
for p in P.rglob('*'):
 assert not p.is_symlink()
 if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']:files.add(p.relative_to(P).as_posix())
assert files==set(m)
for n,v in m.items():b=(P/n).read_bytes();assert v=={'sha256':H(b),'bytes':len(b)}
proof=J('caller-proof.json');original=(P/'original.so').read_bytes();assert H(original)==proof['original_sha256']=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
op,regs,off,imm=struct.unpack_from('<BBhi',original,203080);assert (op,regs,off)==(133,16,0)and 203080+8+imm*8==1008
assert original[203080:203088].hex()==proof['instruction_hex']
for start,row in J('complete-original-windows.json').items():
 assert int(start)==row['start']and H(original[row['start']:row['end']])==row['raw_sha256']
 pc=row['start']
 for ins in row['instructions']:
  assert ins['pc']==pc;raw=bytes.fromhex(ins['raw']);assert original[pc:pc+len(raw)]==raw
  if 'actual_target'in ins:assert pc+8+struct.unpack_from('<i',raw,4)[0]*8==ins['actual_target']
  pc+=len(raw)
 assert pc==row['end']
before=(P/'before.rs').read_text();after=(P/'after.rs').read_text()
old='        require_keys_eq!(account.key(), share.address, FeeError::ShareholderAccountMismatch);'
new='''        if account.key() != share.address {
            return Err(error!(FeeError::ShareholderAccountMismatch)
                .with_values((account.key(), share.address)));
        }'''
assert before.count(old)==1 and before.replace(old,new)==after
assert H(before.encode())==proof['current_source_sha256']==J('origins.json')['current_legacy_source_sha256']
assert H(after.encode())==proof['source_proposal_sha256']
patch=''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-fees/src/sharing_update.rs',tofile='b/programs/pump-fees/src/sharing_update.rs'));assert patch==(P/'source.patch').read_text()
with tarfile.open(P/'anchor-lang-0.31.1.crate')as t:assert t.extractfile('anchor-lang-0.31.1/src/error.rs').read()==(P/'anchor-error.rs').read_bytes()
print(json.dumps({'status':'PASS','source_files_changed':1,'original_complete_windows':2,'builds':0,'runtime_cases':0,'full_original_byte_equality':False}))
