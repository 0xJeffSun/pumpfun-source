// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t;
  let r = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  };
  function n(e) {
    return (t = {}) => {
      let r = t.width ? String(t.width) : e.defaultWidth;
      return e.formats[r] || e.formats[e.defaultWidth];
    };
  }
  let a = {
      date: n({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy",
        },
        defaultWidth: "full",
      }),
      time: n({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a",
        },
        defaultWidth: "full",
      }),
      dateTime: n({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}",
        },
        defaultWidth: "full",
      }),
    },
    i = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };
  function l(e) {
    return (t, r) => {
      let n;
      if (
        "formatting" === (r?.context ? String(r.context) : "standalone") &&
        e.formattingValues
      ) {
        let t = e.defaultFormattingWidth || e.defaultWidth,
          a = r?.width ? String(r.width) : t;
        n = e.formattingValues[a] || e.formattingValues[t];
      } else {
        let t = e.defaultWidth,
          a = r?.width ? String(r.width) : e.defaultWidth;
        n = e.values[a] || e.values[t];
      }
      return n[e.argumentCallback ? e.argumentCallback(t) : t];
    };
  }
  let o = {
    ordinalNumber: (e, t) => {
      let r = Number(e),
        n = r % 100;
      if (n > 20 || n < 10)
        switch (n % 10) {
          case 1:
            return r + "st";
          case 2:
            return r + "nd";
          case 3:
            return r + "rd";
        }
      return r + "th";
    },
    era: l({
      values: {
        narrow: ["B", "A"],
        abbreviated: ["BC", "AD"],
        wide: ["Before Christ", "Anno Domini"],
      },
      defaultWidth: "wide",
    }),
    quarter: l({
      values: {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
      },
      defaultWidth: "wide",
      argumentCallback: (e) => e - 1,
    }),
    month: l({
      values: {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        wide: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      defaultWidth: "wide",
    }),
    day: l({
      values: {
        narrow: ["S", "M", "T", "W", "T", "F", "S"],
        short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        wide: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      defaultWidth: "wide",
    }),
    dayPeriod: l({
      values: {
        narrow: {
          am: "a",
          pm: "p",
          midnight: "mi",
          noon: "n",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night",
        },
        abbreviated: {
          am: "AM",
          pm: "PM",
          midnight: "midnight",
          noon: "noon",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night",
        },
        wide: {
          am: "a.m.",
          pm: "p.m.",
          midnight: "midnight",
          noon: "noon",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night",
        },
      },
      defaultWidth: "wide",
      formattingValues: {
        narrow: {
          am: "a",
          pm: "p",
          midnight: "mi",
          noon: "n",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night",
        },
        abbreviated: {
          am: "AM",
          pm: "PM",
          midnight: "midnight",
          noon: "noon",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night",
        },
        wide: {
          am: "a.m.",
          pm: "p.m.",
          midnight: "midnight",
          noon: "noon",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night",
        },
      },
      defaultFormattingWidth: "wide",
    }),
  };
  function s(e) {
    return (t, r = {}) => {
      let n,
        a = r.width,
        i = (a && e.matchPatterns[a]) || e.matchPatterns[e.defaultMatchWidth],
        l = t.match(i);
      if (!l) return null;
      let o = l[0],
        s = (a && e.parsePatterns[a]) || e.parsePatterns[e.defaultParseWidth],
        u = Array.isArray(s)
          ? (function (e, t) {
              for (let r = 0; r < e.length; r++) if (t(e[r])) return r;
            })(s, (e) => e.test(o))
          : (function (e, t) {
              for (let r in e)
                if (Object.prototype.hasOwnProperty.call(e, r) && t(e[r]))
                  return r;
            })(s, (e) => e.test(o));
      return (
        (n = e.valueCallback ? e.valueCallback(u) : u),
        {
          value: (n = r.valueCallback ? r.valueCallback(n) : n),
          rest: t.slice(o.length),
        }
      );
    };
  }
  let u = {
    ordinalNumber:
      ((t = {
        matchPattern: /^(\d+)(th|st|nd|rd)?/i,
        parsePattern: /\d+/i,
        valueCallback: (e) => parseInt(e, 10),
      }),
      (e, r = {}) => {
        let n = e.match(t.matchPattern);
        if (!n) return null;
        let a = n[0],
          i = e.match(t.parsePattern);
        if (!i) return null;
        let l = t.valueCallback ? t.valueCallback(i[0]) : i[0];
        return {
          value: (l = r.valueCallback ? r.valueCallback(l) : l),
          rest: e.slice(a.length),
        };
      }),
    era: s({
      matchPatterns: {
        narrow: /^(b|a)/i,
        abbreviated:
          /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i,
      },
      defaultMatchWidth: "wide",
      parsePatterns: { any: [/^b/i, /^(a|c)/i] },
      defaultParseWidth: "any",
    }),
    quarter: s({
      matchPatterns: {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i,
      },
      defaultMatchWidth: "wide",
      parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
      defaultParseWidth: "any",
      valueCallback: (e) => e + 1,
    }),
    month: s({
      matchPatterns: {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      },
      defaultMatchWidth: "wide",
      parsePatterns: {
        narrow: [
          /^j/i,
          /^f/i,
          /^m/i,
          /^a/i,
          /^m/i,
          /^j/i,
          /^j/i,
          /^a/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i,
        ],
        any: [
          /^ja/i,
          /^f/i,
          /^mar/i,
          /^ap/i,
          /^may/i,
          /^jun/i,
          /^jul/i,
          /^au/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i,
        ],
      },
      defaultParseWidth: "any",
    }),
    day: s({
      matchPatterns: {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
      },
      defaultMatchWidth: "wide",
      parsePatterns: {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
      },
      defaultParseWidth: "any",
    }),
    dayPeriod: s({
      matchPatterns: {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
      },
      defaultMatchWidth: "any",
      parsePatterns: {
        any: {
          am: /^a/i,
          pm: /^p/i,
          midnight: /^mi/i,
          noon: /^no/i,
          morning: /morning/i,
          afternoon: /afternoon/i,
          evening: /evening/i,
          night: /night/i,
        },
      },
      defaultParseWidth: "any",
    }),
  };
  e.s(
    [
      "f",
      0,
      {
        code: "en-US",
        formatDistance: (e, t, n) => {
          let a,
            i = r[e];
          if (
            ((a =
              "string" == typeof i
                ? i
                : 1 === t
                  ? i.one
                  : i.other.replace("{{count}}", t.toString())),
            n?.addSuffix)
          )
            if (n.comparison && n.comparison > 0) return "in " + a;
            else return a + " ago";
          return a;
        },
        formatLong: a,
        formatRelative: (e, t, r, n) => i[e],
        localize: o,
        match: u,
        options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
      },
    ],
    238153,
  );
  let d = {};
  e.s(
    [
      "f",
      0,
      function () {
        return d;
      },
    ],
    492421,
  );
};
