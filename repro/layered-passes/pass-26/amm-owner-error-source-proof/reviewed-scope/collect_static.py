"""UNEXECUTED bounded static collector; default hash/metadata gates only."""
from pathlib import Path
import json,hashlib,argparse,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--inspect',action='store_true');a.add_argument('--output',type=Path);x=a.parse_args();assert H(P/'manifest.json')==x.reviewed_plan_sha256==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f not in[P/'manifest.json',P/'manifest.sha256']}
 for f in P.rglob('*'):assert not f.is_symlink() and f.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h
 z=J(P/'scope.json');e=load(P/'method/analyze.py','elf');elves={k:e.Elf((P/'inputs'/n).read_bytes()) for k,n in [('original','original.so'),('candidate','current-symbols.so')]}
 for k,rows in z['rows'].items():
  for f in rows:assert hashlib.sha256(elves[k].at(f['start'],f['end']-f['start'])).hexdigest()==f['raw_sha256']
 if not x.inspect:print(json.dumps({'status':'PASS_UNEXECUTED_METADATA','original_windows':[[f['start'],f['end']] for f in z['rows']['original']],'new_body_decode':False}));return
 assert x.output is not None;D=x.output.absolute()
 for f in[D,*D.parents]:assert not f.is_symlink()
 assert not D.exists() and P not in D.parents;D.mkdir();dis=load(P/'method/disasm.py','bounded_render')
 for k,rows in z['rows'].items():
  d=D/k;d.mkdir()
  for f in rows:
   (d/f"{f['start']}.asm").write_text(dis.render(elves[k],f['start'],f['end']));(d/f"{f['start']}.bin").write_bytes(elves[k].at(f['start'],f['end']-f['start']))
 literal=elves['original'].at(1165386,30);assert literal==b'No coin creator fee to collect';(D/'original-no-fee-literal.bin').write_bytes(literal);(D/'observed.json').write_text(json.dumps({'scope_sha256':H(P/'scope.json'),'plan_sha256':x.reviewed_plan_sha256,'original_windows':z['original_bodies'],'new_original_callee_bodies':0,'runtime_build_calls':0,'semantic_acceptance_pending':True},indent=2)+'\n');print('COLLECTED_BOUNDED_STATIC_ONLY')
if __name__=='__main__':main()
