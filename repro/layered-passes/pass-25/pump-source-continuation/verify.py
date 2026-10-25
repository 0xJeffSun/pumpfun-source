"""Portable source-only whole-text provenance; no build/VM/imported harness."""
from pathlib import Path
import argparse,hashlib,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify(R=None):
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];M=J(P/'manifest.json');assert set(M)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))not in('manifest.json','manifest.sha256')}
 for n,r in M.items():assert not(P/n).is_symlink()and H(P/n)==r['sha256']and(P/n).stat().st_size==r['bytes']
 p=J(P/'provenance.json');assert H(P/'inner98-manifest.json')==p['inner_seal']=='98c49ab1a0aaad83f51224df4aa44bbfb36308f53e8351dbed51298b87fdc67a';I=J(P/'inner98-manifest.json')
 for n,r in p['retained'].items():assert I[n]==r;assert H(P/'retained'/n)==r['sha256']
 a,b=p['source_order'];assert(P/a['after']).read_bytes()==(P/b['before']).read_bytes();assert(P/b['after']).read_bytes()==(P/'retained/source/programs/pump/src/admin_cto.rs').read_bytes();assert H(P/a['before'])=='1bdc3c4a53d1742627e9411230a508f5d37af8a4317163022820188dd3debf5a';assert H(P/a['after'])=='f98513b7c0b5e05a99060f4c2ef29ad1ff2a331b516a4771bdc8fdd6b1b01819';assert H(P/b['after'])=='918096a2dc44754f17b2172a0f2dcb834ce30f29b9f465b321961d35957c8282'
 if R:
  O=R/p['outer_publication'];assert H(O/'manifest.json')==p['outer_seal'];assert(O/'inner-manifest.json').read_bytes()==(P/'inner98-manifest.json').read_bytes()
  for n,r in p['retained'].items():assert H(O/'payload'/n)==r['sha256']
  N=R/p['main_publication'];assert H(N/'manifest.json')==p['main_seal'];assert(N/'main/source/programs/pump/src/admin_cto.rs').read_bytes()==(P/b['after']).read_bytes();assert(R/'programs/pump/src/admin_cto.rs').read_bytes()==(P/b['after']).read_bytes()
 return {'passed':True,'source_chain':['1bdc','f985_superseded_notselected','918_current71ec'],'whole_text_joins':2,'raw98_source_provenance_checked':True,'lossless_outer_checked_here':False,'full_outer_verifier_retains_lossless_split_obligation':True,'new_compiler_vm':0,'actual_current_checked':bool(R)}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);x=a.parse_args();print(json.dumps(verify(x.repo.resolve()if x.repo else None),indent=2))
