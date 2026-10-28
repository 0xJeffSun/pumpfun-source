a=line('dereferenceable(16) %val.sroa.6.i, ptr noundef nonnull align 8 dereferenceable(16) %_176.sroa.7.0..sroa_idx.i')
b=line('dereferenceable(16) %val.sroa.6.0.header.sroa_idx.i, ptr noundef nonnull align 8 dereferenceable(16) %val.sroa.6.i')
le='  call void @llvm.lifetime.end.p0(i64 40, ptr nonnull %_76.i), !noalias !72894'
old=a+'\n'+le+'\n'
assert old in f
rep(old,'')
rep(b, b.replace('%val.sroa.6.i, i64 16','%_176.sroa.7.0..sroa_idx.i, i64 16')+'\n'+le)
