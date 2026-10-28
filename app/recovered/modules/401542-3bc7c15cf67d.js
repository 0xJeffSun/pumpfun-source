// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(777453),
    { MAX_LENGTH: i, MAX_SAFE_INTEGER: n } = e.r(444946),
    { safeRe: o, t: a } = e.r(990950),
    l = e.r(769097),
    { compareIdentifiers: p } = e.r(820503);
  r.exports = class e {
    constructor(r, t) {
      if (((t = l(t)), r instanceof e))
        if (
          r.loose === !!t.loose &&
          r.includePrerelease === !!t.includePrerelease
        )
          return r;
        else r = r.version;
      else if ("string" != typeof r)
        throw TypeError(
          `Invalid version. Must be a string. Got type "${typeof r}".`,
        );
      if (r.length > i)
        throw TypeError(`version is longer than ${i} characters`);
      (s("SemVer", r, t),
        (this.options = t),
        (this.loose = !!t.loose),
        (this.includePrerelease = !!t.includePrerelease));
      let p = r.trim().match(t.loose ? o[a.LOOSE] : o[a.FULL]);
      if (!p) throw TypeError(`Invalid Version: ${r}`);
      if (
        ((this.raw = r),
        (this.major = +p[1]),
        (this.minor = +p[2]),
        (this.patch = +p[3]),
        this.major > n || this.major < 0)
      )
        throw TypeError("Invalid major version");
      if (this.minor > n || this.minor < 0)
        throw TypeError("Invalid minor version");
      if (this.patch > n || this.patch < 0)
        throw TypeError("Invalid patch version");
      (p[4]
        ? (this.prerelease = p[4].split(".").map((e) => {
            if (/^[0-9]+$/.test(e)) {
              let r = +e;
              if (r >= 0 && r < n) return r;
            }
            return e;
          }))
        : (this.prerelease = []),
        (this.build = p[5] ? p[5].split(".") : []),
        this.format());
    }
    format() {
      return (
        (this.version = `${this.major}.${this.minor}.${this.patch}`),
        this.prerelease.length &&
          (this.version += `-${this.prerelease.join(".")}`),
        this.version
      );
    }
    toString() {
      return this.version;
    }
    compare(r) {
      if (
        (s("SemVer.compare", this.version, this.options, r), !(r instanceof e))
      ) {
        if ("string" == typeof r && r === this.version) return 0;
        r = new e(r, this.options);
      }
      return r.version === this.version
        ? 0
        : this.compareMain(r) || this.comparePre(r);
    }
    compareMain(r) {
      return (r instanceof e || (r = new e(r, this.options)),
      this.major < r.major)
        ? -1
        : this.major > r.major
          ? 1
          : this.minor < r.minor
            ? -1
            : this.minor > r.minor
              ? 1
              : this.patch < r.patch
                ? -1
                : +(this.patch > r.patch);
    }
    comparePre(r) {
      if (
        (r instanceof e || (r = new e(r, this.options)),
        this.prerelease.length && !r.prerelease.length)
      )
        return -1;
      if (!this.prerelease.length && r.prerelease.length) return 1;
      if (!this.prerelease.length && !r.prerelease.length) return 0;
      let t = 0;
      do {
        let e = this.prerelease[t],
          i = r.prerelease[t];
        if ((s("prerelease compare", t, e, i), void 0 === e && void 0 === i))
          return 0;
        if (void 0 === i) return 1;
        if (void 0 === e) return -1;
        else if (e === i) continue;
        else return p(e, i);
      } while (++t);
    }
    compareBuild(r) {
      r instanceof e || (r = new e(r, this.options));
      let t = 0;
      do {
        let e = this.build[t],
          i = r.build[t];
        if ((s("build compare", t, e, i), void 0 === e && void 0 === i))
          return 0;
        if (void 0 === i) return 1;
        if (void 0 === e) return -1;
        else if (e === i) continue;
        else return p(e, i);
      } while (++t);
    }
    inc(e, r, t) {
      if (e.startsWith("pre")) {
        if (!r && !1 === t)
          throw Error("invalid increment argument: identifier is empty");
        if (r) {
          let e = `-${r}`.match(
            this.options.loose ? o[a.PRERELEASELOOSE] : o[a.PRERELEASE],
          );
          if (!e || e[1] !== r) throw Error(`invalid identifier: ${r}`);
        }
      }
      switch (e) {
        case "premajor":
          ((this.prerelease.length = 0),
            (this.patch = 0),
            (this.minor = 0),
            this.major++,
            this.inc("pre", r, t));
          break;
        case "preminor":
          ((this.prerelease.length = 0),
            (this.patch = 0),
            this.minor++,
            this.inc("pre", r, t));
          break;
        case "prepatch":
          ((this.prerelease.length = 0),
            this.inc("patch", r, t),
            this.inc("pre", r, t));
          break;
        case "prerelease":
          (0 === this.prerelease.length && this.inc("patch", r, t),
            this.inc("pre", r, t));
          break;
        case "release":
          if (0 === this.prerelease.length)
            throw Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          ((0 !== this.minor ||
            0 !== this.patch ||
            0 === this.prerelease.length) &&
            this.major++,
            (this.minor = 0),
            (this.patch = 0),
            (this.prerelease = []));
          break;
        case "minor":
          ((0 !== this.patch || 0 === this.prerelease.length) && this.minor++,
            (this.patch = 0),
            (this.prerelease = []));
          break;
        case "patch":
          (0 === this.prerelease.length && this.patch++,
            (this.prerelease = []));
          break;
        case "pre": {
          let e = +!!Number(t);
          if (0 === this.prerelease.length) this.prerelease = [e];
          else {
            let s = this.prerelease.length;
            for (; --s >= 0; )
              "number" == typeof this.prerelease[s] &&
                (this.prerelease[s]++, (s = -2));
            if (-1 === s) {
              if (r === this.prerelease.join(".") && !1 === t)
                throw Error(
                  "invalid increment argument: identifier already exists",
                );
              this.prerelease.push(e);
            }
          }
          if (r) {
            let s = [r, e];
            (!1 === t && (s = [r]),
              ((e, r) => {
                let t = r.split(".");
                if (t.length > e.length) return !1;
                for (let r = 0; r < t.length; r++)
                  if (0 !== p(e[r], t[r])) return !1;
                return !0;
              })(this.prerelease, r)
                ? isNaN(this.prerelease[r.split(".").length]) &&
                  (this.prerelease = s)
                : (this.prerelease = s));
          }
          break;
        }
        default:
          throw Error(`invalid increment argument: ${e}`);
      }
      return (
        (this.raw = this.format()),
        this.build.length && (this.raw += `+${this.build.join(".")}`),
        this
      );
    }
  };
};
