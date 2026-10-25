from pathlib import Path
import argparse,hashlib,json,importlib.util,struct,difflib
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def verify(repo=None):
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']and'__pycache__'not in f.parts};assert actual==set(m)
 for n,h in m.items():assert H((P/n).read_bytes())==h,n
 old=(P/'before/trade.rs').read_text();new=(P/'proposal/trade.rs').read_text();start=old.index('pub fn buy(');end=old.index('pub fn buy_exact_quote(',start)
 a='    require!(!a.bonding_curve.is_cashback_coin,PumpError::CashbackCoinNotSupported);\n    require!(!a.bonding_curve.complete,PumpError::BondingCurveComplete);'
 b='    require!(!a.bonding_curve.complete,PumpError::BondingCurveComplete);\n    require!(!a.bonding_curve.is_cashback_coin,PumpError::CashbackCoinNotSupported);'
 assert old[start:end].count(a)==1 and new==old[:start]+old[start:end].replace(a,b)+old[end:]
 assert ''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/programs/pump/src/trade.rs',tofile='b/programs/pump/src/trade.rs'))==(P/'proposal.patch').read_text()
 s=importlib.util.spec_from_file_location('dis',P/'evidence/disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d);e=d.a.Elf((P/'evidence/original.so').read_bytes())
 for name in ['mode-helper','admitted-buy-caller']:
  row=json.loads((P/'evidence'/(name+'.json')).read_text());assert e.function(row['start'],row['bytes'],[])==row;assert d.render(e,row['start'],row['end'])==(P/'evidence'/(name+'.asm')).read_text()
 expected={516288:(0x55,2,29,0),516304:(0x55,4,116,0),516320:(0x15,3,114,0),516920:(0x62,10,-128,6005),517144:(0x62,10,-128,6094),517256:(0x95,0,0,0),1342504:(0x71,0x13,163,0),1342512:(0x71,0x12,161,0),1342536:(0xb7,4,0,0)}
 for pc,v in expected.items():assert struct.unpack('<BBhi',e.at(pc,8))==v,(pc,v)
 op,r,off,imm=struct.unpack('<BBhi',e.at(1342544,8));assert op==0x85 and r==0x10 and 1342544+8+imm*8==516272
 if repo:assert (Path(repo)/'programs/pump/src/trade.rs').read_bytes()==(P/'before/trade.rs').read_bytes()
 return {'verified':True,'changed_buy_checks':2,'other_source_unchanged':True,'exact_quote_unchanged':True,'builds':0,'runtime_cases':0}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--current-main',type=Path);a=p.parse_args();print(json.dumps(verify(a.current_main),indent=2))
