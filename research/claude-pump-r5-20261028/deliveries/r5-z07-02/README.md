# r5-z07-02 (cumulative) - 909 normalized / 165 raw (base L12 907/165), gains [0x834c8, 0x7b250], no losses

Includes r5-z07-01 (see that README: exact_input_tokens at trade_v3.rs:591 + trade_v3 module-level layout pad).

## New: 0x7b250 sync_user_volume_accumulator handler (programs/pump/src/volume_sync.rs; no Source sites in this window)
```rust
fn reset(g:&GlobalVolumeAccumulator,u:&mut UserVolumeAccumulator,now:i64){if u.last_update_timestamp<g.start_time && now<g.start_time {u.total_claimed_tokens=0;u.has_total_claimed_tokens=false;}}
pub fn execute(ctx:Context<SyncUserVolumeAccumulator>)->Result<()> {
    let a=&mut *ctx.accounts; let timestamp=Clock::get()?.unix_timestamp;
    let before=a.user_volume_accumulator.total_claimed_tokens;
    reset(&a.global_volume_accumulator,&mut a.user_volume_accumulator,timestamp);
    let after=a.user_volume_accumulator.total_claimed_tokens;
    if before==after { msg!("No changes in accumulator for user={}",a.user.key()); }
    else { let event=SyncUserVolumeAccumulatorEvent{user:a.user.key(),total_claimed_tokens_before:before,total_claimed_tokens_after:after,timestamp};
           emit!(event);emit_cpi!(event); }
    Ok(())
}
```
## Binary evidence (original 0x7b250, 2904 B)
- `ldxdw r9,[r7+8]` (accounts) before the Clock::get call -> `let a=&mut *ctx.accounts` first.
- Reset test order last_update<start then timestamp<start; stores has_total_claimed_tokens=false, total_claimed_tokens=0;
  `jeq before,0` -> msg path. Every non-emitting path (no reset, before==0) jumps to one block that formats the user key
  with Pubkey Display (0x1a87c0) and pieces "No changes in accumulator for user=" (rodata 0x1b70a0, 35 B) + sol_log.
- One copy of the user key on the stack (-0xf0..-0xd8) feeds both emit! (heap 0x100 buffer) and emit_cpi! -> no
  event.clone() (with clone the key is copied twice; ratio 0.817/0.948).
- `if before==after {msg} else {emit}` gives the original block order (event path is the fallthrough); `!=` puts msg first.
## Behaviour
Identical to the original control flow: event emitted iff the reset changed total_claimed_tokens (before>0); otherwise the
log line. The previous candidate emitted nothing when unchanged (missing msg!), so this also restores the original log output.
