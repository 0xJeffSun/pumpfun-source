; ModuleID = 'probe.906eb355dc576e15-cgu.0'
source_filename = "probe.906eb355dc576e15-cgu.0"
target datalayout = "e-m:e-p:64:64-i64:64-n32:64-S128"
target triple = "sbf"

@alloc_21016fd521dfabfe6992e4ddfd22f79d = private unnamed_addr constant <{ ptr, [16 x i8], ptr }> <{ ptr @"_ZN4core3ptr238drop_in_place$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$GT$17h326c123619695795E", [16 x i8] c"\18\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00", ptr @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h846ae18baf50be73E" }>, align 8
@vtable.0 = private unnamed_addr constant <{ ptr, [16 x i8], ptr, ptr, ptr, ptr, ptr, ptr, ptr, ptr }> <{ ptr @"_ZN4core3ptr238drop_in_place$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$GT$17h326c123619695795E", [16 x i8] c"\18\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00", ptr @"_ZN254_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17he08a6fea34b1676dE", ptr @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h846ae18baf50be73E", ptr @alloc_21016fd521dfabfe6992e4ddfd22f79d, ptr @_ZN4core5error5Error5cause17h46e0678042292b49E, ptr @_ZN4core5error5Error7type_id17h66333d1111eed494E, ptr @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17hc7c62571ef54cef2E", ptr @_ZN4core5error5Error5cause17h46e0678042292b49E, ptr @_ZN4core5error5Error7provide17h10354e07daa227ccE }>, align 8

; core::ptr::drop_in_place<alloc::boxed::convert::<impl core::convert::From<alloc::string::String> for alloc::boxed::Box<dyn core::error::Error+core::marker::Sync+core::marker::Send>>::from::StringError>
; Function Attrs: nounwind
define internal void @"_ZN4core3ptr238drop_in_place$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$GT$17h326c123619695795E"(ptr noalias nocapture noundef readonly align 8 dereferenceable(24) %_1) unnamed_addr #0 {
start:
  %_1.val = load i64, ptr %_1, align 8, !range !2, !alias.scope !3, !noundef !6
  %0 = icmp eq i64 %_1.val, 0
  br i1 %0, label %"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h1fcb6c55200d7764E.exit", label %"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17h091ef73ba4141e85E.exit.i.i.i.i.i"

"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17h091ef73ba4141e85E.exit.i.i.i.i.i": ; preds = %start
  %1 = getelementptr inbounds nuw i8, ptr %_1, i64 8
  %_1.val1 = load ptr, ptr %1, align 8, !nonnull !6, !noundef !6
; call __rustc::__rust_dealloc
  tail call void @_RNvCscR3e5J6VSLN_7___rustc14___rust_dealloc(ptr noundef nonnull %_1.val1, i64 noundef %_1.val, i64 noundef range(i64 1, -9223372036854775807) 1) #6, !noalias !7
  br label %"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h1fcb6c55200d7764E.exit"

"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h1fcb6c55200d7764E.exit": ; preds = %start, %"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17h091ef73ba4141e85E.exit.i.i.i.i.i"
  ret void
}

; core::error::Error::cause
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal { ptr, ptr } @_ZN4core5error5Error5cause17h46e0678042292b49E(ptr noalias nocapture readonly align 8 %self) unnamed_addr #1 {
start:
  ret { ptr, ptr } { ptr null, ptr undef }
}

; core::error::Error::provide
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal void @_ZN4core5error5Error7provide17h10354e07daa227ccE(ptr noalias nocapture readonly align 8 %self, ptr nocapture nonnull readnone align 8 %request.0, ptr noalias nocapture readonly align 8 %request.1) unnamed_addr #1 {
start:
  ret void
}

; core::error::Error::type_id
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal { i64, i64 } @_ZN4core5error5Error7type_id17h66333d1111eed494E(ptr noalias nocapture readonly align 8 %self) unnamed_addr #1 {
start:
  ret { i64, i64 } { i64 86750576918743129, i64 -3345032770664817660 }
}

; Function Attrs: nounwind
define { ptr, ptr } @boxed_string_error(ptr noalias nocapture noundef readonly align 8 dereferenceable(24) %message) unnamed_addr #0 {
start:
; call __rustc::__rust_no_alloc_shim_is_unstable_v2
  tail call void @_RNvCscR3e5J6VSLN_7___rustc35___rust_no_alloc_shim_is_unstable_v2() #6
; call __rustc::__rust_alloc
  %0 = tail call noundef align 8 dereferenceable_or_null(24) ptr @_RNvCscR3e5J6VSLN_7___rustc12___rust_alloc(i64 noundef 24, i64 noundef 8) #6
  %1 = icmp eq ptr %0, null
  br i1 %1, label %bb2, label %bb3, !prof !10

bb2:                                              ; preds = %start
; call alloc::alloc::handle_alloc_error
  tail call void @_ZN5alloc5alloc18handle_alloc_error17h3ea6c81aa0aa0c6eE(i64 noundef 8, i64 noundef 24) #7
  unreachable

bb3:                                              ; preds = %start
  tail call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %0, ptr noundef nonnull align 8 dereferenceable(24) %message, i64 24, i1 false)
  %2 = insertvalue { ptr, ptr } poison, ptr %0, 0
  %3 = insertvalue { ptr, ptr } %2, ptr @vtable.0, 1
  ret { ptr, ptr } %3
}

; __rustc::__rust_no_alloc_shim_is_unstable_v2
; Function Attrs: nounwind
declare void @_RNvCscR3e5J6VSLN_7___rustc35___rust_no_alloc_shim_is_unstable_v2() unnamed_addr #0

; __rustc::__rust_alloc
; Function Attrs: nounwind allockind("alloc,uninitialized,aligned") allocsize(0)
declare noalias noundef ptr @_RNvCscR3e5J6VSLN_7___rustc12___rust_alloc(i64 noundef, i64 allocalign noundef) unnamed_addr #2

; Function Attrs: mustprogress nocallback nofree nounwind willreturn memory(argmem: readwrite)
declare void @llvm.memcpy.p0.p0.i64(ptr noalias nocapture writeonly, ptr noalias nocapture readonly, i64, i1 immarg) #3

; __rustc::__rust_dealloc
; Function Attrs: nounwind allockind("free")
declare void @_RNvCscR3e5J6VSLN_7___rustc14___rust_dealloc(ptr allocptr noundef, i64 noundef, i64 noundef) unnamed_addr #4

; <alloc::boxed::convert::<impl core::convert::From<alloc::string::String> for alloc::boxed::Box<dyn core::error::Error+core::marker::Sync+core::marker::Send>>::from::StringError as core::fmt::Debug>::fmt
; Function Attrs: nounwind
declare noundef zeroext i1 @"_ZN254_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17he08a6fea34b1676dE"(ptr noalias noundef readonly align 8 dereferenceable(24), ptr noalias noundef align 8 dereferenceable(24)) unnamed_addr #0

; <alloc::boxed::convert::<impl core::convert::From<alloc::string::String> for alloc::boxed::Box<dyn core::error::Error+core::marker::Sync+core::marker::Send>>::from::StringError as core::fmt::Display>::fmt
; Function Attrs: nounwind
declare noundef zeroext i1 @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h846ae18baf50be73E"(ptr noalias noundef readonly align 8 dereferenceable(24), ptr noalias noundef align 8 dereferenceable(24)) unnamed_addr #0

; <alloc::boxed::convert::<impl core::convert::From<alloc::string::String> for alloc::boxed::Box<dyn core::error::Error+core::marker::Sync+core::marker::Send>>::from::StringError as core::error::Error>::description
; Function Attrs: nounwind
declare { ptr, i64 } @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17hc7c62571ef54cef2E"(ptr noalias noundef readonly align 8 dereferenceable(24)) unnamed_addr #0

; alloc::alloc::handle_alloc_error
; Function Attrs: cold minsize noreturn nounwind optsize
declare void @_ZN5alloc5alloc18handle_alloc_error17h3ea6c81aa0aa0c6eE(i64 noundef range(i64 1, -9223372036854775807), i64 noundef) unnamed_addr #5

attributes #0 = { nounwind "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #1 = { mustprogress nofree norecurse nosync nounwind willreturn memory(none) "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #2 = { nounwind allockind("alloc,uninitialized,aligned") allocsize(0) "alloc-family"="__rust_alloc" "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #3 = { mustprogress nocallback nofree nounwind willreturn memory(argmem: readwrite) }
attributes #4 = { nounwind allockind("free") "alloc-family"="__rust_alloc" "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #5 = { cold minsize noreturn nounwind optsize "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #6 = { nounwind }
attributes #7 = { noreturn nounwind }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{!"rustc version 1.89.0-dev"}
!2 = !{i64 0, i64 -9223372036854775808}
!3 = !{!4}
!4 = distinct !{!4, !5, !"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17he81654ce201bdd34E: %_1"}
!5 = distinct !{!5, !"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17he81654ce201bdd34E"}
!6 = !{}
!7 = !{!8}
!8 = distinct !{!8, !9, !"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17he81654ce201bdd34E: %_1"}
!9 = distinct !{!9, !"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17he81654ce201bdd34E"}
!10 = !{!"branch_weights", !"expected", i32 1, i32 2000}
