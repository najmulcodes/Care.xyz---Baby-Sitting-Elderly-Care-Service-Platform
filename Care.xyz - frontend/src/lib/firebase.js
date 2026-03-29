import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY6h64JNeXyP3LfC4JifPb4VNksXCl0cc",
  authDomain: "care-service-platform.firebaseapp.com",
  projectId: "care-service-platform",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
