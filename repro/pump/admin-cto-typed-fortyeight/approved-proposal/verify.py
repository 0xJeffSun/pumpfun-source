from pathlib import Path
import json,hashlib,struct,importlib.util,difflib,re
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 assert {str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}==set(m)
 for n,h in m.items():assert H((P/n).read_bytes())==h,n
 s=importlib.util.spec_from_file_location('d',P/'disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d);o=d.a.Elf((P/'original.so').read_bytes());c=d.a.Elf((P/'unstripped.so').read_bytes())
 for r in json.loads((P/'selected-original.json').read_text()):assert d.render(o,r['start'],r['end'])==(P/f'original-{r["start"]}.asm').read_text()
 for label,e in [('original',o),('candidate',c)]:
  for r in json.loads((P/'type-ledger.json').read_text())[label]:
   root='type-evidence'if label=='original'else'candidate-evidence';assert d.render(e,r['start'],r['end'])==(P/root/(str(r['start'])+'.asm')).read_text()
 ins=lambda pc:struct.unpack('<BBhi',o.at(pc,8))
 for pc,to in [(157056,1108280),(160904,1140504),(161848,1089760),(169008,1093816),(161904,1706296),(167008,1706296),(1237008,23080)]:
  op,r,off,imm=ins(pc);assert op==0x85 and pc+8+imm*8==to
 for pc,off in [(161056,8),(161072,16),(161088,24),(161104,32)]:assert ins(pc)==(0x7b,0x21,off,0)
 assert ins(161144)==(0x73,0x21,165,0)and ins(161160)==(0x73,0x41,163,0)and ins(161208)==(0x7b,0x21,112,0)and ins(161224)==(0x72,1,164,0)
 assert ins(146208)==(0xb7,5,0,0)and ins(147456)==(0x62,10,-568,6080)
 def lddw(pc):b=o.at(pc,16);return b[4:8]+b[12:16]
 for pc,name in [(770480,'AdminCtoEvent'),(784144,'CollectCreatorFeeEvent')]:assert lddw(pc)==hashlib.sha256(('event:'+name).encode()).digest()[:8]
 for pc,hexbytes in [(1108464,'01214eb921432c5c'),(1140688,'3c64909c408ab625'),(1089968,'2d3da597680031bd'),(1094000,'a039592ab58b2b42')]:assert lddw(pc).hex()==hexbytes
 spec=importlib.util.spec_from_file_location('cfg',P/'cfg.py');cfg=importlib.util.module_from_spec(spec);spec.loader.exec_module(cfg);assert cfg.run()==json.loads((P/'cfg-proof.json').read_text())
 before=(P/'before/admin_cto.rs').read_text();after=(P/'proposal/admin_cto.rs').read_text();assert ''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs'))==(P/'proposal.patch').read_text()
 assert before[before.index('fn token_frozen'):]==after[after.index('fn token_frozen'):]
 assert 'Box<Account<\'info,BondingCurve>>'in after and 'DistributionCurve'not in after and 'raw['not in after
 assert after.index('a.bonding_curve.creator=target;')<after.index('let pool_updated=')<after.index('let e=AdminCtoEvent')
 names=[]
 for line in(P/'PumpError.rs.txt').read_text().splitlines():
  match=re.fullmatch(r'\s*(\w+)(?:\s*=\s*(\d+))?,\s*',line)
  if match:names.append(match.group(1))
 assert names.index('CreatorFeeNotAllowedForCashbackCoin')+6000==6080
 return {'status':'PASS','source_files_changed':1,'builds':0,'target_executions':0,'initializer_or_stopped_paths_examined':False,'application_raw_identity':False}
if __name__=='__main__':print(json.dumps(run(),indent=2))
