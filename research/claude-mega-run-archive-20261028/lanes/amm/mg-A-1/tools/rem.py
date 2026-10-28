#!/usr/bin/env python3
"""rem.py REMARKS.txt CALLER_SUBSTR [CALLEE_SUBSTR] -> inline decisions into caller (short names)"""
import sys,re,collections
f,cs=sys.argv[1],sys.argv[2]; ce=sys.argv[3] if len(sys.argv)>3 else ''
def short(s):
    s=re.sub(r'17h[0-9a-f]{16}E$','',s)
    s=s.replace('$LT$','<').replace('$GT$','>').replace('$u20$',' ').replace('..','::').replace('$C$',',')
    return s[-70:]
cnt=collections.Counter()
for l in open(f,errors='replace'):
    m=re.search(r"inline \((success|missed)\): '([^']+)' (?:inlined into|not inlined into) '([^']+)'(.*)",l)
    if not m: continue
    st,callee,caller,rest=m.groups()
    if cs not in caller or ce not in callee: continue
    c=re.search(r'cost=([^,)]+), threshold=([^)]+)',rest); r=re.search(r'because (.*)',rest)
    key=(st,short(callee),c.groups() if c else (r.group(1)[:50] if r else rest.strip()[:50]))
    cnt[key]+=1
for (st,cal,info),n in sorted(cnt.items(),key=lambda x:(x[0][0],x[0][1])):
    print(f'{st[:4]} x{n} {cal} {info}')
