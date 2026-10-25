#!/usr/bin/env python3
"""Portable static evidence verifier. No execution of target code or external tools."""
import sys
sys.dont_write_bytecode=True
if not __debug__:raise RuntimeError('Run without -O: verification assertions must be enabled')
from pathlib import Path
import hashlib,json,tarfile,difflib
from analyze import produce,H,readjson
P=Path(__file__).resolve().parent
assert not any(x.is_symlink() for x in P.rglob('*')),'symlink in publication'
manifest=readjson(P/'manifest-sha256.json')
# Only the top-level seal is excluded. Old input manifests remain immutable payloads.
actual={f.relative_to(P).as_posix():H(f.read_bytes()) for f in P.rglob('*') if f.is_file() and f!=P/'manifest-sha256.json'}
assert actual==manifest,'publication file inventory or digest mismatch'
for n,v in produce(P).items():assert readjson(P/n)==v,('recomputed static evidence mismatch',n)
I=P/'inputs';old=readjson(I/'manifest-sha256.json')
for origin in readjson(P/'input-origins.json'):
 b=(P/origin['local']).read_bytes();assert len(b)==origin['bytes'] and H(b)==origin['sha256']
 assert origin['git_commit']=='7a9cf0136087d3a6187be07660cbbfbe62ead526'
 name=origin['local'].removeprefix('inputs/')
 if name in old:assert old[name]==H(b)
with tarfile.open(I/'source-snapshot.tar.gz') as t:
 src={m.name:t.extractfile(m).read() for m in t if m.isfile()}
for n in ['donation.rs','lib.rs']:assert (I/n).read_bytes()==src['programs/pump-fees/src/'+n]
for row in readjson(P/'source-ranges.json'):
 b=src[row['source']];assert H(b)==row['whole_sha256']
 lines=b.splitlines(keepends=True);a=sum(map(len,lines[:row['line_start']-1]));z=sum(map(len,lines[:row['line_end']]))
 assert (a,z)==(row['byte_start'],row['byte_end']) and H(b[a:z])==row['sha256']
source=(I/'donation.rs').read_text();replacement=source.replace('let info=ctx.accounts.pool.to_account_info();','let info = &ctx.accounts.pool;').replace('let sharing=ctx.accounts.sharing_config.to_account_info();','let sharing = &ctx.accounts.sharing_config;')
expected=''.join(difflib.unified_diff(source.splitlines(True),replacement.splitlines(True),fromfile='a/programs/pump-fees/src/donation.rs',tofile='b/programs/pump-fees/src/donation.rs'))
assert (P/'borrowed-accounts.patch').read_text()==expected
start=replacement.index('pub fn create(');end=replacement.index('#[derive(Accounts)]',start)
assert (P/'create-body-hypothesis.rs').read_text()=='// Uncompiled reconstruction hypothesis; use existing imports and account context.\n'+replacement[start:end]
ins=readjson(P/'instructions.json');disc=int.from_bytes(hashlib.sha256(b'global:create_donation_fee_pda').digest()[:8],'little')
assert disc==int.from_bytes(bytes.fromhex('f48b10580eff7a1a'),'little')
for side,dp,bp,target,cp,wp,hp,body,ndata in [('original',599184,599200,602624,602704,655904,656328,163920,77),('candidate',331528,331544,333128,333208,356136,356560,424568,75)]:
 d={r['pc']:r for r in ins['dispatch:'+side]};w={r['pc']:r for r in ins['wrapper:'+side]};h={r['pc']:r for r in ins['handler:'+side]}
 assert d[dp]['imm64_unsigned']==disc and d[bp]['branch_target']==target and d[cp]['direct_target']==wp and w[hp]['direct_target']==body
 assert len([r for r in h.values() if 'direct_target' in r])==ndata
 assert len([r for r in h.values() if r['opcode']==133 and 'relocation' in r])==3
 assert not [r for r in h.values() if r['opcode']==141]
 for r in h.values():
  if 'branch_target' in r:assert r['branch_target'] in h
# Concrete anchors behind manual source interpretation; not a semantic equivalence proof.
O={r['pc']:r for r in ins['handler:original']};C={r['pc']:r for r in ins['handler:candidate']}
for rows,disable,version,data_len,short,panic,pool_borrow,pool_decode,sharing_borrow,sharing_decode,clock,event,cpi in [(O,163944,163960,164864,164872,165000,164440,164600,173176,173320,167784,171072,172968),(C,424592,424608,425112,425120,425240,425752,425888,435960,436096,431776,433872,435744)]:
 assert rows[disable]['opcode']==87 and rows[disable]['immediate_signed']==4
 assert rows[version]['offset_signed']==849
 assert rows[short]['opcode']==165 and rows[short]['immediate_signed']==115
 for pc in [data_len,panic,pool_borrow,pool_decode,sharing_borrow,sharing_decode,clock,event,cpi]:assert 'direct_target' in rows[pc]
assert C[425648]['direct_target']==51424
assert O[165528]['direct_target']==796464 and C[425480]['direct_target']==695512
assert O[167376]['offset_signed']==C[431384]['offset_signed']==849
assert O[167376]['immediate_signed']==C[431384]['immediate_signed']==1
assert O[175792]['direct_target']==O[177016]['direct_target']==289880
assert C[428504]['direct_target']==C[437472]['direct_target']==555208
proof=readjson(I/'caller-static-proof.json')
assert proof['windows']['wrapper']['comparison']['normalized_equal']
assert proof['windows']['parser']['comparison']['normalized_equal']
assert not proof['windows']['handler']['comparison']['normalized_equal']
assert (proof['windows']['handler']['original']['size'],proof['windows']['handler']['candidate']['size'])==(13800,13592)
inline=readjson(P/'inline-objects.json');native=[x['hex'] for x in inline if x['role'].startswith('native mint')];assert len(native)==2 and native[0]==native[1]
assert hashlib.sha256(b'event:DonationFeePdaCreated').digest()[:8].hex()=='5e1489ef234de1eb'
r=readjson(P/'result.json');assert not r['compiled'] and not r['target_executed'] and not r['semantic_equivalence_proven'] and not r['security_signoff'] and r['completion_count_delta']==0
print(json.dumps({'verified':True,'payloads':len(manifest),'code_window_records':len(readjson(P/'ranges.json')),'call_records':len(readjson(P/'calls.json')),'complete_handler_data_objects':len(readjson(P/'handler-data.json')),'body_direct_calls':{'original':77,'candidate':75},'source_inputs':len(src),'static_integrity_only':True,'build_or_target_execution':False},indent=2))
