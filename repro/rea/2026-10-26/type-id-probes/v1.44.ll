; ModuleID = 'probe.83e95ad695610d76-cgu.0'
source_filename = "probe.83e95ad695610d76-cgu.0"
target datalayout = "e-m:e-p:64:64-i64:64-n32:64-S128"
target triple = "sbf"

@alloc_8d00a81c1f5320515ba06a18f5beb719 = private unnamed_addr constant <{ ptr, [16 x i8], ptr }> <{ ptr @"_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h4fb028d24e288e15E", [16 x i8] c"\18\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00", ptr @"_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h8537cfd778408927E" }>, align 8
@vtable.0 = private unnamed_addr constant <{ ptr, [16 x i8], ptr, ptr, ptr, ptr, ptr, ptr, ptr, ptr }> <{ ptr @"_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h4fb028d24e288e15E", [16 x i8] c"\18\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00", ptr @"_ZN221_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hc14c4d3798e8bc4cE", ptr @"_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h8537cfd778408927E", ptr @alloc_8d00a81c1f5320515ba06a18f5beb719, ptr @_ZN4core5error5Error5cause17hae7bc57882522e3aE, ptr @_ZN4core5error5Error7type_id17h148affbd94536b27E, ptr @"_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17haea1ac2e72e07e37E", ptr @_ZN4core5error5Error5cause17hae7bc57882522e3aE, ptr @_ZN4core5error5Error7provide17h3e57a65a36c6b5eaE }>, align 8

; core::ptr::drop_in_place<<alloc::boxed::Box<dyn core::error::Error+core::marker::Sync+core::marker::Send> as core::convert::From<alloc::string::String>>::from::StringError>
; Function Attrs: nounwind
define internal void @"_ZN4core3ptr205drop_in_place$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$GT$17h4fb028d24e288e15E"(ptr noalias nocapture noundef readonly align 8 dereferenceable(24) %_1) unnamed_addr #0 {
start:
  tail call void @llvm.experimental.noalias.scope.decl(metadata !2)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !5)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !8)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !11)
  %_3.i.i.i.i.i = load i64, ptr %_1, align 8, !alias.scope !14, !noalias !17, !noundef !19
  %0 = icmp eq i64 %_3.i.i.i.i.i, 0
  br i1 %0, label %"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h58039d15401e75baE.exit", label %"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17hf9ca51563e26885bE.exit.i.i.i.i"

"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17hf9ca51563e26885bE.exit.i.i.i.i": ; preds = %start
  %1 = getelementptr inbounds i8, ptr %_1, i64 8
  %self2.i.i.i.i.i = load ptr, ptr %1, align 8, !alias.scope !14, !noalias !17, !nonnull !19, !noundef !19
  tail call void @__rust_dealloc(ptr noundef nonnull %self2.i.i.i.i.i, i64 noundef %_3.i.i.i.i.i, i64 noundef 1) #7, !noalias !20
  br label %"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h58039d15401e75baE.exit"

"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h58039d15401e75baE.exit": ; preds = %start, %"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17hf9ca51563e26885bE.exit.i.i.i.i"
  ret void
}

; core::error::Error::cause
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal { ptr, ptr } @_ZN4core5error5Error5cause17hae7bc57882522e3aE(ptr noalias nocapture readonly align 8 %self) unnamed_addr #1 {
start:
  ret { ptr, ptr } { ptr null, ptr undef }
}

; core::error::Error::provide
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal void @_ZN4core5error5Error7provide17h3e57a65a36c6b5eaE(ptr noalias nocapture readonly align 8 %self, ptr nocapture nonnull readnone align 1 %request.0, ptr noalias nocapture readonly align 8 %request.1) unnamed_addr #1 {
start:
  ret void
}

; core::error::Error::type_id
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal { i64, i64 } @_ZN4core5error5Error7type_id17h148affbd94536b27E(ptr noalias nocapture readonly align 8 %self) unnamed_addr #1 {
start:
  ret { i64, i64 } { i64 -862930713695552035, i64 -6627141140442047761 }
}

; Function Attrs: nounwind
define { ptr, ptr } @boxed_string_error(ptr noalias nocapture noundef readonly align 8 dereferenceable(24) %message) unnamed_addr #0 {
start:
  %0 = tail call noundef align 8 dereferenceable_or_null(24) ptr @__rust_alloc(i64 noundef 24, i64 noundef 8) #7
  %1 = icmp eq ptr %0, null
  br i1 %1, label %bb2.i, label %_ZN5alloc5alloc15exchange_malloc17hef2788e274cd2574E.exit

bb2.i:                                            ; preds = %start
; call alloc::alloc::handle_alloc_error
  tail call void @_ZN5alloc5alloc18handle_alloc_error17hfd63d3615830768dE(i64 noundef 8, i64 noundef 24) #8
  unreachable

_ZN5alloc5alloc15exchange_malloc17hef2788e274cd2574E.exit: ; preds = %start
  tail call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %0, ptr noundef nonnull align 8 dereferenceable(24) %message, i64 24, i1 false)
  %2 = insertvalue { ptr, ptr } poison, ptr %0, 0
  %3 = insertvalue { ptr, ptr } %2, ptr @vtable.0, 1
  ret { ptr, ptr } %3
}

; alloc::alloc::handle_alloc_error
; Function Attrs: cold noreturn nounwind
declare void @_ZN5alloc5alloc18handle_alloc_error17hfd63d3615830768dE(i64 noundef, i64 noundef) unnamed_addr #2

; Function Attrs: nounwind allockind("alloc,uninitialized,aligned") allocsize(0)
declare noalias noundef ptr @__rust_alloc(i64 noundef, i64 allocalign noundef) unnamed_addr #3

; Function Attrs: mustprogress nocallback nofree nounwind willreturn memory(argmem: readwrite)
declare void @llvm.memcpy.p0.p0.i64(ptr noalias nocapture writeonly, ptr noalias nocapture readonly, i64, i1 immarg) #4

; Function Attrs: nounwind allockind("free")
declare void @__rust_dealloc(ptr allocptr noundef, i64 noundef, i64 noundef) unnamed_addr #5

; <<alloc::boxed::Box<dyn core::error::Error+core::marker::Sync+core::marker::Send> as core::convert::From<alloc::string::String>>::from::StringError as core::fmt::Debug>::fmt
; Function Attrs: nounwind
declare noundef zeroext i1 @"_ZN221_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hc14c4d3798e8bc4cE"(ptr noalias noundef readonly align 8 dereferenceable(24), ptr noalias noundef align 8 dereferenceable(64)) unnamed_addr #0

; <<alloc::boxed::Box<dyn core::error::Error+core::marker::Sync+core::marker::Send> as core::convert::From<alloc::string::String>>::from::StringError as core::fmt::Display>::fmt
; Function Attrs: nounwind
declare noundef zeroext i1 @"_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h8537cfd778408927E"(ptr noalias noundef readonly align 8 dereferenceable(24), ptr noalias noundef align 8 dereferenceable(64)) unnamed_addr #0

; <<alloc::boxed::Box<dyn core::error::Error+core::marker::Sync+core::marker::Send> as core::convert::From<alloc::string::String>>::from::StringError as core::error::Error>::description
; Function Attrs: nounwind
declare { ptr, i64 } @"_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Sync$u2b$core..marker..Send$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17haea1ac2e72e07e37E"(ptr noalias noundef readonly align 8 dereferenceable(24)) unnamed_addr #0

; Function Attrs: nocallback nofree nosync nounwind willreturn memory(inaccessiblemem: readwrite)
declare void @llvm.experimental.noalias.scope.decl(metadata) #6

attributes #0 = { nounwind "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #1 = { mustprogress nofree norecurse nosync nounwind willreturn memory(none) "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #2 = { cold noreturn nounwind "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #3 = { nounwind allockind("alloc,uninitialized,aligned") allocsize(0) "alloc-family"="__rust_alloc" "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #4 = { mustprogress nocallback nofree nounwind willreturn memory(argmem: readwrite) }
attributes #5 = { nounwind allockind("free") "alloc-family"="__rust_alloc" "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #6 = { nocallback nofree nosync nounwind willreturn memory(inaccessiblemem: readwrite) }
attributes #7 = { nounwind }
attributes #8 = { noreturn nounwind }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{!"rustc version 1.79.0-dev"}
!2 = !{!3}
!3 = distinct !{!3, !4, !"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h58039d15401e75baE: %_1"}
!4 = distinct !{!4, !"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h58039d15401e75baE"}
!5 = !{!6}
!6 = distinct !{!6, !7, !"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17h6c582bb88b89943cE: %_1"}
!7 = distinct !{!7, !"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17h6c582bb88b89943cE"}
!8 = !{!9}
!9 = distinct !{!9, !10, !"_ZN4core3ptr53drop_in_place$LT$alloc..raw_vec..RawVec$LT$u8$GT$$GT$17h91a95d770f4fe37bE: %_1"}
!10 = distinct !{!10, !"_ZN4core3ptr53drop_in_place$LT$alloc..raw_vec..RawVec$LT$u8$GT$$GT$17h91a95d770f4fe37bE"}
!11 = !{!12}
!12 = distinct !{!12, !13, !"_ZN77_$LT$alloc..raw_vec..RawVec$LT$T$C$A$GT$$u20$as$u20$core..ops..drop..Drop$GT$4drop17hb65cff75148b47faE: %self"}
!13 = distinct !{!13, !"_ZN77_$LT$alloc..raw_vec..RawVec$LT$T$C$A$GT$$u20$as$u20$core..ops..drop..Drop$GT$4drop17hb65cff75148b47faE"}
!14 = !{!15, !12, !9, !6, !3}
!15 = distinct !{!15, !16, !"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$14current_memory17hf6613b34c3b3e341E: %self"}
!16 = distinct !{!16, !"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$14current_memory17hf6613b34c3b3e341E"}
!17 = !{!18}
!18 = distinct !{!18, !16, !"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$14current_memory17hf6613b34c3b3e341E: %_0"}
!19 = !{}
!20 = !{!12, !9, !6, !3}
