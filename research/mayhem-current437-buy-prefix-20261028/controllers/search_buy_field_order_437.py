"""Bounded ordinary-Rust pre-Clock field-order search; never patches an ELF."""
from pathlib import Path
import hashlib,importlib.util,json,os,random,subprocess,sys
D=Path(__file__).resolve().parent;W=D.parent;R=W.parents[1];run_id=sys.argv[1];steps=int(sys.argv[2]);assert run_id.replace('-','').isalnum() and 1<=steps<=100
out=D/('order-search-'+run_id);out.mkdir();rng=random.Random(7144437)
def mod(name,p):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
reader=mod('order_reader',R/'research/mayhem-amm-sell-cfg-recovery-20261027/helpers/reader.py');audit=mod('order_audit',R/'research/mayhem-amm-sell-cfg-recovery-20261027/analysis.py');progress=mod('order_progress',R/'research/mayhem-amm-sell-cfg-recovery-20261027/helpers/progress.py')
o=reader.Elf(R/'evidence/original/mayhem/deployed.so');a=o.window(85600,95336);an=o.norm(a['start'],a['end'])[0];ow={r['start']:o.window(r['start'],r['end'])for r in json.loads((R/'research/mayhem-provider-sharing/audit.json').read_bytes())['rows']};baseline=(W/'qualified-amm437-base-01-build/symbols.so').read_bytes();base=W/'amm-qualified437-base-20261028';relative=Path('programs/mayhem/src/instructions/buy_pump_swap.rs');source=(base/relative).read_text();begin=source.index('SellEvent{',source.index('let native_balance='))+len('SellEvent{');end=source.index('};\n emit!(event)',begin);body=source[begin:end]
chunks=[];start=0;depth=0
for i,ch in enumerate(body):
 if ch in '({[':depth+=1
 elif ch in ')}]':depth-=1
 elif ch==','and depth==0:chunks.append(body[start:i]);start=i+1
chunks.append(body[start:]);assert all(ch.strip()for ch in chunks)
fields={ch.strip().split(':',1)[0]:ch for ch in chunks};order=list(fields);clock=order.index('timestamp');assert len(order)==25 and clock==16
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
(out/'setup.json').write_text(json.dumps(dict(controller_sha256=sha(Path(__file__)),source=str(base),source_sha256=sha(base/relative),field_order=order,restricted_prefix_fields=order[:clock],scope='Permute only existing pre-Clock field expressions. No new operations, matcher changes, or binary writes.'),indent=2)+'\n')
def score(label):
 p=W/(label+'-build/symbols.so');e=reader.Elf(p);ew=audit.windows(e);b=audit.named(e,ew,'buy_pump_swap7handler');bn=e.norm(b['start'],b['end'])[0];aa=[an[i:i+8]for i in range(0,len(an),8)];bb=[bn[i:i+8]for i in range(0,len(bn),8)]
 valid=(len(bn)==len(an)and [x['offset']for x in a['direct']]==[x['offset']for x in b['direct']]and [audit.key(ow[x['target']])for x in a['direct']]==[audit.key(ew[x['target']])for x in b['direct']]and audit.sources(o,a)==audit.sources(e,b))
 return dict(valid=valid,bytes=len(bn),equal_words=sum(x==y for x,y in zip(aa,bb)),prefix_bytes=next((i*8 for i,(x,y)in enumerate(zip(aa,bb))if x!=y),min(len(an),len(bn))),full_equal=audit.key(a)==audit.key(b),candidate_sha256=sha(W/(label+'-build/candidate.so')),symbols_sha256=sha(p))
seed=order.copy();seed.remove('sol_amount');seed.insert(seed.index('global_quote_deployed')+1,'sol_amount')
beam=[(1110,seed)];seen={tuple(order),tuple(seed)};results=[];best_score=1110
for n in range(steps):
 for attempt in range(1000):
  parent=rng.choice(beam)[1];trial=parent.copy();i=rng.randrange(clock);j=max(0,min(clock-1,i+rng.choice([-3,-2,-1,1,2,3])));trial[i],trial[j]=trial[j],trial[i]
  if trial.index('virtual_quote')>trial.index('virtual_sol')or tuple(trial)in seen:continue
  seen.add(tuple(trial));break
 else:break
 label=f'amm437-buy-order-{run_id}-{n:03d}';dest=W/label;subprocess.run(['cp','-cR',str(base),str(dest)],check=True);changed=source[:begin]+','.join(fields[k]for k in trial)+source[end:];assert changed.count('\n')==source.count('\n');(dest/relative).write_text(changed)
 build='qualified-'+label
 with(out/(f'{n:03d}-build.log')).open('wb')as f:p=subprocess.run([sys.executable,'-B',str(D/'build_qualified_root.py'),build,label],cwd=R,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=f,stderr=subprocess.STDOUT)
 record=dict(index=n,source_label=label,build_label=build,field_order=trial,returncode=p.returncode)
 if p.returncode==0:
  record.update(score(build))
  if record['valid']and record['equal_words']>=best_score:
   try:preserve=progress.compare(o.b,baseline,(W/(build+'-build/symbols.so')).read_bytes())
   except AssertionError:record['preservation_passed']=False
   else:
    record['preservation_passed']=True;record['matched_windows']=preserve['matches'];record['raw_windows']=preserve['raw_matches'];(out/(f'{n:03d}-preservation.json')).write_text(json.dumps(preserve,indent=2)+'\n')
    beam.append((record['equal_words'],trial));beam=sorted(beam,key=lambda x:x[0],reverse=True)[:4]
    if record['equal_words']>best_score:best_score=record['equal_words'];print('NEW_BEST',n,best_score,record['prefix_bytes'],build,flush=True)
   if record['full_equal']and record.get('preservation_passed'):
    (out/'FULL-WINDOW.json').write_text(json.dumps(record,indent=2)+'\n');results.append(record);break
 results.append(record);(out/'results.json').write_text(json.dumps(results,indent=2)+'\n');print('trial',n,record.get('equal_words'),record.get('prefix_bytes'),flush=True)
(out/'results.json').write_text(json.dumps(results,indent=2)+'\n');print('FINISHED',len(results),'best',best_score,flush=True)
