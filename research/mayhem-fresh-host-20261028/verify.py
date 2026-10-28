"""Offline source-to-host-to-target receipt verification; executes no binaries."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,re,tempfile
P=Path(__file__).resolve().parent
PINS={'provenance/bindings.json':'e040aa1cdbb3e21d539d85a3ea08cad4e8357a197a1b9bb5e0335ac379578619','host-inputs/inputs.json':'978eaa4c77bbdef761dc5f4188673645df2c4af6039a5ec0bd81e4c213bd16b4','cases.json':'457f26d843950d49140e39ce7bc6e10f3266e7f977fb8b7e802aa554fd1f2331'}
def require(ok,msg):
 if not ok:raise ValueError(msg)
sha=lambda b:hashlib.sha256(b).hexdigest()
def ident(b):return dict(bytes=len(b),sha256=sha(b))
def raw(p):
 b=p.read_bytes();return gzip.decompress(b) if p.suffix=='.gz' else b
def read(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def helpers(p):
 parent=module('fresh_host_parent',p/'reference/identity_verify.py');event,h=parent.helpers(p);return parent,event,h
def bind(p):
 for n,h in PINS.items():require(sha((p/n).read_bytes())==h,'top-level input pin: '+n)
 for r in read(p/'provenance/bindings.json'):
  b=(p/r['local']).read_bytes();require(ident(b)=={k:r[k] for k in ['bytes','sha256']} and hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],'Git-bound bytes')
def host_source(p,h):
 I=p/'host-inputs';pins=read(I/'inputs.json');require({f.relative_to(I).as_posix():ident(f.read_bytes()) for f in I.rglob('*') if f.is_file() and f.name!='inputs.json'}==pins,'host input containers')
 source=h['parent_verify'].unpack(I/'historical-source.tar.gz');tree=read(I/'source-tree.json');require(tree['revision']=='c0077c2a7de64361f451735ac89118bc89f1c277' and set(source)=={r['path'] for r in tree['files']} and len(source)==121,'historical source scope')
 for r in tree['files']:
  b=source[r['path']];require(len(b)==r['size'] and hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['sha'],'historical Git blob')
 before=source['Cargo.toml'];after,n=re.subn(rb'members = \[.*?\]',b'members = ["lang/attribute/program", "lang/syn", "idl", "idl/spec"]',before,count=1,flags=re.S);require(n==1,'workspace member adaptation');after+=b'\n[patch.crates-io]\n'
 supplement={};receipts={r['name']:r for r in read(I/'supplement-receipts.json')};hb=module('host_source_unpack',p/'host_build.py')
 for r in read(I/'supplement-packages.json'):
  name=r['name']+'-'+r['version'];b=(I/'archives'/(name+'.crate')).read_bytes();require(sha(b)==r['checksum']==receipts[name]['archive_sha256'],'supplement archive');members=hb.unpack(b);require(all(n.startswith(name+'/') for n in members),'supplement prefix');members={n[len(name)+1:]:v for n,v in members.items()};require({n:ident(b) for n,b in members.items()}==receipts[name]['files'],'supplement contents');supplement.update({'supplements/'+name+'/'+n:ident(b) for n,b in members.items()});after+=(r['name']+' = { path = '+json.dumps('../supplements/'+name)+' }\n').encode()
 source['Cargo.toml']=after;source['Cargo.lock']=(I/'resolved-Cargo.lock').read_bytes();require(source['Cargo.lock']==raw(p/'provenance/previous-resolved-Cargo.lock.gz'),'resolved diagnostic lock')
 return source,supplement
def host_receipt(p,label,h,source,supplement,case):
 H=p/'hosts'/label;r=read(H/'result.json');launch=read(H/'launch.json');binding=read(H/'macro-binding.json');macro=raw(H/'anchor_attribute_program.dll.gz');require(ident(macro)==case['macro']==r['macro'] and sha(macro)==binding['macro']['sha256'],'host macro bytes')
 require(r['status']=='SUCCEEDED' and r['returncode']==0 and r['source_unchanged'] and r['supplements_unchanged'] and r['vendor_rechecked'] and r['target_executions']==0 and r['compilations']==42 and r['host_dependency_files']==61,'host build status')
 require(sha((H/'source.tar.gz').read_bytes())==case['host_source_archive_sha256'] and h['parent_verify'].unpack(H/'source.tar.gz')==source,'host source archive')
 require(launch['source_inputs']=={n:ident(b) for n,b in source.items()} and launch['supplement_inputs']==supplement and launch['target_directory_initially_absent'] and launch['input_pins']==read(p/'host-inputs/inputs.json'),'fresh host source binding')
 require(launch['controller_sha256']==sha((p/'host_build.py').read_bytes()),'host controller pin');cmd=launch['command'];require(cmd[1:4]==['build','--locked','--offline'] and cmd[-4:]==['--release','-p','anchor-attribute-program','--verbose'],'locked offline host command')
 env=launch['environment'];require(env['CARGO_NET_OFFLINE']=='true' and 'RUSTC_WRAPPER' not in env and 'RUSTFLAGS' not in env,'host environment');tools={k.replace('\\','/').split('/')[-1]:v for k,v in read(p/'controller/host-tools.json').items()};require(set(launch['checked_tools'])=={'rustc.exe','cargo.exe','link.exe'} and all(tools[n]==v for n,v in launch['checked_tools'].items()),'host executable pins')
 require(launch['vendor_packages']==len(read(p/'controller/vendor-inputs.json')['packages'])==215,'registry input set')
 for n in ['stdout.log','stderr.log']:require(ident(raw(H/(n+'.gz')))==r['logs'][n],'host log hash')
 lines=[line for line in raw(H/'stderr.log.gz').decode().splitlines() if 'Running `' in line and '--crate-name ' in line];require(lines==read(H/'compile-commands.json') and len(lines)==42,'host compile command inventory')
 norm=lambda s:re.sub('/+','/',s.replace('\\','/'))
 root=norm(env['CARGO_TARGET_DIR']);require(root==norm(launch['cwd']).rsplit('/source',1)[0]+'/target','fresh host target locator')
 for line in lines:
  require('--out-dir '+root+'/' in norm(line),'host compile output directory')
  require('host-build-03' not in line,'previous macro cache reference')
 require(any('--crate-name anchor_attribute_program ' in x and '--crate-type proc-macro ' in x for x in lines),'host macro command')
 original=read(p/'controller/historical-macro.json');require(set(binding['host_dependencies'])==set(original['host_dependencies']) and len(binding['host_dependencies'])==61,'fresh host dependency inventory');require(binding['macro']['path']=='anchor_attribute_program.dll' and binding['host_dependencies']['deps/anchor_attribute_program-00eb341e2a9f20b0.dll']==sha(macro),'host macro alias')
 changed=[n for n,v in binding['host_dependencies'].items() if v!=original['host_dependencies'][n]];require(binding['macro']['sha256']!=original['macro']['sha256'],'fresh macro differs from reused baseline')
 return dict(commands=42,source_files=122,dependency_file_count=61,changed_dependency_files=changed,macro=ident(macro),target_directory_initially_absent=True),binding,root
def analyze(p=P):
 p=p.resolve();bind(p);parent,event,h=helpers(p);source,supplements=host_source(p,h);cases=read(p/'cases.json');require(list(cases)==['01','02','03'],'case inventory');target_source={r['path']:raw(p/'controller/sources'/(r['path']+'.gz')) for r in read(p/'controller/source-inputs.json')['source_files']};pins={n:sha(b) for n,b in target_source.items()};require(len(pins)==67,'target source count');original_bytes=raw(p/'reference/original-allocation.so.gz');require(sha(original_bytes)==event.ORIGINAL and len(original_bytes)==777408,'original allocation');reports={};images={}
 with tempfile.TemporaryDirectory() as temp:
  def elf(n,b):
   f=Path(temp)/(n+'.so');f.write_bytes(b);return h['reader'].Elf(f)
  original=elf('original',original_bytes);extent=original.header['shoff']+original.header['shentsize']*original.header['shnum'];require(extent==775416 and original_bytes[extent:]==bytes(1992),'original tail');rows=read(p/'reference/inventory.json');ow={r['start']:original.window(r['start'],r['start']+r['bytes']) for r in rows}
  for label,case in cases.items():
   host,binding,host_root=host_receipt(p,label,h,source,supplements,case);B=p/'builds'/label;launch=read(B/'launch.json');env=launch['environment_overrides'];norm=lambda s:re.sub('/+','/',s.replace('\\','/'));require(norm(env['MAYHEM_HISTORICAL_MACRO'])==host_root+'/release/anchor_attribute_program.dll' and norm(env['MAYHEM_HISTORICAL_DEPS'])==host_root+'/release/deps','new macro target linkage')
   require(sha((B/'source.tar.gz').read_bytes())==case['target_source_archive_sha256'] and h['parent_verify'].unpack(B/'source.tar.gz')==target_source,'target source archive');receipt=parent.receipt(p,label,h,pins)
   # The unchanged controller hashes these fresh files before and after compilation.
   require(read(B/'macro-input.json')==binding,'target macro input binding');require(read(B/'result.json')['historical_macro_dependencies_unchanged'],'target macro dependency postcheck');records=[json.loads(x) for x in h['parent_verify'].unpack(B/'wrapper-records.tar.gz').values()];curve=[r for r in records if '--crate-name' in r['after'] and r['after'][r['after'].index('--crate-name')+1]=='curve_accounts'];require(len(curve)==1 and 'historical_anchor_program='+env['MAYHEM_HISTORICAL_MACRO'] in curve[0]['after'],'macro delivery to curve compiler')
   images[label]={n:raw(B/(n+'.gz')) for n in ['symbols.so','candidate-v154-strip.so']};require({n:ident(b) for n,b in images[label].items()}==case['target_outputs']==read(B/'result.json')['outputs'],'target output pins');e=elf(label,images[label]['symbols.so']);stripped=elf(label+'-stripped',images[label]['candidate-v154-strip.so']);require(sha(e.b)==parent.COMPILER and sha(stripped.b)==parent.STRIPPED and len(e.b)==907776 and stripped.b==original_bytes[:extent],'complete meaningful ELF identity');require(h['parent_verify'].sections(e)==h['parent_verify'].sections(stripped),'ordinary strip allocated sections')
   m=h['parent_verify'].measure(h['closure'],original,ow,rows,e);require((m['normalized'],m['raw_local'],m['direct_closed'],len(m['positive_calls']),len(m['positive_Sources']))==(441,441,441,4768,519),'441 census');allocation=h['reader'].diff(original_bytes,stripped.b);require(not allocation['equal'] and allocation['total_mismatches_including_tail']==1992,'allocation distinct')
   reports[label]=dict(host=host,target=receipt,target_outputs=case['target_outputs'],measurement=m,meaningful_elf_equal=True,allocation_image=allocation)
  require(images['01']==images['02']==images['03'],'repeated complete compiler output')
 integrated=read(p/'provenance/integrated-result.json');require(integrated['target_outputs']==cases['03']['target_outputs'] and integrated['host']==read(p/'hosts/03/result.json') and integrated['target_executions']==0 and not integrated['allocation_tail_emitted'],'integrated controller receipt')
 return dict(builds=reports,host_compilations=126,target_cargo_compilations=489,target_compilations=255,total_compilations=615,reused_host_macro_artifacts=0,historical_source_files=121,resolved_diagnostic_lock=True,registry_packages_verified=215,optional_archives=10,all_compiler_files_equal=True,all_stripped_files_equal=True,meaningful_original_bytes=775416,allocation_tail_bytes_absent=1992,target_executions=0,scope='Fresh host macro and host dependencies feed fresh target builds; SDK/sysroot and pinned source/vendor inputs reused. Raw compiler ELF and ordinary stripped ELF repeat; only the stripped file equals the meaningful original extent. No original historical framework/toolchain attribution, runtime/security claim, or process-memory attestation.')
def verify(p=P):
 _,event,_=helpers(p);event.manifest(p);r=analyze(p);require(json.loads(json.dumps(r))==read(p/'report.json.gz'),'saved report');return r
if __name__=='__main__':
 a=argparse.ArgumentParser(description=__doc__);a.add_argument('--packet',type=Path,default=P);a.add_argument('--write-report',action='store_true');args=a.parse_args()
 if args.write_report:(args.packet/'report.json.gz').write_bytes(gzip.compress((json.dumps(analyze(args.packet),indent=2)+'\n').encode(),mtime=0));print('Wrote report')
 else:verify(args.packet);print('Verified three fresh host+target chains:615 crate commands; complete meaningful original ELF775416B repeated; no reused host macro or fabricated allocation tail.')
