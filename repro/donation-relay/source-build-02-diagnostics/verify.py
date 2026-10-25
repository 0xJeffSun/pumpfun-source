#!/usr/bin/env python3
"""Offline evidence verification only: no compiler, subprocess, network or VM."""
import argparse,gzip,hashlib,json,tarfile,sys
sys.dont_write_bytecode=True
from pathlib import Path,PurePosixPath
from analyze import analyze,H
P=Path(__file__).resolve().parent

def load(name):return json.loads((P/name).read_text())
def archive(name,seal):
 with tarfile.open(P/name) as t:
  contents={}
  for m in t:
   assert m.isfile() and not PurePosixPath(m.name).is_absolute() and '..' not in PurePosixPath(m.name).parts and m.name not in contents
   contents[m.name]=t.extractfile(m).read()
 assert H(contents['manifest.json'])==seal
 expected=json.loads(contents['manifest.json'])['files']
 assert {n:H(b) for n,b in contents.items() if n!='manifest.json'}==expected
 return contents

def verify(repo=None):
 expected=load('manifest.json')['files'];actual={}
 for p in P.rglob('*'):
  assert not p.is_symlink()
  if p.is_file() and p!=P/'manifest.json':actual[p.relative_to(P).as_posix()]=H(p.read_bytes())
 assert actual==expected,'package seal'
 pre=archive('prior/preflight.tar.gz','4e48eb72d136fb12d895d2e4ac3b568caba69491b931ec8c91a7911e76165b97')
 correction=archive('prior/launcher-correction.tar.gz','87b38d3c948011d0723de8138634b4e1012aec41c9bc7ae4f8801ecf961e9544')
 originalmap=json.loads(pre['manifest.json'])['files'];corrected=load('launcher/manifest.json')['files']
 assert set(originalmap)==set(corrected)
 assert [n for n in originalmap if originalmap[n]!=corrected[n]]==['relay_build_once.py']
 assert H((P/'launcher/relay_build_once.py').read_bytes())==corrected['relay_build_once.py']=='1ee5bcb679e8e04ee8abd65f7630571a5577e2dd6d9ccab369a10cdf8f165bd7'
 src={p.relative_to(P/'source').as_posix():H(p.read_bytes()) for p in (P/'source').rglob('*') if p.is_file()}
 assert src==load('launcher/resolved-source-sha256.json')==load('attempt/build-result.json')['source_after']==load('attempt/build-launch.json')['source']
 assert len(src)==21
 for n,h in src.items():assert H(pre['crate/'+n])==h
 before=load('attempt/tool-phase-before.json');after=load('attempt/tool-phase-after.json');assert before['tools']==after['tools']
 tools=load('launcher/tool-witness/tool-files.json');assert len(tools)==7
 assert {n:r['sha256'] for n,r in after['tools'].items()}=={n:r['sha256'] for n,r in tools.items()}
 assert after['links']['sdk_platform']['resolved']==str(Path(tools['sdk_strip_objcopy']['path']).parent.parent.parent)
 assert load('SDK-source-after.json')==load('launcher/tool-witness/sdk-files.json')
 registry={r['name']+'-'+r['version']:r['files'] for r in json.loads(pre['resolved-source-archive-equality.json'])}
 assert len(registry)==232
 deps=load('attempt/dependency-source-after.json');seen=set()
 for r in deps:
  assert r['namespace'] in ('index.crates.io-1949cf8c6b5b557f','index.crates.io-6f17d22bba15001f')
  assert r['files']==registry[r['package']]
  assert (r['namespace'],r['package']) not in seen;seen.add((r['namespace'],r['package']))
 errors=[(n,line) for n,line in enumerate((P/'attempt/build.stderr').read_text().splitlines(),1) if line.startswith('Error:')]
 d=load('stack-diagnostics.json');assert len(errors)==d['total']==301
 assert [(x['line'],x['text']) for x in d['all']]==errors and len(d['by_function'])==6
 assert sum(x['diagnostics'] for x in d['by_function'])==301
 assert load('attempt/build-result.json')['returncode']==0
 assessment=load('build-assessment.json');assert assessment['runtime_cases']==0 and not assessment['clean_build'] and not assessment['execution_suitable']
 artifacts=load('attempt/retained-artifacts.json')
 for n in ['candidate.so','unstripped.so']:
  b=(P/n).read_bytes();assert H(b)==artifacts[n]['sha256'] and len(b)==artifacts[n]['bytes']
 assert artifacts['excluded_keypair_names']==['donation_relay_source_proposal-keypair.json']
 assert not any('keypair' in n for n in actual)
 computed=analyze(P)
 for name,value in computed.items():
  data=(P/name).read_bytes();assert json.loads(gzip.decompress(data) if name.endswith('.gz') else data)==value,name
 assert computed['coverage.json']['candidate']['STT_FUNC_symbol_count']==303
 if repo:
  assert H((repo/'evidence/dependencies/donation_relay/deployed.so').read_bytes())==computed['comparison-summary.json']['original_sha256']
 return dict(verified=True,payload_files=len(actual),source_inputs=21,registry_packages=232,postbuild_dependency_copies=len(deps),tools=7,SDK_files=53,backend_errors=301,execution_suitable=False,runtime_cases=0,**{k:computed['comparison-summary.json'][k] for k in ['candidate_symbol_windows','original_inferred_windows','original_raw_match_windows','original_normalized_match_windows','unmatched_original_windows']})
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);a=ap.parse_args();print(json.dumps(verify(a.repo),sort_keys=True))
