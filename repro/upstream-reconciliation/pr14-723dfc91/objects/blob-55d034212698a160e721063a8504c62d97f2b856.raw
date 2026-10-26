; ModuleID = 'probe.bad760b3-cgu.0'
source_filename = "probe.bad760b3-cgu.0"
target datalayout = "e-m:e-p:64:64-i64:64-n32:64-S128"
target triple = "sbf"

%"core::result::Result<u64, u32>" = type { i32, [3 x i32] }
%Meta = type { i64, i64, [8 x i64] }
%"core::result::Result<u64, u32>::Err" = type { [1 x i32], i32 }
%"core::result::Result<u64, u32>::Ok" = type { [1 x i64], i64 }

; Function Attrs: minsize nounwind optsize
define void @guard(ptr noalias nocapture noundef writeonly sret(%"core::result::Result<u64, u32>") dereferenceable(16) %0, ptr noalias nocapture noundef dereferenceable(80) %m, i64 noundef %n) unnamed_addr #0 {
start:
  %1 = icmp eq i64 %n, 0
  br i1 %1, label %bb10, label %bb2

bb2:                                              ; preds = %start
  %_7 = load i64, ptr %m, align 8, !noundef !2
  %_5 = icmp ult i64 %_7, %n
  br i1 %_5, label %bb10, label %bb5

bb5:                                              ; preds = %bb2
  %2 = getelementptr inbounds %Meta, ptr %m, i64 0, i32 1
  %_10 = load i64, ptr %2, align 8, !noundef !2
  %_9.not = icmp ult i64 %_10, %n
  br i1 %_9.not, label %bb10, label %bb8

bb10:                                             ; preds = %bb2, %start, %bb5
  %3 = getelementptr inbounds %"core::result::Result<u64, u32>::Err", ptr %0, i64 0, i32 1
  store i32 86, ptr %3, align 4
  br label %bb11

bb8:                                              ; preds = %bb5
  %_14.0 = sub i64 %_10, %n
  store i64 %_14.0, ptr %2, align 8
  %_16 = tail call noundef i64 @success(ptr noundef nonnull %m, i64 noundef %_14.0) #1
  %4 = getelementptr inbounds %"core::result::Result<u64, u32>::Ok", ptr %0, i64 0, i32 1
  store i64 %_16, ptr %4, align 8
  br label %bb11

bb11:                                             ; preds = %bb10, %bb8
  %.sink = phi i32 [ 1, %bb10 ], [ 0, %bb8 ]
  store i32 %.sink, ptr %0, align 8
  tail call void @cleanup(ptr noundef nonnull %m) #1
  ret void
}

; Function Attrs: minsize nounwind optsize
declare void @cleanup(ptr noundef) unnamed_addr #0

; Function Attrs: minsize nounwind optsize
declare noundef i64 @success(ptr noundef, i64 noundef) unnamed_addr #0

attributes #0 = { minsize nounwind optsize "target-cpu"="generic" "target-features"="+solana" }
attributes #1 = { nounwind }

!llvm.module.flags = !{!0, !1}

!0 = !{i32 7, !"PIC Level", i32 2}
!1 = !{i32 1, !"LTOPostLink", i32 1}
!2 = !{}
