import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <Container>
      <img src={logo} alt="logo" />
      <Input type="text" placeholder="ID" />
      <Input type="password" placeholder="비밀번호" />
      <div>
        <Input type="checkbox" id="auto-login" />
        <label htmlFor="auto-login">자동 로그인</label>
      </div>
      <Button text="로그인" />

      <Link to="/register">가입하기</Link>
      <Link to="/forgot-password">비밀번호 찾기</Link>
    </Container>
  );
};

export default Login;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  div {
    margin-bottom: 10px;
  }

  a {
    margin-top: 10px;
    color: blue;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
