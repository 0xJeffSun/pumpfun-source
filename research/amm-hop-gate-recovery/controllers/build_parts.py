from pathlib import Path
import json,shutil,subprocess,os,hashlib,datetime
G=Path('/home/ahi200/pumpfun-work/20261028-amm-incentive-regression');D=Path('/home/ahi200/pumpfun-work/20261028-amm-helper-recovery');H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk');H.mkdir(exist_ok=True);src=H/'source-cpi-parts';shutil.copytree(G/'source-guard',src);out=H/'cpi-parts';out.mkdir()
p=src/'programs/pump-amm/src/curve/fees.rs';base=p.read_text();old=(D/'source-select-slot-order/programs/pump-amm/src/curve/fees.rs').read_text();start=old.index("pub fn select_and_apply<'info>(");end=old.index('\nfn tier(',start);header=old[start:old.index('    let mut selected =',start)];tail=old[old.index('    if global_config.creator_fee_configurable',start):end];body='''    let mut selected = select_cpi_for_canonical(
        fee_program.to_account_info(), fee_config.to_account_info(), config_program.clone(),
        { let authority; let seeds: &[&[u8]] = &[b"pool-authority", pool.base_mint.as_ref()]; authority = Pubkey::find_program_address(seeds, &trade::PUMP).0; pool.creator == authority },
        pool, base_mint.supply, base_reserve, quote_reserve,
    )?;
''';helper='''
fn select_cpi_for_canonical<'info>(
    program: AccountInfo<'info>,
    fee_config: AccountInfo<'info>,
    config_program_id: AccountInfo<'info>,
    canonical: bool,
    pool: &Pool,
    base_supply: u64,
    base_reserve: u64,
    quote_reserve: u64,
) -> Result<crate::pump_fees::types::Fees> {
    Ok(crate::pump_fees::cpi::get_fees_with_quote_mint(
        CpiContext::new(program, crate::pump_fees::cpi::accounts::GetFeesWithQuoteMint {
            fee_config, config_program_id,
        }), canonical, pool.market_cap(base_supply, base_reserve, quote_reserve)?, pool.quote_mint)?.get())
}
''';new=header+body+tail.rstrip()+helper;oldstart=base.index("pub fn select_and_apply<'info>(");oldend=base.index('\nfn tier(',oldstart);delta=base[oldstart:oldend].count('\n')-new.count('\n');assert delta>=0;p.write_text(base[:oldstart]+new+'\n'*delta+base[oldend:])
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inv=lambda p:{q.relative_to(p).as_posix():sha(q) for q in p.rglob('*') if q.is_file()};prior=json.loads((G/'guard/launch.json').read_text());cmd=[x.replace(str(G/'source-guard')+':',str(src)+':') for x in prior['command']];inputs=inv(src);deps={p.relative_to(W/'build-target').as_posix():sha(p) for p in (W/'build-target').rglob('*') if p.is_file() and p.suffix in ['.rlib','.rmeta','.a','.so'] and 'pump_amm_recovered' not in p.name};os.utime(src/'programs/pump-amm/src/lib.rs',None);launch={'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':cmd,'inputs':inputs,'dependencies_before':deps,'tools':prior['tools'],'controller_sha256':sha(Path(__file__)),'hypothesis':'Prior canonical helper eliminates duplicated Result payload load but promotes global_config flag and moves184B context. New narrow helper owns only CPI/market-cap, accepts the three already-cloned account parts rather than whole context, and returns Fees before caller reads global_config. Preserve clone/PDA/cap evaluation order.'};(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
with (out/'build.log').open('wb') as log:r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
lines=(out/'build.log').read_text().splitlines();count=sum(l.strip().startswith('Running `') and '--crate-name pump_amm_recovered ' in l for l in lines);result={'returncode':r.returncode,'actual_root_invocations':count,'source_unchanged':inv(src)==inputs,'dependencies_unchanged':all(sha(W/'build-target'/p)==v for p,v in deps.items())};(out/'result.json').write_text(json.dumps(result,indent=2));r.check_returncode();assert count==1 and result['source_unchanged'] and result['dependencies_unchanged'];shutil.copyfile(W/'build-target/sbpf-solana-solana/release/pump_amm_recovered.so',out/'symbols.so');subprocess.run([str(S/'llvm/bin/llvm-objcopy'),'--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True);result.update(symbols_sha256=sha(out/'symbols.so'),candidate_sha256=sha(out/'candidate.so'));(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
