"""Natural source proposal, not executed or compiled against a target.

Runtime is REQUIRED: account cursor/type decoding, borrowed AccountInfo access,
PDA syscalls, rent, genuine CPI and framework error construction. None is a
success stub. See REPORT.md for its bounded contract and failure exclusions.
Logical objects keep AccountInfo (key/owner/writable) separate from decoded data.
Methods below are context checks, not business guards or exit implementations.
"""
RELAYER = 'RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc'
USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
JUPITER = 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4'
SYSTEM = '11111111111111111111111111111111'


def require(rt, predicate, code, field=None, compared=None):
    if not predicate:
        raise rt.error(code, field, compared)


def writable(rt, a, field):
    require(rt, a.info.writable, 2000, field)


def equal(rt, actual, expected, code, field):
    require(rt, actual == expected, code, field, (actual, expected))


def stored_pda(rt, a, seeds, bump, field):
    # Original create_program_address errors become ConstraintSeeds, not
    # InvalidBump. The adapter must preserve failure before key comparison.
    derived = rt.create_program_address_or_constraint_seeds(
        seeds + [bytes([bump])], field)
    equal(rt, a.info.key, derived, 2006, field)


def canonical_pda(rt, a, seeds, field):
    derived, bump = rt.find_program_address(seeds)
    # find_program_address failure/panic is NOT converted into successful bump.
    equal(rt, a.info.key, derived, 2006, field)
    return bump


def rent_exempt(rt, a, rent, field):
    # Runtime preserves lamport/data borrow ordering and propagated borrow error.
    require(rt, rt.is_exempt_observed(rent, a.info), 2005, field)


def fixed_relayer(rt, signer):
    # Real signer flag already checked during ordered typed consumption (3010).
    writable(rt, signer, 'signer')
    equal(rt, signer.info.key, rt.key(RELAYER), 2012, 'signer')


def event_authority(rt, c):
    c['event_bump'] = canonical_pda(rt, c['event_authority'],
                                  [b'__event_authority'], 'event_authority')
    # program remains unchecked AccountInfo; do not invent executable/id checks.


def existing_ata(rt, vault, authority, mint, program, name):
    # 2023 has no field-name attachment in these generated parser branches.
    require(rt, vault.info.owner == program.info.key, 2023)
    equal(rt, vault.data.authority, authority.info.key, 2015, name)
    address = rt.associated_address(authority.info.key, program.info.key,
                                    mint.info.key)
    equal(rt, vault.info.key, address, 2009, name)
    writable(rt, vault, name)
    # No separate decoded vault.mint equality or rent check occurs here.
    # The typed token decoder still runs first; derivation includes mint key.


def mint_constraints(rt, mint, program, expected, name, code=2012):
    writable(rt, mint, name)
    equal(rt, mint.info.key, expected, code, name)
    require(rt, mint.info.owner == program.info.key, 2022)


def initialize_program_account(rt, target, payer, system_program, rent,
                               size, seeds, kind, field):
    """W151 (49 receipt), homologous W143 (98 distribution).
    Unconditional init: there is no existing-owner success path.
    System helpers carry actual CPI errors and use genuine PDA signatures.
    """
    balance = rt.lamports(target.info)
    if balance == 0:
        rt.system_create(payer.info, target.info, system_program.info,
                         rt.minimum_balance(rent, size), size, rt.program_id,
                         signer_groups=[seeds])
    else:
        equal_keys = payer.info.key == target.info.key
        require(rt, not equal_keys, 4101, None,
                (payer.info.key, target.info.key))
        needed = max(rt.minimum_balance(rent, size), 1)
        if needed > balance:
            # W151's transfer is unsigned (payer's original real signature).
            rt.system_transfer(payer.info, target.info, system_program.info,
                               needed - balance, signer_groups=[])
        rt.system_allocate(target.info, system_program.info, size,
                           signer_groups=[seeds])
        rt.system_assign(target.info, system_program.info, rt.program_id,
                         signer_groups=[seeds])
    # Owner and zero-lamport System checks still apply. Only discriminator
    # checking is skipped, not account ownership/body decoding.
    return rt.decode_program(target.info, kind, checked=False, field=field)


def initialize_ata(rt, target, payer, authority, mint, token_program,
                   system_program, associated_token_program, field):
    """W152 and homologous W144: unconditional ATA Create, not idempotent."""
    # Exactly six instruction accounts; authority does NOT sign. Actual target
    # account must agree with derived meta under the ATA/runtime contract.
    rt.ata_create(data=b'\x00', payer=payer.info, target=target.info,
                  authority=authority.info, mint=mint.info,
                  token_program=token_program.info,
                  system_program=system_program.info,
                  associated_token_program=associated_token_program.info,
                  signer_groups=[])
    return rt.decode_token(target.info, field)


# Account order and type admission precede all generated constraints.
# raw fields are consumed without decoding for deferred init. BoxMint has the
# same decoding contract as InterfaceMint plus the original allocation premise.
ORDERS = {
 142: [('distribution','Raw'),('distribution_token_account','Raw'),
       ('epoch_tracker','EpochTracker'),('debouncer','Debouncer'),
       ('debouncer_token_account','InterfaceToken'),('mint','BoxMint'),
       ('token_program','TokenInterfaceProgram'),('signer','Signer'),
       ('associated_token_program','ATAProgram'),('system_program','SystemProgram'),
       ('event_authority','Unchecked'),('program','Unchecked')],
 146: [('epoch_tracker','EpochTracker'),('debouncer','Debouncer'),
       ('distribution','Distribution'),('swap_receipt','SwapReceipt'),
       ('output_distribution_token_account','InterfaceToken'),('output_mint','BoxMint'),
       ('output_mint_program','TokenInterfaceProgram'),('signer','Signer'),
       ('associated_token_program','ATAProgram'),('system_program','SystemProgram'),
       ('event_authority','Unchecked'),('program','Unchecked')],
 148: [('epoch_tracker','EpochTracker'),('debouncer','Debouncer'),
       ('distribution','Distribution'),('distribution_token_account','InterfaceToken'),
       ('mint','BoxMint'),('signer','Signer'),('token_program','TokenInterfaceProgram'),
       ('associated_token_program','ATAProgram'),('system_program','SystemProgram'),
       ('event_authority','Unchecked'),('program','Unchecked')],
 150: [('epoch_tracker','EpochTracker'),('debouncer','Debouncer'),
       ('distribution','Distribution'),('swap_receipt','Raw'),
       ('distribution_token_account','InterfaceToken'),
       ('output_distribution_token_account','Raw'),('mint','BoxMint'),
       ('output_mint','BoxMint'),('output_mint_program','TokenInterfaceProgram'),
       ('signer','Signer'),('token_program','TokenInterfaceProgram'),
       ('jupiter_program','Unchecked'),('associated_token_program','ATAProgram'),
       ('system_program','SystemProgram'),('event_authority','Unchecked'),('program','Unchecked')],
 154: [('epoch_tracker','EpochTracker'),('debouncer','Debouncer'),
       ('distribution','Distribution'),('distribution_token_account','InterfaceToken'),
       ('output_distribution_token_account','Raw'),('mint','BoxMint'),
       ('output_mint','BoxMint'),('output_mint_program','TokenInterfaceProgram'),
       ('signer','Signer'),('token_program','TokenInterfaceProgram'),
       ('jupiter_program','Unchecked'),('associated_token_program','ATAProgram'),
       ('system_program','SystemProgram'),('event_authority','Unchecked'),('program','Unchecked')],
 156: [('mint_whitelist','Raw'),('signer','Signer'),('system_program','SystemProgram')]
}


def consume(rt, cursor, ordinal):
    c = {}
    for name, kind in ORDERS[ordinal]:
        # Must consume one at a time: insufficient account 3005 at its real
        # position, not a preflight count check ahead of earlier type errors.
        c[name] = rt.consume_typed(cursor, kind, name)
    c['remaining'] = cursor.remaining_view()
    return c


def distribution_seeds(rt, c, mint_key):
    d = c['distribution']; t = c['epoch_tracker']; b = c['debouncer']
    stored_pda(rt, t, [b'epoch_tracker_v1', d.data.config_id, mint_key],
               t.data.bump, 'epoch_tracker')
    stored_pda(rt, b, [b'debouncer_v1', d.data.config_id, mint_key],
               b.data.bump, 'debouncer')
    stored_pda(rt, d, [b'distribution_v1', d.data.config_id, d.data.mint,
                      d.data.epoch.to_bytes(16, 'little')], d.data.bump, 'distribution')
    writable(rt, d, 'distribution')


def not_close_destination(rt, account, signer, name):
    require(rt, account.info.key != signer.info.key, 2011, name)


def parse_swap(rt, cursor, just):
    c = consume(rt, cursor, 150 if just else 154)
    d, signer = c['distribution'], c['signer']
    if just:
        rent = rt.rent_get()
        bump = canonical_pda(rt, c['swap_receipt'],
                             [b'swap_receipt_v1', d.info.key], 'swap_receipt')
        c['receipt_bump'] = bump
        c['swap_receipt'] = initialize_program_account(
            rt, c['swap_receipt'], signer, c['system_program'], rent, 49,
            [b'swap_receipt_v1', d.info.key, bytes([bump])],
            'SwapReceipt', 'swap_receipt')
        writable(rt, c['swap_receipt'], 'swap_receipt')
        rent_exempt(rt, c['swap_receipt'], rent, 'swap_receipt')
    rent = rt.rent_get()  # separate observation even in just-swap
    c['output_distribution_token_account'] = initialize_ata(
        rt, c['output_distribution_token_account'], signer, d, c['output_mint'],
        c['output_mint_program'], c['system_program'], c['associated_token_program'],
        'output_distribution_token_account')
    writable(rt, c['output_distribution_token_account'], 'output_distribution_token_account')
    rent_exempt(rt, c['output_distribution_token_account'], rent, 'output_distribution_token_account')
    distribution_seeds(rt, c, d.data.mint)
    if not just:
        not_close_destination(rt, d, signer, 'distribution')
    existing_ata(rt, c['distribution_token_account'], d, c['mint'],
                 c['token_program'], 'distribution_token_account')
    mint_constraints(rt, c['mint'], c['token_program'], d.data.mint, 'mint')
    mint_constraints(rt, c['output_mint'], c['output_mint_program'],
                     rt.key(USDC), 'output_mint')
    fixed_relayer(rt, signer)
    equal(rt, c['jupiter_program'].info.key, rt.key(JUPITER), 2012, 'jupiter_program')
    event_authority(rt, c)
    return c


def parse_distribution(rt, cursor, after_swap):
    c = consume(rt, cursor, 146 if after_swap else 148)
    d, signer = c['distribution'], c['signer']
    # Non-swap's tracker/debouncer seeds use the supplied mint, not d.mint.
    seed_mint = d.data.mint if after_swap else c['mint'].info.key
    distribution_seeds(rt, c, seed_mint)
    not_close_destination(rt, d, signer, 'distribution')
    if after_swap:
        receipt = c['swap_receipt']
        stored_pda(rt, receipt, [b'swap_receipt_v1', d.info.key],
                   receipt.data.bump, 'swap_receipt')
        writable(rt, receipt, 'swap_receipt')
        # 6033 has account-name metadata, no compared-keys attachment here.
        require(rt, receipt.data.distribution == d.info.key, 6033, 'swap_receipt')
        not_close_destination(rt, receipt, signer, 'swap_receipt')
        vault, mint, program = ('output_distribution_token_account','output_mint','output_mint_program')
    else:
        vault, mint, program = ('distribution_token_account','mint','token_program')
    existing_ata(rt, c[vault], d, c[mint], c[program], vault)
    mint_constraints(rt, c[mint], c[program], rt.key(USDC), mint, code=6006)
    fixed_relayer(rt, signer)
    event_authority(rt, c)
    return c


def parse_close_epoch(rt, cursor, argument_bytes):
    # Parser142 re-decodes first48 bytes: config32, epoch LE16. Original wrapper
    # argument decoding also precedes this. No final-exhaustion check.
    if len(argument_bytes) < 48:
        raise rt.error(102, None, None)
    config = argument_bytes[:32]
    epoch_bytes = argument_bytes[32:48]
    c = consume(rt, cursor, 142)
    mint, signer = c['mint'], c['signer']
    rent = rt.rent_get()
    seeds = [b'distribution_v1', config, mint.info.key, epoch_bytes]
    bump = canonical_pda(rt, c['distribution'], seeds, 'distribution')
    c['distribution_bump'] = bump
    c['distribution'] = initialize_program_account(
        rt, c['distribution'], signer, c['system_program'], rent, 98,
        seeds + [bytes([bump])], 'Distribution', 'distribution')
    writable(rt, c['distribution'], 'distribution')
    rent_exempt(rt, c['distribution'], rent, 'distribution')
    rent = rt.rent_get()
    c['distribution_token_account'] = initialize_ata(
        rt, c['distribution_token_account'], signer, c['distribution'], mint,
        c['token_program'], c['system_program'], c['associated_token_program'],
        'distribution_token_account')
    writable(rt, c['distribution_token_account'], 'distribution_token_account')
    rent_exempt(rt, c['distribution_token_account'], rent, 'distribution_token_account')
    for name, prefix in [('epoch_tracker', b'epoch_tracker_v1'), ('debouncer', b'debouncer_v1')]:
        a = c[name]
        stored_pda(rt, a, [prefix, config, mint.info.key], a.data.bump, name)
        writable(rt, a, name)
    existing_ata(rt, c['debouncer_token_account'], c['debouncer'], mint,
                 c['token_program'], 'debouncer_token_account')
    mint_constraints(rt, mint, c['token_program'], c['debouncer'].data.mint, 'mint')
    fixed_relayer(rt, signer)
    event_authority(rt, c)
    return c


def parse_whitelist(rt, cursor):
    c = consume(rt, cursor, 156)
    rent = rt.rent_get()
    a = c['mint_whitelist']
    bump = canonical_pda(rt, a, [b'mint_whitelist_v1'], 'mint_whitelist')
    c['whitelist_bump'] = bump
    if a.info.owner == rt.key(SYSTEM):
        a = initialize_program_account(
            rt, a, c['signer'], c['system_program'], rent, 1037,
            [b'mint_whitelist_v1', bytes([bump])], 'MintWhitelist', 'mint_whitelist')
    else:
        a = rt.decode_program(a.info, 'MintWhitelist', checked=True, field='mint_whitelist')
    require(rt, rt.data_length(a.info) == 1037, 2019, 'mint_whitelist')
    equal(rt, a.info.owner, rt.program_id, 2004, 'mint_whitelist')
    rent_exempt(rt, a, rent, 'mint_whitelist')
    c['mint_whitelist'] = a
    writable(rt, a, 'mint_whitelist')
    rent_exempt(rt, a, rent, 'mint_whitelist')
    fixed_relayer(rt, c['signer'])
    return c
