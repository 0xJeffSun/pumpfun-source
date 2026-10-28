"""Explicit offline full rebuild of a retained negative composition control."""
from pathlib import Path
import argparse,gzip,importlib.util,json,shutil
HERE=Path(__file__).resolve().parent
def module(name,path):s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def run(args):
    v=module('composition_full_parent',HERE.parent/'verify.py');c=module('composition_full_sources',HERE/'verify.py');v.manifest_check(HERE.parent)
    source=c.variant(HERE,v,c.sources(HERE,v),args.variant)
    output=args.output.resolve();output.mkdir(parents=True,exist_ok=False);controller=output/'controller';shutil.copytree(HERE.parent/'controller',controller)
    rows=[]
    for name,b in sorted(source.items()):
        p=controller/'sources'/(name+'.gz');p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(gzip.compress(b,mtime=0));rows.append(dict(path=name,**v.identity(b)))
    (controller/'source-inputs.json').write_text(json.dumps(dict(source_files=rows),indent=2)+'\n',encoding='utf-8')
    builder=module('composition_full_builder',controller/'build.py');args.output=output/'build';result=builder.build(args)
    expected=v.read(HERE/'builds.json')[args.variant]['outputs'];comparison=dict(outputs_equal=result['outputs']==expected,actual=result['outputs'],expected=expected,variant=args.variant,scope='Fresh offline dependency and root compilation; no target execution.')
    (output/'comparison.json').write_text(json.dumps(comparison,indent=2)+'\n',encoding='utf-8');v.require(comparison['outputs_equal'],'composition full rebuild differs');return comparison
if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('sdk','target-sysroot','vendor','msvc','windows-sdk','output'):p.add_argument('--'+name,type=Path,required=True)
    p.add_argument('--kit-version',default='10.0.26100.0');p.add_argument('--variant',default='late-inline',choices=['baseline','baseline-repeat','late-inline','late-inline-repeat','late-staged','late-literal','price-eager','price-eager-inline'])
    print(json.dumps(run(p.parse_args()),indent=2))
