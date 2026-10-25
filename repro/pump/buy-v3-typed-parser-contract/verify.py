#!/usr/bin/env python3
"""Offline public-artifact verifier. No builds, target execution or fixture creation."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import hashlib,json,re,struct,tomllib
from analyze import analyze,RANGES
from elf_reader import ELF
from prior_contracts import contracts as previous_contracts
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def verify():
 files={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
 assert not any(p.is_symlink() for p in P.rglob('*')),'symlink'
 m=json.loads((P/'manifest.json').read_text())
 assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 assert files==set(m)|{'manifest.json','manifest.sha256'},'inventory mismatch'
 for f,d in m.items():
  b=(P/f).read_bytes();assert len(b)==d['size'] and H(b)==d['sha256'],f
 own=json.loads((P/'owned-map.json').read_text());assert set(own['files'])==files and own['main_changes']==[]
 bindings=json.loads((P/'input-bindings.json').read_text())
 locks=tomllib.loads((P/'evidence/Cargo.lock').read_text())['package']
 for d in bindings:
  b=(P/d['path']).read_bytes();assert H(b)==d['sha256'] and len(b)==d['size']
  if 'registry_package_checksum' in d:
   assert d['registry_package_checksum'] in {p.get('checksum') for p in locks}
 assert H((P/'evidence/prior-manifest.json').read_bytes())==(P/'evidence/prior-manifest.sha256').read_text().split()[0]
 pm=json.loads((P/'evidence/prior-manifest.json').read_text())
 for b in bindings:
  src=b['source'];marker='../buy_authentic_parser_review/publication/'
  if src.startswith(marker) and src[len(marker):] in pm:
   assert b['sha256']==pm[src[len(marker):]]['sha256']
 a=analyze();assert a==json.loads((P/'analysis.json').read_text())
 assert a['original_sha256']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
 e=ELF(P/'evidence/original.so')
 for pc,target in [(0x102c80,0x38a8),(0x102de8,0x38a8),(0x38c0,0x1d0),(0x103300,0x136f0),(0x103010,0x3cc8),(0x3ce0,0x133e0),(0x13498,0x92d0),(0x9560,0x1156f0),(0x1038f8,0x105b78),(0x107b80,0x5a28),(0x107d80,0x6158),(0x13798,0x1b3678)]:
  raw=e.at(pc,8);assert raw[:2]==bytes([0x85,0x10]) and pc+8+8*struct.unpack('<i',raw[4:])[0]==target
 for pc,reg,imm in [(0x3978,2,216),(0x39e0,3,216),(0x3da8,2,144),(0x137f0,2,3008),(0x13910,2,3009)]:
  assert e.at(pc,8)==struct.pack('<BBhi',0xb7,reg,0,imm)
 assert e.at(0x137b8,8)==bytes.fromhex('71812a0000000000')
 data=json.loads((P/'evidence/prior-data-contract.json').read_text())
 for d in data:assert e.at(d['address'],d['size']).hex()==d['bytes']
 pump=next(d for d in data if d['name']=='Pump_owner')
 assert pump['address']==0x1b79df
 checked=0
 for f in (P/'evidence').glob('*.asm'):
  n=0
  for line in f.read_text().splitlines():
   match=re.match(r'^\s*([0-9a-fA-F]{4,16}):\s*((?:[0-9a-fA-F]{2} ){7,15}[0-9a-fA-F]{2}|[0-9a-fA-F]{16,32})\s',line)
   if match:
    b=bytes.fromhex(match[2]);assert e.at(int(match[1],16),len(b))==b;n+=1
  assert n;checked+=n
 prior=previous_contracts();assert prior==json.loads((P/'evidence/prior-contracts.json').read_text())
 assert prior['preservation']['count']==117 and prior['preservation']['successes']==105
 assert all(r['match'] and r['volume_poststate_equal'] for r in prior['preservation']['rows'])
 c=json.loads((P/'contracts.json').read_text());src=(P/'source/buy_v3_context.rs').read_text()
 names=re.findall(r'pub (\w+):',src)
 assert names==[r['field'] for r in c['account_crosswalk']] and len(names)==17
 assert '#[event_cpi]' not in src
 assert "pub program: Program<'info, crate::program::Pump>" in src
 for field in ['associated_base_bonding_curve','associated_base_user']:
  assert f"pub {field}: Box<InterfaceAccount<'info, TokenAccount>>" in src
 assert 'bump=fee_config.bump' in src and 'init_if_needed,payer=user,space=137' in src
 assert '#[account(mut,token::mint=base_mint)]' in src
 assert '(bonding_curve.quote_mint == Pubkey::default() && quote_mint.key() == WSOL)' in src
 assert 'buy_domain' not in src and 'fn buy(' not in src
 assert [i for i,r in enumerate(c['account_crosswalk']) if r['writable']]==[5,6,7,8,9,10,11,13]
 assert not c['full_parser_identity'] and not a['proposal_compiled']
 return dict(status='PASS',scope='static integrity, original byte anchors, source shape and retained finite receipts only',files=len(files),windows=len(a['windows']),window_bytes=sum(r['size'] for r in a['windows']),assembly_rows=checked,saved_buy_rows=117,saved_successes=105,compiled=False,target_executed=False,complete_parser_identity=False,main_changes=[])
if __name__=='__main__':print(json.dumps(verify(),indent=2))
