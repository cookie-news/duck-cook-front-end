const authRoutes = {
  login: {
    path: "/auth/login",
  },
  register: {
    path: "/auth/register",
  },
};

const userRoutes = {
  view: {
    path: "/user/view",
  },
  edit: {
    path: "/user/edit",
  },
};

const recipeRoutes = {
  view: {
    path: "/recipe/view"
  },
};

const rootRoutes = {
  home: {
    path: "/",
  },
};

export { authRoutes, rootRoutes, userRoutes, recipeRoutes };
