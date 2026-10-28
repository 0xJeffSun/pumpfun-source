#!/usr/bin/env python3
"""irs.py <in.ll> <fn-substr> <out.ll> ops...  IR surgery on one function. ops:
  split:BB        duplicate block BB per predecessor (copy placed right after each pred)
  move:A:after:B  move block A right after block B
  flip:BB         swap the two successors of BB's conditional br (inverting the icmp via xor)"""
import sys, re
inp, fsub, outp = sys.argv[1:4]; ops = sys.argv[4:]
s = open(inp).read()
m = re.search(r'(define [^\n]*' + re.escape(fsub) + r'[^\n]*\{\n)(.*?)(\n\}\n)', s, re.S)
head, body, tail = m.group(1), m.group(2), m.group(3)
blocks = re.split(r'\n(?=[\w.]+:)', body)
def name(b): return b.split(':')[0]
def find(n): return [i for i, b in enumerate(blocks) if name(b) == n][0]
for op in ops:
    p = op.split(':')
    if p[0] == 'split':
        bb = p[1]; i = find(bb); blk = blocks[i]
        preds = re.search(r'; preds = (.*)', blk.split('\n')[0]).group(1).replace('%', '').split(', ')
        del blocks[i]
        for k, pr in enumerate(preds):
            nn = f'{bb}_s{k}'
            body_lines = blk.split('\n')[1:]
            blocks.insert(find(pr) + 1, f'{nn}:                                              ; preds = %{pr}\n' + '\n'.join(body_lines))
            j = find(pr)
            blocks[j] = re.sub(r'label %' + re.escape(bb) + r'\b', f'label %{nn}', blocks[j])
            # fix phis in successor (bb29) : replace [ x, %bb ] by entries for each copy
        # update phis referencing bb in all blocks
        for j, b in enumerate(blocks):
            def rep(mm):
                val = mm.group(1)
                return ', '.join(f'[ {val}, %{bb}_s{k} ]' for k in range(len(preds)))
            blocks[j] = re.sub(r'\[ ([^\]]+?), %' + re.escape(bb) + r' \]', rep, b)
            blocks[j] = re.sub(r'(; preds = .*)%' + re.escape(bb) + r'\b', lambda mm: mm.group(1) + ', '.join(f'%{bb}_s{k}' for k in range(len(preds))), blocks[j])
    elif p[0] == 'move':
        a, b2 = p[1], p[3]; i = find(a); blk = blocks.pop(i); blocks.insert(find(b2) + 1, blk)
open(outp, 'w').write(s[:m.start()] + head + '\n'.join(blocks) + tail + s[m.end():])
