"""Normal-resource wire hypothesis, not an original error-object ABI or fixture."""
class InstructionDidNotDeserialize(ValueError):
    code = 102

def decode(payload, combined=False):
    cursor = 0
    def take(n):
        nonlocal cursor
        if n > len(payload) - cursor:
            raise InstructionDidNotDeserialize()
        out = payload[cursor:cursor+n]
        cursor += n
        return out
    def u32(): return int.from_bytes(take(4), 'little')
    data = take(u32())
    shares = []
    if combined:
        count = u32()
        for _ in range(count):
            tag = take(1)[0]
            if tag >= 3: raise InstructionDidNotDeserialize()
            address = take(32)
            bps = int.from_bytes(take(2), 'little')
            shares.append((tag, address, bps))
    # Original wrappers do not require exhaustion; suffix is exposed here for review.
    return data, shares, payload[cursor:]
