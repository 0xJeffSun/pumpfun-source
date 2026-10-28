define internal fastcc void @_ZN18pump_amm_recovered12instructions4swap14multi_hop_swap14apply_hop_fees17hc089821ee832d2d0E(ptr dead_on_unwind noalias nocapture noundef writable writeonly align 8 dereferenceable(56) %_0, ptr noalias nocapture noundef readonly align 8 dereferenceable(64) %context, i64 noundef %amount) unnamed_addr #0 {
start:
  %_3 = alloca [56 x i8], align 8
  call void @llvm.lifetime.start.p0(i64 56, ptr nonnull %_3)
  %_17 = load ptr, ptr %context, align 8, !nonnull !2, !align !3, !noundef !2
  %_18 = load ptr, ptr %_17, align 8, !nonnull !2, !align !3, !noundef !2
  %_4 = getelementptr inbounds i8, ptr %_18, i64 8
  %0 = getelementptr inbounds i8, ptr %context, i64 8
  %_19 = load ptr, ptr %0, align 8, !nonnull !2, !align !3, !noundef !2
  %_5 = getelementptr inbounds i8, ptr %_19, i64 8
  %1 = getelementptr inbounds i8, ptr %context, i64 16
  %_20 = load ptr, ptr %1, align 8, !nonnull !2, !align !3, !noundef !2
  %2 = getelementptr inbounds i8, ptr %_20, i64 32
  %_21 = load ptr, ptr %2, align 8, !nonnull !2, !align !3, !noundef !2
  %3 = getelementptr inbounds i8, ptr %context, i64 24
  %_22 = load ptr, ptr %3, align 8, !nonnull !2, !align !3, !noundef !2
  %_7 = load i64, ptr %_22, align 8, !noundef !2
  %4 = getelementptr inbounds i8, ptr %context, i64 32
  %_23 = load ptr, ptr %4, align 8, !nonnull !2, !align !3, !noundef !2
  %_8 = load i64, ptr %_23, align 8, !noundef !2
  %5 = getelementptr inbounds i8, ptr %context, i64 40
  %_24 = load ptr, ptr %5, align 8, !nonnull !2, !align !3, !noundef !2
  %_9 = load i64, ptr %_24, align 8, !noundef !2
  %6 = getelementptr inbounds i8, ptr %context, i64 48
  %_25 = load ptr, ptr %6, align 8, !nonnull !2, !align !3, !noundef !2
  %_10 = load i64, ptr %_25, align 8, !noundef !2
; call pump_amm_recovered::curve::fees::select_and_apply_v2
  call void @_ZN18pump_amm_recovered5curve4fees19select_and_apply_v217h28f0417ffd05145aE(ptr noalias nocapture noundef nonnull sret([56 x i8]) align 8 dereferenceable(56) %_3, ptr noalias noundef nonnull readonly align 8 dereferenceable(280) %_4, ptr noalias noundef nonnull readonly align 8 dereferenceable(944) %_5, ptr noalias noundef nonnull readonly align 8 dereferenceable(136) %_21, i64 noundef %_7, i64 noundef %_8, i64 noundef %_9, i64 noundef %_10, i64 noundef %amount) #34
  %_11 = load i64, ptr %_3, align 8, !range !352, !noundef !2
  %trunc.not = icmp eq i64 %_11, 0
  br i1 %trunc.not, label %bb4, label %bb3

bb4:                                              ; preds = %start
  %7 = getelementptr inbounds i8, ptr %context, i64 56
  %_26 = load ptr, ptr %7, align 8, !nonnull !2, !align !321, !noundef !2
  %_14.sroa.0.0.copyload = load i24, ptr %_26, align 1
  %_15 = getelementptr inbounds i8, ptr %_3, i64 8
  %8 = and i24 %_14.sroa.0.0.copyload, 65536
  %_5.not.i = icmp eq i24 %8, 0
  %_6.i = load i64, ptr %_15, align 8, !alias.scope !5235, !noalias !5238
  %9 = getelementptr inbounds i8, ptr %_3, i64 32
  %_7.i = load i64, ptr %9, align 8, !alias.scope !5235, !noalias !5238
  %_18.sroa.0.0.i = select i1 %_5.not.i, i64 0, i64 %_6.i
  %_19.sroa.0.0.i = select i1 %_5.not.i, i64 0, i64 %_7.i
  %10 = and i24 %_14.sroa.0.0.copyload, 256
  %_10.not.i = icmp eq i24 %10, 0
  %11 = getelementptr inbounds i8, ptr %_3, i64 24
  %_11.i = load i64, ptr %11, align 8, !alias.scope !5235, !noalias !5238
  %12 = getelementptr inbounds i8, ptr %_3, i64 48
  %_12.i = load i64, ptr %12, align 8, !alias.scope !5235, !noalias !5238
  %_20.sroa.0.0.i = select i1 %_10.not.i, i64 0, i64 %_11.i
  %_21.sroa.0.0.i = select i1 %_10.not.i, i64 0, i64 %_12.i
  %13 = and i24 %_14.sroa.0.0.copyload, 1
  %_15.not.i = icmp eq i24 %13, 0
  %14 = getelementptr inbounds i8, ptr %_3, i64 16
  %_16.i = load i64, ptr %14, align 8, !alias.scope !5235, !noalias !5238
  %15 = getelementptr inbounds i8, ptr %_3, i64 40
  %_17.i = load i64, ptr %15, align 8, !alias.scope !5235, !noalias !5238
  %16 = inttoptr i64 %_16.i to ptr
  %_23.sroa.0.0.i = select i1 %_15.not.i, i64 0, i64 %_17.i
  %17 = select i1 %_15.not.i, ptr null, ptr %16
  %_13.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %_0, i64 24
  store i64 %_20.sroa.0.0.i, ptr %_13.sroa.5.0..sroa_idx, align 8
  %_13.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %_0, i64 32
  store i64 %_19.sroa.0.0.i, ptr %_13.sroa.6.0..sroa_idx, align 8
  %_13.sroa.7.0..sroa_idx = getelementptr inbounds i8, ptr %_0, i64 40
  store i64 %_23.sroa.0.0.i, ptr %_13.sroa.7.0..sroa_idx, align 8
  %_13.sroa.8.0..sroa_idx = getelementptr inbounds i8, ptr %_0, i64 48
  store i64 %_21.sroa.0.0.i, ptr %_13.sroa.8.0..sroa_idx, align 8
  br label %bb6

bb3:                                              ; preds = %start
  %18 = getelementptr inbounds i8, ptr %_3, i64 8
  %error.0 = load i64, ptr %18, align 8, !range !352, !noundef !2
  %19 = getelementptr inbounds i8, ptr %_3, i64 16
  %error.1 = load ptr, ptr %19, align 8, !noundef !2
  br label %bb6

bb6:                                              ; preds = %bb3, %bb4
  %error.0.sink = phi i64 [ %_18.sroa.0.0.i, %bb4 ], [ %error.0, %bb3 ]
  %error.1.sink = phi ptr [ %17, %bb4 ], [ %error.1, %bb3 ]
  %storemerge = phi i64 [ 0, %bb4 ], [ 1, %bb3 ]
  %20 = getelementptr inbounds i8, ptr %_0, i64 8
  store i64 %error.0.sink, ptr %20, align 8
  %21 = getelementptr inbounds i8, ptr %_0, i64 16
  store ptr %error.1.sink, ptr %21, align 8
  store i64 %storemerge, ptr %_0, align 8
  call void @llvm.lifetime.end.p0(i64 56, ptr nonnull %_3)
  ret void
}
