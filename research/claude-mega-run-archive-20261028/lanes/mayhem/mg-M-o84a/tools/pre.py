#!/usr/bin/env python3
"""usage: pre.py NOOPT.ll EXPS.py [filter] -- EXPS=[(label, fn(module_text)->module_text)]; opt O3 + llc + score O0084."""
import importlib.util, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import irx
OPT = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/sysroot/lib/rustlib/aarch64-apple-darwin/bin/opt'
def run_one(s, label):
    pre = f'{irx.OUT}/{label}.pre.ll'; post = f'{irx.OUT}/{label}.post.ll'
    open(pre, 'w').write(s)
    r = subprocess.run([OPT, '-mtriple=sbf', '-mcpu=generic', '-passes=default<O3>', '-S', pre, '-o', post], capture_output=True, text=True)
    os.remove(pre)
    if r.returncode: return None, 'OPT FAILED ' + r.stderr[-600:]
    t = open(post).read()
    code, err = irx.compile_text(t, label)
    return code, err
if __name__ == '__main__':
    s0 = open(sys.argv[1]).read()
    spec = importlib.util.spec_from_file_location('exps', sys.argv[2]); m = importlib.util.module_from_spec(spec)
    sys.path.insert(0, os.path.dirname(os.path.abspath(sys.argv[2]))); spec.loader.exec_module(m)
    filt = sys.argv[3] if len(sys.argv) > 3 else None
    for label, fn in m.EXPS:
        if filt and filt not in label: continue
        try: s = fn(s0)
        except Exception as e: print(f'{label}: EDIT FAILED {e!r}', flush=True); continue
        code, err = run_one(s, label)
        if code is None: print(f'{label}: {err}', flush=True); continue
        print(label, *irx.score(code), flush=True)
