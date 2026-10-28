define hidden void @_ZN18pump_amm_recovered5curve4fees19select_and_apply_v217h28f0417ffd05145aE(ptr dead_on_unwind noalias nocapture noundef writable writeonly sret([56 x i8]) align 8 dereferenceable(56) %_0, ptr noalias noundef readonly align 8 dereferenceable(280) %pool, ptr noalias nocapture noundef readonly align 8 dereferenceable(944) %global_config, ptr noalias nocapture noundef readonly align 8 dereferenceable(136) %config, i64 noundef %fee_config_len, i64 noundef %base_supply, i64 noundef %base_reserve, i64 noundef %quote_reserve, i64 noundef %quote_amount) unnamed_addr #1 {
start:
  %_11.i = alloca [0 x i8], align 1
  %formatter.i = alloca [64 x i8], align 8
  %buf.i = alloca [24 x i8], align 8
  %_46 = alloca [16 x i8], align 8
  %_37 = alloca [16 x i8], align 8
  %_24 = alloca [24 x i8], align 8
  %_23 = alloca [160 x i8], align 8
  %_17 = alloca [32 x i8], align 8
  %_14 = alloca [33 x i8], align 1
  %authority = alloca [32 x i8], align 1
  %_10 = alloca [24 x i8], align 8
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %_10)
; call pump_amm_recovered::state::pool::<impl pump_amm_recovered::state::Pool>::market_cap
  call void @"_ZN18pump_amm_recovered5state4pool49_$LT$impl$u20$pump_amm_recovered..state..Pool$GT$10market_cap17hafd51b5f6b12e471E"(ptr noalias nocapture noundef nonnull sret([24 x i8]) align 8 dereferenceable(24) %_10, ptr noalias noundef nonnull readonly align 8 dereferenceable(280) %pool, i64 noundef %base_supply, i64 noundef %base_reserve, i64 noundef %quote_reserve) #34
  %_64 = load i64, ptr %_10, align 8, !range !352, !noundef !2
  %trunc.not = icmp eq i64 %_64, 0
  %0 = getelementptr inbounds i8, ptr %_10, i64 8
  %_659 = load i64, ptr %0, align 8
  %.sroa_idx = getelementptr inbounds i8, ptr %_10, i64 16
  br i1 %trunc.not, label %bb44, label %bb43

bb44:                                             ; preds = %start
  %_6510 = load i64, ptr %.sroa_idx, align 8
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_10)
  %_9.sroa.5.sroa.7.0.insert.ext = zext i64 %_6510 to i128
  %_9.sroa.5.sroa.7.0.insert.shift = shl nuw i128 %_9.sroa.5.sroa.7.0.insert.ext, 64
  %_9.sroa.5.sroa.0.0.insert.ext = zext i64 %_659 to i128
  %_9.sroa.5.sroa.0.0.insert.insert = or disjoint i128 %_9.sroa.5.sroa.7.0.insert.shift, %_9.sroa.5.sroa.0.0.insert.ext
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %authority)
  call void @llvm.lifetime.start.p0(i64 33, ptr nonnull %_14)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_17)
  %_68 = getelementptr inbounds i8, ptr %pool, i64 32
  store ptr @alloc_837d2dfc2ca6132d7e624d246f381ca4, ptr %_17, align 8
  %1 = getelementptr inbounds i8, ptr %_17, i64 8
  store i64 14, ptr %1, align 8
  %2 = getelementptr inbounds [2 x { ptr, i64 }], ptr %_17, i64 0, i64 1
  store ptr %_68, ptr %2, align 8
  %3 = getelementptr inbounds [2 x { ptr, i64 }], ptr %_17, i64 0, i64 1, i32 1
  store i64 32, ptr %3, align 8
; call solana_pubkey::Pubkey::find_program_address
  call void @_ZN13solana_pubkey6Pubkey20find_program_address17h5c8eecf7b7496a06E(ptr noalias nocapture noundef nonnull sret([33 x i8]) align 1 dereferenceable(33) %_14, ptr noalias noundef nonnull readonly align 8 %_17, i64 noundef 2, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) @_ZN18pump_amm_recovered4pump2ID17hc4b3b2dab86467cbE) #34
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 1 dereferenceable(32) %authority, ptr noundef nonnull align 1 dereferenceable(32) %_14, i64 32, i1 false)
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_17)
  call void @llvm.lifetime.end.p0(i64 33, ptr nonnull %_14)
  %_21 = icmp ugt i64 %fee_config_len, 2511
  br i1 %_21, label %bb4, label %bb5

bb43:                                             ; preds = %start
  %_66.1 = load ptr, ptr %.sroa_idx, align 8, !noundef !2
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_10)
  %4 = getelementptr inbounds i8, ptr %_0, i64 8
  store i64 %_659, ptr %4, align 8
  %5 = getelementptr inbounds i8, ptr %_0, i64 16
  store ptr %_66.1, ptr %5, align 8
  store i64 1, ptr %_0, align 8
  br label %bb42

bb5:                                              ; preds = %bb44
  call void @llvm.lifetime.start.p0(i64 160, ptr nonnull %_23)
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %_24)
; call pump_amm_recovered::PumpAmmError::name
  call void @_ZN18pump_amm_recovered12PumpAmmError4name17h7a0105055247a4bfE(ptr noalias nocapture noundef nonnull sret([24 x i8]) align 8 dereferenceable(24) %_24, ptr noalias noundef nonnull readonly align 4 dereferenceable(4) @alloc_8f95cb73e89711d65e95d13598508b19) #34
  call void @llvm.lifetime.start.p0(i64 0, ptr nonnull %_11.i)
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %buf.i), !noalias !4270
  store i64 0, ptr %buf.i, align 8, !noalias !4270
  %_9.sroa.4.0.buf.sroa_idx.i = getelementptr inbounds i8, ptr %buf.i, i64 8
  store ptr inttoptr (i64 1 to ptr), ptr %_9.sroa.4.0.buf.sroa_idx.i, align 8, !noalias !4270
  %_9.sroa.5.0.buf.sroa_idx.i = getelementptr inbounds i8, ptr %buf.i, i64 16
  store i64 0, ptr %_9.sroa.5.0.buf.sroa_idx.i, align 8, !noalias !4270
  call void @llvm.lifetime.start.p0(i64 64, ptr nonnull %formatter.i), !noalias !4270
  %6 = getelementptr inbounds i8, ptr %formatter.i, i64 52
  store i32 0, ptr %6, align 4, !noalias !4270
  %7 = getelementptr inbounds i8, ptr %formatter.i, i64 48
  store i32 32, ptr %7, align 8, !noalias !4270
  %8 = getelementptr inbounds i8, ptr %formatter.i, i64 56
  store i8 3, ptr %8, align 8, !noalias !4270
  store i64 0, ptr %formatter.i, align 8, !noalias !4270
  %9 = getelementptr inbounds i8, ptr %formatter.i, i64 16
  store i64 0, ptr %9, align 8, !noalias !4270
  %10 = getelementptr inbounds i8, ptr %formatter.i, i64 32
  store ptr %buf.i, ptr %10, align 8, !noalias !4270
  %11 = getelementptr inbounds i8, ptr %formatter.i, i64 40
  store ptr @vtable.3, ptr %11, align 8, !noalias !4270
; call <pump_amm_recovered::PumpAmmError as core::fmt::Display>::fmt
  %12 = call noundef zeroext i1 @"_ZN71_$LT$pump_amm_recovered..PumpAmmError$u20$as$u20$core..fmt..Display$GT$3fmt17h2aa5cc74834c3184E"(ptr noalias noundef nonnull readonly align 4 dereferenceable(4) @alloc_8f95cb73e89711d65e95d13598508b19, ptr noalias noundef nonnull align 8 dereferenceable(64) %formatter.i) #34, !noalias !4274
  br i1 %12, label %bb3.i, label %"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit"

bb3.i:                                            ; preds = %bb5
; call core::result::unwrap_failed
  call void @_ZN4core6result13unwrap_failed17h2dbd2ef42161686dE(ptr noalias noundef nonnull readonly align 1 @alloc_cc656815297f75969399c3f4b1ad3de4, i64 noundef 55, ptr noundef nonnull align 1 %_11.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @vtable.4, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_d5d9fccaf545b6e0545ef73245a3c43f) #35, !noalias !4270
  unreachable

"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit": ; preds = %bb5
  %13 = getelementptr inbounds i8, ptr %_23, i64 56
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %13, ptr noundef nonnull align 8 dereferenceable(24) %buf.i, i64 24, i1 false)
  call void @llvm.lifetime.end.p0(i64 64, ptr nonnull %formatter.i), !noalias !4270
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %buf.i), !noalias !4270
  call void @llvm.lifetime.end.p0(i64 0, ptr nonnull %_11.i)
  %14 = getelementptr inbounds i8, ptr %_23, i64 32
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %14, ptr noundef nonnull align 8 dereferenceable(24) %_24, i64 24, i1 false)
  %15 = getelementptr inbounds i8, ptr %_23, i64 152
  store i32 6083, ptr %15, align 8
  store i64 0, ptr %_23, align 8
  %_27.sroa.4.0._23.sroa_idx = getelementptr inbounds i8, ptr %_23, i64 8
  store ptr @alloc_35d543da3eaafb799485f4b8bfcf6691, ptr %_27.sroa.4.0._23.sroa_idx, align 8
  %_27.sroa.4.sroa.4.0._27.sroa.4.0._23.sroa_idx.sroa_idx = getelementptr inbounds i8, ptr %_23, i64 16
  store i64 35, ptr %_27.sroa.4.sroa.4.0._27.sroa.4.0._23.sroa_idx.sroa_idx, align 8
  %_27.sroa.4.sroa.5.0._27.sroa.4.0._23.sroa_idx.sroa_idx = getelementptr inbounds i8, ptr %_23, i64 24
  store i32 181, ptr %_27.sroa.4.sroa.5.0._27.sroa.4.0._23.sroa_idx.sroa_idx, align 8
  %16 = getelementptr inbounds i8, ptr %_23, i64 80
  store i8 2, ptr %16, align 8
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_24)
; call <anchor_lang::error::Error as core::convert::From<anchor_lang::error::AnchorError>>::from
  %17 = call { i64, ptr } @"_ZN104_$LT$anchor_lang..error..Error$u20$as$u20$core..convert..From$LT$anchor_lang..error..AnchorError$GT$$GT$4from17hefc4a4c4d9276c8eE"(ptr noalias nocapture noundef nonnull readonly align 8 dereferenceable(160) %_23) #34
  %_22.0 = extractvalue { i64, ptr } %17, 0
  %_22.1 = extractvalue { i64, ptr } %17, 1
  call void @llvm.lifetime.end.p0(i64 160, ptr nonnull %_23)
  br label %bb40

bb4:                                              ; preds = %bb44
  %18 = call i32 @memcmp(ptr noundef nonnull dereferenceable(32) %pool, ptr noundef nonnull dereferenceable(32) %authority, i64 32)
  %19 = icmp eq i32 %18, 0
  br i1 %19, label %bb9, label %bb10

bb40:                                             ; preds = %bb12, %bb15, %"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit"
  %.sink = phi i64 [ %_22.0, %"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit" ], [ %40, %bb15 ], [ %33, %bb12 ]
  %_97.sink = phi ptr [ %_22.1, %"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb65e1af1b7319e6E.exit" ], [ %_97, %bb15 ], [ %_84, %bb12 ]
  %20 = getelementptr inbounds i8, ptr %_0, i64 8
  store i64 %.sink, ptr %20, align 8
  %21 = getelementptr inbounds i8, ptr %_0, i64 16
  store ptr %_97.sink, ptr %21, align 8
  store i64 1, ptr %_0, align 8
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %authority)
  br label %bb42

bb10:                                             ; preds = %bb4
  %22 = getelementptr inbounds i8, ptr %config, i64 80
  br label %bb33

bb9:                                              ; preds = %bb4
  %_73 = getelementptr inbounds i8, ptr %pool, i64 64
  %23 = call i32 @memcmp(ptr noundef nonnull dereferenceable(32) %_73, ptr noundef nonnull dereferenceable(32) @alloc_e953c1d75e6a4349f2dca6892c168ab2, i64 32)
  %24 = icmp eq i32 %23, 0
  br i1 %24, label %bb12, label %bb11

bb33:                                             ; preds = %bb15, %bb12, %bb21, %bb29, %bb10
  %selected.sroa.0.0 = phi ptr [ %22, %bb10 ], [ %43, %bb29 ], [ %44, %bb21 ], [ %_84, %bb12 ], [ %_97, %bb15 ]
  %25 = getelementptr inbounds i8, ptr %global_config, i64 940
  %26 = load i8, ptr %25, align 4, !range !323, !noundef !2
  %_56.not = icmp eq i8 %26, 0
  %27 = getelementptr inbounds i8, ptr %pool, i64 248
  %_57 = load i64, ptr %27, align 8
  %28 = icmp eq i64 %_57, 0
  %or.cond21 = select i1 %_56.not, i1 true, i1 %28
  br i1 %or.cond21, label %bb36, label %bb37

bb11:                                             ; preds = %bb9
  %29 = call i32 @memcmp(ptr noundef nonnull dereferenceable(32) %_73, ptr noundef nonnull dereferenceable(32) @alloc_a3589b010e8c0a509a420d55bdd24119, i64 32)
  %30 = icmp eq i32 %29, 0
  br i1 %30, label %bb12, label %bb14

bb12:                                             ; preds = %bb11, %bb9
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_37)
  %31 = getelementptr inbounds i8, ptr %config, i64 8
  %_80 = load ptr, ptr %31, align 8, !nonnull !2, !noundef !2
  %32 = getelementptr inbounds i8, ptr %config, i64 16
  %_79 = load i64, ptr %32, align 8, !noundef !2
; call pump_amm_recovered::curve::fees::tier
  call fastcc void @_ZN18pump_amm_recovered5curve4fees4tier17h42fa5f4d91f67566E(ptr noalias nocapture noundef nonnull align 8 dereferenceable(16) %_37, ptr noalias noundef nonnull readonly align 8 %_80, i64 noundef %_79, i128 noundef %_9.sroa.5.sroa.0.0.insert.insert) #34
  %33 = load i64, ptr %_37, align 8, !range !268, !noundef !2
  %34 = icmp eq i64 %33, 2
  %35 = getelementptr inbounds i8, ptr %_37, i64 8
  %_84 = load ptr, ptr %35, align 8, !noundef !2
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_37)
  br i1 %34, label %bb33, label %bb40

bb14:                                             ; preds = %bb11
  %36 = call i32 @memcmp(ptr noundef nonnull dereferenceable(32) %_73, ptr noundef nonnull dereferenceable(32) @alloc_91dc7198fcb52d54c5307b3b1115d768, i64 32)
  %37 = icmp eq i32 %36, 0
  br i1 %37, label %bb15, label %bb20

bb20:                                             ; preds = %bb14
  %_51 = icmp ugt i64 %fee_config_len, 4096
  br i1 %_51, label %bb21, label %bb29

bb15:                                             ; preds = %bb14
  %_44 = icmp ugt i64 %fee_config_len, 4072
  %38 = getelementptr inbounds i8, ptr %config, i64 32
  %_93 = load ptr, ptr %38, align 8, !nonnull !2
  %39 = getelementptr inbounds i8, ptr %config, i64 40
  %_92 = load i64, ptr %39, align 8
  %tiers.sroa.0.0 = select i1 %_44, ptr %_93, ptr inttoptr (i64 8 to ptr)
  %tiers.sroa.6.0 = select i1 %_44, i64 %_92, i64 0
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_46)
; call pump_amm_recovered::curve::fees::tier
  call fastcc void @_ZN18pump_amm_recovered5curve4fees4tier17h42fa5f4d91f67566E(ptr noalias nocapture noundef nonnull align 8 dereferenceable(16) %_46, ptr noalias noundef nonnull readonly align 8 %tiers.sroa.0.0, i64 noundef %tiers.sroa.6.0, i128 noundef %_9.sroa.5.sroa.0.0.insert.insert) #34
  %40 = load i64, ptr %_46, align 8, !range !268, !noundef !2
  %41 = icmp eq i64 %40, 2
  %42 = getelementptr inbounds i8, ptr %_46, i64 8
  %_97 = load ptr, ptr %42, align 8, !noundef !2
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_46)
  br i1 %41, label %bb33, label %bb40

bb29:                                             ; preds = %bb21, %bb20
  %43 = getelementptr inbounds i8, ptr %config, i64 80
  br label %bb33

bb21:                                             ; preds = %bb20
  %44 = getelementptr inbounds i8, ptr %config, i64 104
  %_52 = load i64, ptr %44, align 8, !noundef !2
  %45 = icmp eq i64 %_52, 0
  %46 = getelementptr inbounds i8, ptr %config, i64 112
  %_53 = load i64, ptr %46, align 8
  %47 = icmp eq i64 %_53, 0
  %or.cond = select i1 %45, i1 %47, i1 false
  %48 = getelementptr inbounds i8, ptr %config, i64 120
  %_54 = load i64, ptr %48, align 8
  %49 = icmp eq i64 %_54, 0
  %or.cond8 = select i1 %or.cond, i1 %49, i1 false
  br i1 %or.cond8, label %bb29, label %bb33

bb36:                                             ; preds = %bb33
  %50 = getelementptr inbounds i8, ptr %selected.sroa.0.0, i64 16
  %51 = load i64, ptr %50, align 8, !noundef !2
  br label %bb37

bb37:                                             ; preds = %bb33, %bb36
  %creator_fee_bps.sroa.0.0 = phi i64 [ %51, %bb36 ], [ %_57, %bb33 ]
  %_58 = load i64, ptr %selected.sroa.0.0, align 8, !noundef !2
  %52 = getelementptr inbounds i8, ptr %selected.sroa.0.0, i64 8
  %_59 = load i64, ptr %52, align 8, !noundef !2
; call pump_amm_recovered::curve::fees::apply
  call fastcc void @_ZN18pump_amm_recovered5curve4fees5apply17h1280ef4e8ad2cca4E(ptr noalias nocapture noundef nonnull align 8 dereferenceable(56) %_0, ptr noalias noundef nonnull readonly align 8 dereferenceable(280) %pool, i64 noundef %quote_amount, i64 noundef %_58, i64 noundef %_59, i64 noundef %creator_fee_bps.sroa.0.0) #34
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %authority)
  br label %bb42

bb42:                                             ; preds = %bb40, %bb43, %bb37
  ret void
}
