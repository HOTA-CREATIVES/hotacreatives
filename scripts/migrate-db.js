// scripts/migrate-db.js
import { readFileSync } from "node:fs";
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

// Collection mapping: old name -> new clean name
const collectionMap = {
  blog_posts: "posts",
  blog_authors: "authors",
  blog_categories: "categories",
  blog_tags: "tags"
};

async function main() {
  try {
    console.log("Loading firestore backup data...");
    const backupData = JSON.parse(readFileSync("./firestore-backup.json", "utf8"));

    for (const [oldName, newName] of Object.entries(collectionMap)) {
      const documents = backupData[oldName];
      if (!documents || documents.length === 0) {
        console.log(`No documents found for collection: ${oldName}`);
        continue;
      }

      console.log(`Migrating ${documents.length} documents from "${oldName}" to "${newName}"...`);
      const batch = db.batch();

      documents.forEach(docData => {
        const { id, ...data } = docData;
        const docRef = db.collection(newName).doc(id);
        batch.set(docRef, data);
      });

      await batch.commit();
      console.log(`Successfully migrated collection "${newName}".`);
    }

    console.log("Migration completely finished! All data successfully recreated under the new clean schema.");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

main();
