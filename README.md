# Ecommerce App

## Installation

1. Navigate to folder where you want to clone the repositary to.

```bash
$ cd location/of/folder
```

2. Clone the repositary.

```bash
$ git clone git@github.com:michalciberej/ecommerce-app.git
```

3. Move to cloned repositary.

```bash
$ cd ecommerce-app
```

4. Install dependencies.

```bash
$ npm install
```

5. To connect to database add .env file to the root of the project with MongoDB url string.

```js
// .env
DATABASE_URL = '<put MongoDB url string here>';
```

6. Generate prisma client.

```bash
$ npx prisma generate
```

7. Run the development server.

```bash
$ npm run dev
```

8. Open localhost:3000 with browser to see the result.
