#!/usr/bin/env python3
"""Offline replay of bounded V2 source/build/operand evidence; never executes ELF."""
from pathlib import Path
from collections import Counter
import argparse,difflib,gzip,hashlib,importlib.util,json,tempfile
P=Path(__file__).resolve().parent
CASES_SHA='7d3d4314777b2ea30fee1dccd8a5c1bc39954e843677dda9ce2b95bf5a4e1d24'
ORIGINAL='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
EXPECTED={'01-current439':(18104,277,-1760,1,703),'02-r-on439':(18088,283,-1800,1,954),'03-sell-phased':(18136,287,-1776,39,1503),'04-shared-scalars':(18136,287,-1776,39,1503),'05-tuple-quote-last':(18088,283,-1776,39,1519),'06-named-price':(18088,283,-1800,1,954),'07-native-first':(18720,299,-1776,39,1338),'08-tuple-repeat':(18088,283,-1776,39,1519)}
def require(ok,message):
 if not ok:raise ValueError(message)
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b) if p.suffix=='.gz' else b
def read(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def helpers(p):return {n:module('v2_packet_'+n,p/'reference'/(n+'.py')) for n in ['reader','closure','parent_verify','seed_verify','event_order','cfg','analysis']}
def manifest(p):
 paths=list(p.rglob('*'));require(not any(x.is_symlink() for x in paths),'symlink');require(all(x.is_file() or x.is_dir() for x in paths),'special file')
 actual={x.relative_to(p).as_posix():sha(x.read_bytes()) for x in paths if x.is_file() and x!=p/'manifest.json'};require(actual==read(p/'manifest.json'),'manifest differs')
def bindings(p):
 r=read(p/'provenance/bindings.json');require(r['revision']=='e91c97097f334683d3f905ff0b0eb91612b4f51e','revision differs')
 for row in r['files']:
  b=(p/row['local']).read_bytes();require(len(b)==row['bytes'] and sha(b)==row['sha256'],'bound content differs');require(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==row['git_blob'],'Git blob differs')
 return len(r['files'])
def diagnostic(h,original,ow,rows,e):
 c,analysis,cfg,events=h['closure'],h['analysis'],h['cfg'],h['event_order'];cw,_=c.tables(e);w=analysis.named(e,cw,'sell_v2_handler17h');o=ow[159160]
 a,b=original.norm(o['start'],o['end'])[0],e.norm(w['start'],w['end'])[0];require(len(a)==18096,'wrong original SellV2 window')
 seq=difflib.SequenceMatcher(a=[a[i:i+8] for i in range(0,len(a),8)],b=[b[i:i+8] for i in range(0,len(b),8)],autojunk=False)
 graph=analysis.cfg_report(cfg,original,e,o,w);event=ow[374528];found=[x for x in cw.values() if c.key(x)==c.key(event)];require(len(found)==1,'ambiguous event callee')
 oe,ce=events.extract(original,o,event),events.extract(e,w,found[0]);shape=lambda x:[(s['offset'],s['width']) for s in x['writes']]
 oc=[c.key(ow[x['target']]) for x in o['direct']];cc=[c.key(cw[x['target']]) for x in w['direct']]
 return dict(original_bytes=len(a),candidate_bytes=len(b),full_normalized_equal=c.key(o)==c.key(w),aligned_slots=sum(x.size for x in seq.get_matching_blocks()),original_blocks=len(graph['original_blocks']),candidate_blocks=len(graph['candidate_blocks']),mapped_blocks=len(graph['block_mapping']),topology_conflicts=graph['topology_conflicts'],original_event=oe,candidate_event=ce,event_write_order_matches=sum(x==y for x,y in zip(shape(oe),shape(ce))),ordered_callee_shapes_equal=oc==cc,callee_multisets_equal=Counter(oc)==Counter(cc),call_offsets_equal=[x['offset'] for x in o['direct']]==[x['offset'] for x in w['direct']],same_call_offsets=sum(x['offset']==y['offset'] for x,y in zip(o['direct'],w['direct'])),Source_profiles_equal=c.profile(original,o)==c.profile(e,w))
def compile_receipt(p,label,h,pins):
 B=p/'builds'/label;launch,result=read(B/'launch.json'),read(B/'result.json');require(result['status']=='SUCCEEDED' and result['returncode']==0 and result['source_unchanged'] and result['historical_macro_dependencies_unchanged'] and result['target_executions']==0,'build result differs')
 require(launch['source_inputs']==pins and launch['target_directory_initially_absent'] and '--locked' in launch['command'] and '--offline' in launch['command'],'source/offline scope differs')
 for n,digest in launch['pinned_controller_inputs'].items():require(sha((p/'controller'/n).read_bytes())==digest,'compiler recipe differs')
 leaf=lambda n:n.replace('\\','/').split('/')[-1]
 require({leaf(n):v for n,v in launch['checked_executables'].items()}=={leaf(n):v for n,v in read(p/'controller/host-tools.json').items()},'compiler executable differs')
 records=[json.loads(x) for x in h['parent_verify'].unpack(B/'wrapper-records.tar.gz').values()];target=h['seed_verify'].target_records(records);mapping=[x.split('\t') for x in (p/'controller/metadata-map.tsv').read_text().splitlines()]
 for r in target:
  name=r['after'][r['after'].index('--crate-name')+1];before=[x[9:] for x in r['before'] if x.startswith('metadata=')];after=[x[9:] for x in r['after'] if x.startswith('metadata=')];require(len(before)==len(after)==1 and [before[0],after[0],name] in mapping,'metadata map differs');require(any(x.startswith('historical_anchor_program=') for x in r['after'])==(name=='curve_accounts'),'historical macro delivery differs')
 inv=read(B/'link/invocation.json.gz');before,after=inv['incoming'],inv['forwarded'];delta=[(x,y) for x,y in zip(before,after) if x!=y]
 require(len(after)==len(before)+1 and after[-1].startswith('-Map=') and len(delta)==1 and delta[0][0].endswith('.ld') and delta[0][1].endswith('ordered-native.ld'),'linker transform differs')
 require(raw(B/'link/exit-code.txt.gz').strip()==b'0' and result['strip']['returncode']==0 and '--strip-all' in result['strip']['command'],'link/strip failed')
 for r in read(B/'link/input-identities.json'):
  if r['retained']:
   data=raw(B/'link'/(r['retained']+'.gz'));require(len(data)==r['bytes'] and sha(data)==r['sha256'],'link input differs')
 return dict(compilation_commands=163,target_commands=85,historical_host_macro_reused=True)
def analyze(p=P):
 p=p.resolve();bindings(p);require(sha((p/'cases.json').read_bytes())==CASES_SHA,'case pins differ');cases=read(p/'cases.json');require(set(cases)==set(EXPECTED),'case set differs');h=helpers(p);v,c=h['parent_verify'],h['closure']
 parent=v.unpack(p/'reference/parent438-source.tar.gz');parent.update({'src/instructions/buy_pump_swap.rs':raw(p/'reference/current439-buy.rs'),'src/instructions/pump_amm_interface.rs':raw(p/'reference/current439-amm.rs')});require(len(parent)==67 and {n:sha(b) for n,b in parent.items()}==read(p/'reference/current439-source-inputs.json'),'current439 source differs')
 rsource=v.unpack(p/'reference/r-source.tar.gz');require(len(rsource)==67 and {n:sha(b) for n,b in rsource.items()}==read(p/'reference/r-source-inputs.json'),'R source differs')
 originals=raw(p/'reference/original-allocation.so.gz');require(len(originals)==777408 and sha(originals)==ORIGINAL,'original differs');reports={};source_sets={};images={}
 with tempfile.TemporaryDirectory() as temp:
  def elf(n,b):
   f=Path(temp)/n;f.write_bytes(b);return h['reader'].Elf(f)
  original=elf('original.so',originals);rows=read(p/'reference/inventory.json');require(len(rows)==441,'original window inventory differs');ow={r['start']:original.window(r['start'],r['start']+r['bytes']) for r in rows}
  for label,case in cases.items():
   B=p/'builds'/label;require(sha((B/'source.tar.gz').read_bytes())==case['source_archive_sha256'],'source archive pin differs');sources=v.unpack(B/'source.tar.gz');pins={n:sha(b) for n,b in sources.items()};require(len(sources)==67,'source count differs');source_sets[label]=sources;commands=compile_receipt(p,label,h,pins)
   artifacts={n:raw(B/(n+'.gz')) for n in case['outputs']};require({n:v.identity(b) for n,b in artifacts.items()}==case['outputs']==read(B/'result.json')['outputs'],'compiler output pin differs');images[label]=artifacts
   e=elf(label+'.so',artifacts['symbols.so']);stripped=elf(label+'-strip.so',artifacts['candidate-v154-strip.so']);require(v.sections(e)==v.sections(stripped),'strip changes allocated bytes');require(all(b!=originals for b in artifacts.values()),'unexpected whole original equality')
   measured=v.measure(c,original,ow,rows,e);require((measured['normalized'],measured['injective'],measured['raw_local'],measured['direct_closed'],len(measured['positive_calls']),len(measured['positive_Sources']))==(439,439,141,435,4670,505),'qualified439 frontier differs')
   diag=diagnostic(h,original,ow,rows,e);require((diag['candidate_bytes'],diag['candidate_blocks'],diag['candidate_event']['event_base'],diag['event_write_order_matches'],diag['aligned_slots'])==EXPECTED[label],'SellV2 diagnostics differ');require(not diag['full_normalized_equal'] and not diag['ordered_callee_shapes_equal'] and not diag['call_offsets_equal'],'unexpected body/call equality')
   reports[label]=dict(outputs=case['outputs'],compilation=commands,measurement=measured,SellV2=diag,whole_original_equal=False,allocated_sections=v.sections(e))
  require(source_sets['01-current439']==parent,'current source differs');expected=dict(parent);expected.update({n:rsource[n] for n in ['src/instructions/buy_v2.rs','src/instructions/pump_interface_v2.rs']});require(source_sets['02-r-on439']==expected,'R composition differs')
  for label in cases:
   if label in ['01-current439','02-r-on439']:continue
   delta={n for n,b in source_sets[label].items() if b!=expected[n]};require(delta=={'src/instructions/pump_interface_v2.rs'},'control source scope differs')
  require(source_sets['05-tuple-quote-last']==source_sets['08-tuple-repeat'] and images['05-tuple-quote-last']==images['08-tuple-repeat'],'repeat differs')
  require(images['03-sell-phased']==images['04-shared-scalars'],'shared-scalar equivalence differs');require(images['02-r-on439']['candidate-v154-strip.so']==images['06-named-price']['candidate-v154-strip.so'],'named-helper stripped equality differs')
  require(images['01-current439']=={'symbols.so':raw(p/'reference/current439-symbols.so.gz'),'candidate-v154-strip.so':raw(p/'reference/current439-candidate.so.gz')},'fresh archived439 equality differs')
  baseline=reports['01-current439']['measurement']
  for report in reports.values():
   m=report['measurement']
   for key in ['raw_ids','positive_calls','positive_Sources']:require({json.dumps(x,sort_keys=True) for x in baseline[key]}<={json.dumps(x,sort_keys=True) for x in m[key]},'prior obligation lost')
   for key in ['matches','closed']:require({x['id'] for x in baseline['inventory'] if x[key]}<={x['id'] for x in m['inventory'] if x[key]},'prior body/closure lost')
  positive=source_sets['05-tuple-quote-last'];require({r['path']:r['sha256'] for r in read(p/'controller/source-inputs.json')['source_files']}=={n:sha(b) for n,b in positive.items()},'delivered source pins differ')
  require(all(raw(p/'controller/sources'/(n+'.gz'))==b for n,b in positive.items()),'delivered compiler source differs')
 return dict(builds=reports,fresh_crate_compilations=1304,fresh_target_compilations=680,source_files_per_build=67,target_executions=0,scope='Partial static source/control evidence. No new complete function, original ELF identity, runtime transfer, generic data proof, or historical source/compiler attribution.')
def verify(p=P):
 manifest(p);report=analyze(p);require(json.loads(json.dumps(report))==read(p/'report.json.gz'),'saved report differs');return report
if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--packet',type=Path,default=P);parser.add_argument('--write-report',action='store_true');args=parser.parse_args()
 if args.write_report:(args.packet/'report.json.gz').write_bytes(gzip.compress((json.dumps(analyze(args.packet),indent=2)+'\n').encode(),mtime=0));print('Wrote recomputed report')
 else:verify(args.packet);print('Verified 8 fresh builds; 439/141 frontier preserved; SellV2 remains unmatched; primary event frame/stores agree; no target execution.')
