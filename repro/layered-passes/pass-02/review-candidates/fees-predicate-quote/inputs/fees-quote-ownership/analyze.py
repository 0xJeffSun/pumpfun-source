#!/usr/bin/env python3
"""Static byte/def-use inventory only. No target execution, compiler or network.
Default: recompute in memory and compare output; --write creates this package's ledgers.
For a later accepted binary pair use layer01/inventory_next.py, then re-review site facts.
"""
from pathlib import Path
import argparse, difflib, hashlib, json, struct
W=Path(__file__).resolve().parent
H=lambda x:hashlib.sha256(x).hexdigest()
def dump(x):return json.dumps(x,sort_keys=True,indent=2)+'\n'
def read(p):return json.loads((W/p).read_text())
def decode(b,st,en,rels):
 out=[];pc=st
 while pc<en:
  op,rg,off,imm=struct.unpack_from('<BBhi',b,pc);n=16 if op==24 else 8
  r=dict(pc=pc,file_offset=pc,opcode=op,dst=rg&15,src=rg>>4,offset=off,imm=imm,size=n,hex=b[pc:pc+n].hex())
  if op==24:r['u64']=struct.unpack_from('<I',b,pc+4)[0]|struct.unpack_from('<I',b,pc+12)[0]<<32
  if pc in rels:r['relocation']=rels[pc]
  if op==133:
   if pc in rels:r['call_kind']='relocated';r['target']=None
   else:r['call_kind']='direct';r['target']=pc+8+8*imm
  if op==141:r['call_kind']='indirect';r['target']=None;r['register']=imm
  if op&7 in (5,6) and op not in (133,141,149):r['branch']=pc+8+off*8;r['feasibility']='unresolved'
  out.append(r);pc+=n
 assert pc==en
 return out
OLD='''            let info = curve.to_account_info();
            let mut quote_bytes = [0u8; 32];
            if info.data_len() >= 115 {
                let data = info.data.borrow();
                quote_bytes.copy_from_slice(&data[83..115]);
            }
            let quote = Pubkey::new_from_array(quote_bytes);
'''
NEW='''            let quote = donation_raw_curve_quote(curve.to_account_info());
'''
HELPER='''fn donation_raw_curve_quote(info: AccountInfo<'_>) -> Pubkey {
    let mut quote_bytes = [0u8; 32];
    if info.data_len() >= 115 {
        let data = info.data.borrow();
        quote_bytes.copy_from_slice(&data[83..115]);
    }
    Pubkey::new_from_array(quote_bytes)
}

'''
def sources():
 source=(W/'baseline/inputs/donation.rs').read_text()
 assert source==(W/'layer01/inputs/source/programs/pump-fees/src/donation.rs').read_text()
 base=source.replace('let info=ctx.accounts.pool.to_account_info();','let info = &ctx.accounts.pool;').replace('let sharing=ctx.accounts.sharing_config.to_account_info();','let sharing = &ctx.accounts.sharing_config;')
 assert base.count(OLD)==1
 target=base.replace(OLD,NEW)
 marker='#[derive(Accounts)]\npub struct CreateDonationFeePda'
 assert target.count(marker)==1
 target=target.replace(marker,HELPER+marker)
 patch=''.join(difflib.unified_diff(base.splitlines(True),target.splitlines(True),fromfile='a/programs/pump-fees/src/donation.rs',tofile='b/programs/pump-fees/src/donation.rs'))
 # Mechanical inverse excludes silent guard, formatter, event, or other handler edits.
 assert target.replace(HELPER,'').replace(NEW,OLD)==base
 provenance=[]
 for name,text in [('baseline/inputs/donation.rs',source),('borrowed-base.rs',base),('proposed-donation.rs',target)]:
  rs=[]
  for term in ['pub fn create(', 'let quote =', 'let info = &ctx.accounts.pool;', 'let sharing = &ctx.accounts.sharing_config;', 'fn donation_raw_curve_quote(', 'let data = info.data.borrow();', 'quote_bytes.copy_from_slice', 'let event=DonationFeePdaCreated']:
   start=0
   while True:
    at=text.find(term,start)
    if at<0:break
    e=text.find('\n',at);rs.append(dict(term=term,byte_start=len(text[:at].encode()),byte_end=len(text[:e].encode()),line=text[:at].count('\n')+1));start=e+1
  provenance.append(dict(path=name,sha256=H(text.encode()),bytes=len(text.encode()),ranges=rs,status='frozen' if name.startswith('baseline') else 'derived proposal; not accepted or compiled'))
 return {'borrowed-base.rs':base,'proposed-donation.rs':target,'quote-ownership.patch':patch,'source-provenance.json':provenance}
def produce():
 cat=read('layer01/catalog.json');rels0=read('layer01/relocations.json')
 bins={s:(W/p).read_bytes() for s,p in [('original','layer01/inputs/original.so'),('candidate','layer01/inputs/current/pump_fees_candidate.so')]}
 maps={s:{r['start']:r for r in cat[s+'_rows']} for s in bins}
 rels={s:{r['site']:r for r in rels0[s]} for s in bins}
 # These ELFs map the entire .text at VA == file offset; verify instead of assuming.
 for b in bins.values():
  sh,=struct.unpack_from('<Q',b,40);z,n=struct.unpack_from('<HH',b,58)
  assert any((q:=struct.unpack_from('<IIQQQQIIQQ',b,sh+i*z))[3]==q[4]==288 and q[2]&4 for i in range(n))
 pairs=[('handler',163920,424568),('data_len',731512,625816),('borrow_panic',767672,666952),('slice_panic_trampoline',783752,683032),('slice_panic_body',783760,683040),('memcmp_syscall_adapter',796464,695512),('borrow_error_debug',767392,666672),('panic_fmt',771136,670416)]
 windows={};comparisons=[]
 for name,o,c in pairs:
  bodies={};norms={}
  for side,st in [('original',o),('candidate',c)]:
   r=maps[side][st];en=r['end'];b=bins[side];rows=decode(b,st,en,rels[side]);norm=bytearray()
   for x in rows:
    raw=bytearray.fromhex(x['hex'])
    if x['opcode']==133:raw[4:8]=bytes(4)
    if x.get('relocation',{}).get('type')==8 and x['opcode']==24:raw[4:8]=bytes(4);raw[12:16]=bytes(4)
    norm.extend(raw)
   bodies[side]=b[st:en];norms[side]=bytes(norm)
   windows[side+':'+name]=dict(start=st,end=en,bytes=en-st,sha256=H(b[st:en]),normalized_sha256=H(norm),boundary='inferred' if side=='original' else 'symbol',instructions=rows,full_catalog_row=r)
  comparisons.append(dict(role=name,original_start=o,candidate_start=c,original_bytes=len(bodies['original']),candidate_bytes=len(bodies['candidate']),raw_equal=bodies['original']==bodies['candidate'],normalized_equal=norms['original']==norms['candidate'],actual_call_targets_equal=None,referenced_data_equal=None,semantics='manual bounded contract only; no transitive proof'))
 # Expand actual calls and embedded function-pointer edges of focused helper bodies;
 # full body/whole-program graphs remain in the preserved layer01 package.
 closure={}
 for side in bins:
  todo=[o if side=='original' else c for name,o,c in pairs if name!='handler'];seen=set();nodes=[];unresolved=[]
  while todo:
   st=todo.pop(0)
   if st in seen:continue
   seen.add(st);w=maps[side].get(st)
   if w is None:unresolved.append(dict(target=st,reason='no exact inferred/symbol entry; no nearest-symbol attribution'));continue
   rows=decode(bins[side],st,w['end'],rels[side]);edges=[]
   for r in rows:
    if r.get('call_kind')=='direct':edges.append(dict(pc=r['pc'],kind='direct',target=r['target']));todo.append(r['target'])
    if r.get('call_kind') in ('indirect','relocated'):unresolved.append(dict(window=st,instruction=r,reason='external or indirect semantics not proved'))
    rel=r.get('relocation',{})
    if rel.get('target') in maps[side]:edges.append(dict(pc=r['pc'],kind='embedded code pointer',target=rel['target']));todo.append(rel['target'])
   nodes.append(dict(start=st,end=w['end'],sha256=H(bins[side][st:w['end']]),instructions=rows,edges=edges))
  closure[side]=dict(nodes=sorted(nodes,key=lambda x:x['start']),unresolved=unresolved,limit='direct and immediate embedded code pointers only; nested data pointer graphs and indirect destinations remain unresolved')
 # Byte-bound contracts. A consumer can inspect all producer instructions, not labels.
 sites={s:{r['pc']:r for w in windows.values() if w['start']==(163920 if s=='original' else 424568) for r in w['instructions']} for s in bins}
 expected={'original':[(164864,731512),(165000,783752),(165528,796464),(177696,767672)],'candidate':[(425112,625816),(425240,683032),(425480,695512),(438136,666952)]}
 for side,ps in expected.items():
  for pc,target in ps:assert sites[side][pc]['target']==target
 assert sites['original'][164896]['u64']==2**63-1
 assert sites['original'][164920]['opcode']==0xad
 assert sites['original'][165200]['opcode']==0x7b and sites['original'][165200]['offset']==16
 assert sites['original'][165344]['offset']==0 and sites['original'][165400]['offset']==0
 assert sites['original'][165520]['imm']==32
 load_specs=[(165128,83,4),(165144,87,2),(165088,89,8),(165096,97,1),(165160,98,8),(165184,106,8),(165168,114,1)]
 loads=[]
 for pc,start,n in load_specs:
  r=sites['original'][pc];assert r['offset']==start and r['opcode']=={1:0x71,2:0x69,4:0x61,8:0x79}[n]
  loads.append(dict(pc=pc,account_bytes=[start,start+n],instruction=r))
 assert sorted(v for _,a,n in load_specs for v in range(a,a+n))==list(range(83,115))
 # Manually justified def-use chains through the local staging buffer, not runtime emulation.
 fragments=[(83,4,-768,[165128,165136,165224,165232]),(87,2,-764,[165144,165152,165208,165216]),(89,1,-762,[165088,165304]),(90,8,-761,[165088,165112,165096,165104,165120,165296]),(98,8,-753,[165160,165288]),(106,8,-745,[165184,165192,165264,165280]),(114,1,-737,[165168,165176,165240,165256])]
 defuse=[dict(input_bytes=[a,a+n],comparison_stack_bytes=[o,o+n],chain=[sites['original'][pc] for pc in pcs],basis='manual straight-line byte provenance; complete instructions supplied') for a,n,o,pcs in fragments]
 assert [i for a,n,o,pcs in fragments for i in range(a,a+n)]==list(range(83,115))
 assert [i for a,n,o,pcs in fragments for i in range(o,o+n)]==list(range(-768,-736))
 objects=[]
 def obj(side,p,n,role,users):
  b=bins[side][p:p+n];assert len(b)==n
  r=dict(side=side,start=p,end=p+n,file_offset=p,bytes=n,hex=b.hex(),sha256=H(b),role=role,consumers=users,extent_basis='fixed ABI or explicit consumer count, not nearest symbol');objects.append(r);return b,r
 for side,descs,tables,debug in [('original',[(821888,[164984]),(821912,[177680]),(825552,[731568])],[(826928,1,[767680]),(827240,2,[783776])],(817638,767416)),('candidate',[(719760,[425224]),(719784,[438120]),(723528,[625872])],[(725224,1,[666960]),(725536,2,[683056])],(715820,666696))]:
  for p,users in descs:
   x,r=obj(side,p,24,'panic Location {file:&str,line:u32,column:u32}',users)
   ptr=struct.unpack_from('<Q',x)[0]>>32;n,line,col=struct.unpack_from('<QII',x,8);r.update(line=line,column=col,filename_pointer=ptr)
   text,tr=obj(side,ptr,n,'location filename',[p]);tr['text']=text.decode()
   for pc in users:assert rels[side][pc]['target']==p
   assert rels[side][p]['target']==ptr
  for p,count,users in tables:
   x,r=obj(side,p,count*16,'format literal slice table',users)
   for i in range(count):
    ptr,n=struct.unpack_from('<QQ',x,i*16);ptr>>=32
    text,tr=obj(side,ptr,n,'format literal',[p+i*16]);tr['text']=text.decode();assert rels[side][p+i*16]['target']==ptr
   for pc in users:assert rels[side][pc]['target']==p
  p,pc=debug
  assert rels[side][pc]['target']==p
  x,r=obj(side,p,11,'BorrowError Debug literal',[pc]);r['text']=x.decode();assert r['text']=='BorrowError'
 # Pair only corresponding slots of already normalized-equal seed bodies; follow
 # their signed call operands. This is never nearest-symbol matching.
 def body_fact(side,st):
  w=maps[side].get(st)
  if w is None:return None
  b=bins[side];rows=decode(b,st,w['end'],rels[side]);norm=bytearray()
  for r in rows:
   x=bytearray.fromhex(r['hex'])
   if r['opcode']==133:x[4:8]=bytes(4)
   if r['opcode']==24 and r.get('relocation',{}).get('type')==8:x[4:8]=bytes(4);x[12:16]=bytes(4)
   norm.extend(x)
  return (w,rows,b[st:w['end']],bytes(norm))
 edges=[];pending=[(o,c) for name,o,c in pairs if name!='handler'];done=set()
 while pending:
  o,c=pending.pop(0)
  if (o,c) in done:continue
  done.add((o,c));a=body_fact('original',o);b=body_fact('candidate',c)
  if not a or not b:continue
  if a[3]!=b[3]:continue
  for x,y in zip(a[1],b[1]):
   if x.get('call_kind')!='direct':continue
   ot,ct=x['target'],y['target'];oa=body_fact('original',ot);ca=body_fact('candidate',ct)
   z=dict(original_pc=x['pc'],candidate_pc=y['pc'],original_signed_operand=x['imm'],candidate_signed_operand=y['imm'],original_actual_target=ot,candidate_actual_target=ct,selection='signed operands at paired slots in a normalized-equal parent',target_raw_equal=None,target_normalized_equal=None,referenced_data_equal=None)
   if oa and ca:
    z.update(original_extent=[ot,oa[0]['end']],candidate_extent=[ct,ca[0]['end']],target_raw_equal=oa[2]==ca[2],target_normalized_equal=oa[3]==ca[3]);pending.append((ot,ct))
   edges.append(z)
 contract=read('ownership-contract.json');ownership=[]
 for segment in contract['segments']:
  start,end=segment['start'],segment['end'];rr=[r for r in windows['original:handler']['instructions'] if start<=r['pc']<end]
  assert rr and rr[0]['pc']==start and rr[-1]['pc']+rr[-1]['size']==end
  ownership.append(dict(**segment,file_offset=start,sha256=H(bins['original'][start:end]),instructions=rr))
 source=sources()
 residuals=[
 ('quote-ownership','source organization/ownership','proposed', 'Owned AccountInfo helper returns raw Pubkey before zero comparison; exact generated bytes untested.'),
 ('ordinary-errors','diagnostic/data metadata','open','Same borrow/index operations and error/CPI order; original common/mod.rs:33 and compiler diagnostic locations not reproduced.'),
 ('quote-byte-gather','toolchain/build provenance','open','32 ordered bytes recovered; scattered loads vs four-u64 copy not attributable to unique syntax/compiler.'),
 ('helper-closure','linked dependency/helper','open','Full actual-target graph retained; external, indirect, nested descriptor and allocator behavior remains conditional.'),
 ('new-application-checks','concrete application-source gap','none-established','No missing guard established; helper adds none.'),
 ('historical-source','ambiguous/unattributed','open','Historical helper name, signature, module body and source construction unknown.'),
 ('stopped-lanes','explicitly stopped','excluded','Pump sell_v2, incentive handlers, Mayhem initializer, v3 token extensions, Metaplex probe untouched; not matched.')]
 residual=[dict(id=i,classification=c,status=s,detail=d,whole_file_equal=False) for i,c,s,d in residuals]
 result=dict(status='grounded uncompiled ownership proposal; original identity unresolved',baseline='c1ffdd0667608d4755227e68aab9f27a7e9a0d37',whole_file_equal=False,raw_comparison=read('layer01/raw-differences.json')['whole_file'] if 'whole_file' in read('layer01/raw-differences.json') else read('layer01/raw-differences.json'),body_pairs=comparisons,original_windows=585,candidate_windows=546,accepted_count_change=0,builds=0,target_executions=0,patch='quote-ownership.patch',patch_base='borrowed-base.rs',patch_base_status='baseline donation.rs plus exactly the two root-reviewed borrow substitutions, reconstructed locally; no current-root claim',next_gates=['root source review','separately authorized build and fresh full inventory','separately authorized exact diagnostic/runtime validation','original source/toolchain/data provenance and full-file equality'])
 out={'ownership-evidence.json':ownership,'actual-helper-edges.json':edges,'focused-windows.json':windows,'helper-closure.json':closure,'quote-byte-provenance.json':dict(loads=loads,defuse=defuse,reads=[83,115],written_comparison_stack=[-768,-736],other_bytes_semantics='not read by extraction; context parser independent'),'consumed-objects.json':objects,'residual-ledger.json':dict(inherited_rows=read('layer01/residual-ledger.json'),focused_residuals=residual,unchanged_full_ledger='layer01/catalog.json',all_branches_and_unknowns='layer01/instructions.json',uncovered_intervals='layer01/coverage.json'),'result.json':result}
 out.update(source);return out
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--write',action='store_true');a=p.parse_args()
 for path,value in produce().items():
  data=value if isinstance(value,str) else dump(value)
  if a.write:(W/path).write_text(data)
  else:assert (W/path).read_text()==data,path
 print('static analysis '+('written' if a.write else 'verified'))
