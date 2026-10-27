"""Recompute complete Burn body, immediate callees and typed data extents."""
from pathlib import Path
import importlib.util,json,struct,gzip,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1]
def analyze(symbols_path):
 sp=importlib.util.spec_from_file_location('be',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);o=m.Elf(R/'evidence/original/mayhem/deployed.so');c=m.Elf(symbols_path);f=next(s for s in c.symbols if s['info']&15==2 and 'instructions4burn7handler17' in s['name']);rows=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_text())['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows};cw={a:c.window(a,b)for a,b in {(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi}};a=o.window(55448,61200);b=cw[f['value']];key=lambda x:(x['end']-x['start'],x['normalized_sha256'],x['normalization_pattern']);assert key(a)==key(b)
 def ptr(e,at):
  assert e.rel[at]['type']==8
  lo,hi=struct.unpack_from('<II',e.b,at);assert lo==0;return hi
 def source(e,at):
  p=ptr(e,at);n,line,col=struct.unpack_from('<QII',e.b,at+8);return dict(path=e.b[p:p+n].decode(),line=line,column=col)
 def table(e,at,size,positions):
  vals=[]
  for i in range(0,size,8):
   if i in positions:
    p=ptr(e,at+i);w=(ow if e is o else cw).get(p);vals.append(dict(kind='code',address=p,shape=None if w is None else key(w)))
   else:vals.append(dict(kind='scalar',value=struct.unpack_from('<Q',e.b,at+i)[0]))
  return vals
 def same_table(ao,ac,size,positions):
  x=table(o,ao,size,positions);y=table(c,ac,size,positions)
  return all(xx['kind']==yy['kind']and (xx.get('value')==yy.get('value')if xx['kind']=='scalar'else xx['shape']is not None and xx['shape']==yy['shape'])for xx,yy in zip(x,y))
 refs=[]
 for x,y in zip(a['data_references'],b['data_references']):
  off=x['offset'];ao,ac=x['target'],y['target'];r=dict(offset=off,original_target=ao,candidate_target=ac)
  if off in [96,232,448,584]:
   r.update(kind='error_variant_index',bytes=4,equal=o.b[ao:ao+4]==c.b[ac:ac+4])
  elif off in [144,496]:r.update(kind='formatting_vtable',bytes=24,equal=same_table(ao,ac,24,{0}))
  elif off in [360,712]:
   length=len(b'programs/mayhem-program/src/instructions/burn.rs');r.update(kind='source_filename',bytes=length,equal=o.b[ao:ao+length]==c.b[ac:ac+length])
  elif off==1632:r.update(kind='sol_vault_seed',bytes=9,equal=o.b[ao:ao+9]==c.b[ac:ac+9])
  elif off in [3968,4096,5456,5536,5632,5728]:
   xx,yy=source(o,ao),source(c,ac);r.update(kind='source_location',bytes=24,original=xx,candidate=yy,equal=xx==yy)
  elif off==4728:r.update(kind='Pump_program_ID',bytes=32,equal=o.b[ao:ao+32]==c.b[ac:ac+32])
  elif off==4920:
   po,pc=ptr(o,ao),ptr(c,ac);assert struct.unpack_from('<Q',o.b,ao+8)[0]==struct.unpack_from('<Q',c.b,ac+8)[0]==2
   nested=[]
   for i in [0,16]:
    no,nc=struct.unpack_from('<Q',o.b,po+i+8)[0],struct.unpack_from('<Q',c.b,pc+i+8)[0];xo,xc=ptr(o,po+i),ptr(c,pc+i);nested.append(dict(bytes=no,equal=no==nc and o.b[xo:xo+no]==c.b[xc:xc+nc],original_hex=o.b[xo:xo+no].hex(),candidate_hex=c.b[xc:xc+nc].hex()))
   r.update(kind='event_signer_seeds',bytes=16,nested=nested,equal=all(z['equal']for z in nested))
  elif off in [5416,5592,5688]:
   text=b'called `Result::unwrap()` on an `Err` value';r.update(kind='unwrap_panic_message',bytes=len(text),equal=o.b[ao:ao+len(text)]==c.b[ac:ac+len(text)]==text)
  elif off in [5440,5616,5712]:r.update(kind='panic_debug_vtable',bytes=32,equal=same_table(ao,ac,32,{24}))
  elif off==5496:
   text=b'a Display implementation returned an error unexpectedly';r.update(kind='formatting_panic_message',bytes=len(text),equal=o.b[ao:ao+len(text)]==c.b[ac:ac+len(text)]==text)
  elif off==5520:r.update(kind='format_error_vtable',bytes=32,equal=same_table(ao,ac,32,{24}))
  else:raise AssertionError(off)
  refs.append(r)
 callees=[]
 for x,y in zip(a['direct'],b['direct']):
  ox,cy=ow.get(x['target']),cw.get(y['target']);callees.append(dict(offset=x['offset'],original_target=x['target'],candidate_target=y['target'],same_shape=ox is not None and cy is not None and key(ox)==key(cy)))
 r=dict(candidate=f['value'],body_bytes=5752,complete_normalized_body_equal=key(a)==key(b),direct_callees=callees,external_calls=a['external'],indirect_calls=a['indirect'],data_references=refs)
 assert len(refs)==25 and len(callees)==26 and all(x['same_shape']for x in callees)
 return r

def generate():
 with tempfile.TemporaryDirectory()as td:
  f=Path(td)/'symbols.so';f.write_bytes(gzip.decompress((P/'artifacts/recovered/symbols.so.gz').read_bytes()));return analyze(f)
if __name__=='__main__':
 print(json.dumps(generate(),indent=2))
