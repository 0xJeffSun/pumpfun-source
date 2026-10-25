#!/usr/bin/env python3
"""Saved source/build and full-byte verification; never invokes compiler or target."""
from pathlib import Path
import argparse,gzip,hashlib,json,sys
sys.dont_write_bytecode=True
from analyze import analyze
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def verify(repo):
 m=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 files={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))not in ['manifest.json','manifest.sha256']};assert files==set(m)
 for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
 base=repo/'repro/donation-relay/source-build-04-stack-clean';proposal=repo/'repro/donation-relay/next-layer-static-review/readable'
 assert H(base/'manifest.json')==H(P/'previous/manifest.json')=='c2377cfab442a00405243e8a85c8ce49f549f4facfa8b8a6e6a4fdddeec024f9'
 assert H(proposal/'manifest.json')==H(P/'proposal/manifest.json')=='91b41eae490c302f48e562f504c3e24fd8dd3fafa3e321ae8333f593689c369f'
 pm=J(proposal/'manifest.json')['files'];assert H(P/'analyze.py')==pm['analyze_relocation_first.py']
 src={str(p.relative_to(P/'source')):H(p)for p in(P/'source').rglob('*')if p.is_file()}
 assert len(src)==21 and src==J(P/'launcher/resolved-source-sha256.json')==J(P/'proposal/source-proposal-sha256.json')==J(P/'attempt/build-result.json')['source_after']==J(P/'attempt/build-launch.json')['source']
 for n,h in src.items():assert pm['source-proposal/'+n]==h
 old=J(base/'launcher/resolved-source-sha256.json');assert[n for n in src if src[n]!=old[n]]==['src/generated_exit.rs']
 lm=J(P/'launcher/manifest.json')['files'];om=J(base/'launcher/manifest.json')['files'];assert sorted(n for n in lm if lm[n]!=om.get(n))==['build05-source-adaptation.json','crate/src/generated_exit.rs','resolved-source-sha256.json'];assert not(set(om)-set(lm))
 for p in(P/'launcher').rglob('*'):
  if p.is_file()and p!=P/'launcher/manifest.json':assert H(p)==lm[str(p.relative_to(P/'launcher'))]
 assert H(P/'launcher/relay_build_once.py')==H(base/'launcher/relay_build_once.py')
 tools=J(P/'launcher/tool-witness/tool-files.json');before=J(P/'attempt/tool-phase-before.json');after=J(P/'attempt/tool-phase-after.json')
 assert before['tools']==after['tools'] and len(tools)==7
 assert{n:r['sha256']for n,r in tools.items()}=={n:r['sha256']for n,r in after['tools'].items()}
 assert J(P/'SDK-source-after.json')==J(P/'launcher/tool-witness/sdk-files.json') and len(J(P/'SDK-source-after.json'))==53
 registry={r['name']+'-'+r['version']:r['files']for r in J(P/'launcher/resolved-source-archive-equality.json')};assert len(registry)==232
 for r in J(P/'attempt/dependency-source-after.json'):assert r['files']==registry[r['package']]
 args=J(P/'attempt/build-launch.json')['command'];assert args[1]=='build-sbf'and args[args.index('--tools-version')+1]=='v1.44'and args[-3:]==['--','--locked','--offline']
 assert J(P/'attempt/build-result.json')['returncode']==0
 assert not any(l.startswith('Error:')for l in(P/'attempt/build.stderr').read_text().splitlines())
 assert not any(x in(P/'attempt/build.stderr').read_text()for x in ['Stack offset of','overwrites values in the frame'])
 for n in ['candidate.so','unstripped.so']:
  r=J(P/'attempt/retained-artifacts.json')[n];assert H(P/n)==r['sha256']and(P/n).stat().st_size==r['bytes']
 assert H(P/'original.so')==H(repo/'evidence/dependencies/donation_relay/deployed.so')
 calculated=analyze(P)
 for n,value in calculated.items():
  b=(P/n).read_bytes();assert json.loads(gzip.decompress(b)if n.endswith('.gz')else b)==value,n
 fs=J(P/'stack-observations.json');assert not fs['backend_errors']
 frames=[{'index':f['index'],'start':f['start'],'names':f['names'],'minimum_r10_offset':min((x['offset']for x in f['direct_r10_accesses']),default=None),'out_of_range':[x for x in f['direct_r10_accesses']if x['offset'] < -4096]}for f in calculated['candidate-function-ledger.json']]
 assert fs['frames']==frames and not any(f['out_of_range']for f in frames)
 return dict(status='PASS',source_inputs=21,source_builds=1,backend_errors=0,target_executions=0,whole_file_equal=False,comparison=calculated['comparison-summary.json'])
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);x=a.parse_args();print(json.dumps(verify(x.repo.resolve()),sort_keys=True))
