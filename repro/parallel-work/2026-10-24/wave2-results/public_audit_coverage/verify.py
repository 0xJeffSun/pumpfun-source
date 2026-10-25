#!/usr/bin/env python3
"""Portable read-only verifier: hashes and deterministic static recomputation only."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import hashlib,json,re
ROOT=Path(__file__).resolve().parent
sys.path.insert(0,str(ROOT))
import analyze,render

def verify():
 manifest=json.loads((ROOT/'manifest.json').read_text())
 actual={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.name!='manifest.json'}
 assert actual==set(manifest),('unsealed or missing files',sorted(actual^set(manifest)))
 for rel,want in manifest.items():
  p=ROOT/rel
  assert p.resolve().is_relative_to(ROOT) and not p.is_symlink(),rel
  b=p.read_bytes();assert len(b)==want['bytes'] and hashlib.sha256(b).hexdigest()==want['sha256'],rel
 prov=json.loads((ROOT/'provenance.json').read_text())
 for row in prov['blobs']:
  b=(ROOT/row['path']).read_bytes()
  assert hashlib.sha256(b).hexdigest()==row['sha256'] and len(b)==row['bytes'],row['path']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==row['git_blob'],row['path']
  assert row['git_path'].startswith(('programs/','audit/','repro/','docs/')) or row['git_path'] in ('Cargo.toml','Cargo.lock')
  assert not any(x in row['git_path'] for x in ('private-security-review','security-followup','audit_coverage'))
 recomputed=analyze.derive();saved=json.loads((ROOT/'coverage.json').read_text())
 assert recomputed==saved,'source analysis or metadata changed'
 assert len({(r['program'],r['handler']) for r in saved['handlers']})==150
 independent_context_count=sum(len(re.findall(r'#\[derive\([^\]]*\bAccounts\b[^\]]*\)\]',p.read_text())) for p in (ROOT/'evidence/accepted/programs').rglob('*.rs'))
 assert independent_context_count==len(saved['account_contexts'])
 assert all(h.get('contexts') for h in saved['handlers'] if h['review_status']=='open')
 for c in saved['account_contexts']:
  source=(ROOT/'evidence/accepted'/c['path']).read_text()
  span=source[c['char_start']:c['char_end_exclusive']]
  assert hashlib.sha256(span.encode()).hexdigest()==c['span_sha256']
  assert len(re.findall(r'\bpub\s+\w+\s*:',analyze.mask(span)))==len(c['fields'])
 assert saved['summary']['public_saved_comparison_total']==53715
 for rel,content in render.render(recomputed,prov).items():assert (ROOT/rel).read_text()==content,rel
 # Independent observation consistency for accepted source/publication HEAD.
 blobs={r['git_path']:r['git_blob'] for r in prov['blobs'] if r['path'].startswith('evidence/accepted/')}
 for o in prov['working_source_observations']:
  if 'working_sha256' in o:
   assert o['accepted_sha256']==o['working_sha256'],o['path']
   assert o['published_head_blob']==blobs[o['path']],o['path']
 print(json.dumps({'verified':True,'sealed_files':len(manifest),'public_git_blobs':len(prov['blobs']),'recomputed_summary':saved['summary'],'runtime_executions':0,'audit_complete':False},indent=2))
if __name__=='__main__':verify()
