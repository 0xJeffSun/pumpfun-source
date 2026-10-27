"""Compare stored selected files and the research Fees ELF without rewriting."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
s=importlib.util.spec_from_file_location('raw_elf',HERE/'elf_helpers.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
SELECTED={'pump':('repro/pump/remaining-guards-main-fortyeight/main/candidate.so','71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c'),'pump_amm':('repro/pump_amm/owner6048-v144/main/candidate.so','09bee0dfd751dc6ae0240bbac262933c6bda6e0c94aa643f82c57f2956c3a117'),'pump_fees':('repro/pump_fees/sharing-authorize-main-v144/main/candidate.so','2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af'),'mayhem':('repro/mayhem/compiler-v154-main/main/candidate.so','ca5d4f54b14e2f67c4eca56fcac29b54801906cecf23c463801916fd9d6b6621')}
def compare():
 out={};sha=lambda b:hashlib.sha256(b).hexdigest()
 for label,(name,expected)in SELECTED.items():
  a=(ROOT/f'evidence/original/{label}/deployed.so').read_bytes();b=(ROOT/name).read_bytes();assert sha(b)==expected
  out[label]=dict(scope='Stored selected artifacts; no fresh compilation of this program.',original_sha256=sha(a),candidate_sha256=sha(b),original_bytes=len(a),candidate_bytes=len(b),capture_equal=a==b,elf_extent_equal=a[:m.elf_layout(a)['elf_extent']]==b)
 a=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();e=json.loads((HERE/'experiment.json').read_text());d=e['variants']['origins']['files']['candidate'];b=gzip.decompress((HERE/d['path']).read_bytes());assert sha(b)==d['sha256']
 out['research_fees']=dict(scope='Freshly compiled proposal.',original_sha256=sha(a),candidate_sha256=sha(b),original_bytes=len(a),candidate_bytes=len(b),capture_equal=a==b,elf_extent_equal=a[:m.elf_layout(a)['elf_extent']]==b)
 return out
if __name__=='__main__':print(json.dumps(compare(),indent=2))
