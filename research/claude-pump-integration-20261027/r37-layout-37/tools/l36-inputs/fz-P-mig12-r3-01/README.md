# fz-P-mig12-r3-01 (pump, base L33 1010/1035 raw 168 -> 1011/1035 raw 168)

Gain: 0x3fb70 migrate::execute (migrate v1, migrate.rs Source site 251), 5440 B, now byte-equal (normalized) to the original
(win.py show 0x3fb70: cand 5440 B ratio=1.0000; was 5512 B, 0.8672 on L33).
Losses: none (normalized and raw). runtime_valid true, no stack warnings. Identity recipe via mg-P-int/tools/nbuild.py
(score.json = score.py --baseline base/L33/inventory.json).

Changes (src/migrate.rs only, line-neutral):
1. line 253: `a.bonding_curve.sub_lamports(fee)?;a.pool_authority.add_lamports(fee)?;`
   -> `pay_migration_fee(a,&a.pool_authority,fee)?;` with, appended after the last item of the file (no Source site after it):
       fn pay_migration_fee<'info>(a:&Migrate<'info>,pool_authority:&UncheckedAccount<'info>,fee:u64)->Result<()>{
        a.bonding_curve.sub_lamports(fee)?;pool_authority.add_lamports(fee)?;
        Ok(())
       }
   This is the v1 counterpart of the original migrate_v2 helper pay_migration_fee(a,&a.pool_authority,native,fee) (already
   in migrate_v2.rs, 0x49888 matched with it). It is private with one caller, so LLVM inlines it; the inlined helper's
   From<ProgramError> error blocks and return merge are placed like the original (exit block last, one sret reload).
2. line 251: the already-migrated test is bound first, `let migrated=a.bonding_curve.real_quote_reserves==0&&..;if migrated{msg!("Bonding curve already migrated");return Ok(());}`
   (the same form that matched migrate_v2::execute 0x49888 in fz-P-mig2-r1-01).

Evidence: IR multiplex round (lanes/fz-P-mig12-r3/spec/e2.py, tools/mxe.py: pre-opt IR + clang -O3): helper alone 0.9123,
let-bool alone 0.8772, both together 0.9985 with the only diff the copy's require! line constant (stw 0xfb vs 0x2ff); the real
build of the single variant is 1.0000 / 5440 B. Helper signature variants (a,fee) and (&curve,&pool_authority,fee) give the same bytes.

Behavior: identical by construction (byte-equal window). The helper performs the same two anchor Lamports operations in the
same order with the same `?` propagation; the let-bound test is the same short-circuit chain of pure field loads.
synthetic_layout: true only because the L33 base carries the labelled layout-pad line layout; this delivery adds no pads.
