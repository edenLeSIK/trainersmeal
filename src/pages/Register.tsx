import { useState, FormEvent } from "react";
import Input from "../components/ui/InputComponent";
import Button from "../components/ui/Button";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { lineGray, main } from "../styles/color";

const gyms = ["Gym A", "Gym B", "Gym C", "Gym D"];

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

  return (
    <Container>
      <img src={logo} alt="logo" className="logo" />
      <form onSubmit={handleRegister}>
        <Label>
          이름
          <Input
            type="text"
            placeholder="이름을 입력하세요"
            className="text-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>
        <Label>
          아이디
          <Input
            type="text"
            placeholder="ID를 입력하세요"
            className="text-input"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Label>
        <Button
          text="중복체크"
          onClick={() => {
            console.log("중복체크 클릭");
          }}
          className="duplicate-check-button"
          color=""
        />
        <Label>
          비밀번호
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="text-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </Label>
        <Label>
          비밀번호 확인
          <Input
            type="password"
            placeholder="비밀번호를 확인하세요"
            className="text-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <ErrorMessage>{confirmPasswordError}</ErrorMessage>
          )}
        </Label>
        <Label>
          이메일 주소
          <Input
            type="email"
            placeholder="이메일 주소를 입력하세요"
            className="text-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>
        <SelectWrapper>
          <label htmlFor="gym">헬스장 선택</label>
          <select
            id="gym"
            className="gym-select"
            value={selectedGym}
            onChange={(e) => setSelectedGym(e.target.value)}
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
        </SelectWrapper>
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

    .text-input {
      width: 250px;
      height: 40px;
      border-radius: 5px;
      border: 1px solid ${lineGray};
      padding: 0 10px;
      font-size: 16px;
    }

    .duplicate-check-button {
      margin-bottom: 10px;
    }

    .link-wrapper {
      margin: 20px 0;
      font-size: 14px;

      a {
        color: ${main};
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .register-button {
      margin-top: 20px;
    }
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  width: 100%;
  padding: 0 1.5em;

  .text-input {
    margin-top: 5px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 1.5em;

  label {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .gym-select {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid ${lineGray};
    padding: 0 10px;
    font-size: 16px;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  margin-top: 5px;
`;
