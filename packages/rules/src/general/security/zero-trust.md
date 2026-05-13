# Zero trust

## TLDR

For network and system access, always verify every request regardless of origin. Never trust users or services based on network location alone. Good: identity-based micro-segmentation. Bad: trusting all internal LAN traffic.

## Problem

Perimeter-based security ("castle and moat") assumes internal traffic is inherently safe. Once an attacker breaches the perimeter, they move laterally across the entire network unchallenged. Static credentials and long-lived sessions increase the attack surface. Lack of granular visibility makes breach detection and containment extremely difficult.

## Good solution

Implement continuous authentication and authorization for every transaction. Use micro-segmentation to isolate workloads and minimize the blast radius. Verify identity, device health, and environmental context for every request.

```yaml
# GOOD: Explicit policy requiring identity for every internal service call
services:
  billing-api:
    access_control:
      - allow: service-account-worker
        requires: valid-mtls-certificate
        permissions: ['READ_PAYMENTS']
```

## Bad solution

Trusting "internal" or "private" networks implicitly without per-request verification.

```yaml
# BAD: Implicit trust for anything inside the local network
services:
  billing-api:
    access_control:
      - allow: 10.0.0.0/8 # Internal VPC range
        authentication: disabled
```

## Impact

- **Security**: Significantly reduces risk of lateral movement and minimizes attack surface.
- **Reliability**: Explicit service dependencies and authorization contracts improve system stability.
- **Maintainability**: Granular access policies easier to audit and update than broad network rules.

## Exceptions

- **Localhost development**: Development environments where full identity overhead is prohibitive (though parity is preferred).
- **Legacy air-gapped systems**: Environments with absolute physical isolation (still carries risk from insider threats).

## References

- [Wikipedia: Zero trust architecture](https://en.wikipedia.org/wiki/Zero_trust_architecture)
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
