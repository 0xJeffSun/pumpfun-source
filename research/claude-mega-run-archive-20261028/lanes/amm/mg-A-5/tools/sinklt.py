# sinklt.py IN.ll OUT.ll BLOCK OKSUCC ERRSUCC ALLOCA : move 'lifetime.end(ALLOCA)' before BLOCK's cond branch into
# a new Ok-edge block and into the error block start (models no hoisting of StorageDead)
import sys,re
s=open(sys.argv[1]).read(); B,OK,ER,A=sys.argv[3:7]
k=s.index('4sell7execute17h'); st=s.rfind('\ndefine',0,k); en=s.index('\n}\n',st); f=s[st:en]
lt=f'  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull {A})\n'
i=f.index(f'\n{B}:'); j=f.index('\n\n',i); blk=f[i:j]
assert lt in blk+'\n', 'lt'
blk=blk.replace(lt,'',1)
m=re.search(rf'br i1 (%\S+), label %{OK}, label %{ER}',blk); assert m
blk=blk.replace(m.group(0),f'br i1 {m.group(1)}, label %{B}.ok, label %{ER}')+f'\n\n{B}.ok:\n{lt}  br label %{OK}'
f=f[:i]+blk+f[j:]
i=f.index(f'\n{OK}:'); j=f.index('\n\n',i); f=f[:i]+f[i:j].replace(f'%{B} ]',f'%{B}.ok ]').replace(f'%{B},',f'%{B}.ok,')+f[j:]
i=f.index(f'\n{ER}:'); e=f.index('\n',i+1); f=f[:e+1]+lt+f[e+1:]
open(sys.argv[2],'w').write(s[:st]+f+s[en:])
