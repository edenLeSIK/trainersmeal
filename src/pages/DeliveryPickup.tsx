import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const DeliveryPickup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Diet 페이지에서 전달된 상태값을 가져옵니다.
  const state = location.state as {
    selectedMenus: any[]; // 실제 메뉴 리스트 타입으로 변경 필요
    totalPrice: number;
    clientId: string;
  };

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    const deliveryType = option === "delivery";
    // 메뉴 리스트와 함께 deliveryType을 delivery-date 페이지로 전달합니다.
    navigate("/delivery-date", {
      state: {
        deliveryType: deliveryType,
        selectedMenus: state.selectedMenus,
        totalPrice: state.totalPrice,
        clientId: state.clientId,
      },
    });
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
`;
