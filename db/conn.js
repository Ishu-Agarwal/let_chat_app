const mongoose = require('mongoose');
const db = process.env.DATABASE;
    // Connect to the MongoDB cluster

const connectDB = async () => {
	try {
		await mongoose.connect(db
    //   ,{
    //                useNewUrlParser: true,
    //     useCreateIndex:true,
    //      useUnifiedTopology: true,
    //      useFindAndModify:false 
    //   }
	  );
		console.log("connected");
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};
connectDB();