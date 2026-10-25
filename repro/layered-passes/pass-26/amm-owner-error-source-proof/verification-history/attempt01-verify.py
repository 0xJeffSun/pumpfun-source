"""Portable bounded caller proof; no new original callee decoding or execution."""
from pathlib import Path
import argparse,json,hashlib,struct,tarfile,tomllib,gzip,importlib.util,difflib,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify(repo=None):
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink()and p.suffix!='.pyc'and p.name!='__pycache__'
 for n,h in m.items():assert H(P/n)==h,n
 S=P/'reviewed-scope';assert H(S/'manifest.json')=='c58152569d5a4ca2f3e7e1282e50fcc4593eec4f5c85b3adbe72087f8e3986a6';assert J(P/'admission.json')['reviewed_scope_seal']==H(S/'manifest.json');z=J(S/'scope.json');a=load(S/'method/analyze.py','elf');d=load(S/'method/disasm.py','disasm');e={side:a.Elf((S/'inputs'/n).read_bytes())for side,n in [('original','original.so'),('candidate','current-symbols.so')]}
 for side,rows in z['rows'].items():
  assert len(rows)==2
  for row in rows:
   b=e[side].at(row['start'],row['end']-row['start']);assert hashlib.sha256(b).hexdigest()==row['raw_sha256'];assert b==(P/'inspection'/side/f"{row['start']}.bin").read_bytes();assert d.render(e[side],row['start'],row['end'])==(P/'inspection'/side/f"{row['start']}.asm").read_text()
 for r in J(P/'consumed-data.json'):assert e[r['side']].at(r['address'],r['bytes']).hex()==r['hex']and hashlib.sha256(bytes.fromhex(r['hex'])).hexdigest()==r['sha256']
 ins=lambda side,pc:struct.unpack('<BBhi',e[side].at(pc,8))
 def check(side,pc,x):assert ins(side,pc)==tuple(x),(side,pc,ins(side,pc),x)
 def call(side,pc,target):
  op,regs,off,imm=ins(side,pc);assert op==133 and pc+8+imm*8==target,(side,pc,target)
 def branch(side,pc,target):
  op,regs,off,imm=ins(side,pc);assert op&7==5 and pc+8+off*8==target
 # Exact wrapper->handler roles and error exits.
 call('original',961184,142984);call('candidate',639344,781856);branch('original',961200,961216);call('original',961264,600312);call('original',961352,35280)
 # Ownercompare, then amount/zero, not reverse failure precedence.
 check('original',143008,[121,113,584,0]);check('original',143032,[183,3,0,32]);call('original',143040,1153248);branch('original',143064,143344);check('original',143344,[121,121,232,0]);branch('original',143352,143408);check('original',143376,[183,2,0,30]);check('original',143392,[183,2,0,2])
 check('candidate',781888,[121,97,24,0]);call('candidate',781920,1094400);branch('candidate',781944,784904);check('candidate',781960,[121,17,104,0]);branch('candidate',781976,785632);check('candidate',785648,[183,2,0,30]);check('candidate',785664,[183,2,0,2])
 # Both source records have comparedNone before conversion; only current decorates afterward.
 check('original',144360,[98,10,-248,6048]);check('original',144368,[114,10,-320,2]);check('original',144376,[98,10,-376,68]);check('original',144384,[122,10,-384,75]);call('original',144432,1060792);branch('original',144456,146968);check('original',146968,[123,22,8,0]);check('original',146976,[123,38,0,0])
 check('candidate',785296,[98,10,-352,6048]);check('candidate',785304,[114,10,-424,2]);check('candidate',785312,[98,10,-480,20]);check('candidate',785320,[122,10,-488,14]);call('candidate',785368,1002256);call('candidate',785600,1002792);branch('candidate',785624,788176)
 # Complete original error-success branch's last call is conversion, with immediate common return.
 old=next(r for r in z['rows']['original']if r['start']==142984);assert [c['target']for c in old['direct_calls']if 143072<=c['address']<=143248]==[480248,502688];assert not[c for c in old['direct_calls']if 144240<=c['address']<144432]
 # Local transfer/Clock/log/event-CPI and cleanup order, no new callee decoding.
 call('original',143768,468920);branch('original',143792,146968);call('original',143816,1076792);call('candidate',784216,943456);branch('candidate',784248,788176);call('candidate',784272,1018256);call('original',144928,1075840);call('original',146600,1075896);call('candidate',786136,1017304);call('candidate',787808,1017360);check('original',144896,[122,10,-200,120]);check('candidate',786096,[122,10,-96,120]);check('original',146664,[123,24,0,0]);check('candidate',787872,[123,24,0,0])
 # Exact FEE_OWNER source constant, directly consumed32-byte originals/current.
 alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';s='pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ';n=0
 for ch in s:n=n*58+alphabet.index(ch)
 owner=n.to_bytes(32,'big');assert owner==e['original'].at(1172956,32)==e['candidate'].at(1104960,32);assert s in(P/'baseline/trade.rs').read_text()
 # All correspondence claims use previously admitted ledger metadata only.
 ledger=json.load(gzip.open(S/'inputs/residual-ledger.json.gz','rt'));om={r['start']:r for r in ledger['original']};cm={r['start']:r for r in ledger['candidate']}
 for pair in J(P/'existing-target-metadata.json')['pairs']:assert pair['original']==om[pair['original']['start']]and pair['candidate']==cm[pair['candidate']['start']]and pair['normalized_equal']and pair['original']['normalized_sha256']==pair['candidate']['normalized_sha256']
 assert 'Error12with_pubkeys'in' '.join(J(P/'existing-target-metadata.json')['candidate_with_pubkeys']['names'])
 # Pinned dependency bytes and the exact natural one-line API change.
 arc=P/'dependency-source/anchor-lang-0.31.1.crate';lock=tomllib.loads((P/'baseline/Cargo.lock').read_text());assert H(arc)==next(p['checksum']for p in lock['package']if p['name']=='anchor-lang'and p['version']=='0.31.1')
 with tarfile.open(arc)as t:
  for n in ['lib.rs','error.rs']:assert(P/'dependency-source'/n).read_bytes()==t.extractfile('anchor-lang-0.31.1/src/'+n).read()
 lib=(P/'dependency-source/lib.rs').read_text();err=(P/'dependency-source/error.rs').read_text();assert 'return Err(error!($error_code).with_pubkeys(($value1, $value2)));'in lib and 'return Err(anchor_lang::error!($error));'in lib and 'let pubkeys = Some(ComparedValues::Pubkeys((pubkeys.0, pubkeys.1)));'in err
 before=(P/'baseline/collect.rs').read_text();after=(P/'proposal/collect.rs').read_text();assert after==before.replace('require_keys_neq!(*a.coin_creator.owner,crate::trade::FEE_OWNER,PumpAmmError::CreatorVaultMigratedToSharingConfig);','require!(*a.coin_creator.owner != crate::trade::FEE_OWNER,PumpAmmError::CreatorVaultMigratedToSharingConfig);');assert len([i for i,(x,y)in enumerate(zip(before.splitlines(),after.splitlines()),1)if x!=y])==1;assert after.splitlines()[19].startswith(' require!(');assert(P/'source.patch').read_text()==''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-amm/src/collect.rs',tofile='b/programs/pump-amm/src/collect.rs'))
 if repo:
  source=J(P/'baseline/source30.json');assert len(source)==30
  for n,h in source.items():assert H(repo/n)==h,n
  assert(repo/'programs/pump-amm/src/collect.rs').read_bytes()==(P/'baseline/collect.rs').read_bytes()
 return {'status':'PASS_UNEXECUTED_ONE_LINE_PROPOSAL','original_handler_bytes':4024,'current_handler_bytes':6368,'error_code':6048,'original_compared_values':'None','current_extra_decoration':'Pubkeys','changed_source_files':1,'current_file_line_truthful':True,'new_original_callee_body_decodes':0,'compiler_VM_runs':0,'owner6048_dynamic_coverage':'UNKNOWN','current_source30_checked':bool(repo)}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);x=a.parse_args();print(json.dumps(verify(x.repo),indent=2))
