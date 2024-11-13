## dev

```
git clone https://github.com/samisthefbi/restful-housing
cd restful-housing
pnpm install

# start a postgres db & add its URL to .env
echo "DB_URL=postgresql://user:password@localhost:5432/postgres" > .env

pnpm run db:push
pnpm run dev
```
