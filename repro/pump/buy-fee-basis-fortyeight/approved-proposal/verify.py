from pathlib import Path
import argparse,hashlib,json,importlib.util,struct,difflib
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def verify(repo=None):
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in [P/'manifest.json',P/'manifest.sha256']and '__pycache__'not in f.parts};assert actual==set(m)
 for n,h in m.items():assert H((P/n).read_bytes())==h,n
 old=(P/'before/trade.rs').read_text();new=(P/'proposal/trade.rs').read_text();start=old.index('pub fn buy(');assert old[:start]==new[:start]
 a='    let cap=curve.token_total_supply as u128*curve.virtual_quote_reserves as u128/curve.virtual_token_reserves as u128;';b='    let cap=(curve.token_total_supply as u128*curve.virtual_quote_reserves as u128).checked_div(curve.virtual_token_reserves as u128).ok_or(error!(PumpError::DivisionByZero))?;';replacement='    let cap=buy_fee_market_cap(curve, &a.base_mint)?;'
 tail=old[start:];assert tail.count(a)==1 and tail.count(b)==1
 body=old[:start]+tail.replace(a,replacement).replace(b,replacement)
 helper='''
// Buy-side pretrade fee basis recovered from the original mode selector.
fn buy_fee_market_cap(curve: &BondingCurve, mint: &Mint) -> Result<u128> {
    require!(curve.virtual_token_reserves != 0, PumpError::DivisionByZero);
    let selected_supply = if curve.is_mayhem_mode {
        curve.token_total_supply
    } else {
        mint.supply
    };
    Ok(u128::from(selected_supply) * u128::from(curve.virtual_quote_reserves)
        / u128::from(curve.virtual_token_reserves))
}
'''
 assert new==body+helper
 assert not any(n in new for n in ['fn buy_whitelist_after_base_transfer','fn update_buy_whitelist_virtual_quote'])
 patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/programs/pump/src/trade.rs',tofile='b/programs/pump/src/trade.rs'));assert patch==(P/'proposal.patch').read_text()
 spec=importlib.util.spec_from_file_location('elf',P/'evidence/analyze_elf.py');e=importlib.util.module_from_spec(spec);spec.loader.exec_module(e);elf=e.Elf((P/'evidence/original.so').read_bytes())
 spec=importlib.util.spec_from_file_location('dis',P/'evidence/disasm.py');d=importlib.util.module_from_spec(spec);spec.loader.exec_module(d)
 for row in json.loads((P/'evidence/selected-windows.json').read_text()):
  assert H(elf.at(row['start'],row['bytes']))==row['raw_sha256'];assert d.render(elf,row['start'],row['end'])==(P/'evidence'/('original-'+str(row['start'])+'.asm')).read_text()
 expected={657664:(0x79,0x27,64,0),657672:(0x15,7,26,0),657688:(0x71,0x21,154,0),657696:(0x15,1,2,0),657704:(0xbf,0x23,0,0),657712:(7,3,0,96),657720:(0x79,0x33,0,0),658280:(0x62,10,-120,6026),658408:(0x95,0,0,0)}
 for pc,v in expected.items():assert struct.unpack('<BBhi',elf.at(pc,8))==v,(pc,v)
 for pc,target in [(657784,1791432),(657840,1785992),(524328,657656)]:
  op,r,off,imm=struct.unpack('<BBhi',elf.at(pc,8));assert op==0x85 and r==0x10 and pc+8+imm*8==target
 if repo:assert (Path(repo)/'programs/pump/src/trade.rs').read_bytes()==(P/'before/trade.rs').read_bytes()
 return {'verified':True,'active_cap_substitutions':2,'new_helpers':1,'dormant_helpers':0,'sell_source_unchanged':True,'builds':0,'runtime_cases':0}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);args=p.parse_args();print(json.dumps(verify(args.repo),indent=2))
