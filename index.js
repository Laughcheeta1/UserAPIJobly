const app = require('./app');

const port = 8082;

// connectDb();
app.listen(
    port,
    () => console.log(`RegisterApi is running on port ${port}`)
)