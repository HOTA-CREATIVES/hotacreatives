// scripts/delete-old-db.js
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

const oldCollections = ["blog_posts", "blog_authors", "blog_categories", "blog_tags"];

async function deleteCollection(collectionName) {
  console.log(`Deleting collection: ${collectionName}...`);
  const snapshot = await db.collection(collectionName).get();
  if (snapshot.empty) {
    console.log(`Collection ${collectionName} is already empty.`);
    return;
  }

  const batch = db.batch();
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Successfully deleted all documents from "${collectionName}".`);
}

async function main() {
  try {
    for (const coll of oldCollections) {
      await deleteCollection(coll);
    }
    console.log("Cleanup successfully finished! Old Firestore blog collections are now completely removed.");
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
}

main();
