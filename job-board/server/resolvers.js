export const resolvers = {
  Query: {
    jobs: () => {
      return [
        {
          id: "1",
          title: "Software Engineer",
          description: "Awesome job of building software",
        },
      ];
    },
  },
};
