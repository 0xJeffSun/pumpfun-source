"""Read-only standard-library source/byte evidence checks; no target execution."""
import argparse,hashlib,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);args=p.parse_args();H=lambda b:hashlib.sha256(b).hexdigest()
m=json.loads((P/'manifest.json').read_text());assert {str(f.relative_to(P)) for f in P.rglob('*') if f.is_file()}==set(m['files'])|{'manifest.json'}
for name,r in m['files'].items():
 b=(P/name).read_bytes();assert H(b)==r['sha256'] and len(b)==r['bytes'],name
v=json.loads((P/'evidence.json').read_text());s=(P/'utilize11.rs').read_text();t=(P/'utilize-proposed.rs').read_text()
assert H(s.encode())==v['accepted11_utilize_sha256'];assert H(t.encode())==v['proposed_utilize_sha256']
old='''    let remaining_uses = metadata_uses
        .remaining
        .checked_sub(number_of_uses)
        .ok_or(MetadataError::NotEnoughUses)?;'''
new='    let remaining_uses = metadata_uses.remaining - number_of_uses;'
assert s.count(old)==1 and t==s.replace(old,new)
assert '''    if number_of_uses == 0
        || number_of_uses > metadata_uses.total
        || number_of_uses > metadata_uses.remaining
    {
        return Err(MetadataError::NotEnoughUses.into());
    }
'''+new in t
records={r['file_offset']:r for r in v['guard_and_cleanup_anchors']}
assert records[238800]['branch_target_file_offset']==238840
assert records[238816]['branch_target_file_offset']==238840
assert records[238832]['raw']=='3d97070000000000' and records[238832]['branch_target_file_offset']==238896
assert records[238880]['direct_call_target_file_offset']==12448
assert records[238888]['branch_target_file_offset']==237920
assert records[238936]['raw']=='1f91000000000000'
for r in records.values():
 op,regs,off,imm=struct.unpack('<BBhi',bytes.fromhex(r['raw'])[:8]);assert(op,regs&15,regs>>4,off,imm)==(r['opcode'],r['dst'],r['src'],r['displacement'],r['immediate'])
 if 'branch_target_file_offset' in r:assert r['branch_target_file_offset']==r['file_offset']+8+off*8
assert v['new_builds']==v['new_runtime_executions']==0 and not v['native_layout_or_historical_source_identity']
out={'integrity':True,'exact_single_source_change':True,'all_u64_argument':'guard success implies1<=n<=r; no checked_sub error reachable','fresh_original_check':False,'compiler_or_runtime_executions':0,'byte_identity_claimed':False}
if args.repo:
 R=args.repo.resolve()
 for name,h in v['external_inputs'].items():assert H((R/name).read_bytes())==h,name
 b=(R/'evidence/dependencies/token_metadata/deployed.so').read_bytes();assert H(b)==v['original_sha256']
 for r in records.values():assert b[r['file_offset']:r['file_offset']+len(bytes.fromhex(r['raw']))]==bytes.fromhex(r['raw'])
 body=v['original_utilize_body'];assert H(b[body['file_start']:body['file_end']])==body['sha256']
 out['fresh_original_check']=True
print(json.dumps(out,indent=2))
