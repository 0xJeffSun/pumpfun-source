from pathlib import Path
import hashlib,json,gzip,struct,difflib,sys,argparse
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));import disasm
H=lambda b:hashlib.sha256(b).hexdigest()
def run(root=None):
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().strip()
 assert {str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f not in [P/'manifest.json',P/'manifest.sha256']}==set(m)
 assert not any(f.is_symlink() or f.name=='__pycache__' or f.suffix=='.pyc' for f in P.rglob('*'))
 for n,h in m.items():assert H((P/n).read_bytes())==h,n
 binding=json.loads((P/'binding.json').read_text());assert H((P/'original.so').read_bytes())==binding['original_sha256'];assert H((P/'current.so').read_bytes())==binding['symbols_sha256']
 es={k:disasm.a.Elf((P/('original.so' if k=='original' else 'current.so')).read_bytes()) for k in ['original','candidate']}
 counts={}
 for k,e in es.items():
  fs=json.load(gzip.open(P/f'{k}-ledger.json.gz'));counts[k]=len(fs)
  for f in fs:assert H(e.at(f['start'],f['bytes']))==f['raw_sha256']
  for f in json.loads((P/'selection.json').read_text())[k]:assert disasm.render(e,f['start'],f['end'])==(P/k/f"{f['start']}.asm").read_text()
 o=es['original'];c=es['candidate'];ins=lambda e,p:struct.unpack('<BBhi',e.at(p,8))
 assert ins(o,143344)==(0x55,2,2579,0);assert ins(o,164376)==(0x62,10,-568,6088);assert ins(c,442168)==(0x62,10,-1752,6088)
 assert struct.unpack('<I',o.at(1793432,4))[0]==88
 assert o.at(1804771,26)==b'CtoNotAllowedForMayhemCoin'
 assert o.at(1808354,40)==b'CTO is not allowed on a mayhem-mode coin'
 for p,t in [(164016,1405824),(164160,1433224),(164448,1686320),(1236928,141840),(1237008,23080)]:
  op,r,off,imm=ins(o,p);assert op==133 and p+8+imm*8==t
 b=(P/'before/admin_cto.rs').read_text();a=(P/'proposal/admin_cto.rs').read_text();assert a==b.replace('if a.bonding_curve.is_mayhem_mode{return Err(err(6088));}','if a.bonding_curve.is_mayhem_mode{return Err(error!(PumpError::CtoNotAllowedForMayhemCoin));}')
 assert ''.join(difflib.unified_diff(b.splitlines(True),a.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs'))==(P/'source.patch').read_text()
 if root:
  for n in ['admin_cto.rs','lib.rs']:assert (root/'programs/pump/src'/n).read_bytes()==(P/'before'/n).read_bytes(),n
 return {'status':'PASS','complete_raw_function_hashes':counts,'builds':0,'target_executions':0,'changed_guards':1,'whole_application_identity':False}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--current-main',type=Path);args=ap.parse_args();print(json.dumps(run(args.current_main),indent=2))
