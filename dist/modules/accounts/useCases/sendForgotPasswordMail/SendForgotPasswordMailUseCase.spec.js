"use strict";

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "702770",
      email: "lorvarsi@ojeuf.aw",
      name: "Gavin Mullins",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("lorvarsi@ojeuf.aw");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send an email if user does not exist", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("ejazeszep@hemveed.sh")).rejects.toEqual(new _AppError.AppError("User does not exist!"));
  });
  it("Should be able to create a new users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "092972",
      email: "ti@jan.mp",
      name: "Kenneth Ramos",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("ti@jan.mp");
    expect(generateTokenMail).toBeCalled();
  });
});