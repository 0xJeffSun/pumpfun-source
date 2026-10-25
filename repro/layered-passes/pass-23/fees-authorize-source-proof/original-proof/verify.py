from pathlib import Path
import json,hashlib,struct,sys,itertools
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'method'));from elf_reader import Elf
O=Elf(P/'original.so');C=Elf(P/'current-symbols.so');H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def ins(p):return struct.unpack('<BBhi',O.b[p:p+8])
def eq(p,x):assert ins(p)==x,(p,ins(p),x)
assert O.normalized[540216:544192]==C.normalized[368328:372304]and O.pattern(540216,3976)==C.pattern(368328,3976)
# Every preceding serialized member; IDL widths crosschecked, cursor actual stores.
fields=next(t for t in json.loads((P/'pump.json').read_text())['types']if t['name']=='Global')['type']['fields'];cursor=8;offsets={}
for f in fields:
 offsets[f['name']]=cursor;t=f['type'];cursor+=({'bool':1,'pubkey':32,'u64':8}[t]if isinstance(t,str)else 32*t['array'][1])
assert offsets['admin_set_creator_authority']==418
for pc,v in [(540296,8),(540384,9),(540464,41),(540616,73),(540800,81),(540872,89),(540944,97),(541016,105),(541120,113)]:assert ins(pc)[0]==7 and ins(pc)[3]==v,pc
# Pubkey helper consumes32; bool consumes1; full7key helper finalcursor+=224.
for pc,x in [(60152,(7,1,0,-32)),(60184,(7,3,0,32)),(60192,(123,0x32,0,0)),(51928,(7,3,0,-1)),(51960,(7,4,0,1)),(51968,(123,0x42,0,0)),(61256,(7,0,0,224)),(61264,(123,2,0,0))]:eq(pc,x)
for pc,t in [(541168,60128),(541336,51904),(541576,60400),(541736,60128),(541896,60128)]:assert O.calls[pc]==t
# Direct cursor arithmetic between bool and array:145+1+8+8=162.
eq(541440,(7,3,0,8));eq(541528,(7,2,0,16))
assert 113+32+1+16+224==386 and 386+32==418 and 418+32==450
# Preserve pubkey byte7/15 etc helper layout; assemble32bytes to decoded352.
for pc,x in [(541936,(99,0x1a,-517,0)),(541952,(99,0x1a,-520,0)),(541968,(123,0x1a,-544,0)),(541984,(123,0x1a,-536,0)),(542000,(115,0x1a,-528,0)),(543544,(99,0x16,352,0)),(543528,(99,0x16,355,0)),(543592,(123,0x16,367,0)),(543576,(123,0x16,375,0)),(543560,(115,0x16,383,0))]:eq(pc,x)
assert 432+(352+8-16)==776
# Complete authority decisions, before writes: admin compare then graduation.
for pc,x in [(177992,(7,2,0,776)),(178032,(121,0xa1,-1760,0)),(178048,(85,1,53,0)),(178072,(21,0,366,0)),(178176,(133,0x10,0,796464//8-(178176//8)-1)),(178200,(21,0,350,0)),(178560,(123,0x0a,-1792,0)),(185448,(121,0xa1,-1792,0)),(185472,(21,1,17,0)),(185552,(7,2,0,1408)),(185608,(85,0,1,0)),(185616,(5,0,-577,0))]:eq(pc,x)
assert O.calls[178024]==O.calls[178176]==O.calls[185584]==796464
# Failure is plain owned6016, no compared-values setter between creation/return.
assert ins(179048)[3]==6016 and ins(185760)[3]==6016 and O.calls[179120]==O.calls[185800]==709232
truth=[]
for g,a,c in itertools.product([False,True],repeat=3):truth.append({'graduated':g,'payer_is_admin':a,'payer_is_selected_creator':c,'authorized_after_required_pool_validation':a or c})
for n,h in json.loads((P/'manifest.json').read_text()).items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'serialized_admin_bytes':[418,450],'decoded_offset':352,'context_offset':776,'truth_table':truth,'pool_validation_precedes_graduated_authorization':True,'error':6016,'source_patch':None,'builds':0,'target_executions':0}))
