import types,pathlib,struct,sys
T=pathlib.Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
o=m.Elf(pathlib.Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so')
b=o.b
for a in sys.argv[1:]:
  a=int(a,16);q,ln,line,col=struct.unpack_from('<QQII',b,a)
  for ptr in (q&0xffffffff,q>>32):
    if 0x11bc58<=ptr<0x11bc58+0x6473: print(hex(a),b[ptr:ptr+ln].decode(errors='replace'),line,col);break
  else: print(hex(a),hex(q),ln,line,col)
