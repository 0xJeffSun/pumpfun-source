"""Replay the saved fresh441 build and literal linker-selector adaptation offline."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,re,tempfile
P=Path(__file__).resolve().parent
CASES_SHA='cc2adfbdf7b14c1848a6522e769835af3b09ca09421668bc4d5a8e9af3a4790b'
def require(ok,msg):
 if not ok:raise ValueError(msg)
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b) if p.suffix=='.gz' else b
def read(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def helpers(p):
 e=module('native441_event_parent',p/'reference/event_verify.py');return e,e.helpers(p)
def bind(p):
 for filename,rev,prefix in [('recipe-bindings.json','fcd0365f411661db3a9c1b08740dfd60a05daa14',''),('upstream-bindings.json','dc8f791d32ae7fd6d9660cd1bf003fb02737f78f','upstream/')]:
  r=read(p/'provenance'/filename);require(r['revision']==rev,'Git revision')
  for x in r['files']:
   b=(p/(prefix+x['local'])).read_bytes();require(len(b)==x['bytes'] and sha(b)==x['sha256'],'Git-bound content');require(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob'],'Git blob')
def selectors(p):
 mapping=read(p/'selector-map.json');original=(p/'upstream/builds/ordered.ld').read_bytes();adapted=(p/'controller/ordered-native.ld').read_bytes();require(sha(original)==mapping['original_script_sha256'] and sha(adapted)==mapping['translated_script_sha256'],'selector script pins');text=original.decode();rows=mapping['bindings'];expected=set(re.findall(r'^\s*([^\s]+)\(',text,re.M))-{'*'};require(len(rows)==36 and len({x['original'] for x in rows})==36 and {x['original'] for x in rows}==expected,'selector coverage')
 inputs=read(p/'builds/01-shipped-linker/link/input-identities.json');leaf=lambda n:n.replace('\\','/').split('/')[-1];archives={leaf(r['path']):r['sha256'] for r in inputs if r['path'].endswith('.rlib')}
 second=read(p/'second-cohort-members.json');require(len(second)==36 and {x['selector'] for x in second}=={x['translated'] for x in rows},'second selector coverage');second={x['selector']:x for x in second};second_inputs={leaf(r['path']):r for r in read(p/'builds/02-native-selectors/link/input-identities.json')};changed_archives=set()
 for x in rows:
  member=raw(p/x['saved_member']);require(sha(member)==x.get('member_sha256',x.get('sha256')),'saved member pin')
  if x['kind']=='archive-member':
   old_archive,old_member=x['original'].lstrip('*').split(':',1);new_archive,new_member=x['translated'].lstrip('*').split(':',1);a=re.fullmatch(r'lib(.+)-([0-9a-f]{16})\.rlib',old_archive);b=re.fullmatch(r'lib(.+)-([0-9a-f]{16})\.rlib',new_archive);require(a is not None and b is not None and a[1]==b[1],'archive crate changed');require(old_member.replace(a[1]+'-'+a[2]+'.',b[1]+'-'+b[2]+'.',1)==new_member==x['member'],'member suffix changed');require(archives.get(new_archive)==x['archive_sha256'] and x['matches']==1 and len(member)==x['member_bytes'],'archive/member observation differs')
   q=second[x['translated']];require(q['archive_sha256']==second_inputs[new_archive]['sha256'] and q['member_sha256']==sha(member) and q['bytes']==len(member) and q['matches']==1,'second archive/member observation');
   if x['archive_sha256']!=q['archive_sha256']:changed_archives.add(new_archive)
  else:
   require(x['kind']=='object' and x['original']==x['translated'],'root selector changed');q=second[x['translated']];require(q['object_sha256']==sha(member)==second_inputs[x['translated'].lstrip('*')]['sha256'] and q['bytes']==len(member),'second root object')
  text=text.replace(x['original']+'(',x['translated']+'(')
 require(text.encode()==adapted,'selector adaptation changes more than filenames');require(sum(x['original']!=x['translated'] for x in rows)==mapping['changed_selectors']==18,'changed selector count')
 require([x.split('(',1)[1] for x in original.decode().splitlines() if '(' in x]==[x.split('(',1)[1] for x in adapted.decode().splitlines() if '(' in x],'section order changed')
 return dict(bindings=36,changed_selectors=18,identical_selected_objects=36,different_archive_hashes=sorted(changed_archives),scope='Saved membership observations and object bytes. Archives remain external; no independent in-packet recomputation of archive containment or live loader state.')
def receipt(p,label,h,pins):
 B=p/'builds'/label;launch,result=read(B/'launch.json'),read(B/'result.json');require(result['status']=='SUCCEEDED' and result['returncode']==0 and result['source_unchanged'] and result['historical_macro_dependencies_unchanged'] and result['target_executions']==0,'build status')
 require(launch['source_inputs']==pins and launch['target_directory_initially_absent'] and '--locked' in launch['command'] and '--offline' in launch['command'],'offline fresh source')
 for n,digest in launch['pinned_controller_inputs'].items():
  q=p/'upstream/builds/ordered.ld' if n=='ordered-native.ld' and label=='01-shipped-linker' else p/'controller'/n
  require(sha(q.read_bytes())==digest,'recipe pin')
 leaf=lambda n:n.replace('\\','/').split('/')[-1]
 require({leaf(n):v for n,v in launch['checked_executables'].items()}=={leaf(n):v for n,v in read(p/'controller/host-tools.json').items()},'host compiler pins')
 records=[json.loads(b) for b in h['parent_verify'].unpack(B/'wrapper-records.tar.gz').values()];target=h['seed_verify'].target_records(records);mapping=[x.split('\t') for x in (p/'controller/metadata-map.tsv').read_text().splitlines()]
 for r in target:
  name=r['after'][r['after'].index('--crate-name')+1];before=[x[9:] for x in r['before'] if x.startswith('metadata=')];after=[x[9:] for x in r['after'] if x.startswith('metadata=')];require(len(before)==len(after)==1 and [before[0],after[0],name] in mapping,'metadata map differs');require(any(x.startswith('historical_anchor_program=') for x in r['after'])==(name=='curve_accounts'),'historical macro delivery')
 require(not any(x.startswith('llvm-args=') for r in records for x in r['after']),'unexpected diagnostic compiler options')
 inv=read(B/'link/invocation.json.gz');before,after=inv['incoming'],inv['forwarded'];delta=[(x,y) for x,y in zip(before,after) if x!=y];require(len(after)==len(before)+1 and after[-1].startswith('-Map=') and len(delta)==1 and delta[0][0].endswith('.ld') and delta[0][1].endswith('ordered-native.ld'),'linker transform');require(raw(B/'link/exit-code.txt.gz').strip()==b'0' and result['strip']['returncode']==0 and '--strip-all' in result['strip']['command'],'link/strip result')
 for x in read(B/'link/input-identities.json'):
  if x['retained']:
   b=raw(B/'link'/(x['retained']+'.gz'));require(dict(bytes=len(b),sha256=sha(b))=={k:x[k] for k in ['bytes','sha256']},'retained link input')
 for n in ['stderr.log','stdout.log']:
  b=raw(B/(n+'.gz'));require(dict(bytes=len(b),sha256=sha(b))==result['logs'][n],'compiler log pin')
 require(b'Stack offset' not in raw(B/'stderr.log.gz'),'stack warning')
 return dict(compilation_commands=163,target_commands=85,historical_host_macro_reused=True,target_executions=0)
def analyze(p=P):
 p=p.resolve();bind(p);require(sha((p/'cases.json').read_bytes())==CASES_SHA,'case pins');cases=read(p/'cases.json');require(set(cases)=={'01-shipped-linker','02-native-selectors'},'case set');event,h=helpers(p);v,c=h['parent_verify'],h['closure'];selector_report=selectors(p)
 source=v.unpack(p/'upstream/sources/source.tar.gz');pins={n:sha(b) for n,b in source.items()};require(len(source)==67 and pins==read(p/'upstream/sources/source-inputs.json'),'upstream source');require({r['path']:r['sha256'] for r in read(p/'controller/source-inputs.json')['source_files']}==pins,'delivered source pins');require(all(raw(p/'controller/sources'/(n+'.gz'))==b for n,b in source.items()),'delivered source bytes')
 original_bytes=raw(p/'reference/original-allocation.so.gz');require(sha(original_bytes)==event.ORIGINAL and len(original_bytes)==777408,'original allocation');reports={};images={}
 with tempfile.TemporaryDirectory() as temp:
  def elf(n,b):
   f=Path(temp)/(n+'.so');f.write_bytes(b);return h['reader'].Elf(f)
  original=elf('original',original_bytes);rows=read(p/'reference/inventory.json');require(len(rows)==441,'inventory');ow={r['start']:original.window(r['start'],r['start']+r['bytes']) for r in rows}
  extent=original.header['shoff']+original.header['shentsize']*original.header['shnum'];require(extent==775416 and original_bytes[extent:]==bytes(1992),'original meaningful extent and zero allocation tail')
  for label,case in cases.items():
   B=p/'builds'/label;require(sha((B/'source.tar.gz').read_bytes())==case['source_archive_sha256'] and v.unpack(B/'source.tar.gz')==source,'source archive pin');commands=receipt(p,label,h,pins);images[label]={n:raw(B/(n+'.gz')) for n in case['outputs']};require({n:v.identity(b) for n,b in images[label].items()}==case['outputs']==read(B/'result.json')['outputs'],'compiler output pin');e=elf(label,images[label]['symbols.so']);stripped=elf(label+'-strip',images[label]['candidate-v154-strip.so']);require(v.sections(e)==v.sections(stripped),'strip changes allocated sections')
   m=v.measure(c,original,ow,rows,e);require((m['normalized'],m['raw_local'],m['direct_closed'],len(m['positive_calls']),len(m['positive_Sources']))==(441,90 if label=='01-shipped-linker' else 441,441,4768,519),'441 census');require(all(x['matches'] and x['closed'] for x in m['inventory']),'whole-window closure');meaningful=h['reader'].diff(original_bytes[:extent],stripped.b);allocation=h['reader'].diff(original_bytes,stripped.b)
   if label=='02-native-selectors':
    require(len(stripped.b)==extent and meaningful['overlap_mismatches']==30 and not meaningful['equal'] and not allocation['equal'],'remaining raw difference');by_section={s['name']:sum(stripped.b[i]!=original_bytes[i] for i in range(s['offset'],s['offset']+s['size'])) for s in stripped.sections};require({n:k for n,k in by_section.items() if k}=={'.dynsym':1,'.dynstr':20,'.rel.dyn':9},'remaining section differences');require(stripped.header==original.header,'original header shape')
   reports[label]=dict(outputs=case['outputs'],compilation=commands,measurement=m,meaningful_elf=meaningful,allocation_image=allocation,allocated_sections=v.sections(e))
  archived={'symbols.so':raw(p/'upstream/builds/symbols.so.gz'),'candidate-v154-strip.so':raw(p/'upstream/builds/candidate.so.gz')};require(images['02-native-selectors']==archived,'archived complete file identity');require(all(images['01-shipped-linker'][n]!=b for n,b in archived.items()),'unadapted negative control')
  require(sha(archived['symbols.so'])=='5fda674541c8a39caf95d304d4cfb14fe5b0493a0c57e16a4dd78447b7169448' and sha(archived['candidate-v154-strip.so'])=='380157fa6a63e717bd1630c6c4a86a4b66b596caedab6769d4497c8fa2b8d2a9','archived output pins')
 return dict(builds=reports,selectors=selector_report,fresh_compilations=326,fresh_target_compilations=170,source_files=67,target_executions=0,original_allocation_tail=1992,scope='Fresh native dependency reproduction of merged441 with literal artifact selectors adapted. Target-derived linker layout retained; no original full-ELF equality, historical source/compiler attribution, new runtime evidence or security claim.')
def verify(p=P):
 event,_=helpers(p);event.manifest(p);r=analyze(p);require(json.loads(json.dumps(r))==read(p/'report.json.gz'),'saved report');return r
if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--packet',type=Path,default=P);parser.add_argument('--write-report',action='store_true');args=parser.parse_args()
 if args.write_report:(args.packet/'report.json.gz').write_bytes(gzip.compress((json.dumps(analyze(args.packet),indent=2)+'\n').encode(),mtime=0));print('Wrote recomputed report')
 else:verify(args.packet);print('Verified 326 fresh crate commands; both archived441 files identical; original meaningful ELF still differs by30bytes plus1992allocation bytes absent.')
