// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    ACTION_SUFFIX: function () {
      return g;
    },
    APP_DIR_ALIAS: function () {
      return B;
    },
    CACHE_ONE_YEAR_SECONDS: function () {
      return N;
    },
    DOT_NEXT_ALIAS: function () {
      return L;
    },
    ESLINT_DEFAULT_DIRS: function () {
      return eo;
    },
    GSP_NO_RETURNED_VALUE: function () {
      return et;
    },
    GSSP_COMPONENT_MEMBER_ERROR: function () {
      return ea;
    },
    GSSP_NO_RETURNED_VALUE: function () {
      return en;
    },
    HTML_CONTENT_TYPE_HEADER: function () {
      return u;
    },
    INFINITE_CACHE: function () {
      return I;
    },
    INSTRUMENTATION_HOOK_FILENAME: function () {
      return k;
    },
    JSON_CONTENT_TYPE_HEADER: function () {
      return o;
    },
    MATCHED_PATH_HEADER: function () {
      return s;
    },
    MIDDLEWARE_FILENAME: function () {
      return F;
    },
    MIDDLEWARE_LOCATION_REGEXP: function () {
      return j;
    },
    NEXT_BODY_SUFFIX: function () {
      return S;
    },
    NEXT_CACHE_IMPLICIT_TAG_ID: function () {
      return C;
    },
    NEXT_CACHE_REVALIDATED_TAGS_HEADER: function () {
      return P;
    },
    NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function () {
      return E;
    },
    NEXT_CACHE_ROOT_PARAM_TAG_ID: function () {
      return M;
    },
    NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function () {
      return w;
    },
    NEXT_CACHE_TAGS_HEADER: function () {
      return R;
    },
    NEXT_CACHE_TAG_MAX_ITEMS: function () {
      return A;
    },
    NEXT_CACHE_TAG_MAX_LENGTH: function () {
      return O;
    },
    NEXT_DATA_SUFFIX: function () {
      return v;
    },
    NEXT_INTERCEPTION_MARKER_PREFIX: function () {
      return c;
    },
    NEXT_META_SUFFIX: function () {
      return _;
    },
    NEXT_NAV_DEPLOYMENT_ID_HEADER: function () {
      return m;
    },
    NEXT_QUERY_PARAM_PREFIX: function () {
      return i;
    },
    NEXT_RESUME_HEADER: function () {
      return b;
    },
    NEXT_RESUME_STATE_LENGTH_HEADER: function () {
      return T;
    },
    NON_STANDARD_NODE_ENV: function () {
      return el;
    },
    PAGES_DIR_ALIAS: function () {
      return H;
    },
    PRERENDER_REVALIDATE_HEADER: function () {
      return f;
    },
    PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function () {
      return d;
    },
    PROXY_FILENAME: function () {
      return D;
    },
    PROXY_LOCATION_REGEXP: function () {
      return U;
    },
    PUBLIC_DIR_MIDDLEWARE_CONFLICT: function () {
      return W;
    },
    ROOT_DIR_ALIAS: function () {
      return x;
    },
    RSC_ACTION_CLIENT_WRAPPER_ALIAS: function () {
      return Y;
    },
    RSC_ACTION_ENCRYPTION_ALIAS: function () {
      return G;
    },
    RSC_ACTION_PROXY_ALIAS: function () {
      return K;
    },
    RSC_ACTION_VALIDATE_ALIAS: function () {
      return $;
    },
    RSC_CACHE_WRAPPER_ALIAS: function () {
      return q;
    },
    RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function () {
      return X;
    },
    RSC_MOD_REF_PROXY_ALIAS: function () {
      return V;
    },
    RSC_SEGMENTS_DIR_SUFFIX: function () {
      return h;
    },
    RSC_SEGMENT_SUFFIX: function () {
      return p;
    },
    RSC_SUFFIX: function () {
      return y;
    },
    SERVER_PROPS_EXPORT_ERROR: function () {
      return ee;
    },
    SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function () {
      return Q;
    },
    SERVER_PROPS_SSG_CONFLICT: function () {
      return J;
    },
    SERVER_RUNTIME: function () {
      return ei;
    },
    SSG_FALLBACK_EXPORT_ERROR: function () {
      return eu;
    },
    SSG_GET_INITIAL_PROPS_CONFLICT: function () {
      return z;
    },
    STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function () {
      return Z;
    },
    TEXT_PLAIN_CONTENT_TYPE_HEADER: function () {
      return l;
    },
    UNSTABLE_REVALIDATE_RENAME_ERROR: function () {
      return er;
    },
    WEBPACK_LAYERS: function () {
      return ef;
    },
    WEBPACK_RESOURCE_QUERIES: function () {
      return ed;
    },
    WEB_SOCKET_MAX_RECONNECTIONS: function () {
      return ec;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = "text/plain",
    u = "text/html; charset=utf-8",
    o = "application/json; charset=utf-8",
    i = "nxtP",
    c = "nxtI",
    s = "x-matched-path",
    f = "x-prerender-revalidate",
    d = "x-prerender-revalidate-if-generated",
    h = ".segments",
    p = ".segment.rsc",
    y = ".rsc",
    g = ".action",
    v = ".json",
    _ = ".meta",
    S = ".body",
    m = "x-nextjs-deployment-id",
    R = "x-next-cache-tags",
    P = "x-next-revalidated-tags",
    E = "x-next-revalidate-tag-token",
    b = "next-resume",
    T = "x-next-resume-state-length",
    A = 128,
    O = 256,
    w = 1024,
    C = "_N_T_",
    M = "_N_RP_",
    N = 31536e3,
    I = 0xfffffffe,
    F = "middleware",
    j = `(?:src/)?${F}`,
    D = "proxy",
    U = `(?:src/)?${D}`,
    k = "instrumentation",
    H = "private-next-pages",
    L = "private-dot-next",
    x = "private-next-root-dir",
    B = "private-next-app-dir",
    V = "private-next-rsc-mod-ref-proxy",
    $ = "private-next-rsc-action-validate",
    K = "private-next-rsc-server-reference",
    q = "private-next-rsc-cache-wrapper",
    X = "private-next-rsc-track-dynamic-import",
    G = "private-next-rsc-action-encryption",
    Y = "private-next-rsc-action-client-wrapper",
    W =
      "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict",
    z =
      "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps",
    Q =
      "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.",
    J =
      "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps",
    Z =
      "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props",
    ee =
      "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export",
    et =
      "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?",
    en =
      "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?",
    er =
      "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.",
    ea =
      "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member",
    el =
      'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env',
    eu =
      "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export",
    eo = ["app", "pages", "components", "lib", "src"],
    ei = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs",
    },
    ec = 12,
    es = {
      shared: "shared",
      reactServerComponents: "rsc",
      serverSideRendering: "ssr",
      actionBrowser: "action-browser",
      apiNode: "api-node",
      apiEdge: "api-edge",
      middleware: "middleware",
      instrument: "instrument",
      edgeAsset: "edge-asset",
      appPagesBrowser: "app-pages-browser",
      pagesDirBrowser: "pages-dir-browser",
      pagesDirEdge: "pages-dir-edge",
      pagesDirNode: "pages-dir-node",
    },
    ef = {
      ...es,
      GROUP: {
        builtinReact: [es.reactServerComponents, es.actionBrowser],
        serverOnly: [
          es.reactServerComponents,
          es.actionBrowser,
          es.instrument,
          es.middleware,
        ],
        neutralTarget: [es.apiNode, es.apiEdge],
        clientOnly: [es.serverSideRendering, es.appPagesBrowser],
        bundled: [
          es.reactServerComponents,
          es.actionBrowser,
          es.serverSideRendering,
          es.appPagesBrowser,
          es.shared,
          es.instrument,
          es.middleware,
        ],
        appPages: [
          es.reactServerComponents,
          es.serverSideRendering,
          es.appPagesBrowser,
          es.actionBrowser,
        ],
      },
    },
    ed = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__",
    };
};
