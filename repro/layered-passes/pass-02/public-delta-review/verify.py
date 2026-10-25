#!/usr/bin/env python3
"""Offline, stdlib-only integrity and exact-delta verifier. Never executes target code."""
from pathlib import Path
import argparse, hashlib, json, re, struct, difflib
P=Path(__file__).resolve().parent
def sha(b):return hashlib.sha256(b).hexdigest()
def load(p):return json.loads((P/p).read_text())
def apply(files,patch):
 lines=patch.splitlines(keepends=True);i=0
 while i<len(lines):
  assert lines[i].startswith('--- a/'),lines[i]
  name=lines[i][6:].strip();assert lines[i+1]=='+++ b/'+name+'\n';i+=2
  old=files[name].decode().splitlines(keepends=True);new=[];cursor=0
  while i<len(lines) and not lines[i].startswith('--- a/'):
   m=re.fullmatch(r'@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@[^\n]*\n',lines[i]);assert m,lines[i]
   start=int(m[1])-1;assert start>=cursor;new+=old[cursor:start];cursor=start;i+=1
   used=added=0
   while i<len(lines) and not lines[i].startswith(('@@ ','--- a/')):
    l=lines[i];i+=1
    assert l[0] in ' +-'
    if l[0] in ' -':assert cursor<len(old) and old[cursor]==l[1:],(name,cursor,l);cursor+=1;used+=1
    if l[0] in ' +':new.append(l[1:]);added+=1
   assert used==int(m[2] or 1) and added==int(m[4] or 1)
  new+=old[cursor:];files[name]=''.join(new).encode()
 return files
def checks():
 identities=load('source-identity.json');files={}
 for row in identities['files']:
  f=row['path'];before=(P/'baseline'/f).read_bytes();after=(P/'reviewed'/f).read_bytes();root=(P/'observed-root'/f).read_bytes()
  assert sha(before)==row['baseline_sha256'];assert sha(after)==row['reviewed_sha256'];assert sha(root)==row['observed_root_sha256']
  assert (root==after)==row['root_matches_reviewed'];assert (root==before)==row['root_matches_baseline'];files[f]=before
  actual=''.join(difflib.unified_diff(before.decode().splitlines(True),after.decode().splitlines(True),fromfile='a/'+f,tofile='b/'+f)).encode()
  assert (P/'deltas'/(f.replace('/','__')+'.patch')).read_bytes()==actual
 e='evidence/repro/'
 for p in ['layered-passes/pass-02/review-candidates/amm-destination-rent/destination-rent.patch','layered-passes/pass-02/review-candidates/fees-predicate-quote/approved-source.patch','layered-passes/pass-02/review-candidates/fees-legacy-social/source.patch','pump/final-error-metadata-source-proposal/metadata-separation.patch']:
  files=apply(files,(P/(e+p)).read_text())
 for f,b in files.items():assert b==(P/'reviewed'/f).read_bytes(),f
 # Exact 11 token substitutions preserve all other bytes in these three files.
 n=0
 for f in ['create_v2.rs','trade.rs','multi_hop_curve.rs']:
  path='programs/pump/src/'+f;b=(P/'baseline'/path).read_bytes();a=(P/'reviewed'/path).read_bytes()
  token=b'PumpError::ReconstructionBranchUnsupported';n+=b.count(token)
  assert b.replace(token,b'crate::ReconstructionError::ReconstructionBranchUnsupported')==a
 assert n==11
 # Re-decode only the bounded byte witnesses, never target execution.
 witnesses=load('byte-witnesses.json')
 for w in witnesses['instructions']:
  raw=bytes.fromhex(w['raw_hex']);assert len(raw) in (8,16)
  op,regs,off,imm=struct.unpack('<BBhi',raw[:8]);assert op==w['opcode']
  if 'target' in w:assert op==0x85 and regs>>4==1 and w['pc']+8+8*imm==w['target']
  if 'immediate' in w:assert imm==w['immediate']
 for w in witnesses['data']:assert sha(bytes.fromhex(w['raw_hex']))==w['sha256']
 return identities

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);ap.add_argument('--require-all-promoted',action='store_true');args=ap.parse_args()
 m=(P/'manifest.json').read_bytes();assert sha(m)==(P/'manifest.sha256').read_text().split()[0]
 manifest=json.loads(m);expected=set(manifest['files'])|{'manifest.json','manifest.sha256'}
 actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file()};assert actual==expected,(actual-expected,expected-actual)
 for f,v in manifest['files'].items():
  q=P/f;assert not q.is_symlink();b=q.read_bytes();assert len(b)==v['bytes'] and sha(b)==v['sha256'],f
 identities=checks();status={}
 # Source provenance: every copied origin retains its exact observed bytes.
 for path, origin in load('origins.json').items():
  assert sha((P/path).read_bytes())==origin['sha256'],path
 # Check copied members against the retained upstream seals, without implying
 # that unselected members were copied or independently reverified here.
 for base, mf in [('evidence/repro/pump/final-error-metadata-source-proposal','manifest.json'),('evidence/repro/layered-passes/pass-02/review-candidates/amm-destination-rent','manifest.json'),('evidence/repro/pump_fees/legacy-social-admission-v144','manifest-sha256.json')]:
  upstream=load(base+'/'+mf);members=upstream.get('files',upstream)
  for rel, val in members.items():
   q=P/base/rel
   if q.is_file():
    expected_hash=val['sha256'] if isinstance(val,dict) else val
    assert sha(q.read_bytes())==expected_hash, str(q)

 if args.repo:
  witnesses=load('byte-witnesses.json');elf_bytes={}
  for rel, ident in witnesses['elf_identities'].items():
   b=(args.repo/rel).read_bytes();assert len(b)==ident['bytes'] and sha(b)==ident['sha256'],rel;elf_bytes[rel]=b
  for w in witnesses['instructions']+witnesses['data']:
   raw=bytes.fromhex(w['raw_hex']);start=w.get('pc',w.get('offset'));assert elf_bytes[w['elf']][start:start+len(raw)]==raw
  reviewed_hashes={row['path']:row['reviewed_sha256'] for row in identities['files']}
  for binding in load('input-bindings.json'):
   h=sha((args.repo/binding['path']).read_bytes())
   assert h in {binding['expected_sha256'],reviewed_hashes.get(binding['path'])},binding['path']
  for row in identities['files']:
   h=sha((args.repo/row['path']).read_bytes());status[row['path']]='reviewed' if h==row['reviewed_sha256'] else 'baseline' if h==row['baseline_sha256'] else 'OTHER'
  assert 'OTHER' not in status.values(),status
  if args.require_all_promoted:assert set(status.values())=={'reviewed'},status
 print(json.dumps({'status':'PASS','exact_patch_compositions':3,'source_files':len(identities['files']),'pump_token_substitutions':11,'live_source_status':status,'target_executions':0,'security_signoff':False},sort_keys=True))
if __name__=='__main__':main()
