"""Check an additional independent clean Rust build and real loader run."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,tomllib
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return json.loads(p.read_bytes())
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify():
 manifest=read(HERE/'manifest.json');assert set(manifest)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for n,h in manifest.items():assert sha((HERE/n).read_bytes())==h
 for n,h in read(HERE/'parents.json').items():assert sha((ROOT/n).read_bytes())==h
 source=module('independent_exact_source',ROOT/'repro/donation-relay/donation-wrapper-source-proposal/verify.py');source.manifest();files=source.sources()['complete492'];launch=read(HERE/'launch.json');result=read(HERE/'result.json');log=(HERE/'build.log').read_bytes()
 assert launch['source_inputs']=={n:sha(b)for n,b in files.items()}and len(files)==60
 assert launch['fresh_target']and launch['rustc_sha256']=='89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
 assert result['exit_code']==0 and result['source_unchanged']and result['registry_unchanged']and result['root_invocations']==1 and log.count(b'--crate-name donation_relay_source_proposal ')==1 and sha(log)==result['build_log_sha256']
 assert 'Fresh 'not in log.decode()and '--locked'in launch['command']and '--offline'in launch['command']
 create=launch['create'];assert create[create.index('--network')+1]=='none';mounts=[create[i+1]for i,x in enumerate(create)if x=='-v'];assert {tuple(x.split(':')[-2:])for x in mounts}=={('/source','ro'),('/config','ro'),('/output','rw'),('/target','rw'),('/sdk','ro'),('/cargo/registry','ro')}
 assert not any('deployed.so'in x or 'original.so'in x for x in create)
 registry=read(HERE/'registry-check.json');locked={p['name']+'-'+p['version']:p['checksum']for p in tomllib.loads(files['Cargo.lock'].decode())['package']if p.get('source','').startswith('registry+')};assert registry['all_match']and registry['packages']==253 and registry['files']==7968 and {r['name']:r['checksum']for r in registry['rows']}==locked
 p=ROOT/'repro/donation-relay/linked-elf-reproduction';meta=read(p/'metadata.json')['variants']['recovered']['artifacts'];images={}
 for kind in ['candidate','symbols']:
  r=meta[kind];raw=gzip.decompress((p/r['path']).read_bytes());assert sha(raw)==r['sha256']==result['artifacts'][kind+'.so']['sha256']and len(raw)==r['bytes']==result['artifacts'][kind+'.so']['bytes'];images[kind]=raw
 original=(ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes();assert len(images['candidate'])==818280 and images['candidate']==original[:818280]
 assert launch['config_inputs']=={n:sha((p/'layout'/n).read_bytes())for n in ['ordered.ld','linker-wrapper.sh']}
 receipt=read(HERE/'loader-receipt.json');assert receipt==read(p/'loader-receipt.json')and receipt['whole_original_payload_equal']and receipt['payload_sha256']==sha(original)and receipt['payload_bytes']==830448 and receipt['transactions']==912
 report=read(HERE/'independent-comparison.json');assert report['compiler_elf_sha256']==sha(images['candidate'])and report['loader_payload_sha256']==sha(original)and report['all_elf_bytes_equal']and report['all_capture_payload_bytes_equal']and not report['canonical_selected_source_updated']and not report['historical_source_recipe_proven']
 print('PASS: independent fresh 60-input Rust build; 253 registry packages; exact 818280-byte ELF and 830448-byte loader payload; canonical selection unchanged')
if __name__=='__main__':verify()
