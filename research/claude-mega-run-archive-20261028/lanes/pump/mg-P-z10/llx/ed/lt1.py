lt='  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_87.i), !noalias !72894'
rep(lt+'\n','')
i=f.index('\nbb76.i:'); j=f.index('\n',i+1)
f=f[:j+1]+lt+'\n'+f[j+1:]
