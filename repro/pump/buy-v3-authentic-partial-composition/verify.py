#!/usr/bin/env python3
"""Standalone standard-library static verifier. Never builds or runs a target."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import hashlib,json,re,struct
from analyze import byte_ledger,preservation
from compose import compose
from elf_reader import ELF
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read(f):return (P/f).read_text()
def obj(f):return json.loads(read(f))
def verify():
    assert not any(p.is_symlink() for p in P.rglob('*')),'symlink'
    files={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
    m=obj('manifest.json')
    assert H((P/'manifest.json').read_bytes())==read('manifest.sha256').split()[0],'manifest seal'
    assert files==set(m)|{'manifest.json','manifest.sha256'},'inventory'
    for f,d in m.items():
        b=(P/f).read_bytes();assert len(b)==d['size'] and H(b)==d['sha256'],f
    owned=obj('owned-map.json');assert set(owned['files'])==files and owned['main_changes']==[]
    assert owned['integration_authorized'] is False
    for group in ['typed','optional','review','composition']:
        assert H((P/f'prior/{group}/manifest.json').read_bytes())==read(f'prior/{group}/manifest.sha256').split()[0]
    groups={'buy-v3-typed-parser-contract':'typed','buy-v3-optional-fill-contract':'optional',
        'buy-v3-authentic-parser-review':'review','buy-v3-source-composition':'composition'}
    for b in obj('input-bindings.json'):
        actual=(P/b['path']).read_bytes();assert H(actual)==b['sha256'] and len(actual)==b['size']
        parts=b['source'].split('/')
        if len(parts)>3 and parts[2] in groups and parts[-1] not in ['manifest.json','manifest.sha256']:
            pm=obj(f"prior/{groups[parts[2]]}/manifest.json");key='/'.join(parts[3:])
            pm=pm.get('files',pm)
            assert key in pm,b['path']
            member=pm[key]
            if isinstance(member,str):
                assert member==b['sha256'],b['path']
            else:
                assert member['sha256']==b['sha256'],b['path']
                size=member.get('size',member.get('bytes'))
                if size is not None:assert size==b['size'],b['path']
    for d in obj('source-applicability.json'):
        s=(P/d['excerpt']).read_bytes();assert H(s)==d['excerpt_sha256']
        assert len(s)==d['bytes'][1]-d['bytes'][0]
    for f,text in compose().items():assert read(f)==text,f
    assert byte_ledger()==obj('byte-ledger.json')
    saved=preservation();assert saved==obj('preservation-ledger.json')
    e=ELF(P/'evidence/original.so')
    assert H(e.b)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
    calls=[(0x128808,0x102578),(0x128930,0x147ba0),(0x128978,0x107b38),
        (0x102c80,0x38a8),(0x102de8,0x38a8),(0x38c0,0x1d0),
        (0x103300,0x136f0),(0x103010,0x3cc8),(0x1038f8,0x105b78),
        (0x107b80,0x5a28),(0x107d80,0x6158),(0x147c08,0x3cd50),
        (0x147c50,0x7e0b0),(0x147e30,0x1b3678),(0x1480b8,0x7f010),
        (0x148270,0xa0070),(0x148480,0x82af8),(0x1488c0,0x83c00)]
    for pc,target in calls:
        raw=e.at(pc,8);assert raw[:2]==b'\x85\x10' and pc+8+8*struct.unpack('<i',raw[4:])[0]==target,hex(pc)
    assert e.at(0x137b8,8)==bytes.fromhex('71812a0000000000')
    for pc,reg,imm in [(0x3978,2,216),(0x39e0,3,216),(0x137f0,2,3008),(0x13910,2,3009)]:
        assert e.at(pc,8)==struct.pack('<BBhi',0xb7,reg,0,imm)
    for d in obj('prior/review/data-contract.json'):
        assert e.at(d['address'],d['size']).hex()==d['bytes']
    ctx=read('source/buy_v3_context.rs');contract=obj('prior/typed/contracts.json')
    assert re.findall(r'pub (\w+):',ctx)==[x['field'] for x in contract['account_crosswalk']]
    assert len(contract['account_crosswalk'])==17 and '#[event_cpi]' not in ctx
    assert "pub program: Program<'info, crate::program::Pump>" in ctx
    for field in ['associated_base_bonding_curve','associated_base_user']:
        assert f"pub {field}: Box<InterfaceAccount<'info, TokenAccount>>" in ctx
    assert 'bump=fee_config.bump' in ctx and 'init_if_needed,payer=user,space=137' in ctx
    fee=read('source/fee_selection.rs');body=read('source/buy_v3_body.rs')
    assert 'pub fn decode(' not in fee and 'struct Decoded' not in fee and 'c: &FeeConfig' in fee
    assert body.count('&a.fee_config,')==2 and '.fee_config.decoded' not in body
    assert 'let residual_base=selected.residual_amount;' in body and 'buy_sub(requested,amount)' not in body
    order=['buy_domain(a)?','buy_prepare_curve(a)?','if a.bonding_curve.complete',
        'if a.bonding_curve.is_cashback_coin','body_amounts::amounts(', 'check_quote_buy(a)?',
        'token_interface::transfer_checked(', 'a.user_volume_accumulator.user == Pubkey::default()',
        'curve.protocol_fees=buy_add', 'let event=TradeEvent', 'buy_emit_cpi(&a.event_authority',
        'let completion=', 'if pool_base < residual_base']
    indices=[body.index(x) for x in order];assert indices==sorted(indices)
    # These checks expose the blocker, rather than turn it into a passing path.
    assert 'a.base_token_program.key()!=legacy' in read('source/admission.rs')
    assert 'crate::ReconstructionError::ReconstructionBranchUnsupported' in read('source/admission.rs')
    source='\n'.join(read(str(p.relative_to(P))) for p in (P/'source').glob('*') if p.is_file())
    assert not any(x in source for x in ['BuyV3Dispatch','ordinary_buy_domain','Accepted(SellV3','Context<SellV3>'])
    assert 'partial_fill.0' in read('source/wrapper.rs.fragment')
    volume=read('inputs/volume-type.rs')
    fields=re.findall(r'pub (\w+):(Pubkey|bool|u64|i64)',volume)
    assert len(fields)==11 and sum({'Pubkey':32,'bool':1,'u64':8,'i64':8}[t] for _,t in fields)+8==106
    assert obj('exit-contract.json')['volume']['allocation_bytes']==137
    assert obj('exit-contract.json')['volume']['preserved_tail_bytes']==137-106
    result=obj('result.json')
    for key in ['build_performed','runtime_performed','complete_authentic_source','proposal_preserves_saved_rows','whole_original_equal']:
        assert result[key] is False
    return dict(status='PASS',scope='static integrity, original byte anchors, deterministic partial source and retained receipts',
        files=len(files),saved_buy_rows=saved['count'],saved_successes=saved['successes'],
        complete_authentic_source=False,proposal_preserves_saved_rows=False,build_performed=False,runtime_performed=False)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
