#!/usr/bin/env python3
"""Offline static checks only. Never builds, executes Rust/SBF or creates fixtures."""
from pathlib import Path
import difflib,hashlib,io,json,re,struct,subprocess,sys,tarfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def need(ok,s):
    if not ok:raise ValueError(s)
def read(n):
    p=P/n
    need(not p.is_symlink() and p.resolve().is_relative_to(P),'unsafe member '+n)
    return p.read_bytes()
def js(n):return json.loads(read(n))
m=js('manifest.json')
need(H(read('manifest.json'))==read('manifest.sha256').decode().split()[0],'manifest anchor')
for p in P.rglob('*'):need(not p.is_symlink(),'symlink')
actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file()}
need(actual==set(m)|{'manifest.json','manifest.sha256'},'exact inventory')
for n,h in m.items():need(H(read(n))==h,'member '+n)
for r in js('checkpoint-inputs.json'):
    b=read(r['path']);need(len(b)==r['size'] and H(b)==r['sha256'],'checkpoint input '+r['path'])
    need(r['checkpoint']=='476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40','checkpoint')
for r in js('source-ranges.json'):
    b=read(r['path']);a,z=r['source_bytes'];lo,hi=r['source_lines'];lines=b.splitlines(True)
    need(len(b)==r['whole_size'] and H(b)==r['whole_sha256'],'whole source')
    need(0<=a<=z<=len(b) and H(b[a:z])==r['sha256'],'source bytes')
    need(b''.join(lines[lo-1:hi])==b[a:z],'source lines')
idl=js('idl-input.json');b=read('evidence/errors-original.json')
need(H(b)==idl['slice_sha256'] and len(b)==idl['source_bytes'][1]-idl['source_bytes'][0],'IDL slice')
need(json.loads(b)==js('evidence/errors.json'),'IDL values')
errors={x['code']:x['name'] for x in json.loads(b)}
for code,name in {6002:'TooMuchSolRequired',6020:'BuyZeroAmount',6021:'NotEnoughTokensToBuy',6024:'Overflow',6025:'Truncation',6026:'DivisionByZero',6096:'FeeTiersEmpty',6097:'FeeConfigTooShort'}.items():need(errors[code]==name,'error name')
archive=read('dependencies/solana-account-info-2.3.0.crate')
lock=read('baseline/programs/pump/Cargo.lock').decode()
section=lock.split('name = "solana-account-info"',1)[1].split('[[package]]',1)[0]
need('version = "2.3.0"' in section and H(archive) in section,'locked archive')
with tarfile.open(fileobj=io.BytesIO(archive),mode='r:gz') as t:
    need(t.extractfile('solana-account-info-2.3.0/src/lib.rs').read()==read('dependencies/account-info.rs'),'archive member')
prior_results=[]
for r in js('prior-seals.json'):
    need(H(read(r['manifest']))==r['manifest_sha256'],'unchanged prior seal')
    # Each is the preserved, reviewed static checker, without optional repo access.
    proc=subprocess.run([sys.executable,'-B',str(P/r['directory']/'verify.py')],cwd=P/r['directory'],capture_output=True,text=True)
    need(proc.returncode==0,'prior verifier '+r['directory']+' '+proc.stdout+proc.stderr)
    prior_results.append({'directory':r['directory'],'output':proc.stdout.strip()})
elf=read('prior/pump_buy_fee_selection_closure/evidence/original.so')
need(len(elf)==10485715 and H(elf)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d','original ELF')
shoff=struct.unpack_from('<Q',elf,40)[0];sz,num=struct.unpack_from('<HH',elf,58)
sections=[struct.unpack_from('<IIQQQQIIQQ',elf,shoff+i*sz) for i in range(num)]
def code(pc,n):
    hits=[s[4]+pc-s[3] for s in sections if s[2]&4 and s[3]<=pc and pc+n<=s[3]+s[5]]
    need(len(hits)==1,'executable mapping '+hex(pc));return elf[hits[0]:hits[0]+n]
rows=0;covered=set()
for w in js('new-windows.json')['windows']:
    b=read(w['path']);lo,hi=w['elf_range'];cursor=lo
    need(H(b)==w['slice_sha256'] and H(code(lo,hi-lo))==w['elf_sha256'],'window hash')
    for line in b.decode().splitlines():
        match=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+)',line)
        need(match is not None,'asm line');pc=int(match[1],16);raw=bytes.fromhex(match[2])
        need(pc==cursor and code(pc,len(raw))==raw,'opcode '+hex(pc));cursor+=len(raw);rows+=1;covered.update(range(pc,cursor))
    need(cursor==hi,'window extent')
for e in js('edges.json'):
    pc=e['pc'];need(all(x in covered for x in range(pc,pc+8)),'edge scope')
    raw=code(pc,8);need(raw.hex()==e['bytes'],'edge bytes')
    op,reg,off,imm=struct.unpack('<BBhi',raw)
    if e['kind']=='call':need((op,reg)==(0x85,0x10),'call');target=pc+8+8*imm
    else:need(op&7==5 and op not in (0x85,0x95),'branch');target=pc+8+8*off
    need(target==e['target'],'signed operand')
# Independently chosen control-flow anchors, not just generated edge inventory.
for pc,target in {0x147c08:0x3cd50,0x3cf48:0x3d250,0x3d4c8:0x1a0a20,0x3d598:0x1a0ae8,0x3dc50:0x19e090,0x7f600:0x14910,0x7f868:0x160d0,0x7f908:0x7e490,0x148078:0x340,0x82800:0x340,0x82ab8:0x340}.items():
    op,reg,off,imm=struct.unpack('<BBhi',code(pc,8));need((op,reg)==(0x85,0x10) and pc+8+8*imm==target,'critical call '+hex(pc))
for pc,target in {0x3cf70:0x3d230,0x7f150:0x7f888}.items():
    op,reg,off,imm=struct.unpack('<BBhi',code(pc,8));need(op&7==5 and pc+8+8*off==target,'critical branch')
# Exact overlay and byte-preserved other handler source.
patch=''
for name in ['lib.rs','trade.rs','buy_v3_fee.rs','buy_v3_admission.rs']:
    rel='programs/pump/src/'+name;old=P/'baseline'/rel;new=read('proposed/'+rel).decode()
    patch+=''.join(difflib.unified_diff(old.read_text().splitlines(True) if old.exists() else [],new.splitlines(True),fromfile='a/'+rel if old.exists() else '/dev/null',tofile='b/'+rel))
need(patch==read('baseline.patch').decode(),'exact baseline patch')
before=read('baseline/programs/pump/src/lib.rs').decode();after=read('proposed/programs/pump/src/lib.rs').decode()
need(after==before.replace('pub fn buy_v3(ctx: Context<SellV3>','pub fn buy_v3(ctx: Context<BuyV3>',1),'only wrapper context change')
before=read('baseline/programs/pump/src/trade.rs').decode();after=read('proposed/programs/pump/src/trade.rs').decode()
lo=before.index('pub fn buy(');hi=before.index('pub fn buy_exact_quote(',lo)
newlo=after.index('pub fn buy(');newhi=after.index('pub fn buy_exact_quote(',newlo)
need(before[:lo]==after[:newlo],'prefix opaque preservation')
suffix=before[hi:];need(after[newhi:newhi+len(suffix)]==suffix,'all other handlers preserved')
extra=after[newhi+len(suffix):];need(extra.lstrip().startswith('// Dedicated BuyV3 context'),'only appended context/helpers')
body=after[newlo:newhi];fee=read('proposed/programs/pump/src/buy_v3_fee.rs').decode();admit=read('proposed/programs/pump/src/buy_v3_admission.rs').decode()
def ordered(s,items):
    pos=-1
    for item in items:
        pos=s.index(item,pos+1)
ordered(body,['buy_domain(a)?','buy_prepare_curve(a)?','if a.bonding_curve.complete','if a.bonding_curve.is_cashback_coin','let amount=amount.min','check_quote_buy(a)?','mint_supply:a.base_mint.supply','let fees=buy_fee::ordinary_leg','let second=buy_fee::ordinary_leg','if user_output>max_sol_cost','curve.virtual_token_reserves=','token_interface::transfer_checked','if a.user_volume_accumulator.user','curve.protocol_fees=','curve.creator_fee=','let native_input=','native_curve.try_borrow_mut_lamports','native_recipient.lamports()','let event=TradeEvent','emit!(event.clone())','a.bonding_curve.complete=true','emit!(completion.clone())','if pool_base < residual_base','let pool_quote_after=buy_add','let post=PostCompleteBuyEvent'])
need(body.count('buy_emit_cpi(')==3 and 'emit_cpi!(' not in body,'event borrow interface')
need(body.count('buy_fee::ordinary_leg(')==2 and 'buy_fee::decode(' not in body,'early decode/two pricing legs')
for s in ['with_values((max_sol_cost,user_output))','with_values((base,residual_base))','creator_fee_unclaimed:curve.creator_fee','fee_basis_points:second.protocol_fee_bps','creator_fee_basis_points:second.creator_fee_bps','total_unclaimed_tokens:a.user_volume_accumulator.total_unclaimed_tokens','let native_input=buy_add(curve_payment,combined_buyback)?']:
    need(s in body,'composition '+s)
for s in ['pub struct BuyV3',"Box<InterfaceAccount<'info, Mint>>",'space=137','bump=fee_config.decoded.bump','seeds::program=anchor_spl::associated_token::ID','#[account(mut,token::mint=base_mint)]','mod buy_fee { include!("buy_v3_fee.rs"); }','include!("buy_v3_admission.rs");']:
    need(s in extra,'context interface '+s)
need('token::authority=user' not in extra,'no invented base user authority')
ordered(fee,['if s.virtual_base == 0','if serialized_len < 2512','if serialized_len <= 4072','serialized_len > 4096','if s.creator_configurable && s.curve_creator_bps != 0','let protocol_amount = ceiling_fee','let creator_amount = if s.creator_key'])
need(fee.count('if s.creator_configurable && s.curve_creator_bps != 0')==1,'single override')
for name,pc in [('QUOTE_1',0x1b5cc8),('QUOTE_2',0x1b5a88),('QUOTE_SECOND',0x1b5d28)]:
    vals=re.search(r'pub const '+name+r': \[u8; 32\] = \[([^]]+)\]',fee)[1]
    need(bytes(map(int,vals.split(',')))==elf[pc:pc+32],'quote literal')
for s in ['impl Owner for BuyFeeConfig','impl AccountDeserialize for BuyFeeConfig','impl AccountSerialize for BuyFeeConfig','.with_account_name("FeeConfig")']:
    need(s in fee,'typed fee interface')
for s in ['let fees=buy_add(a.bonding_curve.creator_fee,a.bonding_curve.protocol_fees)?','buy_add(a.bonding_curve.real_quote_reserves,fees)?','lamports().saturating_sub(reserved)','minimum-available','authority:Option<Pubkey>','with_pubkeys((token.owner,expected))']:
    need(s in admit,'admission '+s)
print(json.dumps({'status':'PASS','scope':'static evidence and source structure only; uncompiled; no fixtures or target execution','sealed_members':len(m),'new_instruction_rows':rows,'new_edges':len(js('edges.json')),'prior_verifiers':prior_results},indent=2))
