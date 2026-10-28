"""Saved-evidence verification for two exact Source corrections; no target execution."""
from pathlib import Path
from collections import Counter,defaultdict
import argparse,csv,difflib,gzip,hashlib,importlib.util,io,json,struct,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1];BASE='research/mayhem-current-macro-call-closure-20261027'
def require(ok,message):
 if not ok:raise ValueError(message)
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b)if p.suffix=='.gz'else b
def read(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def archive(p):
 out={}
 with tarfile.open(fileobj=io.BytesIO(raw(p)),mode='r:')as t:
  for x in t:
   n=Path(x.name);require(x.isfile()and not n.is_absolute()and '..'not in n.parts and x.name not in out,'source member');out[x.name]=t.extractfile(x).read()
 return out
def package(p):
 paths=list(p.rglob('*'));require(not any(x.is_symlink()for x in paths),'packet symlink');require(all(x.is_file()or x.is_dir()for x in paths),'packet special file');require({x.relative_to(p).as_posix():sha(x.read_bytes())for x in paths if x.is_file()and x!=p/'manifest.json'}==read(p/'manifest.json'),'packet manifest')
def sources(p,r):
 before=archive(r/BASE/'source/composed.tar.gz');after=archive(p/'source.tar.gz');require(len(before)==len(after)==67,'source count');require({n:sha(b)for n,b in after.items()}==read(p/'source-inputs.json'),'source inventory');changed=sorted(n for n in before if before[n]!=after[n]);require(changed==['Cargo.toml','src/instructions/extend_account.rs','src/lib.rs'],'source scope')
 require({n:sha(b)for n,b in before.items()}==read(p/'parent-source-inputs.json'),'parent source inventory')
 expected=dict(before);expected['Cargo.toml']+=b'\n[profile.release.package.anchor-lang]\nrustflags = ["--remap-path-prefix=vendor/anchor-lang/src/bpf_writer.rs=src/bpf_writer.rs"]\n'
 ls=before['src/lib.rs'].decode().splitlines(True);event=ls[386:394];require(event[0].startswith('#[event(')and 'ExtendAccountEvent'in event[1],'prior event definition');ls[386:394]=['pub use instructions::extend_account::ExtendAccountEvent;\n']+['\n']*7;expected['src/lib.rs']=''.join(ls).encode()
 ls=before['src/instructions/extend_account.rs'].decode().splitlines(True);require(all(not x.strip()for x in ls[26:34]),'event destination occupied');ls[26:34]=event;ls[1]=ls[1].replace('ExtendAccountEvent, ','');expected['src/instructions/extend_account.rs']=''.join(ls).encode();require(expected==after,'source transformation differs')
 patch=''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in changed);require((p/'source.patch').read_text()==patch,'source patch')
 require(read(p/'source-delta.json')=={'changed':changed,'added':[],'removed':[]},'source delta')
 for n in changed:require((p/'overrides'/n).read_bytes()==after[n],'override bytes')
 return{n:sha(b)for n,b in after.items()}
def analyze(e,o,b,c,rows,p):
 key=e.key;ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};bw,bn=e.tables(b);cw,cn=e.tables(c);bg,bpairs,ba,_=e.relation(ow,bw);cg,cpairs,ca,_=e.relation(ow,cw)
 require(bw.keys()==cw.keys(),'physical function starts changed')
 for start,w in bw.items():
  require(key(w)==key(cw[start]),'physical function shape changed')
  require([(x['offset'],x['target'])for x in w['direct']]==[(x['offset'],x['target'])for x in cw[start]['direct']],'physical direct target changed')
 edges=[0,0];source=[0,0];inventory=[];corrections=[]
 intended={'O0112':{'offset':496,'old':('programs/mayhem-program/src/lib.rs\0',387,1),'new':('programs/mayhem-program/src/instructions/extend_account.rs\0',27,1)},'O0270':{'offset':256,'old':('vendor/anchor-lang/src/bpf_writer.rs\0',33,9),'new':('src/bpf_writer.rs\0',33,9)}}
 for row in rows:
  a=row['start'];w=ow[a];old,new=bg[key(w)],cg[key(w)];require(bool(old)==bool(new),'body match loss/gain');rb=any(bw[x]['raw_sha256']==w['raw_sha256']for x in old);rc=any(cw[x]['raw_sha256']==w['raw_sha256']for x in new);require(rb==rc,'raw match loss/gain')
  bp=[e.profile(b,bw[x])for x in old];cp=[e.profile(c,cw[x])for x in new]
  if row['id']in intended:
   want=intended[row['id']];require(bp==[{str(want['offset']):want['old']}]and cp==[{str(want['offset']):want['new']}],'target Source correction differs');require(cp==[e.profile(o,w)],'corrected Source is not original');corrections.append({'id':row['id'],'offset':want['offset'],'old':list(want['old']),'new':list(want['new'])})
  else:require(all(x in cp for x in bp),'unrequested Source profile change')
  for call in w['direct']:
   if call['target']not in ow:continue
   expected=key(ow[call['target']])
   def support(hits,t):return any(any(x['offset']==call['offset']and x['target']in t and key(t[x['target']])==expected for x in t[z]['direct'])for z in hits)
   x,y=support(old,bw),support(new,cw);require(not x or y,'positive edge loss');edges[0]+=x;edges[1]+=y
  for d in w['data_references']:
   expected=e.source(o,d['target'])
   if expected is None:continue
   x,y=any(v.get(str(d['offset']))==expected for v in bp),any(v.get(str(d['offset']))==expected for v in cp);require(not x or y,'positive Source loss');source[0]+=x;source[1]+=y
  hits=[{'start':x,'bytes':cw[x]['end']-x,'names':sorted(cn[x]),'raw_local_equal':cw[x]['raw_sha256']==w['raw_sha256'],'direct_closed':(a,x)in ca}for x in sorted(new)];inventory.append({'id':row['id'],'start':a,'bytes':row['bytes'],'local_equality':'raw-local'if rc else'normalized-only'if hits else'unmatched','direct_closed':any((a,x)in ca for x in new),'counterparts':hits})
 require(edges==[4315,4315]and source==[456,458],'edge/Source counts');require({a for a,z in ba}=={a for a,z in ca}and len({a for a,z in ca})==422,'direct closure changes');require(len({a for a,z in cpairs})==432 and sum(x['local_equality']=='raw-local'for x in inventory)==141,'coverage counts')
 old_names,new_names=defaultdict(list),defaultdict(list)
 for a,w in bw.items():
  for n in bn[a]:old_names[n].append(w)
 for a,w in cw.items():
  for n in cn[a]:new_names[n].append(w)
 renames=read(p/'layout/symbol-renames.json');require(set(old_names)-set(new_names)==set(renames)and set(new_names)-set(old_names)==set(renames.values()),'symbol rename scope')
 for name,ws in old_names.items():
  after=new_names[renames.get(name,name)];require(Counter(key(w)for w in ws)==Counter(key(w)for w in after),'existing function shape changed')
  expected=[]
  for w in ws:
   profile=e.profile(b,w)
   for correction in intended.values():
    k=str(correction['offset'])
    if profile.get(k)==correction['old']:profile[k]=correction['new']
   expected.append(json.dumps(profile,sort_keys=True))
  require(Counter(expected)==Counter(json.dumps(e.profile(c,w),sort_keys=True)for w in after),'named Source profile changed')
 return{'normalized':432,'raw':141,'direct_closed':422,'positive_edges':edges,'positive_Sources':source,'corrections':corrections,'function_windows':[len(bw),len(cw)],'preserved_physical_direct_calls':sum(len(w['direct'])for w in bw.values()),'named_symbols':[len(old_names),len(new_names)],'renamed_symbols':renames,'inventory':inventory}
def tsv(rows):
 out=io.StringIO();w=csv.writer(out,delimiter='\t',lineterminator='\n');w.writerow(['original_id','start','bytes','local_equality','direct_closed','candidate_starts','candidate_names'])
 for r in rows:w.writerow([r['id'],hex(r['start']),r['bytes'],r['local_equality'],r['direct_closed'],';'.join(hex(x['start'])for x in r['counterparts']),';'.join(','.join(x['names'])for x in r['counterparts'])])
 return out.getvalue()
def builds(p,inputs,images):
 outputs=[]
 for label in ['first','repeat']:
  records=read(p/'builds'/label/'builds.json');require([x['crate']for x in records]==['anchor_lang','anchor_spl','curve_accounts','mayhem_recovered'],'build crate order')
  for rec in records:
   require(rec['returncode']==0 and rec['source_unchanged']and rec['source_inputs']==inputs,'build source binding');cmd=rec['command'];require(Path(cmd[0]).name=='rustc'and cmd[cmd.index('--target')+1]=='sbpf-solana-solana','compiler command');require(not any('deployed.so'in x or 'evidence/original'in x for x in cmd),'original used as compiler input');flag='--remap-path-prefix=vendor/anchor-lang/src/bpf_writer.rs=src/bpf_writer.rs';require((flag in cmd)==(rec['crate']=='anchor_lang'),'exact-file remap scope')
  result=read(p/'builds'/label/'result.json');require(result['candidate_sha256']==sha(images[label][0])and result['symbols_sha256']==sha(images[label][1])and result['source_unchanged'],'build output binding')
  archives={n:sha(raw(p/'builds'/label/(n+'.gz')))for n in result['archive_hashes']};require(archives==result['archive_hashes'],'archive binding');outputs.append(archives)
  inv=read(p/'builds'/label/'invocation.json');require(not any('deployed.so'in x for x in inv['incoming']),'original used as linker input');require(inv['script_sha256']==sha((p/'layout/ordered.ld').read_bytes()),'layout binding')
 require(images['first']==images['repeat']and outputs[0]==outputs[1],'repeat differs');require(sha(raw(p/'controls/baseline-anchor.rlib.gz'))=='657018baa36fc2cf25097c0ae03ac3fc41dd1d75d885927d37bb5987925203e5','unchanged anchor baseline control')
 controls=read(p/'controls/bpf-builds.json');before,after=controls[:2];require(before['baseline_archive_identical']and before['returncode']==after['returncode']==0,'baseline compiler control failed')
 def without_output(cmd):
  cmd=list(cmd);i=cmd.index('--out-dir');del cmd[i:i+2];return cmd
 a=without_output(before['command']);b=without_output(after['command']);b.remove('--remap-path-prefix=vendor/anchor-lang/src/bpf_writer.rs=src/bpf_writer.rs');require(a==b,'compiler control changed more than exact-file remap')
def runtime(p,r,images,enabled):
 status=read(p/'runtime/status.json');require(status['candidate_sha256']==sha(images['first'][0]),'runtime artifact binding')
 if not enabled:return{'state':status['state'],'qualified':False,'skipped':True}
 require(status['state']=='complete','runtime pending')
 return module('origin_runtime',p/'runtime_verify.py').check(p,r,images['first'][0])
def provenance(p,r):
 report=read(p/'provenance.json');tools=report['tools'];parent=read(r/BASE/'bindings/input-observations.json')
 compilers={x['sha256']for x in parent['explicit_compiler_and_dependency_inputs']if x['binding']=='compiler'}
 require(compilers=={tools['compiler']['sha256']},'compiler provenance')
 require(tools['strip']['sha256']==read(r/BASE/'builds/first/result.json')['strip_sha256'],'strip provenance')
 require(tools['linker']['sha256']==read(r/BASE/'builds/first/invocation.json')['real_sha256'],'linker provenance')
 require(tools['historical_macro']['sha256']==sha(raw(r/BASE/'bindings/host-macro.dylib.gz')),'macro provenance')
 require(report['target_library_inventory']==read(r/BASE/'bindings/target-libraries.json'),'target libraries provenance')
 return{'tool_hashes_match_parent':True,'target_libraries':26,'observation':'after-build; reused pinned dependencies'}
def verify(p=P,r=R,include_runtime=True,compare_saved=True):
 package(p)
 for n,h in read(p/'external-inputs.json').items():require(sha((r/n).read_bytes())==h,'external input: '+n)
 e=module('origin_base',r/BASE/'verify.py');m=module('origin_reader',p/'reader.py');require((p/'reader.py').read_bytes()==(r/BASE/'reader.py').read_bytes(),'reader changed');inputs=sources(p,r)
 anchor_before=e.executable_sections(raw(p/'controls/baseline-anchor.rlib.gz'));anchor_after=e.executable_sections(raw(p/'builds/first/libanchor_lang-946a3f017ffdc240.rlib.gz'));require(anchor_before==anchor_after and len(anchor_after)==139,'anchor executable section changed')
 images={label:[raw(p/'builds'/label/(n+'.gz'))for n in ['candidate.so','symbols.so']]for label in ['first','repeat']};builds(p,inputs,images)
 with tempfile.TemporaryDirectory(prefix='source-origin-proof-')as td:
  td=Path(td);files={}
  for n,b in [('original',(r/'evidence/original/mayhem/deployed.so').read_bytes()),('before',raw(r/BASE/'builds/first/symbols.so.gz')),('after',images['first'][1])]:f=td/(n+'.so');f.write_bytes(b);files[n]=f
  o,b,c=[m.Elf(files[n])for n in ['original','before','after']];mapped={label:e.maps(p,label,c,e.tables(c)[0])for label in ['first','repeat']};e.verify_image_pair(m,c,images['first'][0],td/'stripped.so');rows=read(r/BASE/'original-windows.json');result=analyze(e,o,b,c,rows,p)
  for n in ['reader.py','window_map.py','elf_helpers.py']:require((p/'nested'/n).read_bytes()==(r/'research/mayhem-quote-integer-debug-data'/n).read_bytes(),'nested reader drift')
  for n in ['buy_reader.py','sell_reader.py','initializer.py']:require((p/'typed'/n).read_bytes()==(r/BASE/'typed'/n).read_bytes(),'typed reader drift')
  quotes={}
  for name in ['buy','sell']:
   x=module('origin_quote_'+name,p/'typed'/(name+'_reader.py'));x.R=r;quotes[name]=x.inspect(files['after']);require(quotes[name]['whole_body_normalized_equal']and quotes[name]['typed_data_multiset_equal']and quotes[name]['original_data']==quotes[name]['candidate_data'],'quote typed data')
  require(quotes==read(p/'analysis/typed-quotes.json'),'saved quotes');init=module('origin_init',p/'typed/initializer.py').inspect(r,p,files['before'],files['after']);require(init==read(p/'analysis/typed-initializer.json'),'initializer typed data')
  nested_root=td/'nested-root';nested_dir=nested_root/'research/mayhem-quote-integer-debug-data';nested_dir.mkdir(parents=True);(nested_root/'scripts').mkdir()
  for n in ['reader.py','window_map.py','elf_helpers.py']:(nested_dir/n).write_bytes((p/'nested'/n).read_bytes())
  require((p/'nested/analyze.py').read_bytes()==(r/'scripts/analyze.py').read_bytes(),'nested ELF layout reader drift');(nested_root/'scripts/analyze.py').write_bytes((p/'nested/analyze.py').read_bytes())
  nested=module('origin_nested',nested_dir/'reader.py').inspect(o.b,c.b);require(nested==read(p/'analysis/nested-debug.json'),'nested integer Debug data')
 result.update(anchor_executable_sections_preserved=len(anchor_after),provenance=provenance(p,r),maps=mapped,candidate_sha256=sha(images['first'][0]),symbols_sha256=sha(images['first'][1]),runtime=runtime(p,r,images,include_runtime),whole_original_equal=False)
 if compare_saved:
  saved=read(p/'analysis.json');require(saved==result if include_runtime else{k:v for k,v in saved.items()if k!='runtime'}=={k:v for k,v in result.items()if k!='runtime'},'saved analysis');require(read(p/'inventory.json')==result['inventory']and(p/'inventory.tsv').read_text()==tsv(result['inventory']),'inventory')
 return result
if __name__=='__main__':
 a=argparse.ArgumentParser();mode=a.add_mutually_exclusive_group();mode.add_argument('--static-only',action='store_true');mode.add_argument('--require-runtime',action='store_true',help='Require all saved runtime scopes (the default).');a.add_argument('--write',action='store_true');a.add_argument('--repository-root',type=Path,default=R);args=a.parse_args();x=verify(r=args.repository_root,include_runtime=not args.static_only,compare_saved=not args.write)
 if args.write:(P/'analysis.json').write_text(json.dumps(x,indent=2)+'\n');(P/'inventory.json').write_text(json.dumps(x['inventory'],indent=2)+'\n');(P/'inventory.tsv').write_text(tsv(x['inventory']))
 print(json.dumps({k:x[k]for k in ['normalized','raw','direct_closed','positive_Sources','candidate_sha256','runtime']},indent=2))
