#!/usr/bin/env python3
"""Read saved evidence only: no compiler, VM, subprocess, Git or network calls."""
from collections import defaultdict,Counter
from pathlib import Path, PurePosixPath
import argparse,csv,difflib,gzip,hashlib,importlib.util,io,json,re,struct,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
ORIGINAL='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
BASE='73dff97e65535ce7d2552ba6f29f94fe0e08ebd414a51871a81c6cba2d7d6168'
BASE_SYMBOLS='440b92811753dd9af1468f6bf2d0e9139309984de3519a8f9a937babfdb6c903'
READER='7be3a56418587fdc05178529428ab18df40a252fbd46431ceb98e9107fe414b1'
NEW_CLOSED=['O0207','O0208','O0210','O0214','O0215','O0217','O0219','O0222']
FINISH='_ZN5alloc7raw_vec11finish_grow17h728583255202ce8aE'
def require(ok,message):
 if not ok:raise ValueError(message)
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b)if p.suffix=='.gz'else b
def read(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify_package(p):
 paths=list(p.rglob('*'));require(not any(x.is_symlink()for x in paths),'packet symlink');require(all(x.is_file()or x.is_dir()for x in paths),'packet special file')
 actual={x.relative_to(p).as_posix():sha(x.read_bytes())for x in paths if x.is_file()and x!=p/'manifest.json'}
 require(actual==read(p/'manifest.json'),'packet manifest differs')
def unpack(p):
 out={}
 with tarfile.open(fileobj=io.BytesIO(raw(p)),mode='r:')as tf:
  for member in tf:
   n=PurePosixPath(member.name);require(member.isfile()and not n.is_absolute()and '..'not in n.parts and member.name not in out,'invalid source archive member');out[member.name]=tf.extractfile(member).read()
 require(len(out)==67,'source file count differs');return out
def prune(pairs,edges):
 active=set(pairs);rounds=[]
 while True:
  lost={p for p in active if any(t not in active for t in edges[p])}
  if not lost:return active,rounds
  active-=lost;rounds.append(len(lost))
def key(w):return(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
def tables(e):
 out={};names=defaultdict(set)
 for s in e.symbols:
  if s['info']&15!=2 or s['size']<8 or not e.lo<=s['value']<e.hi:continue
  w=e.window(s['value'],s['value']+s['size']);require(s['value']not in out or out[s['value']]==w,'conflicting function extents');out[s['value']]=w;names[s['value']].add(s['name'])
 return out,names
def source(e,a):
 if a not in e.rel or e.rel[a]['type']!=8:return None
 try:
  z,t=struct.unpack_from('<II',e.b,a);n,l,c=struct.unpack_from('<QII',e.b,a+8)
  if z or not(1<=n<300 and 1<=l<100000 and 1<=c<10000):return None
  name=e.b[t:t+n].decode();return(name,l,c)if name.endswith('.rs\0')else None
 except(UnicodeError,struct.error):return None
def profile(e,w):return{str(d['offset']):s for d in w['data_references']if(s:=source(e,d['target']))}
def relation(ow,cw):
 grouped=defaultdict(list)
 for a,w in cw.items():grouped[key(w)].append(a)
 pairs={(a,c)for a,w in ow.items()for c in grouped[key(w)]};edges={}
 for a,c in pairs:
  require([x['offset']for x in ow[a]['direct']]==[x['offset']for x in cw[c]['direct']],'ordered call slots differ')
  edges[a,c]=[(x['target'],y['target'])for x,y in zip(ow[a]['direct'],cw[c]['direct'])]
 active,rounds=prune(pairs,edges);return grouped,pairs,active,rounds

def analyze(original,before,after,rows):
 ow={r['start']:original.window(r['start'],r['start']+r['bytes'])for r in rows};bw,bn=tables(before);cw,cn=tables(after)
 bg,bpairs,ba,br=relation(ow,bw);cg,cpairs,ca,cr=relation(ow,cw);result={'body_losses':[],'gains':[],'raw_losses':[],'raw_gains':[],'positive_edge_losses':[],'positive_Source_losses':[],'Source_profile_losses':[]};be=ce=bs=cs=0
 for r in rows:
  a=r['start'];w=ow[a];old,new=bg[key(w)],cg[key(w)];rb=any(bw[x]['raw_sha256']==w['raw_sha256']for x in old);rc=any(cw[x]['raw_sha256']==w['raw_sha256']for x in new)
  if old and not new:result['body_losses'].append(r['id'])
  if new and not old:result['gains'].append(r['id'])
  if rb and not rc:result['raw_losses'].append(r['id'])
  if rc and not rb:result['raw_gains'].append(r['id'])
  bprofiles=[profile(before,bw[x])for x in old];cprofiles=[profile(after,cw[x])for x in new]
  for p in bprofiles:
   if p not in cprofiles:result['Source_profile_losses'].append({'id':r['id'],'profile':p})
  for call in w['direct']:
   if call['target']not in ow:continue
   expected=key(ow[call['target']])
   def support(hits,t):return any(any(x['offset']==call['offset']and x['target']in t and key(t[x['target']])==expected for x in t[c]['direct'])for c in hits)
   b,c=support(old,bw),support(new,cw);be+=b;ce+=c
   if b and not c:result['positive_edge_losses'].append([r['id'],call['offset']])
  for d in w['data_references']:
   expected=source(original,d['target'])
   if expected is None:continue
   b,c=any(x.get(str(d['offset']))==expected for x in bprofiles),any(x.get(str(d['offset']))==expected for x in cprofiles);bs+=b;cs+=c
   if b and not c:result['positive_Source_losses'].append([r['id'],d['offset']])
 bclosed={a for a,c in ba};cclosed={a for a,c in ca}
 result.update(baseline_normalized=len({a for a,c in bpairs}),normalized=len({a for a,c in cpairs}),baseline_raw=sum(any(bw[c]['raw_sha256']==w['raw_sha256']for c in bg[key(w)])for w in ow.values()),raw=sum(any(cw[c]['raw_sha256']==w['raw_sha256']for c in cg[key(w)])for w in ow.values()),positive_edges=[be,ce],positive_Sources=[bs,cs],baseline_normalized_pairs=len(bpairs),normalized_pairs=len(cpairs),baseline_direct_closed_pairs=len(ba),direct_closed_pairs=len(ca),baseline_direct_closed_windows=len(bclosed),direct_closed_windows=len(cclosed),prune_rounds=cr,new_closed=[r['id']for r in rows if r['start']in cclosed-bclosed],lost_closed=[r['id']for r in rows if r['start']in bclosed-cclosed])
 require(result['baseline_normalized']==result['normalized']==432,'normalized coverage differs');require(result['baseline_raw']==100 and result['raw']==141,'raw coverage differs')
 require(not any(result[n]for n in ['body_losses','gains','raw_losses','positive_edge_losses','positive_Source_losses','Source_profile_losses','lost_closed']),'preservation differs')
 require(result['positive_edges']==[4314,4315]and result['positive_Sources']==[456,456],'positive call/Source coverage differs')
 require(result['baseline_direct_closed_windows']==414 and result['direct_closed_windows']==422 and result['new_closed']==NEW_CLOSED,'direct closure differs')
 bnames,cnames=defaultdict(list),defaultdict(list)
 for a,w in bw.items():
  for n in bn[a]:bnames[n].append(w)
 for a,w in cw.items():
  for n in cn[a]:cnames[n].append(w)
 require(bnames.keys()==cnames.keys(),'linked function names differ')
 changed=sorted(n for n in bnames if Counter(key(w)for w in bnames[n])!=Counter(key(w)for w in cnames[n]));require(changed==[FINISH],'unexpected changed linked function')
 require(all(Counter(json.dumps(profile(before,w),sort_keys=True)for w in ws)==Counter(json.dumps(profile(after,w),sort_keys=True)for w in cnames[n])for n,ws in bnames.items()),'linked Source profile differs')
 result['linked_functions']={'names':len(bnames),'name_occurrences_before':sum(map(len,bnames.values())),'name_occurrences_after':sum(map(len,cnames.values())),'windows_before':len(bw),'windows_after':len(cw),'changed':changed,'preserved':len(bnames)-len(changed)}
 require(result['linked_functions']=={'names':556,'name_occurrences_before':567,'name_occurrences_after':567,'windows_before':447,'windows_after':447,'changed':[FINISH],'preserved':555},'linked function inventory differs')
 result['closure_rows']=[{'id':r['id'],'original_start':r['start'],'before':sorted(c for a,c in ba if a==r['start']),'after':sorted(c for a,c in ca if a==r['start'])}for r in rows]
 r=next(r for r in rows if r['id']=='O0210');a=r['start'];result['function_inventory']=[]
 for row in rows:
  start=row['start'];w=ow[start];hits=sorted(cg[key(w)]);counterparts=[{'start':c,'bytes':cw[c]['end']-c,'names':sorted(cn[c]),'raw_local_equal':cw[c]['raw_sha256']==w['raw_sha256'],'direct_closed':(start,c)in ca}for c in hits]
  status='raw-local'if any(x['raw_local_equal']for x in counterparts)else'normalized-only'if counterparts else'unmatched'
  result['function_inventory'].append({'id':row['id'],'start':start,'bytes':row['bytes'],'local_equality':status,'direct_closed':start in cclosed,'counterparts':counterparts})
 result['reserve_counterparts']=[]
 for c in sorted(cg[key(ow[a])]):
  result['reserve_counterparts'].append({'start':c,'closed':(a,c)in ca,'calls':[{'offset':x['offset'],'original_target':x['target'],'candidate_target':y['target'],'original_bytes':ow[x['target']]['end']-x['target'],'candidate_bytes':cw[y['target']]['end']-y['target'],'normalized':key(ow[x['target']])==key(cw[y['target']])}for x,y in zip(ow[a]['direct'],cw[c]['direct'])]})
 return result,cw

def inventory_report(body):
 rows=body['function_inventory'];return{'scope':'Whole local windows under the existing normalization, plus an ordered direct-call relation. Neither is general data, indirect-call or semantic equivalence.','counts':dict(Counter(r['local_equality']for r in rows)),'original_text_bytes':sum(r['bytes']for r in rows),'matched_text_bytes':sum(r['bytes']for r in rows if r['local_equality']!='unmatched'),'raw_local_text_bytes':sum(r['bytes']for r in rows if r['local_equality']=='raw-local'),'direct_closed_text_bytes':sum(r['bytes']for r in rows if r['direct_closed']),'direct_closed_windows':sum(r['direct_closed']for r in rows),'rows':rows}
def inventory_tsv(inventory):
 out=io.StringIO();writer=csv.writer(out,delimiter='\t',lineterminator='\n');writer.writerow(['original_id','original_start','bytes','local_equality','direct_call_status','candidate_starts','candidate_names'])
 for r in inventory['rows']:
  writer.writerow([r['id'],hex(r['start']),r['bytes'],r['local_equality'],'closed'if r['direct_closed']else'unclosed'if r['counterparts']else'unmatched',';'.join(hex(c['start'])for c in r['counterparts']),';'.join(hex(c['start'])+':'+','.join(c['names'])for c in r['counterparts'])])
 return out.getvalue()

def archive_objects(data):
 require(data[:8]==b'!<arch>\n','archive magic');at=8;names=b'';out={}
 while at<len(data):
  h=data[at:at+60];require(len(h)==60 and h[58:]==b'`\n','archive header');n=h[:16].decode().strip();size=int(h[48:58]);at+=60;b=data[at:at+size];require(len(b)==size,'archive truncated');at+=size+(size%2)
  if n=='//':names=b;continue
  if n.startswith('/')and n[1:].isdigit():n=names[int(n[1:]):].split(b'/\n',1)[0].decode()
  else:n=n.rstrip('/')
  if b[:4]==b'\x7fELF':require(n not in out,'duplicate object');out[n]=b
 require(at==len(data),'archive extent');return out
def executable_sections(data):
 out={}
 for name,b in archive_objects(data).items():
  h=struct.unpack_from('<HHIQQQIHHHHHH',b,16);rows=[struct.unpack_from('<IIQQQQIIQQ',b,h[5]+i*h[10])for i in range(h[11])];s=rows[h[12]];names=b[s[4]:s[4]+s[5]]
  for r in rows:
   n=names[r[0]:].split(b'\0',1)[0].decode()
   if r[2]&4 and r[5]:require(n not in out,'duplicate executable section');out[n]=b[r[4]:r[4]+r[5]]
 return out
def objects(p):
 old,first,repeat=[raw(p/'curve'/n)for n in ['baseline.rlib.gz','first.rlib.gz','repeat.rlib.gz']];require(sha(old)=='c0e003ced4a8243eebdcf5b70030082e217f0939752ca3bac2d8ed1bdd4ed3aa','baseline curve archive differs');require(first==repeat,'curve repeat differs');a,b=executable_sections(old),executable_sections(first);require(a.keys()<=b.keys(),'missing old curve section');changed=[n for n in a if a[n]!=b[n]]
 require(changed==['.text.unlikely.'+FINISH],'unexpected changed curve section');require(len(a[changed[0]])==312 and len(b[changed[0]])==328,'allocator extent differs')
 require(len(a)==28 and len(b)==38,'curve section inventory differs')
 return{'baseline_sha256':sha(old),'first_sha256':sha(first),'repeat_sha256':sha(repeat),'before_sections':len(a),'after_sections':len(b),'preserved_sections':len(a)-1,'changed':[{'name':n,'before_bytes':len(a[n]),'after_bytes':len(b[n]),'before_sha256':sha(a[n]),'after_sha256':sha(b[n])}for n in changed],'added':[{'name':n,'bytes':len(b[n]),'sha256':sha(b[n])}for n in sorted(b.keys()-a.keys())]}
def maps(p,role,e,windows):
 text=raw(p/'builds'/role/'link.map.gz').decode();found=[]
 for line in text.splitlines():
  m=re.match(r'^\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+)\s+.*:\((\.text[^)]*)\)$',line)
  if m:
   a,z=int(m[1],16),int(m[3],16)
   if z and e.lo<=a<e.hi:found.append((a,a+z))
 require(len(found)==447 and set(found)=={(a,w['end'])for a,w in windows.items()},'link map function extents differ')
 return {'input_function_sections':len(found),'distinct_function_extents':len(set(found))}
def sources(p,root):
 a,b=unpack(p/'source/baseline.tar.gz'),unpack(p/'source/composed.tar.gz');inputs=read(p/'source/inputs.json');inventory=lambda d:{n:sha(v)for n,v in d.items()}
 require(inventory(a)==inputs['baseline_files']==read(root/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json'),'baseline source binding differs');require(inventory(b)==inputs['composed_files'],'composed source binding differs')
 changed=sorted(n for n in b if a[n]!=b[n]);require(changed==['curve-accounts/idls/pump.json','curve-accounts/src/interface_definition.rs'],'source scope differs')
 name=changed[1];require(a[name].count(b'declare_program!(pump);')==1 and b[name]==a[name].replace(b'declare_program!(pump);',b'historical_anchor_program::declare_program!(pump);'),'macro invocation differs')
 ai,bi=json.loads(a[changed[0]]),json.loads(b[changed[0]]);historic=read(root/'research/mayhem-historical-macro-context/direct/old-historical-create/source/curve-accounts/idls/pump.json.gz');expected=dict(ai);require('events'not in ai and 'types'not in ai,'base IDL differs');expected.update(events=historic['events'],types=historic['types']);require(bi==expected,'historical IDL composition differs')
 patch=''.join(''.join(difflib.unified_diff(a[n].decode().splitlines(True),b[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in changed);require((p/'source/change.patch').read_text()==patch,'source delta differs')
 return inventory(b)
def commands(p,inputs,images,obj):
 obs=read(p/'bindings/input-observations.json');require(obs['candidate_sha256']==sha(images['first'][0])and obs['symbols_sha256']==sha(images['first'][1]),'output binding differs')
 require(obs['repeat_candidate_sha256']==sha(images['repeat'][0])and obs['repeat_symbols_sha256']==sha(images['repeat'][1]),'repeat output binding differs')
 require(obs['repeated_curve_archive_sha256']==obj['first_sha256'],'archive binding differs')
 require(obs['macro_sha256']==sha(raw(p/'bindings/host-macro.dylib.gz'))==read(p/'curve/first-record.json')[0]['macro_sha256'],'macro command binding differs')
 require(sha((p/'bindings/target-libraries.json').read_bytes())=='d1cfdc689c392c46658582032138f0eb89bb854f6860986311cab6be343b71f3','target library inventory changed');target=read(p/'bindings/target-libraries.json');require(len(target['files'])==26 and target['archive_sha256']=='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e','target library binding differs');require(obs['target_library_inventory']==target,'target library observations differ')
 records=[read(p/'curve/first-record.json')[0],read(p/'builds/first/launch.json'),*read(p/'builds/repeat/builds.json')];require(len(records)==4,'compiler record count differs')
 for rec in records:
  require(rec['source_inputs']==inputs,'compiler source binding differs');cmd=rec['command'];require(Path(cmd[0]).name=='rustc'and '--crate-name'in cmd and '--target'in cmd and cmd[cmd.index('--target')+1]=='sbpf-solana-solana','compiler command differs')
  name=cmd[cmd.index('--crate-name')+1];require(name in ('curve_accounts','mayhem_recovered'),'compiler crate differs');require('opt-level=3'in cmd and 'codegen-units=1'in cmd and 'overflow-checks=on'in cmd,'compiler profile differs')
  require(not any('deployed.so'in x or 'evidence/original'in x for x in cmd),'original binary used as compiler input')
  require(not any(x.endswith('.so')for x in cmd),'unexpected compiler binary input')
  if name=='curve_accounts':require(any(x.startswith('historical_anchor_program=')for x in cmd),'historical macro input missing')
  else:require(any(x.startswith('curve_accounts=')for x in cmd),'curve input missing')
 for role in ['first','repeat']:
  result=read(p/'builds'/role/'result.json');require(result.get('returncode',0)==0 and result['candidate_sha256']==sha(images[role][0])and result['symbols_sha256']==sha(images[role][1]),'build result differs')
  invocation=read(p/'builds'/role/'invocation.json');before,after=invocation['incoming'],invocation['forwarded'];require(len(before)==len(after),'linker argument counts differ');changes=[(a,b)for a,b in zip(before,after)if a!=b];require(len(changes)==1 and changes[0][0].endswith('.ld')and changes[0][1].endswith('/ordered.ld'),'linker transformation differs')
  require(not any('deployed.so'in x or 'evidence/original'in x for x in before+after),'original binary used as linker input');require(invocation['script_sha256']==sha((p/'layout/ordered.ld').read_bytes()),'linker script binding differs')
 require(read(p/'builds/repeat/result.json')['source_unchanged']and all(x['returncode']==0 and x['source_unchanged']for x in read(p/'builds/repeat/builds.json')),'repeat receipt differs')
 return{'compiler_records':4,'target_libraries':26,'dependency_hash_observation':'after-build, reused private cache','host_macro_rebuilt':False}
def typed_contracts(p,root,prior_path,candidate_path,original,candidate,ow,cw):
 files={'buy_reader.py':'research/mayhem-buy-retained-recovery/typed_data_reader.py','sell_reader.py':'research/mayhem-buy-retained-recovery/sell_typed_reader.py','initializer.py':'research/mayhem-initializer-current-recovery-20261027/analysis.py'}
 for name,ref in files.items():require((p/'typed'/name).read_bytes()==(root/ref).read_bytes(),'frozen typed reader differs')
 quotes={}
 for label,original_start,needle in [('buy',185296,'9buy_quote17'),('sell',186552,'10sell_quote17')]:
  m=module('closure_typed_'+label,p/'typed'/(label+'_reader.py'));m.R=root;report=m.inspect(candidate_path)
  require(report['whole_body_normalized_equal']and report['direct_callee_multiset_equal']and report['typed_data_multiset_equal']and report['original_data']==report['candidate_data']and len(report['original_data'])==10,'quote typed contracts differ')
  syms={(z['value'],z['size'])for z in candidate.symbols if needle in z['name']};require(len(syms)==1,'quote helper symbol differs');a,size=syms.pop();body=cw[a]
  require([(z['offset'],key(ow[z['target']]))for z in ow[original_start]['direct']]==[(z['offset'],key(cw[z['target']]))for z in body['direct']],'ordered quote callees differ');quotes[label]=report
 require(quotes==read(p/'analysis/quote-typed-contracts.json'),'saved quote typed contracts differ')
 init=module('closure_typed_initializer',p/'typed/initializer.py').inspect(root,p,prior_path,candidate_path)
 require(init==read(p/'analysis/initializer-typed-contracts.json'),'saved initializer typed contracts differ');require(init['snapshot']['complete_normalized_equal']and init['snapshot']['exact_eight_byte_slots']==120 and init['snapshot']['typed_data']['references']==4,'initializer typed contracts differ')
 return{'quote_ordered_callees':20,'quote_ordered_typed_references':20,'initializer_slots':120,'initializer_ordered_callees':5,'initializer_typed_references':4}
def verify_runtime(p,root,candidate,include_runtime):
 status=read(p/'runtime/status.json');digest=sha(candidate)
 if status['state']=='pending':
  require(status['candidate_sha256']==digest and status['planned_trade_pairs']==6636 and status['planned_initializer_pairs']==69 and status['qualification_claimed']is False,'pending runtime binding differs')
  require({x.relative_to(p/'runtime').as_posix()for x in(p/'runtime').rglob('*')if x.is_file()}=={'README.md','status.json'},'unverified pending runtime files')
  return{'state':'pending','qualified':False,'verified_pairs':0}
 require(status['state']=='complete'and status['candidate_sha256']==digest and status['qualification_claimed']is True and status['verified_trade_pairs']==6636 and status['verified_initializer_pairs']==69,'runtime completion binding differs')
 if not include_runtime:return{'state':'complete','qualified':False,'skipped':True,'verified_pairs':0}
 return module('current_macro_runtime',p/'runtime_verifier.py').check(p,root,candidate)
def verify_image_pair(reader,symbols,candidate,path):
 path.write_bytes(candidate);stripped=reader.Elf(path)
 require(all(symbols.header[k]==stripped.header[k]for k in ['type','machine','version','entry','flags']),'execution header differs')
 require([x['values']for x in symbols.ph]==[x['values']for x in stripped.ph],'execution program headers differ')
 original={x['name']:x for x in symbols.sections if x['flags']&2};copy={x['name']:x for x in stripped.sections if x['flags']&2}
 require(original.keys()==copy.keys(),'allocated section inventory differs')
 for name,a in original.items():
  b=copy[name];require(all(a[k]==b[k]for k in ['type','flags','address','size','alignment','entry_size']),'allocated section metadata differs: '+name)
  if a['type']!=8:require(symbols.b[a['offset']:a['offset']+a['size']]==stripped.b[b['offset']:b['offset']+b['size']],'allocated section payload differs: '+name)

def verify(p=P,root=ROOT,compare_saved=True,include_runtime=True):
 verify_package(p)
 external=read(p/'external-inputs.json')
 for n,h in external.items():require(sha((root/n).read_bytes())==h,'external input differs: '+n)
 require(external['evidence/original/mayhem/deployed.so']==ORIGINAL,'original binding differs');require(sha((p/'reader.py').read_bytes())==READER,'reader changed')
 inputs=sources(p,root);obj=objects(p);images={role:[raw(p/'builds'/role/(name+'.gz'))for name in ['candidate.so','symbols.so']]for role in ['baseline','first','repeat']};require(sha(images['baseline'][0])==BASE and sha(images['baseline'][1])==BASE_SYMBOLS,'baseline artifact differs');require(images['first']==images['repeat'],'complete artifact repeat differs')
 macro=raw(p/'bindings/host-macro.dylib.gz');require(macro==raw(root/'research/mayhem-historical-macro-current-20261027/host/enabled/macro.dylib.gz'),'historical macro differs')
 rows=read(p/'original-windows.json');ref=read(root/'research/mayhem-quotes-current-recovery-20261027/inventory.json');require(rows==[{k:r[k]for k in ['id','start','bytes']}for r in ref['rows']]and len(rows)==441,'original window partition differs')
 reader=module('current_macro_reader',p/'reader.py')
 with tempfile.TemporaryDirectory(prefix='mayhem-macro-verify-')as td:
  td=Path(td);ep=[]
  for n,data in [('original',(root/'evidence/original/mayhem/deployed.so').read_bytes()),('before',images['baseline'][1]),('after',images['first'][1])]:
   f=td/(n+'.so');f.write_bytes(data);ep.append(reader.Elf(f))
  original,before,after=ep;verify_image_pair(reader,before,images['baseline'][0],td/'stripped-baseline.so');verify_image_pair(reader,after,images['first'][0],td/'stripped-first.so');body,windows=analyze(original,before,after,rows);mapped={role:maps(p,role,after,windows)for role in ['first','repeat']}
  object_helper=executable_sections(raw(p/'curve/first.rlib.gz'))['.text.unlikely.'+FINISH]
  linked_helpers=[w for a,w in windows.items()if any(s['name']==FINISH and s['value']==a for s in after.symbols)]
  require(len(linked_helpers)==1,'linked helper identity differs')
  def mask_calls(b):
   b=bytearray(b)
   for at in range(0,len(b),8):
    if b[at:at+2]==b'\x85\x10':b[at+4:at+8]=bytes(4)
   return bytes(b)
  w=linked_helpers[0];require(mask_calls(object_helper)==mask_calls(after.b[w['start']:w['end']]),'linked helper differs from compiler archive')
  ow={r['start']:original.window(r['start'],r['start']+r['bytes'])for r in rows};typed=typed_contracts(p,root,td/'before.so',td/'after.so',original,after,ow,windows)
  require(images['first'][0]!=original.b,'whole ELF unexpectedly equal');require(before.b[before.lo:before.hi]==images['baseline'][0][before.lo:before.hi]and after.b[after.lo:after.hi]==images['first'][0][after.lo:after.hi],'stripped text differs')
 result={'source_files':len(inputs),'bounded_typed_contracts':typed,'objects':obj,'body_and_closure':body,'maps':mapped,'builds':commands(p,inputs,images,obj),'candidate_sha256':sha(images['first'][0]),'symbols_sha256':sha(images['first'][1]),'whole_original_equal':False,'runtime':verify_runtime(p,root,images['first'][0],include_runtime)}
 if compare_saved:
  inventory=inventory_report(body);require(read(p/'inventory.json')==inventory and (p/'inventory.tsv').read_text()==inventory_tsv(inventory),'function inventory differs')
  saved=read(p/'analysis/verification.json')
  require(saved==result if include_runtime else {k:v for k,v in saved.items()if k!='runtime'}=={k:v for k,v in result.items()if k!='runtime'},'saved analysis differs')
 return result
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repository-root',type=Path,default=ROOT);ap.add_argument('--write',action='store_true');ap.add_argument('--require-runtime',action='store_true');ap.add_argument('--static-only',action='store_true');args=ap.parse_args();require(not(args.require_runtime and args.static_only),'cannot require and skip runtime');result=verify(root=args.repository_root.resolve(),compare_saved=not args.write,include_runtime=not args.static_only)
 if args.require_runtime:require(result['runtime']['qualified'],'runtime is pending')
 if args.write:
  (P/'analysis/verification.json').write_text(json.dumps(result,indent=2)+'\n');inventory=inventory_report(result['body_and_closure']);(P/'inventory.json').write_text(json.dumps(inventory,indent=2)+'\n');(P/'inventory.tsv').write_text(inventory_tsv(inventory))
 b=result['body_and_closure'];print(json.dumps({'normalized':b['normalized'],'raw':b['raw'],'direct_closed_windows':b['direct_closed_windows'],'new_closed':b['new_closed'],'repeat_equal':True,'runtime':result['runtime'],'whole_original_equal':False},indent=2))
if __name__=='__main__':main()
