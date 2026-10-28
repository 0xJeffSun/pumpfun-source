"""Offline replay of the Mayhem live-module order / meaningful ELF experiment."""
from pathlib import Path
import argparse,difflib,gzip,hashlib,importlib.util,json,re,struct,sys,tempfile
P=Path(__file__).resolve().parent
CASES_SHA='994f6ab86338c70b545e8114fe4c0ffaeadbfce5aa09b437931492709093f08f'
LABELS=['01-anchor-module-order','02-rebound-layout','03-repeat-rebound']
COMPILER='7b15bb1e5c7c9c53041322fa64d4a420906fffd96ff97a55d70d627bcb854960'
STRIPPED='9af9e3b1cbc9d89340af4d9d46e4c88d3dc2fc67e0090f9370047d97532ff09d'
def require(ok,msg):
 if not ok:raise ValueError(msg)
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b) if p.suffix=='.gz' else b
def read(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def helpers(p):
 e=module('dynamic_event_parent',p/'reference/event_verify.py');return e,e.helpers(p)
def bind(p):
 for filename,rev in [('recipe-bindings.json','fcd0365f411661db3a9c1b08740dfd60a05daa14'),('baseline-bindings.json','9f3a6988f4d83dd3054f83115914a177756999a5'),('layout-bindings.json','dc8f791d32ae7fd6d9660cd1bf003fb02737f78f')]:
  r=read(p/'provenance'/filename);require(r['revision']==rev,'Git revision')
  for x in r['files']:
   b=(p/x['local']).read_bytes();require(len(b)==x['bytes'] and sha(b)==x['sha256'],'Git-bound content');require(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob'],'Git blob')
def source_inputs(p,h):
 baseline=h['parent_verify'].unpack(p/'baseline/source.tar.gz');require(len(baseline)==67,'baseline source set')
 name='vendor/anchor-lang/src/lib.rs';before=baseline[name];text=before.decode();require(text.count('\nmod bpf_writer;\n')==1,'baseline declaration')
 text=text.replace('\nmod bpf_writer;\n','\n\n');marker='}\n\n#[cfg(feature = "event-cpi")]';require(text.count(marker)==1,'destination declaration');text=text.replace(marker,'}\nmod bpf_writer;\n#[cfg(feature = "event-cpi")]');after=text.encode()
 require(before.count(b'\n')==after.count(b'\n') and [i+1 for i,(x,y) in enumerate(zip(before.splitlines(),after.splitlines())) if x!=y]==[40,151],'source line preservation')
 require((p/'source.patch').read_text()==''.join(difflib.unified_diff(before.decode().splitlines(True),text.splitlines(True),fromfile='before/'+name,tofile='after/'+name)),'source patch')
 plan=read(p/'source-plan.json');require(plan['source_path']==name and plan['changed_lines']==[40,151] and plan['before_sha256']==sha(before) and plan['after_sha256']==sha(after),'source plan')
 source=dict(baseline);source[name]=after;pins={n:sha(b) for n,b in source.items()}
 require({r['path']:(r['bytes'],r['sha256']) for r in read(p/'controller/source-inputs.json')['source_files']}=={n:(len(b),sha(b)) for n,b in source.items()},'delivered source pins')
 require(all(raw(p/'controller/sources'/(n+'.gz'))==b for n,b in source.items()),'delivered source bytes')
 return source,pins
def symbol_order(p):
 def undefined(b):
  require(b[:6]==b'\x7fELF\x02\x01','ELF64 object');off=struct.unpack_from('<Q',b,40)[0];entsize,count=struct.unpack_from('<HH',b,58);require(entsize==64,'section header size')
  sections=[struct.unpack_from('<IIQQQQIIQQ',b,off+i*entsize) for i in range(count)];tables=[s for s in sections if s[1]==2];require(len(tables)==1,'object symbol table');s=tables[0];strings=sections[s[6]];names=b[strings[4]:strings[4]+strings[5]];require(s[9]==24 and s[5]%24==0,'symbol table shape');out={}
  for i in range(s[5]//24):
   name,info,other,section,value,size=struct.unpack_from('<IBBHQQ',b,s[4]+i*24)
   if section==0 and info>>4 and name:
    out[names[name:names.index(b'\0',name)].decode()]=i
  return out
 obs=read(p/'symbol-order/observation.json');before=raw(p/'symbol-order/anchor-before.o.gz');after=raw(p/'symbol-order/anchor-after.o.gz');require(sha(before)==obs['baseline_member_sha256'] and sha(after)==obs['new_member_sha256'] and len(after)==obs['new_member_bytes'],'Anchor object pins')
 require(obs['new_archive_sha256']==next(r['sha256'] for r in read(p/'builds/02-rebound-layout/link/input-identities.json') if r['path']==obs['new_archive']),'Anchor archive observation')
 a,b=undefined(before),undefined(after);require(a['sol_memcpy_']<a['sol_log_data'] and b['sol_log_data']<b['sol_memcpy_'],'undefined symbol order')
 return {k:{n:x[n] for n in ['sol_log_data','sol_memcpy_']} for k,x in [('before',a),('after',b)]}
def layout(p,original,rows):
 """Replay upstream matching without assignments; compare the complete script."""
 saved_path=list(sys.path);old={n:sys.modules.get(n) for n in ['elfcmp','gen_ordered','datamap']}
 try:
  with tempfile.TemporaryDirectory() as temp:
   root=Path(temp);tools=root/'tools';inputs=root/'inputs';build=root/'build';tools.mkdir();(inputs/'inputs').mkdir(parents=True);build.mkdir()
   for n in old:(tools/(n+'.py')).write_bytes((p/'layout-tools'/(n+'.py')).read_bytes())
   (inputs/'reader.py').write_bytes((p/'reference/reader.py').read_bytes());(inputs/'deployed.so').write_bytes(original)
   (inputs/'inputs/parent-audit.json.gz').write_bytes(gzip.compress(json.dumps(dict(rows=[dict(r,end=r['start']+r['bytes']) for r in rows])).encode(),mtime=0))
   (build/'symbols.so').write_bytes(raw(p/'builds'/LABELS[0]/'symbols.so.gz'))
   # Normalize path separators only in the map supplied to pathlib. ELF bytes stay untouched.
   (build/'link.map').write_bytes(raw(p/'builds'/LABELS[0]/'link/link.map.gz').replace(b'\\',b'/'))
   baseline=(p/'baseline/ordered-native.ld').read_text();base=baseline
   for name in ['.rodata','.data.rel.ro']:
    base,n=re.subn(r'(?ms)^  '+re.escape(name)+r' : \{\n.*?^  \} :rodata',f'  {name} : {{ *({name}*) }} :rodata',base);require(n==1,'layout placeholder')
   (build/'ordered.ld').write_bytes(base.encode());sys.path.insert(0,str(tools))
   for n in old:sys.modules[n]=module(n,tools/(n+'.py'))
   e,g,d=(sys.modules[n] for n in old);o=e.m.Elf((inputs/'deployed.so').resolve());c=e.m.Elf((build/'symbols.so').resolve());corr=e.Corr(o,c);require(len(corr.o2c)==len(corr.c2o)==441,'layout normalized correspondence')
   report=d.analyze(build);require(json.loads(json.dumps(report))==read(p/'layout-data-binding.json'),'data binding replay')
   require(not report['problems'] and all(not report[n]['unbound'] for n in d.DATA),'unbound data')
   order,rest,notes=g.generate(build);require(len(order)==441 and not rest and not notes,'layout function binding')
   out=root/'ordered.ld';g.write(build,out,order,rest,g.data_entries(build));generated=out.read_text().encode()
   require(generated==(p/'controller/ordered-native.ld').read_bytes(),'replayed linker script')
   block=lambda s:s[s.index('  .text : {'):s.index('*(.text*)')]
   require(block(baseline)==block(generated.decode()),'function selector order changed')
   return dict(function_selectors=441,function_selector_order_unchanged=True,rodata_bound=report['.rodata']['bound'],rodata_merged=len(report['.rodata']['merged']),data_rel_ro_bound=report['.data.rel.ro']['bound'],unbound=0,script_sha256=sha(generated),scope='Target-derived layout; merged sections placed by anchored pieces. Final raw comparison independently checks every byte.')
 finally:
  sys.path[:]=saved_path
  for n,x in old.items():
   if x is None:sys.modules.pop(n,None)
   else:sys.modules[n]=x
def receipt(p,label,h,pins):
 B=p/'builds'/label;launch,result=read(B/'launch.json'),read(B/'result.json');require(result['status']=='SUCCEEDED' and result['returncode']==0 and result['source_unchanged'] and result['historical_macro_dependencies_unchanged'] and result['target_executions']==0,'build status')
 require(launch['source_inputs']==pins and launch['target_directory_initially_absent'] and '--locked' in launch['command'] and '--offline' in launch['command'],'offline fresh source')
 for n,digest in launch['pinned_controller_inputs'].items():
  q=p/'baseline/ordered-native.ld' if n=='ordered-native.ld' and label==LABELS[0] else p/'controller'/n;require(sha(q.read_bytes())==digest,'recipe pin')
 leaf=lambda n:n.replace('\\','/').split('/')[-1]
 require({leaf(n):v for n,v in launch['checked_executables'].items()}=={leaf(n):v for n,v in read(p/'controller/host-tools.json').items()},'host compiler pins')
 records=[json.loads(b) for b in h['parent_verify'].unpack(B/'wrapper-records.tar.gz').values()];target=h['seed_verify'].target_records(records);mapping=[x.split('\t') for x in (p/'controller/metadata-map.tsv').read_text().splitlines()]
 for r in target:
  name=r['after'][r['after'].index('--crate-name')+1];before=[x[9:] for x in r['before'] if x.startswith('metadata=')];after=[x[9:] for x in r['after'] if x.startswith('metadata=')];require(len(before)==len(after)==1 and [before[0],after[0],name] in mapping,'metadata map differs');require(any(x.startswith('historical_anchor_program=') for x in r['after'])==(name=='curve_accounts'),'historical macro delivery')
 require(not any(x.startswith('llvm-args=') for r in records for x in r['after']),'unexpected diagnostic compiler options')
 inv=read(B/'link/invocation.json.gz');before,after=inv['incoming'],inv['forwarded'];delta=[(x,y) for x,y in zip(before,after) if x!=y];require(len(after)==len(before)+1 and after[-1].startswith('-Map=') and len(delta)==1 and delta[0][0].endswith('.ld') and delta[0][1].endswith('ordered-native.ld'),'linker transform');require(raw(B/'link/exit-code.txt.gz').strip()==b'0' and result['strip']['returncode']==0 and '--strip-all' in result['strip']['command'],'link/strip result')
 def canonical(inv):
  norm=lambda s:re.sub('/+','/',s.replace('\\','/'))
  root=norm(inv['cwd']).split('/source/',1)[0]
  return [re.sub(r'/temp/rustc[^/]+/','/temp/<RUSTC>/',norm(x).replace(root,'<BUILD>')) for x in inv['incoming']]
 require(canonical(inv)==canonical(read(p/'baseline/link-invocation.json.gz')),'linker input order or flags changed')
 strip=result['strip']['command'];require(len(strip)==4 and leaf(strip[0])=='llvm-objcopy.exe' and strip[1]=='--strip-all' and leaf(strip[2])=='symbols.so' and leaf(strip[3])=='candidate-v154-strip.so','ordinary strip command')
 inputs=read(B/'link/input-identities.json');require([{k:x[k] for k in ['argument','path','retained']} for x in inputs]==[{k:x[k] for k in ['argument','path','retained']} for x in inv['inputs']],'link input receipt inventory')
 for x in inputs:
  if x['retained']:
   b=raw(B/'link'/(x['retained']+'.gz'));require(dict(bytes=len(b),sha256=sha(b))=={k:x[k] for k in ['bytes','sha256']},'retained link input')
 for n in ['stderr.log','stdout.log']:
  b=raw(B/(n+'.gz'));require(dict(bytes=len(b),sha256=sha(b))==result['logs'][n],'compiler log pin')
 require(b'Stack offset' not in raw(B/'stderr.log.gz'),'stack warning')
 return dict(compilation_commands=163,target_commands=85,historical_host_macro_reused=True,target_executions=0)
def analyze(p=P):
 p=p.resolve();bind(p);require(sha((p/'cases.json').read_bytes())==CASES_SHA,'case pins');cases=read(p/'cases.json');require(list(cases)==LABELS,'case set');event,h=helpers(p);v,c=h['parent_verify'],h['closure'];source,pins=source_inputs(p,h)
 original_bytes=raw(p/'reference/original-allocation.so.gz');require(sha(original_bytes)==event.ORIGINAL and len(original_bytes)==777408,'original allocation');rows=read(p/'reference/inventory.json');require(len(rows)==441,'inventory');layout_report=layout(p,original_bytes,rows);reports={};images={}
 with tempfile.TemporaryDirectory() as temp:
  def elf(n,b):
   f=Path(temp)/(n+'.so');f.write_bytes(b);return h['reader'].Elf(f)
  original=elf('original',original_bytes);ow={r['start']:original.window(r['start'],r['start']+r['bytes']) for r in rows}
  extent=max([original.header['shoff']+original.header['shentsize']*original.header['shnum'],original.header['phoff']+original.header['phentsize']*original.header['phnum']]+[s['offset']+s['size'] for s in original.sections if s['type']!=8]);require(extent==775416 and original_bytes[extent:]==bytes(1992),'original meaningful extent and zero allocation tail')
  baseline=raw(p/'baseline/candidate-v154-strip.so.gz');require(len(baseline)==extent and sha(baseline)=='380157fa6a63e717bd1630c6c4a86a4b66b596caedab6769d4497c8fa2b8d2a9','baseline stripped ELF');baseline_diff=h['reader'].diff(original_bytes[:extent],baseline);require(baseline_diff['overlap_mismatches']==30,'baseline difference')
  require(sha(raw(p/'baseline/symbols.so.gz'))=='5fda674541c8a39caf95d304d4cfb14fe5b0493a0c57e16a4dd78447b7169448','baseline compiler ELF')
  for label,case in cases.items():
   B=p/'builds'/label;require(sha((B/'source.tar.gz').read_bytes())==case['source_archive_sha256'] and v.unpack(B/'source.tar.gz')==source,'source archive pin');commands=receipt(p,label,h,pins);images[label]={n:raw(B/(n+'.gz')) for n in case['outputs']};require({n:v.identity(b) for n,b in images[label].items()}==case['outputs']==read(B/'result.json')['outputs'],'compiler output pin');e=elf(label,images[label]['symbols.so']);stripped=elf(label+'-strip',images[label]['candidate-v154-strip.so']);require(v.sections(e)==v.sections(stripped),'strip changes allocated sections')
   m=v.measure(c,original,ow,rows,e);require((m['normalized'],m['raw_local'],m['direct_closed'],len(m['positive_calls']),len(m['positive_Sources']))==(441,370 if label==LABELS[0] else 441,441,4768,519),'441 census');require(all(x['matches'] and x['closed'] for x in m['inventory']),'whole-window closure');meaningful=h['reader'].diff(original_bytes[:extent],stripped.b);allocation=h['reader'].diff(original_bytes,stripped.b)
   by_section={s['name']:sum(stripped.b[i]!=original_bytes[i] for i in range(s['offset'],s['offset']+s['size'])) for s in stripped.sections};diff_sections={n:k for n,k in by_section.items() if k}
   require(stripped.header==original.header and len(stripped.b)==extent and len(e.b)==907776,'output shape')
   if label==LABELS[0]:require(meaningful['overlap_mismatches']==14362 and diff_sections=={'.text':929,'.rodata':11377,'.data.rel.ro':1666,'.rel.dyn':390},'stale layout control')
   else:require(meaningful['equal'] and not diff_sections and sha(stripped.b)==STRIPPED and sha(e.b)==COMPILER,'meaningful raw identity')
   require(not allocation['equal'] and allocation['excess_tail']==[extent,777408] and allocation['tail_owner']=='original','allocation boundary')
   reports[label]=dict(outputs=case['outputs'],compilation=commands,measurement=m,meaningful_elf=meaningful,allocation_image=allocation,section_mismatches=diff_sections,allocated_sections=v.sections(e))
  require(images[LABELS[1]]==images[LABELS[2]],'repeat complete file identity')
 linker=read(p/'provenance/linker-version.json');tools=read(p/'controller/host-tools.json');require(linker['returncode']==0 and linker['sha256']==next(v for k,v in tools.items() if k.replace('\\','/').endswith('/rust-lld.exe')) and linker['llvm_revision'] in linker['stdout'],'linker version observation')
 return dict(builds=reports,layout=layout_report,anchor_undefined_symbols=symbol_order(p),baseline_meaningful_elf=baseline_diff,fresh_compilations=489,fresh_target_compilations=255,source_files=67,source_changed_files=1,source_changed_lines=[40,151],target_executions=0,original_meaningful_bytes=775416,original_allocation_tail=1992,repeat_compiler_files_equal=True,repeat_stripped_files_equal=True,scope='Ordinary stripped linker output equals the original meaningful ELF. Unstripped compiler output and the allocation image are different files. Target-derived layout, metadata/path maps, SDK/sysroot and reused historical host macro remain explicit inputs; no historical-source/compiler attribution, target execution or security claim.')
def verify(p=P):
 event,_=helpers(p);event.manifest(p);r=analyze(p);require(json.loads(json.dumps(r))==read(p/'report.json.gz'),'saved report');return r
if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--packet',type=Path,default=P);parser.add_argument('--write-report',action='store_true');args=parser.parse_args()
 if args.write_report:(args.packet/'report.json.gz').write_bytes(gzip.compress((json.dumps(analyze(args.packet),indent=2)+'\n').encode(),mtime=0));print('Wrote recomputed report')
 else:verify(args.packet);print('Verified 489 fresh crate commands; repeated compiler output; all 775416 meaningful original ELF bytes equal after ordinary stripping. Separate1992-byte allocation tail absent.')
