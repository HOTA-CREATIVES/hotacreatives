// scripts/backup-db.js
import { readFileSync, writeFileSync } from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  readFileSync("./.secrets/hota-creatives-firebase-adminsdk-fbsvc-609e7af7a3.json", "utf8")
);

const app = initializeApp({
  credential: cert(serviceAccount),
  projectId: "hota-creatives"
});

const db = getFirestore(app);

async function backupCollection(collectionName) {
  console.log(`Backing up collection: ${collectionName}...`);
  const snapshot = await db.collection(collectionName).get();
  const data = [];
  snapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() });
  });
  console.log(`Retrieved ${data.length} documents from ${collectionName}.`);
  return data;
}

async function main() {
  try {
    const backup = {
      blog_posts: await backupCollection("blog_posts"),
      blog_authors: await backupCollection("blog_authors"),
      blog_categories: await backupCollection("blog_categories"),
      blog_tags: await backupCollection("blog_tags")
    };

    writeFileSync("./firestore-backup.json", JSON.stringify(backup, null, 2), "utf8");
    console.log("Successfully backed up firestore data to firestore-backup.json!");
  } catch (error) {
    console.error("Backup failed:", error);
  }
}

main();
