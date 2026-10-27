"""Controls for false signature, intent, payload and scope claims."""
import base64
import copy
import json
import struct
import verify as v
from solders.keypair import Keypair
from solders.transaction import Transaction
from solders.instruction import Instruction


def main():
    v.check_bindings()
    candidate, original = v.check_builds()
    d = v.HERE / 'loader-first'
    baseline = json.loads(v.unpack(d / 'receipt.json.gz'))
    image = v.unpack(d / 'programdata.bin.gz')
    v.check_loader(baseline, image, candidate, original)
    def rejected(label, report, data, reason):
        try:
            v.check_loader(report, data, candidate, original)
        except AssertionError as error:
            assert reason is None or reason in str(error), (label, str(error))
            print('PASS negative:', label)
        else:
            raise AssertionError('accepted '+label)
    report = copy.deepcopy(baseline)
    row = report['receipts'][1]
    raw = bytearray(base64.b64decode(row['transaction_base64']))
    raw[1] ^= 1  # Actual signature, with redundant text updated to avoid a shallow failure.
    tx = Transaction.from_bytes(bytes(raw))
    row.update(transaction_base64=base64.b64encode(bytes(tx)).decode(), signatures=[str(s) for s in tx.signatures])
    rejected('corrupted cryptographic signature', report, image, 'transaction signature')

    expected = list(v.expected_instructions(candidate, len(original)))
    payer = Keypair.from_seed(bytes([61])*32)
    program = Keypair.from_seed(bytes([63])*32)
    def resigned(index, instructions, signers):
        report = copy.deepcopy(baseline)
        row = report['receipts'][index]
        previous = Transaction.from_bytes(base64.b64decode(row['transaction_base64']))
        tx = Transaction.new_signed_with_payer(instructions, payer.pubkey(), signers, previous.message.recent_blockhash)
        assert all(tx.verify_with_results()), 'control must have valid signatures'
        row.update(transaction_base64=base64.b64encode(bytes(tx)).decode(), signatures=[str(s) for s in tx.signatures])
        return report
    instructions = expected[1][1].copy()
    old = instructions[0]
    data = bytearray(old.data); data[-1] ^= 1
    instructions[0] = Instruction(old.program_id, bytes(data), old.accounts)
    rejected('valid signature but wrong compiler byte', resigned(1, instructions, [payer]), image, 'signed instruction intent')
    instructions = expected[-1][1].copy()
    old = instructions[-1]
    instructions[-1] = Instruction(old.program_id, struct.pack('<IQ', 2, len(original)+1), old.accounts)
    rejected('valid signatures but wrong deployment capacity', resigned(-1, instructions, [payer, program]), image, 'signed instruction intent')

    report = copy.deepcopy(baseline)
    corrupted = image[:-1] + bytes([image[-1]^1])
    report['programdata_sha256'] = v.sha(corrupted)
    report['payload_sha256'] = v.sha(corrupted[45:])
    rejected('rehashed nonzero allocation tail', report, corrupted, 'loader payload')
    report = copy.deepcopy(baseline)
    report['programdata_equals_capture'] = True
    rejected('synthetic metadata mislabeled as captured account', report, image, None)
    print('PASS: five falsification controls; no preserved artifact changed')


if __name__ == '__main__':
    main()
