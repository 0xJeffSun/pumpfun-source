#!/usr/bin/env python3
"""Static evidence verifier only: no compilation, SBF execution or fixtures."""
from pathlib import Path
import hashlib,json,re,struct,difflib
P=Path(__file__).resolve().parent
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return (P/p).read_bytes()
def js(p):return json.loads(read(p))
def need(condition,message):
 if not condition:raise ValueError(message)
m=js('manifest.json')
need(sha(read('manifest.json'))==read('manifest.sha256').decode().split()[0],'manifest seal')
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}-{'manifest.json','manifest.sha256'}
need(actual==set(m),'inventory')
for p,h in m.items():need(sha(read(p))==h,'member '+p)
for entry in js('inputs.json'):
 if 'file' not in entry:continue
 b=read(entry['file']);need(len(b)==entry['size'] and sha(b)==entry['sha256'],'input '+entry['file'])
 for a,z in entry['consumed_bytes']:need(0<=a<=z<=len(b),'input range')
 if 'git_blob' in entry:need(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==entry['git_blob'],'git blob')
for x in js('prior-members.json'):need(js(x['seal'])[x['member']]==sha(read(x['file'])),'prior seal '+x['file'])
b=read('evidence/original.so');covered=set();count=0
for w in js('windows.json'):
 a,z=w['elf_range'];cursor=a
 for line in read(w['file']).decode().splitlines():
  match=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+)',line)
  need(match is not None,'assembly parse')
  at=int(match[1],16);raw=bytes.fromhex(match[2]);need(at==cursor,'contiguous excerpt')
  need(b[at:at+len(raw)]==raw,'opcode '+hex(at));cursor+=len(raw);covered.update(range(at,at+len(raw)));count+=1
 need(cursor==z,'extent '+w['name'])
def ins(a):
 need(all(x in covered for x in range(a,a+8)),'assertion outside code ledger')
 return struct.unpack_from('<BBhi',b,a)
a=js('assertions.json')
for pc,target in a['calls']:
 op,reg,off,imm=ins(pc);need((op,reg)==(0x85,0x10) and pc+8+8*imm==target,'call '+hex(pc))
for pc,target in a['branches']:
 op,reg,off,imm=ins(pc);need(op in [0x05,0x15,0x25,0x55] and pc+8+8*off==target,'branch '+hex(pc))
for pc,op,reg,off,imm in a['instructions']:
 need(ins(pc)==(op,reg,off,imm),'operand '+hex(pc))
for pc,raw in a['literals']:need(b[pc:pc+len(bytes.fromhex(raw))]==bytes.fromhex(raw),'literal '+hex(pc))
helper=read('proposed/buy_v3_fee.rs').decode()
for name,pc in [('QUOTE_1',0x1b5cc8),('QUOTE_2',0x1b5a88),('QUOTE_SECOND',0x1b5d28)]:
 match=re.search(r'pub const '+name+r': \[u8; 32\] = \[([^]]+)\]',helper)
 need(match is not None,'constant missing');need(bytes(map(int,match[1].split(',')))==b[pc:pc+32],'quote '+name)
out=read('proposed/trade.rs').decode()
def split_buy(s):
 lo=s.index('pub fn buy(');hi=s.index('pub fn ',lo+1);return s[:lo],s[lo:hi],s[hi:]
for base,diff in [('prior/partial-trade.rs','minimal.diff'),('prior/event-trade.rs','after-event.diff')]:
 before=read(base).decode();x=split_buy(before);y=split_buy(out)
 need(x[0]==y[0] and x[2]==y[2],'outside BuyV3 changed')
 expected=''.join(difflib.unified_diff(before.splitlines(True),out.splitlines(True),fromfile=base,tofile='proposed/trade.rs'))
 need(expected==read(diff).decode(),'exact delta '+diff)
f=split_buy(out)[1]
need('mint_supply:a.base_mint.supply' in f,'actual supply')
need(f.count('buy_fee::ordinary_leg(')==2,'two legs')
need('ordinary_leg(config,&pretrade,quote)' in f and 'ordinary_leg(ordinary_config.as_ref().unwrap(),&pretrade,residual_quote)' in f,'same snapshot')
need('creator_fee_unclaimed:if normal{curve.creator_fee}else{first_creator}' in f,'event correction preserved')
need('fee_basis_points:second.protocol_fee_bps' in f and 'creator_fee_basis_points:second.creator_fee_bps' in f,'F2 rates')
need(helper.count('if s.creator_configurable && s.curve_creator_bps != 0')==1,'single override')
need(helper.index('let protocol_amount = ceiling_fee')<helper.index('let creator_amount = if s.creator_key'),'fee error order')
need(helper.index('if s.virtual_base == 0')<helper.index('if c.serialized_len < 2512'),'threshold order')
need('c.serialized_len <= 4072' in helper and 'c.serialized_len > 4096' in helper,'length predicates')
for x in js('source-ledger.json'):
 s=read(x['file']);lo,hi=x['range'];need(sha(s[lo:hi])==x['slice_sha256'],'source slice '+x['file'])
print(json.dumps({'status':'pass','instruction_records':count,'call_assertions':len(a['calls']),'branch_assertions':len(a['branches']),'operand_assertions':len(a['instructions']),'execution':'static verification only'},sort_keys=True))
