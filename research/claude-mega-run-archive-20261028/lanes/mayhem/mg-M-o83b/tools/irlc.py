#!/usr/bin/env python3
"""llc IR surgery for O0083 buy_v2_handler. Edits the function body text in a rustc-emitted .ll,
runs llc (same toolchain), extracts the buy_v2_handler .text section, scores masked diff vs orig O0083.

usage: irlc.py BASE.ll EXPS.py [label-filter]
EXPS.py defines EXPS=[(label, fn(bodytext)->bodytext)]. Prints: label len slots(masked reg+stk+jump).
Also: irlc.py BASE.ll --base  -> just score the unedited IR (sanity).
"""
import importlib.util, re, subprocess, sys, difflib, os
B = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build'
sys.path.insert(0, B)
import sbfdis
OUT = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83b/llc'
os.makedirs(OUT, exist_ok=True)
LLC = os.path.expanduser('~/.cache/solana/v1.54/platform-tools/llvm/bin/llc')
PAT = 'buy_v2_handler'
O = sbfdis.elf('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/wt/evidence/original/mayhem/deployed.so')
S, E = 140512, 159160

def mask(insns):
    out = []
    for x in insns:
        t = x['norm']
        t = re.sub(r'\br\d+\b', 'r', t)
        t = re.sub(r'@\d+', '@', t); t = re.sub(r'add64 r, -\d+', 'add64 r, -N', t)
        t = re.sub(r'[-+]0x[0-9a-f]+\]', ']', t); t = re.sub(r'[-+]\d+\]', ']', t)
        t = re.sub(r'call -?0x[0-9a-f]+', 'call F', t); t = re.sub(r'lddw r, 0x[0-9a-f]+', 'lddw r, P', t)
        t = re.sub(r'ja 0x[0-9a-f]+', 'ja @', t); t = re.sub(r'(j\w+ [^,]*, )0x[0-9a-f]+', r'\1@', t)
        out.append(t)
    return out

ORIG = mask(sbfdis.window_insns(O, S, E))

def span(s):
    m = re.search(r'\ndefine[^\n]*' + PAT + r'[^\n]*\n', s); st = m.start() + 1
    return st, s.find('\n}\n', st) + 2

def compile_text(full, label):
    p = f'{OUT}/{label}.ll'; open(p, 'w').write(full)
    r = subprocess.run([LLC, '-O3', '-mtriple=sbf', '-mcpu=generic', '-relocation-model=pic',
                        '-function-sections', '-filetype=obj', p, '-o', f'{OUT}/{label}.o'], capture_output=True, text=True)
    if r.returncode:
        return None, r.stderr[-500:]
    import objsec
    secs = objsec.sections(f'{OUT}/{label}.o')
    key = [k for k in secs if PAT in k and k.startswith('.text')][0]
    return secs[key], None

def decode_section(code):
    insns = []
    pc = 0
    while pc < len(code):
        d = sbfdis.decode(code, None, pc, len(code), None, None)
        for x in d:
            insns.append(x)
        break
    return insns

def score(code):
    # decode raw section bytes as a window starting at 0
    insns = sbfdis.decode(code, None, 0, len(code), None, None)
    cand = mask(insns)
    sm = difflib.SequenceMatcher(a=ORIG, b=cand, autojunk=False)
    nd = sum(max(i2 - i1, j2 - j1) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal')
    return len(code), nd

if __name__ == '__main__':
    s = open(sys.argv[1]).read(); st, en = span(s); body = s[st:en]
    if len(sys.argv) > 2 and sys.argv[2] == '--base':
        code, err = compile_text(s, 'base')
        print('base', *score(code) if code else ('FAIL', err)); sys.exit()
    spec = importlib.util.spec_from_file_location('exps', sys.argv[2]); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    filt = sys.argv[3] if len(sys.argv) > 3 else None
    for label, fn in m.EXPS:
        if filt and filt not in label: continue
        try:
            nb = fn(body)
        except Exception as e:
            print(f'{label}: EDIT FAILED {e!r}'); continue
        if nb == body:
            print(f'{label}: NO-OP edit'); continue
        code, err = compile_text(s[:st] + nb + s[en:], label)
        if code is None:
            print(f'{label}: LLC FAILED {err}'); continue
        print(label, *score(code), flush=True)
