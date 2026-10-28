; ModuleID = 'input.d4101c9815407191-cgu.0'
source_filename = "input.d4101c9815407191-cgu.0"
target datalayout = "e-m:e-p:64:64-i64:64-n32:64-S128"
target triple = "sbf"

; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(argmem: read)
define { i64, i64 } @fee_return(ptr noalias nocapture noundef readonly align 8 dereferenceable(24) %fee, i64 noundef %amount) unnamed_addr #0 {
start:
  %0 = icmp eq i64 %amount, 0
  br i1 %0, label %bb10, label %bb2

bb2:                                              ; preds = %start
  %1 = getelementptr inbounds i8, ptr %fee, i64 16
  %_4 = load i16, ptr %1, align 8, !noundef !2
  %2 = icmp eq i16 %_4, 0
  br i1 %2, label %bb10, label %bb13

bb10:                                             ; preds = %bb13, %bb2, %start, %bb27
  %_0.sroa.9.0 = phi i64 [ %_0.sroa.0.0.sroa.speculated.i, %bb27 ], [ 0, %start ], [ 0, %bb2 ], [ undef, %bb13 ]
  %_0.sroa.0.0 = phi i64 [ 1, %bb27 ], [ 1, %start ], [ 1, %bb2 ], [ 0, %bb13 ]
  %3 = insertvalue { i64, i64 } poison, i64 %_0.sroa.0.0, 0
  %4 = insertvalue { i64, i64 } %3, i64 %_0.sroa.9.0, 1
  ret { i64, i64 } %4

bb13:                                             ; preds = %bb2
  %_7 = zext i64 %amount to i128
  %bps = zext i16 %_4 to i128
  %5 = mul nuw nsw i128 %bps, %_7
  %_40 = icmp ult i128 %5, 184467440737095516150001
  br i1 %_40, label %bb27, label %bb10

bb27:                                             ; preds = %bb13
  %_35 = add nuw nsw i128 %5, 9999
  %_38 = udiv i128 %_35, 10000
  %_41 = trunc i128 %_38 to i64
  %6 = getelementptr inbounds i8, ptr %fee, i64 8
  %_23 = load i64, ptr %6, align 8, !noundef !2
  %_0.sroa.0.0.sroa.speculated.i = tail call noundef i64 @llvm.umin.i64(i64 %_41, i64 %_23)
  br label %bb10
}

; Function Attrs: nocallback nofree nosync nounwind speculatable willreturn memory(none)
declare i64 @llvm.umin.i64(i64, i64) #1

attributes #0 = { mustprogress nofree norecurse nosync nounwind willreturn memory(argmem: read) "target-cpu"="generic" "target-features"="+store-imm,+jmp-ext" }
attributes #1 = { nocallback nofree nosync nounwind speculatable willreturn memory(none) }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{!"rustc version 1.79.0-dev"}
!2 = !{}
