import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

async function openDb() {
  return open({
    filename: path.join(__dirname, "./crime_dboard_db.db"),
    driver: sqlite3.Database,
  });
}

export async function getUsers() {
  const db = await openDb();
  const result = await db.get("SELECT * FROM User");
  await db.close();
}

export async function saveDashboard(
  userID: string,
  dashboardID: string,
  widgets: string
) {
  let success = true;
  let db: Database<sqlite3.Database, sqlite3.Statement> | undefined = undefined;
  try {
    db = await openDb();
    const result = await db.run(
      "INSERT INTO Dashboard VALUES ($id, $userID, $widgets)",
      { $id: dashboardID, $userID: userID, $widgets: widgets }
    );
  } catch (error) {
    console.log(error);
    success = false;
  } finally {
    if (db) {
      db.close();
    }
  }

  return success;
}

export async function loadDashboard(dashboardID: string) {
  let result: any;
  let db: Database<sqlite3.Database, sqlite3.Statement> | undefined = undefined;
  try {
    db = await openDb();
    result = await db.get(
      "SELECT Widgets FROM Dashboard WHERE ID = ?",
      dashboardID
    );
    result = result ? result.Widgets : result;
  } catch (error) {
    console.log(error);
  } finally {
    if (db) {
      db.close();
    }
  }

  return result;
}

export async function loadDashboardsList(userID: string) {
  let result: any;
  let db: Database<sqlite3.Database, sqlite3.Statement> | undefined = undefined;
  try {
    db = await openDb();
    result = await db.all("SELECT ID FROM Dashboard WHERE User_ID = ?", userID);
  } catch (error) {
    console.log(error);
  } finally {
    if (db) {
      db.close();
    }
  }

  return result;
}
