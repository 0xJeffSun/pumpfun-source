"""Static byte/CFG reconciliation; standard library; no build or target execution."""
from pathlib import Path
import sys,json,struct,hashlib,collections,importlib.util,re,difflib,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def load(n):return json.loads((P/n).read_text())
spec=importlib.util.spec_from_file_location('retained_analysis',P/'prior/analyze.py'); prior=importlib.util.module_from_spec(spec);spec.loader.exec_module(prior)
def decode(b,start,end):
 rows=[];pc=start
 while pc<end:
  op,regs,off,imm=struct.unpack_from('<BBhi',b,pc);size=16 if op==24 else 8
  raw=b[pc:pc+size];norm=bytearray(raw)
  r=dict(pc=pc,slot=pc//8,raw=raw.hex(),opcode=op,dst=regs&15,src=regs>>4,offset=off,immediate=imm,size=size)
  edges=[]
  if op==0x85:
   r['call_target']=pc+8+8*imm if regs>>4==1 else None
   norm[4:8]=bytes(4);edges=[pc+size]
  elif op==0x95:pass
  elif op&7 in (5,6):
   r['branch_target']=pc+8+off*8;norm[2:4]=bytes(2)
   edges=[r['branch_target']]+([] if op==5 else [pc+size])
  else:edges=[pc+size]
  if op==24:r['lddw_value']=struct.unpack_from('<I',raw,4)[0]+(struct.unpack_from('<I',raw,12)[0]<<32)
  r['successors']=edges;r['multiset_token']=norm.hex();rows.append(r);pc+=size
 assert pc==end
 pcs={r['pc'] for r in rows}
 assert all(t in pcs for r in rows for t in r['successors'])
 return rows

def derive():
 old=prior.derive();assert old==load('prior/evidence.json')
 o=(P/'prior/inputs/metaplex/original.so').read_bytes();c=(P/'prior/inputs/metaplex/build11/token_metadata.so').read_bytes()
 rows=[decode(b,236632,241736) for b in [o,c]]
 # Check every actual dump byte and decimal instruction slot; ignore misleading label annotations.
 for side,rr in zip(['original','candidate'],rows):
  parsed=[]
  for line in (P/f'pass01/utilize-{side}.asm').read_text().splitlines():
   m=re.match(r'\s*(\d+):\t([0-9a-f ]+)\t',line)
   if m:parsed.append((int(m[1])*8,bytes.fromhex(m[2]).hex()))
  assert parsed==[(r['pc'],r['raw']) for r in rr]
 counters=[collections.Counter(r['multiset_token'] for r in rr) for rr in rows]
 differences=[dict(sorted((counters[i]-counters[1-i]).items())) for i in [0,1]]
 assert differences==[{'3d97000000000000':1},{'2d79000000000000':1}]
 # A stronger, still non-semantic alignment retains actual direct-call targets.
 def token(r):return (r['multiset_token'],r.get('call_target'))
 matcher=difflib.SequenceMatcher(a=[token(r) for r in rows[0]],b=[token(r) for r in rows[1]],autojunk=False)
 alignment=[]
 for block in matcher.get_matching_blocks():
  if block.size:
   a=rows[0][block.a:block.a+block.size];b=rows[1][block.b:block.b+block.size]
   alignment.append(dict(original_range=[a[0]['pc'],a[-1]['pc']+a[-1]['size']],candidate_range=[b[0]['pc'],b[-1]['pc']+b[-1]['size']],instructions=block.size))
 # Deterministic labeled CFG correspondence, eliminating unconditional jumps only.
 # This retains both outcomes of every conditional and all actual direct targets.
 maps=[{r['pc']:r for r in rr} for rr in rows]
 def skip(i,pc):
  seen=set()
  while maps[i][pc]['opcode']==5:
   assert pc not in seen;seen.add(pc);pc=maps[i][pc]['successors'][0]
  return pc
 pending=[(236632,236632)];visited=set();mismatches=[]
 while pending:
  x,y=pending.pop();x=skip(0,x);y=skip(1,y)
  if (x,y) in visited:continue
  visited.add((x,y));a,b=maps[0][x],maps[1][y]
  ta,tb=token(a),token(b);ea=a['successors'];eb=b['successors']
  if x==y==238832:
   assert a['raw']=='3d97070000000000' and b['raw']=='2d79120000000000'
   tb=ta;eb=list(reversed(eb))
  if ta!=tb or len(ea)!=len(eb):
   mismatches.append(dict(original=x,candidate=y,original_token=ta,candidate_token=tb));continue
  pending.extend(zip(ea,eb))
 cfg=dict(method='Ignore unconditional jumps; compare all other decoded instruction operands with actual direct call targets; reverse the two outcomes of unsigned remaining comparison at 238832 only. Pointee bytes are checked separately; this is not whole-runtime equivalence.',pairs=[list(v) for v in sorted(visited)],mismatches=mismatches,original_nonjump_covered=len({x for x,y in visited}),candidate_nonjump_covered=len({y for x,y in visited}),original_nonjump_total=sum(r['opcode']!=5 for r in rows[0]),candidate_nonjump_total=sum(r['opcode']!=5 for r in rows[1]))
 assert not mismatches and cfg['original_nonjump_covered']==cfg['original_nonjump_total']==580 and cfg['candidate_nonjump_covered']==cfg['candidate_nonjump_total']==580
 targets=sorted({r['call_target'] for r in rows[0] if 'call_target'in r});ws=load('prior/inputs/metaplex/baseline/windows.json')
 target_rows=[]
 for t in targets:
  matches=[w for w in ws if w['original']['range'][0]==t];assert len(matches)==1
  x,y=matches[0]['original']['range'];assert o[x:y]==c[x:y]
  target_rows.append(dict(target=t,range=[x,y],sha256=H(o[x:y]),original_sites=[r['pc'] for r in rows[0] if r.get('call_target')==t],candidate_sites=[r['pc'] for r in rows[1] if r.get('call_target')==t]))
 # All immediate address loads retained, without inventing pointee extents.
 data=[]
 for side,b,rr in zip(['original','candidate'],[o,c],rows):
  secs,_=prior.elf(b)
  for r in rr:
   if 'lddw_value' not in r:continue
   v=r['lddw_value'];ss=[s for s in secs if s['addr']<=v<s['addr']+s['size'] and s['size']]
   item=dict(side=side,pc=r['pc'],value=v,backing_sections=[s['name'] for s in ss])
   if v==652112:
    ptr,length,line,col=struct.unpack_from('<QQII',b,v);ptr>>=32
    item['diagnostic']=dict(raw=b[v:v+24].hex(),filename=b[ptr:ptr+length].decode(),line=line,column=col)
   data.append(item)
 oldsrc=(P/'claims/utilize.candidate11.rs').read_bytes();newsrc=(P/'claims/utilize.proposed.rs').read_bytes()
 assert oldsrc==(P/'prior/inputs/metaplex/utilize.rs').read_bytes()
 before=b'    if number_of_uses == 0\n        || number_of_uses > metadata_uses.total\n        || number_of_uses > metadata_uses.remaining\n    {'
 after=b'    if number_of_uses == 0 || number_of_uses > metadata_uses.total {'
 assert oldsrc.count(before)==1 and oldsrc.replace(before,after)==newsrc
 # Inspect pinned full module/member contents as data, not extraction or execution.
 members={}
 with tarfile.open(P/'prior/inputs/metaplex/zero/source-snapshot.tar.gz') as tf:
  for n in ['program/src/processor/uses/utilize.rs','program/src/processor/mod.rs']:
   b=tf.extractfile('programs/token-metadata/'+n).read();members[n]=dict(sha256=H(b),text=b.decode())
 assert members['program/src/processor/uses/utilize.rs']['sha256']==H(oldsrc)
 ata=(P/'prior/inputs/ata/original.so').read_bytes();ac=(P/'prior/inputs/ata/build2/spl_associated_token_account.so').read_bytes()
 secs,syms=prior.elf(ata);panic=[s for s in syms if s['name']=='custom_panic'];assert len(panic)==1
 extent=[panic[0]['value'],panic[0]['value']+panic[0]['size']]
 text=next(s for s in secs if s['name']=='.text');diffs=[i for i in range(text['offset'],text['offset']+text['size']) if ata[i]!=ac[i]]
 # Inherited full mapping is independently decoded, including branches (no symbol-range inference).
 ledger=load('prior/inputs/ata/baseline/residual-ledger.json')
 def amap(x):return x+352 if 28592<=x<29032 else x-440 if 29032<=x<29384 else x
 branches=[];calls=[]
 pc=text['offset']
 while pc<text['offset']+text['size']:
  op=ata[pc];size=16 if op==24 else 8;cp=amap(pc)
  if op&7 in (5,6) and op not in (0x85,0x95,0x8d):
   target=pc+8+8*struct.unpack_from('<h',ata,pc+2)[0];ct=cp+8+8*struct.unpack_from('<h',ac,cp+2)[0]
   assert amap(target)==ct and ata[pc:pc+2]==ac[cp:cp+2] and ata[pc+4:pc+8]==ac[cp+4:cp+8]
   branches.append(dict(original_site=pc,candidate_site=cp,original_target=target,candidate_target=ct))
  if op==0x85 and ata[pc+1]>>4==1:
   target=pc+8+8*struct.unpack_from('<i',ata,pc+4)[0];ct=cp+8+8*struct.unpack_from('<i',ac,cp+4)[0];assert amap(target)==ct
   calls.append(dict(original_site=pc,candidate_site=cp,original_target=target,candidate_target=ct))
  pc+=size
 return dict(scope='Static only; raw identity false; no recommended source correction',metaplex=dict(cfg_correspondence=cfg,instructions=rows,multiset_differences=differences,sequence_alignment_not_proof=alignment,actual_targets=target_rows,lddw=data,static_data=[dict(range=[x,x+n],original=o[x:x+n].hex(),candidate=c[x:x+n].hex(),equal=o[x:x+n]==c[x:x+n]) for x,n in [(629320,32),(631104,4),(631312,8),(652112,24)]],source=dict(old_sha256=H(oldsrc),new_sha256=H(newsrc),module_members=members,proposal_status='preserved external hypothesis; not selected')),ata=dict(custom_panic_symbol=panic[0],custom_panic_extent=extent,text_differences=len(diffs),text_differences_within_symbol=sum(extent[0]<=i<extent[1] for i in diffs),branches=branches,calls=calls),prior_facts_sha256=H((P/'prior/evidence.json').read_bytes()))
if __name__=='__main__':
 d=derive()
 if '--write' in sys.argv:(P/'facts.json').write_text(json.dumps(d,indent=2,sort_keys=True)+'\n')
 else:assert d==load('facts.json');print('Static derivation passed')
