"""Recover the two sweep admission checks and native-rent subtraction origins."""
import gzip


def inputs(parent):
    return {str(p.relative_to(parent)).removesuffix('.gz'): gzip.decompress(p.read_bytes())
            for p in parent.rglob('*.gz')}


def recover(before):
    after = dict(before)
    path = 'src/instructions/fee_recipients.rs'
    lines = before[path].decode().splitlines(True)
    lines += ['\n'] * (434 - len(lines))
    def put(line, text):
        block = text.splitlines(True)
        assert all(not s.strip() for s in lines[line - 1:line - 1 + len(block)])
        lines[line - 1:line - 1 + len(block)] = block
    put(13, '#[event(discriminator = [218,130,134,253,101,109,149,152])]\npub struct SweepEvent { pub amount: u64, pub timestamp: i64 }\n')
    put(281, '#[inline(always)]\npub fn trader_native_amount(balance:u64,rent:u64)->u64 {\n\n                balance - rent\n}\n')
    put(355, '#[inline(always)]\npub fn admin_native_amount(balance:u64,rent:u64)->u64 {\n\n                                    balance - rent\n}\n')
    put(396, '#[inline(always)]\npub fn validate_admin_count(count:usize)->Result<()> {\n\n    require!(count == 16, crate::MayhemError::AccountTypeNotSupported);\n    Ok(())\n}\n')
    put(428, '#[inline(always)]\npub fn validate_trader_count(count:usize)->Result<()> {\n\n    require!(count == 16, crate::MayhemError::AccountTypeNotSupported);\n    Ok(())\n}\n')
    after[path] = ''.join(lines).encode()
    path = 'src/lib.rs'
    text = before[path].decode()
    old = '#[event(discriminator = [218,130,134,253,101,109,149,152])]\npub struct SweepEvent { pub amount: u64, pub timestamp: i64 }'
    assert text.count(old) == 1
    text = text.replace(old, '\npub use instructions::fee_recipients::SweepEvent;')
    old = "\nfn sweep_remaining<'info>"
    assert text.count(old) == 1
    text = text.replace(old, "\n#[inline(always)] fn sweep_remaining<'info>")
    old = 'require_eq!(remaining.len(),16,MayhemError::AccountTypeNotSupported);'
    assert text.count(old) == 1
    text = text.replace(old, 'if admin {instructions::fee_recipients::validate_admin_count(remaining.len())?;}else{instructions::fee_recipients::validate_trader_count(remaining.len())?;}')
    old = '(account.lamports() - rent.minimum_balance(account.data_len()))'
    assert text.count(old) == 1
    text = text.replace(old, '(if admin {instructions::fee_recipients::admin_native_amount(account.lamports(),rent.minimum_balance(account.data_len()))}else{instructions::fee_recipients::trader_native_amount(account.lamports(),rent.minimum_balance(account.data_len()))})')
    after[path] = text.encode()
    assert len(after) == len(before) == 67
    assert sorted(n for n in before if before[n] != after[n]) == ['src/instructions/fee_recipients.rs', 'src/lib.rs']
    return after
