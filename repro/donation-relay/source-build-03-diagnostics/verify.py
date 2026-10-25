#!/usr/bin/env python3
"""Offline saved-evidence validation; no compiler, VM, subprocess or network."""
import argparse,gzip,hashlib,json,tarfile,sys
sys.dont_write_bytecode=True
from pathlib import Path,PurePosixPath
from analyze import analyze,H
P=Path(__file__).resolve().parent

def J(name):return json.loads((P/name).read_text())
def archive(name,seal):
 with tarfile.open(P/name) as t:
  b={}
  for m in t:
   assert m.isfile() and not PurePosixPath(m.name).is_absolute() and '..' not in PurePosixPath(m.name).parts and m.name not in b
   b[m.name]=t.extractfile(m).read()
 assert H(b['manifest.json'])==seal
 assert {n:H(v) for n,v in b.items() if n!='manifest.json'}==json.loads(b['manifest.json'])['files']
 return b

def verify(repo=None):
 actual={}
 for p in P.rglob('*'):
  assert not p.is_symlink()
  if p.is_file() and p!=P/'manifest.json':actual[p.relative_to(P).as_posix()]=H(p.read_bytes())
 assert actual==J('manifest.json')['files'],'seal'
 old=archive('prior/build02.tar.gz','578f7ae0e2a8eba157159c4fbf7d4dc488b32860bd82102d0d85b9db95021326')
 repair=archive('prior/source-repair.tar.gz','132853da9b97b724f5f51ecfb2c215e85c2d67bb5b67fa1859a26d254c6289cb')
 newmap=J('launcher/manifest.json')['files'];oldmap=json.loads(old['launcher/manifest.json'])['files']
 assert sorted(n for n in newmap if newmap[n]!=oldmap.get(n))==['build03-source-adaptation.json','crate/src/admission.rs','crate/src/dispatch.rs','resolved-source-sha256.json']
 assert set(oldmap)-set(newmap)==set()
 for p in (P/'launcher').rglob('*'):
  if p.is_file() and p!=P/'launcher/manifest.json':assert H(p.read_bytes())==newmap[p.relative_to(P/'launcher').as_posix()]
 assert H((P/'launcher/relay_build_once.py').read_bytes())=='1ee5bcb679e8e04ee8abd65f7630571a5577e2dd6d9ccab369a10cdf8f165bd7'
 src={p.relative_to(P/'source').as_posix():H(p.read_bytes()) for p in (P/'source').rglob('*') if p.is_file()}
 assert src==J('launcher/resolved-source-sha256.json')==J('attempt/build-result.json')['source_after']==J('attempt/build-launch.json')['source']
 assert src==json.loads(repair['source-delta.json'])['proposal'] and len(src)==21
 for n,h in src.items():assert H(repair['source/'+n])==h
 tools=J('launcher/tool-witness/tool-files.json');before=J('attempt/tool-phase-before.json');after=J('attempt/tool-phase-after.json')
 assert before['tools']==after['tools'] and len(tools)==7
 assert {n:r['sha256'] for n,r in after['tools'].items()}=={n:r['sha256'] for n,r in tools.items()}
 assert after['links']['sdk_platform']['resolved']==str(Path(tools['sdk_strip_objcopy']['path']).parent.parent.parent)
 assert J('SDK-source-after.json')==J('launcher/tool-witness/sdk-files.json') and len(J('SDK-source-after.json'))==53
 registry={r['name']+'-'+r['version']:r['files'] for r in J('launcher/resolved-source-archive-equality.json')};assert len(registry)==232
 deps=J('attempt/dependency-source-after.json');seen=set()
 for r in deps:
  assert r['namespace'] in ('index.crates.io-1949cf8c6b5b557f','index.crates.io-6f17d22bba15001f') and r['files']==registry[r['package']]
  assert (r['namespace'],r['package']) not in seen;seen.add((r['namespace'],r['package']))
 errors=[(n,t) for n,t in enumerate((P/'attempt/build.stderr').read_text().splitlines(),1) if t.startswith('Error:')]
 d=J('stack-diagnostics.json');assert len(errors)==d['total']==166 and len(d['by_function'])==2
 assert errors==[(r['line'],r['text']) for r in d['all']] and sum(r['diagnostics'] for r in d['by_function'])==166
 assert J('attempt/build-result.json')['returncode']==0
 a=J('build-assessment.json');assert not a['clean_build'] and not a['execution_suitable'] and a['runtime_cases']==0 and not a['next_build_authorized']
 artifacts=J('attempt/retained-artifacts.json')
 for n in ['candidate.so','unstripped.so']:
  b=(P/n).read_bytes();assert H(b)==artifacts[n]['sha256'] and len(b)==artifacts[n]['bytes']
 assert artifacts['excluded_keypair_names']==['donation_relay_source_proposal-keypair.json'] and not any('keypair' in n for n in actual)
 calculated=analyze(P)
 for n,v in calculated.items():
  b=(P/n).read_bytes();assert json.loads(gzip.decompress(b) if n.endswith('.gz') else b)==v,n
 cf=calculated['candidate-function-ledger.json'];of=calculated['original-function-ledger.json'];frames=[]
 for f in cf:
  vals=[r['offset'] for r in f['direct_r10_accesses']]
  frames.append(dict(candidate_index=f['index'],start=f['start'],bytes=f['bytes'],names=f['names'],min_direct_r10_offset=min(vals) if vals else None,direct_accesses_below_minus_4096=[r for r in f['direct_r10_accesses'] if r['offset'] < -4096],compiler_diagnostics=next((r['diagnostics'] for r in d['by_function'] if r['symbol'] in f['names']),0)))
 assert frames==J('all-function-frame-observations.json')
 assert len([r for r in frames if r['direct_accesses_below_minus_4096']])==2
 for r in J('remaining-stack-errors.json'):
  f=cf[r['candidate_index']];o=of[r['original_wrapper_ordinal']]
  assert r['diagnostic']['symbol'] in f['names']
  assert (r['start'],r['end'],r['raw_sha256'])==(f['start'],f['end'],f['raw_sha256'])
  assert (r['original_start'],r['original_end'],r['original_sha256'])==(o['start'],o['end'],o['raw_sha256'])
  assert r['direct_r10_min']==min(x['offset'] for x in f['direct_r10_accesses'])
  assert r['original_direct_r10_min']==min(x['offset'] for x in o['direct_r10_accesses'])
 if repo:assert H((repo/'evidence/dependencies/donation_relay/deployed.so').read_bytes())==calculated['comparison-summary.json']['original_sha256']
 return dict(verified=True,payload_files=len(actual),source_inputs=21,registry_packages=232,postbuild_dependency_copies=len(deps),tools=7,SDK_files=53,backend_errors=166,affected_functions=2,execution_suitable=False,runtime_cases=0,**{k:calculated['comparison-summary.json'][k] for k in ['candidate_symbol_windows','original_inferred_windows','original_raw_match_windows','original_normalized_match_windows','unmatched_original_windows']})
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);a=ap.parse_args();print(json.dumps(verify(a.repo),sort_keys=True))
