#!/usr/bin/env python3
"""Produce heuristic source-origin guesses for store-immediate-similar windows.
Pointer proximity and the first small store value do not prove a filename,
line number or call-site identity. Requires explicit trusted inputs and a fresh
JSON output; no ELF is modified.
"""
import argparse, collections, importlib.util, json, re, struct, sys
from pathlib import Path

ap = argparse.ArgumentParser(description=__doc__)
ap.add_argument('--elf-reader', type=Path, required=True, help='Explicit trusted elf_reader.py implementation; not bundled')
ap.add_argument('--original', type=Path, required=True, help='Explicit captured original; inspected only on deliberate invocation')
ap.add_argument('--symbols', type=Path, required=True, help='Matching unstripped reconstruction ELF')
ap.add_argument('--catalog', type=Path, required=True, help='Matching pump-bodies.json scorer catalog')
ap.add_argument('--output', type=Path, required=True, help='Fresh output JSON path; existing evidence is never replaced')
args = ap.parse_args()
for name in ['elf_reader', 'original', 'symbols', 'catalog']:
    path = getattr(args, name).resolve()
    if not path.is_file():
        ap.error('--' + name.replace('_', '-') + ': missing explicit input: ' + str(path))
    setattr(args, name, path)
args.output = args.output.absolute()
if args.output.exists() or args.output.is_symlink():
    ap.error('--output must be fresh; preserve the existing file')
if not args.output.parent.is_dir():
    ap.error('--output parent directory must already exist')
# Import no decoder until all explicit inputs and output admission are valid.
spec = importlib.util.spec_from_file_location('_explicit_frontier_elf_reader', args.elf_reader)
reader = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = reader
spec.loader.exec_module(reader)
Elf = reader.Elf
orig = Elf(args.original)
sym = Elf(args.symbols)
with args.catalog.open() as stream:
    d = json.load(stream)
unm=[r for r in d['original_windows'] if not r['candidate_matches']]
bysize=collections.defaultdict(list)
for fn in sym.funcs: bysize[fn['size']].append(fn)

def read_str(elf,addr,length):
    for name,s in elf.secs.items():
        if s[3]<=addr<s[3]+s[5] and s[1]!=8:
            fo=s[4]+(addr-s[3]); return elf.b[fo:fo+length].decode('latin1')
    return None

def origin(elf,start,size):
    b=elf.b; fn=None; line=None
    for at in range(start,start+size,8):
        if b[at]==0x7a:
            L=struct.unpack_from('<i',b,at+4)[0]
            for back in range(8,72,8):
                j=at-back
                if j>=start and b[j]==0x18:
                    ptr=struct.unpack_from('<I',b,j+4)[0]|(struct.unpack_from('<I',b,j+12)[0]<<32)
                    s=read_str(elf,ptr,L) if 0<L<90 else None
                    if s and s.endswith('.rs'): fn=s
        if b[at]==0x62:
            v=struct.unpack_from('<i',b,at+4)[0]
            if 0<v<6000 and line is None: line=v   # line!(), not the 6000+ code
    return fn,line

rows=[]
for r in unm:
    s,e=r['start'],r['end']; on=orig.normalized[s:e]
    cands=bysize.get(e-s,[])
    if not cands: continue
    best=None
    for f in cands:
        cn=sym.normalized[f['start']:f['start']+f['size']]
        h=sum(a!=b for a,b in zip(on,cn))
        if best is None or h<best[0]: best=(h,f,cn)
    h,f,cn=best
    diffs=[i for i in range(e-s) if on[i]!=cn[i]]
    if not diffs or not all(on[(i//8)*8] in (0x62,0x7a) and i%8>=4 for i in diffs): continue
    of,ol=origin(orig,s,e)
    rows.append({'off':r['start_hex'],'size':e-s,'orig_file':of,'orig_line':ol,'helper':f['name']})

byfile=collections.Counter(r['orig_file'] for r in rows)
bysz=collections.Counter(r['size'] for r in rows)
print("metadata_only windows mapped:",len(rows))
print("--- original call-site FILES (count of windows) ---")
for fpath,c in byfile.most_common(): print("  %-55s %d"%(fpath,c))
print("--- window sizes (one dominant helper?) ---")
for sz,c in bysz.most_common(8): print("  size=%-6d %d"%(sz,c))
json.dump(rows,args.output.open('x'),indent=2)
print("wrote metadata-callsite-map.json")
