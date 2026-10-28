"""Restore the original shared-holder validation boundary and same-op Sources."""
from pathlib import Path
import difflib, hashlib, json, re, shutil
D = Path(__file__).resolve().parent
base = D / 'source-admin-positioned'
out = D / 'source-admin-shared-guard'
assert not out.exists()
shutil.copytree(base, out)
rel = 'programs/pump/src/creator/admin_cto.rs'
p = out / rel
before = p.read_text()
assert hashlib.sha256(before.encode()).hexdigest() == '616178770baa93f6e70a1a87378b88922e30d2c1a878ac5e4f625018ce6a2ec7'
lines = before.splitlines()
amm_frozen, amm_guard, amm_cpi = lines[411:414]
assert 'let shared_amm_frozen' in amm_frozen and 'CtoSharedVaultFrozen' in amm_guard
assert 'transfer_creator_fees_to_pump_v2' in amm_cpi
lines[411:414] = ['', '', '']
assert 'let amount=' in lines[556] and 'CtoSharedVaultFrozen' in lines[556]
lines[556] = ' let mut swept=0;'
assert lines[646] == ' if shared && holder && amount>0{'
seeds = lines[647]
native_pay = lines[648:650]
assert 'ConstraintSeeds' in seeds and 'transfer_native' in native_pay[1]
tail = lines[651:]
lines = lines[:646]
def put(line, text):
    assert len(lines) < line
    lines.extend([''] * (line - 1 - len(lines)))
    lines.append(text)
put(647, ' if shared && holder{')
put(648, seeds)
put(649, '  ' + amm_frozen.strip().replace('shared&&holder&&', '', 1))
put(660, '  ' + amm_guard.strip())
put(661, '  ' + amm_cpi.strip().replace('shared&&holder&&', '', 1))
put(662, '  let native=a.bonding_curve.quote_mint==Pubkey::default();let rent=Rent::get()?.minimum_balance(0);')
put(663, '  let amount=if native{a.creator_vault.lamports().saturating_sub(rent)}else if !a.creator_vault_quote_token_account.data_is_empty(){')
put(664, '   let amount=token_raw_amount(&a.creator_vault_quote_token_account.to_account_info())?;let frozen=token_frozen(&a.creator_vault_quote_token_account.to_account_info())?;')
put(719, '   require!(!frozen||amount==0,PumpError::CtoSharedVaultFrozen);')
put(720, '   amount}else{0};')
put(721, '  let bump=[ctx.bumps.creator_vault];let vaultseeds:&[&[u8]]=&[b"creator-vault",old.as_ref(),&bump];')
put(722, '  if amount>0{')
lines.extend(native_pay)
lines.extend(['  }', ' }'])
lines.extend(tail)
after = '\n'.join(lines) + '\n'
def sites(s):
    return [(i, m.group(0)) for i, l in enumerate(s.splitlines(), 1)
            for m in re.finditer(r'(?:PumpError|ErrorCode)::[A-Za-z0-9_]+', l)
            if m.group(0) != 'PumpError::CtoSharedVaultFrozen']
assert sites(before) == sites(after), (sites(before), sites(after))
assert [(i, l.strip()) for i, l in enumerate(after.splitlines(), 1) if 'CtoSharedVaultFrozen' in l] == [
    (660, amm_guard.strip()), (719, 'require!(!frozen||amount==0,PumpError::CtoSharedVaultFrozen);')]
p.write_text(after)
patch = ''.join(difflib.unified_diff(before.splitlines(True), after.splitlines(True), 'a/'+rel, 'b/'+rel))
(D / 'admin-shared-guard.patch').write_text(patch)
receipt = {'control_source_sha256': hashlib.sha256(before.encode()).hexdigest(),
           'candidate_source_sha256': hashlib.sha256(after.encode()).hexdigest(),
           'patch_sha256': hashlib.sha256(patch.encode()).hexdigest(),
           'all_other_error_variant_source_lines_unchanged': True,
           'disclosure': 'Blank-line placement deliberately restores the same observed validation Sources648/660/719; the shared-holder seeds guard is restored before amount and frozen checks. No synthetic helper or unused body.'}
(D / 'admin-shared-guard-source.json').write_text(json.dumps(receipt, indent=2)+'\n')
print(json.dumps(receipt, indent=2))
