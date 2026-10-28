# mg-P-res2-01 (base L27 986/166 -> 987/166, +0x3cd50)

Window 0x3cd50 (1280 B) = trade_types::prepare_bonding_curve (shared bonding-curve preparation called by every trade handler;
callee 0x3d250 fund_bonding_curve_rent already matched).

Change (programs/pump/src/trade_types.rs only, line-neutral: the 6 body lines stay 6 lines; the fn has no Source sites):

    let current_size = curve.to_account_info().data_len();
    let needs_realloc = current_size < 166;
    let new_size = current_size.max(166);
    fund_bonding_curve_rent(curve, system_program, payer, new_size)?;
    if needs_realloc { curve.to_account_info().realloc(166, false)?; }
    Ok(())

(replaces the L27 `let funding = ..; if funding.is_err() {return funding;} if current_size >= 166 {return funding;} realloc?; Ok(())` form.)

Behaviour: identical to L27 (fund with max(size,166) first, propagate its error; realloc to 166 only when the old size was
below 166, propagate the realloc error via From<ProgramError>; Ok otherwise). Same calls in the same order.

Binary evidence: whole window byte-identical (normalized) to the original; 0 losses, 0 raw losses vs L27 (score.json).

Why it works (llc + IR, see lanes/mg-P-res2): the only L27 residual was the realloc-error block's export order (From payload
vs AccountInfo data-Rc load). llc proves it matches when the two `?` error exits (fund-err, realloc-err) meet in their own
join block where InstCombine folds the payload phi into `phi {i64,ptr}` + extractvalue (tag phi stays scalar because the fund
tag also feeds the compare), while the Ok exits go straight to the return. Binding `needs_realloc` before the `max` makes
`current_size.max(166)` its last use, so the MIR-inlined `max` borrows `current_size` itself: it becomes an alloca whose
StorageDead is the shared drop-tree node of both `?` exits -> that join survives the first SimplifyCFG -> the fold happens.
