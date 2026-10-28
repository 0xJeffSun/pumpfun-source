#!/usr/bin/env python3
"""crm.py <variants.py> <tag> [--base SRC]: multiplex create-handler bodies as unused `pub fn create_<name>` copies in `pub mod crv`
at the end of lib.rs, one IR build (irb.sh), then llc + compare each copy to 0x138b20. variants.py defines VARIANTS={name: body}."""
import sys, subprocess, re, os, shutil, runpy
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08b'
vf, tag = sys.argv[1], sys.argv[2]
base = sys.argv[sys.argv.index('--base') + 1] if '--base' in sys.argv else f'{L}/src'
SIG = os.environ.get('CRM_SIG', 'ctx:Context<Create>,name:String,symbol:String,uri:String,creator:Pubkey')
WIN = os.environ.get('CRM_WIN', '0x138b20'); PFX = os.environ.get('CRM_PFX', 'create')
V = runpy.run_path(vf)['VARIANTS']
vd = f'{L}/v/{tag}'; shutil.rmtree(vd, ignore_errors=True); os.makedirs(vd)
src = f'{vd}/src'; subprocess.run(['cp', '-c', '-R', base, src], check=True)
p = src + '/src/lib.rs'; t = open(p).read()
mod = "\npub mod crv {\n use super::*;\n"
for name, body in V.items():
    items = ''
    if isinstance(body, tuple): body, items = body
    mod += items.replace('NAME', name) + '\n'
    mod += f" #[inline(never)]\n pub fn {PFX}_{name}({SIG})->Result<()>{{\n{body.replace('NAME', name)}\n }}\n"
open(p, 'w').write(t + mod + "}\n")
b = subprocess.run([f'{L}/tools/irb.sh', src, tag], capture_output=True, text=True)
if 'FAILED' in b.stdout or not os.path.exists(f'{L}/ir/{tag}.ll'):
    print(b.stdout[-1500:]); log = f'{L}/v/ir-{tag}/build.log'
    if os.path.exists(log): print('\n'.join([l for l in open(log).read().splitlines() if l.startswith('error') or '-->' in l][:20]))
    sys.exit(1)
ir = f'{L}/ir/{tag}.ll'
for name in V:
    fn = f'{PFX}_{name}17'
    subprocess.run([sys.executable, '-B', f'{L}/../mg-P-z06/tools/xfn.py', ir, fn, f'{L}/llx/{tag}_{name}.ll'], capture_output=True)
    out = subprocess.run([f'{L}/tools/llt.sh', f'{L}/llx/{tag}_{name}.ll', f'{tag}_{name}', WIN, fn], capture_output=True, text=True).stdout.strip()
    print(f'{name:12s} {out.split(":", 1)[-1].strip()}')
