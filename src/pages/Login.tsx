import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styled from "styled-components";
import logo from "../assets/logo.png";
import naver from "../assets/auth/naver.png";
import { FcGoogle } from "react-icons/fc";
import { lineGray, main, mainBlack } from "../styles/color";

const Login = () => {
  return (
    <Container>
      <img src={logo} alt="logo" className="logo" />
      <form onSubmit={() => {}}>
        <Input
          type="text"
          placeholder="ID를 입력하세요"
          className="text-input"
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="text-input"
        />
        <div className="sub-func-wrapper">
          <div className="checkbox-wrapper">
            <Input type="checkbox" id="auto-login" className="checkbox" />
            <label htmlFor="auto-login">로그인 유지</label>
          </div>
          <Link to="/forgot-password">비밀번호 찾기</Link>
        </div>
        <Button
          text="로그인"
          onClick={() => {
            console.log(1);
          }}
          className="login-button"
          color="main"
        />
        <div className="link-wrapper">
          <Link to="/register">회원가입</Link>
          <span className="separator">|</span>
          <Link to="/forgot-email">이메일 찾기</Link>
        </div>
        <div className="social-login-wrapper">
          <div className="social-buttons">
            <img src={naver} alt="naver-logo" className="social-button" />
            <FcGoogle className="social-button google" />
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Login;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .logo {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 1em;

    .text-input {
      width: 250px;
      height: 40px;
      border-radius: 5px;
    }

    .sub-func-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .checkbox-wrapper {
        display: flex;
        align-items: center;

        .checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          appearance: none;
          border: 1px solid ${lineGray};
          outline: none;
          cursor: pointer;
        }

        .checkbox:checked {
          background-color: ${main};
          border: 1px solid ${main};
        }
      }

      a {
        padding: 0;
        text-align: center;
        font-size: 16px;
      }
    }

    .link-wrapper {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      font-size: 14px;

      .separator {
        margin: 0 5px;
        color: ${lineGray};
      }
    }

    .social-login-wrapper {
      .social-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;

        .social-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .google {
          padding: 5px;
        }
      }
    }
  }
`;
