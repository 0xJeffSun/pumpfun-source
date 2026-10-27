define hidden void @_ZN16mayhem_recovered5state10sell_quote17h60c5c6960f296d44E(ptr dead_on_unwind noalias nocapture noundef writable writeonly sret([24 x i8]) align 8 dereferenceable(24) %_0, ptr noalias nocapture noundef readonly align 8 dereferenceable(248) %global_params, i64 noundef %0, i64 noundef %1, i64 noundef %balance, i16 noundef %retained_bps, ptr noalias nocapture noundef readonly align 1 dereferenceable(32) %quote_mint) unnamed_addr #1 {
start:
  %_18.i = alloca [0 x i8], align 1
  %_45 = alloca [4 x i8], align 4
  %_2.1.i = icmp ugt i16 %retained_bps, 10000
  br i1 %_2.1.i, label %panic.i, label %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit

panic.i:                                          ; preds = %start
; call core::panicking::panic_const::panic_const_sub_overflow
  tail call void @_ZN4core9panicking11panic_const24panic_const_sub_overflow17h73105958df4c0d1cE(ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_a6d94fd85e8f5340e18a55c0b79b9b53) #22
  unreachable

_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit: ; preds = %start
  %_2.0.i = sub nuw nsw i16 10000, %retained_bps
  call void @llvm.lifetime.start.p0(i64 0, ptr nonnull %_18.i)
  %_6.i = zext i64 %balance to i128
  %_10.i = zext i64 %0 to i128
  %2 = add nuw nsw i128 %_6.i, %_10.i
  %3 = icmp eq i128 %2, 0
  br i1 %3, label %_ZN16mayhem_recovered5state13initial_quote17hd801fba5aa579a48E.exit, label %bb6.i, !prof !62

bb6.i:                                            ; preds = %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit
  %_7.i = zext i64 %1 to i128
  %4 = mul nuw i128 %_6.i, %_7.i
  %_14.i = udiv i128 %4, %2
  %_16.i = icmp ugt i128 %_14.i, 18446744073709551615
  br i1 %_16.i, label %bb7.i, label %bb8.i, !prof !62

bb8.i:                                            ; preds = %bb6.i
  %_17.i = trunc nuw i128 %_14.i to i64
  br label %_ZN16mayhem_recovered5state13initial_quote17hd801fba5aa579a48E.exit

bb7.i:                                            ; preds = %bb6.i
; call core::result::unwrap_failed
  call void @_ZN4core6result13unwrap_failed17h5a0595231043dbf9E(ptr noalias noundef nonnull readonly align 1 @alloc_00ae4b301f7fab8ac9617c03fcbd7274, i64 noundef 43, ptr noundef nonnull align 1 %_18.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(32) @vtable.6, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_3bc21005be708bd8799a68fc83e02496) #22
  unreachable

_ZN16mayhem_recovered5state13initial_quote17hd801fba5aa579a48E.exit: ; preds = %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit, %bb8.i
  %_0.sroa.0.0.i = phi i64 [ %_17.i, %bb8.i ], [ -1, %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit ]
  call void @llvm.lifetime.end.p0(i64 0, ptr nonnull %_18.i)
  %5 = load i64, ptr %quote_mint, align 1
  %.not = icmp eq i64 %5, 0
  %6 = getelementptr inbounds nuw i8, ptr %quote_mint, i64 8
  %7 = load i64, ptr %6, align 1
  %.not17 = icmp eq i64 %7, 0
  %or.cond41 = select i1 %.not, i1 %.not17, i1 false
  %8 = getelementptr inbounds nuw i8, ptr %quote_mint, i64 16
  %9 = load i64, ptr %8, align 1
  %.not18 = icmp eq i64 %9, 0
  %or.cond43 = select i1 %or.cond41, i1 %.not18, i1 false
  %10 = getelementptr inbounds nuw i8, ptr %quote_mint, i64 24
  %11 = load i64, ptr %10, align 1
  %.not19 = icmp eq i64 %11, 0
  %or.cond45 = select i1 %or.cond43, i1 %.not19, i1 false
  br i1 %or.cond45, label %bb8, label %res_block

res_block:                                        ; preds = %_ZN16mayhem_recovered5state13initial_quote17hd801fba5aa579a48E.exit
  %.not20 = icmp eq i64 %5, -8898642279828776186
  %.not21 = icmp eq i64 %7, 3873122370134698235
  %or.cond = select i1 %.not20, i1 %.not21, i1 false
  %.not22 = icmp eq i64 %9, 6141761017446253786
  %or.cond26 = select i1 %or.cond, i1 %.not22, i1 false
  %.not23 = icmp eq i64 %11, 72057594053697688
  %or.cond28 = select i1 %or.cond26, i1 %.not23, i1 false
  br i1 %or.cond28, label %bb8, label %res_block12

res_block12:                                      ; preds = %res_block
  br label %bb8

bb8:                                              ; preds = %res_block, %_ZN16mayhem_recovered5state13initial_quote17hd801fba5aa579a48E.exit, %res_block12
  %.sink = phi i64 [ 176, %res_block12 ], [ 96, %_ZN16mayhem_recovered5state13initial_quote17hd801fba5aa579a48E.exit ], [ 96, %res_block ]
  %12 = getelementptr inbounds nuw i8, ptr %global_params, i64 %.sink
  %cap.sroa.0.0 = load i64, ptr %12, align 8, !noundef !2
  %13 = icmp eq i64 %cap.sroa.0.0, 0
  %cap.sroa.0.0.quote2 = tail call i64 @llvm.umin.i64(i64 %cap.sroa.0.0, i64 %_0.sroa.0.0.i)
  %quote.sroa.0.0 = select i1 %13, i64 %_0.sroa.0.0.i, i64 %cap.sroa.0.0.quote2
  %_22 = zext i64 %1 to i128
  %_23 = zext nneg i16 %_2.0.i to i128
  %14 = mul nuw nsw i128 %_23, %_22
  %_20 = udiv i128 %14, 10000
  %_19 = trunc nuw i128 %_20 to i64
  %storemerge = tail call i64 @llvm.umin.i64(i64 %quote.sroa.0.0, i64 %_19)
  %or.cond46.not = icmp ugt i64 %1, %storemerge
  br i1 %or.cond46.not, label %bb24, label %bb23, !prof !1431

bb23:                                             ; preds = %bb8
  call void @llvm.lifetime.start.p0(i64 4, ptr nonnull %_45)
  store i32 11, ptr %_45, align 4
; call core::result::unwrap_failed
  call void @_ZN4core6result13unwrap_failed17h5a0595231043dbf9E(ptr noalias noundef nonnull readonly align 1 @alloc_00ae4b301f7fab8ac9617c03fcbd7274, i64 noundef 43, ptr noundef nonnull align 1 %_45, ptr noalias noundef nonnull readonly align 8 dereferenceable(32) @vtable.7, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_a304a4aae9dfb75dc0f089a2cd9756ef) #22
  unreachable

bb24:                                             ; preds = %bb8
  %_11.i = zext i64 %storemerge to i128
  %15 = mul nuw i128 %_11.i, %_10.i
  %_20.i = sub nuw i64 %1, %storemerge
  %_15.i = zext i64 %_20.i to i128
  %_26.i = udiv i128 %15, %_15.i
  %_49 = icmp ugt i128 %_26.i, 18446744073709551615
  br i1 %_49, label %bb25, label %bb26, !prof !62

bb26:                                             ; preds = %bb24
  %_50 = trunc nuw i128 %_26.i to i64
  %16 = tail call i64 @llvm.usub.sat.i64(i64 %storemerge, i64 1)
  %17 = getelementptr inbounds nuw i8, ptr %_0, i64 8
  store i64 %_50, ptr %17, align 8
  %18 = getelementptr inbounds nuw i8, ptr %_0, i64 16
  store i64 %16, ptr %18, align 8
  store i64 0, ptr %_0, align 8
  ret void

bb25:                                             ; preds = %bb24
; call core::result::unwrap_failed
  call void @_ZN4core6result13unwrap_failed17h5a0595231043dbf9E(ptr noalias noundef nonnull readonly align 1 @alloc_00ae4b301f7fab8ac9617c03fcbd7274, i64 noundef 43, ptr noundef nonnull align 1 %_18.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(32) @vtable.6, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_7b50cdba9f9ee5e5698772572da66a97) #22
  unreachable
}
