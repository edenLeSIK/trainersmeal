import { useState } from "react";
import { apiClient } from "../api";
import PersonalInfo from "../components/member/PersonalInfo";
import PhysicalInfo from "../components/member/PhysicalInfo";
import GoalActivityInfo from "../components/member/GoalActivityInfo";
import AddressDeliveryInfo from "../components/member/AddressDeliveryInfo";
import styled from "styled-components";

const Add: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("남");
  const [birthdate, setBirthdate] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [muscleMass, setMuscleMass] = useState<string>("");
  const [bodyFatMass, setBodyFatMass] = useState<string>("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>(
    "적당히 활동적 (주 3~5일 운동)"
  );
  const [goal, setGoal] = useState<string>("체중 유지");
  const [notes, setNotes] = useState<string>("");
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");
  const [entryMethod, setEntryMethod] = useState<string>("");
  const [entryPassword, setEntryPassword] = useState<string>("");

  const submitForm = async () => {
    const formData = {
      name,
      phone,
      gender,
      birthdate,
      height,
      weight,
      muscleMass, // 추가된 데이터
      bodyFatMass, // 추가된 데이터
      bodyFatPercentage, // 추가된 데이터
      activityLevel,
      goal,
      notes,
      address,
      detailAddress,
      deliveryMessage,
      entryMethod,
      entryPassword: entryMethod === "password" ? entryPassword : null,
    };

    try {
      const response = await apiClient.post("/api/submit", formData);
      console.log("서버 응답:", response.data);
      alert("회원 등록이 성공적으로 완료되었습니다.");
    } catch (error) {
      console.error("회원 등록 실패:", error);
      alert("회원 등록에 실패했습니다.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            gender={gender}
            setGender={setGender}
            birthdate={birthdate}
            setBirthdate={setBirthdate}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <PhysicalInfo
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            muscleMass={muscleMass}
            setMuscleMass={setMuscleMass}
            bodyFatMass={bodyFatMass}
            setBodyFatMass={setBodyFatMass}
            bodyFatPercentage={bodyFatPercentage}
            setBodyFatPercentage={setBodyFatPercentage}
            onNext={() => setStep(3)}
            onPrevious={() => setStep(1)}
          />
        );
      case 3:
        return (
          <GoalActivityInfo
            activityLevel={activityLevel}
            setActivityLevel={setActivityLevel}
            goal={goal}
            setGoal={setGoal}
            notes={notes}
            setNotes={setNotes}
            onNext={() => setStep(4)}
            onPrevious={() => setStep(2)}
          />
        );
      case 4:
        return (
          <AddressDeliveryInfo
            address={address}
            setAddress={setAddress}
            detailAddress={detailAddress}
            setDetailAddress={setDetailAddress}
            deliveryMessage={deliveryMessage}
            setDeliveryMessage={setDeliveryMessage}
            entryMethod={entryMethod}
            setEntryMethod={setEntryMethod}
            entryPassword={entryPassword}
            setEntryPassword={setEntryPassword}
            onRegister={submitForm}
            onPrevious={() => setStep(3)}
          />
        );
      default:
        return null;
    }
  };

  return <Container>{renderStep()}</Container>;
};

export default Add;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    margin-bottom: 20px;
    text-align: center;
  }
`;
