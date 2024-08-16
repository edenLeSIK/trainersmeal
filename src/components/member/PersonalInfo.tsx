import styled from "styled-components";
import Input from "../ui/InputComponent";
import Button from "../ui/Button";
import { main } from "../../styles/color";

interface PersonalInfoProps {
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  birthdate: string;
  setBirthdate: (value: string) => void;
  onNext: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  name,
  setName,
  phone,
  setPhone,
  gender,
  setGender,
  birthdate,
  setBirthdate,
  onNext,
}) => {
  return (
    <Container>
      <Input
        type="text"
        label="이름"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        label="전화번호"
        placeholder="전화번호를 입력하세요"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="gender-section">
        <label>성별</label>
        <div className="gender-toggle">
          <Button
            className={gender === "남" ? "active" : ""}
            onClick={() => setGender("남")}
            text="남"
          />
          <Button
            className={gender === "여" ? "active" : ""}
            onClick={() => setGender("여")}
            text="여"
          />
        </div>
      </div>
      <Input
        type="date"
        label="생년월일"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <Button onClick={onNext} text="다음" color="main" />
    </Container>
  );
};

export default PersonalInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .gender-section {
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      font-weight: bold;
    }

    .gender-toggle {
      display: flex;
      gap: 10px;

      button {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f5f5f5;
        cursor: pointer;

        &.active {
          background-color: ${main};
          color: white;
          border: 1px solid ${main};
        }
      }
    }
  }
`;
