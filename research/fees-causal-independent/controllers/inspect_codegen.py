from pathlib import Path
import gzip,hashlib,importlib.util,json,re
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');B=Path('/home/ahi200/pumpfun-work/20261028-fees-causal')
s=importlib.util.spec_from_file_location('w',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
O=(R/'evidence/original/pump_fees/deployed.so').read_bytes();ow=w.windows(O);oi={f['address']:f for f in ow}
output=B/'codegen';output.mkdir(exist_ok=True);reports={}
for stage in ['before','after']:
 D=B/stage;binary=(D/'symbols.so').read_bytes();cw=w.windows(binary);ci={f['address']:f for f in cw}
 pairs=w.compare(ow,cw)['unique_pairs'];reverse={p['candidate']['address']:p['original']['address']for p in pairs}
 ir=(D/'ir-with-env/root.ll').read_text();reports[stage]={}
 for kind in ['crank','create']:
  name=kind+'_donation_fee_pda'
  target=next(f for f in cw if f['name']and 'pump_fees_candidate19pump_fees_candidate'in f['name']and name in f['name'])
  wrapper=next(f for f in cw if f['name']and '__private8__global'in f['name']and name in f['name'])
  calls=[r for r in w.m.instructions(binary,wrapper['address'],wrapper['bytes'])if r.get('call_target')==target['address']];assert len(calls)==1
  off=calls[0]['offset'];origwrapper=reverse[wrapper['address']];origcall=next(r for r in w.m.instructions(O,origwrapper,oi[origwrapper]['bytes'])if r['offset']==off);original=oi[origcall['call_target']]
  bodies={}
  for label,img,fn,index in [('original',O,original,oi),('candidate',binary,target,ci)]:
   rows=w.m.instructions(img,fn['address'],fn['bytes']);bodies[label]=rows
   (output/(stage+'-'+kind+'-'+label+'.json')).write_text(json.dumps(dict(function=fn,rows=rows),indent=2)+'\n')
  start=re.search(r'^define .*@'+re.escape(target['name'])+r'\(',ir,re.M).start();end=ir.index('\n}',start)+2;body=ir[start:end];(output/(stage+'-'+kind+'.ll')).write_text(body+'\n')
  copies=[line.strip()for line in body.splitlines()if '@llvm.memcpy' in line]
  reports[stage][kind]=dict(original_address=original['address'],original_bytes=original['bytes'],candidate_address=target['address'],candidate_bytes=target['bytes'],original_wrapper=origwrapper,candidate_wrapper=wrapper['address'],wrapper_call_offset=off,ir_memcpy=copies)
  print(stage,kind,'body',original['address'],original['bytes'],target['address'],target['bytes'],'wrapper',origwrapper,'offset',off,'memcpy',len(copies),flush=True)
  if kind=='crank':
   rows=bodies['candidate']
   for i,r in enumerate(rows):
    if 'call_target'in r and dict(w.m.relocations(binary)).get(target['address']+r['offset'],0)&0xffffffff!=10:
     callee=ci[r['call_target']]
     if callee['name']and 'ProgramError'in callee['name']:print('ProgramError conversion',r['offset'],callee['name'],rows[max(0,i-6):i+10],flush=True)
(output/'index.json').write_text(json.dumps(reports,indent=2)+'\n')
