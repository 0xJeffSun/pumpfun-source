from pathlib import Path
import json,hashlib,difflib
ROOT=Path(__file__).resolve().parent;REPO=next(p for p in ROOT.parents if (p/'evidence/original').exists());base=json.loads((ROOT/'base-source-sha256.json').read_text());sha=lambda b:hashlib.sha256(b).hexdigest();patch=[]
new_context='''#[event_cpi]
#[derive(Accounts)]
pub struct InitializeFeeConfig<'info> {
    #[account(mut, address = anchor_lang::solana_program::pubkey!("8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8") @ FeeError::InvalidAdmin)]
    pub admin: Signer<'info>,
    #[account(init, payer = admin, space = 2512,
              seeds = [b"fee_config", config_program_id.key().as_ref()], bump)]
    pub fee_config: Account<'info, FeeConfig>,
    pub system_program: Program<'info, System>,
    /// CHECK: Key is the FeeConfig PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}
'''
old_context='''#[derive(Accounts)]
pub struct InitializeFeeConfig<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(mut)]
    /// CHECK: Exact deployed constraint not recovered.
    pub fee_config: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: Exact deployed constraint not recovered.
    pub config_program_id: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub event_authority: UncheckedAccount<'info>,
    /// CHECK: Exact deployed constraint not recovered.
    pub program: UncheckedAccount<'info>,
}
'''
new_handler='''    pub fn initialize_fee_config(ctx: Context<InitializeFeeConfig>) -> Result<()> {
        ctx.accounts.fee_config.bump = ctx.bumps.fee_config;
        ctx.accounts.fee_config.admin = ctx.accounts.admin.key();
        let event = InitializeFeeConfigEvent {
            timestamp: Clock::get()?.unix_timestamp,
            admin: ctx.accounts.admin.key(),
            fee_config: ctx.accounts.fee_config.key(),
        };
        emit!(event);
        emit_cpi!(event);
        Ok(())
    }'''
old_handler='''    pub fn initialize_fee_config(_ctx: Context<InitializeFeeConfig>) -> Result<()> {
        Err(error!(CandidateError::Unsupported))
    }'''
new_event='''
#[event]
pub struct InitializeFeeConfigEvent {
    pub timestamp: i64,
    pub admin: Pubkey,
    pub fee_config: Pubkey,
}
'''
for rel,after,before in [('src/contexts.rs',new_context,old_context),('src/lib.rs',new_handler,old_handler),('src/types.rs',new_event,'')]:
 path='programs/pump-fees/'+rel;s=(ROOT/'crate'/rel).read_text();assert s.count(after)==1
 original=s.replace(after,before);assert sha(original.encode())==base[path], 'Scratch base differs: '+path
 patch+=list(difflib.unified_diff(original.splitlines(True),s.splitlines(True),fromfile='a/'+path,tofile='b/'+path))
(ROOT/'initializer-only.patch').write_text(''.join(patch))
build=json.loads((ROOT/'build1/build-comparison.json').read_text())
for path,digest in build['source_sha256'].items():assert sha((REPO/path).read_bytes())==digest,path
for name in ['historical-replay-comparison.json','negative-differential.json']:
 data=json.loads((ROOT/name).read_text());assert not data['mismatches'];assert data['candidate_sha256']==build['comparison']['candidate_sha256'];assert data['original_sha256']==build['comparison']['original_sha256']
 assert all(row['match'] for row in data['cases'])
 assert all(row[side].get('signature_verification') for row in data['cases'] for side in ['original','candidate'])
paths=['REPORT.md','IMPLEMENTATION.md','initializer-only.patch','base-source-sha256.json','static-evidence.json','historical-init-evidence.json','transactions/admin-success-80.json','transactions/admin-success-81.json','extract.py','summarize.py','analyze_history.py','replay_history.py','negative_differential.py','historical-replay-comparison.json','negative-differential.json','original-historical-replay.json','historical-replay-comparison-before-harness-correction.json','build1/build-comparison.json','build1/build-attempt.json','build1/build.log','build1/artifacts/pump_fees_candidate.so']
(ROOT/'implementation-hashes.json').write_text(json.dumps({name:sha((ROOT/name).read_bytes()) for name in paths if (ROOT/name).exists()},indent=2)+'\n')
print(json.dumps({'candidate_sha256':build['comparison']['candidate_sha256'],'candidate_bytes':build['comparison']['candidate_bytes'],'full_byte_equality':build['comparison']['full_byte_equality'],'initializer_cases':30,'source_inputs_verified':len(build['source_sha256']),'patch_files':3},indent=2))
