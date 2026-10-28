"""Explicit optional Windows rebuild using caller-supplied pinned offline tools."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,shutil
HERE=Path(__file__).resolve().parent
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def run(args):
    v=module('cpi_source_rebuild_verifier',HERE/'verify.py');v.manifest_check(HERE)
    source=v.unpack((HERE/'source/baseline.tar.gz').read_bytes());pins=v.read(HERE/'source-inputs.json');v.require({n:v.identity(b)['sha256'] for n,b in source.items()}==pins,'source differs')
    if args.variant!='baseline':source['src/instructions/pump_interface.rs']=(HERE/'source'/(args.variant+'.rs')).read_bytes()
    output=args.output.resolve();output.mkdir(parents=True,exist_ok=False);controller=output/'controller';shutil.copytree(HERE/'controller',controller)
    rows=[]
    for n,b in sorted(source.items()):
        p=controller/'sources'/(n+'.gz');p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(gzip.compress(b,mtime=0));rows.append(dict(path=n,**v.identity(b)))
    (controller/'source-inputs.json').write_text(json.dumps(dict(source_files=rows),indent=2)+'\n',encoding='utf-8')
    builder=module('cpi_source_full_builder',controller/'build.py');args.output=output/'build';result=builder.build(args)
    expected=v.read(HERE/'builds.json')[args.variant]['outputs'];comparison=dict(outputs_equal=result['outputs']==expected,actual=result['outputs'],expected=expected,variant=args.variant,scope='Fresh dependencies and root in a new directory; no target execution.')
    (output/'comparison.json').write_text(json.dumps(comparison,indent=2)+'\n',encoding='utf-8');v.require(comparison['outputs_equal'],'rebuilt complete outputs differ');return comparison
if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    for name in ['sdk','target-sysroot','vendor','msvc','windows-sdk','output']:p.add_argument('--'+name,type=Path,required=True)
    p.add_argument('--kit-version',default='10.0.26100.0');p.add_argument('--variant',choices=['baseline','early-staged','late-staged','late-inline','late-literal'],default='baseline')
    print(json.dumps(run(p.parse_args()),indent=2))
