; ModuleID = 'mayhem_data_abi.f979e40631a390a8-cgu.0'
source_filename = "mayhem_data_abi.f979e40631a390a8-cgu.0"
target datalayout = "e-m:e-p:64:64-i64:64-n32:64-S128"
target triple = "sbf"

@alloc_a48736f782ce01888cde2ce41f6badc9 = private unnamed_addr constant [8 x i8] c"\FF\FF\FF\FF\FF\FF\FF\FF", align 8
@anon.8d91d52a6356633b0cac5db11902806d.0 = private unnamed_addr constant <{ ptr, [24 x i8] }> <{ ptr @alloc_a48736f782ce01888cde2ce41f6badc9, [24 x i8] zeroinitializer }>, align 8
@IO_LAYOUT = local_unnamed_addr constant [56 x i8] c"\18\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00%\00\00\00\00\00\00\00", align 8
@alloc_71400f724d40df1ad286a16089108cb1 = private unnamed_addr constant [27 x i8] c"failed to fill whole buffer", align 1
@alloc_6267043576f6d5bfcf8d6dfb9352cc26 = private unnamed_addr constant <{ ptr, [9 x i8], [7 x i8] }> <{ ptr @alloc_71400f724d40df1ad286a16089108cb1, [9 x i8] c"\1B\00\00\00\00\00\00\00%", [7 x i8] undef }>, align 8
@HASHSET_LAYOUT = local_unnamed_addr constant [16 x i8] c"0\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00", align 8

; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define noundef nonnull ptr @known_eof() unnamed_addr #0 {
start:
  ret ptr @alloc_6267043576f6d5bfcf8d6dfb9352cc26
}

; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(argmem: readwrite)
define void @empty_key_set(ptr dead_on_unwind noalias nocapture noundef writable writeonly sret([48 x i8]) align 8 dereferenceable(48) initializes((0, 48)) %_0) unnamed_addr #1 {
start:
  %_1 = alloca [48 x i8], align 8
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_1)
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %_1, ptr noundef nonnull align 8 dereferenceable(32) @anon.8d91d52a6356633b0cac5db11902806d.0, i64 32, i1 false)
  %_1.32.sroa_idx = getelementptr inbounds nuw i8, ptr %_1, i64 32
  call void @llvm.memset.p0.i64(ptr noundef nonnull align 8 dereferenceable(16) %_1.32.sroa_idx, i8 0, i64 16, i1 false), !alias.scope !2
  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(48) %_0, ptr noundef nonnull align 8 dereferenceable(48) %_1, i64 48, i1 false)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_1)
  ret void
}

; Function Attrs: mustprogress nocallback nofree nosync nounwind willreturn memory(argmem: readwrite)
declare void @llvm.lifetime.start.p0(i64 immarg, ptr nocapture) #2

; Function Attrs: mustprogress nocallback nofree nounwind willreturn memory(argmem: readwrite)
declare void @llvm.memcpy.p0.p0.i64(ptr noalias nocapture writeonly, ptr noalias nocapture readonly, i64, i1 immarg) #3

; Function Attrs: mustprogress nocallback nofree nosync nounwind willreturn memory(argmem: readwrite)
declare void @llvm.lifetime.end.p0(i64 immarg, ptr nocapture) #2

; Function Attrs: nocallback nofree nounwind willreturn memory(argmem: write)
declare void @llvm.memset.p0.i64(ptr nocapture writeonly, i8, i64, i1 immarg) #4

attributes #0 = { mustprogress nofree norecurse nosync nounwind willreturn memory(none) "target-cpu"="generic" }
attributes #1 = { mustprogress nofree norecurse nosync nounwind willreturn memory(argmem: readwrite) "target-cpu"="generic" }
attributes #2 = { mustprogress nocallback nofree nosync nounwind willreturn memory(argmem: readwrite) }
attributes #3 = { mustprogress nocallback nofree nounwind willreturn memory(argmem: readwrite) }
attributes #4 = { nocallback nofree nounwind willreturn memory(argmem: write) }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{!"rustc version 1.89.0-dev"}
!2 = !{!3}
!3 = distinct !{!3, !4, !"_ZN83_$LT$hashbrown..set..HashSet$LT$T$C$S$C$A$GT$$u20$as$u20$core..default..Default$GT$7default17h3dca2db1904e94a0E: %_0"}
!4 = distinct !{!4, !"_ZN83_$LT$hashbrown..set..HashSet$LT$T$C$S$C$A$GT$$u20$as$u20$core..default..Default$GT$7default17h3dca2db1904e94a0E"}
