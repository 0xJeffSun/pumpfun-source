"""Recompute source, compiler-output and function observations; execute no target code."""
from pathlib import Path,PurePosixPath
from collections import Counter
import difflib,gzip,hashlib,importlib.util,json,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
LABELS=['baseline','root-sell-inline-current','root-buy-direct-current','root-sell-inline-price','root-buy-enum-price','root-sell-late-native','root-buy-late-native','root-sell-price-order','root-buy-price-order']
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b)if p.suffix=='.gz'else b
def load(p):return json.loads(raw(p))
def mod(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def unpack(path):
 files={}
 with tarfile.open(path)as t:
  for x in t:
   n=PurePosixPath(x.name);assert x.isfile()and not n.is_absolute()and '..'not in n.parts and str(n)==x.name and x.name not in files;files[x.name]=t.extractfile(x).read()
 return files
def analyze(packet=P):
 base=unpack(packet/'base-source.tar.gz');assert len(base)==67
 hashes=lambda d:{n:sha(b)for n,b in d.items()}
 assert hashes(base)==load(packet/'base-source-inputs.json')==load(ROOT/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json')
 assert load(packet/'controls.json')==LABELS
 reader=mod('shape_reader',packet/'helpers/reader.py');progress=mod('shape_progress',packet/'helpers/progress.py')
 original=raw(ROOT/'evidence/original/mayhem/deployed.so');baseline=raw(packet/'controls/baseline/symbols.so.gz');reports={};toolset=None
 with tempfile.TemporaryDirectory(prefix='mayhem-shape-read-')as td:
  td=Path(td);op=td/'original.so';op.write_bytes(original);o=reader.Elf(op)
  rows=load(packet/'helpers/inputs/parent-audit.json.gz')['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows}
  key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
  for label in LABELS:
   d=packet/'controls'/label;source=dict(base);over=d/'overrides';changed={p.relative_to(over).as_posix():p.read_bytes()for p in over.rglob('*')if p.is_file()}if over.exists()else{}
   assert set(changed)<=set(base)and all(base[n]!=b for n,b in changed.items());source.update(changed);patch=[]
   for n in sorted(changed):patch.extend(difflib.unified_diff(base[n].decode().splitlines(True),source[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))
   assert ''.join(patch).encode()==raw(d/'source.patch')
   launch,result=load(d/'launch.json'),load(d/'result.json')
   assert launch['source_inputs']==hashes(source)and launch['controller_sha256']==sha(raw(packet/'controllers/build_mixed_fast_v2.py'))
   assert launch['full_clean']is False and result['returncode']==0 and result['root_rustc_invocations']==1
   assert all(result[k]for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
   assert launch['flags']==['--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
   assert launch['command'][launch['command'].index('--target')+1]=='sbpf-solana-solana'
   currenttools=(launch['checked_tools'],launch['target_inputs']);assert toolset is None or toolset==currenttools;toolset=currenttools
   cb,sb=raw(d/'candidate.so.gz'),raw(d/'symbols.so.gz');assert sha(cb)==result['candidate_sha256']and sha(sb)==result['symbols_sha256']and len(cb)==result['candidate_bytes']
   assert sha(raw(d/'stdout.gz'))==result['stdout_sha256']and sha(raw(d/'stderr.gz'))==result['stderr_sha256']
   cp=td/'candidate.so';sp=td/'symbols.so';cp.write_bytes(cb);sp.write_bytes(sb);c=reader.Elf(sp);stripped=reader.Elf(cp)
   for section in c.sections:
    if section['flags']&2 and section['type']!=8:
     z=stripped.sec[section['name']];assert section['address']==z['address']and section['size']==z['size']and c.b[section['offset']:section['offset']+section['size']]==stripped.b[z['offset']:z['offset']+z['size']]
   p=progress.compare(original,baseline,sb);assert p['matches']==432 and p['raw_matches']==89 and p['gains']==[]
   cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi};bodies=[]
   for name,start,end in [('buy_pump_swap',85600,95336),('sell_pump_swap',95848,113160),('legacy_buy_handler',113672,127520)]:
    syms=[s for s in c.symbols if s['info']&15==2 and name in s['name']and(name.endswith('handler')or'7handler'in s['name'])];assert len(syms)==1;f=syms[0]
    a,ap=o.norm(start,end);b,bp=c.norm(f['value'],f['value']+f['size']);aa=[a[i:i+8]for i in range(0,len(a),8)];bb=[b[i:i+8]for i in range(0,len(b),8)]
    ca=[key(ow[x['target']])for x in ow[start]['direct']];cc=[key(cw[x['target']])for x in cw[f['value']]['direct']]
    bodies.append(dict(name=name,original_bytes=end-start,bytes=f['size'],position_equal=sum(x==y for x,y in zip(aa,bb)),aligned_slots=sum(x.size for x in difflib.SequenceMatcher(a=aa,b=bb,autojunk=False).get_matching_blocks()),complete_normalized_equal=(a,ap)==(b,bp),original_immediate_calls=len(ca),candidate_immediate_calls=len(cc),callee_multiset_equal=Counter(ca)==Counter(cc),ordered_callees_equal=ca==cc))
   assert all(not b['complete_normalized_equal']for b in bodies)
   reports[label]=dict(candidate_sha256=sha(cb),symbols_sha256=sha(sb),changed_sources=sorted(changed),progress=p,bodies=bodies)
 d=packet/'qualified-control';result,launch=load(d/'result.json'),load(d/'launch.json');source=dict(base);source.update({p.relative_to(packet/'controls/root-sell-inline-price/overrides').as_posix():p.read_bytes()for p in(packet/'controls/root-sell-inline-price/overrides').rglob('*')if p.is_file()})
 assert launch['source_inputs']==hashes(source)and launch['parent_candidate_sha256']=='73dff97e65535ce7d2552ba6f29f94fe0e08ebd414a51871a81c6cba2d7d6168'
 assert result['returncode']==0 and result['source_unchanged']and result['bound_inputs_unchanged']
 for n in ['candidate','symbols']:assert sha(raw(d/(n+'.so.gz')))==result[n+'_sha256']
 assert sha(raw(d/'layout/ordered.ld'))in launch['bound_inputs'].values()
 q=progress.compare(original,raw(ROOT/'research/mayhem-quotes-current-recovery-20261027/builds/current/symbols.so.gz'),raw(d/'symbols.so.gz'));assert q==load(d/'progress.json')and q['matches']==432 and q['raw_matches']==100 and q['gains']==[]
 return dict(controls=reports,qualified_control=q,accepted_new_windows=0,target_executions=0,whole_elf_equal=False)
def verify(packet=P):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink()for p in paths)and all(p.is_dir()or p.is_file()for p in paths)
 assert {p.relative_to(packet).as_posix():sha(p.read_bytes())for p in paths if p.is_file()and p.name!='manifest.json'}==load(packet/'manifest.json')
 for n,h in load(packet/'external-inputs.json').items():assert sha(raw(ROOT/n))==h
 report=analyze(packet);assert report==load(packet/'report.json');return report
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--packet',type=Path,default=P);args=a.parse_args();r=verify(args.packet.resolve());print(json.dumps({'controls':len(r['controls']),'qualified_normalized':r['qualified_control']['matches'],'qualified_raw':r['qualified_control']['raw_matches'],'accepted_new_windows':0,'target_executions':0,'whole_elf_equal':False},indent=2))
