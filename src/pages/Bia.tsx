import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputComponent from "../components/ui/InputComponent";
import Button from "../components/ui/Button";

const Bia: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [muscleMass, setMuscleMass] = useState<string>("");
  const [bodyFatMass, setBodyFatMass] = useState<string>("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>("");
  const navigate = useNavigate();

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleMuscleMassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMuscleMass(e.target.value);
  };

  const handleBodyFatMassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBodyFatMass(e.target.value);
  };

  const handleBodyFatPercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBodyFatPercentage(e.target.value);
  };

  const handleSubmit = () => {
    const updatedData = {
      weight,
      muscleMass,
      bodyFatMass,
      bodyFatPercentage,
    };
    console.log("Updated Body Composition Data:", updatedData);

    navigate("/meal");
  };

  return (
    <Container>
      <h1>체성분 데이터를 입력하세요ㄴ</h1>
      <div className="input-group">
        <label htmlFor="weight">체중</label>
        <InputComponent
          type="text"
          id="weight"
          placeholder="체중을 입력하세요"
          value={weight}
          onChange={handleWeightChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="muscleMass">골격근량</label>
        <InputComponent
          type="text"
          id="muscleMass"
          placeholder="골격근량을 입력하세요"
          value={muscleMass}
          onChange={handleMuscleMassChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="bodyFatMass">체지방량</label>
        <InputComponent
          type="text"
          id="bodyFatMass"
          placeholder="체지방량을 입력하세요"
          value={bodyFatMass}
          onChange={handleBodyFatMassChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="bodyFatPercentage">체지방률</label>
        <InputComponent
          type="text"
          id="bodyFatPercentage"
          placeholder="체지방률을 입력하세요"
          value={bodyFatPercentage}
          onChange={handleBodyFatPercentageChange}
        />
      </div>
      <Button text="다음" onClick={handleSubmit} color="main" />
    </Container>
  );
};

export default Bia;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;

    label {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 18px;
    }

    input {
      padding: 15px;
      font-size: 18px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }

  button {
    padding: 15px 30px;
    font-size: 18px;
    margin-top: 20px;
  }
`;
