// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var n = e.i(652391);
  e.s([
    "ParseErrorBuilder",
    0,
    {
      r: () =>
        new n.P({
          code: n.c.BadSignature,
          reason: "missing WEBVTT file header",
          line: 1,
        }),
      s: (e, i) =>
        new n.P({
          code: n.c.BadTimestamp,
          reason: `cue start timestamp \`${e}\` is invalid on line ${i}`,
          line: i,
        }),
      t: (e, i) =>
        new n.P({
          code: n.c.BadTimestamp,
          reason: `cue end timestamp \`${e}\` is invalid on line ${i}`,
          line: i,
        }),
      u: (e, i, a) =>
        new n.P({
          code: n.c.BadTimestamp,
          reason: `cue end timestamp \`${i}\` is greater than start \`${e}\` on line ${a}`,
          line: a,
        }),
      y: (e, i, a) =>
        new n.P({
          code: n.c.BadSettingValue,
          reason: `invalid value for cue setting \`${e}\` on line ${a} (value: ${i})`,
          line: a,
        }),
      x: (e, i, a) =>
        new n.P({
          code: n.c.UnknownSetting,
          reason: `unknown cue setting \`${e}\` on line ${a} (value: ${i})`,
          line: a,
        }),
      w: (e, i, a) =>
        new n.P({
          code: n.c.BadSettingValue,
          reason: `invalid value for region setting \`${e}\` on line ${a} (value: ${i})`,
          line: a,
        }),
      v: (e, i, a) =>
        new n.P({
          code: n.c.UnknownSetting,
          reason: `unknown region setting \`${e}\` on line ${a} (value: ${i})`,
          line: a,
        }),
      T: (e, i) =>
        new n.P({
          code: n.c.BadFormat,
          reason: `format missing for \`${e}\` block on line ${i}`,
          line: i,
        }),
    },
  ]);
};
