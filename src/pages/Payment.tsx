import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    selectedMenus?: { name: string; price: number; options: string[] }[];
    deliveryType?: string;
    deliveryDate?: Date;
  };

  const selectedMenus = state?.selectedMenus ?? [];
  const totalPrice = selectedMenus.reduce((acc, menu) => acc + menu.price, 0);

  const handlePayment = () => {
    // 결제 처리 로직
    navigate("/confirm", {
      state: {
        deliveryType: state.deliveryType,
        deliveryDate: state.deliveryDate,
        totalPrice,
      },
    });
  };

  return (
    <Container>
      <h1>결제 선택</h1>
      <div className="summary">
        <h2>주문 요약</h2>
        {selectedMenus.map((menu, index) => (
          <div key={index} className="menu-item">
            <p className="menu-name">{menu.name}</p>
            <p className="menu-price">{menu.price.toLocaleString()}원</p>
          </div>
        ))}
        <div className="total">
          <p>총 금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </div>
      </div>
      <div className="button-wrapper">
        <button onClick={handlePayment}>결제하기</button>
      </div>
    </Container>
  );
};

export default Payment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;

  h1 {
    margin-bottom: 20px;
    font-size: 28px;
  }

  .summary {
    width: 100%;
    margin-bottom: 20px;

    h2 {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .menu-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }

    .total {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      font-weight: bold;
      font-size: 20px;
    }
  }

  .payment-info {
    width: 100%;
    margin-bottom: 20px;

    h2 {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .form-group {
      margin-bottom: 15px;

      label {
        display: block;
        margin-bottom: 5px;
        font-size: 16px;
      }

      input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
    }
  }

  .button-wrapper {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      padding: 15px 30px;
      font-size: 18px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;
