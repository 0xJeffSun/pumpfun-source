"""Read-only ELF/archive helpers shared by the build controller and verifier."""
import hashlib
import struct

ARCHIVE = 'libnative_transfer_fee-0b711fd86d68d989.rlib'
SYMBOL = '_ZN19native_transfer_fee19supported_mint_data17h5fb4a324adde392fE'

def require(condition, message):
    if not condition:
        raise ValueError(message)

def sha(data):
    return hashlib.sha256(data).hexdigest()

def sections(data):
    require(data[:6] == b'\x7fELF\x02\x01' and len(data) >= 64, 'ELF64 little-endian header')
    offset = struct.unpack_from('<Q', data, 40)[0]
    size, count, names_index = struct.unpack_from('<HHH', data, 58)
    require(size == 64 and 0 < names_index < count and offset + count * size <= len(data), 'section table bounds')
    rows = [struct.unpack_from('<IIQQQQIIQQ', data, offset + i * size) for i in range(count)]
    for row in rows:
        require(row[1] == 8 or row[4] + row[5] <= len(data), 'section contents bounds')
    row = rows[names_index]
    names = data[row[4]:row[4] + row[5]]
    return rows, [names[row[0]:].split(b'\0', 1)[0].decode() for row in rows]

def functions(data):
    require(struct.unpack_from('<H', data, 16)[0] == 1, 'relocatable object required')
    rows, names = sections(data)
    result = {}
    for row in rows:
        if row[1] != 2:
            continue
        require(row[9] == 24 and row[5] % 24 == 0 and row[6] < len(rows), 'symbol table bounds')
        strings_row = rows[row[6]]
        strings = data[strings_row[4]:strings_row[4] + strings_row[5]]
        for at in range(row[4], row[4] + row[5], 24):
            name, info, _, index, value, length = struct.unpack_from('<IBBHQQ', data, at)
            if info & 15 != 2 or not length:
                continue
            require(0 < index < len(rows) and name < len(strings), 'function symbol bounds')
            section = rows[index]
            require(value + length <= section[5], 'function extent')
            name = strings[name:].split(b'\0', 1)[0].decode()
            require(name not in result, 'unique function symbol')
            result[name] = dict(data=data[section[4] + value:section[4] + value + length],
                                section=index, section_name=names[index], value=value, size=length)
    return result

def relocation_patterns(data):
    rows, names = sections(data)
    result = {}
    for row in rows:
        if row[1] not in (4, 9):
            continue
        require(row[6] < len(rows) and row[7] < len(rows), 'relocation section links')
        symbols = rows[row[6]]
        require(symbols[1] == 2 and symbols[9] == 24, 'relocation symbol table')
        strings_row = rows[symbols[6]]
        strings = data[strings_row[4]:strings_row[4] + strings_row[5]]
        width = 24 if row[1] == 4 else 16
        require(row[9] == width and row[5] % width == 0, 'relocation entry width')
        records = []
        for at in range(row[4], row[4] + row[5], width):
            offset, info = struct.unpack_from('<QQ', data, at)
            index = info >> 32
            require((index + 1) * 24 <= symbols[5], 'relocation symbol bounds')
            string_offset = struct.unpack_from('<I', data, symbols[4] + index * 24)[0]
            name = strings[string_offset:].split(b'\0', 1)[0].decode()
            addend = struct.unpack_from('<q', data, at + 16)[0] if width == 24 else None
            records.append((offset, info & 0xffffffff, name, addend))
        result[names[row[7]]] = records
    return result

def archive_members(data):
    require(data.startswith(b'!<arch>\n'), 'archive header')
    at = 8
    strings = b''
    result = {}
    while at < len(data):
        header = data[at:at + 60]
        require(len(header) == 60 and header[58:60] == b'`\n', 'archive member header')
        size = int(header[48:58])
        name = header[:16].decode().strip()
        body = data[at + 60:at + 60 + size]
        require(len(body) == size, 'archive member bounds')
        at += 60 + size + (size % 2)
        if name == '//':
            strings = body
            continue
        if name in ('/', '/SYM64/'):
            continue
        if name.startswith('#1/'):
            length = int(name[3:]); name = body[:length].rstrip(b'\0').decode(); body = body[length:]
        elif name.startswith('/') and name[1:].isdigit():
            offset = int(name[1:]); require(offset < len(strings), 'archive long-name bounds')
            name = strings[offset:].split(b'/\n', 1)[0].decode()
        else:
            name = name.rstrip('/')
        require(name not in result, 'unique archive member')
        result[name] = body
    return result

def command(rustc, source, output):
    return [str(rustc), '--crate-name', 'native_transfer_fee', '--edition=2021', str(source),
            '--crate-type', 'lib', '--emit=link', '-C', 'opt-level=3', '-C', 'panic=abort',
            '-C', 'embed-bitcode=no', '-C', 'codegen-units=1', '-C', 'overflow-checks=on',
            '-C', 'metadata=0b711fd86d68d989', '-C', 'extra-filename=-0b711fd86d68d989',
            '--out-dir', str(output), '--target', 'sbpf-solana-solana',
            '-C', 'strip=debuginfo', '-Zremap-cwd-prefix=']
