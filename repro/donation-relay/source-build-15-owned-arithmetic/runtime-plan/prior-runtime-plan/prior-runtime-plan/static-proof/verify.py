from pathlib import Path
import hashlib,json,importlib.util,struct,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();j=lambda p:json.loads(p.read_text())
def main():
 m=j(P/'manifest.json');assert h(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];assert set(m)=={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f not in[P/'manifest.json',P/'manifest.sha256']}
 for f in P.rglob('*'):assert not f.is_symlink() and f.suffix!='.pyc' and not f.name.endswith('-keypair.json')
 for n,d in m.items():assert h(P/n)==d,n
 assert h(P/'plan-manifest.json')=='cc2c3d92595496838f51d8f3ff244c5d585095179ab84533e48d19e3f9937ada'
 z=j(P/'plan-freeze.json');actual={str(f.relative_to(P/'source')):h(f) for f in(P/'source').rglob('*') if f.is_file()};assert actual==z['source']==j(P/'build-records/build-result.json')['source_after'];assert len(actual)==23;assert [n for n in actual if actual[n]!=z['baseline_source'][n]]==['src/idl.rs'];assert j(P/'runner-exit.json')['returncode']==j(P/'build-records/build-result.json')['returncode']==0;assert not j(P/'backend-diagnostics.json')['failures']
 assert h(P/'static/candidate.so')=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244';assert h(P/'static/unstripped.so')=='2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596'
 s=importlib.util.spec_from_file_location('a',P/'method/analyze.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a);e=a.Elf((P/'static/unstripped.so').read_bytes());o=a.Elf((P/'static/original.so').read_bytes());b=a.Elf((P/'baseline-unstripped.so').read_bytes());ins=lambda x,pc:struct.unpack('<BBhi',x.at(pc,8))
 for side,elf in [('candidate',e),('original',o)]:
  for f in j(P/f'static/{side}-function-ledger.json'):assert hashlib.sha256(elf.at(f['start'],f['bytes'])).hexdigest()==f['raw_sha256']
 def call(pc,target):
  op,r,off,imm=ins(e,pc);assert op==133 and pc+8+8*imm==target
 for pc,target in[(327568,370560),(327960,370560),(327664,324792),(328056,323544),(329360,326880),(329544,67336)]:call(pc,target)
 assert ins(e,327608)==(0x1d,0x21,1,0);assert ins(e,327616)[2]==112 # failure ->328520
 assert ins(e,328552)==(7,4,0,-128);assert ins(e,328680)==(183,2,0,128)
 assert ins(e,328800)==(123,116,48,0) and ins(e,328808)==(123,36,40,0) and ins(e,328816)==(123,20,32,0)
 assert ins(e,328824)==(114,4,56,2) and ins(e,328832)==(122,4,0,2)
 # Failed acquisition's straight-line conversion/return has no guard decrement.
 for pc in range(328520,328912,8):assert ins(e,pc)!=(7,1,0,-1)
 assert ins(e,329352)==(183,5,0,1);assert e.at(425601,3)==b'idl'
 assert ins(b,325720)==(98,8,24,115) and ins(e,325720)==(98,8,24,123)
 pairs=j(P/'role-comparisons.json');assert all(f['normalized_equal'] for f in pairs if f['after_start'] not in[324792,326880])
 summary=j(P/'static/comparison-summary.json');assert summary['original_inferred_windows']==492 and summary['candidate_symbol_windows']==330 and summary['original_normalized_match_windows']==122 and summary['unmatched_original_windows']==370 and not summary['whole_file_equal']
 return {'status':'PASS','source_inputs':23,'changed':['src/idl.rs'],'original_windows':492,'candidate_windows':330,'normalized_matches':122,'unmatched_original':370,'checked_owned_conversion_static':True,'actual_3002_line_before':115,'actual_3002_line_after':123,'target_executions':0,'runtime_acceptance':False}
if __name__=='__main__':print(json.dumps(main(),indent=2))
