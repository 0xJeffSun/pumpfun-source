"""Build deterministic, explicitly scoped account/evidence crosswalks."""
import json,gzip,struct
from pathlib import Path
from elf_reader import ELF,H
P=Path(__file__).resolve().parent
# Fields follow public account order, not compiler-reordered initialization order.
FIELDS=[
('global','Box<Account<Global>>; canonical global PDA','same','0x1025b0 reader; 0x103b58 derive; 0x103c30 compare; 0x1041f0 error2006'),
('base_mint','Box<InterfaceAccount<Mint>>; dual-owner admission','same','0x102738 -> 0x288 -> 0x32d8'),
('quote_mint','UncheckedAccount; late quote helper','Box<InterfaceAccount<Mint>>','0x102890 -> 0x288 -> 0x32d8; relationship 0x104330..0x104538'),
('base_token_program','Interface<TokenInterface>','same','0x1029e8 -> 0x120 -> 0x9eb0; key membership and executable'),
('quote_token_program','Interface<TokenInterface>','same','0x102a30 -> 0x120 -> 0x9eb0; key membership and executable'),
('bonding_curve','Box<Account<BondingCurve>>; mut; canonical PDA','same plus asymmetric quote relation','0x102a78 reader; 0x103d18 PDA; 0x104320 mut; 0x1044d0 custom index4'),
('associated_base_bonding_curve','InterfaceAccount<TokenAccount>; mut; base ATA with token program','same','0x102c80 reader; 0x104630 program comparison; 0x104708 authority; 0x104970 ATA; 0x1049f8 key; 0x104b50 mut'),
('associated_quote_bonding_curve','Unchecked; mut; late token branch ATA/owner checks','Unchecked; mut; canonical ATA seeds even native','0x104b60..0x104e60: three 32-byte seeds; ATA ID; 0x104d58 derive; 0x104e30 compare; 0x104e58 mut'),
('user','Signer; mut','same','0x102da0 signer admission; 0x104e70 mut (error block 0x105578)'),
('associated_base_user','InterfaceAccount<TokenAccount>; mut; mint+authority+program','InterfaceAccount<TokenAccount>; mut; mint only','0x102de8 reader; 0x104e90 mut; 0x105138..0x1051d0 mint comparison; 0x1055f0 error2014; no added authority comparison in this interval'),
('associated_quote_user','Unchecked; mut; late helper checks','same; revised body helper','0x1051d8..0x1051e8 mut; 0x105688 error block'),
('user_volume_accumulator','Unchecked; mut; canonical PDA; no init or exit','Box<Account<UserVolumeAccumulator>>; init_if_needed payer=user space137','0x103608 PDA; 0x1038f8 init; 0x103928 mut; 0x103a10 rent; context+0x58; exit 0x107d80 -> 0x6158'),
('fee_config','Unchecked; explicit foreign owner; canonical PDA; late decode','Box<Account<BuyFeeConfig>>; early decode; stored bump PDA','0x103010 -> 0x3cc8; context+0x60; 0x1051f8 stored bump; 0x105300 derive; 0x105400 compare'),
('buyback_fee_recipient','Unchecked; mut; body membership','same, rewritten native/token preflight','0x105710 mut check; 0x105988 error2000; body preflight separately'),
('system_program','Program<System>','same','0x103160 reader; error label 0x103248'),
('event_authority','event_cpi injected AccountInfo; canonical PDA','same','0x1031b0 reader; 0x105710..0x105970 PDA block'),
('program','event_cpi injected AccountInfo','same','0x103300 reader; 0x103448 error label; no invented additional executable constraint')]
def contracts():
 e=ELF(P/'evidence/original.so'); rows=[]
 for i,(name,cur,prop,ev) in enumerate(FIELDS):
  # Exact bytes bind the literal independently from nearby concatenated strings.
  token=name.encode();occ=[]
  for sec in e.ss:
   if sec['type']==8 or not sec['flags']&2:continue
   d=e.data(sec);at=d.find(token)
   while at>=0:occ.append(sec['addr']+at);at=d.find(token,at+1)
  rows.append(dict(index=i,field=name,current=cur,proposal=prop,original_evidence=ev,literal_occurrences=occ,signer=i==8,writable=i in [5,6,7,8,9,10,11,13],limit='whole generated parser and transitive diagnostics not certified equivalent'))
 r=json.loads(gzip.decompress((P/'evidence/v3_configured_fee.json.gz').read_bytes()));old=json.loads((P/'evidence/regressions.json').read_text());s=[]
 for i,row in enumerate(r['cases']):
  if row['case']['operation']!='buy_v3':continue
  prev=next(x for x in old if x['index']==i);assert prev['case']==row['case'] and prev['original_error']==row['original']['error'] and row['match']==prev['match']
  ac=row['original']['accounts'];vol=[(k,v) for k,v in ac.items() if (v.get('data_hex') or '').startswith('56ff700e66359afa')];assert len(vol)==1
  k,v=vol[0];data=bytes.fromhex(v['data_hex']);s.append(dict(index=i,case=row['case'],original_error=row['original']['error'],match=row['match'],original_signature_verified=row['original']['signature_verified'],candidate_signature_verified=row['candidate']['signature_verified'],base_mint_owner=prev['base_mint_owner'],base_mint_size=prev['base_mint_size'],volume_poststate_key=k,volume_poststate_owner=v['owner'],volume_poststate_size=len(data),volume_poststate_user_is_zero=not any(data[8:40]),volume_poststate_equal=v==row['candidate']['accounts'][k],premise='saved post-state only; not fresh execution or proof of initial state; token extensions not decoded'))
 return dict(account_crosswalk=rows,preservation=dict(original_sha256=r['original_sha256'],candidate_sha256=r['candidate_sha256'],rows=s,count=len(s),successes=sum(x['original_error'] is None for x in s)))
if __name__=='__main__':print(json.dumps(contracts(),indent=2))
