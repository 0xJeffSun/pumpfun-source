"""Source-use and bounded original preparation-call inventory; no execution."""
from pathlib import Path
import bisect, gzip, hashlib, json, re, struct, sys
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P/'prior/decoder/prior/short'))
from elf_reader import Elf
from decoder import decoded, window
H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 e=Elf(P/'prior/decoder/prior/short/inputs/composition/evidence/original.so')
 root=P/'inputs/source/programs/pump/src'
 uses=[]
 for f in sorted(root.glob('*.rs')):
  for line,text in enumerate(f.read_text().splitlines(),1):
   if 'BondingCurve' in text:
    uses.append({'file':'programs/pump/src/'+f.name,'line':line,'text':text,'scope':'lexical type/method reference only'})
 fields=[u for u in uses if 'pub bonding_curve:' in u['text']]
 assert {u['file']for u in fields}=={'programs/pump/src/'+n for n in ['create.rs','create_v2.rs','trade.rs','multi_hop_curve.rs']}
 assert len(fields)==4
 lib=(root/'lib.rs').read_text();contexts=[]
 for n,c in [('create','Create'),('create_v2','CreateV2'),('buy_v3','SellV3'),('sell_v3','SellV3'),('buy_exact_quote_in_v3','SellV3'),('multi_hop_curve_swap','MultiHopCurve')]:
  matches=[(i,s)for i,s in enumerate(lib.splitlines(),1)if re.search(r'pub fn '+n+r'(?:\b|<)',s)]
  assert len(matches)==1 and c in matches[0][1]
  contexts.append({'entrypoint':n,'context':c,'line':matches[0][0],'source':matches[0][1]})
 calls=[];windows=[];data=[]
 flows=[('buy_v3',0x1286c8,0x128c28,0x128808,0x128930,0x147ba0,0x147c08,0x147c28),('buy_exact_quote_in_v3',0x128c28,0x129188,0x128d68,0x128e90,0x1489f8,0x148a60,0x148a80),('sell_v3',0x129188,0x1295c0,0x129288,0x1293a8,0x14a8a8,0x14a910,0x14a930)]
 labels={'buy_v3':b'Instruction: BuyV3','buy_exact_quote_in_v3':b'Instruction: BuyExactQuoteInV3','sell_v3':b'Instruction: SellV3'}
 for name,a,z,parsepc,bodypc,body,preppc,end in flows:
  assert e.calls[parsepc]==0x102578 and e.calls[bodypc]==body and e.calls[preppc]==0x3cd50
  ins=decoded(e,a,a+0x50);ld=next(x for x in ins if x['pc']==a+40);length=next(x['immediate_signed']for x in ins if x['pc']==a+56)
  ptr=ld['immediate_u64'];literal=e.b[ptr:ptr+length];assert literal==labels[name]
  data.append({'role':name+' wrapper log label','pc':ld['pc'],'address':ptr,'bytes':length,'hex':literal.hex()})
  windows.append({**window(e,a,z),'role':name+' complete wrapper'})
  windows.append({**window(e,body,end),'role':name+' bounded first-preparation call, not full body'})
  actual=e.callsites(body,preppc+8-body);assert len(actual)==1 and actual[0]['target']==0x3cd50
  calls.append({'instruction':name,'wrapper':[a,z],'parser_call':parsepc,'parser':0x102578,'body_call':bodypc,'body':body,'first_body_call':preppc,'preparation':0x3cd50,'arguments':{'curve':'*(accounts+40)','system':'accounts+112','payer':'accounts+64'},'error_behavior':'tag !=2 branches to existing error path before subsequent mode/quote work'})
 a,z=0x5b3b0,0x5b448;windows.append({**window(e,a,z),'role':'bounded CurveHop preparation prefix'})
 assert e.calls[0x5b428]==0x3cd50 and e.calls[0x57438]==0x5b3b0 and e.calls[0x129888]==0x567d8
 calls.append({'instruction':'multi_hop_curve_swap','wrapper_body_call':0x129888,'route_body':0x567d8,'per_curve_call':0x57438,'per_curve_body':0x5b3b0,'first_body_call':0x5b428,'preparation':0x3cd50,'arguments':{'curve':'*(hop+16)','system':'route_accounts+80','payer':'route_accounts+24'}})
 init=[]
 for name,wrapper,labelpc,parsepc,parser,initpc,initializer,uncheckedpc in [('create',0x1260d8,0x126100,0x126470,0x167528,0x168b30,0x16bdf0,0x16d578),('create_v2',0x1268a8,0x1268d0,0x126fe8,0xac6c8,0xae018,0xb3b90,0xb5318)]:
  assert e.calls[parsepc]==parser and e.calls[initpc]==initializer and e.calls[uncheckedpc]==0x4238
  a=decoded(e,labelpc,labelpc+24);ptr=a[0]['immediate_u64'];length=a[1]['immediate_signed'];literal=e.b[ptr:ptr+length]
  assert literal=={'create':b'Instruction: Create','create_v2':b'Instruction: CreateV2'}[name]
  data.append({'role':name+' wrapper log label','pc':labelpc,'address':ptr,'bytes':length,'hex':literal.hex()})
  for pc in [parsepc,initpc,uncheckedpc]:windows.append({**window(e,pc,pc+8),'role':name+' exact caller edge only; initializer business semantics not inspected'})
  init.append({'instruction':name,'wrapper':wrapper,'parser_call':parsepc,'parser':parser,'initializer_call':initpc,'initializer':initializer,'unchecked_call':uncheckedpc,'account_reader':0x4238,'decoder':0x9b430,'current_declared_space':166,'preservation':'For any existing valid166-byte payload, both old and proposed unchecked readers decode the same19 fields; proposed cursor is consumed but Anchor discards this temporary slice. Canonical zeroed newly allocated payload therefore retains zero defaults.'})
 allcalls=[]
 for pc,t in sorted(e.calls.items()):
  if t==0x3cd50:
   k=bisect.bisect_right(e.entries,pc)-1
   allcalls.append({'pc':pc,'owner':e.entries[k],'scope':'affected flow prefix'if pc in[0x147c08,0x148a60,0x14a910,0x5b428]else'opaque other caller; no body interpretation'})
 assert len(allcalls)==14
 # Record current boundaries without examining excluded processing algorithms.
 boundary=[]
 for f in ['trade.rs','multi_hop_curve.rs','create_v2.rs']:
  for i,line in enumerate((root/f).read_text().splitlines(),1):
   if any(x in line for x in ['ReconstructionError::','fn prepare_curve','prepare_curve(a,','pub fn buy(','pub fn sell(','pub fn buy_exact_quote(','check_quote(a)?']):boundary.append({'file':f,'line':i,'text':line})
 trade=(root/'trade.rs').read_text()
 assert not any(x in trade for x in ['.realloc(','.resize(','data_len()','prepare_curve('])
 assert 'require!(info.data_len() >= 166,crate::ReconstructionError::ReconstructionBranchUnsupported);' in (root/'multi_hop_curve.rs').read_text()
 coverage=[]
 for name,expected in [('v3_configured_fee',372),('exact_quote_v3',352)]:
  f=P/'inputs/repro/pump/final-error-metadata-fortyeight/differential'/(name+'.json.gz');j=json.loads(gzip.decompress(f.read_bytes()));rows=j['cases'];assert len(rows)==expected
  lengths=[]
  for row in rows:
   values=[]
   for v in row['original']['accounts'].values():
    if isinstance(v,dict)and v.get('data_hex','').startswith('17b7f83760d8ac60'):values.append(len(v['data_hex'])//2)
   assert values==[166]
   lengths+=values
  coverage.append({'suite':name,'saved_rows':len(rows),'observable':'post-execution original curve account snapshots, not a new initial-state probe','curve_lengths':{'166':len(lengths)},'short_curve_runtime_claim':False})
 return {'source_references':uses,'trait_consuming_fields':fields,'affected_entrypoints':contexts,'original_preparation_flows':calls,'original_unchecked_initializers':init,'all_original_preparation_callers':allcalls,'windows':windows,'consumed_data':data,'existing_boundaries':boundary,'saved_coverage_limit':coverage,'decision':{'decoder_only_build_authorized':False,'connected_patch_established':False,'explicit_fences_can_remain_byte_identical':True,'implicit_full_length_admission_is_changed':True,'blocker':'The global decoder exposes short states to all three current V3 bodies. Original shared preparation is identified and reusable in principle, but an integrated source+preparation change alters rent CPI/error ordering even for full-length curves and has no existing short-state receipts. CurveHop retains an explicit short-state rejection. Do not call decoder-only integration safe or remove that rejection to claim closure.'}}
if __name__=='__main__':
 r=run();(P/'integration-ledger.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'fields':len(r['trait_consuming_fields']),'entrypoints':len(r['affected_entrypoints']),'windows':len(r['windows']),'preparation_calls':len(r['all_original_preparation_callers'])},indent=2))
