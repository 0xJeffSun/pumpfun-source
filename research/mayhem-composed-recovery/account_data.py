from pathlib import Path
import importlib.util,json,struct,hashlib,sys
P=Path(__file__).resolve().parent;R=P.parents[1];symbols=Path(sys.argv[1]).resolve();candidate=Path(sys.argv[2]).resolve();output=Path(sys.argv[3]).resolve()
s=importlib.util.spec_from_file_location('elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
o=m.Elf(R/'evidence/original/mayhem/deployed.so');c=m.Elf(symbols)
rows=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows'];ow={x['start']:o.window(x['start'],x['end'])for x in rows};cw={x['value']:c.window(x['value'],x['value']+x['size'])for x in c.symbols if x['info']&15==2 and x['size']>=8};key=lambda x:(x['end']-x['start'],x['normalized_sha256'],json.dumps(x['normalization_pattern'],sort_keys=True))
def ptr(e,p):
 assert e.rel[p]['type']==8
 lo,hi=struct.unpack_from('<II',e.b,p);assert lo==0;return hi

def source(e,p):
 if p not in e.rel:return None
 try:
  q=ptr(e,p);n,l,col=struct.unpack_from('<QII',e.b,p+8)
  if not(1<=n<300 and 1<=l<100000 and 1<=col<10000):return None
  name=e.b[q:q+n].decode()
  if not name.endswith('.rs\0'):return None
  return dict(path=name,line=l,column=col)
 except (AssertionError,KeyError,UnicodeError,struct.error):return None

def table(e,p,n,positions):
 out=[]
 for i in range(0,n,8):
  if i in positions:
   q=ptr(e,p+i);v=(ow if e is o else cw).get(q);out.append(dict(kind='code',shape=None if v is None else key(v),target=q))
  else:out.append(dict(kind='scalar',value=struct.unpack_from('<Q',e.b,p+i)[0]))
 return out

def table_equal(p,q,n,pos):
 a,b=table(o,p,n,pos),table(c,q,n,pos)
 return all(x['kind']==y['kind'] and (x['value']==y['value']if x['kind']=='scalar' else x['shape']is not None and x['shape']==y['shape'])for x,y in zip(a,b)),a,b

def string_slice(e,p):
 q=ptr(e,p);n=struct.unpack_from('<Q',e.b,p+8)[0];assert 0<n<256;return e.b[q:q+n]
ids=['O0003', 'O0004', 'O0025', 'O0027', 'O0030', 'O0070', 'O0087', 'O0116', 'O0118', 'O0126', 'O0128', 'O0130', 'O0132', 'O0135', 'O0137', 'O0146', 'O0147', 'O0148', 'O0166', 'O0184', 'O0185', 'O0202', 'O0212', 'O0213', 'O0220', 'O0221'];proofs=[]
for row in rows:
 if row['id']not in ids:continue
 a=ow[row['start']]
 for b in cw.values():
  if key(a)!=key(b):continue
  refs=[]
  for x,y in zip(a['data_references'],b['data_references']):
   off=x['offset'];p,q=x['target'],y['target'];proof=dict(offset=off,original=p,candidate=q,kind='unresolved',equal=None)
   so,sc=source(o,p),source(c,q)
   if so and sc:proof.update(kind='Rust_Source_record',descriptor_bytes=24,original_source=so,candidate_source=sc,equal=so==sc)
   elif row['id']in ['O0212','O0220']:
    if off in [128,264]:proof.update(kind='Anchor_ErrorCode_discriminant',bytes=4,equal=o.b[p:p+4]==c.b[q:q+4])
    elif off==176:
     ok,aa,bb=table_equal(p,q,48,{0,24,32,40});proof.update(kind='dyn_core_fmt_Write_vtable',bytes=48,equal=ok,original_fields=aa,candidate_fields=bb)
    elif off in [392,496,576]:
     text=b'src/lib.rs'if off==392 else ((b'BondingCurve'if row['id']=='O0212'else b'Pool')if off==496 else b'a Display implementation returned an error unexpectedly')
     proof.update(kind='counted_literal',bytes=len(text),expected=text.decode(),equal=o.b[p:p+len(text)]==c.b[q:q+len(text)]==text)
    elif off==600:
     ok,aa,bb=table_equal(p,q,32,{24});proof.update(kind='dyn_core_fmt_Debug_vtable',bytes=32,equal=ok,original_fields=aa,candidate_fields=bb)
   elif row['id']in ['O0213','O0221'] and off in ([112,632,1088,1424]if row['id']=='O0213'else[600,664,1944]):
    aa,bb=string_slice(o,p),string_slice(c,q);proof.update(kind='referenced_string_slice',descriptor_bytes=16,payload_bytes=len(aa),original_payload=aa.decode(),candidate_payload=bb.decode(),equal=aa==bb)
   elif row['id']=='O0213'and off==1136:
    aa,bb=ow.get(p),cw.get(q);proof.update(kind='format_function_pointer',equal=aa is not None and bb is not None and key(aa)==key(bb))
   if proof['kind']=='unresolved':
    # These are the two actual foreign IDs recovered through Owner; prove their complete Pubkey width.
    known=[o.b[z:z+32]for z in [0xae2ac,0xae2e2]]
    if o.b[p:p+32]in known:proof.update(kind='foreign_program_Pubkey',bytes=32,equal=o.b[p:p+32]==c.b[q:q+32])
   refs.append(proof)
  edges=[dict(offset=x['offset'],original=x['target'],candidate=y['target'],equal=x['target']in ow and y['target']in cw and key(ow[x['target']])==key(cw[y['target']]))for x,y in zip(a['direct'],b['direct'])]
  proofs.append(dict(id=row['id'],original=row['start'],candidate=b['start'],normalized_body_equal=True,direct_edges=edges,data=refs))
report=dict(scope='Independent exact-width Rust Source, typed vtable, Pubkey, counted literal, string-slice and code-pointer checks for the 26 accounts gains on integrated411. Unknown data extents remain unresolved; symbolic direct edges are not transitive closure or whole-ELF identity.',original_sha256=hashlib.sha256(o.b).hexdigest(),symbols_sha256=hashlib.sha256(c.b).hexdigest(),candidate_sha256=hashlib.sha256(candidate.read_bytes()).hexdigest(),runner_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),proofs=proofs)
report['summary']=dict(rows=len({p['id']for p in proofs}),counterparts=len(proofs),data_refs=sum(len(p['data'])for p in proofs),typed_equal=sum(d['equal']is True for p in proofs for d in p['data']),typed_different=sum(d['equal']is False for p in proofs for d in p['data']),unresolved=sum(d['equal']is None for p in proofs for d in p['data']),different_sources=[dict(id=p['id'],offset=d['offset'],original=d.get('original_source'),candidate=d.get('candidate_source'))for p in proofs for d in p['data']if d['kind']=='Rust_Source_record'and d['equal']is False],unmatched_direct_edges=[dict(id=p['id'],**e)for p in proofs for e in p['direct_edges']if not e['equal']])
output.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report['summary'].items() if k not in ['different_sources','unmatched_direct_edges']},indent=2))
