# Return-wrapper shape: unpromoted experiment

A controlled build replaces the private generic function with the struct and
method shape emitted by Anchor's generated CPI return wrapper. The complete
raw instruction section is identical to the maintained candidate. The changed
ELF hash reflects data/metadata, not recovered instructions; there are no gained
or lost original-window matches. The helper still inlines.

`source.patch`, `comparison.json`, the exact source, build log/record, stripped
and unstripped output, and full measurement are retained. No runtime acceptance
or source promotion is claimed. Further outlining experiments need independent
source evidence; this result does not justify an artificial inline attribute.
