#!/usr/bin/env python3
"""Portable seal and static witness verifier; never executes an ELF."""
from pathlib import Path
import hashlib,json,sys
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def check():
 manifest=json.loads((P/'manifest.json').read_text())
 paths=list(P.rglob('*'))
 assert not any(p.is_symlink() for p in paths),'symlink not allowed'
 actual={p.relative_to(P).as_posix() for p in paths if p.is_file()}
 assert actual==set(manifest)|{'manifest.json'},'unexpected/missing file'
 for name,r in manifest.items():
  assert not Path(name).is_absolute() and '..' not in Path(name).parts
  b=(P/name).read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256'],name
 predecessor=(P/'inputs/predecessor-manifest.json').read_bytes()
 assert H(predecessor)=='1d14da56f36c899f43b17548f8eefb60b988245affc1bf1ad7ac86bce8b8554c','predecessor manifest changed'
 prior=json.loads(predecessor)
 origins=json.loads((P/'origins.json').read_text())
 for name,r in origins.items():
  assert H((P/name).read_bytes())==r['sha256'],name
  if 'predecessor_member' in r:
   assert prior[r['predecessor_member']]['sha256']==r['sha256'],name
 assert H((P/'inputs/sharing_update.rs').read_bytes())=='c87b9a5518d056a495ad1c93189cebefb6da657e264af7ac08fb1a84ea79fcf7'
 assert H((P/'inputs/full-function-inventory.json').read_bytes())=='8c060f103ec67dd623b2885f727924abc250e35c938f979bbb49943193863a3f'
 from analyze import analyze
 regenerated=analyze();saved=json.loads((P/'proof.json').read_text())
 assert regenerated==saved,'static witness mismatch'
 own=json.loads((P/'ownedmap.json').read_text())
 assert own['owned_original']==[[219376,225920]] and own['source_proposal'] is None
 assert len(regenerated['original_window_inferred']['instructions'])==786
 assert len(regenerated['all_root_direct_calls'])==24
 assert len(regenerated['root_data'])==10
 assert sum(len(d['root_sites']) for d in regenerated['root_data'])==18
 assert not regenerated['whole_file_equal']
 print(json.dumps({'status':'pass','mode':'static-only','root_instructions':786,'direct_sites':24,'root_data_objects':10,'whole_original_equal':False,'runtime_cases_executed':0},sort_keys=True))
if __name__=='__main__':
 try:check()
 except (AssertionError,KeyError,ValueError,OSError) as e:
  print('verification failed: '+str(e),file=sys.stderr);sys.exit(1)
