#!/usr/bin/env python3
"""Function-level SBF loop: one function of the root crate's optimized LLVM IR -> llc -> bytes.

Subcommands
  extract <module.ll> <symbol|substring> <out.ll>
      Single-function module: the definition of <symbol>, every global it reaches (transitively),
      declarations for every function those reach, all types/attribute groups, and only the metadata
      nodes reachable from the kept text.
  llc <in.ll> <out.o>
      Codegen with the exact options rustc 1.79 (platform-tools v1.44) uses for sbpf-solana-solana:
      -O3, PIC, function/data sections, trap-unreachable, single thread model, cpu generic,
      +store-imm,+jmp-ext.
  cmp <obj.o> <symbol> (--orig ADDR | --so FILE [--name SYMBOL])
      Compare .text.<symbol> from the object with an original window (entry-to-next-entry) or with the
      symbol body in a linked .so, under measure.py's normalization: relocated lddw immediates,
      call immediates (internal or relocated) masked; everything else, including non-relocated lddw
      constants, compared byte for byte. Equal length is required.
  check <module.ll> <symbol> (--orig ADDR | --so FILE)
      extract + llc + cmp in one step (writes into --work, default a temp dir). FNLLC_DIS=1 adds a unified diff of the
      disassembled (normalized) instruction streams.
  vs-orig <module.ll> <measure.json> [--jobs N]
      For every normalized-matched window whose candidate body is defined in the IR: single-function codegen vs the ORIGINAL.
  validate <module.ll> <unstripped.so> [--limit N] [--orig-matched measure.json]
      For functions defined in both the IR and the .so, check that single-function codegen reproduces
      the linked bytes. Reports equal/different counts and lists the differing symbols.

llc runs single-threaded for well under a second per function; it is not a cargo/rustc build.
"""
import argparse, hashlib, json, os, re, struct, subprocess, sys, tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
LLC = os.environ.get('FNLLC_LLC', str(Path.home() / '.cache/solana/v1.44/platform-tools/rust/lib/rustlib/aarch64-apple-darwin/bin/llc'))
OBJCOPY = str(Path.home() / '.cache/solana/v1.44/platform-tools/llvm/bin/llvm-objcopy')
LLC_ARGS = ['-O3', '-relocation-model=pic', '-function-sections', '-data-sections',
            '-thread-model=single', '-mcpu=generic', '-mattr=+store-imm,+jmp-ext', '-filetype=obj'] + os.environ.get('FNLLC_EXTRA', '').split()
WT = Path(os.environ.get('FNLLC_WT', '/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad/lanes/speed/wt'))
ORIGINAL = WT / 'evidence/original/pump_amm/deployed.so'

# ---------------------------------------------------------------- IR parsing
NAME = r'(?:"(?:[^"\\]|\\.)*"|[-a-zA-Z$._][-a-zA-Z$._0-9]*|\d+)'
GREF = re.compile(r'@(' + NAME + ')')
MREF = re.compile(r'!(\d+)\b')
QUOTED = re.compile(r'([@%]?)"[^"]*"')


class _Strlit:
    """Blank every quoted string except @"global" names (IR escapes quotes as \\22, so quotes pair up)."""
    @staticmethod
    def sub(_repl, text):
        return QUOTED.sub(lambda mm: mm.group(0) if mm.group(1) == '@' else mm.group(1) + '""', text)


STRLIT = _Strlit()


def grefs(text):
    """@-references outside string literals (c"..", !".." and section/plain strings)."""
    return GREF.findall(STRLIT.sub('""', text))


def parse_module(text):
    """Split textual IR into top-level entities. Returns dict with ordered lists."""
    lines = text.split('\n')
    m = {'header': [], 'types': [], 'comdats': [], 'globals': {}, 'gorder': [], 'aliases': {}, 'defs': {},
         'decls': {}, 'attrs': [], 'named_md': [], 'md': {}, 'asm': []}
    i = 0; n = len(lines)
    while i < n:
        l = lines[i]
        if not l or l.startswith(';'):
            i += 1; continue
        if l.startswith(('source_filename', 'target ')):
            m['header'].append(l)
        elif l.startswith('module asm'):
            m['asm'].append(l)
        elif l.startswith('%'):
            m['types'].append(l)
        elif l.startswith('$'):
            m['comdats'].append(l)
        elif l.startswith('@'):
            name = GREF.match(l).group(1)
            if re.search(r'=\s.*?\b(alias|ifunc)\b', l.split(' = ', 1)[1][:200]) and not re.search(r'\b(global|constant)\b', l.split(' = ', 1)[1][:200]):
                m['aliases'][name] = l
            else:
                m['globals'][name] = l
            m['gorder'].append(name)
        elif l.startswith('define '):
            j = i
            while lines[j] != '}':
                j += 1
            name = GREF.search(l).group(1)
            m['defs'][name] = '\n'.join(lines[i:j + 1])
            i = j + 1; continue
        elif l.startswith('declare '):
            name = GREF.search(l).group(1)
            m['decls'][name] = l
        elif l.startswith('attributes '):
            m['attrs'].append(l)
        elif l.startswith('!'):
            mm = re.match(r'!(\d+) = ', l)
            if mm:
                m['md'][mm.group(1)] = l
            else:
                m['named_md'].append(l)
        else:
            raise SystemExit('unparsed IR line %d: %s' % (i + 1, l[:120]))
        i += 1
    return m


LINKAGE = {'private', 'internal', 'available_externally', 'linkonce', 'weak', 'common', 'appending',
           'linkonce_odr', 'weak_odr', 'external'}


def define_to_declare(text):
    head = text.split('\n', 1)[0]
    assert head.startswith('define ') and head.rstrip().endswith('{'), head[:100]
    head = head.rstrip()[:-1].rstrip()
    # drop trailing personality/prefix/prologue/section/comdat/metadata attachments after the arg list
    toks = head.split(' ')
    out = ['declare']
    k = 1
    while toks[k] in LINKAGE or toks[k] in ('dso_local', 'dso_preemptable'):
        if toks[k] in ('dso_local', 'dso_preemptable'):
            out.append(toks[k])
        k += 1
    rest = ' '.join(toks[k:])
    # cut 'personality ...' and metadata attachments (!dbg etc.) which are definition-only
    rest = re.sub(r' personality .*$', '', rest)
    rest = re.sub(r' !\w+ !\d+', '', rest)
    rest = re.sub(r' comdat(\(\$[^)]*\))?', '', rest)
    return ' '.join(out) + ' ' + rest


def symbol_lookup(m, sym):
    names = [n for n in m['defs'] if n == sym or n.strip('"') == sym]
    if not names:
        names = [n for n in m['defs'] if sym in n]
    if len(names) != 1:
        raise SystemExit('symbol %r matches %d definitions: %s' % (sym, len(names), names[:8]))
    return names[0]


def extract(m, fname):
    kept_globals, kept_decl, seen = [], {}, set()
    work = [m['defs'][fname]]
    seen.add(fname)
    texts = [m['defs'][fname]]
    while work:
        t = work.pop()
        for g in grefs(t):
            if g in seen:
                continue
            seen.add(g)
            if g in m['globals']:
                kept_globals.append(g); work.append(m['globals'][g]); texts.append(m['globals'][g])
            elif g in m['defs']:
                kept_decl[g] = define_to_declare(m['defs'][g])
            elif g in m['decls']:
                kept_decl[g] = m['decls'][g]
            elif g in m['aliases']:
                # alias -> declare with the aliasee's function header under the alias name
                a = m['aliases'][g]
                target = grefs(a.split(' = ', 1)[1])[-1]
                base = m['defs'].get(target) or m['decls'].get(target)
                if base is None:
                    raise SystemExit('alias %s -> %s not resolvable' % (g, target))
                d = define_to_declare(base) if base.startswith('define') else base
                d = d.replace('@' + target, '@' + g, 1)
                kept_decl[g] = d
            else:
                raise SystemExit('unresolved reference @%s' % g)
    # metadata closure
    md_keep, mwork = set(), []
    for t in texts + m['named_md']:
        mwork += MREF.findall(STRLIT.sub('""', t))
    while mwork:
        k = mwork.pop()
        if k in md_keep or k not in m['md']:
            continue
        md_keep.add(k); mwork += MREF.findall(STRLIT.sub('""', m['md'][k]))
    order = {g: i for i, g in enumerate(m['gorder'])}
    out = m['header'] + [''] + m['types'] + [''] + m['comdats']
    out += [m['globals'][g] for g in sorted(kept_globals, key=order.get)] + ['']
    out += [m['defs'][fname], '']
    out += list(kept_decl.values()) + ['']
    out += m['attrs'] + [''] + m['named_md'] + [m['md'][k] for k in sorted(md_keep, key=int)] + ['']
    # LLVM requires unnamed globals (@0, @1, ...) to be numbered densely from 0; a subset breaks that, so give the
    # kept ones private names (only symbol names in the object change; function bytes reference them by relocation).
    return ANON.sub(lambda mm: mm.group(1) or '@__fnllc_anon_' + mm.group(2), '\n'.join(out))


ANON = re.compile(r'("[^"]*")|@(\d+)\b')


# ---------------------------------------------------------------- ELF helpers
def sections(b):
    shoff = struct.unpack_from('<Q', b, 40)[0]; shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 58)
    raw = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
    names = b[raw[shstrndx][4]:raw[shstrndx][4] + raw[shstrndx][5]]
    return [(names[s[0]:].split(b'\0', 1)[0].decode(), s) for s in raw]


def obj_function(path, symbol):
    """Bytes of .text.<symbol> with relocated immediates masked, plus relocation pattern."""
    b = Path(path).read_bytes(); secs = sections(b)
    want = '.text.' + symbol.strip('"')
    idx = [i for i, (n, s) in enumerate(secs) if n == want]
    if not idx:
        texts = [n for n, s in secs if n.startswith('.text.')]
        if len(texts) == 1:
            idx = [i for i, (n, s) in enumerate(secs) if n == texts[0]]
        else:
            raise SystemExit('section %s not found (%d text sections)' % (want, len(texts)))
    si = idx[0]; s = secs[si][1]
    code = bytearray(b[s[4]:s[4] + s[5]]); raw = bytes(code)
    pat = []
    # symbol table for reloc symbol names
    symtab = [x for x in secs if x[1][1] == 2]
    strtab = None; syms = []
    if symtab:
        st = symtab[0][1]; strs = secs[st[6]][1]; strtab = b[strs[4]:strs[4] + strs[5]]
        for p in range(st[4], st[4] + st[5], 24):
            nm, info, oth, shndx, val, size = struct.unpack_from('<IBBHQQ', b, p)
            syms.append(strtab[nm:].split(b'\0', 1)[0].decode())
    for n, r in secs:
        if r[1] == 9 and r[7] == si:  # SHT_REL targeting our section
            for p in range(r[4], r[4] + r[5], 16):
                off, info = struct.unpack_from('<QQ', b, p); typ = info & 0xffffffff; sym = syms[info >> 32] if syms else ''
                op = code[off]
                if op == 0x18:
                    code[off + 4:off + 8] = bytes(4); code[off + 12:off + 16] = bytes(4); pat.append((off, 'lddw'))
                elif op == 0x85:
                    code[off + 4:off + 8] = bytes(4); pat.append((off, 'call', sym))
                else:
                    pat.append((off, 'reloc%d' % typ))
    return bytes(code), raw, sorted(pat)


_ELF_CACHE = {}


def load_reader():
    sys.path.insert(0, str(ORIGINAL.parents[3] / 'repro/pump_amm/claim-self-transfer-v144/static-tool'))
    from elf_reader import Elf

    def cached(path):
        key = str(Path(path).resolve())
        if key not in _ELF_CACHE:
            _ELF_CACHE[key] = Elf(Path(path))
        return _ELF_CACHE[key]
    return cached


def window_bytes(elf, start, end):
    """Normalized bytes + relocation pattern of [start,end) in a linked ELF (measure.py convention)."""
    pat = []
    for at in range(start, end, 8):
        if elf.b[at] == 0x85 and elf.b[at + 1] == 0x10:
            r = elf.relocations.get(at)
            pat.append((at - start, 'call', r['symbol'] if r and r['type'] == 10 else None))
        elif at in elf.relocations and elf.b[at] == 0x18 and elf.relocations[at]['type'] == 8:
            pat.append((at - start, 'lddw'))
    return elf.normalized[start:end], elf.b[start:end], pat


def diff_report(a, b, limit=12):
    out = []
    n = min(len(a), len(b))
    for i in range(0, n, 8):
        if a[i:i + 8] != b[i:i + 8]:
            out.append('  +0x%04x obj %s  ref %s' % (i, a[i:i + 8].hex(), b[i:i + 8].hex()))
            if len(out) >= limit:
                out.append('  ...'); break
    return out


def print_disdiff(a, b, limit=int(os.environ.get('FNLLC_DIS_LINES', '80'))):
    """Unified diff of the two normalized instruction streams (obj vs reference; masked call/lddw operands)."""
    import difflib, importlib.util
    spec = importlib.util.spec_from_file_location('sbfdis', str(HERE.parent / 'sbfdis.py') if (HERE.parent / 'sbfdis.py').exists()
                                                  else '/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad/shared/tools/sbfdis.py')
    sd = importlib.util.module_from_spec(spec); spec.loader.exec_module(sd)
    def text(code):
        out, at = [], 0
        while at + 8 <= len(code):
            n, ins = sd.decode(code, at); out.append(' '.join(str(x) for x in ins)); at += n
        return out
    d = list(difflib.unified_diff(text(a), text(b), 'obj', 'ref', lineterm='', n=2))
    for l in d[:limit]:
        print('   ' + l)
    if len(d) > limit:
        print('   ... (%d more diff lines; FNLLC_DIS_LINES=N)' % (len(d) - limit))


def compare_obj(obj, symbol, orig=None, so=None, name=None, quiet=False):
    code, raw, opat = obj_function(obj, symbol)
    Elf = load_reader()
    if orig is not None:
        e = Elf(ORIGINAL); start = orig
        ent = sorted(set(e.entries) | {e.lo}); assert start in ent, 'not an original entry: %#x' % start
        end = ([x for x in ent if x > start] + [e.hi])[0]
        label = 'orig %#x..%#x' % (start, end)
    else:
        e = Elf(Path(so)); nm = (name or symbol).strip('"')
        f = [f for f in e.funcs if f['name'] == nm]
        if not f:
            raise SystemExit('symbol not in %s: %s' % (so, nm))
        start, end = f[0]['start'], f[0]['start'] + f[0]['size']; label = 'so %#x..%#x' % (start, end)
    norm, wraw, wpat = window_bytes(e, start, end)
    # internal calls in the object carry a reloc; in the .so they are resolved: compare call offsets only
    ocalls = [p[0] for p in opat if p[1] == 'call']; olddw = [p[0] for p in opat if p[1] == 'lddw']
    wcalls = [p[0] for p in wpat if p[1] == 'call']; wlddw = [p[0] for p in wpat if p[1] == 'lddw']
    same = len(code) == len(norm) and code == norm and olddw == wlddw and set(ocalls) <= set(wcalls)
    # every masked call in the window must be a call in the object as well
    same = same and all(code[o] == 0x85 for o in wcalls)
    if not quiet:
        print('%s: obj %d bytes, %s %d bytes -> %s' % (symbol[:90], len(code), label, end - start, 'EQUAL' if same else 'DIFF'))
        if not same:
            for l in diff_report(code, norm):
                print(l)
            if os.environ.get('FNLLC_DIS'):
                print_disdiff(code, norm)
            if len(code) != len(norm):
                print('  length differs: obj %d ref %d (%+d insns)' % (len(code), len(norm), (len(code) - len(norm)) // 8))
    return same


# ---------------------------------------------------------------- commands
def run_llc(src, out):
    r = subprocess.run([LLC] + LLC_ARGS + [str(src), '-o', str(out)], capture_output=True, text=True)
    if r.returncode:
        sys.stderr.write(r.stderr[-4000:])
        raise SystemExit('llc failed on %s' % src)
    return r


def cmd_extract(a):
    m = parse_module(Path(a.module).read_text())
    f = symbol_lookup(m, a.symbol)
    Path(a.out).write_text(extract(m, f))
    print(f)


def cmd_check(a):
    work = Path(a.work or tempfile.mkdtemp(prefix='fnllc-'))
    work.mkdir(parents=True, exist_ok=True)
    m = parse_module(Path(a.module).read_text())
    f = symbol_lookup(m, a.symbol)
    ll = work / 'fn.ll'; o = work / 'fn.o'
    ll.write_text(extract(m, f)); run_llc(ll, o)
    ok = compare_obj(o, f, orig=int(a.orig, 0) if a.orig else None, so=a.so)
    sys.exit(0 if ok else 1)


def cmd_validate(a):
    import random, time
    from concurrent.futures import ThreadPoolExecutor
    m = parse_module(Path(a.module).read_text())
    Elf = load_reader(); e = Elf(Path(a.so))
    in_so = {f['name']: f for f in e.funcs}
    names = [n for n in m['defs'] if n.strip('"') in in_so]
    random.Random(a.seed).shuffle(names)
    if a.limit:
        names = names[:a.limit]
    work = Path(a.work) if a.work else Path(tempfile.mkdtemp(prefix='fnllc-val-', dir=os.environ.get('FNLLC_TMP', str(HERE.parent))))
    work.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    def one(i_n):
        i, n = i_n
        ll = work / ('f%d.ll' % i); o = work / ('f%d.o' % i)
        ll.write_text(extract(m, n))
        r = subprocess.run([LLC] + LLC_ARGS + [str(ll), '-o', str(o)], capture_output=True, text=True)
        if r.returncode:
            return n, 'llc_error'
        return n, 'equal' if compare_obj(o, n, so=a.so, quiet=True) else 'different'
    with ThreadPoolExecutor(max(1, a.jobs)) as ex:
        res = list(ex.map(one, enumerate(names)))
    dt = time.time() - t0
    ne = [n for n, r in res if r == 'different']; err = [n for n, r in res if r == 'llc_error']
    print(json.dumps({'checked': len(names), 'equal': sum(r == 'equal' for _, r in res), 'different': len(ne), 'llc_error': len(err),
                      'seconds': round(dt, 1), 'seconds_per_function': round(dt / max(1, len(names)), 3),
                      'differing': ne[:50], 'llc_errors': err[:20]}, indent=1))
    sys.exit(0 if not ne and not err else 1)


def cmd_vsorig(a):
    """For every normalized-matched window of <measure.json> whose candidate body is a root-crate function of <module.ll>,
    single-function codegen must equal the ORIGINAL window (end-to-end check of IR -> llc -> measure.py normalization)."""
    import time
    from concurrent.futures import ThreadPoolExecutor
    m = parse_module(Path(a.module).read_text())
    defs = {n.strip('"'): n for n in m['defs']}
    rows = json.loads(Path(a.measure).read_text())['rows']
    todo = []
    for r in rows:
        for mt in (r['matches'] or [])[:1]:
            if mt['name'] in defs:
                todo.append((r['start'], defs[mt['name']], r['end'] - r['start']))
    if a.limit: todo = todo[:a.limit]
    work = Path(a.work) if a.work else Path(tempfile.mkdtemp(prefix='fnllc-vo-', dir=os.environ.get('FNLLC_TMP', str(HERE.parent))))
    work.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    def one(i_x):
        i, (start, n, size) = i_x
        ll = work / ('o%d.ll' % i); o = work / ('o%d.o' % i)
        ll.write_text(extract(m, n))
        r = subprocess.run([LLC] + LLC_ARGS + [str(ll), '-o', str(o)], capture_output=True, text=True)
        if r.returncode: return start, n, 'llc_error'
        if compare_obj(o, n, orig=start, quiet=True): return start, n, 'equal'
        # a different length usually means measure.py matched a same-named body from another crate (e.g. the sysroot copy)
        return start, n, 'different' if len(obj_function(o, n)[0]) == size else 'length_differs'
    with ThreadPoolExecutor(max(1, a.jobs)) as ex:
        res = list(ex.map(one, enumerate(todo)))
    bad = [('%#x' % s, n[:100], r) for s, n, r in res if r != 'equal']
    print(json.dumps({'checked': len(res), 'equal': len(res) - len(bad), 'different_same_length': sum(r == 'different' for _, _, r in res),
                      'length_differs': sum(r == 'length_differs' for _, _, r in res), 'seconds': round(time.time() - t0, 1),
                      'not_equal': bad[:30]}, indent=1))
    sys.exit(0 if not any(r == 'different' or r == 'llc_error' for _, _, r in res) else 1)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest='cmd', required=True)
    p = sp.add_parser('extract'); p.add_argument('module'); p.add_argument('symbol'); p.add_argument('out'); p.set_defaults(fn=cmd_extract)
    p = sp.add_parser('llc'); p.add_argument('src'); p.add_argument('out'); p.set_defaults(fn=lambda a: run_llc(a.src, a.out))
    p = sp.add_parser('cmp'); p.add_argument('obj'); p.add_argument('symbol'); p.add_argument('--orig'); p.add_argument('--so'); p.add_argument('--name')
    p.set_defaults(fn=lambda a: sys.exit(0 if compare_obj(a.obj, a.symbol, orig=int(a.orig, 0) if a.orig else None, so=a.so, name=a.name) else 1))
    p = sp.add_parser('check'); p.add_argument('module'); p.add_argument('symbol'); p.add_argument('--orig'); p.add_argument('--so'); p.add_argument('--work'); p.set_defaults(fn=cmd_check)
    p = sp.add_parser('vs-orig'); p.add_argument('module'); p.add_argument('measure'); p.add_argument('--limit', type=int, default=0); p.add_argument('--work'); p.add_argument('--jobs', type=int, default=4); p.set_defaults(fn=cmd_vsorig)
    p = sp.add_parser('validate'); p.add_argument('module'); p.add_argument('so'); p.add_argument('--limit', type=int, default=0); p.add_argument('--seed', type=int, default=1); p.add_argument('--work'); p.add_argument('--jobs', type=int, default=4); p.set_defaults(fn=cmd_validate)
    a = ap.parse_args(); a.fn(a)


if __name__ == '__main__':
    main()
