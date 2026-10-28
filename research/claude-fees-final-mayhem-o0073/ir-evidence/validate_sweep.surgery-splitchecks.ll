define hidden { i64, ptr } @_ZN16mayhem_recovered12instructions14fee_recipients12FeeRecipient14validate_sweep17h5d3754765b856ec7E(ptr noalias nocapture noundef align 8 dereferenceable(40) %self, ptr noalias nocapture noundef readonly align 8 dereferenceable(248) %global_params, i1 noundef zeroext %native) unnamed_addr #1 {
start:
  %_11.i = alloca [0 x i8], align 1
  %formatter.i = alloca [24 x i8], align 8
  %buf.i = alloca [24 x i8], align 8
  %_22 = alloca [8 x i8], align 4
  %_14 = alloca [24 x i8], align 8
  %_13 = alloca [160 x i8], align 8
  %_4 = alloca [48 x i8], align 8
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_4)
; call solana_sysvar::clock::<impl solana_sysvar::Sysvar for solana_clock::Clock>::get
  call void @"_ZN13solana_sysvar5clock71_$LT$impl$u20$solana_sysvar..Sysvar$u20$for$u20$solana_clock..Clock$GT$3get17h4bfb4153e82302bcE"(ptr noalias nocapture noundef nonnull sret([48 x i8]) align 8 dereferenceable(48) %_4) #21
  %v0 = load i32, ptr %_4, align 8, !range !1373, !noundef !2
  %v1 = trunc nuw i32 %v0 to i1
  br i1 %v1, label %bb18, label %bb19, !prof !62

bb18:                                             ; preds = %start
  call void @llvm.lifetime.start.p0(i64 8, ptr nonnull %_22)
  %v2 = getelementptr inbounds nuw i8, ptr %_4, i64 4
  %v3 = load i32, ptr %v2, align 4, !range !1082, !noundef !2
  %v4 = getelementptr inbounds nuw i8, ptr %_4, i64 8
  %v5 = load i32, ptr %v4, align 8
  store i32 %v3, ptr %_22, align 4
  %v6 = getelementptr inbounds nuw i8, ptr %_22, i64 4
  store i32 %v5, ptr %v6, align 4
; call core::result::unwrap_failed
  call void @_ZN4core6result13unwrap_failed17h5a0595231043dbf9E(ptr noalias noundef nonnull readonly align 1 @alloc_00ae4b301f7fab8ac9617c03fcbd7274, i64 noundef 43, ptr noundef nonnull align 1 %_22, ptr noalias noundef nonnull readonly align 8 dereferenceable(32) @vtable.8, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_121ba6b316a70cda0084de2a206ed82a) #22
  unreachable

bb19:                                             ; preds = %start
  %v7 = getelementptr inbounds nuw i8, ptr %_4, i64 40
  %current_time = load i64, ptr %v7, align 8, !noundef !2
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_4)
  %v8 = getelementptr inbounds nuw i8, ptr %self, i64 24
  %self.val = load i64, ptr %self, align 8
  %.val = load i64, ptr %v8, align 8
  %_6.sroa.0.0 = select i1 %native, i64 %self.val, i64 %.val
  %v10 = icmp eq i64 %_6.sroa.0.0, 0

  br i1 %v10, label %bb12, label %bb4x

bb4x:
  %v9 = getelementptr inbounds nuw i8, ptr %global_params, i64 160
  %_8 = load i64, ptr %v9, align 8, !noundef !2
  %v11 = icmp eq i64 %_8, 0
  br i1 %v11, label %bb12, label %bb6

bb12:                                             ; preds = %bb7, %bb19
  br i1 %native, label %bb13, label %bb14

bb6:                                              ; preds = %bb19
  %v12 = tail call { i64, i1 } @llvm.sadd.with.overflow.i64(i64 %_6.sroa.0.0, i64 %_8)
  %_10.1 = extractvalue { i64, i1 } %v12, 1
  br i1 %_10.1, label %panic, label %bb7

bb7:                                              ; preds = %bb6
  %_10.0 = extractvalue { i64, i1 } %v12, 0
  %_11.not = icmp slt i64 %current_time, %_10.0
  br i1 %_11.not, label %bb9, label %bb12

panic:                                            ; preds = %bb6
; call core::panicking::panic_const::panic_const_add_overflow
  tail call void @_ZN4core9panicking11panic_const24panic_const_add_overflow17h3493e0c6194f31d7E(ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_ae6c52159598aaa7aebdfc78910ae114) #22
  unreachable

bb9:                                              ; preds = %bb7
  call void @llvm.lifetime.start.p0(i64 160, ptr nonnull %_13)
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %_14)
; call mayhem_recovered::MayhemError::name
  call void @_ZN16mayhem_recovered11MayhemError4name17ha3ee754857b7b9caE(ptr noalias nocapture noundef nonnull sret([24 x i8]) align 8 dereferenceable(24) %_14, ptr noalias noundef nonnull readonly align 4 dereferenceable(4) @alloc_861c8964bbad6d9cede9df277e628fe9) #21
  call void @llvm.lifetime.start.p0(i64 0, ptr nonnull %_11.i)
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %buf.i), !noalias !2330
  store i64 0, ptr %buf.i, align 8, !noalias !2330
  %_9.sroa.4.0.buf.sroa_idx.i = getelementptr inbounds nuw i8, ptr %buf.i, i64 8
  store ptr inttoptr (i64 1 to ptr), ptr %_9.sroa.4.0.buf.sroa_idx.i, align 8, !noalias !2330
  %_9.sroa.5.0.buf.sroa_idx.i = getelementptr inbounds nuw i8, ptr %buf.i, i64 16
  store i64 0, ptr %_9.sroa.5.0.buf.sroa_idx.i, align 8, !noalias !2330
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %formatter.i), !noalias !2330
  %v13 = getelementptr inbounds nuw i8, ptr %formatter.i, i64 16
  store i32 -536870880, ptr %v13, align 8, !noalias !2330
  %options.sroa.4.0..sroa_idx.i = getelementptr inbounds nuw i8, ptr %formatter.i, i64 20
  store i16 0, ptr %options.sroa.4.0..sroa_idx.i, align 4, !noalias !2330
  %options.sroa.5.0..sroa_idx.i = getelementptr inbounds nuw i8, ptr %formatter.i, i64 22
  store i16 0, ptr %options.sroa.5.0..sroa_idx.i, align 2, !noalias !2330
  store ptr %buf.i, ptr %formatter.i, align 8, !noalias !2330
  %v14 = getelementptr inbounds nuw i8, ptr %formatter.i, i64 8
  store ptr @vtable.0, ptr %v14, align 8, !noalias !2330
; call <mayhem_recovered::MayhemError as core::fmt::Display>::fmt
  %self1.i = call noundef zeroext i1 @"_ZN68_$LT$mayhem_recovered..MayhemError$u20$as$u20$core..fmt..Display$GT$3fmt17hd2424290dfb80f8cE"(ptr noalias noundef nonnull readonly align 4 dereferenceable(4) @alloc_861c8964bbad6d9cede9df277e628fe9, ptr noalias noundef nonnull align 8 dereferenceable(24) %formatter.i) #21, !noalias !2334
  br i1 %self1.i, label %bb3.i, label %"_ZN49_$LT$T$u20$as$u20$alloc..string..SpecToString$GT$14spec_to_string17hb732b12126722a1bE.exit", !prof !62

bb3.i:                                            ; preds = %bb9
; call core::result::unwrap_failed
  call void @_ZN4core6result13unwrap_failed17h5a0595231043dbf9E(ptr noalias noundef nonnull readonly align 1 @alloc_cc656815297f75969399c3f4b1ad3de4, i64 noundef 55, ptr noundef nonnull align 1 %_11.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(32) @vtable.1, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_c36051a813773a3f7d55396eab821d71) #22, !noalias !2330
  unreachable

"_ZN49_$LT$T$u20$as$u20$alloc..string..SpecToString$GT$14spec_to_string17hb732b12126722a1bE.exit": ; preds = %bb9
  %v15 = getelementptr inbounds nuw i8, ptr %_13, i64 56
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %v15, ptr noundef nonnull align 8 dereferenceable(24) %buf.i, i64 24, i1 false)
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %formatter.i), !noalias !2330
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %buf.i), !noalias !2330
  call void @llvm.lifetime.end.p0(i64 0, ptr nonnull %_11.i)
  %v16 = getelementptr inbounds nuw i8, ptr %_13, i64 32
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %v16, ptr noundef nonnull align 8 dereferenceable(24) %_14, i64 24, i1 false)
  %v17 = getelementptr inbounds nuw i8, ptr %_13, i64 152
  store i32 6019, ptr %v17, align 8
  store i64 0, ptr %_13, align 8
  %_17.sroa.4.0._13.sroa_idx = getelementptr inbounds nuw i8, ptr %_13, i64 8
  store ptr @alloc_d0a29cb855922bd77a216f09b5f163be, ptr %_17.sroa.4.0._13.sroa_idx, align 8
  %_17.sroa.4.sroa.4.0._17.sroa.4.0._13.sroa_idx.sroa_idx = getelementptr inbounds nuw i8, ptr %_13, i64 16
  store i64 58, ptr %_17.sroa.4.sroa.4.0._17.sroa.4.0._13.sroa_idx.sroa_idx, align 8
  %_17.sroa.4.sroa.5.0._17.sroa.4.0._13.sroa_idx.sroa_idx = getelementptr inbounds nuw i8, ptr %_13, i64 24
  store i32 61, ptr %_17.sroa.4.sroa.5.0._17.sroa.4.0._13.sroa_idx.sroa_idx, align 8
  %v18 = getelementptr inbounds nuw i8, ptr %_13, i64 80
  store i8 2, ptr %v18, align 8
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_14)
; call <anchor_lang::error::Error as core::convert::From<anchor_lang::error::AnchorError>>::from
  %v19 = call { i64, ptr } @"_ZN104_$LT$anchor_lang..error..Error$u20$as$u20$core..convert..From$LT$anchor_lang..error..AnchorError$GT$$GT$4from17hea8a2a88d69bafbdE"(ptr noalias nocapture noundef nonnull readonly align 8 dereferenceable(160) %_13) #21
  %_12.0 = extractvalue { i64, ptr } %v19, 0
  %_12.1 = extractvalue { i64, ptr } %v19, 1
  call void @llvm.lifetime.end.p0(i64 160, ptr nonnull %_13)
  br label %bb16

bb16:                                             ; preds = %bb14, %bb13, %"_ZN49_$LT$T$u20$as$u20$alloc..string..SpecToString$GT$14spec_to_string17hb732b12126722a1bE.exit"
  %_0.sroa.3.0 = phi ptr [ %_12.1, %"_ZN49_$LT$T$u20$as$u20$alloc..string..SpecToString$GT$14spec_to_string17hb732b12126722a1bE.exit" ], [ undef, %bb13 ], [ undef, %bb14 ]
  %_0.sroa.0.0 = phi i64 [ %_12.0, %"_ZN49_$LT$T$u20$as$u20$alloc..string..SpecToString$GT$14spec_to_string17hb732b12126722a1bE.exit" ], [ 2, %bb13 ], [ 2, %bb14 ]
  %v20 = insertvalue { i64, ptr } poison, i64 %_0.sroa.0.0, 0
  %v21 = insertvalue { i64, ptr } %v20, ptr %_0.sroa.3.0, 1
  ret { i64, ptr } %v21

bb14:                                             ; preds = %bb12
  store i64 %current_time, ptr %v8, align 8
  br label %bb16

bb13:                                             ; preds = %bb12
  store i64 %current_time, ptr %self, align 8
  br label %bb16
}