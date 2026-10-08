// Structured audit log for access-control decisions. Not yet wired up to any route — in
// production this would ship to the security team's log pipeline; for now it writes to
// stdout so denied attempts are at least visible in the service's own logs.
export function logAccessDenied(event: { actorId: string; resource: string; reason: string }) {
  console.warn(JSON.stringify({ type: 'access_denied', ...event, at: new Date().toISOString() }))
}
