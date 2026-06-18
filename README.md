# CIM Assistant - Chat Prototype

Conversational interface prototype for the Care Identity Management (CIM) programme.
Demonstrates natural language querying over identity/access data and actions including
smartcard issuance, authenticator registration/deregistration, and RA contact lookup.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Stack

- React 18
- Vite 5
- No external UI libraries - all styles are inline

## Scenarios covered

- Authenticator summary (counts by type, CIS1/CIS2 source)
- Inactive users (last used > 90 days, sourced from `fact_authenticator.last_used_date`)
- Issue smartcard (3-step flow - user lookup, card details, confirm - routes to CIS1)
- Register authenticator (CIS2 registration queue)
- Contact RA (lookup via `sem_user.ra_parent_org_code`)
- Deregister authenticator (logs to `fact_authenticator.is_deregistered`)
