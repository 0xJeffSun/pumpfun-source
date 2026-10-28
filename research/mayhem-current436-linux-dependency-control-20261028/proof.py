"""Offline finite Linux-body control. Never invokes compiler, Git, VM or network."""
from pathlib import Path,PurePosixPath
import gzip,hashlib,importlib.util,json,tarfile,tempfile
if not __debug__:raise RuntimeError('Assertions are required')
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def inventory(p):
 paths=list(p.rglob('*'))
 assert all(not f.is_symlink()and(f.is_file()or f.is_dir())for f in paths)
 return {str(f.relative_to(p)):sha(f.read_bytes())for f in paths if f.is_file()and f!=p/'manifest.json'}
def source_archive(p):
 result={}
 with tarfile.open(p)as t:
  for m in t:
   q=PurePosixPath(m.name);assert m.isfile()and not q.is_absolute()and'..'not in q.parts and str(q)==m.name
   assert q.parts[:2]==('programs','mayhem');name=str(q.relative_to('programs/mayhem'));assert name not in result
   result[name]=sha(t.extractfile(m).read())
 assert len(result)==67
 return result
def bodies(reader,audit,left,right,specs=None):
 l=reader.Elf(left);r=reader.Elf(right);lw=audit.windows(l);rw=audit.windows(r);out={}
 for name,size in (specs or [('buy_pump_swap7handler',9736),('sell_pump_swap7handler',17312)]):
  a=audit.named(l,lw,name);b=audit.named(r,rw,name)
  assert a['end']-a['start']==b['end']-b['start']==size
  x=l.norm(a['start'],a['end'])[0];y=r.norm(b['start'],b['end'])[0]
  assert x==y and a['normalization_pattern']==b['normalization_pattern'],name
  out[name]=sha(x)
 return out
def check(p,root):
 assert inventory(p)==json.loads((p/'manifest.json').read_bytes())
 external=json.loads((p/'external-inputs.json').read_bytes())
 for name,digest in external.items():assert sha((root/name).read_bytes())==digest,name
 assert sha((p/'helpers/reader.py').read_bytes())==external['research/mayhem-current-macro-call-closure-20261027/reader.py']
 reader=module('linux_frozen_reader',p/'helpers/reader.py');audit=module('linux_frozen_audit',p/'helpers/analysis.py')
 image=module('linux_image',root/'research/mayhem-current-macro-call-closure-20261027/verify.py')
 closure=module('linux_closure',root/'research/mayhem-current434-code-reference-closure-20261027/proof.py')
 source=source_archive(p/'source.tar.gz');baseline=root/'research/mayhem-current436-amm-event-controls-20261027/primary'
 assert source==json.loads((baseline/'launch.json').read_bytes())['source_inputs']
 assert source==json.loads((p/'provenance/inputs.json').read_bytes())['source']
 for name in ['candidate.so','symbols.so']:assert(p/'first'/name).read_bytes()==(p/'repeat'/name).read_bytes()
 for label in ['first','repeat']:
  d=p/label;launch=json.loads((d/'launch.json').read_bytes());result=json.loads((d/'result.json').read_bytes())
  assert launch['source_inputs']==source and result['returncode']==0
  assert result['source_unchanged']and result['dependencies_unchanged']and result['tools_unchanged']
  assert result['candidate_sha256']==sha((d/'candidate.so').read_bytes())and result['symbols_sha256']==sha((d/'symbols.so').read_bytes())
  assert launch['dependency_inputs']and all(len(h)==64 for h in launch['dependency_inputs'].values())
  assert launch['command'][0].endswith('/sdk/rust/bin/rustc')
  assert '--target' in launch['command']and'sbpf-solana-solana'in launch['command']
  with tempfile.TemporaryDirectory()as td:image.verify_image_pair(reader,reader.Elf(d/'symbols.so'),(d/'candidate.so').read_bytes(),Path(td)/'candidate.so')
 sdk=json.loads((p/'provenance/sdk-check.json').read_bytes())
 assert sdk['archive_sha256']=='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
 assert sdk['sdk_files_count']==len(sdk['sdk_files'])==3334 and sdk['failures']==[]
 assert 'host: x86_64-unknown-linux-gnu'in sdk['rustc_version']and'LLVM version: 20.1.7'in sdk['rustc_version']
 first_launch=json.loads((p/'first/launch.json').read_bytes());repeat_launch=json.loads((p/'repeat/launch.json').read_bytes())
 assert first_launch['tools']==repeat_launch['tools'] and first_launch['dependency_inputs']==repeat_launch['dependency_inputs']
 for launch in [first_launch,repeat_launch]:
  assert launch['controller_sha256']==sha((p/'controllers/build_linux436_root_cached.py').read_bytes())
  for path,digest in launch['tools'].items():
   assert '/sdk/'in path and sdk['sdk_files'][path.split('/sdk/',1)[1]]==digest
 macro=json.loads((p/'provenance/macro2-result.json').read_bytes());assert macro['returncode']==0
 macro_bytes=gzip.decompress((p/'provenance/libanchor_attribute_program.so.gz').read_bytes());assert macro_bytes[:6]==b'\x7fELF\x02\x01'
 macro_deps=[h for name,h in first_launch['dependency_inputs'].items()if '/macro-target/release/deps/libanchor_attribute_program-'in name and name.endswith('.so')]
 assert macro_deps==[sha(macro_bytes)]
 provenance=json.loads((p/'provenance/inputs.json').read_bytes())
 assert provenance['controller_sha256']==sha((p/'controllers/build_linux436_full_resume.py').read_bytes())
 for path,digest in provenance['tools'].items():
  rel=path.split('/sdk/',1)[1]
  # SDK aliases such as clang resolve to versioned regular files in the same directory.
  expected=sdk['sdk_files'].get(rel)
  if expected is None:
   assert digest in [value for name,value in sdk['sdk_files'].items()if PurePosixPath(name).parent==PurePosixPath(rel).parent]
  else:assert expected==digest
 original=root/'evidence/original/mayhem/deployed.so';o=reader.Elf(original);c=reader.Elf(p/'first/symbols.so');cw=audit.windows(c)
 rows=json.loads((root/'research/mayhem-provider-sharing/audit.json').read_bytes())['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows}
 groups={}
 for w in cw.values():groups.setdefault(audit.key(w),[]).append(w)
 matches=sum(bool(groups.get(audit.key(w)))for w in ow.values())
 raw=sum(any(z['raw_sha256']==w['raw_sha256']for z in groups.get(audit.key(w),[]))for w in ow.values())
 assert (matches,raw)==(436,80)
 hashes=bodies(reader,audit,baseline/'symbols.so',p/'first/symbols.so')
 for name,at,size in [('buy_pump_swap7handler',85600,9736),('sell_pump_swap7handler',95848,17312)]:
  w=audit.named(c,cw,name);assert audit.key(w)!=audit.key(ow[at])
  assert o.norm(at,at+size)[0]!=c.norm(w['start'],w['end'])[0]
  assert len(w['direct'])==len(ow[at]['direct'])
  assert [x['offset']for x in w['direct']]==[x['offset']for x in ow[at]['direct']]
  assert [audit.key(cw[x['target']])for x in w['direct']]==[audit.key(ow[x['target']])for x in ow[at]['direct']]
  assert audit.sources(c,w)==audit.sources(o,ow[at])
 proof=closure.inspect(original.read_bytes(),(p/'first/symbols.so').read_bytes())
 assert proof['summary']['matched_windows']==436 and proof['summary']['direct_and_code_reference_closed_windows']==429
 assert sha((p/'first/candidate.so').read_bytes())!='951f11ab20bf4396ffdd5d0407e6696b1e35bb0428972362e93d01a0a987a3da'
 v2=p/'v2';specs=[('buy_v2_handler',18528),('sell_v2_handler',18096)];v2sources={}
 for label in ['darwin-manual-ay','darwin-native-bp','linux-native-bp']:
  d=v2/label;launch=json.loads((d/'launch.json').read_bytes());result=json.loads((d/'result.json').read_bytes());m=source_archive(d/'source.tar.gz')
  assert m==launch['source_inputs']==json.loads((d/'source-inputs.json').read_bytes());v2sources[label]=m
  assert result['returncode']==0 and result['source_unchanged']
  assert result['candidate_sha256']==sha((d/'candidate.so').read_bytes())and result['symbols_sha256']==sha((d/'symbols.so').read_bytes())
  with tempfile.TemporaryDirectory()as td:image.verify_image_pair(reader,reader.Elf(d/'symbols.so'),(d/'candidate.so').read_bytes(),Path(td)/'v2-candidate.so')
 assert v2sources['darwin-native-bp']==v2sources['linux-native-bp']
 assert set(v2sources['darwin-manual-ay'])==set(v2sources['darwin-native-bp'])
 assert [k for k in v2sources['darwin-manual-ay']if v2sources['darwin-manual-ay'][k]!=v2sources['darwin-native-bp'][k]]==['src/instructions/pump_interface.rs']
 v2hashes=bodies(reader,audit,v2/'darwin-manual-ay/symbols.so',v2/'darwin-native-bp/symbols.so',specs)
 assert v2hashes==bodies(reader,audit,v2/'darwin-manual-ay/symbols.so',v2/'linux-native-bp/symbols.so',specs)
 ve=reader.Elf(v2/'linux-native-bp/symbols.so');vw=audit.windows(ve)
 for name,at,size in [('buy_v2_handler',140512,18648),('sell_v2_handler',159160,18096)]:
  x=audit.named(ve,vw,name);assert audit.key(x)!=audit.key(ow[at])
 return dict(normalized_windows=matches,raw_windows=raw,closed_windows=429,AMM_body_hashes=hashes,AMM_bodies_equal_Darwin=True,V2_body_hashes=v2hashes,V2_bodies_equal_across_three_recipes=True,bodies_equal_original=False,whole_ELF_equal=False,runtime_claim=False)
