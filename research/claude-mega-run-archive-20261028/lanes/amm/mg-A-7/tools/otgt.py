import types,pathlib,sys,json,bisect
T=pathlib.Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=pathlib.Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
rows=json.load(open(sys.argv[2] if len(sys.argv)>2 else pathlib.Path.home()/'amm100-run/lanes/mg-A-7/out/rows.json'))
names={int(r['original'],16):((r['match'] or 'UNMATCHED').split('17h')[0][-70:],r['bytes']) for r in rows}
o=m.Elf(ORIG);E=o.entries
a=int(sys.argv[1],16);z=next(x for x in E+[o.hi] if x>a)
for at in sorted(o.calls):
  if a<=at<z:
    t=o.calls[at];print(hex(at-a),hex(t),names.get(t,('?',0)))
