define hidden { i64, ptr } @_ZN16mayhem_recovered5state10initialize17hbe26f996e19007a1E(ptr noalias nocapture noundef readonly align 8 dereferenceable(40) %ctx) unnamed_addr #1 {
start:
  %_12.i = alloca [8 x i8], align 4
  %_6.i = alloca [48 x i8], align 8
  %snapshot = alloca [80 x i8], align 8
  %0 = getelementptr inbounds nuw i8, ptr %ctx, i64 8
  %_8 = load ptr, ptr %0, align 8, !nonnull !2, !align !3, !noundef !2
  %1 = getelementptr inbounds nuw i8, ptr %_8, i64 88
  %_9 = load ptr, ptr %1, align 8, !nonnull !2, !align !3, !noundef !2
  tail call void @llvm.experimental.noalias.scope.decl(metadata !1432)
  %_2.i = load ptr, ptr %_9, align 8, !alias.scope !1432, !noalias !1435, !nonnull !2, !align !436, !noundef !2
  %2 = getelementptr inbounds nuw i8, ptr %_9, i64 8
  %_14.i = load ptr, ptr %2, align 8, !alias.scope !1432, !noalias !1435, !nonnull !2, !noundef !2
  %self.val.i.i = load i64, ptr %_14.i, align 8, !noalias !1437, !noundef !2
  %cond.i.i = icmp ne i64 %self.val.i.i, 0
  tail call void @llvm.assume(i1 %cond.i.i)
  %strong1.i.i = add i64 %self.val.i.i, 1
  store i64 %strong1.i.i, ptr %_14.i, align 8, !noalias !1437
  %3 = icmp eq i64 %strong1.i.i, 0
  br i1 %3, label %bb5.i.i, label %_ZN5alloc2rc10RcInnerPtr10inc_strong17h856bf4f2e7acf7f2E.exit.i, !prof !62

bb5.i.i:                                          ; preds = %start
  tail call void @llvm.trap()
  unreachable

_ZN5alloc2rc10RcInnerPtr10inc_strong17h856bf4f2e7acf7f2E.exit.i: ; preds = %start
  %4 = getelementptr inbounds nuw i8, ptr %_9, i64 16
  %_19.i = load ptr, ptr %4, align 8, !alias.scope !1432, !noalias !1435, !nonnull !2, !noundef !2
  %self.val.i1.i = load i64, ptr %_19.i, align 8, !noalias !1437, !noundef !2
  %cond.i2.i = icmp ne i64 %self.val.i1.i, 0
  tail call void @llvm.assume(i1 %cond.i2.i)
  %strong1.i3.i = add i64 %self.val.i1.i, 1
  store i64 %strong1.i3.i, ptr %_19.i, align 8, !noalias !1437
  %5 = icmp eq i64 %strong1.i3.i, 0
  br i1 %5, label %bb5.i4.i, label %"_ZN71_$LT$solana_account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17hd4841c21abb7ce01E.exit", !prof !62

bb5.i4.i:                                         ; preds = %_ZN5alloc2rc10RcInnerPtr10inc_strong17h856bf4f2e7acf7f2E.exit.i
  tail call void @llvm.trap()
  unreachable

"_ZN71_$LT$solana_account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17hd4841c21abb7ce01E.exit": ; preds = %_ZN5alloc2rc10RcInnerPtr10inc_strong17h856bf4f2e7acf7f2E.exit.i
  %6 = getelementptr inbounds nuw i8, ptr %_9, i64 24
  %_5.i1 = load ptr, ptr %6, align 8, !alias.scope !1432, !noalias !1435, !nonnull !2, !align !436, !noundef !2
  %7 = getelementptr inbounds nuw i8, ptr %_9, i64 32
  %_6.i2 = load i64, ptr %7, align 8, !alias.scope !1432, !noalias !1435, !noundef !2
  %8 = getelementptr inbounds nuw i8, ptr %_9, i64 40
  %9 = load i8, ptr %8, align 8, !range !17, !alias.scope !1432, !noalias !1435, !noundef !2
  %10 = getelementptr inbounds nuw i8, ptr %_9, i64 41
  %11 = load i8, ptr %10, align 1, !range !17, !alias.scope !1432, !noalias !1435, !noundef !2
  %12 = getelementptr inbounds nuw i8, ptr %_9, i64 42
  %13 = load i8, ptr %12, align 2, !range !17, !alias.scope !1432, !noalias !1435, !noundef !2
  call void @llvm.lifetime.start.p0(i64 80, ptr nonnull %snapshot)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %snapshot, ptr noundef nonnull align 1 dereferenceable(32) %_2.i, i64 32, i1 false)
  %14 = getelementptr inbounds nuw i8, ptr %snapshot, i64 32
  store ptr %_2.i, ptr %14, align 8
  %info.sroa.3.0..sroa_idx = getelementptr inbounds nuw i8, ptr %snapshot, i64 40
  store ptr %_14.i, ptr %info.sroa.3.0..sroa_idx, align 8
  %info.sroa.4.0..sroa_idx = getelementptr inbounds nuw i8, ptr %snapshot, i64 48
  store ptr %_19.i, ptr %info.sroa.4.0..sroa_idx, align 8
  %info.sroa.5.0..sroa_idx = getelementptr inbounds nuw i8, ptr %snapshot, i64 56
  store ptr %_5.i1, ptr %info.sroa.5.0..sroa_idx, align 8
  %info.sroa.6.0..sroa_idx = getelementptr inbounds nuw i8, ptr %snapshot, i64 64
  store i64 %_6.i2, ptr %info.sroa.6.0..sroa_idx, align 8
  %info.sroa.7.0..sroa_idx = getelementptr inbounds nuw i8, ptr %snapshot, i64 72
  store i8 %9, ptr %info.sroa.7.0..sroa_idx, align 8
  %info.sroa.8.0..sroa_idx = getelementptr inbounds nuw i8, ptr %snapshot, i64 73
  store i8 %11, ptr %info.sroa.8.0..sroa_idx, align 1
  %info.sroa.9.0..sroa_idx = getelementptr inbounds nuw i8, ptr %snapshot, i64 74
  store i8 %13, ptr %info.sroa.9.0..sroa_idx, align 2
  %_7 = getelementptr inbounds nuw i8, ptr %_8, i64 352
  tail call void @llvm.experimental.noalias.scope.decl(metadata !1438)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !1441)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !1443)
  %15 = getelementptr inbounds nuw i8, ptr %_8, i64 708
  %_5.i = load i8, ptr %15, align 4, !alias.scope !1441, !noalias !1445, !noundef !2
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_6.i), !noalias !1446
; call solana_sysvar::clock::<impl solana_sysvar::Sysvar for solana_clock::Clock>::get
  call void @"_ZN13solana_sysvar5clock71_$LT$impl$u20$solana_sysvar..Sysvar$u20$for$u20$solana_clock..Clock$GT$3get17h4bfb4153e82302bcE"(ptr noalias nocapture noundef nonnull sret([48 x i8]) align 8 dereferenceable(48) %_6.i) #21, !noalias !1446
  %16 = load i32, ptr %_6.i, align 8, !range !1373, !noalias !1446, !noundef !2
  %17 = trunc nuw i32 %16 to i1
  br i1 %17, label %bb5.i, label %bb6.i, !prof !62

bb5.i:                                            ; preds = %"_ZN71_$LT$solana_account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17hd4841c21abb7ce01E.exit"
  call void @llvm.lifetime.start.p0(i64 8, ptr nonnull %_12.i), !noalias !1446
  %18 = getelementptr inbounds nuw i8, ptr %_6.i, i64 4
  %19 = load i32, ptr %18, align 4, !range !1082, !noalias !1446, !noundef !2
  %20 = getelementptr inbounds nuw i8, ptr %_6.i, i64 8
  %21 = load i32, ptr %20, align 8, !noalias !1446
  store i32 %19, ptr %_12.i, align 4, !noalias !1446
  %22 = getelementptr inbounds nuw i8, ptr %_12.i, i64 4
  store i32 %21, ptr %22, align 4, !noalias !1446
; call core::result::unwrap_failed
  call void @_ZN4core6result13unwrap_failed17h5a0595231043dbf9E(ptr noalias noundef nonnull readonly align 1 @alloc_00ae4b301f7fab8ac9617c03fcbd7274, i64 noundef 43, ptr noundef nonnull align 1 %_12.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(32) @vtable.8, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_afb93b96c8dc41d62245c64e99b7d9ba) #22, !noalias !1446
  unreachable

bb6.i:                                            ; preds = %"_ZN71_$LT$solana_account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17hd4841c21abb7ce01E.exit"
  %23 = getelementptr inbounds nuw i8, ptr %_6.i, i64 40
  %now.i = load i64, ptr %23, align 8, !noalias !1446, !noundef !2
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_6.i), !noalias !1446
  %24 = getelementptr inbounds nuw i8, ptr %_8, i64 416
  store i64 %now.i, ptr %24, align 8, !alias.scope !1443, !noalias !1447
  %duration_hours.i = zext i8 %_5.i to i64
  %25 = mul nuw nsw i64 %duration_hours.i, 3600
  %26 = tail call { i64, i1 } @llvm.sadd.with.overflow.i64(i64 %now.i, i64 %25)
  %_9.1.i = extractvalue { i64, i1 } %26, 1
  br i1 %_9.1.i, label %panic1.i, label %_ZN16mayhem_recovered5state16initialize_state17h692e5f2f91265956E.exit

panic1.i:                                         ; preds = %bb6.i
; call core::panicking::panic_const::panic_const_add_overflow
  tail call void @_ZN4core9panicking11panic_const24panic_const_add_overflow17h3493e0c6194f31d7E(ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc_6e6ad567a4e778a6854c1f23e20a6662) #22, !noalias !1446
  unreachable

_ZN16mayhem_recovered5state16initialize_state17h692e5f2f91265956E.exit: ; preds = %bb6.i
  %_9.0.i = extractvalue { i64, i1 } %26, 0
  %27 = getelementptr inbounds nuw i8, ptr %_8, i64 424
  store i64 %_9.0.i, ptr %27, align 8, !alias.scope !1443, !noalias !1447
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(104) %_7, ptr noundef nonnull readonly align 8 dereferenceable(32) %snapshot, i64 32, i1 false), !alias.scope !1445, !noalias !1441
  %28 = getelementptr inbounds nuw i8, ptr %_8, i64 384
  store i128 0, ptr %28, align 8, !alias.scope !1443, !noalias !1447
  %29 = getelementptr inbounds nuw i8, ptr %_8, i64 432
  store i64 %now.i, ptr %29, align 8, !alias.scope !1443, !noalias !1447
  %30 = getelementptr inbounds nuw i8, ptr %_8, i64 449
  store i8 0, ptr %30, align 1, !alias.scope !1443, !noalias !1447
  %31 = getelementptr inbounds nuw i8, ptr %_8, i64 400
  store i128 0, ptr %31, align 8, !alias.scope !1443, !noalias !1447
  %32 = getelementptr inbounds nuw i8, ptr %_8, i64 448
  store i8 0, ptr %32, align 8, !alias.scope !1443, !noalias !1447
  %33 = getelementptr inbounds nuw i8, ptr %_8, i64 440
  store i64 0, ptr %33, align 8, !alias.scope !1443, !noalias !1447
  tail call void @llvm.experimental.noalias.scope.decl(metadata !1448)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !1451)
  %_8.i.i.i.i = load i64, ptr %_14.i, align 8, !noalias !1454, !noundef !2
  %val.i.i.i.i = add i64 %_8.i.i.i.i, -1
  store i64 %val.i.i.i.i, ptr %_14.i, align 8, !noalias !1454
  %34 = icmp eq i64 %val.i.i.i.i, 0
  br i1 %34, label %bb1.i.i.i.i, label %"_ZN4core3ptr84drop_in_place$LT$alloc..rc..Rc$LT$core..cell..RefCell$LT$$RF$mut$u20$u64$GT$$GT$$GT$17hd3fdd43e0c454907E.exit.i.i"

bb1.i.i.i.i:                                      ; preds = %_ZN16mayhem_recovered5state16initialize_state17h692e5f2f91265956E.exit
; call alloc::rc::Rc<T,A>::drop_slow
  call void @"_ZN5alloc2rc15Rc$LT$T$C$A$GT$9drop_slow17h0e448c29aa178b27E"(ptr noalias noundef nonnull align 8 dereferenceable(8) %info.sroa.3.0..sroa_idx) #21
  %_5.i.i1.i.i.pre = load ptr, ptr %info.sroa.4.0..sroa_idx, align 8, !alias.scope !1459
  br label %"_ZN4core3ptr84drop_in_place$LT$alloc..rc..Rc$LT$core..cell..RefCell$LT$$RF$mut$u20$u64$GT$$GT$$GT$17hd3fdd43e0c454907E.exit.i.i"

"_ZN4core3ptr84drop_in_place$LT$alloc..rc..Rc$LT$core..cell..RefCell$LT$$RF$mut$u20$u64$GT$$GT$$GT$17hd3fdd43e0c454907E.exit.i.i": ; preds = %bb1.i.i.i.i, %_ZN16mayhem_recovered5state16initialize_state17h692e5f2f91265956E.exit
  %_5.i.i1.i.i = phi ptr [ %_5.i.i1.i.i.pre, %bb1.i.i.i.i ], [ %_19.i, %_ZN16mayhem_recovered5state16initialize_state17h692e5f2f91265956E.exit ]
  call void @llvm.experimental.noalias.scope.decl(metadata !1464)
  call void @llvm.experimental.noalias.scope.decl(metadata !1465)
  %_8.i.i2.i.i = load i64, ptr %_5.i.i1.i.i, align 8, !noalias !1466, !noundef !2
  %val.i.i3.i.i = add i64 %_8.i.i2.i.i, -1
  store i64 %val.i.i3.i.i, ptr %_5.i.i1.i.i, align 8, !noalias !1466
  %35 = icmp eq i64 %val.i.i3.i.i, 0
  br i1 %35, label %bb1.i.i4.i.i, label %"_ZN4core3ptr54drop_in_place$LT$mayhem_recovered..state..InitMint$GT$17haf09a6ecd4063c2aE.exit"

bb1.i.i4.i.i:                                     ; preds = %"_ZN4core3ptr84drop_in_place$LT$alloc..rc..Rc$LT$core..cell..RefCell$LT$$RF$mut$u20$u64$GT$$GT$$GT$17hd3fdd43e0c454907E.exit.i.i"
; call alloc::rc::Rc<T,A>::drop_slow
  call void @"_ZN5alloc2rc15Rc$LT$T$C$A$GT$9drop_slow17h74408dd96f5b64b1E"(ptr noalias noundef nonnull align 8 dereferenceable(8) %info.sroa.4.0..sroa_idx) #21
  br label %"_ZN4core3ptr54drop_in_place$LT$mayhem_recovered..state..InitMint$GT$17haf09a6ecd4063c2aE.exit"

"_ZN4core3ptr54drop_in_place$LT$mayhem_recovered..state..InitMint$GT$17haf09a6ecd4063c2aE.exit": ; preds = %"_ZN4core3ptr84drop_in_place$LT$alloc..rc..Rc$LT$core..cell..RefCell$LT$$RF$mut$u20$u64$GT$$GT$$GT$17hd3fdd43e0c454907E.exit.i.i", %bb1.i.i4.i.i
  call void @llvm.lifetime.end.p0(i64 80, ptr nonnull %snapshot)
  ret { i64, ptr } { i64 2, ptr undef }
}
