// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(359162),
    n = e.i(895453),
    r = e.i(775975),
    i = e.i(589036),
    o = e.i(645912),
    s = e.i(70296),
    u = e.i(784548),
    a = e.i(950698),
    l = e.i(231103),
    c = e.i(63794),
    d = e.i(753603);
  function f(e, t) {
    return (
      null == e ||
      "string" == typeof e ||
      (n.s.error(`${t} must be defined as a string`), !1)
    );
  }
  function p(e, t) {
    return (
      void 0 === e ||
      !!(0, i.M)(e) ||
      (n.s.error(`${t} Sample Rate should be a number between 0 and 100`), !1)
    );
  }
  e.s([
    "v",
    0,
    {
      ALLOW: "allow",
      MASK: "mask",
      MASK_USER_INPUT: "mask-user-input",
      MASK_UNLESS_ALLOWLISTED: "mask-unless-allowlisted",
    },
    "y",
    0,
    { ALL: "all", SAMPLED: "sampled" },
    "S",
    0,
    p,
    "z",
    0,
    function (e) {
      return {
        session_sample_rate: e.sessionSampleRate,
        telemetry_sample_rate: e.telemetrySampleRate,
        telemetry_configuration_sample_rate: e.telemetryConfigurationSampleRate,
        telemetry_usage_sample_rate: e.telemetryUsageSampleRate,
        use_before_send: !!e.beforeSend,
        use_partitioned_cross_site_session_cookie:
          e.usePartitionedCrossSiteSessionCookie,
        use_secure_session_cookie: e.useSecureSessionCookie,
        use_proxy: !!e.proxy,
        silent_multiple_init: e.silentMultipleInit,
        track_session_across_subdomains: e.trackSessionAcrossSubdomains,
        track_anonymous_user: e.trackAnonymousUser,
        session_persistence: e.sessionPersistence,
        allow_fallback_to_local_storage: !!e.allowFallbackToLocalStorage,
        store_contexts_across_pages: !!e.storeContextsAcrossPages,
        allow_untrusted_events: !!e.allowUntrustedEvents,
        tracking_consent: e.trackingConsent,
        use_allowed_tracking_origins: Array.isArray(e.allowedTrackingOrigins),
        source: e.source,
        sdk_version: e.sdkVersion,
        variant: e.variant,
      };
    },
    "e",
    0,
    function (e, i) {
      var g, y, m, v, h, b, S, w, _, k, E;
      return e && e.clientToken
        ? void 0 === e.allowedTrackingOrigins ||
          Array.isArray(e.allowedTrackingOrigins)
          ? (!(E = e.site) ||
              "string" != typeof E ||
              /(datadog|ddog|datad0g|dd0g)/.test(E) ||
              (n.s.error(
                `Site should be a valid Datadog site. ${n.Z} ${n.e}/getting_started/site/.`,
              ),
              0)) &&
            p(e.sessionSampleRate, "Session") &&
            p(e.telemetrySampleRate, "Telemetry") &&
            p(e.telemetryConfigurationSampleRate, "Telemetry Configuration") &&
            p(e.telemetryUsageSampleRate, "Telemetry Usage") &&
            f(e.version, "Version") &&
            f(e.env, "Env") &&
            f(e.service, "Service") &&
            (0, l.f)(e, null != i ? i : "")
            ? void 0 === e.trackingConsent || (0, s.d)(a.e, e.trackingConsent)
              ? {
                  beforeSend:
                    e.beforeSend &&
                    (0, t.f)(e.beforeSend, "beforeSend threw an error:"),
                  sessionStoreStrategyType: c.Q ? void 0 : (0, u.W)(e),
                  sessionSampleRate:
                    null != (g = e.sessionSampleRate) ? g : 100,
                  telemetrySampleRate:
                    null != (y = e.telemetrySampleRate) ? y : 20,
                  telemetryConfigurationSampleRate:
                    null != (m = e.telemetryConfigurationSampleRate) ? m : 5,
                  telemetryUsageSampleRate:
                    null != (v = e.telemetryUsageSampleRate) ? v : 5,
                  service: null != (h = e.service) ? h : void 0,
                  env: null != (b = e.env) ? b : void 0,
                  version: null != (S = e.version) ? S : void 0,
                  datacenter: null != (w = e.datacenter) ? w : void 0,
                  silentMultipleInit: !!e.silentMultipleInit,
                  allowUntrustedEvents: !!e.allowUntrustedEvents,
                  trackingConsent:
                    null != (_ = e.trackingConsent) ? _ : a.e.GRANTED,
                  trackAnonymousUser: null == (k = e.trackAnonymousUser) || k,
                  storeContextsAcrossPages: !!e.storeContextsAcrossPages,
                  batchBytesLimit: 16 * o.A,
                  eventRateLimiterThreshold: 3e3,
                  maxTelemetryEventsPerPage: 15,
                  flushTimeout: 30 * r.R,
                  batchMessagesLimit: c.Q ? 1 : 50,
                  messageBytesLimit: 256 * o.A,
                  variant: e.variant,
                  sdkVersion: e.sdkVersion,
                  ...(0, d.W)(e),
                }
              : void n.s.error(
                  'Tracking Consent should be either "granted" or "not-granted"',
                )
            : void 0
          : void n.s.error("Allowed Tracking Origins must be an array")
        : void n.s.error(
            "Client Token is not configured, we will not send any data.",
          );
    },
  ]);
};
