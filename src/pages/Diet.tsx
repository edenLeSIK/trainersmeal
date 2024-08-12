import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/ui/Button";
import { menus } from "../constants/menu";
import sample from "../assets/menu/sample.jpg";

type MenuKey = "balanceA" | "balanceB" | "dietA" | "dietB";

const Diet: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    mealCount: number;
    selectedMenus: MenuKey[];
  } | null;

  const mealCount = state?.mealCount ?? 1;
  const selectedMenus = state?.selectedMenus ?? ["balanceA", "balanceB"];

  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    new Array(mealCount * 2).fill("")
  );

  const handleOptionChange = (index: number, option: string) => {
    const newOptions = [...selectedOptions];
    newOptions[index] = option;
    setSelectedOptions(newOptions);
  };

  const handleOrder = () => {
    console.log("Selected options:", selectedOptions);
    navigate("/delivery-date", { state: { selectedOptions } });
  };

  const handleOptionClick = (optionName: string) => {
    navigate("/option", {
      state: {
        menuName: selectedMenus[activeTab],
        selectedOption: optionName,
      },
    });
  };

  const nutrition: {
    [key: string]: {
      calories: number;
      protein: string;
      carbs: string;
      fat: string;
    };
  } = {
    "수비드 부채살 포케": {
      calories: 450,
      protein: "30g",
      carbs: "50g",
      fat: "15g",
    },
    "로스트치킨 펜네 포케": {
      calories: 400,
      protein: "35g",
      carbs: "45g",
      fat: "10g",
    },
    "수비드 돈안심 현미 포케": {
      calories: 470,
      protein: "40g",
      carbs: "60g",
      fat: "20g",
    },
    "훈제오리 포케": {
      calories: 500,
      protein: "45g",
      carbs: "55g",
      fat: "25g",
    },
    "수비드 돈목살 포케": {
      calories: 520,
      protein: "50g",
      carbs: "40g",
      fat: "30g",
    },
    "참치 두부면 포케": {
      calories: 430,
      protein: "35g",
      carbs: "30g",
      fat: "20g",
    },
  };

  return (
    <Container>
      <div className="tabs">
        {selectedMenus.map((menu, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {(index % mealCount) + 1}식 {menu} -{" "}
            {Math.ceil((index + 1) / mealCount)}주차
          </div>
        ))}
      </div>
      <div className="option-list">
        {menus[selectedMenus[activeTab]]?.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className="option"
            onClick={() => handleOptionClick(option.name)}
          >
            <img src={sample} alt={option.day} />
            <div className="option-details">
              <h4>{option.name}</h4>
              <p>
                칼로리: {nutrition[option.name]?.calories ?? "정보 없음"} kcal
              </p>
              <p>단백질: {nutrition[option.name]?.protein ?? "정보 없음"}</p>
              <p>탄수화물: {nutrition[option.name]?.carbs ?? "정보 없음"}</p>
              <p>지방: {nutrition[option.name]?.fat ?? "정보 없음"}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="button-wrapper">
        <Button text="주문하기" onClick={handleOrder} color="main" />
      </div>
    </Container>
  );
};

export default Diet;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;

  .tabs {
    display: flex;
    width: 100%;
    overflow-x: auto;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    .tab {
      flex: 1;
      padding: 15px;
      text-align: center;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s ease;
      background-color: white;
      &:hover {
        background-color: #e9e9e9;
      }

      &.active {
        border-color: #007bff;
        font-weight: bold;
      }
    }
  }

  .option-list {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  .option {
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 10px;
      margin-right: 20px;
    }

    .option-details {
      flex-grow: 1;

      h4 {
        font-size: 18px;
        margin: 0 0 10px 0;
      }

      p {
        font-size: 16px;
        margin: 0;
        color: #666;
      }
    }
  }

  .button-wrapper {
    width: 100%;
    padding: 20px;
    background: white;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    position: sticky;
    bottom: 0;
    left: 0;
  }
`;
