; ModuleID = 'input.d4101c9815407191-cgu.0'
source_filename = "input.d4101c9815407191-cgu.0"
target datalayout = "e-m:e-p:64:64-i64:64-n32:64-S128"
target triple = "sbf"

; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(argmem: read)
define { i64, i64 } @fee_return(ptr noalias nocapture noundef readonly align 8 dereferenceable(24) %fee, i64 noundef %amount) unnamed_addr #0 {
start:
  %0 = getelementptr inbounds i8, ptr %fee, i64 16
  %_4 = load i16, ptr %0, align 8, !noundef !2
  %1 = icmp eq i16 %_4, 0
  %2 = icmp eq i64 %amount, 0
  %_6.sroa.0.0.off0 = or i1 %2, %1
  br i1 %_6.sroa.0.0.off0, label %bb12, label %bb15

bb15:                                             ; preds = %start
  %bps = zext i16 %_4 to i128
  %_10 = zext i64 %amount to i128
  %3 = mul nuw nsw i128 %bps, %_10
  %_43 = icmp ult i128 %3, 184467440737095516150001
  br i1 %_43, label %bb29, label %bb12

bb29:                                             ; preds = %bb15
  %_38 = add nuw nsw i128 %3, 9999
  %_41 = udiv i128 %_38, 10000
  %_44 = trunc i128 %_41 to i64
  %4 = getelementptr inbounds i8, ptr %fee, i64 8
  %_26 = load i64, ptr %4, align 8, !noundef !2
  %_0.sroa.0.0.sroa.speculated.i = tail call noundef i64 @llvm.umin.i64(i64 %_44, i64 %_26)
  br label %bb12

bb12:                                             ; preds = %bb15, %start, %bb29
  %_0.sroa.8.2 = phi i64 [ %_0.sroa.0.0.sroa.speculated.i, %bb29 ], [ 0, %start ], [ 0, %bb15 ]
  %_0.sroa.0.2 = phi i64 [ 1, %bb29 ], [ 1, %start ], [ 0, %bb15 ]
  %5 = insertvalue { i64, i64 } poison, i64 %_0.sroa.0.2, 0
  %6 = insertvalue { i64, i64 } %5, i64 %_0.sroa.8.2, 1
  ret { i64, i64 } %6
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
