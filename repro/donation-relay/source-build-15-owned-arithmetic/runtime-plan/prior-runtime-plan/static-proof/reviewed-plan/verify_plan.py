"""Read-only plan/source/tool/archive gate; no compiler/VM."""
from pathlib import Path
import json,hashlib,tomllib,importlib.util,difflib,os
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def cache_snapshots():
 rows={}
 for name,r in J(P/'launcher/tool-witness/runtime-cache-paths.json').items():
  root=Path(r['path']);files={}
  for p in sorted(root.rglob('*')):
   rel=str(p.relative_to(root))
   if p.is_symlink():files[rel]={'kind':'symlink','target':os.readlink(p)}
   elif p.is_file():files[rel]={'kind':'file','sha256':H(p),'bytes':p.stat().st_size,'mode':p.stat().st_mode&0o777}
  rows[name]={'path':str(root),'resolved_path':str(root.resolve()),'files':files}
 return rows

def verify(seal,repo):
 assert H(P/'manifest.json')==seal==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc' and not p.name.endswith('-keypair.json')
 for n,h in m.items():assert H(P/n)==h,n
 z=J(P/'freeze.json');assert z['compile']=='v1.44' and z['strip']=='v1.52' and z['attempt_limit']==1 and z['runtime_authorized']is False;assert z['source_proof_seal']==H(P/'source-proof/manifest.json')=='bd28e8d55346a52c7ecb32eb749a97f5f053a0738146ff8d631fc216a470ee53';load(P/'source-proof/verify.py','proof').verify()
 B=repo/z['selected_checkpoint'];assert H(B/'manifest.json')==H(P/'selected-checkpoint-manifest.json')==z['selected_checkpoint_seal']=='1d323ea804581e676204a93cfa6277737243d831a91d9b6dacd4a2448067e4d5';assert(repo/'repro/donation-relay/current.json').read_bytes()==(P/'current.before.json').read_bytes();assert H(B/'candidate.so')=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244' and H(B/'unstripped.so')=='2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596'
 for n,h in J(B/'manifest.json').items():assert H(B/n)==h,n
 assert len(z['source'])==len(z['baseline_source'])==23;assert [n for n,h in z['source'].items() if h!=z['baseline_source'][n]]==z['changed']==['src/arithmetic.rs','src/handlers.rs']
 for n,h in z['baseline_source'].items():assert H(P/'baseline-source'/n)==H(B/'source'/n)==h
 for n,h in z['source'].items():assert H(P/'launcher/crate'/n)==h
 assert z['source']==J(P/'launcher/resolved-source-sha256.json');assert H(P/'launcher/relay_build_once.py')=='1ee5bcb679e8e04ee8abd65f7630571a5577e2dd6d9ccab369a10cdf8f165bd7';helper=load(P/'launcher/relay_build_once.py','unchanged_launcher');helper.preflight()
 # Combined source is EXACT separate guard applied to separate u16 proposal.
 a=(P/'source-proof/baseline/arithmetic.rs').read_text();g=(P/'source-proof/proposal-sort-guard/arithmetic.rs').read_text();at=g.index('pub(crate) fn fair_amounts');combined=g[:at]+g[at:].replace('shares:&[Share]','weights:&[u16]').replace('shares.len()','weights.len()').replace('for (i,s) in shares.iter().enumerate()', 'for (i,&bps) in weights.iter().enumerate()').replace('u128::from(s.bps)','u128::from(bps)');assert(P/'launcher/crate/src/arithmetic.rs').read_text()==combined
 b=(P/'baseline-source/src/handlers.rs').read_text();c=b.replace('fair_amounts(total,shares)','fair_amounts(total,&shares.iter().map(|share|share.bps).collect::<Vec<_>>())');assert(P/'launcher/crate/src/handlers.rs').read_text()==c
 patch=''.join(difflib.unified_diff(a.splitlines(True),combined.splitlines(True),fromfile='a/src/arithmetic.rs',tofile='b/src/arithmetic.rs'))+''.join(difflib.unified_diff(b.splitlines(True),c.splitlines(True),fromfile='a/src/handlers.rs',tofile='b/src/handlers.rs'));assert patch==(P/'combined.patch').read_text()
 for n in['weight-view.patch','sort-guard.patch']:assert(P/n).read_bytes()==(P/'source-proof'/n).read_bytes()
 pk={p['name']+'-'+p['version']:p['checksum'] for p in tomllib.loads((P/'launcher/crate/Cargo.lock').read_text())['package'] if'checksum'in p};archives=list((P/'launcher/registry/archives').glob('*.crate'));assert len(archives)==len(pk)==232
 for p in archives:assert H(p)==pk[p.name[:-6]]
 assert cache_snapshots()==J(P/'complete-existing-cache-snapshots.json')
 accepted=J(P/'accepted-e575-build-launch.json');assert accepted['command'][accepted['command'].index('--tools-version')+1]=='v1.44';assert J(P/'accepted-e575-root-fingerprint.json')['rustflags']==['-Zremap-cwd-prefix=']
 return {'status':'PASS_UNEXECUTED','baseline':'selectedRelay13/e575','source_inputs':23,'changed':z['changed'],'compile':'v1.44','strip':'v1.52','registry_archives':232,'new_compiler_or_VM_runs':0}
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);x=a.parse_args();print(json.dumps(verify(x.reviewed_plan_sha256,x.repo.resolve()),indent=2))
