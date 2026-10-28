// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = Symbol("SemVer ANY");
  r.exports = class e {
    static get ANY() {
      return s;
    }
    constructor(r, t) {
      if (((t = i(t)), r instanceof e))
        if (r.loose === !!t.loose) return r;
        else r = r.value;
      (l("comparator", (r = r.trim().split(/\s+/).join(" ")), t),
        (this.options = t),
        (this.loose = !!t.loose),
        this.parse(r),
        this.semver === s
          ? (this.value = "")
          : (this.value = this.operator + this.semver.version),
        l("comp", this));
    }
    parse(e) {
      let r = this.options.loose ? n[o.COMPARATORLOOSE] : n[o.COMPARATOR],
        t = e.match(r);
      if (!t) throw TypeError(`Invalid comparator: ${e}`);
      ((this.operator = void 0 !== t[1] ? t[1] : ""),
        "=" === this.operator && (this.operator = ""),
        t[2]
          ? (this.semver = new p(t[2], this.options.loose))
          : (this.semver = s));
    }
    toString() {
      return this.value;
    }
    test(e) {
      if (
        (l("Comparator.test", e, this.options.loose),
        this.semver === s || e === s)
      )
        return !0;
      if ("string" == typeof e)
        try {
          e = new p(e, this.options);
        } catch (e) {
          return !1;
        }
      return a(e, this.operator, this.semver, this.options);
    }
    intersects(r, t) {
      if (!(r instanceof e)) throw TypeError("a Comparator is required");
      return "" === this.operator
        ? "" === this.value || new c(r.value, t).test(this.value)
        : "" === r.operator
          ? "" === r.value || new c(this.value, t).test(r.semver)
          : !(
              ((t = i(t)).includePrerelease &&
                ("<0.0.0-0" === this.value || "<0.0.0-0" === r.value)) ||
              (!t.includePrerelease &&
                (this.value.startsWith("<0.0.0") ||
                  r.value.startsWith("<0.0.0")))
            ) &&
            !!(
              (this.operator.startsWith(">") && r.operator.startsWith(">")) ||
              (this.operator.startsWith("<") && r.operator.startsWith("<")) ||
              (this.semver.version === r.semver.version &&
                this.operator.includes("=") &&
                r.operator.includes("=")) ||
              (a(this.semver, "<", r.semver, t) &&
                this.operator.startsWith(">") &&
                r.operator.startsWith("<")) ||
              (a(this.semver, ">", r.semver, t) &&
                this.operator.startsWith("<") &&
                r.operator.startsWith(">"))
            );
    }
  };
  let i = e.r(769097),
    { safeRe: n, t: o } = e.r(990950),
    a = e.r(348973),
    l = e.r(777453),
    p = e.r(401542),
    c = e.r(247071);
};
