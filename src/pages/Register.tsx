import { useState, FormEvent, ChangeEvent } from "react";
import Input from "../components/ui/InputComponent";
import Button from "../components/ui/Button";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { lineGray } from "../styles/color";

const gyms = ["Cozy", "Gym B", "Gym C", "Gym D"];

const Register = () => {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedGym, setSelectedGym] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!validatePassword(password)) {
      setPasswordError("비밀번호는 8자 이상 입력해주세요.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      try {
        console.log(
          "Name:",
          name,
          "ID:",
          id,
          "Email:",
          email,
          "Password:",
          password,
          "Gym:",
          selectedGym
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDuplicateCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 아이디 중복체크 로직
    console.log("중복체크 클릭:", id);
  };

  return (
    <Container>
      <img src={logo} alt="logo" className="logo" />
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <Input
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            className="text-input"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <div className="id-group">
            <Input
              type="text"
              id="id"
              placeholder="ID를 입력하세요"
              className="text-input"
              value={id}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setId(e.target.value)
              }
            />
            <Button
              text="중복체크"
              onClick={handleDuplicateCheck}
              className="duplicate-check-button"
              color="main"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            className="text-input"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {passwordError && (
            <span className="error-message">{passwordError}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 확인하세요"
            className="text-input"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          {confirmPasswordError && (
            <span className="error-message">{confirmPasswordError}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일 주소</label>
          <Input
            type="email"
            id="email"
            placeholder="이메일 주소를 입력하세요"
            className="text-input"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="gym">헬스장 선택</label>
          <select
            id="gym"
            className="gym-select"
            value={selectedGym}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectedGym(e.target.value)
            }
          >
            <option value="" disabled>
              헬스장을 선택하세요
            </option>
            {gyms.map((gym) => (
              <option key={gym} value={gym}>
                {gym}
              </option>
            ))}
          </select>
        </div>
        <Button
          text="회원 가입"
          onClick={handleRegister}
          className="register-button"
          color="main"
        />
      </form>
    </Container>
  );
};

export default Register;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  .logo {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 1em;
    width: 400px;

    .form-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 14px;
      width: 100%;
      padding: 0 1.5em;

      .id-group {
        display: flex;
        justify-content: space-between;
        width: inherit;

        .duplicate-check-button {
          height: 100%;
        }
      }

      label {
        margin-bottom: 5px;
      }

      .text-input,
      .gym-select {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid ${lineGray};
        padding: 0 10px;
        font-size: 16px;
      }
    }

    .register-button {
      margin-top: 20px;
    }

    .error-message {
      font-size: 12px;
      margin-top: 5px;
    }
  }
`;
