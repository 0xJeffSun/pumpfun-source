define void @_ZN14token_metadata9processor4uses7utilize15process_utilize17h830693c24fbf892bE(ptr noalias nocapture noundef sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %0, ptr noalias noundef readonly align 1 dereferenceable(32) %program_id, ptr noalias noundef nonnull readonly align 8 %accounts.0, i64 noundef %accounts.1, i64 noundef %number_of_uses) unnamed_addr #2 {
start:
  %_335 = alloca %"solana_program::account_info::AccountInfo<'_>", align 8
  %_333 = alloca %"solana_program::account_info::AccountInfo<'_>", align 8
  %_330 = alloca %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", align 8
  %_329 = alloca %"core::result::Result<(), solana_program::program_error::ProgramError>", align 8
  %_328.sroa.7 = alloca [7 x i32], align 4
  %_317 = alloca %"solana_program::account_info::AccountInfo<'_>", align 8
  %_315 = alloca %"solana_program::account_info::AccountInfo<'_>", align 8
  %_312 = alloca %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", align 8
  %_311 = alloca %"core::result::Result<(), solana_program::program_error::ProgramError>", align 8
  %_310.sroa.7 = alloca [7 x i32], align 4
  %_308 = alloca [1 x i8], align 1
  %_294 = alloca [4 x { ptr, i64 }], align 8
  %_279 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_278.sroa.9 = alloca [4 x i32], align 8
  %_263 = alloca %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>", align 8
  %_208 = alloca %"core::result::Result<state::uses::UseAuthorityRecord, solana_program::program_error::ProgramError>", align 8
  %_207.sroa.7 = alloca [7 x i32], align 4
  %record = alloca %"state::uses::UseAuthorityRecord", align 8
  %_197 = alloca %"core::result::Result<u8, solana_program::program_error::ProgramError>", align 8
  %_196.sroa.9 = alloca [27 x i8], align 1
  %_188 = alloca %"core::result::Result<(), solana_program::program_error::ProgramError>", align 8
  %_187.sroa.7 = alloca [7 x i32], align 4
  %_173 = alloca %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>", align 8
  %_162 = alloca %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>", align 8
  %_161.sroa.9 = alloca [4 x i32], align 8
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
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_10, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7907)
  %4 = load i32, ptr %_10, align 8, !range !146, !alias.scope !7910, !noalias !7907, !noundef !4
  %5 = icmp eq i32 %4, 22
  br i1 %5, label %bb5, label %bb7

bb5:                                              ; preds = %start
  %6 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_10, i64 0, i32 1
  %v.i = load ptr, ptr %6, align 8, !alias.scope !7910, !noalias !7907, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_10)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_9.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_17.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_18)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_18, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7912)
  %7 = load i32, ptr %_18, align 8, !range !146, !alias.scope !7915, !noalias !7912, !noundef !4
  %8 = icmp eq i32 %7, 22
  br i1 %8, label %bb11, label %bb13

bb7:                                              ; preds = %start
  %_9.sroa.7.0._10.sroa_idx = getelementptr inbounds i8, ptr %_10, i64 4
  %_9.sroa.7.0.copyload144 = load i32, ptr %_9.sroa.7.0._10.sroa_idx, align 4, !alias.scope !7917
  %_9.sroa.7145.0._10.sroa_idx = getelementptr inbounds i8, ptr %_10, i64 8
  %_9.sroa.7145.0.copyload146 = load ptr, ptr %_9.sroa.7145.0._10.sroa_idx, align 8, !alias.scope !7917
  %_9.sroa.9.0._10.sroa_idx = getelementptr inbounds i8, ptr %_10, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_9.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_9.sroa.9.0._10.sroa_idx, i64 16, i1 false), !alias.scope !7917
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_10)
  %_14.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_14.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_9.sroa.9, i64 16, i1 false)
  store i32 %4, ptr %0, align 8, !alias.scope !7918
  %_14.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_9.sroa.7.0.copyload144, ptr %_14.sroa.4.0..sroa_idx, align 4, !alias.scope !7918
  %_14.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_9.sroa.7145.0.copyload146, ptr %_14.sroa.5.0..sroa_idx, align 8, !alias.scope !7918
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_9.sroa.9)
  br label %bb254

bb254:                                            ; preds = %bb49, %bb246, %bb43, %bb37, %bb31, %bb25, %bb19, %bb13, %bb7
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_5)
  br label %bb255

bb11:                                             ; preds = %bb5
  %9 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_18, i64 0, i32 1
  %v.i49 = load ptr, ptr %9, align 8, !alias.scope !7915, !noalias !7912, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_18)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_17.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_25.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_26)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_26, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7922)
  %10 = load i32, ptr %_26, align 8, !range !146, !alias.scope !7925, !noalias !7922, !noundef !4
  %11 = icmp eq i32 %10, 22
  br i1 %11, label %bb17, label %bb19

bb13:                                             ; preds = %bb5
  %_17.sroa.7.0._18.sroa_idx = getelementptr inbounds i8, ptr %_18, i64 4
  %_17.sroa.7.0.copyload148 = load i32, ptr %_17.sroa.7.0._18.sroa_idx, align 4, !alias.scope !7927
  %_17.sroa.7149.0._18.sroa_idx = getelementptr inbounds i8, ptr %_18, i64 8
  %_17.sroa.7149.0.copyload150 = load ptr, ptr %_17.sroa.7149.0._18.sroa_idx, align 8, !alias.scope !7927
  %_17.sroa.9.0._18.sroa_idx = getelementptr inbounds i8, ptr %_18, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_17.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_17.sroa.9.0._18.sroa_idx, i64 16, i1 false), !alias.scope !7927
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_18)
  %_22.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_22.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_17.sroa.9, i64 16, i1 false)
  store i32 %7, ptr %0, align 8, !alias.scope !7928
  %_22.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_17.sroa.7.0.copyload148, ptr %_22.sroa.4.0..sroa_idx, align 4, !alias.scope !7928
  %_22.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_17.sroa.7149.0.copyload150, ptr %_22.sroa.5.0..sroa_idx, align 8, !alias.scope !7928
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_17.sroa.9)
  br label %bb254

bb17:                                             ; preds = %bb11
  %12 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_26, i64 0, i32 1
  %v.i53 = load ptr, ptr %12, align 8, !alias.scope !7925, !noalias !7922, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_26)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_25.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_33.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_34)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_34, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7932)
  %13 = load i32, ptr %_34, align 8, !range !146, !alias.scope !7935, !noalias !7932, !noundef !4
  %14 = icmp eq i32 %13, 22
  br i1 %14, label %bb23, label %bb25

bb19:                                             ; preds = %bb11
  %_25.sroa.7.0._26.sroa_idx = getelementptr inbounds i8, ptr %_26, i64 4
  %_25.sroa.7.0.copyload152 = load i32, ptr %_25.sroa.7.0._26.sroa_idx, align 4, !alias.scope !7937
  %_25.sroa.7153.0._26.sroa_idx = getelementptr inbounds i8, ptr %_26, i64 8
  %_25.sroa.7153.0.copyload154 = load ptr, ptr %_25.sroa.7153.0._26.sroa_idx, align 8, !alias.scope !7937
  %_25.sroa.9.0._26.sroa_idx = getelementptr inbounds i8, ptr %_26, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_25.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_25.sroa.9.0._26.sroa_idx, i64 16, i1 false), !alias.scope !7937
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_26)
  %_30.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_30.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_25.sroa.9, i64 16, i1 false)
  store i32 %10, ptr %0, align 8, !alias.scope !7938
  %_30.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_25.sroa.7.0.copyload152, ptr %_30.sroa.4.0..sroa_idx, align 4, !alias.scope !7938
  %_30.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_25.sroa.7153.0.copyload154, ptr %_30.sroa.5.0..sroa_idx, align 8, !alias.scope !7938
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_25.sroa.9)
  br label %bb254

bb23:                                             ; preds = %bb17
  %15 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_34, i64 0, i32 1
  %v.i57 = load ptr, ptr %15, align 8, !alias.scope !7935, !noalias !7932, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_34)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_33.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_41.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_42)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_42, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7942)
  %16 = load i32, ptr %_42, align 8, !range !146, !alias.scope !7945, !noalias !7942, !noundef !4
  %17 = icmp eq i32 %16, 22
  br i1 %17, label %bb29, label %bb31

bb25:                                             ; preds = %bb17
  %_33.sroa.7.0._34.sroa_idx = getelementptr inbounds i8, ptr %_34, i64 4
  %_33.sroa.7.0.copyload156 = load i32, ptr %_33.sroa.7.0._34.sroa_idx, align 4, !alias.scope !7947
  %_33.sroa.7157.0._34.sroa_idx = getelementptr inbounds i8, ptr %_34, i64 8
  %_33.sroa.7157.0.copyload158 = load ptr, ptr %_33.sroa.7157.0._34.sroa_idx, align 8, !alias.scope !7947
  %_33.sroa.9.0._34.sroa_idx = getelementptr inbounds i8, ptr %_34, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_33.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_33.sroa.9.0._34.sroa_idx, i64 16, i1 false), !alias.scope !7947
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_34)
  %_38.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_38.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_33.sroa.9, i64 16, i1 false)
  store i32 %13, ptr %0, align 8, !alias.scope !7948
  %_38.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_33.sroa.7.0.copyload156, ptr %_38.sroa.4.0..sroa_idx, align 4, !alias.scope !7948
  %_38.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_33.sroa.7157.0.copyload158, ptr %_38.sroa.5.0..sroa_idx, align 8, !alias.scope !7948
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_33.sroa.9)
  br label %bb254

bb29:                                             ; preds = %bb23
  %18 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_42, i64 0, i32 1
  %v.i61 = load ptr, ptr %18, align 8, !alias.scope !7945, !noalias !7942, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_42)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_41.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_49.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_50)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_50, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7952)
  %19 = load i32, ptr %_50, align 8, !range !146, !alias.scope !7955, !noalias !7952, !noundef !4
  %20 = icmp eq i32 %19, 22
  br i1 %20, label %bb35, label %bb37

bb31:                                             ; preds = %bb23
  %_41.sroa.7.0._42.sroa_idx = getelementptr inbounds i8, ptr %_42, i64 4
  %_41.sroa.7.0.copyload160 = load i32, ptr %_41.sroa.7.0._42.sroa_idx, align 4, !alias.scope !7957
  %_41.sroa.7161.0._42.sroa_idx = getelementptr inbounds i8, ptr %_42, i64 8
  %_41.sroa.7161.0.copyload162 = load ptr, ptr %_41.sroa.7161.0._42.sroa_idx, align 8, !alias.scope !7957
  %_41.sroa.9.0._42.sroa_idx = getelementptr inbounds i8, ptr %_42, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_41.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_41.sroa.9.0._42.sroa_idx, i64 16, i1 false), !alias.scope !7957
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_42)
  %_46.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_46.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_41.sroa.9, i64 16, i1 false)
  store i32 %16, ptr %0, align 8, !alias.scope !7958
  %_46.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_41.sroa.7.0.copyload160, ptr %_46.sroa.4.0..sroa_idx, align 4, !alias.scope !7958
  %_46.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_41.sroa.7161.0.copyload162, ptr %_46.sroa.5.0..sroa_idx, align 8, !alias.scope !7958
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_41.sroa.9)
  br label %bb254

bb35:                                             ; preds = %bb29
  %21 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_50, i64 0, i32 1
  %v.i65 = load ptr, ptr %21, align 8, !alias.scope !7955, !noalias !7952, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_50)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_49.sroa.9)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_57.sroa.8)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_58)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_58, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7962)
  %22 = load i32, ptr %_58, align 8, !range !146, !alias.scope !7965, !noalias !7962, !noundef !4
  %23 = icmp eq i32 %22, 22
  br i1 %23, label %bb41, label %bb43

bb37:                                             ; preds = %bb29
  %_49.sroa.7.0._50.sroa_idx = getelementptr inbounds i8, ptr %_50, i64 4
  %_49.sroa.7.0.copyload164 = load i32, ptr %_49.sroa.7.0._50.sroa_idx, align 4, !alias.scope !7967
  %_49.sroa.7165.0._50.sroa_idx = getelementptr inbounds i8, ptr %_50, i64 8
  %_49.sroa.7165.0.copyload166 = load ptr, ptr %_49.sroa.7165.0._50.sroa_idx, align 8, !alias.scope !7967
  %_49.sroa.9.0._50.sroa_idx = getelementptr inbounds i8, ptr %_50, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_49.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_49.sroa.9.0._50.sroa_idx, i64 16, i1 false), !alias.scope !7967
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_50)
  %_54.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_54.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_49.sroa.9, i64 16, i1 false)
  store i32 %19, ptr %0, align 8, !alias.scope !7968
  %_54.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_49.sroa.7.0.copyload164, ptr %_54.sroa.4.0..sroa_idx, align 4, !alias.scope !7968
  %_54.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_49.sroa.7165.0.copyload166, ptr %_54.sroa.5.0..sroa_idx, align 8, !alias.scope !7968
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_49.sroa.9)
  br label %bb254

bb41:                                             ; preds = %bb35
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_58)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_57.sroa.8)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_65.sroa.8)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_66)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_66, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7972)
  %24 = load i32, ptr %_66, align 8, !range !146, !alias.scope !7975, !noalias !7972, !noundef !4
  %25 = icmp eq i32 %24, 22
  br i1 %25, label %bb47, label %bb49

bb43:                                             ; preds = %bb35
  %_57.sroa.7.0._58.sroa_idx = getelementptr inbounds i8, ptr %_58, i64 4
  %_57.sroa.7.0.copyload168 = load i32, ptr %_57.sroa.7.0._58.sroa_idx, align 4, !alias.scope !7977
  %_57.sroa.7169.0._58.sroa_idx = getelementptr inbounds i8, ptr %_58, i64 8
  %_57.sroa.7169.0.copyload170 = load ptr, ptr %_57.sroa.7169.0._58.sroa_idx, align 8, !alias.scope !7977
  %_57.sroa.8.0._58.sroa_idx = getelementptr inbounds i8, ptr %_58, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_57.sroa.8, ptr noundef nonnull align 8 dereferenceable(16) %_57.sroa.8.0._58.sroa_idx, i64 16, i1 false), !alias.scope !7977
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_58)
  %_62.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_62.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_57.sroa.8, i64 16, i1 false)
  store i32 %22, ptr %0, align 8, !alias.scope !7978
  %_62.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_57.sroa.7.0.copyload168, ptr %_62.sroa.4.0..sroa_idx, align 4, !alias.scope !7978
  %_62.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_57.sroa.7169.0.copyload170, ptr %_62.sroa.5.0..sroa_idx, align 8, !alias.scope !7978
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_57.sroa.8)
  br label %bb254

bb47:                                             ; preds = %bb41
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_66)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_65.sroa.8)
; call core::iter::adapters::peekable::Peekable<I>::next_if
  %26 = call noundef align 8 dereferenceable_or_null(48) ptr @"_ZN4core4iter8adapters8peekable17Peekable$LT$I$GT$7next_if17h9e9b2c0a2586b1fbE"(ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  %.not.i.not = icmp eq ptr %26, null
  %27 = icmp eq i64 %accounts.1, 11
  %28 = icmp eq i64 %accounts.1, 10
  %approved_authority_is_using.0.in = select i1 %.not.i.not, i1 %28, i1 %27
  call void @llvm.lifetime.start.p0(i64 304, ptr nonnull %metadata)
  call void @llvm.lifetime.start.p0(i64 264, ptr nonnull %_83.sroa.0)
  call void @llvm.lifetime.start.p0(i64 304, ptr nonnull %_84)
; call token_metadata::state::TokenMetadataAccount::from_account_info
  call void @_ZN14token_metadata5state20TokenMetadataAccount17from_account_info17hae2930b4dabd9e2bE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>") dereferenceable(304) %_84, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7982)
  %29 = getelementptr inbounds %"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>", ptr %_84, i64 0, i32 1
  %30 = load i32, ptr %29, align 8, !range !252, !alias.scope !7985, !noalias !7982, !noundef !4
  %31 = icmp eq i32 %30, 2
  br i1 %31, label %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit.thread", label %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit"

"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit.thread": ; preds = %bb47
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %_83.sroa.0, ptr noundef nonnull align 8 dereferenceable(32) %_84, i64 32, i1 false), !alias.scope !7987
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %_84)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %0, ptr noundef nonnull align 8 dereferenceable(32) %_83.sroa.0, i64 32, i1 false)
  call void @llvm.lifetime.end.p0(i64 264, ptr nonnull %_83.sroa.0)
  br label %bb246

"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit": ; preds = %bb47
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
  %.not.i79 = icmp eq i32 %32, 3
  br i1 %.not.i79, label %bb63, label %bb65

bb49:                                             ; preds = %bb41
  %_65.sroa.7.0._66.sroa_idx = getelementptr inbounds i8, ptr %_66, i64 4
  %_65.sroa.7.0.copyload172 = load i32, ptr %_65.sroa.7.0._66.sroa_idx, align 4, !alias.scope !7991
  %_65.sroa.7173.0._66.sroa_idx = getelementptr inbounds i8, ptr %_66, i64 8
  %_65.sroa.7173.0.copyload174 = load ptr, ptr %_65.sroa.7173.0._66.sroa_idx, align 8, !alias.scope !7991
  %_65.sroa.8.0._66.sroa_idx = getelementptr inbounds i8, ptr %_66, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_65.sroa.8, ptr noundef nonnull align 8 dereferenceable(16) %_65.sroa.8.0._66.sroa_idx, i64 16, i1 false), !alias.scope !7991
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_66)
  %_70.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_70.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_65.sroa.8, i64 16, i1 false)
  store i32 %24, ptr %0, align 8, !alias.scope !7992
  %_70.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_65.sroa.7.0.copyload172, ptr %_70.sroa.4.0..sroa_idx, align 4, !alias.scope !7992
  %_70.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_65.sroa.7173.0.copyload174, ptr %_70.sroa.5.0..sroa_idx, align 8, !alias.scope !7992
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_65.sroa.8)
  br label %bb254

bb246:                                            ; preds = %bb245, %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit.thread"
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %metadata)
  br label %bb254

bb65:                                             ; preds = %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit"
  %33 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata, i64 0, i32 8
  %34 = load i32, ptr %33, align 4, !range !454, !noundef !4
  %.not = icmp eq i32 %34, 6
  br i1 %.not, label %bb70, label %bb67

bb63:                                             ; preds = %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit"
  store i32 0, ptr %0, align 8
  %_92.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 85, ptr %_92.sroa.4.0..sroa_idx, align 4
  br label %bb245

bb245:                                            ; preds = %bb244, %bb87, %bb81, %bb74, %bb70, %bb63
  %35 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata, i64 0, i32 4
; call core::ptr::drop_in_place<token_metadata::state::data::Data>
  call fastcc void @"_ZN4core3ptr54drop_in_place$LT$token_metadata..state..data..Data$GT$17h9b29234026607c01E"(ptr noundef nonnull %35) #32
  br label %bb246

bb67:                                             ; preds = %bb65
  %36 = tail call i32 @llvm.bpf.passthrough.i32.i32(i32 14, i32 %34)
  switch i32 %36, label %bb70 [
    i32 0, label %bb68
    i32 3, label %bb68
    i32 4, label %bb68
    i32 5, label %bb68
  ]

bb68:                                             ; preds = %bb67, %bb67, %bb67, %bb67
  %_346 = load ptr, ptr %v.i65, align 8, !nonnull !4, !align !41, !noundef !4
; call core::cmp::PartialEq::ne
  %_100 = tail call fastcc noundef zeroext i1 @_ZN4core3cmp9PartialEq2ne17h5e4538b957aa9ba3E(ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %_346, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) @alloc11830) #32
  br i1 %_100, label %bb74, label %bb76

bb70:                                             ; preds = %bb67, %bb65
  store i32 0, ptr %0, align 8
  %_98.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 135, ptr %_98.sroa.4.0..sroa_idx, align 4
  br label %bb245

bb76:                                             ; preds = %bb68
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_105.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_106)
; call mpl_utils::assertions::assert_signer
  call void @_ZN9mpl_utils10assertions13assert_signer17h98f8f8fa435f1016E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_106, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i57) #32
  tail call void @llvm.experimental.noalias.scope.decl(metadata !7996)
  %37 = load i32, ptr %_106, align 8, !range !146, !alias.scope !7999, !noalias !7996, !noundef !4
  %38 = icmp eq i32 %37, 22
  br i1 %38, label %bb79, label %bb81

bb74:                                             ; preds = %bb68
  store i32 0, ptr %0, align 8
  %_103.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 62, ptr %_103.sroa.4.0..sroa_idx, align 4
  br label %bb245

bb79:                                             ; preds = %bb76
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_106)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_105.sroa.7)
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_112.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_113)
; call token_metadata::assertions::metadata::assert_currently_holding
  call void @_ZN14token_metadata10assertions8metadata24assert_currently_holding17hef761a71a33e41aaE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_113, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %program_id, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i61, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(304) %metadata, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i53, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i49) #32
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
  br label %bb245

bb85:                                             ; preds = %bb79
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_113)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_112.sroa.7)
  call void @llvm.lifetime.start.p0(i64 304, ptr nonnull %metadata11)
  call void @llvm.lifetime.start.p0(i64 264, ptr nonnull %_126.sroa.0)
  call void @llvm.lifetime.start.p0(i64 304, ptr nonnull %_127)
; call token_metadata::state::TokenMetadataAccount::from_account_info
  call void @_ZN14token_metadata5state20TokenMetadataAccount17from_account_info17hae2930b4dabd9e2bE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>") dereferenceable(304) %_127, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8011)
  %41 = getelementptr inbounds %"core::result::Result<state::metadata::Metadata, solana_program::program_error::ProgramError>", ptr %_127, i64 0, i32 1
  %42 = load i32, ptr %41, align 8, !range !252, !alias.scope !8014, !noalias !8011, !noundef !4
  %43 = icmp eq i32 %42, 2
  br i1 %43, label %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit87.thread", label %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit87"

"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit87.thread": ; preds = %bb85
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %_126.sroa.0, ptr noundef nonnull align 8 dereferenceable(32) %_127, i64 32, i1 false), !alias.scope !8016
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %_127)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(32) %0, ptr noundef nonnull align 8 dereferenceable(32) %_126.sroa.0, i64 32, i1 false)
  call void @llvm.lifetime.end.p0(i64 264, ptr nonnull %_126.sroa.0)
  br label %bb244

"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit87": ; preds = %bb85
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
  call fastcc void @"_ZN4core6option15Option$LT$T$GT$6unwrap17h57f302f89f6b3fa6E"(ptr noalias nocapture noundef nonnull sret(%"state::uses::Uses") dereferenceable(24) %metadata_uses, ptr noalias nocapture noundef nonnull dereferenceable(24) %_134, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @alloc21368) #32
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %_134)
  %45 = load i32, ptr %metadata_uses, align 8, !range !252, !alias.scope !8017, !noalias !8020, !noundef !4
  %46 = icmp eq i32 %45, 0
  %47 = icmp eq i64 %number_of_uses, 0
  %48 = getelementptr inbounds %"state::uses::Uses", ptr %metadata_uses, i64 0, i32 3
  %_142 = load i64, ptr %48, align 8
  %_140 = icmp ult i64 %_142, %number_of_uses
  %_138.0.off0 = select i1 %47, i1 true, i1 %_140
  br i1 %_138.0.off0, label %bb100, label %bb102

bb87:                                             ; preds = %bb79
  %_112.sroa.7.0._113.sroa_idx = getelementptr inbounds i8, ptr %_113, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_112.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_112.sroa.7.0._113.sroa_idx, i64 28, i1 false), !alias.scope !8022
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_113)
  %_123.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_123.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_112.sroa.7, i64 28, i1 false)
  store i32 %39, ptr %0, align 8, !alias.scope !8023
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_112.sroa.7)
  br label %bb245

bb244:                                            ; preds = %bb243, %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit87.thread"
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %metadata11)
  br label %bb245

bb102:                                            ; preds = %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit87"
  %49 = getelementptr inbounds %"state::uses::Uses", ptr %metadata_uses, i64 0, i32 2
  %_146 = load i64, ptr %49, align 8, !noundef !4
  %_145 = icmp ult i64 %_146, %number_of_uses
  br i1 %_145, label %bb103, label %bb106

bb100:                                            ; preds = %"_ZN79_$LT$core..result..Result$LT$T$C$E$GT$$u20$as$u20$core..ops..try_trait..Try$GT$6branch17h5daa373c5c63cab3E.exit87"
  store i32 0, ptr %0, align 8
  %_143.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 86, ptr %_143.sroa.4.0..sroa_idx, align 4
  br label %bb243

bb243:                                            ; preds = %bb179, %bb186, %bb118, %bb238, %bb227, %bb197, %bb216, %bb203, %bb112, %bb171, %bb103, %bb100
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %metadata_uses)
  %50 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 4
; call core::ptr::drop_in_place<token_metadata::state::data::Data>
  call fastcc void @"_ZN4core3ptr54drop_in_place$LT$token_metadata..state..data..Data$GT$17h9b29234026607c01E"(ptr noundef nonnull %50) #32
  br label %bb244

bb103:                                            ; preds = %bb102
  store i32 0, ptr %0, align 8
  %_148.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 86, ptr %_148.sroa.4.0..sroa_idx, align 4
  br label %bb243

bb106:                                            ; preds = %bb102
  %_153.0 = sub i64 %_146, %number_of_uses
  store i32 %45, ptr %44, align 8
  %_154.sroa.5.0..sroa_idx = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 11, i32 1, i64 1
  store i64 %_153.0, ptr %_154.sroa.5.0..sroa_idx, align 8
  %_154.sroa.6.0..sroa_idx = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 11, i32 1, i64 3
  store i64 %_142, ptr %_154.sroa.6.0..sroa_idx, align 8
  br i1 %approved_authority_is_using.0.in, label %bb107, label %bb169

bb169:                                            ; preds = %bb106
; call core::cmp::impls::<impl core::cmp::PartialEq<&B> for &A>::ne
  %_249 = call fastcc noundef zeroext i1 @"_ZN4core3cmp5impls69_$LT$impl$u20$core..cmp..PartialEq$LT$$RF$B$GT$$u20$for$u20$$RF$A$GT$2ne17h3cdd924d25da7955E"(ptr noalias noundef nonnull readonly align 8 dereferenceable(8) %v.i57, ptr noalias noundef nonnull readonly align 8 dereferenceable(8) %v.i61) #32
  br i1 %_249, label %bb171, label %bb174

bb107:                                            ; preds = %bb106
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_161.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_162)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_162, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8027)
  %51 = load i32, ptr %_162, align 8, !range !146, !alias.scope !8030, !noalias !8027, !noundef !4
  %52 = icmp eq i32 %51, 22
  br i1 %52, label %bb110, label %bb112

bb110:                                            ; preds = %bb107
  %53 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_162, i64 0, i32 1
  %v.i88 = load ptr, ptr %53, align 8, !alias.scope !8030, !noalias !8027, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_162)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_161.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_173)
; call solana_program::account_info::AccountInfo::try_borrow_mut_data
  call void @_ZN14solana_program12account_info11AccountInfo19try_borrow_mut_data17hccab78da8bf9f985E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>") dereferenceable(32) %_173, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i88) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8032)
  %54 = load i32, ptr %_173, align 8, !range !146, !alias.scope !8035, !noalias !8032, !noundef !4
  %55 = icmp eq i32 %54, 22
  br i1 %55, label %bb116, label %bb118

bb112:                                            ; preds = %bb107
  %_161.sroa.7.0._162.sroa_idx = getelementptr inbounds i8, ptr %_162, i64 4
  %_161.sroa.7.0.copyload180 = load i32, ptr %_161.sroa.7.0._162.sroa_idx, align 4, !alias.scope !8037
  %_161.sroa.7181.0._162.sroa_idx = getelementptr inbounds i8, ptr %_162, i64 8
  %_161.sroa.7181.0.copyload182 = load ptr, ptr %_161.sroa.7181.0._162.sroa_idx, align 8, !alias.scope !8037
  %_161.sroa.9.0._162.sroa_idx = getelementptr inbounds i8, ptr %_162, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_161.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_161.sroa.9.0._162.sroa_idx, i64 16, i1 false), !alias.scope !8037
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_162)
  %_166.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_166.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_161.sroa.9, i64 16, i1 false)
  store i32 %51, ptr %0, align 8, !alias.scope !8038
  %_166.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_161.sroa.7.0.copyload180, ptr %_166.sroa.4.0..sroa_idx, align 4, !alias.scope !8038
  %_166.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_161.sroa.7181.0.copyload182, ptr %_166.sroa.5.0..sroa_idx, align 8, !alias.scope !8038
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_161.sroa.9)
  br label %bb243

bb116:                                            ; preds = %bb110
  %56 = getelementptr inbounds %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>::Ok", ptr %_173, i64 0, i32 1
  %v.0.i = load ptr, ptr %56, align 8, !alias.scope !8035, !noalias !8032, !nonnull !4, !noundef !4
  %57 = getelementptr inbounds %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>::Ok", ptr %_173, i64 0, i32 1, i32 1
  %v.1.i = load ptr, ptr %57, align 8, !alias.scope !8035, !noalias !8032, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_173)
  %58 = getelementptr inbounds { ptr, i64 }, ptr %v.0.i, i64 0, i32 1
  %_347.1 = load i64, ptr %58, align 8, !noundef !4
  %record_info_empty.i = icmp eq i64 %_347.1, 0
  br i1 %record_info_empty.i, label %bb125, label %bb123

bb118:                                            ; preds = %bb110
  %_172.sroa.7.0._173.sroa_idx = getelementptr inbounds i8, ptr %_173, i64 4
  %_172.sroa.7.0.copyload184 = load i32, ptr %_172.sroa.7.0._173.sroa_idx, align 4, !alias.scope !8042
  %_172.sroa.7185.0._173.sroa_idx = getelementptr inbounds i8, ptr %_173, i64 8
  %_172.sroa.7185.0.copyload186 = load ptr, ptr %_172.sroa.7185.0._173.sroa_idx, align 8, !alias.scope !8042
  %_172.sroa.9.0._173.sroa_idx = getelementptr inbounds i8, ptr %_173, i64 16
  %_172.sroa.9.0.copyload187 = load ptr, ptr %_172.sroa.9.0._173.sroa_idx, align 8, !alias.scope !8042
  %_172.sroa.11.0._173.sroa_idx = getelementptr inbounds i8, ptr %_173, i64 24
  %_172.sroa.11.0.copyload188 = load i64, ptr %_172.sroa.11.0._173.sroa_idx, align 8, !alias.scope !8042
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_173)
  store i32 %54, ptr %0, align 8, !alias.scope !8043
  %_177.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_172.sroa.7.0.copyload184, ptr %_177.sroa.4.0..sroa_idx, align 4, !alias.scope !8043
  %_177.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_172.sroa.7185.0.copyload186, ptr %_177.sroa.5.0..sroa_idx, align 8, !alias.scope !8043
  %_177.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  store ptr %_172.sroa.9.0.copyload187, ptr %_177.sroa.6.0..sroa_idx, align 8, !alias.scope !8043
  %_177.sroa.7.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 24
  store i64 %_172.sroa.11.0.copyload188, ptr %_177.sroa.7.0..sroa_idx, align 8, !alias.scope !8043
  br label %bb243

bb123:                                            ; preds = %bb116
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_187.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_188)
; call token_metadata::assertions::misc::assert_owned_by
  call void @_ZN14token_metadata10assertions4misc15assert_owned_by17hd43cc5ffc5280963E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_188, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i88, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %program_id) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8047)
  %59 = load i32, ptr %_188, align 8, !range !146, !alias.scope !8050, !noalias !8047, !noundef !4
  %60 = icmp eq i32 %59, 22
  br i1 %60, label %bb129, label %bb131

bb125:                                            ; preds = %bb116
  store i32 0, ptr %0, align 8, !alias.scope !8052
  %_185.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 84, ptr %_185.sroa.4.0..sroa_idx, align 4, !alias.scope !8052
  br label %bb238

bb238:                                            ; preds = %bb137, %bb236, %bb131, %bb125
  %borrow.i.i.i = load i64, ptr %v.1.i, align 8, !noalias !8056, !noundef !4
  %val.i.i.i = add i64 %borrow.i.i.i, 1
  store i64 %val.i.i.i, ptr %v.1.i, align 8, !noalias !8056
  br label %bb243

bb129:                                            ; preds = %bb123
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_188)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_187.sroa.7)
  call void @llvm.lifetime.start.p0(i64 27, ptr nonnull %_196.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_197)
; call token_metadata::assertions::uses::assert_use_authority_derivation
  call void @_ZN14token_metadata10assertions4uses31assert_use_authority_derivation17h3cb2a67f7540af2dE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<u8, solana_program::program_error::ProgramError>") dereferenceable(32) %_197, ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %program_id, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i88, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i57, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i53) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8059)
  %61 = load i32, ptr %_197, align 8, !range !146, !alias.scope !8062, !noalias !8059, !noundef !4
  %62 = icmp eq i32 %61, 22
  br i1 %62, label %bb135, label %bb137

bb131:                                            ; preds = %bb123
  %_187.sroa.7.0._188.sroa_idx = getelementptr inbounds i8, ptr %_188, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_187.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_187.sroa.7.0._188.sroa_idx, i64 28, i1 false), !alias.scope !8064
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_188)
  %_193.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_193.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_187.sroa.7, i64 28, i1 false)
  store i32 %59, ptr %0, align 8, !alias.scope !8065
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_187.sroa.7)
  br label %bb238

bb135:                                            ; preds = %bb129
  %63 = getelementptr inbounds %"core::result::Result<u8, solana_program::program_error::ProgramError>::Ok", ptr %_197, i64 0, i32 1
  %v.i100 = load i8, ptr %63, align 4, !alias.scope !8062, !noalias !8059, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_197)
  call void @llvm.lifetime.end.p0(i64 27, ptr nonnull %_196.sroa.9)
  call void @llvm.lifetime.start.p0(i64 24, ptr nonnull %record)
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_207.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_208)
  %_348.0 = load ptr, ptr %v.0.i, align 8, !nonnull !4, !align !41, !noundef !4
  %_348.1 = load i64, ptr %58, align 8, !noundef !4
; call token_metadata::state::uses::UseAuthorityRecord::from_bytes
  call void @_ZN14token_metadata5state4uses18UseAuthorityRecord10from_bytes17hc4d881a6be959e08E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<state::uses::UseAuthorityRecord, solana_program::program_error::ProgramError>") dereferenceable(32) %_208, ptr noalias noundef nonnull readonly align 1 %_348.0, i64 noundef %_348.1) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8069)
  %64 = load i32, ptr %_208, align 8, !range !146, !alias.scope !8072, !noalias !8069, !noundef !4
  %65 = icmp eq i32 %64, 22
  br i1 %65, label %bb141, label %bb143

bb137:                                            ; preds = %bb129
  %_196.sroa.7.0._197.sroa_idx = getelementptr inbounds i8, ptr %_197, i64 4
  %_196.sroa.7.0.copyload193 = load i8, ptr %_196.sroa.7.0._197.sroa_idx, align 4, !alias.scope !8074
  %_196.sroa.9.0._197.sroa_idx = getelementptr inbounds i8, ptr %_197, i64 5
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 1 dereferenceable(27) %_196.sroa.9, ptr noundef nonnull align 1 dereferenceable(27) %_196.sroa.9.0._197.sroa_idx, i64 27, i1 false), !alias.scope !8074
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_197)
  %_204.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 5
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 1 dereferenceable(27) %_204.sroa.5.0..sroa_idx, ptr noundef nonnull align 1 dereferenceable(27) %_196.sroa.9, i64 27, i1 false)
  store i32 %61, ptr %0, align 8, !alias.scope !8075
  %_204.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i8 %_196.sroa.7.0.copyload193, ptr %_204.sroa.4.0..sroa_idx, align 4, !alias.scope !8075
  call void @llvm.lifetime.end.p0(i64 27, ptr nonnull %_196.sroa.9)
  br label %bb238

bb141:                                            ; preds = %bb135
  %66 = getelementptr inbounds %"core::result::Result<state::uses::UseAuthorityRecord, solana_program::program_error::ProgramError>::Ok", ptr %_208, i64 0, i32 1
  %_207.sroa.7.8.sroa_idx195 = getelementptr inbounds i8, ptr %_207.sroa.7, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(24) %_207.sroa.7.8.sroa_idx195, ptr noundef nonnull align 8 dereferenceable(24) %66, i64 24, i1 false), !alias.scope !8079
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_208)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %record, ptr noundef nonnull align 4 dereferenceable(24) %_207.sroa.7.8.sroa_idx195, i64 24, i1 false)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_207.sroa.7)
  %67 = getelementptr inbounds %"state::uses::UseAuthorityRecord", ptr %record, i64 0, i32 3
  %_2.i = load i8, ptr %67, align 8, !alias.scope !8080, !noundef !4
  %68 = icmp eq i8 %_2.i, 0
  %69 = load i32, ptr %record, align 8, !alias.scope !8080
  %70 = icmp eq i32 %69, 8
  %.0.off0.i = select i1 %68, i1 %70, i1 false
  br i1 %.0.off0.i, label %bb147.thread, label %bb147

bb143:                                            ; preds = %bb135
  %_207.sroa.7.0._208.sroa_idx = getelementptr inbounds i8, ptr %_208, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_207.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_207.sroa.7.0._208.sroa_idx, i64 28, i1 false), !alias.scope !8079
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_208)
  %_212.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_212.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_207.sroa.7, i64 28, i1 false)
  store i32 %64, ptr %0, align 8, !alias.scope !8083
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_207.sroa.7)
  br label %bb236

bb236:                                            ; preds = %bb166, %bb159, %bb152, %bb143
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %record)
  br label %bb238

bb147:                                            ; preds = %bb141
  %_3.not.i = icmp eq i8 %_2.i, %v.i100
  br i1 %_3.not.i, label %bb150, label %bb152

bb147.thread:                                     ; preds = %bb141
  store i8 %v.i100, ptr %67, align 8
  br label %bb150

bb150:                                            ; preds = %bb147.thread, %bb147
  %71 = getelementptr inbounds %"state::uses::UseAuthorityRecord", ptr %record, i64 0, i32 2
  %_230 = load i64, ptr %71, align 8, !noundef !4
  %.not284 = icmp ult i64 %_230, %number_of_uses
  br i1 %.not284, label %bb159, label %bb157

bb152:                                            ; preds = %bb147
  store i32 0, ptr %0, align 8, !alias.scope !8087
  %_224.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 89, ptr %_224.sroa.4.0..sroa_idx, align 4, !alias.scope !8087
  br label %bb236

bb157:                                            ; preds = %bb150
  %72 = sub i64 %_230, %number_of_uses
  store i64 %72, ptr %71, align 8
  %_349.0 = load ptr, ptr %v.0.i, align 8, !nonnull !4, !align !41, !noundef !4
  %_349.1 = load i64, ptr %58, align 8, !noundef !4
; call borsh::ser::helpers::to_writer
  %_238 = call noundef ptr @_ZN5borsh3ser7helpers9to_writer17h0656b0bc490f85b5E(ptr noalias noundef nonnull align 1 %_349.0, i64 noundef %_349.1, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) %record) #32
  %73 = icmp eq ptr %_238, null
  br i1 %73, label %bb164, label %bb166

bb159:                                            ; preds = %bb150
  store i32 0, ptr %0, align 8, !alias.scope !8091
  %_3.sroa.4.0..sroa_idx.i = getelementptr inbounds i8, ptr %0, i64 4
  store i32 86, ptr %_3.sroa.4.0..sroa_idx.i, align 4, !alias.scope !8091
  br label %bb236

bb164:                                            ; preds = %bb157
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %record)
  %borrow.i.i.i117 = load i64, ptr %v.1.i, align 8, !noalias !8094, !noundef !4
  %val.i.i.i118 = add i64 %borrow.i.i.i117, 1
  store i64 %val.i.i.i118, ptr %v.1.i, align 8, !noalias !8094
  br label %bb174

bb166:                                            ; preds = %bb157
; call <solana_program::program_error::ProgramError as core::convert::From<std::io::error::Error>>::from
  call void @"_ZN112_$LT$solana_program..program_error..ProgramError$u20$as$u20$core..convert..From$LT$std..io..error..Error$GT$$GT$4from17h44cd47269a3ba337E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::program_error::ProgramError") dereferenceable(32) %0, ptr noundef nonnull %_238) #32
  br label %bb236

bb174:                                            ; preds = %bb169, %bb164
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_263)
; call solana_program::account_info::AccountInfo::try_borrow_mut_data
  call void @_ZN14solana_program12account_info11AccountInfo19try_borrow_mut_data17hccab78da8bf9f985E(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>") dereferenceable(32) %_263, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8097)
  %74 = load i32, ptr %_263, align 8, !range !146, !alias.scope !8100, !noalias !8097, !noundef !4
  %75 = icmp eq i32 %74, 22
  br i1 %75, label %bb177, label %bb179

bb171:                                            ; preds = %bb169
  store i32 0, ptr %0, align 8
  %_252.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 98, ptr %_252.sroa.4.0..sroa_idx, align 4
  br label %bb243

bb177:                                            ; preds = %bb174
  %76 = getelementptr inbounds %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>::Ok", ptr %_263, i64 0, i32 1
  %v.0.i119 = load ptr, ptr %76, align 8, !alias.scope !8100, !noalias !8097, !nonnull !4, !noundef !4
  %77 = getelementptr inbounds %"core::result::Result<core::cell::RefMut<'_, &mut [u8]>, solana_program::program_error::ProgramError>::Ok", ptr %_263, i64 0, i32 1, i32 1
  %v.1.i120 = load ptr, ptr %77, align 8, !alias.scope !8100, !noalias !8097, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_263)
  %_350.0 = load ptr, ptr %v.0.i119, align 8, !nonnull !4, !align !41, !noundef !4
  %78 = getelementptr inbounds { ptr, i64 }, ptr %v.0.i119, i64 0, i32 1
  %_350.1 = load i64, ptr %78, align 8, !noundef !4
; call token_metadata::state::metadata::Metadata::save
  %_255 = call noundef ptr @_ZN14token_metadata5state8metadata8Metadata4save17h9f156a2a06f34989E(ptr noalias noundef nonnull readonly align 8 dereferenceable(304) %metadata11, ptr noalias noundef nonnull align 1 %_350.0, i64 noundef %_350.1) #32
  %79 = icmp eq ptr %_255, null
  br i1 %79, label %bb184, label %bb186

bb179:                                            ; preds = %bb174
  %_262.sroa.7.0._263.sroa_idx = getelementptr inbounds i8, ptr %_263, i64 4
  %_262.sroa.7.0.copyload201 = load i32, ptr %_262.sroa.7.0._263.sroa_idx, align 4, !alias.scope !8102
  %_262.sroa.7202.0._263.sroa_idx = getelementptr inbounds i8, ptr %_263, i64 8
  %_262.sroa.7202.0.copyload203 = load ptr, ptr %_262.sroa.7202.0._263.sroa_idx, align 8, !alias.scope !8102
  %_262.sroa.9.0._263.sroa_idx = getelementptr inbounds i8, ptr %_263, i64 16
  %_262.sroa.9.0.copyload204 = load ptr, ptr %_262.sroa.9.0._263.sroa_idx, align 8, !alias.scope !8102
  %_262.sroa.11.0._263.sroa_idx = getelementptr inbounds i8, ptr %_263, i64 24
  %_262.sroa.11.0.copyload205 = load i64, ptr %_262.sroa.11.0._263.sroa_idx, align 8, !alias.scope !8102
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_263)
  store i32 %74, ptr %0, align 8, !alias.scope !8103
  %_267.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_262.sroa.7.0.copyload201, ptr %_267.sroa.4.0..sroa_idx, align 4, !alias.scope !8103
  %_267.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_262.sroa.7202.0.copyload203, ptr %_267.sroa.5.0..sroa_idx, align 8, !alias.scope !8103
  %_267.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  store ptr %_262.sroa.9.0.copyload204, ptr %_267.sroa.6.0..sroa_idx, align 8, !alias.scope !8103
  %_267.sroa.7.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 24
  store i64 %_262.sroa.11.0.copyload205, ptr %_267.sroa.7.0..sroa_idx, align 8, !alias.scope !8103
  br label %bb243

bb184:                                            ; preds = %bb177
  %borrow.i.i.i126 = load i64, ptr %v.1.i120, align 8, !noalias !8107, !noundef !4
  %val.i.i.i127 = add i64 %borrow.i.i.i126, 1
  store i64 %val.i.i.i127, ptr %v.1.i120, align 8, !noalias !8107
  %80 = icmp eq i64 %_146, %number_of_uses
  %must_burn. = and i1 %46, %80
  br i1 %must_burn., label %bb191, label %bb230

bb186:                                            ; preds = %bb177
; call <solana_program::program_error::ProgramError as core::convert::From<std::io::error::Error>>::from
  call void @"_ZN112_$LT$solana_program..program_error..ProgramError$u20$as$u20$core..convert..From$LT$std..io..error..Error$GT$$GT$4from17h44cd47269a3ba337E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::program_error::ProgramError") dereferenceable(32) %0, ptr noundef nonnull %_255) #32
  %borrow.i.i.i129 = load i64, ptr %v.1.i120, align 8, !noalias !8110, !noundef !4
  %val.i.i.i130 = add i64 %borrow.i.i.i129, 1
  store i64 %val.i.i.i130, ptr %v.1.i120, align 8, !noalias !8110
  br label %bb243

bb230:                                            ; preds = %bb214, %bb225, %bb184
  store i32 22, ptr %0, align 8
  call void @llvm.lifetime.end.p0(i64 24, ptr nonnull %metadata_uses)
  %81 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata11, i64 0, i32 4
; call core::ptr::drop_in_place<token_metadata::state::data::Data>
  call fastcc void @"_ZN4core3ptr54drop_in_place$LT$token_metadata..state..data..Data$GT$17h9b29234026607c01E"(ptr noundef nonnull %81) #32
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %metadata11)
  %82 = getelementptr inbounds %"state::metadata::Metadata", ptr %metadata, i64 0, i32 4
; call core::ptr::drop_in_place<token_metadata::state::data::Data>
  call fastcc void @"_ZN4core3ptr54drop_in_place$LT$token_metadata..state..data..Data$GT$17h9b29234026607c01E"(ptr noundef nonnull %82) #32
  call void @llvm.lifetime.end.p0(i64 304, ptr nonnull %metadata)
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_5)
  br label %bb255

bb191:                                            ; preds = %bb184
  br i1 %approved_authority_is_using.0.in, label %bb192, label %bb218

bb218:                                            ; preds = %bb191
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_328.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_329)
  call void @llvm.lifetime.start.p0(i64 216, ptr nonnull %_330)
  %83 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_330, i64 0, i32 1
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17ha4756dd4074640f6E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %83, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i53) #32
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_333)
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17ha4756dd4074640f6E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %_333, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i61) #32
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_335)
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17ha4756dd4074640f6E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %_335, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i65) #32
  %84 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_330, i64 0, i32 2
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17ha4756dd4074640f6E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %84, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i49) #32
  %85 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_330, i64 0, i32 5
  store i64 1, ptr %85, align 8
  %86 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_330, i64 0, i32 3
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %86, ptr noundef nonnull align 8 dereferenceable(48) %_333, i64 48, i1 false)
  store ptr null, ptr %_330, align 8
  %87 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_330, i64 0, i32 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %87, ptr noundef nonnull align 8 dereferenceable(48) %_335, i64 48, i1 false)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_335)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_333)
; call mpl_utils::token::cpi::spl_token_burn
  call void @_ZN9mpl_utils5token3cpi14spl_token_burn17h8086977b4e9b58bdE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_329, ptr noalias nocapture noundef nonnull readonly dereferenceable(216) %_330) #32
  call void @llvm.lifetime.end.p0(i64 216, ptr nonnull %_330)
  call void @llvm.experimental.noalias.scope.decl(metadata !8113)
  %88 = load i32, ptr %_329, align 8, !range !146, !alias.scope !8116, !noalias !8113, !noundef !4
  %89 = icmp eq i32 %88, 22
  br i1 %89, label %bb225, label %bb227

bb192:                                            ; preds = %bb191
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_278.sroa.9)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_279)
; call solana_program::account_info::next_account_info
  call void @_ZN14solana_program12account_info17next_account_info17h1933ed1a7eb83a0cE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>") dereferenceable(32) %_279, ptr noalias noundef nonnull align 8 dereferenceable(32) %_5) #32
  call void @llvm.experimental.noalias.scope.decl(metadata !8118)
  %90 = load i32, ptr %_279, align 8, !range !146, !alias.scope !8121, !noalias !8118, !noundef !4
  %91 = icmp eq i32 %90, 22
  br i1 %91, label %bb195, label %bb197

bb195:                                            ; preds = %bb192
  %92 = getelementptr inbounds %"core::result::Result<&solana_program::account_info::AccountInfo<'_>, solana_program::program_error::ProgramError>::Ok", ptr %_279, i64 0, i32 1
  %v.i134 = load ptr, ptr %92, align 8, !alias.scope !8121, !noalias !8118, !nonnull !4, !align !35, !noundef !4
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_279)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_278.sroa.9)
  %_351 = load ptr, ptr %v.i134, align 8, !nonnull !4, !align !41, !noundef !4
; call token_metadata::assertions::uses::assert_burner
  %93 = call { i8, i8 } @_ZN14token_metadata10assertions4uses13assert_burner17h8d7f7d8455b0e060E(ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %_351) #32
  %94 = extractvalue { i8, i8 } %93, 0
  %95 = and i8 %94, 1
  %_287.1 = extractvalue { i8, i8 } %93, 1
  %trunc.not = icmp eq i8 %95, 0
  br i1 %trunc.not, label %bb201, label %bb203

bb197:                                            ; preds = %bb192
  %_278.sroa.7.0._279.sroa_idx = getelementptr inbounds i8, ptr %_279, i64 4
  %_278.sroa.7.0.copyload207 = load i32, ptr %_278.sroa.7.0._279.sroa_idx, align 4, !alias.scope !8123
  %_278.sroa.7208.0._279.sroa_idx = getelementptr inbounds i8, ptr %_279, i64 8
  %_278.sroa.7208.0.copyload209 = load ptr, ptr %_278.sroa.7208.0._279.sroa_idx, align 8, !alias.scope !8123
  %_278.sroa.9.0._279.sroa_idx = getelementptr inbounds i8, ptr %_279, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_278.sroa.9, ptr noundef nonnull align 8 dereferenceable(16) %_278.sroa.9.0._279.sroa_idx, i64 16, i1 false), !alias.scope !8123
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_279)
  %_283.sroa.6.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 16
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_283.sroa.6.0..sroa_idx, ptr noundef nonnull align 8 dereferenceable(16) %_278.sroa.9, i64 16, i1 false)
  store i32 %90, ptr %0, align 8, !alias.scope !8124
  %_283.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_278.sroa.7.0.copyload207, ptr %_283.sroa.4.0..sroa_idx, align 4, !alias.scope !8124
  %_283.sroa.5.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 8
  store ptr %_278.sroa.7208.0.copyload209, ptr %_283.sroa.5.0..sroa_idx, align 8, !alias.scope !8124
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_278.sroa.9)
  br label %bb243

bb201:                                            ; preds = %bb195
  call void @llvm.lifetime.start.p0(i64 64, ptr nonnull %_294)
; call <solana_program::pubkey::Pubkey as core::convert::AsRef<[u8]>>::as_ref
  %96 = call { ptr, i64 } @"_ZN91_$LT$solana_program..pubkey..Pubkey$u20$as$u20$core..convert..AsRef$LT$$u5b$u8$u5d$$GT$$GT$6as_ref17h919fe6fbc3e82878E"(ptr noalias noundef nonnull readonly align 1 dereferenceable(32) %program_id) #32
  %_299.0 = extractvalue { ptr, i64 } %96, 0
  %_299.1 = extractvalue { ptr, i64 } %96, 1
  call void @llvm.lifetime.start.p0(i64 1, ptr nonnull %_308)
  store i8 %_287.1, ptr %_308, align 1
  store ptr @alloc22191, ptr %_294, align 8
  %97 = getelementptr inbounds { ptr, i64 }, ptr %_294, i64 0, i32 1
  store i64 8, ptr %97, align 8
  %98 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_294, i64 0, i64 1
  store ptr %_299.0, ptr %98, align 8
  %99 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_294, i64 0, i64 1, i32 1
  store i64 %_299.1, ptr %99, align 8
  %100 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_294, i64 0, i64 2
  store ptr @alloc21400, ptr %100, align 8
  %101 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_294, i64 0, i64 2, i32 1
  store i64 4, ptr %101, align 8
  %102 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_294, i64 0, i64 3
  store ptr %_308, ptr %102, align 8
  %103 = getelementptr inbounds [4 x { ptr, i64 }], ptr %_294, i64 0, i64 3, i32 1
  store i64 1, ptr %103, align 8
  call void @llvm.lifetime.start.p0(i64 28, ptr nonnull %_310.sroa.7)
  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %_311)
  call void @llvm.lifetime.start.p0(i64 216, ptr nonnull %_312)
  %104 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_312, i64 0, i32 1
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17ha4756dd4074640f6E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %104, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i53) #32
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_315)
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17ha4756dd4074640f6E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %_315, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i134) #32
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_317)
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17ha4756dd4074640f6E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %_317, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i65) #32
  %105 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_312, i64 0, i32 2
; call <solana_program::account_info::AccountInfo as core::clone::Clone>::clone
  call fastcc void @"_ZN80_$LT$solana_program..account_info..AccountInfo$u20$as$u20$core..clone..Clone$GT$5clone17ha4756dd4074640f6E"(ptr noalias nocapture noundef nonnull sret(%"solana_program::account_info::AccountInfo<'_>") dereferenceable(48) %105, ptr noalias noundef nonnull readonly align 8 dereferenceable(48) %v.i49) #32
  %106 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_312, i64 0, i32 5
  store i64 1, ptr %106, align 8
  %107 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_312, i64 0, i32 3
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %107, ptr noundef nonnull align 8 dereferenceable(48) %_315, i64 48, i1 false)
  store ptr %_294, ptr %_312, align 8
  %108 = getelementptr inbounds { ptr, i64 }, ptr %_312, i64 0, i32 1
  store i64 4, ptr %108, align 8
  %109 = getelementptr inbounds %"mpl_utils::token::cpi::TokenBurnParams<'_, '_>", ptr %_312, i64 0, i32 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %109, ptr noundef nonnull align 8 dereferenceable(48) %_317, i64 48, i1 false)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_317)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_315)
; call mpl_utils::token::cpi::spl_token_burn
  call void @_ZN9mpl_utils5token3cpi14spl_token_burn17h8086977b4e9b58bdE(ptr noalias nocapture noundef nonnull sret(%"core::result::Result<(), solana_program::program_error::ProgramError>") dereferenceable(32) %_311, ptr noalias nocapture noundef nonnull readonly dereferenceable(216) %_312) #32
  call void @llvm.lifetime.end.p0(i64 216, ptr nonnull %_312)
  call void @llvm.experimental.noalias.scope.decl(metadata !8128)
  %110 = load i32, ptr %_311, align 8, !range !146, !alias.scope !8131, !noalias !8128, !noundef !4
  %111 = icmp eq i32 %110, 22
  br i1 %111, label %bb214, label %bb216

bb203:                                            ; preds = %bb195
  %_5.i.i = icmp ult i8 %_287.1, -52
  call void @llvm.assume(i1 %_5.i.i)
  %_2.i.i141 = zext i8 %_287.1 to i32
  store i32 0, ptr %0, align 8, !alias.scope !8133
  %_3.sroa.4.0..sroa_idx.i142 = getelementptr inbounds i8, ptr %0, i64 4
  store i32 %_2.i.i141, ptr %_3.sroa.4.0..sroa_idx.i142, align 4, !alias.scope !8133
  br label %bb243

bb214:                                            ; preds = %bb201
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_311)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_310.sroa.7)
  call void @llvm.lifetime.end.p0(i64 1, ptr nonnull %_308)
  call void @llvm.lifetime.end.p0(i64 64, ptr nonnull %_294)
  br label %bb230

bb216:                                            ; preds = %bb201
  %_310.sroa.7.0._311.sroa_idx = getelementptr inbounds i8, ptr %_311, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_310.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_310.sroa.7.0._311.sroa_idx, i64 28, i1 false), !alias.scope !8136
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_311)
  %_326.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_326.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_310.sroa.7, i64 28, i1 false)
  store i32 %110, ptr %0, align 8, !alias.scope !8137
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_310.sroa.7)
  call void @llvm.lifetime.end.p0(i64 1, ptr nonnull %_308)
  call void @llvm.lifetime.end.p0(i64 64, ptr nonnull %_294)
  br label %bb243

bb225:                                            ; preds = %bb218
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_329)
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_328.sroa.7)
  br label %bb230

bb227:                                            ; preds = %bb218
  %_328.sroa.7.0._329.sroa_idx = getelementptr inbounds i8, ptr %_329, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_328.sroa.7, ptr noundef nonnull align 4 dereferenceable(28) %_328.sroa.7.0._329.sroa_idx, i64 28, i1 false), !alias.scope !8141
  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_329)
  %_342.sroa.4.0..sroa_idx = getelementptr inbounds i8, ptr %0, i64 4
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 4 dereferenceable(28) %_342.sroa.4.0..sroa_idx, ptr noundef nonnull align 4 dereferenceable(28) %_328.sroa.7, i64 28, i1 false)
  store i32 %88, ptr %0, align 8, !alias.scope !8142
  call void @llvm.lifetime.end.p0(i64 28, ptr nonnull %_328.sroa.7)
  br label %bb243

bb255:                                            ; preds = %bb230, %bb254
  ret void
}
