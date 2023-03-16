const SignupController = require("../../../controllers/signup.controller");

const mockSignupService = () => ({
  createSignup: jest.fn(),
});

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

describe("signup-controller Layer Test", () => {
  let signupController = new SignupController();
  signupController.signupService = mockSignupService();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("get createSignup Success Case", async () => {
    mockRequest.body = jest.fn(() => {
      return {
        nickname: "test",
        password: "1234",
        confirm: "1234",
      };
    });

    // .mockReturnValueOnce({
    //   nickname: "test",
    //   password: "1234",
    //   confirm: "1234",
    // });

    // mockReturnValueOnce() 메서드는
    //  jest.fn(() => {
    //   return mockResponse;
    // });
    // 코드와 같다
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    mockResponse.json = jest.fn(() => {
      return "success";
    });

    await signupController.createSignup(mockRequest, mockResponse);

    expect(signupController.signupService.createSignup).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "회원 가입에 성공하였습니다.",
    });
  });
});
