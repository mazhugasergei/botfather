export const envCheck = ({ keys, local = false }) => {
  if (!keys) return

  const missing = keys
    .map((key) => {
      if (!process.env[key]) return key
    })
    .filter(Boolean)

  if (missing.length) {
    console.error(
      `Missing .env${local ? ".local" : ""} variable${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`
    )
    process.exit(1)
  }
}
