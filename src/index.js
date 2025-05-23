import { app } from "./app.js";

try {
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }); 
} catch (error) {
  console.error("Error starting the server:", error);
}
