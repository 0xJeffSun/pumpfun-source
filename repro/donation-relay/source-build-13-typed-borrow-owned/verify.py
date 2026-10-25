from pathlib import Path
import hashlib,json,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify():
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 assert H(P/'candidate.so')=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244';assert H(P/'unstripped.so')=='2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596'
 source=J(P/'source-map.json');assert len(source)==23;assert {str(p.relative_to(P/'source')):H(p) for p in(P/'source').rglob('*') if p.is_file()}==source==J(P/'evidence/runtime-plan/static-proof/plan-freeze.json')['source']
 assert H(P/'evidence/manifest.json')=='ad1e7ad15f4dcf2814106dad9ec2d44a74952951bb789abb5a7e32602eb58b64';s=importlib.util.spec_from_file_location('saved_evidence',P/'evidence/verify.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m.verify()
if __name__=='__main__':print(json.dumps(verify(),indent=2))
