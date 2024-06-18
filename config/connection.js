const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://bidaribaivab7:(meropassword12)@cluster0.l1lbpsa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
    }
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
