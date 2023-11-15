import Cookie from "js-cookie";

export const Cookies = {
  get: function (key: string) {
    return Cookie.get(key);
  },

  set: function (
    key: string,
    value: string,
    options?: Cookies.CookieAttributes | undefined
  ) {
    return Cookie.set(key, value, options);
  },
};
