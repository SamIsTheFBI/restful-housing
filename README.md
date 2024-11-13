## dev

```bash
git clone https://github.com/samisthefbi/restful-housing
cd restful-housing
pnpm install

# start a postgres db & add its URL to .env
echo "DB_URL=postgresql://user:password@localhost:5432/postgres" > .env

# add base url
echo "BASE_URL=http://localhost:3000" >> .env

pnpm run db:push
pnpm run dev
```
