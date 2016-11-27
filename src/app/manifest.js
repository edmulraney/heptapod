import usersFeature from "./features/users"

export default {
  app: () => "hello",
  features: {
    usersFeature,
  },
  defaultFeature: usersFeature, // review if having default feaure is right idea.
}
