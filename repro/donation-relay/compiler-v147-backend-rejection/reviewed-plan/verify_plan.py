"""Read-only hashes/provenance; no compiler/VM/network/cache writes."""
from pathlib import Path
import json,hashlib,tomllib,os
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify(seal,repo):
 assert H(P/'manifest.json')==seal==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 c=J(P/'current.before.json');assert (repo/'repro/donation-relay/current.json').read_bytes()==(P/'current.before.json').read_bytes();base=repo/'repro/donation-relay/source-build-13-typed-borrow-owned';assert H(base/'manifest.json')==H(P/'selected-checkpoint-manifest.json')=='1d323ea804581e676204a93cfa6277737243d831a91d9b6dacd4a2448067e4d5'
 for n,h in J(base/'manifest.json').items():assert H(base/n)==h,n
 assert H(base/'candidate.so')==c['candidate_sha256']=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244';assert H(base/'unstripped.so')==c['symbols_sha256']=='2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596'
 source=J(base/'source-map.json');assert len(source)==23
 for n,h in source.items():assert H(P/'source'/n)==H(base/'source'/n)==h
 assert {str(p.relative_to(P/'source')) for p in(P/'source').rglob('*') if p.is_file()}==set(source)
 assert J(P/'accepted-root-fingerprint.json')['rustflags']==['-Zremap-cwd-prefix='] and J(P/'accepted-root-fingerprint.json')['features']=='[]'
 lock=tomllib.loads((P/'source/Cargo.lock').read_text());pk={p['name']+'-'+p['version']:p['checksum'] for p in lock['package'] if 'checksum'in p};archives=list((P/'accepted-launcher/registry/archives').glob('*.crate'));assert len(archives)==len(pk)==232
 for p in archives:assert H(p)==pk[p.name[:-6]]
 external=J(P/'external-distribution.json');root=Path(external['root']);expected=J(P/'complete-distribution-files.json');assert H(Path(external['archive']))==external['archive_sha256']=='46c316ddfe3a6fe3027dc923ed288e4d85a3cfb19888eb506894bd74231c29f9'
 assert set(expected)=={str(p.relative_to(root)) for p in root.rglob('*') if p.is_file() or p.is_symlink()}
 for n,r in expected.items():
  p=root/n
  if r['kind']=='symlink':assert p.is_symlink() and os.readlink(p)==r['target'];assert p.resolve().is_relative_to(root.resolve())
  else:assert p.is_file() and not p.is_symlink() and H(p)==r['sha256'] and p.stat().st_size==r['bytes'] and p.stat().st_mode&0o777==r['mode']
 oldtools=J(P/'accepted-launcher/tool-witness/tool-files.json');strip=oldtools['sdk_strip_objcopy'];assert H(Path(strip['path']))==strip['sha256'];assert H(P/'accepted-launcher/relay_build_once.py')=='1ee5bcb679e8e04ee8abd65f7630571a5577e2dd6d9ccab369a10cdf8f165bd7'
 assert J(P/'legacy-target-evidence.json')['legacy_target_works'];spec=J(P/'legacy-target-spec.json');assert spec.get('cpu','generic')=='generic' and spec['features']=='+store-imm,+jmp-ext'
 return {'status':'PASS_UNEXECUTED','source_inputs':23,'locked_registry_archives':232,'official_distribution_files':len(expected),'current_source_unchanged':True,'compiler_invocations':0,'runtime_invocations':0}
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);x=a.parse_args();print(json.dumps(verify(x.reviewed_plan_sha256,x.repo.resolve()),indent=2))
