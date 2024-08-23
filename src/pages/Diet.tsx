import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../api";
import Button from "../components/ui/Button";
import sample from "../assets/menu/sample.jpg";

interface MenuItem {
  id: number;
  day: string;
  menu_name: string;
  nutrients: {
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    sodium: number;
    sugar: number;
  };
  price: number;
}

const Diet: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    clientId: string;
    mealCount: number;
    selectedMeals: string[]; // 선택된 식단의 ID 배열
    updatedMenu?: MenuItem; // 새롭게 업데이트된 메뉴가 있을 경우
  } | null;

  const mealCount = state?.mealCount ?? 1;
  const [selectedMenus, setSelectedMenus] = useState<MenuItem[][]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // 요일 숫자를 요일 이름으로 변환하는 함수
  const getDayName = (day: number | string): string => {
    const days = ["월", "화", "수", "목", "금", "토"];

    // day를 숫자로 변환
    const dayIndex = typeof day === "string" ? parseInt(day, 10) : day;

    // dayIndex가 유효한 숫자인지 확인
    if (isNaN(dayIndex) || dayIndex < 0 || dayIndex > 5) {
      return "Invalid Day";
    }

    return days[dayIndex];
  };

  // 메뉴를 가져오는 함수
  const fetchMenus = async (mealId: string) => {
    try {
      const response = await apiClient.get(`/menus/${mealId}`);
      const menus = response.data;

      if (Array.isArray(menus)) {
        setSelectedMenus((prevMenus) => {
          const updatedMenus = [...prevMenus];
          updatedMenus[activeTab] = menus;
          return updatedMenus;
        });
        console.log(`Menus for meal ${mealId} fetched successfully:`, menus);
      } else {
        console.error("Fetched menus is not an array:", menus);
      }
    } catch (error) {
      console.error(`Failed to fetch menus for meal ${mealId}:`, error);
      alert("메뉴 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (state?.updatedMenu) {
      setSelectedMenus((prevMenus) => {
        const updatedMenus = [...prevMenus];
        const menuIndex = prevMenus[activeTab].findIndex(
          (menu) => menu.id === state.updatedMenu?.id
        );
        if (menuIndex !== -1) {
          updatedMenus[activeTab][menuIndex] = state.updatedMenu!;
        }
        return updatedMenus;
      });
    } else if (state?.selectedMeals) {
      const currentMealId = state.selectedMeals[activeTab];
      if (currentMealId) {
        fetchMenus(currentMealId);
      }
    }
  }, [activeTab, state?.selectedMeals, state?.updatedMenu]);

  useEffect(() => {
    const price = selectedMenus.reduce((sum, menuList) => {
      return (
        sum +
        (menuList ? menuList.reduce((acc, menu) => acc + menu.price, 0) : 0)
      );
    }, 0);
    setTotalPrice(price);
  }, [selectedMenus]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const currentMealId = state?.selectedMeals[index];
    if (currentMealId) {
      fetchMenus(currentMealId);
    }
  };

  const handleOptionClick = (menuId: number) => {
    navigate(`/option/${menuId}`, { state: { menuId } });
  };

  const handleOrder = () => {
    navigate("/delivery-pickup", {
      state: {
        clientId: state?.clientId,
        selectedMenus,
        totalPrice,
      },
    });
  };

  return (
    <Container>
      <div className="tabs">
        {state?.selectedMeals.map((_, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {Math.ceil((index + 1) / mealCount)}주차 {(index % mealCount) + 1}식
          </div>
        ))}
      </div>
      <div className="option-list">
        {(selectedMenus[activeTab] || []).map((menu, menuIndex) => (
          <div
            key={menuIndex}
            className="option"
            onClick={() => handleOptionClick(menu.id)}
          >
            <div className="day-name">{getDayName(menu.day)}</div>
            <img src={sample} alt={menu.menu_name} />
            <div className="option-details">
              <div className="menu-info">
                <h4>{menu.menu_name}</h4>
                <p>칼로리: {menu.nutrients.calories} kcal</p>
                <p>탄수화물: {menu.nutrients.carbohydrate} g</p>
                <p>단백질: {menu.nutrients.protein} g</p>
                <p>지방: {menu.nutrients.fat} g</p>
                <p>나트륨: {menu.nutrients.sodium} mg</p>
                <p>당: {menu.nutrients.sugar} g</p>
              </div>
              <div className="menu-price">
                <p>가격: {menu.price.toLocaleString()}원</p>
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
