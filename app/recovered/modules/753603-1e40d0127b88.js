// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(303509),
    n = e.i(775975),
    r = e.i(141898),
    i = e.i(839476);
  function o(e, t, o) {
    let u = (function (e, t) {
      let n = `/api/v2/${t}`,
        i = e.proxy;
      if ("string" == typeof i) {
        let e = (0, r.X)(i);
        return (t) => `${e}?ddforward=${encodeURIComponent(`${n}?${t}`)}`;
      }
      if ("function" == typeof i) return (e) => i({ path: n, parameters: e });
      let o = s(t, e);
      return (e) => `https://${o}${n}?${e}`;
    })(e, t);
    return {
      build: (r, s) =>
        u(
          (function (
            {
              clientToken: e,
              internalAnalyticsSubdomain: t,
              source: r = "browser",
            },
            o,
            s,
            { retry: u, encoding: a },
            l = [],
          ) {
            let c = [
              `ddsource=${r}`,
              `dd-api-key=${e}`,
              `dd-evp-origin-version=${encodeURIComponent("6.22.0")}`,
              "dd-evp-origin=browser",
              `dd-request-id=${(0, i.o)()}`,
            ].concat(l);
            return (
              a && c.push(`dd-evp-encoding=${a}`),
              "rum" === o &&
                (c.push(`batch_time=${(0, n.J)()}`, `_dd.api=${s}`),
                u &&
                  c.push(
                    `_dd.retry_count=${u.count}`,
                    `_dd.retry_after=${u.lastFailureStatus}`,
                  )),
              t && c.reverse(),
              c.join("&")
            );
          })(e, t, r, s, o),
        ),
      trackType: t,
    };
  }
  function s(e, n) {
    let { site: r = t.Z, internalAnalyticsSubdomain: i } = n;
    if ("logs" === e && n.usePciIntake && r === t.Z) return t.I;
    if (i && r === t.Z) return `${i}.${t.Z}`;
    if (r === t.Y) return `http-intake.logs.${r}`;
    let o = r.split("."),
      s = o.pop();
    return `browser-intake-${o.join("-")}.${s}`;
  }
  (e.s(["g", 0, s, "p", 0, o], 318491),
    e.s(
      [
        "W",
        0,
        function (e) {
          var n, r;
          let i = e.site || t.Z,
            s = "flutter" === (n = e.source) || "unity" === n ? n : "browser",
            u = {
              logsEndpointBuilder: o(
                (r = { ...e, site: i, source: s }),
                "logs",
              ),
              rumEndpointBuilder: o(r, "rum"),
              profilingEndpointBuilder: o(r, "profile"),
              sessionReplayEndpointBuilder: o(r, "replay"),
              exposuresEndpointBuilder: o(r, "exposures"),
            };
          return {
            replica: (function (e) {
              if (!e.replica) return;
              let n = { ...e, site: t.Z, clientToken: e.replica.clientToken };
              return {
                logsEndpointBuilder: o(n, "logs"),
                rumEndpointBuilder: o(n, "rum", [
                  `application.id=${e.replica.applicationId}`,
                ]),
              };
            })({ ...e, site: i, source: s }),
            site: i,
            source: s,
            ...u,
          };
        },
        "j",
        0,
        function (e) {
          return t.a.every((t) => e.includes(t));
        },
      ],
      753603,
    ));
};
