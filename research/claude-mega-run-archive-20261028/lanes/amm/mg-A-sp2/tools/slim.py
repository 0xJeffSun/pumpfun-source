#!/usr/bin/env python3
"""slim.py IN.ll OUT.ll KEEPSUB[,KEEPSUB2] -> turn every function definition not matching KEEPSUB into a declaration (faster llc)"""
import sys,re
src,out,keep=sys.argv[1],sys.argv[2],sys.argv[3].split(',')
lines=open(src,errors='replace').read().split('\n')
res=[];i=0;n=len(lines)
while i<n:
    l=lines[i]
    if l.startswith('define '):
        if any(k in l for k in keep):
            while True:
                res.append(lines[i])
                if lines[i]=='}': break
                i+=1
            i+=1; continue
        # make declaration
        hdr=l[len('define '):]
        hdr=re.sub(r'\s*\{\s*$','',hdr)
        hdr=re.sub(r'^(internal|private|linkonce_odr|weak_odr|available_externally|linkonce|weak)\s+','',hdr)
        hdr=re.sub(r'\s+personality\s+ptr\s+@\S+','',hdr)
        hdr=re.sub(r'\s+comdat(\([^)]*\))?','',hdr)
        hdr=re.sub(r'\s+section\s+"[^"]*"','',hdr)
        hdr=re.sub(r'\s+!dbg\s+!\d+','',hdr)
        hdr=re.sub(r'\s+prefix\s+\S+','',hdr)
        res.append('declare '+hdr)
        while lines[i]!='}': i+=1
        i+=1; continue
    m=re.match(r'^(@"[^"]+"|@[\w.$]+) = .*?alias (.+?) \((.*)\), ptr @',l)
    if m and not any(k in l.split(' = ')[0] for k in keep):
        res.append(f'declare {m.group(2)} {m.group(1)}({m.group(3)})'); i+=1; continue
    res.append(l); i+=1
open(out,'w').write('\n'.join(res))
