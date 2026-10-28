// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => (e * Math.PI) / 180;
  e.s([
    "k",
    0,
    1e3,
    "Y",
    0,
    function (e) {
      let { center: r, radiusMeters: n } = e,
        a = t(r.lat),
        i = (n / 6371e3) * (180 / Math.PI),
        o = i / Math.max(Math.cos(a), 1e-6);
      return [
        [r.lng - o, r.lat - i],
        [r.lng + o, r.lat + i],
      ];
    },
    "K",
    0,
    function (e) {
      let { center: r, radiusMeters: n, steps: a = 64 } = e,
        i = [],
        o = t(r.lat),
        s = (n / 6371e3) * (180 / Math.PI),
        l = s / Math.max(Math.cos(o), 1e-6);
      for (let e = 0; e <= a; e += 1) {
        let t = (e / a) * 2 * Math.PI;
        i.push([r.lng + l * Math.cos(t), r.lat + s * Math.sin(t)]);
      }
      return {
        type: "Feature",
        properties: {},
        geometry: { type: "Polygon", coordinates: [i] },
      };
    },
    "U",
    0,
    function (e) {
      if (e < 1e3) return `${Math.round(e)} m`;
      let t = e / 1e3;
      return t >= 10 ? `${Math.round(t)} km` : `${t.toFixed(1)} km`;
    },
    "I",
    0,
    function (e, r) {
      let n = t(r.lat - e.lat),
        a = t(r.lng - e.lng),
        i = t(e.lat),
        o = t(r.lat),
        s = Math.sin(n / 2),
        l = Math.sin(a / 2);
      return (
        12742e3 *
        Math.asin(
          Math.min(1, Math.sqrt(s * s + Math.cos(i) * Math.cos(o) * l * l)),
        )
      );
    },
    "Z",
    0,
    function (e) {
      let { value: t, minMeters: r, maxMeters: n } = e,
        a = Math.log(r);
      return Math.round(
        Math.exp(a + (Math.min(Math.max(t, 0), 1e3) / 1e3) * (Math.log(n) - a)),
      );
    },
    "f",
    0,
    function (e) {
      let { meters: t, minMeters: r, maxMeters: n } = e,
        a = Math.min(Math.max(t, r), n),
        i = Math.log(r);
      return Math.round(((Math.log(a) - i) / (Math.log(n) - i)) * 1e3);
    },
  ]);
};
