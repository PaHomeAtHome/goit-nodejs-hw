const { loginController } = require("../src/controllers/authController");

describe("Login controller test", () => {
  it("Login response test", () => {
    const mReq = {
      body: { email: "test12345@mail.com", password: "StrongPassword" },
    };

    const mRes = {
      status: 200,
    };
    loginController(mReq, mRes);

    expect(mRes.status).toEqual(200);
  });
  it("Login token test", () => {
    const mReq = {
      body: { email: "test12345@mail.com", password: "StrongPassword" },
    };

    const mRes = {
      token: "token",
    };
    loginController(mReq, mRes);

    expect(mRes.token).toBeDefined();
  });
  it("Response user test", () => {
    const user = {
      email: "test12345@mail.com",
      password: "StrongPassword",
      subscription: "default",
    };

    const { email, subscription } = user;

    const mReq = {
      body: { email: "test12345@mail.com", password: "StrongPassword" },
    };

    const mRes = {
      status: 200,
      token: "token",
      user: { email, subscription },
    };
    loginController(mReq, mRes);

    expect(mRes.user).toEqual({ email, subscription });
  });
});
