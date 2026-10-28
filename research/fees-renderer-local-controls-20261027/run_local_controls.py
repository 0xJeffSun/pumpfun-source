from pathlib import Path
import remote_recipe as r
import subprocess, tarfile, shutil
r.WORK=Path('/workspace/fees-recovery')
r.SOURCE=r.WORK/'source-renderer'
r.REPO=Path('/workspace/pumpfun-source-current')
r.EVIDENCE=r.WORK
def build(label,compiler,linker=None):
    label='local-'+label
    subprocess.run(['python3',str(r.WORK/'build_renderer.py'),label],check=True)
    dest=r.WORK/label
    with tarfile.open(dest/'source.tar.gz','w:gz') as a:
        for p in sorted(r.SOURCE.rglob('*')):
            if p.is_file():a.add(p,arcname=p.relative_to(r.SOURCE))
    return dest
r.build=build
w=r.reader()
r.measure(r.WORK/'renderer-direct-recovered-valid',w)
print(r.source_controls(None,w),flush=True)
