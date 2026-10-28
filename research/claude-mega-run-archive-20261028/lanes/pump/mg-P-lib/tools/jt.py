import sys,re
# jt.py <disasm file> <target hex>: list jumps to target
T=int(sys.argv[2],16)
for line in open(sys.argv[1]):
    m=re.match(r'^(0x[0-9a-f]+)\s+(j\w+|ja)\s.*?([+-]0x[0-9a-f]+)\s*$',line.strip())
    if m:
        pc=int(m.group(1),16); off=int(m.group(3),16)
        if pc+8+off*8==T: print(line.rstrip())
