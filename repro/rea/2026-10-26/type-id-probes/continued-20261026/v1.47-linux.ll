; ModuleID = 'probe.87cf3059bfabe3ab-cgu.0'
source_filename = "probe.87cf3059bfabe3ab-cgu.0"
target datalayout = "e-m:e-p:64:64-i64:64-n32:64-S128"
target triple = "sbf"

@alloc_047bade6445a95069a01d74f4d873c49 = private unnamed_addr constant <{ ptr, [16 x i8], ptr }> <{ ptr @"_ZN4core3ptr238drop_in_place$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$GT$17hd0338a89fe214639E", [16 x i8] c"\18\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00", ptr @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h9f001430ff6e7815E" }>, align 8
@vtable.0 = private unnamed_addr constant <{ ptr, [16 x i8], ptr, ptr, ptr, ptr, ptr, ptr, ptr, ptr }> <{ ptr @"_ZN4core3ptr238drop_in_place$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$GT$17hd0338a89fe214639E", [16 x i8] c"\18\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00", ptr @"_ZN254_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hc9e6ae751b6d45e7E", ptr @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h9f001430ff6e7815E", ptr @alloc_047bade6445a95069a01d74f4d873c49, ptr @_ZN4core5error5Error5cause17h683fc9508645d6b8E, ptr @_ZN4core5error5Error7type_id17ha4ad2ce85f381608E, ptr @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17hc5c241d815e01770E", ptr @_ZN4core5error5Error5cause17h683fc9508645d6b8E, ptr @_ZN4core5error5Error7provide17h72fff72aad60e39fE }>, align 8

; core::ptr::drop_in_place<alloc::boxed::convert::<impl core::convert::From<alloc::string::String> for alloc::boxed::Box<dyn core::error::Error+core::marker::Send+core::marker::Sync>>::from::StringError>
; Function Attrs: nounwind
define internal void @"_ZN4core3ptr238drop_in_place$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$GT$17hd0338a89fe214639E"(ptr noalias nocapture noundef readonly align 8 dereferenceable(24) %_1) unnamed_addr #0 {
start:
  tail call void @llvm.experimental.noalias.scope.decl(metadata !2)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !5)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !8)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !11)
  tail call void @llvm.experimental.noalias.scope.decl(metadata !14)
  %_5.i.i.i.i.i.i = load i64, ptr %_1, align 8, !alias.scope !17, !noalias !20
  %0 = icmp eq i64 %_5.i.i.i.i.i.i, 0
  br i1 %0, label %"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h92d8714b388952c8E.exit", label %"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17h3f86046332b2a620E.exit.i.i.i.i.i"

"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17h3f86046332b2a620E.exit.i.i.i.i.i": ; preds = %start
  %1 = getelementptr inbounds i8, ptr %_1, i64 8
  %self3.i.i.i.i.i.i = load ptr, ptr %1, align 8, !alias.scope !17, !noalias !20, !nonnull !22, !noundef !22
  tail call void @__rust_dealloc(ptr noundef nonnull %self3.i.i.i.i.i.i, i64 noundef %_5.i.i.i.i.i.i, i64 noundef 1) #7, !noalias !23
  br label %"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h92d8714b388952c8E.exit"

"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h92d8714b388952c8E.exit": ; preds = %start, %"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17h3f86046332b2a620E.exit.i.i.i.i.i"
  ret void
}

; core::error::Error::cause
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal { ptr, ptr } @_ZN4core5error5Error5cause17h683fc9508645d6b8E(ptr noalias nocapture readonly align 8 %self) unnamed_addr #1 {
start:
  ret { ptr, ptr } { ptr null, ptr undef }
}

; core::error::Error::provide
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal void @_ZN4core5error5Error7provide17h72fff72aad60e39fE(ptr noalias nocapture readonly align 8 %self, ptr nocapture nonnull readnone align 8 %request.0, ptr noalias nocapture readonly align 8 %request.1) unnamed_addr #1 {
start:
  ret void
}

; core::error::Error::type_id
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define internal { i64, i64 } @_ZN4core5error5Error7type_id17ha4ad2ce85f381608E(ptr noalias nocapture readonly align 8 %self) unnamed_addr #1 {
start:
  ret { i64, i64 } { i64 1806664593770234160, i64 2976229726962672177 }
}

; Function Attrs: nounwind
define { ptr, ptr } @boxed_string_error(ptr noalias nocapture noundef readonly align 8 dereferenceable(24) %message) unnamed_addr #0 {
start:
  %0 = tail call noundef align 8 dereferenceable_or_null(24) ptr @__rust_alloc(i64 noundef 24, i64 noundef 8) #7
  %1 = icmp eq ptr %0, null
  br i1 %1, label %bb2, label %bb3

bb3:                                              ; preds = %start
  tail call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %0, ptr noundef nonnull align 8 dereferenceable(24) %message, i64 24, i1 false)
  %2 = insertvalue { ptr, ptr } poison, ptr %0, 0
  %3 = insertvalue { ptr, ptr } %2, ptr @vtable.0, 1
  ret { ptr, ptr } %3

bb2:                                              ; preds = %start
; call alloc::alloc::handle_alloc_error
  tail call void @_ZN5alloc5alloc18handle_alloc_error17hc0e76f87d4af31ffE(i64 noundef 8, i64 noundef 24) #8
  unreachable
}

; Function Attrs: nounwind allockind("alloc,uninitialized,aligned") allocsize(0)
declare noalias noundef ptr @__rust_alloc(i64 noundef, i64 allocalign noundef) unnamed_addr #2

; Function Attrs: mustprogress nocallback nofree nounwind willreturn memory(argmem: readwrite)
declare void @llvm.memcpy.p0.p0.i64(ptr noalias nocapture writeonly, ptr noalias nocapture readonly, i64, i1 immarg) #3

; Function Attrs: nounwind allockind("free")
declare void @__rust_dealloc(ptr allocptr noundef, i64 noundef, i64 noundef) unnamed_addr #4

; <alloc::boxed::convert::<impl core::convert::From<alloc::string::String> for alloc::boxed::Box<dyn core::error::Error+core::marker::Send+core::marker::Sync>>::from::StringError as core::fmt::Debug>::fmt
; Function Attrs: nounwind
declare noundef zeroext i1 @"_ZN254_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hc9e6ae751b6d45e7E"(ptr noalias noundef readonly align 8 dereferenceable(24), ptr noalias noundef align 8 dereferenceable(64)) unnamed_addr #0

; <alloc::boxed::convert::<impl core::convert::From<alloc::string::String> for alloc::boxed::Box<dyn core::error::Error+core::marker::Send+core::marker::Sync>>::from::StringError as core::fmt::Display>::fmt
; Function Attrs: nounwind
declare noundef zeroext i1 @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h9f001430ff6e7815E"(ptr noalias noundef readonly align 8 dereferenceable(24), ptr noalias noundef align 8 dereferenceable(64)) unnamed_addr #0

; <alloc::boxed::convert::<impl core::convert::From<alloc::string::String> for alloc::boxed::Box<dyn core::error::Error+core::marker::Send+core::marker::Sync>>::from::StringError as core::error::Error>::description
; Function Attrs: nounwind
declare { ptr, i64 } @"_ZN256_$LT$alloc..boxed..convert..$LT$impl$u20$core..convert..From$LT$alloc..string..String$GT$$u20$for$u20$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17hc5c241d815e01770E"(ptr noalias noundef readonly align 8 dereferenceable(24)) unnamed_addr #0

; alloc::alloc::handle_alloc_error
; Function Attrs: cold minsize noreturn nounwind optsize
declare void @_ZN5alloc5alloc18handle_alloc_error17hc0e76f87d4af31ffE(i64 noundef range(i64 1, -9223372036854775807), i64 noundef) unnamed_addr #5

; Function Attrs: nocallback nofree nosync nounwind willreturn memory(inaccessiblemem: readwrite)
declare void @llvm.experimental.noalias.scope.decl(metadata) #6

attributes #0 = { nounwind "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #1 = { mustprogress nofree norecurse nosync nounwind willreturn memory(none) "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #2 = { nounwind allockind("alloc,uninitialized,aligned") allocsize(0) "alloc-family"="__rust_alloc" "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #3 = { mustprogress nocallback nofree nounwind willreturn memory(argmem: readwrite) }
attributes #4 = { nounwind allockind("free") "alloc-family"="__rust_alloc" "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #5 = { cold minsize noreturn nounwind optsize "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #6 = { nocallback nofree nosync nounwind willreturn memory(inaccessiblemem: readwrite) }
attributes #7 = { nounwind }
attributes #8 = { noreturn nounwind }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{!"rustc version 1.84.1-dev"}
!2 = !{!3}
!3 = distinct !{!3, !4, !"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h92d8714b388952c8E: %_1"}
!4 = distinct !{!4, !"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h92d8714b388952c8E"}
!5 = !{!6}
!6 = distinct !{!6, !7, !"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17h8de80fa55b4581a9E: %_1"}
!7 = distinct !{!7, !"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17h8de80fa55b4581a9E"}
!8 = !{!9}
!9 = distinct !{!9, !10, !"_ZN4core3ptr53drop_in_place$LT$alloc..raw_vec..RawVec$LT$u8$GT$$GT$17h8f37753ce6201a09E: %_1"}
!10 = distinct !{!10, !"_ZN4core3ptr53drop_in_place$LT$alloc..raw_vec..RawVec$LT$u8$GT$$GT$17h8f37753ce6201a09E"}
!11 = !{!12}
!12 = distinct !{!12, !13, !"_ZN77_$LT$alloc..raw_vec..RawVec$LT$T$C$A$GT$$u20$as$u20$core..ops..drop..Drop$GT$4drop17h446d2a43c0819a37E: %self"}
!13 = distinct !{!13, !"_ZN77_$LT$alloc..raw_vec..RawVec$LT$T$C$A$GT$$u20$as$u20$core..ops..drop..Drop$GT$4drop17h446d2a43c0819a37E"}
!14 = !{!15}
!15 = distinct !{!15, !16, !"_ZN5alloc7raw_vec20RawVecInner$LT$A$GT$10deallocate17ha5dfb3edcac9c532E: %self"}
!16 = distinct !{!16, !"_ZN5alloc7raw_vec20RawVecInner$LT$A$GT$10deallocate17ha5dfb3edcac9c532E"}
!17 = !{!18, !15, !12, !9, !6, !3}
!18 = distinct !{!18, !19, !"_ZN5alloc7raw_vec20RawVecInner$LT$A$GT$14current_memory17h7931ef424b9b960aE: %self"}
!19 = distinct !{!19, !"_ZN5alloc7raw_vec20RawVecInner$LT$A$GT$14current_memory17h7931ef424b9b960aE"}
!20 = !{!21}
!21 = distinct !{!21, !19, !"_ZN5alloc7raw_vec20RawVecInner$LT$A$GT$14current_memory17h7931ef424b9b960aE: %_0"}
!22 = !{}
!23 = !{!15, !12, !9, !6, !3}
