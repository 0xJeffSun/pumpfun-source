// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(77962),
    a = e.i(352386),
    r = e.i(607079),
    n = e.i(231332);
  function i() {
    return (0, r.useReactContext)(t.$r);
  }
  let o = (0, r.createReactComponent)(t.iS, { domEventsRegex: /^onMedia/ });
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(o, { ...n }, (n) =>
      a.createElement(
        t.CZ.button,
        { ...n, ref: (0, r.composeRefs)(n.ref, i) },
        e,
      ),
    ),
  ).displayName = "AirPlayButton";
  let s = (0, r.createReactComponent)(t.by, { domEventsRegex: /^onMedia/ }),
    l = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(s, { ...n }, (n) =>
        a.createElement(
          t.CZ.button,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  l.displayName = "PlayButton";
  let d = (0, r.createReactComponent)(t.fN, { domEventsRegex: /^onMedia/ });
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(d, { ...n }, (n) =>
      a.createElement(
        t.CZ.button,
        { ...n, ref: (0, r.composeRefs)(n.ref, i) },
        e,
      ),
    ),
  ).displayName = "CaptionButton";
  let u = (0, r.createReactComponent)(t.SS, { domEventsRegex: /^onMedia/ }),
    c = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(u, { ...n }, (n) =>
        a.createElement(
          t.CZ.button,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  c.displayName = "FullscreenButton";
  let p = (0, r.createReactComponent)(t.mJ, { domEventsRegex: /^onMedia/ }),
    m = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(p, { ...n }, (n) =>
        a.createElement(
          t.CZ.button,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  m.displayName = "MuteButton";
  let h = (0, r.createReactComponent)(t.cO, { domEventsRegex: /^onMedia/ }),
    _ = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(h, { ...n }, (n) =>
        a.createElement(
          t.CZ.button,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  _.displayName = "PIPButton";
  let f = (0, r.createReactComponent)(t.zw, { domEventsRegex: /^onMedia/ });
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(f, { ...n }, (n) =>
      a.createElement(
        t.CZ.button,
        { ...n, ref: (0, r.composeRefs)(n.ref, i) },
        e,
      ),
    ),
  ).displayName = "SeekButton";
  let v = (0, r.createReactComponent)(t.Rl, { domEventsRegex: /^onMedia/ });
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(v, { ...n }, (n) =>
      a.createElement(
        t.CZ.button,
        { ...n, ref: (0, r.composeRefs)(n.ref, i) },
        e,
      ),
    ),
  ).displayName = "LiveButton";
  let y = [
      "onDragStart",
      "onDragEnd",
      "onDragValueChange",
      "onValueChange",
      "onPointerValueChange",
    ],
    g = (0, r.createReactComponent)(t.p$),
    b = (0, r.createReactComponent)(t.kd, { events: y });
  a.forwardRef(({ children: e, ...r }, n) =>
    a.createElement(b, { ...r, ref: n }, (r) =>
      a.createElement(t.CZ.div, { ...r }, e),
    ),
  ).displayName = "Slider";
  let w = a.forwardRef((e, r) => a.createElement(t.CZ.div, { ...e, ref: r }));
  w.displayName = "SliderThumb";
  let E = a.forwardRef((e, r) => a.createElement(t.CZ.div, { ...e, ref: r }));
  E.displayName = "SliderTrack";
  let T = a.forwardRef((e, r) => a.createElement(t.CZ.div, { ...e, ref: r }));
  T.displayName = "SliderTrackFill";
  let k = (0, r.createReactComponent)(t.wI),
    x = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(k, { ...n }, (n) =>
        a.createElement(
          t.CZ.div,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  x.displayName = "SliderPreview";
  let R = a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(g, { ...n }, (n, o) => {
      let s = (0, r.useSignal)(() => o.getValueText(), o);
      return a.createElement(t.CZ.div, { ...n, ref: i }, s, e);
    }),
  );
  R.displayName = "SliderValue";
  let D = a.forwardRef(({ children: e, ...r }, n) => {
    let i = (0, t.vN)("min"),
      o = (0, t.vN)("max"),
      s = (0, t.vN)("step");
    return a.createElement(
      t.CZ.div,
      { ...r, ref: n },
      Array.from({ length: Math.floor((o - i) / s) + 1 }).map((t, a) => e(a)),
    );
  });
  D.displayName = "SliderSteps";
  let S = (0, r.createReactComponent)(t.GM, {
      events: y,
      domEventsRegex: /^onMedia/,
    }),
    C = a.forwardRef(({ children: e, ...r }, n) =>
      a.createElement(S, { ...r, ref: n }, (r) =>
        a.createElement(t.CZ.div, { ...r }, e),
      ),
    );
  C.displayName = "VolumeSlider";
  var P = Object.freeze({
    __proto__: null,
    Preview: x,
    Root: C,
    Steps: D,
    Thumb: w,
    Track: E,
    TrackFill: T,
    Value: R,
  });
  let N = (0, r.createReactComponent)(t.SJ);
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(N, { ...n }, (n) =>
      a.createElement(t.CZ.div, { ...n, ref: (0, r.composeRefs)(n.ref, i) }, e),
    ),
  ).displayName = "Thumbnail";
  let q = a.forwardRef(({ children: e, ...n }, i) => {
    let { src: o, img: s, crossOrigin: l } = (0, r.useStateContext)(t.SJ.state),
      d = (0, r.useSignal)(o),
      u = (0, r.useSignal)(l);
    return a.createElement(
      t.CZ.img,
      {
        crossOrigin: u,
        ...n,
        src: d || void 0,
        ref: (0, r.composeRefs)(s.set, i),
      },
      e,
    );
  });
  q.displayName = "ThumbnailImg";
  let O = a.createContext({ $chapters: (0, r.signal)(null) });
  O.displayName = "TimeSliderContext";
  let A = (0, r.createReactComponent)(t.Vu, {
      events: y,
      domEventsRegex: /^onMedia/,
    }),
    L = a.forwardRef(({ children: e, ...n }, i) => {
      let o = a.useMemo(() => (0, r.signal)(null), []);
      return a.createElement(
        O.Provider,
        { value: { $chapters: o } },
        a.createElement(A, { ...n, ref: i }, (r) =>
          a.createElement(t.CZ.div, { ...r }, e),
        ),
      );
    });
  L.displayName = "TimeSlider";
  let I = (0, r.createReactComponent)(t.Ss),
    M = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(I, { ...n }, (n, o) =>
        a.createElement(
          t.CZ.div,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          a.createElement(H, { instance: o }, e),
        ),
      ),
    );
  function H({ instance: e, children: n }) {
    let i = (0, r.useSignal)(() => e.cues, e),
      o = a.useRef([]),
      s = a.useRef(null),
      { $chapters: l } = a.useContext(O);
    return (
      s.current ||
        (s.current = (function (e = 0, a = 0, n = "") {
          return t.MJ
            ? {
                startTime: e,
                endTime: a,
                text: n,
                addEventListener: r.noop,
                removeEventListener: r.noop,
                dispatchEvent: r.noop,
              }
            : new window.VTTCue(e, a, n);
        })()),
      a.useEffect(() => (l.set(e), () => void l.set(null)), [e]),
      a.useEffect(() => {
        e.setRefs(o.current);
      }, [i]),
      n(i.length ? i : [s.current], (e) => {
        if (!e) {
          o.current.length = 0;
          return;
        }
        o.current.push(e);
      })
    );
  }
  ((M.displayName = "SliderChapters"), (H.displayName = "SliderChapterTracks"));
  let j = a.forwardRef(({ children: e, ...n }, i) => {
    let { $chapters: o } = a.useContext(O),
      [s, l] = a.useState();
    return (
      a.useEffect(
        () =>
          (0, r.effect)(() => {
            let e = o(),
              t = e?.activePointerCue || e?.activeCue;
            l(t?.text || "");
          }),
        [],
      ),
      a.createElement(t.CZ.div, { ...n, ref: i }, s, e)
    );
  });
  j.displayName = "SliderChapterTitle";
  let B = a.forwardRef((e, r) => a.createElement(t.CZ.div, { ...e, ref: r }));
  B.displayName = "SliderProgress";
  let U = (0, r.createReactComponent)(t.fX),
    F = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(U, { ...n }, (n) =>
        a.createElement(
          t.CZ.div,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  F.displayName = "SliderThumbnail";
  let V = (0, r.createReactComponent)(t.Vf, {
      events: ["onCanPlay", "onError"],
    }),
    G = a.forwardRef(({ children: e, ...t }, n) =>
      a.createElement(V, { ...t }, (t, i) =>
        a.createElement(
          Z,
          { ...t, instance: i, ref: (0, r.composeRefs)(t.ref, n) },
          e,
        ),
      ),
    );
  G.displayName = "SliderVideo";
  let Z = a.forwardRef(({ instance: e, children: n, ...i }, o) => {
    let { canLoad: s } = (0, r.useStateContext)(t.pQ),
      { src: l, video: d, crossOrigin: u } = e.$state,
      c = (0, r.useSignal)(l),
      p = (0, r.useSignal)(s),
      m = (0, r.useSignal)(u);
    return a.createElement(
      t.CZ.video,
      {
        style: { maxWidth: "unset" },
        ...i,
        src: c || void 0,
        muted: !0,
        playsInline: !0,
        preload: p ? "auto" : "none",
        crossOrigin: m || void 0,
        ref: (0, r.composeRefs)(d.set, o),
      },
      n,
    );
  });
  Z.displayName = "SliderVideoProvider";
  var W = Object.freeze({
    __proto__: null,
    ChapterTitle: j,
    Chapters: M,
    Preview: x,
    Progress: B,
    Root: L,
    Steps: D,
    Thumb: w,
    Thumbnail: { Root: F, Img: q },
    Track: E,
    TrackFill: T,
    Value: R,
    Video: G,
  });
  let Q = (0, r.createReactComponent)(t.L5, { events: ["onChange"] }),
    z = a.forwardRef(({ children: e, ...r }, n) =>
      a.createElement(Q, { ...r, ref: n }, (r) =>
        a.createElement(t.CZ.div, { ...r }, e),
      ),
    );
  z.displayName = "RadioGroup";
  let K = (0, r.createReactComponent)(t.x2, {
      events: ["onChange", "onSelect"],
    }),
    J = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(K, { ...n }, (n) =>
        a.createElement(
          t.CZ.div,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  J.displayName = "RadioItem";
  var $ = Object.freeze({ __proto__: null, Item: J, Root: z });
  let Y = (0, r.createReactComponent)(t.l8, {
      events: ["onOpen", "onClose"],
      domEventsRegex: /^onMedia/,
    }),
    X = a.forwardRef(({ children: e, ...r }, n) =>
      a.createElement(Y, { ...r, ref: n }, (r, n) =>
        a.createElement(
          t.CZ.div,
          {
            ...r,
            style: { display: n.isSubmenu ? void 0 : "contents", ...r.style },
          },
          e,
        ),
      ),
    );
  X.displayName = "Menu";
  let ee = (0, r.createReactComponent)(t._C, { events: ["onSelect"] }),
    et = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(ee, { ...n }, (n) =>
        a.createElement(
          t.CZ.button,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  et.displayName = "MenuButton";
  let ea = a.forwardRef(
    ({ container: e = null, disabled: i = !1, children: o, ...s }, l) => {
      let d = (0, t.Z9)("fullscreen"),
        u = a.useMemo(
          () =>
            t.MJ
              ? null
              : (((0, r.isString)(e) ? document.querySelector(e) : e) ??
                document.body),
          [e],
        );
      return !u || ("fullscreen" === i ? d : i)
        ? o
        : (0, n.createPortal)(
            a.createElement(
              t.CZ.div,
              { ...s, style: { display: "contents", ...s.style }, ref: l },
              o,
            ),
            u,
          );
    },
  );
  ea.displayName = "MenuPortal";
  let er = (0, r.createReactComponent)(t.CT),
    en = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(er, { ...n }, (n) =>
        a.createElement(
          t.CZ.div,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  en.displayName = "MenuItems";
  let ei = (0, r.createReactComponent)(t.Vx),
    eo = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(ei, { ...n }, (n) =>
        a.createElement(
          t.CZ.div,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  eo.displayName = "MenuItem";
  var es = Object.freeze({
    __proto__: null,
    Button: et,
    Content: en,
    Item: eo,
    Items: en,
    Portal: ea,
    Radio: J,
    RadioGroup: z,
    Root: X,
  });
  let el = (0, r.createReactComponent)(t.py, {
      events: ["onWillTrigger", "onTrigger"],
    }),
    ed = a.forwardRef(({ children: e, ...r }, n) =>
      a.createElement(el, { ...r, ref: n }, (r) =>
        a.createElement(t.CZ.div, { ...r }, e),
      ),
    );
  ed.displayName = "Gesture";
  let eu = (0, r.createReactComponent)(t.TX),
    ec = a.forwardRef(({ children: e, ...t }, n) =>
      a.createElement(eu, { ...t }, (t, i) =>
        a.createElement(
          ep,
          { ...t, instance: i, ref: (0, r.composeRefs)(t.ref, n) },
          e,
        ),
      ),
    );
  ec.displayName = "Time";
  let ep = a.forwardRef(({ instance: e, children: n, ...i }, o) => {
    let { timeText: s } = e.$state,
      l = (0, r.useSignal)(s);
    return a.createElement(t.CZ.div, { ...i, ref: o }, l, n);
  });
  ((ep.displayName = "TimeText"),
    e.s(
      [
        "C",
        0,
        c,
        "R",
        0,
        ed,
        "L",
        0,
        m,
        "N",
        0,
        _,
        "x",
        0,
        l,
        "H",
        0,
        x,
        "D",
        0,
        D,
        "w",
        0,
        w,
        "X",
        0,
        ec,
        "m",
        0,
        E,
        "n",
        0,
        T,
        "A",
        0,
        R,
        "S",
        0,
        es,
        "Y",
        0,
        $,
        "q",
        0,
        y,
        "Z",
        0,
        W,
        "o",
        0,
        i,
        "$",
        0,
        P,
      ],
      517770,
    ));
  let em = (0, r.createReactComponent)(t.p2, { events: ["onChange"] });
  a.forwardRef(({ style: e, children: n, ...i }, o) =>
    a.createElement(em, { ...i }, (i) =>
      a.createElement(
        t.CZ.div,
        {
          ...i,
          style: { display: "contents", ...e },
          ref: (0, r.composeRefs)(i.ref, o),
        },
        n,
      ),
    ),
  ).displayName = "MediaAnnouncer";
  let eh = (0, r.createReactComponent)(t.rc),
    e_ = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(eh, { ...n }, (n) =>
        a.createElement(
          t.CZ.div,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  e_.displayName = "Controls";
  let ef = (0, r.createReactComponent)(t.LM),
    ev = a.forwardRef(({ children: e, ...n }, i) =>
      a.createElement(ef, { ...n }, (n) =>
        a.createElement(
          t.CZ.div,
          { ...n, ref: (0, r.composeRefs)(n.ref, i) },
          e,
        ),
      ),
    );
  ev.displayName = "ControlsGroup";
  var ey = Object.freeze({ __proto__: null, Group: ev, Root: e_ });
  (0, r.createReactComponent)(t.TS);
  let eg = (0, r.createReactComponent)(t._X);
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(eg, { ...n }, (n) =>
      a.createElement(
        t.CZ.button,
        { ...n, ref: (0, r.composeRefs)(n.ref, i) },
        e,
      ),
    ),
  ).displayName = "TooltipTrigger";
  let eb = (0, r.createReactComponent)(t.$1);
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(eb, { ...n }, (n) =>
      a.createElement(t.CZ.div, { ...n, ref: (0, r.composeRefs)(n.ref, i) }, e),
    ),
  ).displayName = "TooltipContent";
  let ew = (0, r.createReactComponent)(t.Ue, { domEventsRegex: /^onMedia/ });
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(ew, { ...n }, (n) =>
      a.createElement(
        t.CZ.button,
        { ...n, ref: (0, r.composeRefs)(n.ref, i) },
        e,
      ),
    ),
  ).displayName = "GoogleCastButton";
  let eE = (0, r.createReactComponent)(t.Pu, {
    events: y,
    domEventsRegex: /^onMedia/,
  });
  a.forwardRef(({ children: e, ...r }, n) =>
    a.createElement(eE, { ...r, ref: n }, (r) =>
      a.createElement(t.CZ.div, { ...r }, e),
    ),
  ).displayName = "QualitySlider";
  let eT = (0, r.createReactComponent)(t.sl, {
    events: y,
    domEventsRegex: /^onMedia/,
  });
  a.forwardRef(({ children: e, ...r }, n) =>
    a.createElement(eT, { ...r, ref: n }, (r) =>
      a.createElement(t.CZ.div, { ...r }, e),
    ),
  ).displayName = "AudioGainSlider";
  let ek = (0, r.createReactComponent)(t.tE, {
    events: y,
    domEventsRegex: /^onMedia/,
  });
  ((a.forwardRef(({ children: e, ...r }, n) =>
    a.createElement(ek, { ...r, ref: n }, (r) =>
      a.createElement(t.CZ.div, { ...r }, e),
    ),
  ).displayName = "SpeedSlider"),
    (a.forwardRef(({ children: e, ...r }, n) => {
      let i = (0, t.Z9)("title");
      return a.createElement(t.CZ.span, { ...r, ref: n }, i, e);
    }).displayName = "Title"),
    (a.forwardRef(({ defaultText: e = "", children: n, ...o }, s) => {
      let l,
        d =
          ((l = (function (e) {
            let [t, n] = a.useState([]);
            return (
              a.useEffect(() => {
                if (!e) return void n([]);
                function t() {
                  e && n(e.activeCues);
                }
                return (t(), (0, r.listenEvent)(e, "cue-change", t));
              }, [e]),
              t
            );
          })(
            (function (e) {
              let r = i(),
                [n, o] = a.useState(null);
              return (a.useEffect(() => (0, t.WC)(r.textTracks, e, o), [e]), n);
            })("chapters"),
          )),
          l[0]?.text || "");
      return a.createElement(t.CZ.span, { ...o, ref: s }, d || e, n);
    }).displayName = "ChapterTitle"));
  let ex = (0, r.createReactComponent)(t.E$);
  ((a.forwardRef(({ children: e, ...r }, n) =>
    a.createElement(ex, { ...r, ref: n }, (r) =>
      a.createElement(t.CZ.div, { ...r }, e),
    ),
  ).displayName = "Captions"),
    a.forwardRef(({ size: e = 96, children: t, ...r }, n) =>
      a.createElement(
        "svg",
        {
          width: e,
          height: e,
          fill: "none",
          viewBox: "0 0 120 120",
          "aria-hidden": "true",
          "data-part": "root",
          ...r,
          ref: n,
        },
        t,
      ),
    ),
    a.forwardRef(({ width: e = 8, children: t, ...r }, n) =>
      a.createElement(
        "circle",
        {
          cx: "60",
          cy: "60",
          r: "54",
          stroke: "currentColor",
          strokeWidth: e,
          "data-part": "track",
          ...r,
          ref: n,
        },
        t,
      ),
    ),
    a.forwardRef(
      ({ width: e = 8, fillPercent: t = 50, children: r, ...n }, i) =>
        a.createElement(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: "54",
            stroke: "currentColor",
            pathLength: "100",
            strokeWidth: e,
            strokeDasharray: 100,
            strokeDashoffset: 100 - t,
            "data-part": "track-fill",
            ...n,
            ref: i,
          },
          r,
        ),
    ),
    e.s(
      [
        "A",
        0,
        ey,
        "v",
        0,
        function (e, t = []) {
          let n = (0, r.useReactScope)();
          return a.useMemo(
            () => (0, r.scoped)(() => (0, r.signal)(e), n),
            [n, ...t],
          );
        },
        "J",
        0,
        function (e) {
          let t = (0, r.useReactScope)();
          return a.useMemo(() => (0, r.scoped)(e, t), [t]);
        },
      ],
      403096,
    ));
  let eR = a.forwardRef((e, t) => {
    let { width: r, height: n, size: i = null, paths: o, ...s } = e;
    return a.createElement("svg", {
      viewBox: "0 0 32 32",
      ...s,
      width: r ?? i,
      height: n ?? i,
      fill: "none",
      "aria-hidden": "true",
      focusable: "false",
      xmlns: "http://www.w3.org/2000/svg",
      ref: t,
      dangerouslySetInnerHTML: { __html: o },
    });
  });
  ((eR.displayName = "VidstackIcon"), Symbol(0));
  let eD = [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
  class eS extends r.Component {
    static props = { normalLabel: "Disabled", gains: eD };
    #e;
    #t;
    #a;
    get value() {
      return this.#a.value;
    }
    get disabled() {
      let { gains: e } = this.$props,
        { canSetAudioGain: t } = this.#e.$state;
      return !t() || 0 === e().length;
    }
    constructor() {
      (super(),
        (this.#a = new t.vp()),
        (this.#a.onValueChange = this.#r.bind(this)));
    }
    onSetup() {
      ((this.#e = (0, t.Dg)()),
        (0, r.hasProvidedContext)(t.xw) && (this.#t = (0, r.useContext)(t.xw)));
    }
    onConnect(e) {
      ((0, r.effect)(this.#n.bind(this)),
        (0, r.effect)(this.#i.bind(this)),
        (0, r.effect)(this.#o.bind(this)));
    }
    getOptions() {
      let { gains: e, normalLabel: t } = this.$props;
      return e().map((e) => ({
        label: 1 === e || null === e ? t : String(100 * e) + "%",
        value: e.toString(),
      }));
    }
    #n() {
      this.#a.value = this.#s();
    }
    #i() {
      let { normalLabel: e } = this.$props,
        { audioGain: t } = this.#e.$state,
        a = t();
      this.#t?.hint.set(1 === a || null == a ? e() : String(100 * a) + "%");
    }
    #o() {
      this.#t?.disable(this.disabled);
    }
    #s() {
      let { audioGain: e } = this.#e.$state;
      return e()?.toString() ?? "1";
    }
    #r(e, t) {
      if (this.disabled) return;
      let a = +e;
      (this.#e.remote.changeAudioGain(a, t),
        this.dispatch("change", { detail: a, trigger: t }));
    }
  }
  let eC = eS.prototype;
  ((0, r.prop)(eC, "value"),
    (0, r.prop)(eC, "disabled"),
    (0, r.method)(eC, "getOptions"));
  let eP = (0, r.createReactComponent)(t.kc, {
      events: [
        "onAbort",
        "onAudioTrackChange",
        "onAudioTracksChange",
        "onAutoPlay",
        "onAutoPlayChange",
        "onAutoPlayFail",
        "onCanLoad",
        "onCanPlay",
        "onCanPlayThrough",
        "onControlsChange",
        "onDestroy",
        "onDurationChange",
        "onEmptied",
        "onEnd",
        "onEnded",
        "onError",
        "onFindMediaPlayer",
        "onFullscreenChange",
        "onFullscreenError",
        "onLiveChange",
        "onLiveEdgeChange",
        "onLoadedData",
        "onLoadedMetadata",
        "onLoadStart",
        "onLoopChange",
        "onOrientationChange",
        "onPause",
        "onPictureInPictureChange",
        "onPictureInPictureError",
        "onPlay",
        "onPlayFail",
        "onPlaying",
        "onPlaysInlineChange",
        "onPosterChange",
        "onProgress",
        "onProviderChange",
        "onProviderLoaderChange",
        "onProviderSetup",
        "onQualitiesChange",
        "onQualityChange",
        "onRateChange",
        "onReplay",
        "onSeeked",
        "onSeeking",
        "onSourceChange",
        "onSourceChange",
        "onStalled",
        "onStarted",
        "onStreamTypeChange",
        "onSuspend",
        "onTextTrackChange",
        "onTextTracksChange",
        "onTimeUpdate",
        "onTitleChange",
        "onVdsLog",
        "onVideoPresentationChange",
        "onVolumeChange",
        "onWaiting",
      ],
      eventsRegex: /^onHls/,
      domEventsRegex: /^onMedia/,
    }),
    eN = a.forwardRef(({ aspectRatio: e, children: r, ...n }, i) =>
      a.createElement(
        eP,
        { ...n, src: n.src, ref: i, style: { aspectRatio: e, ...n.style } },
        (e) => a.createElement(t.CZ.div, { ...e }, r),
      ),
    );
  eN.displayName = "MediaPlayer";
  let eq = (0, r.createReactComponent)(t.h),
    eO = a.forwardRef(
      (
        { loaders: e = [], children: t, iframeProps: r, mediaProps: n, ...i },
        o,
      ) => {
        let s = a.useMemo(() => e.map((e) => new e()), e);
        return a.createElement(eq, { ...i, loaders: s, ref: o }, (e, i) =>
          a.createElement(
            "div",
            { ...e },
            a.createElement(eA, { provider: i, mediaProps: n, iframeProps: r }),
            t,
          ),
        );
      },
    );
  function eA({ provider: n, mediaProps: o, iframeProps: s }) {
    let {
        sources: l,
        crossOrigin: d,
        poster: u,
        remotePlaybackInfo: c,
        nativeControls: p,
        viewType: m,
      } = (0, r.useStateContext)(t.pQ),
      { loader: h } = n.$state,
      { $provider: _, $providerSetup: f } = i(),
      v = (0, r.useSignal)(l),
      y = (0, r.useSignal)(p),
      g = (0, r.useSignal)(d),
      b = (0, r.useSignal)(u),
      w = (0, r.useSignal)(h),
      E = (0, r.useSignal)(_),
      T = (0, r.useSignal)(f),
      k = (0, r.useSignal)(c),
      x = w?.mediaType(),
      R = (0, r.useSignal)(m),
      D = w?.name === "youtube",
      S = w?.name === "vimeo",
      C = w?.name === "remotion",
      P = w?.name === "google-cast",
      [N, q] = a.useState(""),
      [O, A] = a.useState(!1);
    return (a.useEffect(() => {
      P &&
        !N &&
        e
          .A(859592)
          .then(function (e) {
            return e.chromecast;
          })
          .then((e) => {
            q(e.default);
          });
    }, [P]),
    a.useEffect(() => {
      A(!0);
    }, []),
    P)
      ? a.createElement(
          "div",
          {
            className: "vds-google-cast",
            ref: (e) => {
              n.load(e);
            },
          },
          a.createElement(eR, { paths: N }),
          k?.deviceName
            ? a.createElement(
                "span",
                { className: "vds-google-cast-info" },
                "Google Cast on",
                " ",
                a.createElement(
                  "span",
                  { className: "vds-google-cast-device-name" },
                  k.deviceName,
                ),
              )
            : null,
        )
      : C
        ? a.createElement(
            "div",
            { "data-remotion-canvas": !0 },
            a.createElement(
              "div",
              {
                "data-remotion-container": !0,
                ref: (e) => {
                  n.load(e);
                },
              },
              (0, t.pt)(E) && T ? a.createElement(E.render) : null,
            ),
          )
        : D || S
          ? a.createElement(
              a.Fragment,
              null,
              a.createElement("iframe", {
                ...s,
                className:
                  (s?.className ? `${s.className} ` : "") + D
                    ? "vds-youtube"
                    : "vds-vimeo",
                suppressHydrationWarning: !0,
                tabIndex: y ? void 0 : -1,
                "aria-hidden": "true",
                "data-no-controls": y ? void 0 : "",
                ref(e) {
                  n.load(e);
                },
              }),
              y || "audio" === R
                ? null
                : a.createElement("div", { className: "vds-blocker" }),
            )
          : x
            ? a.createElement("audio" === x ? "audio" : "video", {
                ...o,
                controls: !!y || null,
                crossOrigin: "boolean" == typeof g ? "" : g,
                poster: "video" === x && y && b ? b : null,
                suppressHydrationWarning: !0,
                children: O
                  ? null
                  : v.map(({ src: e, type: t }) =>
                      (0, r.isString)(e)
                        ? a.createElement("source", {
                            src: e,
                            type: "?" !== t ? t : void 0,
                            key: e,
                          })
                        : null,
                    ),
                ref(e) {
                  n.load(e);
                },
              })
            : null;
  }
  ((eO.displayName = "MediaProvider"), (eA.displayName = "MediaOutlet"));
  let eL = (0, r.createReactComponent)(t.M);
  a.forwardRef(({ children: e, ...n }, i) =>
    a.createElement(eL, { ...n }, (n) =>
      a.createElement(
        t.CZ.button,
        { ...n, ref: (0, r.composeRefs)(n.ref, i) },
        e,
      ),
    ),
  ).displayName = "ToggleButton";
  let eI = (0, r.createReactComponent)(t.nb),
    eM = a.forwardRef(({ children: e, ...t }, n) =>
      a.createElement(
        eI,
        { src: t.asChild && a.isValidElement(e) ? e.props.src : void 0, ...t },
        (t, i) =>
          a.createElement(
            eH,
            { ...t, instance: i, ref: (0, r.composeRefs)(t.ref, n) },
            e,
          ),
      ),
    );
  eM.displayName = "Poster";
  let eH = a.forwardRef(({ instance: e, children: n, ...i }, o) => {
    let { src: s, img: l, alt: d, crossOrigin: u, hidden: c } = e.$state,
      p = (0, r.useSignal)(s),
      m = (0, r.useSignal)(d),
      h = (0, r.useSignal)(u),
      _ = (0, r.useSignal)(c);
    return a.createElement(
      t.CZ.img,
      {
        ...i,
        src: p || void 0,
        alt: m || void 0,
        crossOrigin: h || void 0,
        ref: (0, r.composeRefs)(l.set, o),
        style: { display: _ ? "none" : void 0 },
      },
      n,
    );
  });
  ((eH.displayName = "PosterImg"),
    (a.forwardRef(({ children: e, ...r }, n) =>
      a.createElement(
        t.CZ.div,
        {
          translate: "yes",
          "aria-live": "off",
          "aria-atomic": "true",
          ...r,
          ref: n,
        },
        e,
      ),
    ).displayName = "Caption"),
    (a.forwardRef((e, r) => {
      let n = (0, t.Z9)("textTrack"),
        [i, o] = a.useState();
      return (
        a.useEffect(() => {
          if (n)
            return (
              n.addEventListener("cue-change", e),
              () => {
                (n.removeEventListener("cue-change", e), o(void 0));
              }
            );
          function e() {
            o(n?.activeCues[0]);
          }
        }, [n]),
        a.createElement(t.CZ.span, {
          ...e,
          "data-part": "cue",
          dangerouslySetInnerHTML: { __html: i?.text || "" },
          ref: r,
        })
      );
    }).displayName = "CaptionText"),
    e.s(["O", 0, eN, "s", 0, eO, "n", 0, eM], 789022));
};
