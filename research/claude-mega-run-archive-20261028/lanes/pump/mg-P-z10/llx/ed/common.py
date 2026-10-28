B=line('dereferenceable(16) %val.sroa.6.0.header.sroa_idx.i, ptr noundef nonnull align 8 dereferenceable(16) %val.sroa.6.i')
D=line('dereferenceable(32) %header.i, ptr noundef nonnull align 1 dereferenceable(32) %idl_authority, i64 32')
C='''  %borrow.i.i.i88.i = load i64, ptr %_80.i, align 8, !noalias !72894, !noundef !2
  %val.i.i.i89.i = add i64 %borrow.i.i.i88.i, -1
  store i64 %val.i.i.i89.i, ptr %_80.i, align 8, !noalias !72894'''
assert C in f
