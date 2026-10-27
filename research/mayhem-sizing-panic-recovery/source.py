"""The one-file BuyV2 recovery applied to the trade-origins/validator archive."""
import io
from pathlib import PurePosixPath
import tarfile


def archived(path):
    result = {}
    with tarfile.open(fileobj=io.BytesIO(path.read_bytes()), mode='r:gz') as archive:
        for member in archive:
            name = PurePosixPath(member.name)
            assert member.isfile() and not name.is_absolute() and '..' not in name.parts
            assert str(name) == member.name and member.name not in result
            result[member.name] = archive.extractfile(member).read()
    return result


def recover(before):
    after = dict(before)
    path = 'src/instructions/buy_v2.rs'
    lines = before[path].decode().splitlines(True)
    first = next(i for i, line in enumerate(lines) if 'let retained=crate::state::retained_basis_points' in line)
    last = next(i for i, line in enumerate(lines[first:], first) if 'checked_div(' in line)
    replacement = [
        ' let retained=crate::state::retained_basis_points(retained_reserve_bps);\n',
        ' let cap=if native_accounting{a.global_params.field_2}else{a.global_params.field_11};\n',
        ' let (input,output)=crate::state::buy_amounts(vt,vs,c.real_sol_reserves,c.real_token_reserves,a.mayhem_base_token_vault.amount as u128,cap,retained);\n',
    ]
    lines[first:last + 1] = replacement + ['\n'] * (last - first + 1 - len(replacement))
    after[path] = ''.join(lines).encode()
    assert len(after) == len(before) == 67
    assert all(len(before[n].splitlines()) == len(after[n].splitlines()) for n in before)
    return after
