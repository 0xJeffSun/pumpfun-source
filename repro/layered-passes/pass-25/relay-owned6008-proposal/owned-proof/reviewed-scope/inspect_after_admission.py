"""UNEXECUTED newbody collector; default is metadata/hash-only, no body decode."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,shutil,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-scope-sha256',required=True);a.add_argument('--repo',type=Path,required=True);a.add_argument('--output',type=Path);a.add_argument('--inspect',action='store_true');x=a.parse_args();R=x.repo.resolve();assert H(P/'manifest.json')==x.reviewed_scope_sha256==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 b=J(P/'bindings.json');B=R/b['checkpoint'];assert H(B/'manifest.json')==b['checkpoint_seal'];
 for n,h in J(B/'manifest.json').items():assert H(B/n)==h,n
 assert H(B/'candidate.so')==b['candidate_sha256'] and H(B/'unstripped.so')==b['symbols_sha256'];original=R/b['original_path'];assert H(original)==b['original_sha256']=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563';rows=J(P/'original-metadata.json');assert [(r['ordinal'],r['start'],r['end']) for r in rows]==[(114,143608,152048),(115,152048,152552),(116,152552,153952)]
 if not x.inspect:print('PASS metadata only; newbody decoding0; build0/VM0');return
 assert x.output is not None;D=x.output.absolute()
 for p in[D,*D.parents]:assert not p.is_symlink()
 D=D.resolve();D.relative_to(R/'work');assert not D.exists() and D!=P and P not in D.parents;D.mkdir()
 s=importlib.util.spec_from_file_location('dis',P/'method/disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d);e=d.a.Elf(original.read_bytes())
 for r in rows:
  if r['ordinal']not in[114,116]:continue
  raw=e.at(r['start'],r['bytes']);assert hashlib.sha256(raw).hexdigest()==r['raw_sha256'];(D/f"original-{r['ordinal']}.bin").write_bytes(raw);(D/f"original-{r['ordinal']}.asm").write_text(d.render(e,r['start'],r['end']))
 shutil.copyfile(P/'original-metadata.json',D/'original-metadata.json');(D/'scope-record.json').write_text(json.dumps({'reviewed_scope_sha256':x.reviewed_scope_sha256,'original_sha256':H(original),'body_ordinals':[114,116],'recursive_body_expansion':False,'new_compiler_or_VM_runs':0},indent=2)+'\n')
if __name__=='__main__':main()
