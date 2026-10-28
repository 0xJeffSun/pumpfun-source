#!/usr/bin/env python3
"""O0073 (FeeRecipient::validate_sweep) helpers for lane fees-final.

Reuses lane mayhem-b's read-only analysis modules (sbfdis, objsec, cmpobj, winreport).
Run with `python -B` so nothing is written next to those modules.

  o73.py report LABEL...          window report for O0073 (mayhem-b/out/builds/LABEL/symbols.so)
  o73.py diff LABEL [maxlines]     masked diff of O0073 vs the original window
  o73.py llc IN.ll LABEL [llc-args...]  run llc on IN.ll, extract validate_sweep, compare with O0073
"""
import os, subprocess, sys
MB = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b'
FF = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/fees-final'
sys.path.insert(0, MB + '/build')
import sbfdis, objsec, cmpobj, winreport  # noqa: E402
LLC = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llc'
WID = 'O0073'
PAT = 'FeeRecipient14validate_sweep'


def build_so(label):
    return f'{MB}/out/builds/{label}/symbols.so'


def diff(label, maxlines=300):
    w = [x for x in winreport.W if x[0] == WID][0]
    C = sbfdis.elf(build_so(label)); cf = sbfdis.funcs(C)
    a = [a for a, (b, n) in cf.items() if PAT in n][0]
    sbfdis.diff_masked(winreport.O, w[1], w[2], C, a, cf[a][0], context=1, maxlines=maxlines, mask_regs=False)


def llc(ll, label, extra=()):
    out = f'{FF}/llc/{label}.o'
    r = subprocess.run([LLC, '-O3', '-mtriple=sbf', '-mcpu=generic', '-relocation-model=pic', '-function-sections',
                        '-filetype=obj', *extra, ll, '-o', out], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[:3000]); return None
    secs = objsec.sections(out)
    key = [k for k in secs if PAT in k and k.startswith('.text')][0]
    binp = f'{FF}/llc/{label}.bin'
    open(binp, 'wb').write(secs[key])
    cmpobj.report(binp, WID)
    return binp


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'report':
        for lab in sys.argv[2:]:
            print(lab, end=': '); sys.stdout.flush(); winreport.report(build_so(lab), [WID])
    elif cmd == 'diff':
        diff(sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 300)
    elif cmd == 'llc':
        llc(sys.argv[2], sys.argv[3], sys.argv[4:])
