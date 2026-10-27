#!/usr/bin/env python3
"""Check raw sysroot/object/link relationships without executing release tools."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import struct
import tarfile

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]


def require(condition, message):
    if not condition:
        raise ValueError(message)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def read_json(path):
    return json.loads(path.read_bytes())


def checked_slice(data, start, size):
    require(start >= 0 and size >= 0 and start + size <= len(data), "range outside input")
    return data[start:start + size]


def local_path(root, name):
    path = PurePosixPath(name)
    require(not path.is_absolute() and bool(path.parts) and
            all(p not in ("..", ".") for p in path.parts) and
            "\\" not in name and ":" not in name and path.as_posix() == name,
            "noncanonical relative path")
    return root.joinpath(*path.parts)


def ar_members(data):
    """Yield exact member payloads; support GNU long names and BSD extended names."""
    require(data[:8] == b"!<arch>\n", "not a regular ar archive")
    pos, names = 8, b""
    seen = set()
    while pos < len(data):
        header = checked_slice(data, pos, 60)
        require(header[58:] == b"`\n", "bad ar header trailer")
        size = int(header[48:58])
        start = pos + 60
        raw = checked_slice(data, start, size)
        name = header[:16].decode("ascii").rstrip()
        if name == "//":
            names = raw
        elif name.startswith("#1/"):
            length = int(name[3:])
            name = checked_slice(raw, 0, length).rstrip(b"\0").decode()
            start += length
            raw = raw[length:]
        elif name.startswith("/") and name[1:].isdigit():
            offset = int(name[1:])
            require(offset < len(names), "ar long-name offset outside table")
            end = names.find(b"/\n", offset)
            require(end >= 0, "unterminated ar long name")
            name = names[offset:end].decode()
        elif name not in ("/", "/SYM64/"):
            name = name.removesuffix("/")
        require(name not in seen, "duplicate ar member: " + name)
        seen.add(name)
        yield name, start, raw
        pos += 60 + size
        if size % 2:
            require(checked_slice(data, pos, 1) == b"\n", "bad ar padding")
            pos += 1


class Elf:
    """Small ELF64-LE reader for section-backed symbols, with bounded reads."""
    def __init__(self, data):
        self.data = data
        require(data[:7] == b"\x7fELF\x02\x01\x01", "expected ELF64 little endian")
        checked_slice(data, 0, 64)
        self.kind, self.machine = struct.unpack_from("<HH", data, 16)
        require(self.kind in (1, 2, 3), "unsupported ELF type")
        self.flags = struct.unpack_from("<I", data, 48)[0]
        table = struct.unpack_from("<Q", data, 40)[0]
        stride, count, strings_index = struct.unpack_from("<HHH", data, 58)
        require(stride == 64 and 0 < strings_index < count, "unsupported section table")
        checked_slice(data, table, count * stride)
        self.sections = []
        for index in range(count):
            row = struct.unpack_from("<IIQQQQIIQQ", data, table + index * stride)
            section = dict(zip(("name_offset", "type", "flags", "addr", "offset",
                                "size", "link", "info", "alignment", "entsize"), row))
            if section["type"] != 8:  # SHT_NOBITS has no file bytes.
                checked_slice(data, section["offset"], section["size"])
            self.sections.append(section)
        names = self.section_bytes(strings_index)
        for section in self.sections:
            section["name"] = self.string(names, section["name_offset"])

    @staticmethod
    def string(data, offset):
        require(0 <= offset < len(data), "string outside table")
        end = data.find(b"\0", offset)
        require(end >= 0, "unterminated string")
        return data[offset:end].decode()

    def section_bytes(self, index):
        require(0 <= index < len(self.sections), "section index outside table")
        s = self.sections[index]
        require(s["type"] != 8, "NOBITS has no file bytes")
        return checked_slice(self.data, s["offset"], s["size"])

    def section_named(self, name):
        rows = [(i, s) for i, s in enumerate(self.sections) if s["name"] == name]
        require(len(rows) == 1, "expected one section: " + name)
        return rows[0]

    def function(self, name):
        found = []
        for symbols in self.sections:
            if symbols["type"] != 2:  # Deliberately use full .symtab, not dynsym duplicates.
                continue
            require(symbols["entsize"] == 24 and symbols["size"] % 24 == 0,
                    "bad symbol table shape")
            strings = self.section_bytes(symbols["link"])
            for at in range(symbols["offset"], symbols["offset"] + symbols["size"], 24):
                n, info, _, index, value, size = struct.unpack_from("<IBBHQQ", self.data, at)
                if self.string(strings, n) != name or info & 15 != 2 or not size:
                    continue
                require(0 < index < len(self.sections), "function has no ordinary section")
                section = self.sections[index]
                relative = value if self.kind == 1 else value - section["addr"]
                require(section["flags"] & 4 and relative >= 0 and
                        relative + size <= section["size"], "function outside executable section")
                offset = section["offset"] + relative
                found.append(dict(symbol=name, section=index, section_name=section["name"],
                                  section_relative_offset=relative, offset=offset, bytes=size,
                                  sha256=digest(checked_slice(self.data, offset, size))))
        require(len(found) == 1, "expected one nonempty function: " + name)
        return found[0]

    def object_relocations(self, function):
        require(self.kind == 1, "object relocations require ET_REL")
        result = []
        for section in self.sections:
            if section["type"] not in (4, 9) or section["info"] != function["section"]:
                continue
            stride = 24 if section["type"] == 4 else 16
            require(section["entsize"] == stride and section["size"] % stride == 0,
                    "bad relocation table shape")
            for at in range(section["offset"], section["offset"] + section["size"], stride):
                offset, info = struct.unpack_from("<QQ", self.data, at)
                relative = offset - function["section_relative_offset"]
                if 0 <= relative < function["bytes"]:
                    result.append(dict(offset=relative, type=info & 0xffffffff, symbol_index=info >> 32))
        return result


def body(elf, function):
    return checked_slice(elf.data, function["offset"], function["bytes"])
