// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "coinTradingView_timezone",
    r = "Etc/UTC",
    a = [
      "Etc/UTC",
      "Africa/Cairo",
      "Africa/Casablanca",
      "Africa/Johannesburg",
      "Africa/Lagos",
      "Africa/Nairobi",
      "Africa/Tunis",
      "America/Anchorage",
      "America/Argentina/Buenos_Aires",
      "America/Bogota",
      "America/Caracas",
      "America/Chicago",
      "America/El_Salvador",
      "America/Juneau",
      "America/Lima",
      "America/Los_Angeles",
      "America/Mexico_City",
      "America/New_York",
      "America/Phoenix",
      "America/Santiago",
      "America/Sao_Paulo",
      "America/Toronto",
      "America/Vancouver",
      "Asia/Almaty",
      "Asia/Ashkhabad",
      "Asia/Bahrain",
      "Asia/Bangkok",
      "Asia/Chongqing",
      "Asia/Colombo",
      "Asia/Dhaka",
      "Asia/Dubai",
      "Asia/Ho_Chi_Minh",
      "Asia/Hong_Kong",
      "Asia/Jakarta",
      "Asia/Jerusalem",
      "Asia/Karachi",
      "Asia/Kathmandu",
      "Asia/Kolkata",
      "Asia/Kuala_Lumpur",
      "Asia/Kuwait",
      "Asia/Manila",
      "Asia/Muscat",
      "Asia/Nicosia",
      "Asia/Qatar",
      "Asia/Riyadh",
      "Asia/Seoul",
      "Asia/Shanghai",
      "Asia/Singapore",
      "Asia/Taipei",
      "Asia/Tehran",
      "Asia/Tokyo",
      "Asia/Yangon",
      "Atlantic/Azores",
      "Atlantic/Reykjavik",
      "Australia/Adelaide",
      "Australia/Brisbane",
      "Australia/Perth",
      "Australia/Sydney",
      "Europe/Amsterdam",
      "Europe/Athens",
      "Europe/Belgrade",
      "Europe/Berlin",
      "Europe/Bratislava",
      "Europe/Brussels",
      "Europe/Bucharest",
      "Europe/Budapest",
      "Europe/Copenhagen",
      "Europe/Dublin",
      "Europe/Helsinki",
      "Europe/Istanbul",
      "Europe/Lisbon",
      "Europe/London",
      "Europe/Luxembourg",
      "Europe/Madrid",
      "Europe/Malta",
      "Europe/Moscow",
      "Europe/Oslo",
      "Europe/Paris",
      "Europe/Prague",
      "Europe/Riga",
      "Europe/Rome",
      "Europe/Stockholm",
      "Europe/Tallinn",
      "Europe/Vienna",
      "Europe/Vilnius",
      "Europe/Warsaw",
      "Europe/Zurich",
      "Pacific/Auckland",
      "Pacific/Chatham",
      "Pacific/Fakaofo",
      "Pacific/Honolulu",
      "Pacific/Norfolk",
      "US/Mountain",
    ],
    i = new Set(a),
    s = {
      UTC: "Etc/UTC",
      "America/Buenos_Aires": "America/Argentina/Buenos_Aires",
      "Asia/Ashgabat": "Asia/Ashkhabad",
      "Asia/Calcutta": "Asia/Kolkata",
      "Asia/Istanbul": "Europe/Istanbul",
      "Asia/Katmandu": "Asia/Kathmandu",
      "Asia/Rangoon": "Asia/Yangon",
      "Asia/Saigon": "Asia/Ho_Chi_Minh",
      "Asia/Tel_Aviv": "Asia/Jerusalem",
    },
    n = (e) => "string" == typeof e && i.has(e),
    o = {
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    },
    l = (e, t) => {
      let r = t.map((t) =>
        ((e, t) => {
          try {
            let r = new Intl.DateTimeFormat("en-US", {
                ...o,
                timeZone: e,
              }).formatToParts(t),
              a = (e) => Number(r.find((t) => t.type === e)?.value),
              i = Date.UTC(
                a("year"),
                a("month") - 1,
                a("day"),
                a("hour") % 24,
                a("minute"),
                a("second"),
              );
            if (!Number.isFinite(i)) return;
            return Math.round((i - t.getTime()) / 6e4);
          } catch {
            return;
          }
        })(e, t),
      );
      if (!r.some((e) => void 0 === e)) return r.join("/");
    },
    m = (e) => e.split("/")[0] ?? "",
    u = () =>
      ((e) => {
        let t;
        if (!e) return r;
        if (n(e)) return e;
        let i = s[e];
        if (i) return i;
        let o = [
            new Date(Date.UTC((t = new Date().getUTCFullYear()), 0, 15)),
            new Date(Date.UTC(t, 6, 15)),
          ],
          u = l(e, o);
        if (!u) return r;
        let c = a.filter((e) => l(e, o) === u);
        if (0 === c.length) return r;
        let d = m(e);
        return c.find((e) => m(e) === d) ?? c[0];
      })(
        (() => {
          try {
            let e = Intl.DateTimeFormat().resolvedOptions().timeZone;
            return "string" == typeof e && e.length > 0 ? e : void 0;
          } catch {
            return;
          }
        })(),
      );
  e.s([
    "e",
    0,
    t,
    "T",
    0,
    (e) => {
      if (e) {
        if (e === u())
          return void (() => {
            try {
              window.localStorage.removeItem(t);
            } catch {}
          })();
        if (n(e))
          try {
            window.localStorage.setItem(t, e);
          } catch {}
      }
    },
    "X",
    0,
    () =>
      (() => {
        try {
          let e = window.localStorage.getItem(t);
          return n(e) ? e : void 0;
        } catch {
          return;
        }
      })() ?? u(),
    "N",
    0,
    (e) => {
      try {
        let t = JSON.parse(e);
        if ("object" != typeof t || null === t) return;
        let r = t.timezone;
        return n(r) ? r : void 0;
      } catch {
        return;
      }
    },
  ]);
};
