#!/usr/bin/env python3
"""Verify this self-contained static inventory; --recompute repeats byte analysis only."""
from pathlib import Path
import argparse, gzip, hashlib, io, json, subprocess, sys, tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def j(p):return json.loads(p.read_text())
def members(p):
 with tarfile.open(p) as t:
  out={}
  for x in t:
   assert x.isfile(),('non-file archive member',p,x.name)
   n=x.name.removeprefix('./');assert not Path(n).is_absolute() and '..' not in Path(n).parts
   assert n not in out;out[n]=t.extractfile(x).read()
  return out
def value(x):return x if isinstance(x,str)else x['sha256']
def checked_map(files,m):
 assert set(files)==set(m),('map entries',set(files)^set(m))
 for n,v in m.items():assert H(files[n])==value(v),('map hash',n)
def bindings():
 config=j(P/'input-config.json');origins=j(P/'input-origins.json');summary={}
 for row in origins:
  b=(P/row['path']).read_bytes();assert len(b)==row['bytes'] and H(b)==row['sha256'],row['path']
 for k,c in config['current'].items():
  q=P/k/'inputs';d=q/'current';m=j(q/'package-manifest.json');assert H((q/'package-manifest.json').read_bytes())==c['package_seal_sha256']
  for row in origins:
   prefix=c['accepted_package']+'/'
   if row['source'].startswith(prefix) and '::' not in row['source']:
    n=row['source'][len(prefix):]
    if n!='manifest-sha256.json':assert row['sha256']==value(m[n]),('accepted package',n)
  source=j(d/'source-sha256.json');assert len(source)==c['source_inputs']
  checked_map(members(d/'source-snapshot.tar.gz'),source)
  checked_map({str(f.relative_to(q/'source')):f.read_bytes()for f in(q/'source').rglob('*')if f.is_file()},source)
  docs=j(d/'documentation-sha256.json');checked_map({str(f.relative_to(q/'documentation')):f.read_bytes()for f in(q/'documentation').rglob('*')if f.is_file()},docs)
  for n,key in [('original.so','original_sha256'),('current/candidate.so','candidate_sha256'),('current/symbols.so','symbols_sha256')]:assert H((q/n).read_bytes())==c[key]
  report=j(d/'build-comparison.json');attempt=j(d/'build-attempt.json');identity=j(d/'main-scratch-identity.json')
  assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source
  assert attempt['returncode']==0 and attempt['source_unchanged']
  assert identity['main_source_sha256']==source and identity['main_build_report_sha256']==H((d/'build-comparison.json').read_bytes())
  assert report['build_log_sha256']==attempt['build_log_sha256']==H(gzip.decompress((d/'build.log.gz').read_bytes()))
  o=(q/'original.so').read_bytes();b=(d/'candidate.so').read_bytes();cmp=report['comparison']
  assert cmp['original_sha256']==H(o) and cmp['candidate_sha256']==H(b)
  assert cmp['full_byte_equality']==(o==b)==False
  assert cmp['different_positions_in_shared_length']==sum(x!=y for x,y in zip(o,b))
  assert cmp['length_difference']==len(b)-len(o)
  if k=='pump':
   phase=j(d/'toolchain-phases.json');assert phase['compile']['before']==phase['compile']['after']
   assert phase['compile']['selected_version']=='v1.44' and phase['strip']['actual_distribution']=='v1.52'
   assert phase['candidate']['sha256']==c['candidate_sha256'] and phase['symbols']['sha256']==c['symbols_sha256']
   sdk=j(d/'sdk-source-sha256.json');assert sdk==j(d/'sdk-postbuild-source-sha256.json')==phase['sdk_source_sha256']==report['sdk_source_sha256']
   pre=members(d/'prebuild-inputs.tar.gz');checked_map(pre,j(d/'prebuild-manifest-sha256.json'))
   helpers=j(d/'build-helper-sha256.json');checked_map({n.removeprefix('build-helpers/'):b for n,b in pre.items()if n.startswith('build-helpers/')},helpers)
   assert j(d/'dependency-before.json')==j(d/'dependency-after.json')
   result=j(d/'build-result.json');assert result['compiler_returncode']==0 and result['launcher_returncode']==1 and result['rebuilds']==0
  else:
   phase=j(d/'tool-phase-provenance.json');assert phase['compile']['tool_hashes_before']==phase['compile']['tool_hashes_after']
   assert phase['compile']['requested_tools_version']=='v1.44' and phase['strip']['sdk_marker']=='platform-tools-v1.52.md'
   assert phase['strip']['file_sha256_before']==phase['strip']['file_sha256_after']
   assert phase['strip']['candidate_sha256']==c['candidate_sha256'] and phase['compile']['unstripped_sha256']==c['symbols_sha256']
   sdk=phase['sdk_template_files'];checked_map(members(d/'sbf-sdk-snapshot.tar.gz'),sdk)
   helpers=j(d/'build-helper-sha256.json');assert helpers==phase['helper_files'];checked_map(members(d/'build-helper-snapshot.tar.gz'),helpers)
   assert H((d/'cargo-rustc-info.json').read_bytes())==phase['compile']['cargo_rustc_info_sha256']
  assert len(sdk)==53
  # The same recorded SDK source bytes are available in the Fees archive, even
  # though the Pump package retains its map rather than a separate SDK archive.
  checked_map(members(P/'fees/inputs/current/sbf-sdk-snapshot.tar.gz'),sdk)
  summary[k]={'source_inputs':len(source),'documentation_inputs':len(docs),'sdk_inputs':len(sdk),'helper_inputs':len(helpers),'candidate_sha256':c['candidate_sha256'],'symbols_sha256':c['symbols_sha256'],'whole_original_equal':False,'compile_version':'v1.44','strip_version':'v1.52'}
 for k in ['pump','fees']:
  a=members(P/'before'/f'{k}-layer01.tar.gz');raw=a.pop('manifest.json');seal=a.pop('manifest.sha256'if k=='pump'else'MANIFEST.sha256').decode().split()[0];assert H(raw)==seal
  m=json.loads(raw);checked_map(a,m['files']if k=='pump'else m)
  for dst,src in [(f'{k}-result.json','result.json'),(f'{k}-'+('residual-ledger.json'if k=='pump'else'catalog.json'),'residual-ledger.json'if k=='pump'else'catalog.json')]:assert(P/'before'/dst).read_bytes()==a[src]
  # Original methods are retained unchanged; only documented adaptations differ.
  for n in ['elf_reader.py']+(['inventory_method.py','dependency_reader.py']if k=='fees'else[]):assert(P/k/n).read_bytes()==a[n]
 return summary
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--recompute',action='store_true');p.add_argument('--bindings-only',action='store_true');args=p.parse_args()
 if not args.bindings_only:
  raw=(P/'manifest-sha256.json').read_bytes();assert H(raw)==(P/'MANIFEST.sha256').read_text().split()[0]
  m=json.loads(raw);actual={str(f.relative_to(P)):f.read_bytes()for f in P.rglob('*')if f.is_file()and str(f.relative_to(P)) not in ['manifest-sha256.json','MANIFEST.sha256']}
  checked_map(actual,m)
 summary=bindings()
 if args.recompute:
  for k in ['pump','fees']:subprocess.run([sys.executable,'-B',str(P/'run_layer.py'),k,'--check'],check=True,cwd=P)
 print(json.dumps({'status':'PASS','bindings':summary,'static_regeneration':args.recompute,'builds':0,'target_executions':0},sort_keys=True))
if __name__=='__main__':main()
