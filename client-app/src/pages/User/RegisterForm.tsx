import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../../functions/AccouontRequests";
import { UserRegisterType } from "../../Type/Types";
import { UserContext } from "../../Context/UserContext";
import SubmitButton from "../../components/UI/SubmitButton";
import Container from "../../components/UI/Container";
import { NotificationContext } from "../../Context/NotificationContext";

const RegisterForm = () => {
  //States
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  //Contexts
  const context = useContext(UserContext);
  const notification = useContext(NotificationContext);

  //Hooks
  const navigate = useNavigate();

  //Input Handler
  const usernameChangeHandler = (event: any) => {
    setUsername(event.target.value);
  };
  const confirmPasswordChangeHandler = (event: any) => {
    setConfirmPassword(event.target.value);
  };
  const passwordChangeHandler = (event: any) => {
    setPassword(event.target.value);
  };
  const emailChangeHandler = (event: any) => {
    setEmail(event.target.value);
  };

  //Submir Handler
  const submitHandler = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      if (password !== confirmPassword) {
        setError("Passwords need to match!");
      }
      const userInfo: UserRegisterType = {
        email: email,
        username: username,
        password: password,
      };
      const response = await register(userInfo);
      context.logIn(response);
      setIsLoading(false);
      setError(null);
      notification.addNotification({
        code: "REGISTERED",
        text: "Your user was successfully registered! You are now logged in.",
        error: false,
      });
      navigate("/");
    } catch (ex: any) {
      setError(ex.message);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <h1 className="title">Register </h1>
        {error && <p className="error centered-message">{error}</p>}

        <div className="form-pair">
          <label>Username</label>
          <input
            type="text"
            className="input-add input-dark"
            onChange={usernameChangeHandler}
            placeholder="Username"
          />
        </div>

        <div className="form-pair">
          <label>Email</label>
          <input
            type="text"
            className="input-add input-dark"
            onChange={emailChangeHandler}
            placeholder="Email"
          />
        </div>

        <div className="form-pair">
          <label>Password</label>
          <input
            type="password"
            className="input-add input-dark"
            onChange={passwordChangeHandler}
            placeholder="Password"
          />
        </div>

        <div className="form-pair">
          <label>Confirm Password</label>
          <input
            type="password"
            className="input-add input-dark"
            onChange={confirmPasswordChangeHandler}
            placeholder="Confirm password"
          />
        </div>

        <SubmitButton loading={isLoading} buttonText={"Register"} />
      </form>
    </Container>
  );
};

export default RegisterForm;