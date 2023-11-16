const authRoutes = {
  login: {
    path: "/auth/login",
  },
  register: {
    path: "/auth/register",
  },
};

const rootRoutes = {
  home: {
    path: "/",
  },
  user: {
    view: {
      path: "/user/view"
    },
    edit: {
      path: "/user/edit"
    }
  }
};

export { authRoutes, rootRoutes };
