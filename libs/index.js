//helper to copy any text to clipboard 
export async function c(t) {
  if (t == null) return false
  t = String(t)

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(t)
      return true
    } catch {}
  }

  try {
    const e = document.createElement("textarea")
    e.value = t
    e.readOnly = true
    e.style.position = "fixed"
    e.style.opacity = "0"
    document.body.appendChild(e)
    e.select()
    e.setSelectionRange(0, t.length)
    if (document.execCommand("copy")) {
      document.body.removeChild(e)
      return true
    }
    document.body.removeChild(e)
  } catch {}

  try {
    const e = document.createElement("input")
    e.value = t
    e.readOnly = true
    e.style.position = "fixed"
    e.style.opacity = "0"
    document.body.appendChild(e)
    e.select()
    if (document.execCommand("copy")) {
      document.body.removeChild(e)
      return true
    }
    document.body.removeChild(e)
  } catch {}

  try {
    const e = document.createElement("div")
    e.textContent = t
    e.contentEditable = "true"
    e.style.position = "fixed"
    e.style.opacity = "0"
    document.body.appendChild(e)
    const r = document.createRange()
    r.selectNodeContents(e)
    const s = getSelection()
    s.removeAllRanges()
    s.addRange(r)
    if (document.execCommand("copy")) {
      document.body.removeChild(e)
      return true
    }
    document.body.removeChild(e)
  } catch {}

  return false
}
