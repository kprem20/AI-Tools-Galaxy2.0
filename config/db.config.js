module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-tools-galaxy',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  server: {
    port: process.env.PORT || 5000,
  }
};
