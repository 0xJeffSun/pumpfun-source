define void @_ZN14token_metadata9processor4uses7utilize15process_utilize17h9789c7990f4c0b83E(ptr noalias nocapture noundef sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %0, ptr noalias noundef readonly align 1 dereferenceable(32) %program_id, ptr noalias noundef nonnull readonly align 8 %accounts.0, i64 noundef %accounts.1, i64 noundef %number_of_uses) unnamed_addr #1 {
start:
  %_341 = alloca %"solana_program::account_info::AccountInfo<'_>", align 8
  %_339 = alloca %"solana_program::account_info::AccountInfo<'_>", align 8
  %_336 = alloca %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", align 8
  %_335 = alloca %"core::result::Result<(), solana_program::program_error::ProgramError>", align 8
  %_334.sroa.7 = alloca [7 x i32], align 4
  %_323 = alloca %"solana_program::account_info::AccountInfo<'_>", align 8
  %_321 = alloca %"solana_program::account_info::AccountInfo<'_>", align 8
  %_318 = alloca %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", align 8
  %_317 = alloca %"core::result::Result<(), solana_program::program_error::ProgramError>", align 8
  %_316.sroa.7 = alloca [7 x i32], align 4
  %_314 = alloca [1 x i8], align 1
  %_300 = alloca [4 x { ptr, i64 }], align 8
  %_285 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_284.sroa.9 = alloca [4 x i32], align 8
  %_269 = alloca %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>", align 8
  %_214 = alloca %"core::result::Result<state::uses::UseAuthorityRecord, solana_program::program_error::ProgramError>", align 8
  %_213.sroa.7 = alloca [7 x i32], align 4
  %record = alloca %"state::uses::UseAuthorityRecord", align 8
  %_203 = alloca %"core::result::Result<u8, solana_program::program_error::ProgramError>", align 8
  %_202.sroa.9 = alloca [27 x i8], align 1
  %_194 = alloca %"core::result::Result<(), solana_program::program_error::ProgramError>", align 8
  %_193.sroa.7 = alloca [7 x i32], align 4
  %_179 = alloca %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>", align 8
  %_168 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_167.sroa.9 = alloca [4 x i32], align 8
  %_134 = alloca %"core::option::Option<state::uses::Uses>", align 8
  %metadata_uses = alloca %"state::uses::Uses", align 8
  %_127 = alloca %"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>", align 8
  %_126.sroa.0 = alloca [66 x i32], align 8
  %metadata11 = alloca %"state::metadata::Metadata", align 8
  %_113 = alloca %"core::result::Result<(), solana_program::program_error::ProgramError>", align 8
  %_112.sroa.7 = alloca [7 x i32], align 4
  %_106 = alloca %"core::result::Result<(), solana_program::program_error::ProgramError>", align 8
  %_105.sroa.7 = alloca [7 x i32], align 4
  %_84 = alloca %"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>", align 8
  %_83.sroa.0 = alloca [66 x i32], align 8
  %metadata = alloca %"state::metadata::Metadata", align 8
  %_66 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_65.sroa.8 = alloca [4 x i32], align 8
  %_58 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_57.sroa.8 = alloca [4 x i32], align 8
  %_50 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_49.sroa.9 = alloca [4 x i32], align 8
  %_42 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_41.sroa.9 = alloca [4 x i32], align 8
  %_34 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_33.sroa.9 = alloca [4 x i32], align 8
  %_26 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_25.sroa.9 = alloca [4 x i32], align 8
  %_18 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_17.sroa.9 = alloca [4 x i32], align 8
  %_10 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_9.sroa.9 = alloca [4 x i32], align 8
  %_5 = alloca %"core::iter::adapters::peekable::Peekable<core::slice::iter::Iter<'_, solana_program::account_info::AccountInfo<'_>>>", align 8
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_5)
  %1 = getelementptr inbounds %"solana_program::account_info::AccountInfo<'_>", ptr %accounts.0, i64 %accounts.1
  store ptr %1, ptr %_5, align 8, !alias.scope !7902
  %2 = getelementptr inbounds { ptr, ptr }, ptr %_5, i64 0, i32 1
  store ptr %accounts.0, ptr %2, align 8, !alias.scope !7902
  %3 = getelementptr inbounds %"core::iter::adapters::peekable::Peekable<core::slice::iter::Iter<'_, solana_program::account_info::AccountInfo<'_>>>", ptr %_5, i64 0, i32 1
  store i64 0, ptr %3, align 8, !alias.scope !7902
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_9.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_10)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_10, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7907)
  %4 = load i32, ptr %_10, align 8, !range !146, !alias.scope !7910, !noalias !7907, !noundef !4
  %5 = icmp eq i32 %4, 22
  br i1 %5, label %bb5, label %bb7

bb5:                                              ; preds = %start
  %6 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_10, i64 0, i32 1
  %v.i = load ptr, ptr %6, align 8, !alias.scope !7910, !noalias !7907, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_10)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_9.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_17.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_18)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_18, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7912)
  %7 = load i32, ptr %_18, align 8, !range !146, !alias.scope !7915, !noalias !7912, !noundef !4
  %8 = icmp eq i32 %7, 22
  br i1 %8, label %bb11, label %bb13

bb7:                                              ; preds = %start
  %_9.sroa.7.0._10.sroa_idx = getelementptr inbounds i8, ptr %_10, i64 4
  %_9.sroa.7.0.copyload163 = load i32, ptr %_9.sroa.7.0._10.sroa_idx, align 4, !alias.scope !7917
  %_9.sroa.7164.0._10.sroa_idx = getelementptr inbounds i8, ptr %_10, i64 8
  %_9.sroa.7164.0.copyload165 = load ptr, ptr %_9.sroa.7164.0._10.sroa_idx, align 8, !alias.scope !7917
  %_9.sroa.9.0._10.sroa_idx = getelementptr inbounds i8, ptr %_10, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_9.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_9.sroa.9.0._10.sroa_idx, i64 16, i1 false), !alias.scope !7917
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_10)
  %_14.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_14.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_9.sroa.9, i64 16, i1 false)
  store i32 %4, ptr %0, align 8, !alias.scope !7918
  %_14.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_9.sroa.7.0.copyload163, ptr %_14.sroa.4.0..sroa_idx, align 4, !alias.scope !7918
  %_14.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_9.sroa.7164.0.copyload165, ptr %_14.sroa.5.0..sroa_idx, align 8, !alias.scope !7918
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_9.sroa.9)
  br label %bb260

bb260:                                            ; preds = %bb49, %bb252, %bb43, %bb37, %bb31, %bb25, %bb19, %bb13, %bb7
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_5)
  br label %bb261

bb11:                                             ; preds = %bb5
  %9 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_18, i64 0, i32 1
  %v.i53 = load ptr, ptr %9, align 8, !alias.scope !7915, !noalias !7912, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_18)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_17.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_25.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_26)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_26, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7922)
  %10 = load i32, ptr %_26, align 8, !range !146, !alias.scope !7925, !noalias !7922, !noundef !4
  %11 = icmp eq i32 %10, 22
  br i1 %11, label %bb17, label %bb19

bb13:                                             ; preds = %bb5
  %_17.sroa.7.0._18.sroa_idx = getelementptr inbounds i8, ptr %_18, i64 4
  %_17.sroa.7.0.copyload167 = load i32, ptr %_17.sroa.7.0._18.sroa_idx, align 4, !alias.scope !7927
  %_17.sroa.7168.0._18.sroa_idx = getelementptr inbounds i8, ptr %_18, i64 8
  %_17.sroa.7168.0.copyload169 = load ptr, ptr %_17.sroa.7168.0._18.sroa_idx, align 8, !alias.scope !7927
  %_17.sroa.9.0._18.sroa_idx = getelementptr inbounds i8, ptr %_18, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_17.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_17.sroa.9.0._18.sroa_idx, i64 16, i1 false), !alias.scope !7927
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_18)
  %_22.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_22.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_17.sroa.9, i64 16, i1 false)
  store i32 %7, ptr %0, align 8, !alias.scope !7928
  %_22.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_17.sroa.7.0.copyload167, ptr %_22.sroa.4.0..sroa_idx, align 4, !alias.scope !7928
  %_22.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_17.sroa.7168.0.copyload169, ptr %_22.sroa.5.0..sroa_idx, align 8, !alias.scope !7928
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_17.sroa.9)
  br label %bb260

bb17:                                             ; preds = %bb11
  %12 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_26, i64 0, i32 1
  %v.i57 = load ptr, ptr %12, align 8, !alias.scope !7925, !noalias !7922, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_26)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_25.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_33.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_34)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_34, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7932)
  %13 = load i32, ptr %_34, align 8, !range !146, !alias.scope !7935, !noalias !7932, !noundef !4
  %14 = icmp eq i32 %13, 22
  br i1 %14, label %bb23, label %bb25

bb19:                                             ; preds = %bb11
  %_25.sroa.7.0._26.sroa_idx = getelementptr inbounds i8, ptr %_26, i64 4
  %_25.sroa.7.0.copyload171 = load i32, ptr %_25.sroa.7.0._26.sroa_idx, align 4, !alias.scope !7937
  %_25.sroa.7172.0._26.sroa_idx = getelementptr inbounds i8, ptr %_26, i64 8
  %_25.sroa.7172.0.copyload173 = load ptr, ptr %_25.sroa.7172.0._26.sroa_idx, align 8, !alias.scope !7937
  %_25.sroa.9.0._26.sroa_idx = getelementptr inbounds i8, ptr %_26, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_25.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_25.sroa.9.0._26.sroa_idx, i64 16, i1 false), !alias.scope !7937
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_26)
  %_30.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_30.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_25.sroa.9, i64 16, i1 false)
  store i32 %10, ptr %0, align 8, !alias.scope !7938
  %_30.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_25.sroa.7.0.copyload171, ptr %_30.sroa.4.0..sroa_idx, align 4, !alias.scope !7938
  %_30.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_25.sroa.7172.0.copyload173, ptr %_30.sroa.5.0..sroa_idx, align 8, !alias.scope !7938
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_25.sroa.9)
  br label %bb260

bb23:                                             ; preds = %bb17
  %15 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_34, i64 0, i32 1
  %v.i61 = load ptr, ptr %15, align 8, !alias.scope !7935, !noalias !7932, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_34)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_33.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_41.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_42)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_42, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7942)
  %16 = load i32, ptr %_42, align 8, !range !146, !alias.scope !7945, !noalias !7942, !noundef !4
  %17 = icmp eq i32 %16, 22
  br i1 %17, label %bb29, label %bb31

bb25:                                             ; preds = %bb17
  %_33.sroa.7.0._34.sroa_idx = getelementptr inbounds i8, ptr %_34, i64 4
  %_33.sroa.7.0.copyload175 = load i32, ptr %_33.sroa.7.0._34.sroa_idx, align 4, !alias.scope !7947
  %_33.sroa.7176.0._34.sroa_idx = getelementptr inbounds i8, ptr %_34, i64 8
  %_33.sroa.7176.0.copyload177 = load ptr, ptr %_33.sroa.7176.0._34.sroa_idx, align 8, !alias.scope !7947
  %_33.sroa.9.0._34.sroa_idx = getelementptr inbounds i8, ptr %_34, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_33.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_33.sroa.9.0._34.sroa_idx, i64 16, i1 false), !alias.scope !7947
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_34)
  %_38.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_38.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_33.sroa.9, i64 16, i1 false)
  store i32 %13, ptr %0, align 8, !alias.scope !7948
  %_38.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_33.sroa.7.0.copyload175, ptr %_38.sroa.4.0..sroa_idx, align 4, !alias.scope !7948
  %_38.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_33.sroa.7176.0.copyload177, ptr %_38.sroa.5.0..sroa_idx, align 8, !alias.scope !7948
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_33.sroa.9)
  br label %bb260

bb29:                                             ; preds = %bb23
  %18 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_42, i64 0, i32 1
  %v.i65 = load ptr, ptr %18, align 8, !alias.scope !7945, !noalias !7942, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_42)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_41.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_49.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_50)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_50, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7952)
  %19 = load i32, ptr %_50, align 8, !range !146, !alias.scope !7955, !noalias !7952, !noundef !4
  %20 = icmp eq i32 %19, 22
  br i1 %20, label %bb35, label %bb37

bb31:                                             ; preds = %bb23
  %_41.sroa.7.0._42.sroa_idx = getelementptr inbounds i8, ptr %_42, i64 4
  %_41.sroa.7.0.copyload179 = load i32, ptr %_41.sroa.7.0._42.sroa_idx, align 4, !alias.scope !7957
  %_41.sroa.7180.0._42.sroa_idx = getelementptr inbounds i8, ptr %_42, i64 8
  %_41.sroa.7180.0.copyload181 = load ptr, ptr %_41.sroa.7180.0._42.sroa_idx, align 8, !alias.scope !7957
  %_41.sroa.9.0._42.sroa_idx = getelementptr inbounds i8, ptr %_42, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_41.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_41.sroa.9.0._42.sroa_idx, i64 16, i1 false), !alias.scope !7957
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_42)
  %_46.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_46.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_41.sroa.9, i64 16, i1 false)
  store i32 %16, ptr %0, align 8, !alias.scope !7958
  %_46.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_41.sroa.7.0.copyload179, ptr %_46.sroa.4.0..sroa_idx, align 4, !alias.scope !7958
  %_46.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_41.sroa.7180.0.copyload181, ptr %_46.sroa.5.0..sroa_idx, align 8, !alias.scope !7958
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_41.sroa.9)
  br label %bb260

bb35:                                             ; preds = %bb29
  %21 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_50, i64 0, i32 1
  %v.i69 = load ptr, ptr %21, align 8, !alias.scope !7955, !noalias !7952, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_50)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_49.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_57.sroa.8)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_58)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_58, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7962)
  %22 = load i32, ptr %_58, align 8, !range !146, !alias.scope !7965, !noalias !7962, !noundef !4
  %23 = icmp eq i32 %22, 22
  br i1 %23, label %bb41, label %bb43

bb37:                                             ; preds = %bb29
  %_49.sroa.7.0._50.sroa_idx = getelementptr inbounds i8, ptr %_50, i64 4
  %_49.sroa.7.0.copyload183 = load i32, ptr %_49.sroa.7.0._50.sroa_idx, align 4, !alias.scope !7967
  %_49.sroa.7184.0._50.sroa_idx = getelementptr inbounds i8, ptr %_50, i64 8
  %_49.sroa.7184.0.copyload185 = load ptr, ptr %_49.sroa.7184.0._50.sroa_idx, align 8, !alias.scope !7967
  %_49.sroa.9.0._50.sroa_idx = getelementptr inbounds i8, ptr %_50, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_49.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_49.sroa.9.0._50.sroa_idx, i64 16, i1 false), !alias.scope !7967
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_50)
  %_54.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_54.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_49.sroa.9, i64 16, i1 false)
  store i32 %19, ptr %0, align 8, !alias.scope !7968
  %_54.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_49.sroa.7.0.copyload183, ptr %_54.sroa.4.0..sroa_idx, align 4, !alias.scope !7968
  %_54.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_49.sroa.7184.0.copyload185, ptr %_54.sroa.5.0..sroa_idx, align 8, !alias.scope !7968
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_49.sroa.9)
  br label %bb260

bb41:                                             ; preds = %bb35
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_58)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_57.sroa.8)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_65.sroa.8)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_66)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_66, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7972)
  %24 = load i32, ptr %_66, align 8, !range !146, !alias.scope !7975, !noalias !7972, !noundef !4
  %25 = icmp eq i32 %24, 22
  br i1 %25, label %bb47, label %bb49

bb43:                                             ; preds = %bb35
  %_57.sroa.7.0._58.sroa_idx = getelementptr inbounds i8, ptr %_58, i64 4
  %_57.sroa.7.0.copyload187 = load i32, ptr %_57.sroa.7.0._58.sroa_idx, align 4, !alias.scope !7977
  %_57.sroa.7188.0._58.sroa_idx = getelementptr inbounds i8, ptr %_58, i64 8
  %_57.sroa.7188.0.copyload189 = load ptr, ptr %_57.sroa.7188.0._58.sroa_idx, align 8, !alias.scope !7977
  %_57.sroa.8.0._58.sroa_idx = getelementptr inbounds i8, ptr %_58, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_57.sroa.8, ptr noundef nonnull align 8 dereferenceable(16) %_57.sroa.8.0._58.sroa_idx, i64 16, i1 false), !alias.scope !7977
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_58)
  %_62.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_62.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_57.sroa.8, i64 16, i1 false)
  store i32 %22, ptr %0, align 8, !alias.scope !7978
  %_62.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_57.sroa.7.0.copyload187, ptr %_62.sroa.4.0..sroa_idx, align 4, !alias.scope !7978
  %_62.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_57.sroa.7188.0.copyload189, ptr %_62.sroa.5.0..sroa_idx, align 8, !alias.scope !7978
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_57.sroa.8)
  br label %bb260

bb47:                                             ; preds = %bb41
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_66)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_65.sroa.8)
; call core::iter::adapters::peekable::Peekable<I>::next_if
  %26 = call noundef align 8 dereferenceable_or_null(48) ptr @"_ZN4core4iter8adapters8peekable17Peekable$LT$I$GT$7next_if17h8be795c6e429a654E"(ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  %.not.i.not = icmp eq ptr %26, null
  %27 = icmp eq i64 %accounts.1, 11
  %28 = icmp eq i64 %accounts.1, 10
  %approved_authority_is_using.0.in = select i1 %.not.i.not, i1 %28, i1 %27
  call void @llvm.lifetime.start.p0(i64 304, ptr nonnull %metadata)
  call void @llvm.lifetime.start.p0(i64 264, ptr nonnull %_83.sroa.0)
  call void @llvm.lifetime.start.p0(i64 304, ptr nonnull %_84)
; call token_metadata::state::TokenMetadataAccount::from_account_info
  call void @_ZN14token_metadata5state20TokenMetadataAccount17from_account_info17hcfef9f224c5b6ff6E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>") dereferenceable(304) %_84, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7982)
  %29 = getelementptr inbounds %"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>", ptr %_84, i64 0, i32 1
  %30 = load i32, ptr %29, align 8, !range !252, !alias.scope !7985, !noalias !7982, !noundef !4
  %31 = icmp eq i32 %30, 2
  br i1 %31, label %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit.thread", label %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit"

"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit.thread": ; preds = %bb47
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %_83.sroa.0, ptr noundef nonnull align 8 dereferenceable(32) %_84, i64 32, i1 false), !alias.scope !7987
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %_84)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %0, ptr noundef nonnull align 8 dereferenceable(32) %_83.sroa.0, i64 32, i1 false)
  call void @llvm.lifetime.end.p0(i64 264, ptr nonnull %_83.sroa.0)
  br label %bb252

"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit": ; preds = %bb47
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(264) %_83.sroa.0, ptr noundef nonnull align 8 dereferenceable(264) %_84, i64 264, i1 false), !alias.scope !7987
  %_83.sroa.9.0._84.sroa_idx = getelementptr inbounds i8, ptr %_84, i64 268
  %val.sroa.5.0.metadata.sroa_idx = getelementptr inbounds i8, ptr %metadata, i64 268
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(36) %val.sroa.5.0.metadata.sroa_idx, ptr noundef nonnull align 4 dereferenceable(36) %_83.sroa.9.0._84.sroa_idx, i64 36, i1 false)
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %_84)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(264) %metadata, ptr noundef nonnull align 8 dereferenceable(264) %_83.sroa.0, i64 264, i1 false)
  %val.sroa.4.0.metadata.sroa_idx = getelementptr inbounds i8, ptr %metadata, i64 264
  store i32 %30, ptr %val.sroa.4.0.metadata.sroa_idx, align 8
  call void @llvm.lifetime.end.p0(i64 264, ptr nonnull %_83.sroa.0)
  %_91 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata, i64 0, i32 11
  %32 = load i32, ptr %_91, align 8, !range !219, !alias.scope !7988, !noundef !4
  %.not.i83 = icmp eq i32 %32, 3
  br i1 %.not.i83, label %bb63, label %bb65

bb49:                                             ; preds = %bb41
  %_65.sroa.7.0._66.sroa_idx = getelementptr inbounds i8, ptr %_66, i64 4
  %_65.sroa.7.0.copyload191 = load i32, ptr %_65.sroa.7.0._66.sroa_idx, align 4, !alias.scope !7991
  %_65.sroa.7192.0._66.sroa_idx = getelementptr inbounds i8, ptr %_66, i64 8
  %_65.sroa.7192.0.copyload193 = load ptr, ptr %_65.sroa.7192.0._66.sroa_idx, align 8, !alias.scope !7991
  %_65.sroa.8.0._66.sroa_idx = getelementptr inbounds i8, ptr %_66, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_65.sroa.8, ptr noundef nonnull align 8 dereferenceable(16) %_65.sroa.8.0._66.sroa_idx, i64 16, i1 false), !alias.scope !7991
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_66)
  %_70.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_70.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_65.sroa.8, i64 16, i1 false)
  store i32 %24, ptr %0, align 8, !alias.scope !7992
  %_70.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_65.sroa.7.0.copyload191, ptr %_70.sroa.4.0..sroa_idx, align 4, !alias.scope !7992
  %_70.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_65.sroa.7192.0.copyload193, ptr %_70.sroa.5.0..sroa_idx, align 8, !alias.scope !7992
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_65.sroa.8)
  br label %bb260

bb252:                                            ; preds = %bb251, %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit.thread"
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %metadata)
  br label %bb260

bb65:                                             ; preds = %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit"
  %33 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata, i64 0, i32 8
  %34 = load i32, ptr %33, align 4, !range !455, !noundef !4
  %.not = icmp eq i32 %34, 6
  br i1 %.not, label %bb70, label %bb67

bb63:                                             ; preds = %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit"
  store i32 0, ptr %0, align 8
  %_92.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 85, ptr %_92.sroa.4.0..sroa_idx, align 4
  br label %bb251

bb251:                                            ; preds = %bb250, %bb87, %bb81, %bb74, %bb70, %bb63
  %35 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata, i64 0, i32 4
; call core::ptr::drop_in_place<token_metadata::state::data::Data>
  call fastcc void @"_ZN4core3ptr54drop_in_place$LT$token_metadata..state..data..Data$GT$17h361e34b2f1c25fb1E"(ptr noundef nonnull %35) #32
  br label %bb252

bb67:                                             ; preds = %bb65
  %36 = tail call i32 @llvm.bpf.passthrough.i32.i32(i32 14, i32 %34)
  switch i32 %36, label %bb70 [
    i32 0, label %bb68
    i32 3, label %bb68
    i32 4, label %bb68
    i32 5, label %bb68
  ]

bb68:                                             ; preds = %bb67, %bb67, %bb67, %bb67
  %_352 = load ptr, ptr %v.i69, align 8, !nonnull !4, !align !37, !noundef !4
; call core::cmp::PartialEq::ne
  %_100 = tail call fastcc noundef zeroext i1 @_ZN4core3cmp9PartialEq2ne17h0d0d6ae917ee2100E(ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %_352, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) @alloc11830) #32
  br i1 %_100, label %bb74, label %bb76

bb70:                                             ; preds = %bb67, %bb65
  store i32 0, ptr %0, align 8
  %_98.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 135, ptr %_98.sroa.4.0..sroa_idx, align 4
  br label %bb251

bb76:                                             ; preds = %bb68
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_105.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_106)
; call mpl_utils::assertions::assert_signer
  call void @_ZN9mpl_utils10assertions13assert_signer17hc5021f06096037b1E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_106, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i61) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7996)
  %37 = load i32, ptr %_106, align 8, !range !146, !alias.scope !7999, !noalias !7996, !noundef !4
  %38 = icmp eq i32 %37, 22
  br i1 %38, label %bb79, label %bb81

bb74:                                             ; preds = %bb68
  store i32 0, ptr %0, align 8
  %_103.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 62, ptr %_103.sroa.4.0..sroa_idx, align 4
  br label %bb251

bb79:                                             ; preds = %bb76
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_106)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_105.sroa.7)
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_112.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_113)
; call token_metadata::assertions::metadata::assert_currently_holding
  call void @_ZN14token_metadata10assertions8metadata24assert_currently_holding17h9773fdd27308f043E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_113, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %program_id, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i65, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(304) %metadata, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i57, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i53) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8001)
  %39 = load i32, ptr %_113, align 8, !range !146, !alias.scope !8004, !noalias !8001, !noundef !4
  %40 = icmp eq i32 %39, 22
  br i1 %40, label %bb85, label %bb87

bb81:                                             ; preds = %bb76
  %_105.sroa.7.0._106.sroa_idx = getelementptr inbounds i8, ptr %_106, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_105.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_105.sroa.7.0._106.sroa_idx, i64 28, i1 false), !alias.scope !8006
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_106)
  %_110.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_110.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_105.sroa.7, i64 28, i1 false)
  store i32 %37, ptr %0, align 8, !alias.scope !8007
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_105.sroa.7)
  br label %bb251

bb85:                                             ; preds = %bb79
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_113)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_112.sroa.7)
  call void @llvm.lifetime.start.p0(i64 304, ptr nonnull %metadata11)
  call void @llvm.lifetime.start.p0(i64 264, ptr nonnull %_126.sroa.0)
  call void @llvm.lifetime.start.p0(i64 304, ptr nonnull %_127)
; call token_metadata::state::TokenMetadataAccount::from_account_info
  call void @_ZN14token_metadata5state20TokenMetadataAccount17from_account_info17hcfef9f224c5b6ff6E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>") dereferenceable(304) %_127, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8011)
  %41 = getelementptr inbounds %"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>", ptr %_127, i64 0, i32 1
  %42 = load i32, ptr %41, align 8, !range !252, !alias.scope !8014, !noalias !8011, !noundef !4
  %43 = icmp eq i32 %42, 2
  br i1 %43, label %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit91.thread", label %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit91"

"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit91.thread": ; preds = %bb85
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %_126.sroa.0, ptr noundef nonnull align 8 dereferenceable(32) %_127, i64 32, i1 false), !alias.scope !8016
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %_127)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %0, ptr noundef nonnull align 8 dereferenceable(32) %_126.sroa.0, i64 32, i1 false)
  call void @llvm.lifetime.end.p0(i64 264, ptr nonnull %_126.sroa.0)
  br label %bb250

"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit91": ; preds = %bb85
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(264) %_126.sroa.0, ptr noundef nonnull align 8 dereferenceable(264) %_127, i64 264, i1 false), !alias.scope !8016
  %_126.sroa.9.0._127.sroa_idx = getelementptr inbounds i8, ptr %_127, i64 268
  %val13.sroa.5.0.metadata11.sroa_idx = getelementptr inbounds i8, ptr %metadata11, i64 268
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(36) %val13.sroa.5.0.metadata11.sroa_idx, ptr noundef nonnull align 4 dereferenceable(36) %_126.sroa.9.0._127.sroa_idx, i64 36, i1 false)
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %_127)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(264) %metadata11, ptr noundef nonnull align 8 dereferenceable(264) %_126.sroa.0, i64 264, i1 false)
  %val13.sroa.4.0.metadata11.sroa_idx = getelementptr inbounds i8, ptr %metadata11, i64 264
  store i32 %42, ptr %val13.sroa.4.0.metadata11.sroa_idx, align 8
  call void @llvm.lifetime.end.p0(i64 264, ptr nonnull %_126.sroa.0)
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %metadata_uses)
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %_134)
  %44 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 11
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %_134, ptr noundef nonnull align 8 dereferenceable(24) %44, i64 24, i1 false)
; call core::option::Option<T>::unwrap
  call fastcc void @"_ZN4core6option15Option$LT$T$GT$6unwrap17h43982a0059e73655E"(ptr noalias nocapture noundef nonnull sret(%"state::uses::Uses") dereferenceable(24) %metadata_uses, ptr noalias nocapture noundef nonnull dereferenceable(24) %_134, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc21366) #32
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_134)
  %45 = load i32, ptr %metadata_uses, align 8, !range !252, !alias.scope !8017, !noalias !8020, !noundef !4
  %46 = icmp eq i32 %45, 0
  %47 = icmp eq i64 %number_of_uses, 0
  %48 = getelementptr inbounds %"state::uses::Uses", ptr %metadata_uses, i64 0, i32 3
  %_143 = load i64, ptr %48, align 8
  %_141 = icmp ult i64 %_143, %number_of_uses
  %_139.0.off0 = select i1 %47, i1 true, i1 %_141
  %49 = getelementptr inbounds %"state::uses::Uses", ptr %metadata_uses, i64 0, i32 2
  %_146 = load i64, ptr %49, align 8
  %_144 = icmp ult i64 %_146, %number_of_uses
  %or.cond = select i1 %_139.0.off0, i1 true, i1 %_144
  br i1 %or.cond, label %bb103, label %bb109

bb87:                                             ; preds = %bb79
  %_112.sroa.7.0._113.sroa_idx = getelementptr inbounds i8, ptr %_113, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_112.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_112.sroa.7.0._113.sroa_idx, i64 28, i1 false), !alias.scope !8022
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_113)
  %_123.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_123.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_112.sroa.7, i64 28, i1 false)
  store i32 %39, ptr %0, align 8, !alias.scope !8023
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_112.sroa.7)
  br label %bb251

bb250:                                            ; preds = %bb249, %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit91.thread"
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %metadata11)
  br label %bb251

bb103:                                            ; preds = %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit91"
  store i32 0, ptr %0, align 8
  %_147.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 86, ptr %_147.sroa.4.0..sroa_idx, align 4
  br label %bb249

bb249:                                            ; preds = %bb185, %bb192, %bb125, %bb244, %bb233, %bb203, %bb222, %bb209, %bb177, %bb119, %bb103
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %metadata_uses)
  %50 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 4
; call core::ptr::drop_in_place<token_metadata::state::data::Data>
  call fastcc void @"_ZN4core3ptr54drop_in_place$LT$token_metadata..state..data..Data$GT$17h361e34b2f1c25fb1E"(ptr noundef nonnull %50) #32
  br label %bb250

bb109:                                            ; preds = %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h1ade9d6e6b4ad0ceE.exit91"
  %51 = sub i64 %_146, %number_of_uses
  store i32 %45, ptr %44, align 8
  %_160.sroa.5.0..sroa_idx = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 11, i32 1, i64 1
  store i64 %51, ptr %_160.sroa.5.0..sroa_idx, align 8
  %_160.sroa.6.0..sroa_idx = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 11, i32 1, i64 3
  store i64 %_143, ptr %_160.sroa.6.0..sroa_idx, align 8
  br i1 %approved_authority_is_using.0.in, label %bb113, label %bb114

bb114:                                            ; preds = %bb109
; call core::cmp::impls::<impl core::cmp::PartialEq<&B> for &A>::ne
  %_255 = call fastcc noundef zeroext i1 @"_ZN4core3cmp5impls69_$LT$impl$u20$core..cmp..PartialEq$LT$$RF$B$GT$$u20$for$u20$$RF$A$GT$2ne17h034b8f2a183c21c2E"(ptr noalias noundef nonnull readonly align 8 dereferenceable(8) %v.i61, ptr noalias noundef nonnull readonly align 8 dereferenceable(8) %v.i65) #32
  br i1 %_255, label %bb177, label %bb180

bb113:                                            ; preds = %bb109
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_167.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_168)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_168, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8027)
  %52 = load i32, ptr %_168, align 8, !range !146, !alias.scope !8030, !noalias !8027, !noundef !4
  %53 = icmp eq i32 %52, 22
  br i1 %53, label %bb117, label %bb119

bb117:                                            ; preds = %bb113
  %54 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_168, i64 0, i32 1
  %v.i98 = load ptr, ptr %54, align 8, !alias.scope !8030, !noalias !8027, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_168)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_167.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_179)
; call solana_program::account_info::AccountInfo::try_borrow_mut_data
  call void @_ZN14solana_program12account_info11AccountInfo19try_borrow_mut_data17hcf238957d2f67b88E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>") dereferenceable(32) %_179, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i98) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8032)
  %55 = load i32, ptr %_179, align 8, !range !146, !alias.scope !8035, !noalias !8032, !noundef !4
  %56 = icmp eq i32 %55, 22
  br i1 %56, label %bb123, label %bb125

bb119:                                            ; preds = %bb113
  %_167.sroa.7.0._168.sroa_idx = getelementptr inbounds i8, ptr %_168, i64 4
  %_167.sroa.7.0.copyload201 = load i32, ptr %_167.sroa.7.0._168.sroa_idx, align 4, !alias.scope !8037
  %_167.sroa.7202.0._168.sroa_idx = getelementptr inbounds i8, ptr %_168, i64 8
  %_167.sroa.7202.0.copyload203 = load ptr, ptr %_167.sroa.7202.0._168.sroa_idx, align 8, !alias.scope !8037
  %_167.sroa.9.0._168.sroa_idx = getelementptr inbounds i8, ptr %_168, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_167.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_167.sroa.9.0._168.sroa_idx, i64 16, i1 false), !alias.scope !8037
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_168)
  %_172.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_172.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_167.sroa.9, i64 16, i1 false)
  store i32 %52, ptr %0, align 8, !alias.scope !8038
  %_172.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_167.sroa.7.0.copyload201, ptr %_172.sroa.4.0..sroa_idx, align 4, !alias.scope !8038
  %_172.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_167.sroa.7202.0.copyload203, ptr %_172.sroa.5.0..sroa_idx, align 8, !alias.scope !8038
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_167.sroa.9)
  br label %bb249

bb123:                                            ; preds = %bb117
  %57 = getelementptr inbounds %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>::Ok", ptr %_179, i64 0, i32 1
  %v.0.i = load ptr, ptr %57, align 8, !alias.scope !8035, !noalias !8032, !nonnull !4, !noundef !4
  %58 = getelementptr inbounds %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>::Ok", ptr %_179, i64 0, i32 1, i32 1
  %v.1.i = load ptr, ptr %58, align 8, !alias.scope !8035, !noalias !8032, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_179)
  %59 = getelementptr inbounds { ptr, i64 }, ptr %v.0.i, i64 0, i32 1
  %_353.1 = load i64, ptr %59, align 8, !noundef !4
  %record_info_empty.i = icmp eq i64 %_353.1, 0
  br i1 %record_info_empty.i, label %bb132, label %bb130

bb125:                                            ; preds = %bb117
  %_178.sroa.7.0._179.sroa_idx = getelementptr inbounds i8, ptr %_179, i64 4
  %_178.sroa.7.0.copyload205 = load i32, ptr %_178.sroa.7.0._179.sroa_idx, align 4, !alias.scope !8042
  %_178.sroa.7206.0._179.sroa_idx = getelementptr inbounds i8, ptr %_179, i64 8
  %_178.sroa.7206.0.copyload207 = load ptr, ptr %_178.sroa.7206.0._179.sroa_idx, align 8, !alias.scope !8042
  %_178.sroa.9.0._179.sroa_idx = getelementptr inbounds i8, ptr %_179, i64 16
  %_178.sroa.9.0.copyload208 = load ptr, ptr %_178.sroa.9.0._179.sroa_idx, align 8, !alias.scope !8042
  %_178.sroa.11.0._179.sroa_idx = getelementptr inbounds i8, ptr %_179, i64 24
  %_178.sroa.11.0.copyload209 = load i64, ptr %_178.sroa.11.0._179.sroa_idx, align 8, !alias.scope !8042
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_179)
  store i32 %55, ptr %0, align 8, !alias.scope !8043
  %_183.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_178.sroa.7.0.copyload205, ptr %_183.sroa.4.0..sroa_idx, align 4, !alias.scope !8043
  %_183.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_178.sroa.7206.0.copyload207, ptr %_183.sroa.5.0..sroa_idx, align 8, !alias.scope !8043
  %_183.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  store ptr %_178.sroa.9.0.copyload208, ptr %_183.sroa.6.0..sroa_idx, align 8, !alias.scope !8043
  %_183.sroa.7.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 24
  store i64 %_178.sroa.11.0.copyload209, ptr %_183.sroa.7.0..sroa_idx, align 8, !alias.scope !8043
  br label %bb249

bb130:                                            ; preds = %bb123
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_193.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_194)
; call token_metadata::assertions::misc::assert_owned_by
  call void @_ZN14token_metadata10assertions4misc15assert_owned_by17h280f82a67421a794E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_194, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i98, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %program_id) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8047)
  %60 = load i32, ptr %_194, align 8, !range !146, !alias.scope !8050, !noalias !8047, !noundef !4
  %61 = icmp eq i32 %60, 22
  br i1 %61, label %bb136, label %bb138

bb132:                                            ; preds = %bb123
  store i32 0, ptr %0, align 8, !alias.scope !8052
  %_191.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 84, ptr %_191.sroa.4.0..sroa_idx, align 4, !alias.scope !8052
  br label %bb244

bb244:                                            ; preds = %bb144, %bb242, %bb138, %bb132
  %borrow.i.i.i = load i64, ptr %v.1.i, align 8, !noalias !8056, !noundef !4
  %val.i.i.i = add i64 %borrow.i.i.i, 1
  store i64 %val.i.i.i, ptr %v.1.i, align 8, !noalias !8056
  br label %bb249

bb136:                                            ; preds = %bb130
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_194)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_193.sroa.7)
  call void @llvm.lifetime.start.p0(i64 27, ptr nonnull %_202.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_203)
; call token_metadata::assertions::uses::assert_use_authority_derivation
  call void @_ZN14token_metadata10assertions4uses31assert_use_authority_derivation17h9f9a4e6bb881fba5E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<u8, solana_program::program_error::ProgramError>") dereferenceable(32) %_203, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %program_id, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i98, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i61, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i57) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8059)
  %62 = load i32, ptr %_203, align 8, !range !146, !alias.scope !8062, !noalias !8059, !noundef !4
  %63 = icmp eq i32 %62, 22
  br i1 %63, label %bb142, label %bb144

bb138:                                            ; preds = %bb130
  %_193.sroa.7.0._194.sroa_idx = getelementptr inbounds i8, ptr %_194, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_193.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_193.sroa.7.0._194.sroa_idx, i64 28, i1 false), !alias.scope !8064
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_194)
  %_199.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_199.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_193.sroa.7, i64 28, i1 false)
  store i32 %60, ptr %0, align 8, !alias.scope !8065
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_193.sroa.7)
  br label %bb244

bb142:                                            ; preds = %bb136
  %64 = getelementptr inbounds %"core::result::Result<u8, solana_program::program_error::ProgramError>::Ok", ptr %_203, i64 0, i32 1
  %v.i110 = load i8, ptr %64, align 4, !alias.scope !8062, !noalias !8059, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_203)
  call void @llvm.lifetime.end.p0(i64 27, ptr nonnull %_202.sroa.9)
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %record)
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_213.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_214)
  %_354.0 = load ptr, ptr %v.0.i, align 8, !nonnull !4, !align !37, !noundef !4
  %_354.1 = load i64, ptr %59, align 8, !noundef !4
; call token_metadata::state::uses::UseAuthorityRecord::from_bytes
  call void @_ZN14token_metadata5state4uses18UseAuthorityRecord10from_bytes17h225c712c2b66acceE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<state::uses::UseAuthorityRecord, solana_program::program_error::ProgramError>") dereferenceable(32) %_214, ptr noalias noundef nonnull readonly align 1 %_354.0, i64 noundef %_354.1) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8069)
  %65 = load i32, ptr %_214, align 8, !range !146, !alias.scope !8072, !noalias !8069, !noundef !4
  %66 = icmp eq i32 %65, 22
  br i1 %66, label %bb148, label %bb150

bb144:                                            ; preds = %bb136
  %_202.sroa.7.0._203.sroa_idx = getelementptr inbounds i8, ptr %_203, i64 4
  %_202.sroa.7.0.copyload214 = load i8, ptr %_202.sroa.7.0._203.sroa_idx, align 4, !alias.scope !8074
  %_202.sroa.9.0._203.sroa_idx = getelementptr inbounds i8, ptr %_203, i64 5
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 1 dereferenceable(27) %_202.sroa.9, ptr noundef nonnull align 1 dereferenceable(27) %_202.sroa.9.0._203.sroa_idx, i64 27, i1 false), !alias.scope !8074
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_203)
  %_210.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 5
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 1 dereferenceable(27) %_210.sroa.5.0..sroa_idx, ptr noundef nonnull align 1 dereferenceable(27) %_202.sroa.9, i64 27, i1 false)
  store i32 %62, ptr %0, align 8, !alias.scope !8075
  %_210.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i8 %_202.sroa.7.0.copyload214, ptr %_210.sroa.4.0..sroa_idx, align 4, !alias.scope !8075
  call void @llvm.lifetime.end.p0(i64 27, ptr nonnull %_202.sroa.9)
  br label %bb244

bb148:                                            ; preds = %bb142
  %67 = getelementptr inbounds %"core::result::Result<state::uses::UseAuthorityRecord, solana_program::program_error::ProgramError>::Ok", ptr %_214, i64 0, i32 1
  %_213.sroa.7.8.sroa_idx216 = getelementptr inbounds i8, ptr %_213.sroa.7, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(24) %_213.sroa.7.8.sroa_idx216, ptr noundef nonnull align 8 dereferenceable(24) %67, i64 24, i1 false), !alias.scope !8079
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_214)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %record, ptr noundef nonnull align 4 dereferenceable(24) %_213.sroa.7.8.sroa_idx216, i64 24, i1 false)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_213.sroa.7)
  %68 = getelementptr inbounds %"state::uses::UseAuthorityRecord", ptr %record, i64 0, i32 3
  %_2.i = load i8, ptr %68, align 8, !alias.scope !8080, !noundef !4
  %69 = icmp eq i8 %_2.i, 0
  %70 = load i32, ptr %record, align 8, !alias.scope !8080
  %71 = icmp eq i32 %70, 8
  %.0.off0.i = select i1 %69, i1 %71, i1 false
  br i1 %.0.off0.i, label %bb154.thread, label %bb154

bb150:                                            ; preds = %bb142
  %_213.sroa.7.0._214.sroa_idx = getelementptr inbounds i8, ptr %_214, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_213.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_213.sroa.7.0._214.sroa_idx, i64 28, i1 false), !alias.scope !8079
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_214)
  %_218.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_218.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_213.sroa.7, i64 28, i1 false)
  store i32 %65, ptr %0, align 8, !alias.scope !8083
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_213.sroa.7)
  br label %bb242

bb242:                                            ; preds = %bb173, %bb166, %bb159, %bb150
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %record)
  br label %bb244

bb154:                                            ; preds = %bb148
  %_3.not.i = icmp eq i8 %_2.i, %v.i110
  br i1 %_3.not.i, label %bb157, label %bb159

bb154.thread:                                     ; preds = %bb148
  store i8 %v.i110, ptr %68, align 8
  br label %bb157

bb157:                                            ; preds = %bb154.thread, %bb154
  %72 = getelementptr inbounds %"state::uses::UseAuthorityRecord", ptr %record, i64 0, i32 2
  %_236 = load i64, ptr %72, align 8, !noundef !4
  %.not310 = icmp ult i64 %_236, %number_of_uses
  br i1 %.not310, label %bb166, label %bb164

bb159:                                            ; preds = %bb154
  store i32 0, ptr %0, align 8, !alias.scope !8087
  %_230.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 89, ptr %_230.sroa.4.0..sroa_idx, align 4, !alias.scope !8087
  br label %bb242

bb164:                                            ; preds = %bb157
  %73 = sub i64 %_236, %number_of_uses
  store i64 %73, ptr %72, align 8
  %_355.0 = load ptr, ptr %v.0.i, align 8, !nonnull !4, !align !37, !noundef !4
  %_355.1 = load i64, ptr %59, align 8, !noundef !4
; call borsh::ser::helpers::to_writer
  %_244 = call noundef ptr @_ZN5borsh3ser7helpers9to_writer17hfa629f22abad9120E(ptr noalias noundef nonnull align 1 %_355.0, i64 noundef %_355.1, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) %record) #32
  %74 = icmp eq ptr %_244, null
  br i1 %74, label %bb171, label %bb173

bb166:                                            ; preds = %bb157
  store i32 0, ptr %0, align 8, !alias.scope !8091
  %_3.sroa.4.0..sroa_idx.i134 = getelementptr inbounds i8, ptr %0, i64 4
  store i32 86, ptr %_3.sroa.4.0..sroa_idx.i134, align 4, !alias.scope !8091
  br label %bb242

bb171:                                            ; preds = %bb164
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %record)
  %borrow.i.i.i136 = load i64, ptr %v.1.i, align 8, !noalias !8094, !noundef !4
  %val.i.i.i137 = add i64 %borrow.i.i.i136, 1
  store i64 %val.i.i.i137, ptr %v.1.i, align 8, !noalias !8094
  br label %bb180

bb173:                                            ; preds = %bb164
; call <solana_program::program_error::ProgramError as core::convert::From<std::io::error::Error>>::from
  call void @"_ZN112_$LT$solana_program..program_error..ProgramError$u20$as$u20$core..convert..From$LT$std..io..error..Error$GT$$GT$4from17h745c2ba68ce6a10fE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::program_error::ProgramError") dereferenceable(32) %0, ptr noundef nonnull %_244) #32
  br label %bb242

bb180:                                            ; preds = %bb114, %bb171
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_269)
; call solana_program::account_info::AccountInfo::try_borrow_mut_data
  call void @_ZN14solana_program12account_info11AccountInfo19try_borrow_mut_data17hcf238957d2f67b88E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>") dereferenceable(32) %_269, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8097)
  %75 = load i32, ptr %_269, align 8, !range !146, !alias.scope !8100, !noalias !8097, !noundef !4
  %76 = icmp eq i32 %75, 22
  br i1 %76, label %bb183, label %bb185

bb177:                                            ; preds = %bb114
  store i32 0, ptr %0, align 8
  %_258.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 98, ptr %_258.sroa.4.0..sroa_idx, align 4
  br label %bb249

bb183:                                            ; preds = %bb180
  %77 = getelementptr inbounds %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>::Ok", ptr %_269, i64 0, i32 1
  %v.0.i138 = load ptr, ptr %77, align 8, !alias.scope !8100, !noalias !8097, !nonnull !4, !noundef !4
  %78 = getelementptr inbounds %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>::Ok", ptr %_269, i64 0, i32 1, i32 1
  %v.1.i139 = load ptr, ptr %78, align 8, !alias.scope !8100, !noalias !8097, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_269)
  %_356.0 = load ptr, ptr %v.0.i138, align 8, !nonnull !4, !align !37, !noundef !4
  %79 = getelementptr inbounds { ptr, i64 }, ptr %v.0.i138, i64 0, i32 1
  %_356.1 = load i64, ptr %79, align 8, !noundef !4
; call token_metadata::state::metadata::Metadata::save
  %_261 = call noundef ptr @_ZN14token_metadata5state8metadata8Metadata4save17h9a6561ae9bd1b989E(ptr noalias noundef nonnull readonly align 8 dereferenceable(304) %metadata11, ptr noalias noundef nonnull align 1 %_356.0, i64 noundef %_356.1) #32
  %80 = icmp eq ptr %_261, null
  br i1 %80, label %bb190, label %bb192

bb185:                                            ; preds = %bb180
  %_268.sroa.7.0._269.sroa_idx = getelementptr inbounds i8, ptr %_269, i64 4
  %_268.sroa.7.0.copyload222 = load i32, ptr %_268.sroa.7.0._269.sroa_idx, align 4, !alias.scope !8102
  %_268.sroa.7223.0._269.sroa_idx = getelementptr inbounds i8, ptr %_269, i64 8
  %_268.sroa.7223.0.copyload224 = load ptr, ptr %_268.sroa.7223.0._269.sroa_idx, align 8, !alias.scope !8102
  %_268.sroa.9.0._269.sroa_idx = getelementptr inbounds i8, ptr %_269, i64 16
  %_268.sroa.9.0.copyload225 = load ptr, ptr %_268.sroa.9.0._269.sroa_idx, align 8, !alias.scope !8102
  %_268.sroa.11.0._269.sroa_idx = getelementptr inbounds i8, ptr %_269, i64 24
  %_268.sroa.11.0.copyload226 = load i64, ptr %_268.sroa.11.0._269.sroa_idx, align 8, !alias.scope !8102
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_269)
  store i32 %75, ptr %0, align 8, !alias.scope !8103
  %_273.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_268.sroa.7.0.copyload222, ptr %_273.sroa.4.0..sroa_idx, align 4, !alias.scope !8103
  %_273.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_268.sroa.7223.0.copyload224, ptr %_273.sroa.5.0..sroa_idx, align 8, !alias.scope !8103
  %_273.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  store ptr %_268.sroa.9.0.copyload225, ptr %_273.sroa.6.0..sroa_idx, align 8, !alias.scope !8103
  %_273.sroa.7.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 24
  store i64 %_268.sroa.11.0.copyload226, ptr %_273.sroa.7.0..sroa_idx, align 8, !alias.scope !8103
  br label %bb249

bb190:                                            ; preds = %bb183
  %borrow.i.i.i145 = load i64, ptr %v.1.i139, align 8, !noalias !8107, !noundef !4
  %val.i.i.i146 = add i64 %borrow.i.i.i145, 1
  store i64 %val.i.i.i146, ptr %v.1.i139, align 8, !noalias !8107
  %81 = icmp eq i64 %_146, %number_of_uses
  %must_burn. = and i1 %46, %81
  br i1 %must_burn., label %bb197, label %bb236

bb192:                                            ; preds = %bb183
; call <solana_program::program_error::ProgramError as core::convert::From<std::io::error::Error>>::from
  call void @"_ZN112_$LT$solana_program..program_error..ProgramError$u20$as$u20$core..convert..From$LT$std..io..error..Error$GT$$GT$4from17h745c2ba68ce6a10fE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::program_error::ProgramError") dereferenceable(32) %0, ptr noundef nonnull %_261) #32
  %borrow.i.i.i148 = load i64, ptr %v.1.i139, align 8, !noalias !8110, !noundef !4
  %val.i.i.i149 = add i64 %borrow.i.i.i148, 1
  store i64 %val.i.i.i149, ptr %v.1.i139, align 8, !noalias !8110
  br label %bb249

bb236:                                            ; preds = %bb220, %bb231, %bb190
  store i32 22, ptr %0, align 8
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %metadata_uses)
  %82 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 4
; call core::ptr::drop_in_place<token_metadata::state::data::Data>
  call fastcc void @"_ZN4core3ptr54drop_in_place$LT$token_metadata..state..data..Data$GT$17h361e34b2f1c25fb1E"(ptr noundef nonnull %82) #32
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %metadata11)
  %83 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata, i64 0, i32 4
; call core::ptr::drop_in_place<token_metadata::state::data::Data>
  call fastcc void @"_ZN4core3ptr54drop_in_place$LT$token_metadata..state..data..Data$GT$17h361e34b2f1c25fb1E"(ptr noundef nonnull %83) #32
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %metadata)
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_5)
  br label %bb261

bb197:                                            ; preds = %bb190
  br i1 %approved_authority_is_using.0.in, label %bb198, label %bb224

bb224:                                            ; preds = %bb197
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_334.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_335)
  call void @llvm.lifetime.start.p0(i64 216, ptr nonnull %_336)
  %84 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_336, i64 0, i32 1
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17he2725f70e343ca4bE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %84, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i57) #32
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_339)
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17he2725f70e343ca4bE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %_339, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i65) #32
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_341)
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17he2725f70e343ca4bE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %_341, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i69) #32
  %85 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_336, i64 0, i32 2
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17he2725f70e343ca4bE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %85, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i53) #32
  %86 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_336, i64 0, i32 5
  store i64 1, ptr %86, align 8
  %87 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_336, i64 0, i32 3
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %87, ptr noundef nonnull align 8 dereferenceable(48) %_339, i64 48, i1 false)
  store ptr null, ptr %_336, align 8
  %88 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_336, i64 0, i32 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %88, ptr noundef nonnull align 8 dereferenceable(48) %_341, i64 48, i1 false)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_341)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_339)
; call mpl_utils::token::cpi::spl_token_burn
  call void @_ZN9mpl_utils5token3cpi14spl_token_burn17h4104af3a4b0840c1E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_335, ptr noalias nocapture noundef nonnull readonly dereferenceable(216) %_336) #32
  call void @llvm.lifetime.end.p0(i64 216, ptr nonnull %_336)
  call void @llvm.experimental.noalias.scope.decl(metadata !8113)
  %89 = load i32, ptr %_335, align 8, !range !146, !alias.scope !8116, !noalias !8113, !noundef !4
  %90 = icmp eq i32 %89, 22
  br i1 %90, label %bb231, label %bb233

bb198:                                            ; preds = %bb197
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_284.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_285)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h843076ed74682877E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_285, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8118)
  %91 = load i32, ptr %_285, align 8, !range !146, !alias.scope !8121, !noalias !8118, !noundef !4
  %92 = icmp eq i32 %91, 22
  br i1 %92, label %bb201, label %bb203

bb201:                                            ; preds = %bb198
  %93 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_285, i64 0, i32 1
  %v.i153 = load ptr, ptr %93, align 8, !alias.scope !8121, !noalias !8118, !nonnull !4, !align !31, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_285)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_284.sroa.9)
  %_357 = load ptr, ptr %v.i153, align 8, !nonnull !4, !align !37, !noundef !4
; call token_metadata::assertions::uses::assert_burner
  %94 = call { i8, i8 } @_ZN14token_metadata10assertions4uses13assert_burner17hf2b7dbd81c686392E(ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %_357) #32
  %95 = extractvalue { i8, i8 } %94, 0
  %96 = and i8 %95, 1
  %_293.1 = extractvalue { i8, i8 } %94, 1
  %trunc48.not = icmp eq i8 %96, 0
  br i1 %trunc48.not, label %bb207, label %bb209

bb203:                                            ; preds = %bb198
  %_284.sroa.7.0._285.sroa_idx = getelementptr inbounds i8, ptr %_285, i64 4
  %_284.sroa.7.0.copyload228 = load i32, ptr %_284.sroa.7.0._285.sroa_idx, align 4, !alias.scope !8123
  %_284.sroa.7229.0._285.sroa_idx = getelementptr inbounds i8, ptr %_285, i64 8
  %_284.sroa.7229.0.copyload230 = load ptr, ptr %_284.sroa.7229.0._285.sroa_idx, align 8, !alias.scope !8123
  %_284.sroa.9.0._285.sroa_idx = getelementptr inbounds i8, ptr %_285, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_284.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_284.sroa.9.0._285.sroa_idx, i64 16, i1 false), !alias.scope !8123
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_285)
  %_289.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_289.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_284.sroa.9, i64 16, i1 false)
  store i32 %91, ptr %0, align 8, !alias.scope !8124
  %_289.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_284.sroa.7.0.copyload228, ptr %_289.sroa.4.0..sroa_idx, align 4, !alias.scope !8124
  %_289.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_284.sroa.7229.0.copyload230, ptr %_289.sroa.5.0..sroa_idx, align 8, !alias.scope !8124
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_284.sroa.9)
  br label %bb249

bb207:                                            ; preds = %bb201
  call void @llvm.lifetime.start.p0(i64 64, ptr nonnull %_300)
; call <solana_program::pubkey::Pubkey as core::convert::AsRef<[u8]>>::as_ref
  %97 = call { ptr, i64 } @"_ZN91_$LT$solana_program..pubkey..Pubkey$u20$as$u20$core..convert..AsRef$LT$$u5b$u8$u5d$$GT$$GT$6as_ref17h56c78400b7ec32e8E"(ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %program_id) #32
  %_305.0 = extractvalue { ptr, i64 } %97, 0
  %_305.1 = extractvalue { ptr, i64 } %97, 1
  call void @llvm.lifetime.start.p0(i64 1, ptr nonnull %_314)
  store i8 %_293.1, ptr %_314, align 1
  store ptr @alloc22189, ptr %_300, align 8
  %98 = getelementptr inbounds { ptr, i64 }, ptr %_300, i64 0, i32 1
  store i64 8, ptr %98, align 8
  %99 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_300, i64 0, i64 1
  store ptr %_305.0, ptr %99, align 8
  %100 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_300, i64 0, i64 1, i32 1
  store i64 %_305.1, ptr %100, align 8
  %101 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_300, i64 0, i64 2
  store ptr @alloc21398, ptr %101, align 8
  %102 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_300, i64 0, i64 2, i32 1
  store i64 4, ptr %102, align 8
  %103 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_300, i64 0, i64 3
  store ptr %_314, ptr %103, align 8
  %104 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_300, i64 0, i64 3, i32 1
  store i64 1, ptr %104, align 8
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_316.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_317)
  call void @llvm.lifetime.start.p0(i64 216, ptr nonnull %_318)
  %105 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_318, i64 0, i32 1
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17he2725f70e343ca4bE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %105, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i57) #32
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_321)
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17he2725f70e343ca4bE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %_321, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i153) #32
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_323)
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17he2725f70e343ca4bE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %_323, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i69) #32
  %106 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_318, i64 0, i32 2
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17he2725f70e343ca4bE"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %106, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i53) #32
  %107 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_318, i64 0, i32 5
  store i64 1, ptr %107, align 8
  %108 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_318, i64 0, i32 3
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %108, ptr noundef nonnull align 8 dereferenceable(48) %_321, i64 48, i1 false)
  store ptr %_300, ptr %_318, align 8
  %109 = getelementptr inbounds { ptr, i64 }, ptr %_318, i64 0, i32 1
  store i64 4, ptr %109, align 8
  %110 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_318, i64 0, i32 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %110, ptr noundef nonnull align 8 dereferenceable(48) %_323, i64 48, i1 false)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_323)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_321)
; call mpl_utils::token::cpi::spl_token_burn
  call void @_ZN9mpl_utils5token3cpi14spl_token_burn17h4104af3a4b0840c1E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_317, ptr noalias nocapture noundef nonnull readonly dereferenceable(216) %_318) #32
  call void @llvm.lifetime.end.p0(i64 216, ptr nonnull %_318)
  call void @llvm.experimental.noalias.scope.decl(metadata !8128)
  %111 = load i32, ptr %_317, align 8, !range !146, !alias.scope !8131, !noalias !8128, !noundef !4
  %112 = icmp eq i32 %111, 22
  br i1 %112, label %bb220, label %bb222

bb209:                                            ; preds = %bb201
  %_5.i.i = icmp ult i8 %_293.1, -52
  call void @llvm.assume(i1 %_5.i.i)
  %_2.i.i160 = zext i8 %_293.1 to i32
  store i32 0, ptr %0, align 8, !alias.scope !8133
  %_3.sroa.4.0..sroa_idx.i161 = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_2.i.i160, ptr %_3.sroa.4.0..sroa_idx.i161, align 4, !alias.scope !8133
  br label %bb249

bb220:                                            ; preds = %bb207
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_317)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_316.sroa.7)
  call void @llvm.lifetime.end.p0(i64 1, ptr nonnull %_314)
  call void @llvm.lifetime.end.p0(i64 64, ptr nonnull %_300)
  br label %bb236

bb222:                                            ; preds = %bb207
  %_316.sroa.7.0._317.sroa_idx = getelementptr inbounds i8, ptr %_317, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_316.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_316.sroa.7.0._317.sroa_idx, i64 28, i1 false), !alias.scope !8136
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_317)
  %_332.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_332.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_316.sroa.7, i64 28, i1 false)
  store i32 %111, ptr %0, align 8, !alias.scope !8137
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_316.sroa.7)
  call void @llvm.lifetime.end.p0(i64 1, ptr nonnull %_314)
  call void @llvm.lifetime.end.p0(i64 64, ptr nonnull %_300)
  br label %bb249

bb231:                                            ; preds = %bb224
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_335)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_334.sroa.7)
  br label %bb236

bb233:                                            ; preds = %bb224
  %_334.sroa.7.0._335.sroa_idx = getelementptr inbounds i8, ptr %_335, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_334.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_334.sroa.7.0._335.sroa_idx, i64 28, i1 false), !alias.scope !8141
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_335)
  %_348.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_348.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_334.sroa.7, i64 28, i1 false)
  store i32 %89, ptr %0, align 8, !alias.scope !8142
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_334.sroa.7)
  br label %bb249

bb261:                                            ; preds = %bb236, %bb260
  ret void
}
