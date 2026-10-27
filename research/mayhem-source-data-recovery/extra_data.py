from pathlib import Path
import importlib.util,json,struct,hashlib,sys
P=Path(__file__).resolve().parent;R=P.parents[1];symbols=Path(sys.argv[1]).resolve();candidate=Path(sys.argv[2]).resolve();baseline=Path(sys.argv[3]).resolve();output=Path(sys.argv[4]);label='source-data426';base='published411'
s=importlib.util.spec_from_file_location('elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);o=m.Elf(R/'evidence/original/mayhem/deployed.so');c=m.Elf(symbols);p=m.Elf(baseline);rows=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows'];ow={x['start']:o.window(x['start'],x['end'])for x in rows};key=lambda x:(x['end']-x['start'],x['normalized_sha256'],json.dumps(x['normalization_pattern'],sort_keys=True))
def windows(e):
 w={f['value']:e.window(f['value'],f['value']+f['size'])for f in e.symbols if f['info']&15==2 and f['size']>=8};g={}
 for x in w.values():g.setdefault(key(x),[]).append(x)
 return w,g
cw,cg=windows(c);pw,pg=windows(p);before={r['id']for r in rows if key(ow[r['start']])in pg};after={r['id']for r in rows if key(ow[r['start']])in cg};rawbefore={r['id']for r in rows if any(x['raw_sha256']==r['raw_sha256']for x in pw.values())};rawafter={r['id']for r in rows if any(x['raw_sha256']==r['raw_sha256']for x in cw.values())}
def source(e,at):
 assert e.rel[at]['type']==8
 lo,q=struct.unpack_from('<II',e.b,at);n,l,col=struct.unpack_from('<QII',e.b,at+8);assert lo==0 and 0<n<300 and 0<l<100000;name=e.b[q:q+n].decode();assert name.endswith('.rs\0');return dict(path=name,line=l,column=col)
def edges(w,allw,x):return {(a['offset'],a['target'])for a,b in zip(w['direct'],x['direct'])if a['target']in ow and b['target']in allw and key(ow[a['target']])==key(allw[b['target']])}
edge_losses=[]
for r in rows:
 w=ow[r['start']];k=key(w)
 if k not in pg:continue
 a=set().union(*(edges(w,pw,x)for x in pg[k]));b=set().union(*(edges(w,cw,x)for x in cg.get(k,[])));lost=sorted(a-b)
 if lost:edge_losses.append(dict(id=r['id'],lost=lost))
details=[]
for r in rows:
 if r['id']not in ['O0152','O0154','O0155','O0167']:continue
 w=ow[r['start']];k=key(w)
 for x in cg.get(k,[]):
  es=[dict(offset=a['offset'],original=a['target'],candidate=b['target'],equal=a['target']in ow and b['target']in cw and key(ow[a['target']])==key(cw[b['target']]))for a,b in zip(w['direct'],x['direct'])];ds=[]
  for a,b in zip(w['data_references'],x['data_references']):
   if r['id']=='O0167':
    n=len(b'Instruction: InitializeGlobalParams');aa=o.b[a['target']:a['target']+n];bb=c.b[b['target']:b['target']+n];ds.append(dict(offset=a['offset'],kind='counted_instruction_log',bytes=n,equal=aa==bb))
   else:
    aa,bb=source(o,a['target']),source(c,b['target']);ds.append(dict(offset=a['offset'],kind='Rust_Source',descriptor_bytes=24,original=aa,candidate=bb,equal=aa==bb))
  details.append(dict(id=r['id'],bytes=r['bytes'],start=x['start'],end=x['end'],direct=es,data=ds))
out=dict(label=label,baseline=base,baseline_count=len(before),candidate_count=len(after),raw_before=len(rawbefore),raw_after=len(rawafter),gains=sorted(after-before),losses=sorted(before-after),raw_losses=sorted(rawbefore-rawafter),positive_edge_losses=edge_losses,details=details,candidate_sha256=hashlib.sha256(candidate.read_bytes()).hexdigest());output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k!='details'},indent=2));print('new direct edges',sum(len(x['direct'])for x in details),'unmatched',sum(not e['equal']for x in details for e in x['direct']),'data_equal',sum(e['equal']for x in details for e in x['data']),'data_different',sum(not e['equal']for x in details for e in x['data']));assert not out['losses']and not out['raw_losses']and not edge_losses
