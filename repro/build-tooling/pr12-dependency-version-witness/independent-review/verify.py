"""Independent saved manifest/lock/receipt and Git-tree checks; stdlib only."""
from pathlib import Path
import argparse,collections,hashlib,json,tomllib
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--packet',type=Path,required=True);Q=a.parse_args().packet;I=Q/'inputs'
for n,h in J(P/'manifest.json').items():assert H((P/n).read_bytes())==h
assert H((Q/'manifest.json').read_bytes())=='e652274f9f4b3dcd6cba58fbb02e40fb53c3e79d09f01a681998138fadaa301f'
for n,h in J(Q/'manifest.json').items():assert H((Q/n).read_bytes())==h
refs=J(Q/'references.json');assert refs['commit']=='67608d457c096cebf73f1685f78f2f0ab9f9bdb0'and len(refs['files'])==18 and len(refs['types'])==25
objid=lambda kind,b:hashlib.sha1(kind.encode()+b' '+str(len(b)).encode()+b'\0'+b).hexdigest()
for oid,kind in refs['types'].items():assert objid(kind,(Q/'objects'/oid).read_bytes())==oid
assert(Q/'objects'/refs['commit']).read_bytes().splitlines()[0]==b'tree '+refs['root_tree'].encode()
def tree(oid):
 assert refs['types'][oid]=='tree';b=(Q/'objects'/oid).read_bytes();i=0;out={}
 while i<len(b):
  j=b.index(b' ',i);k=b.index(b'\0',j);out[b[j+1:k].decode()]=(b[i:j].decode(),b[k+1:k+21].hex());i=k+21
 assert i==len(b);return out
for name,row in refs['files'].items():
 b=(I/name).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes']and objid('blob',b)==row['blob'];oid=refs['root_tree']
 for part in name.split('/')[:-1]:mode,oid=tree(oid)[part];assert mode in['40000','040000']
 mode,h=tree(oid)[name.split('/')[-1]];assert mode==row['mode']and h==row['blob']
result=J(Q/'result.json');status=J(I/'repro/status.json');root=tomllib.loads((I/'Cargo.toml').read_text());assert root['workspace']['members']==['programs/pump-fees']
paths={'pump':('programs/pump','programs/pump/Cargo.lock',253),'pump_amm':('programs/pump-amm','programs/pump-amm/Cargo.lock',255),'pump_fees':('programs/pump-fees','Cargo.lock',253),'mayhem':('programs/mayhem','programs/mayhem/Cargo.lock',216),'donation_relay':('programs/donation-relay','programs/donation-relay/Cargo.lock',233)}
allpackages={}
for name,(crate,lockpath,count)in paths.items():
 manifest=tomllib.loads((I/crate/'Cargo.toml').read_text());lock=tomllib.loads((I/lockpath).read_text());r=result['programs'][name];assert len(lock['package'])==count==r['locked_packages'];group={}
 for p in lock['package']:group.setdefault(p['name'],[]).append(dict(version=p['version'],source=p.get('source'),checksum=p.get('checksum')))
 assert r['all_locked_packages']==group and r['direct_dependency_declarations']==manifest['dependencies']and r['patches']==manifest.get('patch',{});allpackages[name]=group
 profile=root['profile']['release']if name=='pump_fees'else manifest['profile']['release'];assert r['effective_release_profile']==profile
 if name in ['pump','pump_amm','pump_fees']:
  assert manifest['dependencies']['anchor-lang']['version']==manifest['dependencies']['anchor-spl']['version']=='=0.31.1'
  assert {p['version']for p in group['anchor-lang']}=={p['version']for p in group['anchor-spl']}=={'0.31.1'}
  assert all({p['version']for p in v}=={'0.31.2'}for n,v in group.items()if n.startswith(('anchor-attribute-','anchor-derive-'))or n=='anchor-syn')
  for key,expected in [('borsh',{'0.10.4','1.8.1'}),('spl-token',{'7.0.0'}),('spl-token-2022',{'6.0.0'})]:assert {x['version']for x in group[key]}==expected
 if 'retained_build_receipt'in r:
  receipt=J(I/r['retained_build_receipt']);assert r['selected_candidate_reference']==status[name]['candidate_artifact'];assert receipt['comparison']['candidate_sha256']==status[name]['candidate_sha256']
  assert r['retained_recipe']=={k:receipt[k]for k in['selected_toolchain','command','rustc_version','rustc_sha256','cargo_build_sbf_version']if k in receipt}
  assert receipt['selected_toolchain']==('v1.54'if name=='mayhem'else'v1.44');assert receipt['source_sha256'][lockpath]==H((I/lockpath).read_bytes())
 assert r['actual_compiled_units_not_derived_from_lock']
assert allpackages['pump_amm']['solana-pubkey']==[dict(version='2.4.0',source=None,checksum=None)]
assert allpackages['pump']['solana-pubkey'][0]['version']=='2.4.0'and allpackages['pump_fees']['solana-pubkey'][0]['version']=='2.2.1'
amm=tomllib.loads((I/'programs/pump-amm/Cargo.toml').read_text());vendor=tomllib.loads((I/'programs/pump-amm/vendor/solana-pubkey/Cargo.toml').read_text());assert amm['patch']['crates-io']['solana-pubkey']['path']=='vendor/solana-pubkey'and vendor['package']['version']=='2.4.0'
assert {p['version']for p in allpackages['mayhem']['anchor-lang']}=={'1.0.0'}and{p['version']for p in allpackages['mayhem']['solana-pubkey']}=={'3.0.0','4.4.0'}
assert not any(n.startswith('anchor-')for n in allpackages['donation_relay']);assert not result['all_compiled_dependency_units_closed']and not result['historical_original_versions_identified']and not result['javascript_transitive_lock_closed']
print('PASS:18Gitblobs/25commit-treeobjects, exactselectedmanifest/lock/profile/patchfamilies/counts,4candidate+lock-boundreceiptversions; noarchive/unitgraph/runtime/manual-sourceclaimadded')
