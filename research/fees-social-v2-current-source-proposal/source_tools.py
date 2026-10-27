"""Strict source-only verification/materialization. No network or subprocesses."""
from pathlib import Path, PurePosixPath
import hashlib
import json
import re

REVISION = '0e8fa80aa560862bb8d2ed1df6e48add8271959b'
CHANGES = {'programs/pump-fees/src/instructions/fee_sharing/mod.rs', 'programs/pump-fees/src/social.rs'}
HUNK = re.compile(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@')

def sha(data):
    return hashlib.sha256(data).hexdigest()

def relative(value):
    if not isinstance(value, str):
        raise ValueError('Unsafe source path')
    p = PurePosixPath(value)
    if not value or p.is_absolute() or '..' in p.parts or '\\' in value or str(p) != value:
        raise ValueError('Unsafe source path')
    return p

def read_under(root, name):
    relative(name)
    root = Path(root).resolve()
    p = root / name
    if not p.resolve().is_relative_to(root):
        raise ValueError('Source path escapes root')
    if any(x.is_symlink() for x in [p, *list(p.parents)[:len(PurePosixPath(name).parts) - 1]]):
        raise ValueError('Symlink source input is not accepted')
    return p.read_bytes()

def inventory(root):
    root = Path(root)
    result = {}
    for p in root.rglob('*'):
        if p.is_symlink():
            raise ValueError('Symlink source input is not accepted')
        if p.is_file():
            result[str(p.relative_to(root))] = sha(p.read_bytes())
    return result

def parse_patch(text):
    lines = text.splitlines(keepends=True)
    result = {}
    i = 0
    while i < len(lines):
        if not lines[i].startswith('--- a/') or i + 1 >= len(lines) or not lines[i + 1].startswith('+++ b/'):
            raise ValueError('Expected paired source headers')
        old = lines[i][6:].rstrip('\n')
        new = lines[i + 1][6:].rstrip('\n')
        relative(old)
        relative(new)
        if old != new or new in result:
            raise ValueError('Only distinct ordinary same-path source patches are accepted')
        i += 2
        hunks = []
        while i < len(lines) and lines[i].startswith('@@ '):
            m = HUNK.match(lines[i])
            if not m:
                raise ValueError('Malformed hunk')
            a, ac, b, bc = (int(m.group(1)), int(m.group(2) or 1), int(m.group(3)), int(m.group(4) or 1))
            i += 1
            body, ao, bo = [], 0, 0
            while ao < ac or bo < bc:
                if i >= len(lines) or lines[i][:1] not in [' ', '+', '-']:
                    raise ValueError('Truncated hunk')
                line = lines[i]
                ao += line[0] in ' -'
                bo += line[0] in ' +'
                if ao > ac or bo > bc:
                    raise ValueError('Hunk extent mismatch')
                body.append(line)
                i += 1
            hunks.append((a, ac, b, bc, body))
        if not hunks:
            raise ValueError('Source patch has no hunks')
        result[new] = hunks
    return result

def apply_file(data, hunks, reverse=False):
    lines = data.decode('utf8').splitlines(keepends=True)
    out, cursor = [], 0
    for a, ac, b, bc, body in hunks:
        start = (b if reverse else a)
        index = max(0, start - 1)
        if index < cursor or index > len(lines):
            raise ValueError('Invalid or overlapping source hunk')
        out.extend(lines[cursor:index])
        cursor = index
        for line in body:
            sign = line[0]
            if reverse:
                sign = {'+': '-', '-': '+', ' ': ' '}[sign]
            content = line[1:]
            if sign in ' -':
                if cursor >= len(lines) or lines[cursor] != content:
                    raise ValueError('Source hunk does not match')
                cursor += 1
            if sign in ' +':
                out.append(content)
    out.extend(lines[cursor:])
    return ''.join(out).encode()

def verify(package):
    package = Path(package)
    allowed = {'README.md', 'manifest.json', 'source.patch', 'source_tools.py',
               'verify.py', 'materialize.py', 'test_scope.py'} | {'overrides/' + k for k in CHANGES}
    actual = {str(p.relative_to(package)) for p in package.rglob('*') if p.is_file()}
    if actual != allowed:
        raise ValueError('Packet must contain only the declared ordinary source files')
    m = json.loads(read_under(package, 'manifest.json'))
    if m['schema'] != 1 or m['source_revision'] != REVISION:
        raise ValueError('Wrong public source revision')
    if m['runtime_verified'] or m['native_build_verified'] or m['whole_binary_identity_verified']:
        raise ValueError('Source packet cannot attest runtime/build/binary equality')
    if len(m['before']) != 43 or len(m['after']) != 43 or set(m['changes']) != CHANGES or set(m['overrides']) != CHANGES:
        raise ValueError('Unexpected source delta')
    for name, row in m['before'].items():
        relative(name)
        relative(row['repository_path'])
        if row['revision'] != REVISION or row['encoding'] != 'gzip':
            raise ValueError('Unexpected public compressed-source provenance')
        if row['repository_path'] != 'research/fees-v2-transfer-source-recovery/sources/' + name + '.gz':
            raise ValueError('Unexpected public source locator')
        if not re.fullmatch('[0-9a-f]{64}', row['stored_sha256']) or not re.fullmatch('[0-9a-f]{40}', row['git_blob']):
            raise ValueError('Malformed stored source hash')
        if not re.fullmatch('[0-9a-f]{40}', row['revision']):
            raise ValueError('Invalid pinned public source revision')
        if not re.fullmatch('[0-9a-f]{64}', row['sha256']):
            raise ValueError('Invalid source hash')
    for name, digest in m['after'].items():
        relative(name)
        if not re.fullmatch('[0-9a-f]{64}', digest):
            raise ValueError('Invalid source hash')
    before = {k: v['sha256'] for k, v in m['before'].items()}
    if {k for k in set(before) | set(m['after']) if before.get(k) != m['after'].get(k)} != CHANGES:
        raise ValueError('Unexpected unchanged-source drift')
    patch = read_under(package, 'source.patch')
    if sha(patch) != m['patch_sha256']:
        raise ValueError('Patch hash mismatch')
    hunks = parse_patch(patch.decode())
    if set(hunks) != CHANGES:
        raise ValueError('Unexpected patch paths')
    sources = {}
    restored = {}
    for name in sorted(CHANGES):
        if m['overrides'][name] != 'overrides/' + name:
            raise ValueError('Unexpected override location')
        data = read_under(package, m['overrides'][name])
        if sha(data) != m['after'][name]:
            raise ValueError('Override hash mismatch')
        old = apply_file(data, hunks[name], reverse=True)
        if name in before:
            if sha(old) != before[name]:
                raise ValueError('Reverse patch does not recover public parent hash')
        elif old:
            raise ValueError('New source file reverse patch is not empty')
        if apply_file(old, hunks[name]) != data:
            raise ValueError('Source patch does not round trip')
        sources[name], restored[name] = data, old
    base = 'programs/pump-fees/src/'
    social = sources[base+'social.rs'].decode()
    prior = restored[base+'social.rs'].decode()
    legacy = ' pub fn claim(ctx:Context<ClaimSocialFeePda>'
    if social[social.index(legacy):] != prior[prior.index(legacy):]:
        raise ValueError('Legacy claim/account declarations changed')
    v2 = social[:social.index(legacy)]
    expected = ['disable_flags&2!=0', 'msg!("ClaimSocialFeePda is currently disabled")',
                'rate_limit!=0 && state.last_claimed!=0 && now<state.last_claimed.saturating_add(rate_limit)',
                'msg!("Claim rate limit exceeded")', 'if ctx.accounts.recipient.executable',
                'let native=ctx.accounts.quote_mint.key()']
    offsets = [v2.index(value) for value in expected]
    if offsets != sorted(offsets):
        raise ValueError('V2 admission ordering differs')
    for value in ['**from=(**from).saturating_sub(amount)', '**to=(**to).saturating_add(amount)',
                  'after=before.saturating_add(amount)', 'state.total_stable_claimed.saturating_add(amount)']:
        if value not in v2:
            raise ValueError('V2 saturating arithmetic differs')
    if v2.count('if amount==0 {msg!("No fees available to claim");return Ok(None);}') != 2:
        raise ValueError('Native/token zero diagnostics differ')
    helper = sources[base+'instructions/fee_sharing/mod.rs'].decode()
    previous = restored[base+'instructions/fee_sharing/mod.rs'].decode()
    for name in ['preprocess_remaining', 'legacy_authorize']:
        def function(text):
            start = text.index('pub fn '+name)
            return text[start:text.index('\n}', start)+2]
        if function(helper) != function(previous):
            raise ValueError('Prior helper body changed')
    lines = helper.splitlines()
    prior_lines = previous.splitlines()
    for first, last in [(51, 88), (94, 101)]:
        if lines[first-1:last] != prior_lines[first-1:last]:
            raise ValueError('Previously recovered helper source coordinates changed')
    for line, content in {
        273:'    require_keys_eq!(*associated_account.key, expected, anchor_lang::error::ErrorCode::ConstraintSeeds);',
        278:'        require!(create_if_missing, anchor_lang::error::ErrorCode::AccountNotInitialized);',
        299:'    require_keys_eq!(*associated_account.owner, *token_program, FeeError::AccountTypeNotSupported);',
        306:'    require_keys_eq!(account.mint, *mint, FeeError::InvalidMint);',
    }.items():
        if lines[line-1] != content:
            raise ValueError('Actual helper Source coordinate changed')
    for name in ['Cargo.toml', 'Cargo.lock', 'programs/pump-fees/Cargo.toml', 'pump-fees-math/Cargo.toml']:
        if before[name] != m['after'][name]:
            raise ValueError('Package/dependency drift')
    return m, sources

def materialize(package, parent, output):
    m, overrides = verify(package)
    parent, output = Path(parent), Path(output)
    if output.exists() or output.is_symlink():
        raise ValueError('Output must not exist')
    if any(p.is_symlink() for p in output.absolute().parents):
        raise ValueError('Symlink output ancestor is not accepted')
    if output.resolve().is_relative_to(parent.resolve()):
        raise ValueError('Output must be outside parent source')
    expected = {k: v['sha256'] for k, v in m['before'].items()}
    if inventory(parent) != expected:
        raise ValueError('Parent source differs from exact public43-input map')
    contents = {k: read_under(parent, k) for k in expected}
    contents.update(overrides)
    if {k: sha(v) for k, v in contents.items()} != m['after']:
        raise ValueError('Materialized source map mismatch')
    output.mkdir(parents=True)
    for name, data in sorted(contents.items()):
        p = output / name
        p.parent.mkdir(parents=True, exist_ok=True)
        with p.open('xb') as f:
            f.write(data)
    if inventory(output) != m['after']:
        raise ValueError('Written source map mismatch')
    return {'source_files': len(contents), 'source_verified': True,
            'runtime_verified': False, 'native_build_verified': False,
            'whole_binary_identity_verified': False}
