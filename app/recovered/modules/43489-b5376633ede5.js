// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, o) => {
  var n =
    (e.e && e.e.__awaiter) ||
    function (e, t, o, n) {
      return new (o || (o = Promise))(function (i, r) {
        function a(e) {
          try {
            c(n.next(e));
          } catch (e) {
            r(e);
          }
        }
        function s(e) {
          try {
            c(n.throw(e));
          } catch (e) {
            r(e);
          }
        }
        function c(e) {
          var t;
          e.done
            ? i(e.value)
            : ((t = e.value) instanceof o
                ? t
                : new o(function (e) {
                    e(t);
                  })
              ).then(a, s);
        }
        c((n = n.apply(e, t || [])).next());
      });
    };
  (Object.defineProperty(o, "__esModule", { value: !0 }),
    (o.ref = o.init = void 0));
  let i = "_intercom_npm_loader",
    r = function () {
      r.loaderQueue(arguments);
    };
  ((r.q = []),
    (r.loaderQueue = function (e) {
      r.q.push(e);
    }));
  let a = function () {
      var e,
        t,
        o = document;
      if (!o.getElementById(i)) {
        var n = o.createElement("script");
        ((n.type = "text/javascript"),
          (n.async = !0),
          (n.id = i),
          (n.src =
            "https://widget.intercom.io/widget/" +
            (null == (e = window.intercomSettings) ? void 0 : e.app_id)));
        var r = o.getElementsByTagName("script")[0];
        null == (t = r.parentNode) || t.insertBefore(n, r);
      }
    },
    s = () =>
      "complete" === document.readyState ||
      "interactive" === document.readyState;
  ((o.init = () =>
    n(void 0, void 0, void 0, function* () {
      var e = window,
        t = e.Intercom;
      (e.intercomSettings &&
        (e.intercomSettings.installation_type = "npm-package"),
        "function" == typeof t
          ? (t("reattach_activator"), t("update", e.intercomSettings))
          : ((e.Intercom = r),
            s()
              ? a()
              : (document.addEventListener("readystatechange", function () {
                  s() && a();
                }),
                e.attachEvent
                  ? e.attachEvent("onload", a)
                  : e.addEventListener("load", a, !1))));
    })),
    (o.ref = void 0));
};
