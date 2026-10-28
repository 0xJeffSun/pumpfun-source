define hidden void @_ZN18pump_amm_recovered5curve4fees19select_and_apply_v217h28f0417ffd05145aE(ptr dead_on_unwind noalias nocapture noundef writable writeonly sret([56 x i8]) align 8 dereferenceable(56) %_0, ptr noalias noundef readonly align 8 dereferenceable(280) %pool, ptr noalias nocapture noundef readonly align 8 dereferenceable(944) %global_config, ptr noalias nocapture noundef readonly align 8 dereferenceable(136) %config, i64 noundef %fee_config_len, i64 noundef %base_supply, i64 noundef %base_reserve, i64 noundef %quote_reserve, i64 noundef %quote_amount) unnamed_addr #1 {
start:
  %_11.i.i = alloca [0 x i8], align 1
  %formatter.i.i = alloca [64 x i8], align 8
  %buf.i.i = alloca [24 x i8], align 8
  %_34.i = alloca [16 x i8], align 8
  %_24.i = alloca [16 x i8], align 8
  %_9.i = alloca [24 x i8], align 8
  %_8.i = alloca [160 x i8], align 8
  %_18 = alloca [32 x i8], align 8
  %_15 = alloca [33 x i8], align 1
  %authority = alloca [32 x i8], align 1
  %_10 = alloca [24 x i8], align 8
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %_10)
; call pump_amm_recovered::state::pool::<impl pump_amm_recovered::state::Pool>::market_cap
  call void @"_ZN18pump_amm_recovered5state4pool49_$LT$impl$u20$pump_amm_recovered..state..Pool$GT$10market_cap17hafd51b5f6b12e471E"(ptr noalias nocapture noundef nonnull sret([24 x i8]) align 8 dereferenceable(24) %_10, ptr noalias noundef nonnull readonly align 8 dereferenceable(280) %pool, i64 noundef %base_supply, i64 noundef %base_reserve, i64 noundef %quote_reserve) #34
  %_25 = load i64, ptr %_10, align 8, !range !352, !noundef !2
  %trunc.not = icmp eq i64 %_25, 0
  %0 = getelementptr inbounds i8, ptr %_10, i64 8
  %_262 = load i64, ptr %0, align 8
  %.sroa_idx = getelementptr inbounds i8, ptr %_10, i64 16
  br i1 %trunc.not, label %bb9, label %bb8

bb9:                                              ; preds = %start
  %_263 = load i64, ptr %.sroa_idx, align 8
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_10)
  %_9.sroa.5.sroa.7.0.insert.ext = zext i64 %_263 to i128
  %_9.sroa.5.sroa.7.0.insert.shift = shl nuw i128 %_9.sroa.5.sroa.7.0.insert.ext, 64
  %_9.sroa.5.sroa.0.0.insert.ext = zext i64 %_262 to i128
  %_9.sroa.5.sroa.0.0.insert.insert = or disjoint i128 %_9.sroa.5.sroa.7.0.insert.shift, %_9.sroa.5.sroa.0.0.insert.ext
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %authority)
  call void @llvm.lifetime.start.p0(i64 33, ptr nonnull %_15)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_18)
  %_29 = getelementptr inbounds i8, ptr %pool, i64 32
  store ptr @alloc_837d2dfc2ca6132d7e624d246f381ca4, ptr %_18, align 8
  %1 = getelementptr inbounds i8, ptr %_18, i64 8
  store i64 14, ptr %1, align 8
  %2 = getelementptr inbounds [2 x { ptr, i64 }], ptr %_18, i64 0, i64 1
  store ptr %_29, ptr %2, align 8
  %3 = getelementptr inbounds [2 x { ptr, i64 }], ptr %_18, i64 0, i64 1, i32 1
  store i64 32, ptr %3, align 8
; call solana_pubkey::Pubkey::find_program_address
  call void @_ZN13solana_pubkey6Pubkey20find_program_address17h5c8eecf7b7496a06E(ptr noalias nocapture noundef nonnull sret([33 x i8]) align 1 dereferenceable(33) %_15, ptr noalias noundef nonnull readonly align 8 %_18, i64 noundef 2, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) @_ZN18pump_amm_recovered4pump2ID17hc4b3b2dab86467cbE) #34
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 1 dereferenceable(32) %authority, ptr noundef nonnull align 1 dereferenceable(32) %_15, i64 32, i1 false)
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_18)
  call void @llvm.lifetime.end.p0(i64 33, ptr nonnull %_15)
  %4 = call i32 @memcmp(ptr noundef nonnull dereferenceable(32) %pool, ptr noundef nonnull dereferenceable(32) %authority, i64 32)
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %authority)
  call void @llvm.experimental.noalias.scope.decl(metadata !4270)
  %_6.i = icmp ugt i64 %fee_config_len, 2511
  br i1 %_6.i, label %bb1.i, label %bb2.i

bb2.i:                                            ; preds = %bb9
  call void @llvm.lifetime.start.p0(i64 160, ptr nonnull %_8.i), !noalias !4273
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %_9.i), !noalias !4273
; call pump_amm_recovered::PumpAmmError::name
  call void @_ZN18pump_amm_recovered12PumpAmmError4name17h7a0105055247a4bfE(ptr noalias nocapture noundef nonnull sret([24 x i8]) align 8 dereferenceable(24) %_9.i, ptr noalias noundef nonnull readonly align 4 dereferenceable(4) @alloc_8f95cb73e89711d65e95d13598508b19) #34, !noalias !4273
  call void @llvm.lifetime.start.p0(i64 0, ptr nonnull %_11.i.i), !noalias !4273
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %buf.i.i), !noalias !4276
  store i64 0, ptr %buf.i.i, align 8, !noalias !4276
  %_9.sroa.4.0.buf.sroa_idx.i.i = getelementptr inbounds i8, ptr %buf.i.i, i64 8
  store ptr inttoptr (i64 1 to ptr), ptr %_9.sroa.4.0.buf.sroa_idx.i.i, align 8, !noalias !4276
  %_9.sroa.5.0.buf.sroa_idx.i.i = getelementptr inbounds i8, ptr %buf.i.i, i64 16
  store i64 0, ptr %_9.sroa.5.0.buf.sroa_idx.i.i, align 8, !noalias !4276
  call void @llvm.lifetime.start.p0(i64 64, ptr nonnull %formatter.i.i), !noalias !4276
  %5 = getelementptr inbounds i8, ptr %formatter.i.i, i64 52
  store i32 0, ptr %5, align 4, !noalias !4276
  %6 = getelementptr inbounds i8, ptr %formatter.i.i, i64 48
  store i32 32, ptr %6, align 8, !noalias !4276
  %7 = getelementptr inbounds i8, ptr %formatter.i.i, i64 56
  store i8 3, ptr %7, align 8, !noalias !4276
  store i64 0, ptr %formatter.i.i, align 8, !noalias !4276
  %8 = getelementptr inbounds i8, ptr %formatter.i.i, i64 16
  store i64 0, ptr %8, align 8, !noalias !4276
  %9 = getelementptr inbounds i8, ptr %formatter.i.i, i64 32
  store ptr %buf.i.i, ptr %9, align 8, !noalias !4276
  %10 = getelementptr inbounds i8, ptr %formatter.i.i, i64 40
  store ptr @vtable.3, ptr %10, align 8, !noalias !4276
; call <pump_amm_recovered::PumpAmmError as core::fmt::Display>::fmt
  %11 = call noundef zeroext i1 @"_ZN71_$LT$pump_amm_recovered..PumpAmmError$u20$as$u20$core..fmt..Display$GT$3fmt17h2aa5cc74834c3184E"(ptr noalias noundef nonnull readonly align 4 dereferenceable(4) @alloc_8f95cb73e89711d65e95d13598508b19, ptr noalias noundef nonnull align 8 dereferenceable(64) %formatter.i.i) #34, !noalias !4280
  br i1 %11, label %bb3.i.i, label %"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit.i"

bb3.i.i:                                          ; preds = %bb2.i
; call core::result::unwrap_failed
  call void @_ZN4core6result13unwrap_failed17h2dbd2ef42161686dE(ptr noalias noundef nonnull readonly align 1 @alloc_cc656815297f75969399c3f4b1ad3de4, i64 noundef 55, ptr noundef nonnull align 1 %_11.i.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @vtable.4, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_d5d9fccaf545b6e0545ef73245a3c43f) #35, !noalias !4276
  unreachable

"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit.i": ; preds = %bb2.i
  %12 = getelementptr inbounds i8, ptr %_8.i, i64 56
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %12, ptr noundef nonnull align 8 dereferenceable(24) %buf.i.i, i64 24, i1 false), !noalias !4273
  call void @llvm.lifetime.end.p0(i64 64, ptr nonnull %formatter.i.i), !noalias !4276
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %buf.i.i), !noalias !4276
  call void @llvm.lifetime.end.p0(i64 0, ptr nonnull %_11.i.i), !noalias !4273
  %13 = getelementptr inbounds i8, ptr %_8.i, i64 32
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %13, ptr noundef nonnull align 8 dereferenceable(24) %_9.i, i64 24, i1 false), !noalias !4273
  %14 = getelementptr inbounds i8, ptr %_8.i, i64 152
  store i32 6083, ptr %14, align 8, !noalias !4273
  store i64 0, ptr %_8.i, align 8, !noalias !4273
  %_12.sroa.4.0._8.sroa_idx.i = getelementptr inbounds i8, ptr %_8.i, i64 8
  store ptr @alloc_35d543da3eaafb799485f4b8bfcf6691, ptr %_12.sroa.4.0._8.sroa_idx.i, align 8, !noalias !4273
  %_12.sroa.4.sroa.4.0._12.sroa.4.0._8.sroa_idx.sroa_idx.i = getelementptr inbounds i8, ptr %_8.i, i64 16
  store i64 35, ptr %_12.sroa.4.sroa.4.0._12.sroa.4.0._8.sroa_idx.sroa_idx.i, align 8, !noalias !4273
  %_12.sroa.4.sroa.5.0._12.sroa.4.0._8.sroa_idx.sroa_idx.i = getelementptr inbounds i8, ptr %_8.i, i64 24
  store i32 184, ptr %_12.sroa.4.sroa.5.0._12.sroa.4.0._8.sroa_idx.sroa_idx.i, align 8, !noalias !4273
  %15 = getelementptr inbounds i8, ptr %_8.i, i64 80
  store i8 2, ptr %15, align 8, !noalias !4273
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_9.i), !noalias !4273
; call <anchor_lang::error::Error as core::convert::From<anchor_lang::error::AnchorError>>::from
  %16 = call { i64, ptr } @"_ZN104_$LT$anchor_lang..error..Error$u20$as$u20$core..convert..From$LT$anchor_lang..error..AnchorError$GT$$GT$4from17hefc4a4c4d9276c8eE"(ptr noalias nocapture noundef nonnull readonly align 8 dereferenceable(160) %_8.i) #34, !noalias !4273
  %_7.0.i = extractvalue { i64, ptr } %16, 0
  %_7.1.i = extractvalue { i64, ptr } %16, 1
  call void @llvm.lifetime.end.p0(i64 160, ptr nonnull %_8.i), !noalias !4273
  br label %bb11

bb1.i:                                            ; preds = %bb9
  %17 = icmp eq i32 %4, 0
  br i1 %17, label %bb6.i, label %bb7.i

bb7.i:                                            ; preds = %bb1.i
  %18 = getelementptr inbounds i8, ptr %config, i64 80
  br label %bb12

bb6.i:                                            ; preds = %bb1.i
  %19 = getelementptr inbounds i8, ptr %pool, i64 64
  %20 = call i32 @memcmp(ptr noundef nonnull dereferenceable(32) %19, ptr noundef nonnull dereferenceable(32) @alloc_e953c1d75e6a4349f2dca6892c168ab2, i64 32), !noalias !4281
  %21 = icmp eq i32 %20, 0
  br i1 %21, label %bb12.i, label %bb10.i

bb10.i:                                           ; preds = %bb6.i
  %22 = call i32 @memcmp(ptr noundef nonnull dereferenceable(32) %19, ptr noundef nonnull dereferenceable(32) @alloc_a3589b010e8c0a509a420d55bdd24119, i64 32), !noalias !4281
  %23 = icmp eq i32 %22, 0
  br i1 %23, label %bb12.i, label %bb13.i

bb13.i:                                           ; preds = %bb10.i
  %24 = call i32 @memcmp(ptr noundef nonnull dereferenceable(32) %19, ptr noundef nonnull dereferenceable(32) @alloc_91dc7198fcb52d54c5307b3b1115d768, i64 32), !noalias !4281
  %25 = icmp eq i32 %24, 0
  br i1 %25, label %bb16.i, label %bb17.i

bb17.i:                                           ; preds = %bb13.i
  %_38.i = icmp ugt i64 %fee_config_len, 4096
  br i1 %_38.i, label %bb22.i, label %bb8.i

bb16.i:                                           ; preds = %bb13.i
  %_32.i = icmp ugt i64 %fee_config_len, 4072
  %26 = getelementptr inbounds i8, ptr %config, i64 32
  %_71.i = load ptr, ptr %26, align 8, !alias.scope !4270, !noalias !4282, !nonnull !2
  %27 = getelementptr inbounds i8, ptr %config, i64 40
  %_70.i = load i64, ptr %27, align 8, !alias.scope !4270, !noalias !4282
  %tiers.sroa.0.0.i = select i1 %_32.i, ptr %_71.i, ptr inttoptr (i64 8 to ptr)
  %tiers.sroa.6.0.i = select i1 %_32.i, i64 %_70.i, i64 0
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_34.i), !noalias !4273
; call pump_amm_recovered::curve::fees::tier
  call fastcc void @_ZN18pump_amm_recovered5curve4fees4tier17h42fa5f4d91f67566E(ptr noalias nocapture noundef nonnull align 8 dereferenceable(16) %_34.i, ptr noalias noundef nonnull readonly align 8 %tiers.sroa.0.0.i, i64 noundef %tiers.sroa.6.0.i, i128 noundef %_9.sroa.5.sroa.0.0.insert.insert) #34, !noalias !4273
  %28 = load i64, ptr %_34.i, align 8, !range !268, !noalias !4273, !noundef !2
  %29 = icmp eq i64 %28, 2
  %30 = getelementptr inbounds i8, ptr %_34.i, i64 8
  %_75.i = load ptr, ptr %30, align 8, !noalias !4273, !noundef !2
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_34.i), !noalias !4273
  br i1 %29, label %bb12, label %bb11

bb22.i:                                           ; preds = %bb17.i
  %31 = getelementptr inbounds i8, ptr %config, i64 104
  %_39.i = load i64, ptr %31, align 8, !alias.scope !4270, !noalias !4282, !noundef !2
  %32 = icmp eq i64 %_39.i, 0
  %33 = getelementptr inbounds i8, ptr %config, i64 112
  %_40.i = load i64, ptr %33, align 8, !alias.scope !4270, !noalias !4282
  %34 = icmp eq i64 %_40.i, 0
  %or.cond.i = select i1 %32, i1 %34, i1 false
  %35 = getelementptr inbounds i8, ptr %config, i64 120
  %_41.i = load i64, ptr %35, align 8, !alias.scope !4270, !noalias !4282
  %36 = icmp eq i64 %_41.i, 0
  %or.cond8.i = select i1 %or.cond.i, i1 %36, i1 false
  br i1 %or.cond8.i, label %bb8.i, label %bb12

bb8.i:                                            ; preds = %bb22.i, %bb17.i
  %37 = getelementptr inbounds i8, ptr %config, i64 80
  br label %bb12

bb12.i:                                           ; preds = %bb10.i, %bb6.i
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_24.i), !noalias !4273
  %38 = getelementptr inbounds i8, ptr %config, i64 8
  %_57.i = load ptr, ptr %38, align 8, !alias.scope !4270, !noalias !4282, !nonnull !2, !noundef !2
  %39 = getelementptr inbounds i8, ptr %config, i64 16
  %_56.i = load i64, ptr %39, align 8, !alias.scope !4270, !noalias !4282, !noundef !2
; call pump_amm_recovered::curve::fees::tier
  call fastcc void @_ZN18pump_amm_recovered5curve4fees4tier17h42fa5f4d91f67566E(ptr noalias nocapture noundef nonnull align 8 dereferenceable(16) %_24.i, ptr noalias noundef nonnull readonly align 8 %_57.i, i64 noundef %_56.i, i128 noundef %_9.sroa.5.sroa.0.0.insert.insert) #34, !noalias !4273
  %40 = load i64, ptr %_24.i, align 8, !range !268, !noalias !4273, !noundef !2
  %41 = icmp eq i64 %40, 2
  %42 = getelementptr inbounds i8, ptr %_24.i, i64 8
  %_65.i = load ptr, ptr %42, align 8, !noalias !4273, !noundef !2
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_24.i), !noalias !4273
  br i1 %41, label %bb12, label %bb11

bb8:                                              ; preds = %start
  %_27.1 = load ptr, ptr %.sroa_idx, align 8, !noundef !2
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_10)
  %43 = getelementptr inbounds i8, ptr %_0, i64 8
  store i64 %_262, ptr %43, align 8
  %44 = getelementptr inbounds i8, ptr %_0, i64 16
  store ptr %_27.1, ptr %44, align 8
  store i64 1, ptr %_0, align 8
  br label %bb7

bb12:                                             ; preds = %bb12.i, %bb8.i, %bb22.i, %bb16.i, %bb7.i
  %selected.sroa.0.0.i = phi ptr [ %18, %bb7.i ], [ %37, %bb8.i ], [ %31, %bb22.i ], [ %_65.i, %bb12.i ], [ %_75.i, %bb16.i ]
  %_79.i = load i64, ptr %selected.sroa.0.0.i, align 8, !noalias !4282, !noundef !2
  %45 = getelementptr inbounds i8, ptr %selected.sroa.0.0.i, i64 8
  %_80.i = load i64, ptr %45, align 8, !noalias !4282, !noundef !2
  %46 = getelementptr inbounds i8, ptr %selected.sroa.0.0.i, i64 16
  %_81.i = load i64, ptr %46, align 8, !noalias !4282, !noundef !2
  %47 = getelementptr inbounds i8, ptr %global_config, i64 940
  %global_config.val = load i8, ptr %47, align 4, !range !323, !noundef !2
  %_5.not.i = icmp eq i8 %global_config.val, 0
  br i1 %_5.not.i, label %_ZN18pump_amm_recovered5curve4fees17apply_selected_v217he9714331b1f1e20dE.exit, label %bb1.i12

bb1.i12:                                          ; preds = %bb12
  %48 = getelementptr inbounds i8, ptr %pool, i64 248
  %_6.i13 = load i64, ptr %48, align 8, !alias.scope !4283, !noalias !4286, !noundef !2
  %49 = icmp eq i64 %_6.i13, 0
  br i1 %49, label %_ZN18pump_amm_recovered5curve4fees17apply_selected_v217he9714331b1f1e20dE.exit, label %bb2.i14

bb2.i14:                                          ; preds = %bb1.i12
  br label %_ZN18pump_amm_recovered5curve4fees17apply_selected_v217he9714331b1f1e20dE.exit

_ZN18pump_amm_recovered5curve4fees17apply_selected_v217he9714331b1f1e20dE.exit: ; preds = %bb12, %bb1.i12, %bb2.i14
  %selected.sroa.4.0 = phi i64 [ %_81.i, %bb12 ], [ %_81.i, %bb1.i12 ], [ %_6.i13, %bb2.i14 ]
; call pump_amm_recovered::curve::fees::apply
  call fastcc void @_ZN18pump_amm_recovered5curve4fees5apply17h1280ef4e8ad2cca4E(ptr noalias nocapture noundef nonnull align 8 dereferenceable(56) %_0, ptr noalias noundef nonnull readonly align 8 dereferenceable(280) %pool, i64 noundef %quote_amount, i64 noundef %_79.i, i64 noundef %_80.i, i64 noundef %selected.sroa.4.0) #34, !noalias !4289
  br label %bb7

bb11:                                             ; preds = %bb16.i, %bb12.i, %"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit.i"
  %_22.sroa.10.0.ph.in = phi ptr [ %_7.1.i, %"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit.i" ], [ %_65.i, %bb12.i ], [ %_75.i, %bb16.i ]
  %_22.sroa.5.0.ph = phi i64 [ %_7.0.i, %"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit.i" ], [ %40, %bb12.i ], [ %28, %bb16.i ]
  %50 = getelementptr inbounds i8, ptr %_0, i64 8
  store i64 %_22.sroa.5.0.ph, ptr %50, align 8
  %51 = getelementptr inbounds i8, ptr %_0, i64 16
  store ptr %_22.sroa.10.0.ph.in, ptr %51, align 8
  store i64 1, ptr %_0, align 8
  br label %bb7

bb7:                                              ; preds = %bb11, %bb8, %_ZN18pump_amm_recovered5curve4fees17apply_selected_v217he9714331b1f1e20dE.exit
  ret void
}
