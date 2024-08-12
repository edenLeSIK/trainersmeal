import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/ui/Button"; // Button 컴포넌트 임포트

const DeliveryPickup: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      navigate("/delivery-date", { state: { deliveryType: selectedOption } });
    } else {
      alert("배송 또는 픽업을 선택해주세요.");
    }
  };

  return (
    <Container>
      <div className="header">
        <h1>배송/픽업 선택</h1>
      </div>
      <div className="options-container">
        <div
          className={`card ${selectedOption === "delivery" ? "selected" : ""}`}
          onClick={() => handleSelect("delivery")}
        >
          <h2>배송</h2>
          <p>집 앞으로 배송을 받아보세요.</p>
        </div>
        <div
          className={`card ${selectedOption === "pickup" ? "selected" : ""}`}
          onClick={() => handleSelect("pickup")}
        >
          <h2>픽업</h2>
          <p>운동 후 음식을 픽업하세요.</p>
        </div>
      </div>
      <div className="button-wrapper">
        <Button text="다음" onClick={handleNext} color="main" />
      </div>
    </Container>
  );
};

export default DeliveryPickup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;

  .header {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 28px;
      margin: 0;
    }
  }

  .options-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .card {
    flex: 1;
    padding: 20px;
    margin: 0 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &.selected {
      border-color: #007bff;
      background-color: #f0f8ff;
    }

    h2 {
      font-size: 22px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #555;
    }

    &:hover {
      background-color: #f9f9f9;
    }
  }

  .button-wrapper {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
`;
