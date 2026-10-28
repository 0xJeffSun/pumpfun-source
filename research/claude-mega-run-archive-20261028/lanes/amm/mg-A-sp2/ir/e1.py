def edit(f):
    f=f.replace('label %"_ZN4core3ptr85drop_in_place$LT$core..result..Result$LT$$LP$$RP$$C$anchor_lang..error..Error$GT$$GT$17h365427750673bcb7E.exit", label %bb23\n',
                'label %"_ZN4core3ptr85drop_in_place$LT$core..result..Result$LT$$LP$$RP$$C$anchor_lang..error..Error$GT$$GT$17h365427750673bcb7E.exit", label %errupd\n\nerrupd:\n  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %mint)\n  br label %bb23\n',1)
    f=f.replace('[ %3, %bb26 ]','[ %3, %errupd ]').replace('[ %4, %bb26 ]','[ %4, %errupd ]')
    f=f.replace('bb23:                                             ; preds = %bb26,','bb23:                                             ; preds = %errupd,')
    return f
