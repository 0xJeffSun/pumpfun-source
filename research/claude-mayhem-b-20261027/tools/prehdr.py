#!/usr/bin/env python3
"""O0075 preheader experiments: permute/move IR lines inside sweep_fees_admin, run llc, print the
preheader load order and the masked diff count against the original window.

usage: prehdr.py BASE.ll EXPERIMENTS.py
EXPERIMENTS.py defines EXPS = [(label, edit_fn(lines)->lines), ...] operating on the function body lines.
"""
import importlib.util, re, subprocess, sys
sys.path.insert(0, __import__('os').path.dirname(__file__))
import objsec, sbfdis, winreport

L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b'
LLC = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llc'
PAT = 'sweep_fees_admin17h34ff'
SEC = 'mayhem_recovered16mayhem_recovered16sweep_fees_admin17'
O = winreport.O
W = [x for x in winreport.W if x[0] == 'O0075'][0]
ORIG = objsec.norm(O.b[W[1]:W[2]])


def span(s):
    m = re.search(r'\ndefine[^\n]*' + PAT + r'[^\n]*\n', s)
    st = m.start() + 1
    return st, s.find('\n}\n', st) + 2


def compile_body(s, st, en, lines, label):
    out = f'{L}/out/llc/{label}.ll'
    open(out, 'w').write(s[:st] + '\n'.join(lines) + s[en:])
    r = subprocess.run([LLC, '-O3', '-mtriple=sbf', '-mcpu=generic', '-relocation-model=pic', '-function-sections',
                        '-filetype=obj', out, '-o', f'{L}/out/llc/{label}.o'], capture_output=True, text=True)
    if r.returncode:
        return None, r.stderr[:600]
    secs = objsec.sections(f'{L}/out/llc/{label}.o')
    key = [k for k in secs if SEC in k and k.startswith('.text')][0]
    return secs[key], None


def describe(code):
    obj = objsec.norm(code)
    neq = sum(1 for a, b in zip(ORIG, obj) if a != b) + abs(len(ORIG) - len(obj))
    seq = []
    for pc, raw in objsec.insns(code):
        if 1008 <= pc <= 1080:
            seq.append(sbfdis.decode(code, None, pc, pc + len(raw), None, None)[0]['text'])
    return neq, len(code), seq


if __name__ == '__main__':
    s = open(sys.argv[1]).read()
    st, en = span(s)
    base = s[st:en].split('\n')
    spec = importlib.util.spec_from_file_location('exps', sys.argv[2]); m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    for label, fn in m.EXPS:
        try:
            lines = fn(list(base))
        except Exception as e:  # noqa: BLE001
            print(f'{label}: EDIT FAILED {e!r}'); continue
        code, err = compile_body(s, st, en, lines, label)
        if code is None:
            print(f'{label}: LLC FAILED {err}'); continue
        neq, size, seq = describe(code)
        loads = [t for t in seq if t.startswith('ldxdw')]
        print(f'{label}: size {size} diffslots {neq} | ' + ' ; '.join(loads), flush=True)
