define internal fastcc void @_ZN18pump_amm_recovered12instructions4swap14multi_hop_swap14apply_hop_fees17hc089821ee832d2d0E(ptr dead_on_unwind noalias nocapture noundef writable writeonly align 8 dereferenceable(56) %_0, ptr noalias nocapture noundef readonly align 8 dereferenceable(64) %context, i64 noundef %amount) unnamed_addr #0 {
start:
  %_4 = alloca [56 x i8], align 8
  call void @llvm.lifetime.start.p0(i64 56, ptr nonnull %_4)
  %_23 = load ptr, ptr %context, align 8, !nonnull !2, !align !3, !noundef !2
  %_24 = load ptr, ptr %_23, align 8, !nonnull !2, !align !3, !noundef !2
  %_5 = getelementptr inbounds i8, ptr %_24, i64 8
  %0 = getelementptr inbounds i8, ptr %context, i64 8
  %_25 = load ptr, ptr %0, align 8, !nonnull !2, !align !3, !noundef !2
  %_6 = getelementptr inbounds i8, ptr %_25, i64 8
  %1 = getelementptr inbounds i8, ptr %context, i64 16
  %_26 = load ptr, ptr %1, align 8, !nonnull !2, !align !3, !noundef !2
  %2 = getelementptr inbounds i8, ptr %_26, i64 32
  %_27 = load ptr, ptr %2, align 8, !nonnull !2, !align !3, !noundef !2
  %3 = getelementptr inbounds i8, ptr %context, i64 24
  %_28 = load ptr, ptr %3, align 8, !nonnull !2, !align !3, !noundef !2
  %_8 = load i64, ptr %_28, align 8, !noundef !2
  %4 = getelementptr inbounds i8, ptr %context, i64 32
  %_29 = load ptr, ptr %4, align 8, !nonnull !2, !align !3, !noundef !2
  %_9 = load i64, ptr %_29, align 8, !noundef !2
  %5 = getelementptr inbounds i8, ptr %context, i64 40
  %_30 = load ptr, ptr %5, align 8, !nonnull !2, !align !3, !noundef !2
  %_10 = load i64, ptr %_30, align 8, !noundef !2
  %6 = getelementptr inbounds i8, ptr %context, i64 48
  %_31 = load ptr, ptr %6, align 8, !nonnull !2, !align !3, !noundef !2
  %_11 = load i64, ptr %_31, align 8, !noundef !2
; call pump_amm_recovered::curve::fees::select_and_apply_v2
  call void @_ZN18pump_amm_recovered5curve4fees19select_and_apply_v217h28f0417ffd05145aE(ptr noalias nocapture noundef nonnull sret([56 x i8]) align 8 dereferenceable(56) %_4, ptr noalias noundef nonnull readonly align 8 dereferenceable(280) %_5, ptr noalias noundef nonnull readonly align 8 dereferenceable(944) %_6, ptr noalias noundef nonnull readonly align 8 dereferenceable(136) %_27, i64 noundef %_8, i64 noundef %_9, i64 noundef %_10, i64 noundef %_11, i64 noundef %amount) #34
  %_35 = load i64, ptr %_4, align 8, !range !352, !noundef !2
  %trunc.not = icmp eq i64 %_35, 0
  %7 = getelementptr inbounds i8, ptr %_4, i64 8
  %_36.sroa.0.0.copyload = load i64, ptr %7, align 8
  %_36.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %_4, i64 16
  br i1 %trunc.not, label %bb14, label %bb13

bb14:                                             ; preds = %start
  %_36.sroa.5.0.copyload = load i64, ptr %_36.sroa.5.0..sroa_idx, align 8
  %_36.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %_4, i64 24
  %_36.sroa.6.0.copyload = load i64, ptr %_36.sroa.6.0..sroa_idx, align 8
  %_36.sroa.7.0..sroa_idx = getelementptr inbounds i8, ptr %_4, i64 32
  %_36.sroa.7.0.copyload = load i64, ptr %_36.sroa.7.0..sroa_idx, align 8
  %_36.sroa.8.0..sroa_idx = getelementptr inbounds i8, ptr %_4, i64 40
  %_36.sroa.8.0.copyload = load i64, ptr %_36.sroa.8.0..sroa_idx, align 8
  %_36.sroa.9.0..sroa_idx = getelementptr inbounds i8, ptr %_4, i64 48
  %_36.sroa.9.0.copyload = load i64, ptr %_36.sroa.9.0..sroa_idx, align 8
  call void @llvm.lifetime.end.p0(i64 56, ptr nonnull %_4)
  %8 = getelementptr inbounds i8, ptr %context, i64 56
  %_32 = load ptr, ptr %8, align 8, !nonnull !2, !align !321, !noundef !2
  %9 = getelementptr inbounds i8, ptr %_32, i64 1
  %10 = load i8, ptr %9, align 1, !range !323, !noundef !2
  %_15.not = icmp eq i8 %10, 0
  %._36.sroa.6.0.copyload = select i1 %_15.not, i64 0, i64 %_36.sroa.6.0.copyload
  %._36.sroa.9.0.copyload = select i1 %_15.not, i64 0, i64 %_36.sroa.9.0.copyload
  %11 = getelementptr inbounds i8, ptr %_32, i64 2
  %12 = load i8, ptr %11, align 1, !range !323, !noundef !2
  %_18.not = icmp eq i8 %12, 0
  %_42.sroa.0.0 = select i1 %_18.not, i64 0, i64 %_36.sroa.0.0.copyload
  %_43.sroa.0.0 = select i1 %_18.not, i64 0, i64 %_36.sroa.7.0.copyload
  %13 = load i8, ptr %_32, align 1, !range !323, !noundef !2
  %_21.not = icmp eq i8 %13, 0
  %14 = inttoptr i64 %_36.sroa.5.0.copyload to ptr
  %_45.sroa.0.0 = select i1 %_21.not, i64 0, i64 %_36.sroa.8.0.copyload
  %15 = select i1 %_21.not, ptr null, ptr %14
  %_22.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %_0, i64 24
  store i64 %._36.sroa.6.0.copyload, ptr %_22.sroa.5.0..sroa_idx, align 8
  %_22.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %_0, i64 32
  store i64 %_43.sroa.0.0, ptr %_22.sroa.6.0..sroa_idx, align 8
  %_22.sroa.7.0..sroa_idx = getelementptr inbounds i8, ptr %_0, i64 40
  store i64 %_45.sroa.0.0, ptr %_22.sroa.7.0..sroa_idx, align 8
  %_22.sroa.8.0..sroa_idx = getelementptr inbounds i8, ptr %_0, i64 48
  store i64 %._36.sroa.9.0.copyload, ptr %_22.sroa.8.0..sroa_idx, align 8
  br label %bb12

bb13:                                             ; preds = %start
  %_37.1 = load ptr, ptr %_36.sroa.5.0..sroa_idx, align 8, !noundef !2
  call void @llvm.lifetime.end.p0(i64 56, ptr nonnull %_4)
  br label %bb12

bb12:                                             ; preds = %bb13, %bb14
  %_36.sroa.0.0.copyload.sink = phi i64 [ %_42.sroa.0.0, %bb14 ], [ %_36.sroa.0.0.copyload, %bb13 ]
  %_37.1.sink = phi ptr [ %15, %bb14 ], [ %_37.1, %bb13 ]
  %storemerge = phi i64 [ 0, %bb14 ], [ 1, %bb13 ]
  %16 = getelementptr inbounds i8, ptr %_0, i64 8
  store i64 %_36.sroa.0.0.copyload.sink, ptr %16, align 8
  %17 = getelementptr inbounds i8, ptr %_0, i64 16
  store ptr %_37.1.sink, ptr %17, align 8
  store i64 %storemerge, ptr %_0, align 8
  ret void
}
