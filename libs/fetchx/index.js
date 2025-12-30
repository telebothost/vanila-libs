export async function fetchy(url, opt = {}) {
  const {
    method,
    base,
    query,
    body,
    headers = {},
    timeout,
    creds = false,
    type = "json", // json | text | blob | buffer
    retry = 0,
    ok
  } = opt

  let u = base
    ? base.replace(/\/$/, "") + "/" + url.replace(/^\//, "")
    : url

  if (query) {
    const q = new URLSearchParams()
    for (const k in query)
      if (query[k] != null) q.append(k, query[k])
    u += (u.includes("?") ? "&" : "?") + q.toString()
  }

  const ac = timeout ? new AbortController() : null
  if (timeout) setTimeout(() => ac.abort(), timeout)

  const cfg = {
    method: method || (body ? "POST" : "GET"),
    headers: { ...headers },
    signal: ac?.signal,
    credentials: creds ? "include" : "same-origin"
  }

  cfg.headers["Accept"] ||= "*/*"

  if (body != null) {
    if (body instanceof FormData) {
      cfg.body = body
    } else if (typeof body === "object") {
      cfg.body = JSON.stringify(body)
      cfg.headers["Content-Type"] ||= "application/json"
    } else {
      cfg.body = body
    }
  }

  try {
    const r = await fetch(u, cfg)

    const pass = ok ? ok(r.status) : r.status >= 200 && r.status < 300
    if (!pass) throw r

    let d
    if (type === "text") d = await r.text()
    else if (type === "blob") d = await r.blob()
    else if (type === "buffer") d = await r.arrayBuffer()
    else d = await r.json()

    return {
      data: d,
      code: r.status,
      msg: r.statusText,
      head: Object.fromEntries(r.headers.entries()),
      url: r.url
    }
  } catch (e) {
    if (retry > 0)
      return fetchy(url, { ...opt, retry: retry - 1 })
    throw e
  }
}

/* helpers */
fetchy.get   = (u, o)      => fetchy(u, { ...o, method: "GET" })
fetchy.post  = (u, b, o)   => fetchy(u, { ...o, method: "POST", body: b })
fetchy.put   = (u, b, o)   => fetchy(u, { ...o, method: "PUT", body: b })
fetchy.patch = (u, b, o)   => fetchy(u, { ...o, method: "PATCH", body: b })
fetchy.del   = (u, o)      => fetchy(u, { ...o, method: "DELETE" })
fetchy.head  = (u, o)      => fetchy(u, { ...o, method: "HEAD" })
fetchy.opt   = (u, o)      => fetchy(u, { ...o, method: "OPTIONS" })
