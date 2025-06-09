import mongoose, { connections } from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/journal";

async function dbConnect() {
  mongoose
    .set("strictQuery", false)
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log(`Connected to DB}`))
    .catch((error) => console.log(error));
}

export default dbConnect;
