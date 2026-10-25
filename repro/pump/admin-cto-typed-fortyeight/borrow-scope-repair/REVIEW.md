# Source-only borrow-scope repair

The first approved build stopped with E0502 at the earlier CollectCreatorFee emit_cpi! expansion: its immutable read of ctx.accounts.event_authority conflicts with the function-wide mutable a reference. No backend error, target execution or source retry occurred.

This repair restores the original immutable a binding through all pre-mutation CPI/event operations. At the already proved mutation join it creates a block-local mutable borrow of only bonding_curve, performs the same five field writes in the same order, then ends that borrow. A new immutable a binding supplies the later pool-update CPI and AdminCto event. The original immutable binding's last use precedes the mutation block, so ordinary nonlexical lifetimes can release it there. No operation, guard, instruction/meta bytes, field value, return, Clock call or relative mutation position changes.

before.rs is the exact failed source; admin_cto.rs is the reviewed semantic proposal plus this borrow-only correction. The failed source/build logs remain untouched. This proposal is uncompiled; root review is required before another isolated build. The existing type/backend and unchanged9269+1024 regression gates still apply.
