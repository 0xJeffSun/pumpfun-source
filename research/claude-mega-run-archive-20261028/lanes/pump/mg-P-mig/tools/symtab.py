import subprocess, os, pickle
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
def symtab(so):
    """[(addr,size,demangled)] for function symbols, cached next to the .so"""
    cache = so + '.syms.pkl'
    if os.path.exists(cache) and os.path.getmtime(cache) >= os.path.getmtime(so):
        return pickle.load(open(cache, 'rb'))
    rows = []
    for l in subprocess.run([OD, '-t', so], capture_output=True, text=True).stdout.splitlines():
        p = l.split()
        if len(p) >= 5 and p[2] == 'F':
            sz = int(p[-3] if p[-2] == '.hidden' else p[-2], 16); rows.append((int(p[0], 16), sz, p[-1]))
    names = subprocess.run(['c++filt'], input='\n'.join(r[2] for r in rows), capture_output=True, text=True).stdout.split('\n')
    out = sorted((r[0], r[1], names[i]) for i, r in enumerate(rows))
    pickle.dump(out, open(cache, 'wb')); return out
