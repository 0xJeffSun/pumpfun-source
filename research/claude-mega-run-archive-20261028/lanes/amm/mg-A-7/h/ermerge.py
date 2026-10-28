import re,sys,subprocess,os
src,out,sub=sys.argv[1:4]; keep=sys.argv[4]; merge=sys.argv[5].split(',')
s=open(src).read();i=s.index('define')
while sub not in s[i:s.index('\n',i)]: i=s.index('\ndefine',i)+1
j=s.index('\n}\n',i);f=s[i:j]
f=re.sub(r'%(\d+)\b',r'%v\1',f)
for b in merge:
    # remove block b
    f=re.sub(r'\n'+re.escape(b)+r':.*?(?=\n[\w.$-]+:|\Z)','',f,flags=re.S)
    f=re.sub(r'label %'+re.escape(b)+r'\b','label %'+keep,f)
open(out,'w').write(s[:i]+f+s[j:])
