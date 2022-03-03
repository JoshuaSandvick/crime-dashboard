import { Client } from "pg";
import path from "path";

async function openDb() {
  const databaseConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : ""),
      };
  const client = new Client(databaseConfig);
  await client.connect();
  return client;
}

export async function getUsers() {
  const db = await openDb();
  const result = await db.query("SELECT * FROM Users");
  await db.end();
}

export async function addUser(userID: string) {
  let success = true;
  let db: Client | undefined = undefined;
  try {
    db = await openDb();
    await db.query("INSERT INTO Users(ID) VALUES ($1) ON CONFLICT DO NOTHING", [
      userID,
    ]);
  } catch (error) {
    console.log(error);
    success = false;
  } finally {
    if (db) {
      db.end();
    }
  }

  return success;
}

export async function saveDashboard(
  userID: string,
  dashboardID: string,
  widgets: string
) {
  let success = true;
  let db: Client | undefined = undefined;
  try {
    db = await openDb();
    const result = await db.query(
      "INSERT INTO Dashboard VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET (id, user_id, widgets) = (EXCLUDED.id, EXCLUDED.user_id, EXCLUDED.widgets)",
      [dashboardID, userID, widgets]
    );
  } catch (error) {
    console.log(error);
    success = false;
  } finally {
    if (db) {
      db.end();
    }
  }

  return success;
}

export async function loadDashboard(dashboardID: string) {
  let widgets: any;
  let db: Client | undefined = undefined;
  try {
    db = await openDb();
    const result = await db.query(
      "SELECT Widgets FROM Dashboard WHERE ID = $1",
      [dashboardID]
    );
    widgets = result.rows[0].widgets;
  } catch (error) {
    console.log(error);
  } finally {
    if (db) {
      db.end();
    }
  }

  return widgets;
}

export async function loadDashboardsList(userID: string) {
  let result: any;
  let db: Client | undefined = undefined;
  try {
    db = await openDb();
    let dashboardsList = await db.query(
      "SELECT ID FROM Dashboard WHERE User_ID = $1",
      [userID]
    );
    result = dashboardsList.rows;
  } catch (error) {
    console.log(error);
  } finally {
    if (db) {
      db.end();
    }
  }

  return result;
}
