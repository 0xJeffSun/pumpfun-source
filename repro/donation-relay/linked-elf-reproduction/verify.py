"""Check a reconstructed linker recipe against the complete original ELF extent."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re,struct,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]

def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def validate_layout():
 parent=ROOT/'repro/donation-relay/donation-wrapper-artifact-recovery/analysis/recovered';O=read(parent/'original-function-ledger.json.gz');C=read(parent/'candidate-function-ledger.json.gz');mapping={int(k):v for k,v in read(HERE/'layout/solution.json')['mapping'].items()};rows=read(HERE/'layout/input-sections.json')
 assert len(rows)==len(mapping)==len(set(mapping.values()))==492 and set(mapping)==set(range(492))
 oi={f['start']:f['ordinal']for f in O};ci={f['start']:f['index']for f in C}
 sections={}
 for line in (HERE/'layout/baseline.map').read_text().splitlines():
  m=re.match(r'^\s*([0-9a-f]+)\s+[0-9a-f]+\s+([0-9a-f]+)\s+\d+\s+(\S+):\((\.text[^)]*)\)\s*$',line)
  if m and int(m[2],16):sections[int(m[1],16)]=(int(m[2],16),m[3],m[4])
 assert len(sections)==492
 selectors=[]
 for i,row in enumerate(rows):
  j=mapping[i];a,b=O[i],C[j];assert (a['bytes'],a['normalized_sha256'])==(b['bytes'],b['normalized_sha256'])
  assert len(a['direct_calls'])==len(b['direct_calls'])
  assert all(mapping[oi[x['target']]]==ci[y['target']]for x,y in zip(a['direct_calls'],b['direct_calls']))
  size,owner,section=sections[b['start']];assert size==b['bytes']
  if '('in owner:
   archive,member=owner.rsplit('(',1);pattern='*'+Path(archive).name+':'+member[:-1]
  else:pattern='*'+Path(owner).name
  assert row==dict(original_ordinal=i,candidate_index=j,owner_pattern=pattern,section=section)
  selectors.append('    '+pattern+'("'+section+'")')
 default=(HERE/'layout/default.ld').read_text();assert default.count('.text : { *(.text*) } :text')==1
 expected=default.replace('.text : { *(.text*) } :text','.text : {\n'+'\n'.join(selectors)+'\n    *(.text*)\n  } :text')
 assert (HERE/'layout/ordered.ld').read_text()==expected
 return mapping

def extent(raw):
 h=struct.unpack_from('<16sHHIQQQIHHHHHH',raw);end=max(64,h[5]+h[9]*h[10],h[6]+h[11]*h[12])
 for i in range(h[12]):
  row=struct.unpack_from('<IIQQQQIIQQ',raw,h[6]+i*h[11])
  if row[1]!=8:end=max(end,row[4]+row[5])
 return end

def analyze(write=False):
 meta=read(HERE/'metadata.json');parser=module('linked_elf_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');images={}
 for kind,row in meta['variants']['recovered']['artifacts'].items():
  raw=gzip.decompress((HERE/row['path']).read_bytes());assert sha(raw)==row['sha256']and len(raw)==row['bytes'];images[kind]=raw
 original=(ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes();n=extent(original);assert n==818280 and original[:n]==images['candidate'];assert len(original)-n==12168 and not any(original[n:])
 with tempfile.TemporaryDirectory()as temp:
  d=Path(temp)
  for name,data in [('original.so',original),('candidate.so',images['candidate']),('unstripped.so',images['symbols']),('original-windows.json',(ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json').read_bytes())]:(d/name).write_bytes(data)
  result=parser.analyze(d)
 if write:
  out=HERE/'analysis/recovered';out.mkdir(parents=True,exist_ok=True)
  for name,value in result.items():
   raw=(json.dumps(value,sort_keys=True,indent=2)+'\n').encode();p=out/name
   if name not in ['comparison-summary.json','match-ledger.json','section-comparison.json','allocated-strip-identity.json']:
    if not name.endswith('.gz'):p=Path(str(p)+'.gz')
    p.write_bytes(gzip.compress(raw,mtime=0))
   else:p.write_bytes(raw)
 else:
  for name,value in result.items():
   p=HERE/'analysis/recovered'/name
   if not p.exists():p=Path(str(p)+'.gz')
   assert read(p)==value,name
 return result

def verify():
 manifest=read(HERE/'manifest.json');assert set(manifest)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts}
 for name,h in manifest.items():
  p=HERE/name;assert not p.is_symlink()and p.resolve().is_relative_to(HERE)and sha(p.read_bytes())==h,name
 for name,h in read(HERE/'parents.json').items():assert sha((ROOT/name).read_bytes())==h,name
 module('linked_loader_receipt',HERE/'verify_loader.py').verify()
 mapping=validate_layout();assert mapping==module('linked_layout_derivation',HERE/'derive.py').derive();analysis=analyze();summary=analysis['comparison-summary.json'];assert summary['original_raw_match_windows']==summary['original_normalized_match_windows']==492 and summary['common_position_different_bytes']==0
 source=module('linked_source_parent',ROOT/'repro/donation-relay/donation-wrapper-source-proposal/verify.py');source.manifest();inputs={n:sha(b)for n,b in source.sources()['complete492'].items()}
 launch=read(HERE/'builds/fresh/launch.json');result=read(HERE/'builds/fresh/result.json');log=(HERE/'builds/fresh/build.log').read_bytes()
 assert launch['source_inputs']==inputs and launch['fresh_target']and result['source_unchanged']and result['registry_unchanged']
 assert result['exit_code']==0 and result['root_invocations']==1 and log.count(b'--crate-name donation_relay_source_proposal ')==1 and sha(log)==result['build_log_sha256']
 assert launch['rustc_sha256']=='89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
 assert launch['config_inputs']=={n:sha((HERE/'layout'/n).read_bytes())for n in ['ordered.ld','linker-wrapper.sh']}
 container=read(HERE/'builds/fresh/container.json');assert container['network']=='none'
 assert {(m['Destination'],m['RW'])for m in container['mounts']}=={('/source',False),('/config',False),('/output',True),('/target',True),('/sdk',False),('/cargo/registry',False)}
 sdk=read(HERE/'builds/fresh/sdk-check.json');assert sdk['all_match'] and sdk['files_checked']==2873
 registry=read(HERE/'builds/fresh/registry-check.json');assert registry['packages']==253 and registry['files']==7968 and registry['all_match']
 import tomllib
 locked={p['name']+'-'+p['version']:p['checksum']for p in tomllib.loads(source.sources()['complete492']['Cargo.lock'].decode())['package']if p.get('source','').startswith('registry+')}
 assert {r['name']:r['checksum']for r in registry['rows']}==locked
 first=read(HERE/'builds/first/result.json');assert first['exit_code']==0 and first['root_invocations']==1 and first['source_unchanged']
 for kind in ['candidate','symbols']:assert first[kind+'_sha256']==result['artifacts'][kind+'.so']['sha256']
 assert '--network'in launch['create']and launch['create'][launch['create'].index('--network')+1]=='none'
 for item in launch['create']:
  if ':/source:'in item:assert item.endswith(':/source:ro')
  assert 'deployed.so'not in item and 'original.so'not in item
 for kind,row in read(HERE/'metadata.json')['variants']['recovered']['artifacts'].items():assert result['artifacts'][kind+'.so']['sha256']==row['sha256']
 assert (HERE/'builds/fresh/default.ld').read_bytes()==(HERE/'layout/default.ld').read_bytes()
 runtime=read(HERE/'runtime.json.gz');assert runtime['candidate_sha256']==summary['candidate_sha256'];runner=ROOT/'repro/donation-relay/settlement-artifact-recovery/replay_saved.py';assert runtime['runner_sha256']==sha(runner.read_bytes());h=ROOT/'repro/donation-relay/local-validation-proposal/harness_proposal.py';assert runtime['harness_sha256']==sha(h.read_bytes()) and runtime['token2022_sha256']==sha((ROOT/'evidence/dependencies/spl_token_2022/deployed.so').read_bytes())
 frozen={}
 for name,digest in runtime['input_reports'].items():
  p=ROOT/name;assert sha(p.read_bytes())==digest;r=p.relative_to(ROOT/'repro/donation-relay/distribution-worker-source-recovery/settlement')
  for i,row in enumerate(read(p)['cases']):frozen[str(r)+':'+str(i)]=row
 helper=module('linked_replay_checker',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/verify.py');helper.EXPECTED['recovered']=summary['candidate_sha256'];assert helper.check_runtime(runtime,frozen,module('linked_runtime_harness',h))==dict(records=536,unique_fixtures=534,mismatches=0)
 print('PASS: fresh isolated Rust build; exact 818,280-byte original ELF extent; all 492 raw bodies; 536 replay records; allocation tail excluded; historical recipe not proved')
if __name__=='__main__':verify()
