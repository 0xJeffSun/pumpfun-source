#!/usr/bin/env python3
# list calls in an original window with target names (from functions.tsv candidate names)
import sys, csv, json, subprocess, re
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
rows={}
for r in csv.DictReader(open(W+'/base/functions.tsv'),delimiter='\t'):
    if r['program']=='pump' and r['variant']=='selected':
        rows[int(r['original_start'])]=r
starts=sorted(rows)
def name(a):
    r=rows.get(a)
    if not r: return '?'
    n=json.loads(r['candidate_names']) if r['candidate_names'] else []
    return (r['disposition'][:12]+' '+'|'.join(n)[:150]) if n else r['disposition']
a=int(sys.argv[1],16); r=rows[a]; e=int(r['original_end'])
txt=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={e:#x}',W+'/base/original.so'],text=True)
for line in txt.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+call\s+(-?0x[0-9a-f]+|-?\d+)',line)
    if m:
        pc=int(m.group(1),16); imm=int(m.group(2),0)
        if imm>=0x80000000: print(hex(pc),'syscall',hex(imm)); continue
        t=pc+8+imm*8
        print(hex(pc),hex(t),name(t))
    elif 'call' in line: print(line.strip())
