#!/usr/bin/env python3
"""Offline, standard-library evidence verification. Never executes target code."""
import hashlib,json,struct,sys,re
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def require(ok,msg):
 if not ok:raise SystemExit('FAIL: '+msg)
def j(name):return json.loads((P/name).read_text())
def digest(name):
 b=(P/name).read_bytes();return {'size':len(b),'sha256':H(b)}
seal=(P/'manifest.json').read_bytes()
require(H(seal)==(P/'manifest.sha256').read_text().strip(),'manifest seal')
m=json.loads(seal)
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
require(actual==set(m['files'])|{'manifest.json','manifest.sha256'},'sealed inventory (missing or extra file)')
require(not any(p.is_symlink() for p in P.rglob('*')),'symlinks forbidden')
for name,entry in m['files'].items():require(digest(name)==entry,'sealed file '+name)
checkpoint='476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40'
require(m['checkpoint']==checkpoint,'checkpoint')
inputs=j('input-manifest.json')
for row in inputs:
 require(digest(row['path'])=={'size':row['bytes'],'sha256':row['sha256']},'input '+row['path'])
 if 'checkpoint' in row['origin']:require(row['origin']['checkpoint']==checkpoint,'input revision')
for seal_name,files in [('prior-donation-manifest.json',{'prior-donation-report.md':'REPORT.md','prior-context-fragments.rs':'context-fragments.rs','disasm.py':'disasm.py'}),('prior-integrated-manifest.json',{'anchor_contexts.rs':'source/anchor_contexts.rs'})]:
 old=j('inputs/'+seal_name)['files']
 for local,original in files.items():require(digest('inputs/'+local)==old[original],'predecessor sealed binding '+local)
B=(P/'inputs/deployed.so').read_bytes();W=j('inputs/windows.json');starts={w['start']:i for i,w in enumerate(W)}
external={c['pc']:c for w in W for c in w['external_calls']}
rows=j('consumed-code.json');ledger=j('instruction-ledger.json')
require(len(rows)==len({r['ordinal'] for r in rows}),'duplicate consumed windows')
require({x['ordinal'] for x in rows}=={x['ordinal'] for x in ledger['windows']},'ledger set')
# Re-decode raw instructions independently of the text renderer.
for row,ev in zip(rows,ledger['windows']):
 o=row['ordinal'];a=row['start'];z=row['end']
 require((a,z)==(W[o]['start'],W[o]['end']),'range '+str(o))
 require(H(B[a:z])==row['sha256'],'window bytes '+str(o))
 calls=[];branches=[];errors=[];pcs=set()
 while a<z:
  pcs.add(a);op,r,off,imm=struct.unpack_from('<BBhi',B,a)
  if op==0x85:
   entry={'pc':a,'raw':B[a:a+8].hex(),'src':r>>4,'signed_imm':imm}
   if a in external:entry['relocation']=external[a].get('relocation')
   else:
    require(r>>4==1,'internal call source mode')
    target=a+8+imm*8;entry.update(target=target,target_ordinal=starts.get(target))
   calls.append(entry)
  elif op==0x8d:calls.append({'pc':a,'raw':B[a:a+8].hex(),'register_operand':imm,'kind':'indirect-call'})
  elif (op&7) in (5,6) and op not in (0x85,0x8d,0x95):branches.append({'pc':a,'raw':B[a:a+8].hex(),'target':a+8+off*8,'conditional':bool(op&240)})
  if op==0xb7 and r==2 and (imm==102 or 2000<=imm<=2029 or 3000<=imm<=3015 or imm==4101):errors.append({'pc':a,'code':imm,'raw':B[a:a+8].hex(),'meaning':'immediate load; construction/branch context required'})
  a+=16 if op==24 else 8
 require(a==z,'instruction boundaries')
 require(calls==ev['calls'] and branches==ev['branches'] and errors==ev['error_immediates'],'raw ledger '+str(o))
 require(all(x['target'] in pcs for x in branches),'in-window branch boundaries '+str(o))
import disasm
for row in rows:require((P/f"disassembly/{row['ordinal']:03}.txt").read_text()==disasm.render(row['ordinal']),'render '+str(row['ordinal']))
for x in j('consumed-source.json'):
 b=(P/x['path']).read_bytes();require(x['byte_range']==[0,len(b)] and x['sha256']==H(b) and x['line_range']==[1,len(b.splitlines())],'source ranges')
for x in j('consumed-literals.json'):
 b=B[x['start']:x['end']];require(b.hex()==x['hex'] and H(b)==x['sha256'],'literal '+x['label'])
for x in j('semantic-anchors.json'):
 require(W[x['ordinal']]['start']<=x['start']<x['end']<=W[x['ordinal']]['end'],'anchor containment')
 require(H(B[x['start']:x['end']])==x['sha256'],'anchor hash')
by_o={x['ordinal']:x for x in ledger['windows']}
for v in ledger['variants']:
 calls=by_o[v['parser']]['calls'];targets=[x.get('target_ordinal') for x in calls]
 chain=[v['epoch_initializer'],v['debouncer_initializer'],124]+([v['temporary_initializer']] if v['temporary_initializer'] else [])
 positions=[targets.index(t) for t in chain]
 require(positions==sorted(positions),'initializer chain '+v['instruction'])
 if v['temporary_initializer']:require(positions[-1]<targets.index(103),'native init-before-predicate')
 require(v['donation_authority']=='from','donor authority')
 require(v['payer']==('payer' if v['parser']==138 else 'from'),'funding authority')
 require(342 in targets,'stored whitelist bump derivation')
 require(targets.count(80)==(2 if v['parser']==138 else 1),'signer admissions')
# Exact key/seeds and source-level obligations; these are not execution tests.
S=(P/'source/context_adapters.rs').read_text();D=(P/'source/donation_contexts.rs').read_text()
alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
def key(s):
 n=0
 for c in s:n=n*58+alphabet.index(c)
 return n.to_bytes(32,'big')
for symbol,base58 in [('TOKEN','TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),('TOKEN2022','TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'),('NATIVE','So11111111111111111111111111111111111111112'),('NATIVE2022','9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP'),('ASSOCIATED','ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')]:
 match=re.search(r'pub const '+symbol+r': Key = \[([^]]+)\]',S)
 require(match is not None,'source constant '+symbol)
 val=bytes(map(int,match.group(1).split(',')));require(val==key(base58),'key value '+symbol)
 if symbol in ('TOKEN','TOKEN2022'):require(val==B[753024 if symbol=='TOKEN' else 753152:753056 if symbol=='TOKEN' else 753184],'binary program key')
# Reconstruct the native mint bytes from the exact inline machine immediates.
def u32(pc):return B[pc+4:pc+8]
def u64(pc):return B[pc+4:pc+8]+B[pc+12:pc+16]
for symbol,a,b,c,d,e in [('NATIVE',113648,113640,113624,113608,113584),('NATIVE2022',113736,113728,113712,113696,113672)]:
 assembled=bytearray(32);assembled[0:4]=u32(a);assembled[3:7]=u32(b);assembled[7:15]=u64(c);assembled[15:23]=u64(d);assembled[23:31]=u64(e);assembled[31]=1 if symbol=='NATIVE' else 94
 match=re.search(r'pub const '+symbol+r': Key = \[([^]]+)\]',S)
 require(bytes(assembled)==bytes(map(int,match.group(1).split(','))),'inline mint key '+symbol)
for phrase in ['pub fn parse_donation_accounts','pub fn program_account','pub fn destination_ata','pub fn native_temp','f.decode_checked(a,&kind)?','f.key(payer)!=f.key(a)','f.key(from)!=f.key(a)','saturating_sub(current)','f.allocate(a,n,seeds)?','f.initialize_account3(a,mint,from,program)?','f.create_pda(&[b"mint_whitelist_v1",&[a.whitelist_bump]])','check(native_pair(mint,program),6006','check(f.owner(a.source)==program,2023']:
 require(phrase in S,'source obligation '+phrase)
require(D.count('pub struct Donate')==5 and D.count('init_if_needed')==15 and D.count('#[account(init, payer = from')==2,'context init attributes')
require(D.count('constraint = native_pair')==2 and D.count('bump = mint_whitelist.bump')==5,'native/stored bump attributes')
require(D.count('tip_bps: u16, message: String, credited_to: Pubkey')==5,'complete argument declarations')
require(j('result.json')['counts_delta']=={'accepted_handlers':0,'completion':0,'runtime_cases':0},'acceptance boundary')
print(json.dumps({'status':'PASS','manifest_sha256':H(seal),'inputs':len(inputs),'consumed_windows':len(rows),'semantic_anchors':len(j('semantic-anchors.json')),'mode':'static integrity and structural checks only; no target execution'},sort_keys=True))
