"""Authenticate recorded trade transactions and executable program hashes."""
import base64
import re
from solders.transaction import Transaction

PROGRAM = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'


def logs(result):
    return [s for s in result['metadata']['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]


def attest(result, expected):
    tx=Transaction.from_bytes(base64.b64decode(result['transaction_base64']))
    assert all(tx.verify_with_results())
    for phase in ('before','after'):
        a=result[phase][PROGRAM]
        assert a['executable'] and a['data_sha256']==expected
