"""Exact Cargo-profile controls; baseline Rust source is never edited."""
VARIANTS = ('baseline', 'alloc-provider', 'error-provider', 'both-providers',
            'alloc-provider-yes', 'error-provider-yes', 'both-providers-yes')


def control_source(sources, label):
    if label == 'portable-repeat':
        label = 'alloc-provider'
    if label not in VARIANTS:
        raise ValueError('unknown control')
    result = dict(sources)
    data = result['Cargo.toml']
    if label == 'baseline':
        return result
    mode = 'yes' if label.endswith('-yes') else 'no'
    if label.startswith(('error-', 'both-')):
        old = b'rustflags = ["--remap-path-prefix=curve-accounts/="]'
        if data.count(old) != 1:
            raise ValueError('curve-accounts profile differs')
        data = data.replace(old, ('rustflags = ["--remap-path-prefix=curve-accounts/=", '
                                 '"-Zshare-generics=' + mode + '"]').encode())
    if label.startswith(('alloc-', 'both-')):
        data += ('\n[profile.release.package.solana-instructions-sysvar]\n'
                 'rustflags = ["-Zshare-generics=' + mode + '"]\n').encode()
    result['Cargo.toml'] = data
    return result
