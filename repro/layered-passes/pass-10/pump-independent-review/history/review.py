from pathlib import Path
import hashlib,json,gzip,struct,importlib.util,sys,difflib,base64
sys.dont_write_bytecode=True
R=Path.cwd();W=R/'work/pump-buy-fee-basis-independent-review';P=R/'work/pump-fee-basis-review';B=R/'work/pump-buy-fee-basis-build'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
old=(P/'before/trade.rs').read_text();new=(P/'proposal/trade.rs').read_text();start=old.index('pub fn buy(');assert old[:start]==new[:start]
a='    let cap=curve.token_total_supply as u128*curve.virtual_quote_reserves as u128/curve.virtual_token_reserves as u128;';b='    let cap=(curve.token_total_supply as u128*curve.virtual_quote_reserves as u128).checked_div(curve.virtual_token_reserves as u128).ok_or(error!(PumpError::DivisionByZero))?;';repl='    let cap=buy_fee_market_cap(curve, &a.base_mint)?;'
tail=old[start:];assert tail.count(a)==tail.count(b)==1
body=old[:start]+tail.replace(a,repl).replace(b,repl);assert new.startswith(body);assert new.count(repl)==2
helper=new[len(body):];assert helper.count('fn buy_fee_market_cap(')==1 and 'if curve.is_mayhem_mode' in helper and 'mint.supply' in helper and 'curve.token_total_supply' in helper
assert 'buy_whitelist_after_base_transfer'not in new and 'update_buy_whitelist_virtual_quote'not in new
patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/programs/pump/src/trade.rs',tofile='b/programs/pump/src/trade.rs'));assert patch==(P/'proposal.patch').read_text()
assert (B/'source/programs/pump/src/trade.rs').read_text()==new
before=J(B/'baseline-source-sha256.json');after={n.removeprefix('work/pump-buy-fee-basis-build/source/'):h for n,h in J(B/'actual-source-sha256.json').items()};assert len(before)==len(after)==37
assert [k for k in before if before[k]!=after[k]]==['programs/pump/src/trade.rs']
for n,h in after.items():assert H(B/'source'/n)==h,n
spec=importlib.util.spec_from_file_location('pump_review_elf',P/'evidence/analyze_elf.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
o=m.Elf((P/'evidence/original.so').read_bytes());c=m.Elf((B/'candidate.so').read_bytes());s=m.Elf((B/'unstripped.so').read_bytes())
assert H(P/'evidence/original.so')=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d';assert H(B/'candidate.so')=='2b7e104ca71cf680208a72bc2d3eca86f3767c2bf83a6b75abe814356f9e8b66'
I=lambda e,p:struct.unpack('<BBhi',e.at(p,8))
def call(e,p,t):assert I(e,p)[0:2]==(0x85,0x10) and p+8+I(e,p)[3]*8==t
def branch(e,p,t):assert p+8+I(e,p)[2]*8==t
assert I(o,657664)==(0x79,0x27,64,0);branch(o,657672,657888)
assert I(o,657680)==(7,3,0,40);assert I(o,657688)==(0x71,0x21,154,0);branch(o,657696,657720)
assert I(o,657704)==(0xbf,0x23,0,0);assert I(o,657712)==(7,3,0,96);assert I(o,657720)==(0x79,0x33,0,0);assert I(o,657728)==(0x79,0x24,72,0)
call(o,657784,1791432);call(o,657840,1785992);call(o,524328,657656)
assert I(o,658280)==(0x62,10,-120,6026);assert I(o,658408)[0]==0x95
assert I(c,625536)==(0x79,0x27,64,0);branch(c,625544,625824)
assert I(c,625824)==(7,3,0,40);assert I(c,625832)==(0x71,0x21,154,0);branch(c,625840,625864)
assert I(c,625848)==(0xbf,0x23,0,0);assert I(c,625856)==(7,3,0,96);assert I(c,625864)==(0x79,0x33,0,0);assert I(c,625872)==(0x79,0x24,72,0)
call(c,625928,1465824);call(c,625984,1466176);assert I(c,626152)==(0x62,10,-120,6026)
# Compare the complete nonzero selector/arithmetic region, relocating only its two direct calls.
x=bytearray(o.at(657680,200));y=bytearray(c.at(625824,200))
for off in [108,164]:x[off:off+4]=bytes(4);y[off:off+4]=bytes(4)
assert x==y
# Scan actual whole text for incoming cap calls, skipping lddw continuation cells.
text=c.by_name['.text'];pc=text['address'];end=pc+text['size'];incoming=[]
while pc<end:
 op,regs,off,imm=I(c,pc)
 if op==0x85 and regs==0x10 and pc+8+imm*8==625528:incoming.append(pc)
 pc+=16 if op==24 else 8
assert incoming==[575512,590384]
for sec in s.sections:
 if sec['flags']&2 and sec['type']!=8:assert s.section_bytes(sec)==c.section_bytes(c.by_name[sec['name']])
# Verify complete arithmetic helper mappings, not names alone.
ol=J(B/'full-original-call-data-ledger.json.gz');cl=J(B/'full-candidate-call-data-ledger.json.gz');helper_rows=[]
for a,b in [(1791432,1465824),(1785992,1466176)]:
 u=next(z for z in ol if z['start']==a);v=next(z for z in cl if z['start']==b);assert u['bytes']==v['bytes'] and u['normalized_sha256']==v['normalized_sha256'];helper_rows.append({'original':a,'candidate':b,'bytes':u['bytes'],'candidate_names':v['names'],'normalized_sha256':u['normalized_sha256']})
# Inspect existing persisted fixtures only, with standard SPL mint/Borsh curve offsets.
f=J(R/'research/imported-lab/analysis/pump_fun/curve-fresh-trades-v3-signed-surfpool.json');mint=f['accounts']['mint'];curve=f['accounts']['curve'];coverage=[]
for name in ['exact_quote','v3_configured_fee']:
 rows=J(B/'surfpool'/name/'fixtures.json');tuples=set()
 for row in rows:
  mb=bytes.fromhex(row['accounts'][mint]['data']);cb=bytes.fromhex(row['accounts'][curve]['data']);tuples.add((int.from_bytes(mb[36:44],'little'),int.from_bytes(cb[40:48],'little'),cb[81]))
 assert all(a==b==10**15 for a,b,mode in tuples)
 coverage.append({'suite':name,'cases':len(rows),'supply_mode_tuples':sorted(tuples),'mode0_divergent_supply_cases':sum(1 for row in rows if bytes.fromhex(row['accounts'][curve]['data'])[81]==0 and int.from_bytes(bytes.fromhex(row['accounts'][mint]['data'])[36:44],'little')!=int.from_bytes(bytes.fromhex(row['accounts'][curve]['data'])[40:48],'little'))})
result={'status':'PASS_FOR_NARROW_STATIC_SELECTOR_CORRECTION','candidate_sha256':H(B/'candidate.so'),'exact_trade_source_delta':True,'only_two_actual_cap_call_sites':incoming,'mode0_mint_supply_offset':40,'mode1_curve_supply_offset':96,'zero_denominator_error_code':6026,'nonzero_200_byte_region_equal_with_two_calls_relocated':True,'arithmetic_helpers':helper_rows,'coverage':coverage,'runtime_divergent_supply_coverage_established':False,'whole_cap_body_equal':False,'whole_handler_or_wrapper_equivalence':False,'new_build_or_runtime_executed':False}
(W/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
