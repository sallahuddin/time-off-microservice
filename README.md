# Time-Off Microservice

Production-style NestJS microservice for time-off balance management with:
- HCM synchronization
- Reservation-based balance handling
- Ledger auditing
- Defensive validation
- Reconciliation support
- SQLite persistence

## Run

```bash
npm install
npm run start:dev
```

## Endpoints

### Get Balance
GET /balances/:employeeId/:locationId

### Create Time Off Request
POST /requests

{
  "employeeId": "emp_1",
  "locationId": "loc_1",
  "days": 2
}

### HCM Balance Sync
POST /balances/sync

## Engineering Highlights

- Optimistic concurrency strategy
- Reservation model to prevent overspending
- Ledger-based auditing
- Eventual consistency
- Mock HCM integration
- Failure simulation