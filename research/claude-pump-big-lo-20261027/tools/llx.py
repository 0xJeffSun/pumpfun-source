#!/usr/bin/env python3
"""IR-level experiments for one function of the pump crate.

  llx.py extract <module.ll> <symbol-substring> <out.ll>   # keep one function body, other defines -> declares
  llx.py llc <fn.ll> <out.o>                               # same codegen options as rustc (sbf, generic, O3, pic)
  llx.py cmp <out.o> <symbol-substring> <orig_window_hex>  # masked compare vs original window (+ diff)
  llx.py run <fn.ll> <symbol-substring> <orig_window_hex>  # llc + cmp
Masking: every call immediate and every lddw immediate (relocated in the .o) is ignored.
"""
import re, struct, subprocess, sys, difflib
from pathlib import Path
SDK = Path.home() / '.cache/solana/v1.44/platform-tools/llvm/bin'
OBJDUMP = str(Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
H = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
sys.path.insert(0, str(H))

LINKAGE = re.compile(r'^(define\s+)((?:(?:internal|private|linkonce_odr|linkonce|weak_odr|weak|available_externally|external|hidden|protected|dso_local|unnamed_addr|local_unnamed_addr)\s+)*)')


def extract(src, needle, out):
    lines = Path(src).read_text().splitlines(keepends=True)
    keep = set()
    for l in lines:
        if ' alias ' in l and l.startswith('@'):
            m = re.search(r',\s*ptr\s+@("?[^\s,]+"?)\s*$', l.rstrip())
            if m:
                keep.add(m.group(1))
    res = []; i = 0; found = []
    while i < len(lines):
        l = lines[i]
        if l.startswith('define '):
            j = i
            while not lines[j].startswith('}'):
                j += 1
            m = re.search(r'@("?[^\s(]+"?)\(', l)
            name = m.group(1)
            if needle in name or name in keep:
                if needle in name:
                    found.append(name)
                res.extend(lines[i:j + 1])
            else:
                head = l.rstrip().rstrip('{').rstrip()
                head = re.sub(r'\s+personality\s+ptr\s+@\S+', '', head)
                head = re.sub(r'\s+!dbg\s+!\d+', '', head)
                head = re.sub(r'\s+comdat(\(\$\S+\))?', '', head)
                head = re.sub(r'\s+section\s+"[^"]*"', '', head)
                head = re.sub(r'\s+align\s+\d+(?=\s*#|\s*$)', '', head)
                head = re.sub(r'^define\s+((?:internal|private|linkonce_odr|weak_odr|hidden|dso_local)\s+)*', 'declare ', head)
                # drop parameter names: '%name' tokens inside the parameter list
                k = head.index('@'); p = head.index('(', k)
                depth = 0
                for q in range(p, len(head)):
                    if head[q] == '(':
                        depth += 1
                    elif head[q] == ')':
                        depth -= 1
                        if depth == 0:
                            break
                params = re.sub(r'\s+%[\w.$"-]+(?=\s*[,)])', '', head[p:q + 1])
                head = head[:p] + params + head[q + 1:]
                res.append(head + '\n')
            i = j + 1
            continue
        res.append(l); i += 1
    assert len(found) == 1, found
    Path(out).write_text(''.join(res))
    return found[0]


def llc(src, out):
    subprocess.run([str(SDK / 'llc'), '-O3', '-march=sbf', '-mcpu=generic', '-mattr=+store-imm,+jmp-ext', '-relocation-model=pic',
                    '-function-sections', '-data-sections', '-filetype=obj', '-o', str(out), str(src)], check=True)


def obj_fn(objp, needle):
    from score import sections  # noqa
    blob = Path(objp).read_bytes()
    txt = subprocess.check_output([OBJDUMP, '-t', str(objp)], text=True)
    for line in txt.splitlines():
        m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m and needle in m.group(4):
            secname = m.group(2); size = int(m.group(3), 16); addr = int(m.group(1), 16)
            # find section offset via readelf-like parse
            shoff, = struct.unpack_from('<Q', blob, 0x28)
            shentsize, shnum, shstrndx = struct.unpack_from('<HHH', blob, 0x3a)
            hdrs = [struct.unpack_from('<IIQQQQIIQQ', blob, shoff + k * shentsize) for k in range(shnum)]
            st = hdrs[shstrndx]
            nm = lambda off: blob[st[4] + off:blob.index(b'\0', st[4] + off)].decode()
            for h in hdrs:
                if nm(h[0]) == secname:
                    return m.group(4), blob[h[4] + addr:h[4] + addr + size]
    raise SystemExit('symbol not found in object')


def mask(raw):
    out = []; i = 0
    while i < len(raw):
        op = raw[i]
        if op == 0x18:
            out.append(raw[i:i + 4] + bytes(4) + raw[i + 8:i + 12] + bytes(4)); i += 16
        elif op == 0x85:
            out.append(raw[i:i + 4] + bytes(4)); i += 8
        else:
            out.append(raw[i:i + 8]); i += 8
    return out


def cmp(objp, needle, start):
    from score import original_windows  # noqa
    w = next(x for x in original_windows() if x['start'] == start)
    name, raw = obj_fn(objp, needle)
    a = mask(w['raw']); b = mask(raw)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    nd = sum(max(i2 - i1, j2 - j1) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal')
    print(f'{name[:80]}: obj {len(raw)} B vs original {w["bytes"]} B; masked-equal={a == b}; ratio={sm.ratio():.4f}; diff-slots={nd}')
    return a == b, sm, a, b


def main():
    cmd = sys.argv[1]
    if cmd == 'extract':
        print(extract(sys.argv[2], sys.argv[3], sys.argv[4]))
    elif cmd == 'llc':
        llc(sys.argv[2], sys.argv[3])
    elif cmd in ('cmp', 'run'):
        src = Path(sys.argv[2]); needle = sys.argv[3]; start = int(sys.argv[4], 16)
        objp = src.with_suffix('.o') if cmd == 'run' else src
        if cmd == 'run':
            llc(src, objp)
        ok, sm, a, b = cmp(objp, needle, start)
        if not ok and '-v' in sys.argv:
            for t, i1, i2, j1, j2 in sm.get_opcodes():
                if t != 'equal':
                    print(t, f'orig[{i1}:{i2}] {start + i1 * 8:#x}', [x.hex() for x in a[i1:i2]][:12], 'obj', [x.hex() for x in b[j1:j2]][:12])


if __name__ == '__main__':
    main()
