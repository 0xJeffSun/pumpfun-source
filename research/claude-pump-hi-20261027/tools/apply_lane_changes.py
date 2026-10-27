#!/usr/bin/env python3
"""Apply the pump-hi lane's verified source changes to a main-Pump source tree.

Idempotent and content-addressed so it re-applies to later rounds:

1. #[program] handler order (window 0x11b758, the 8,696-byte dispatcher): permute the
   existing handler items into the order of the original dispatcher's discriminator
   comparisons (see reorder_program.py). Handler text is unchanged.
2. update_global_authority (window 0x1348c0, 3,264 bytes): the #[program] entry passes
   its Context by value to an ordinary handler fn that assigns the new authority first,
   then builds/emits the event. Behavior is unchanged (the event fields read the same
   keys; the authority store has no observable effect on them).

  apply_lane_changes.py --source-directory <crate dir containing src/lib.rs>
"""
import argparse, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

UGA_OLD = """    pub fn update_global_authority(ctx:Context<UpdateGlobalAuthority>)->Result<()>{
     let event=UpdateGlobalAuthorityEvent{global:ctx.accounts.global.key(),authority:ctx.accounts.authority.key(),new_authority:ctx.accounts.new_authority.key(),timestamp:Clock::get()?.unix_timestamp};
     ctx.accounts.global.authority=ctx.accounts.new_authority.key();emit!(event.clone());emit_cpi!(event);Ok(())
    }"""
UGA_NEW = """    pub fn update_global_authority(ctx:Context<UpdateGlobalAuthority>)->Result<()>{update_global_authority_handler(ctx)}"""
UGA_HANDLER = """fn update_global_authority_handler(ctx:Context<UpdateGlobalAuthority>)->Result<()>{
    ctx.accounts.global.authority=ctx.accounts.new_authority.key();
    let event=UpdateGlobalAuthorityEvent{global:ctx.accounts.global.key(),authority:ctx.accounts.authority.key(),new_authority:ctx.accounts.new_authority.key(),timestamp:Clock::get()?.unix_timestamp};
    emit!(event.clone());emit_cpi!(event);Ok(())
}
"""


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--source-directory', type=Path, required=True)
    a = ap.parse_args()
    lib = a.source_directory / 'src/lib.rs'
    subprocess.run([sys.executable, str(HERE / 'reorder_program.py'), '--lib', str(lib)], check=True)
    t = lib.read_text()
    if UGA_NEW in t and UGA_HANDLER in t:
        print('update_global_authority: already applied')
    else:
        assert t.count(UGA_OLD) == 1, 'update_global_authority source differs from the expected frontier text'
        t = t.replace(UGA_OLD, UGA_NEW)
        if not t.endswith('\n'):
            t += '\n'
        t += UGA_HANDLER
        lib.write_text(t)
        print('update_global_authority: applied')


if __name__ == '__main__':
    main()
