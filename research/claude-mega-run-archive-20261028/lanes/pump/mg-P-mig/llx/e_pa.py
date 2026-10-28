import re
def edit(b):
    # hoist pool_authority GEP (a+88) into bb23 (after memcmp) and reuse it in both branches
    b = b.replace("  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_42)\n  %_277 = load ptr, ptr %_258",
                  "  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %_42)\n  %pa.h = getelementptr inbounds i8, ptr %_258, i64 88\n  %_277 = load ptr, ptr %_258", 1)
    for v in ('%_58', '%_51'):
        b = b.replace(f"  {v} = getelementptr inbounds i8, ptr %_258, i64 88\n", "", 1)
        b = re.sub(re.escape(v) + r'\b', '%pa.h', b)
    return b
