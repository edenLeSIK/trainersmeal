import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { menus, MenuItem, MenuKey } from "../constants/menu";
import Button from "../components/ui/Button";
import sample from "../assets/menu/sample.jpg";

const menuKeyMap: Record<string, MenuKey> = {
  밸런스A: "balanceA",
  밸런스B: "balanceB",
  다이어트A: "dietA",
  다이어트B: "dietB",
};

const Diet: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    mealCount: number;
    selectedMenus: string[];
    updatedMenus?: MenuItem[][];
  } | null;

  const mealCount = state?.mealCount ?? 1;

  const selectedMenus: MenuItem[][] =
    (state?.updatedMenus ||
      state?.selectedMenus.map((menuName) => {
        const menuKey = menuKeyMap[menuName];
        return menus[menuKey];
      })) ??
    [];

  const [activeTab, setActiveTab] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const price = selectedMenus.reduce((sum, menuList) => {
      return sum + menuList.length * 11000;
    }, 0);
    setTotalPrice(price);
  }, [selectedMenus]);

  const handleOrder = () => {
    navigate("/delivery-pickup", { state: { selectedMenus } });
  };

  const handleOptionClick = (
    menuIndex: number,
    menuName: string | undefined
  ) => {
    if (menuName) {
      const menuKey = menuKeyMap[menuName];
      console.log("Navigating to option:", menuKey, menuIndex);
      navigate(`/diet/${menuKey}/${menuIndex}`);
    } else {
      console.error("Menu name is undefined");
    }
  };

  return (
    <Container>
      <div className="tabs">
        {selectedMenus.map((_, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {Math.ceil((index + 1) / mealCount)}주차 {(index % mealCount) + 1}식
          </div>
        ))}
      </div>
      <div className="option-list">
        {selectedMenus[activeTab].map((menu, menuIndex) => (
          <div
            key={menuIndex}
            className="option"
            onClick={() =>
              handleOptionClick(menuIndex, state?.selectedMenus[activeTab])
            }
          >
            <img src={sample} alt={menu.name} />
            <div className="option-details">
              <div className="menu-info">
                <h4>{menu.name}</h4>
                <p>칼로리: 정보 없음</p>
                <p>탄수화물: 정보 없음</p>
                <p>단백질: 정보 없음</p>
                <p>지방: 정보 없음</p>
                <p>나트륨: 정보 없음</p>
                <p>당: 정보 없음</p>
              </div>
              <div className="menu-price">
                <p>가격: 11,000원</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="button-wrapper">
        <div className="total-price">
          총 금액: {totalPrice.toLocaleString()}원
        </div>
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
      display: flex;
      justify-content: space-between;
      width: 100%;

      .menu-info {
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

      .menu-price {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100px;

        p {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }
      }
    }
  }

  .button-wrapper {
    width: 100%;
    padding: 20px;
    background: white;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    position: sticky;
    bottom: 0;
    left: 0;

    .total-price {
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
    }
  }
`;
