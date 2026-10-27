"""Write and check ordered linker scripts.

An ordered script is the SDK default script with exactly one change: the
`.text` output section's single `*(.text*)` input rule becomes an explicit list
of qualified input-section selectors followed by the same catch-all
`*(.text*)`. Program headers, every other output section, discard rules and
alignment are unchanged. No address assignment, padding, fill, or data
statement can appear.
"""
import re

DEFAULT_RULE = '  .text : { *(.text*) } :text'
SELECTOR = re.compile(r'^    \*[^\s()"]+\("\.text[^"]*"\)$')


def render(default, selectors):
    assert default.count(DEFAULT_RULE) == 1
    body = '\n'.join('    ' + s for s in selectors)
    return default.replace(DEFAULT_RULE, '  .text : {\n' + body + '\n    *(.text*)\n  } :text')


def selector(file_pattern, section):
    assert '"' not in section and ' ' not in section and '(' not in file_pattern and ')' not in file_pattern
    return '*' + file_pattern + '("' + section + '")'


def check_script(default, script):
    assert default.count(DEFAULT_RULE) == 1
    head, tail = default.split(DEFAULT_RULE)
    assert script.startswith(head + '  .text : {\n') and script.endswith('\n    *(.text*)\n  } :text' + tail)
    inner = script[len(head) + len('  .text : {\n'):len(script) - len('\n    *(.text*)\n  } :text' + tail)]
    lines = inner.split('\n') if inner else []
    assert all(SELECTOR.match(line) for line in lines), 'unexpected linker script statement'
    assert len(lines) == len(set(lines)), 'duplicate selector'
    return len(lines)
