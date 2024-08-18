import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../api";
import Button from "../components/ui/Button";

// 상수로 식단 옵션 리스트 만들긴 했는데, 서버에서 리스트 불러와서 보여주어야할 것 같음
const mealOptions = [
  { id: "1", name: "밸런스A" },
  { id: "2", name: "밸런스B" },
  { id: "3", name: "다이어트A" },
  { id: "4", name: "다이어트B" },
];

const Meal: React.FC = () => {
  const [mealCount, setMealCount] = useState<number | null>(null);
  const [week1Meal1, setWeek1Meal1] = useState<string>("");
  const [week1Meal2, setWeek1Meal2] = useState<string>("");
  const [week2Meal1, setWeek2Meal1] = useState<string>("");
  const [week2Meal2, setWeek2Meal2] = useState<string>("");
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  const handleNext = async () => {
    if (mealCount === null) {
      alert("식사 횟수를 선택하세요.");
      return;
    }

    const selectedMeals = [
      week1Meal1,
      week1Meal2,
      week2Meal1,
      week2Meal2,
    ].filter((mealId) => mealId); // 고유 ID가 들어있는 배열

    if (
      (mealCount === 1 && selectedMeals.length !== 2) ||
      (mealCount === 2 && selectedMeals.length !== 4)
    ) {
      alert(
        `식사 횟수에 맞게 ${
          mealCount === 1 ? "2개" : "4개"
        }의 메뉴를 선택하세요.`
      );
      return;
    }

    try {
      const response = await apiClient.post("/meals", {
        clientId, // 주문자 식별 위해 clientId를 함께 전송
        mealCount,
        selectedMeals, // 고유 ID들이 담긴 배열을 전송
      });
      console.log("식단 정보가 성공적으로 저장되었습니다:", response.data);
      navigate("/diet", {
        state: {
          clientId,
          mealCount,
          selectedMeals, // 이 상태에서도 고유 ID들이 담긴 배열을 넘김
        },
      });
    } catch (error) {
      console.error("식단 정보 저장에 실패했습니다:", error);
      alert("식단 정보 저장에 실패했습니다. 다시 시도해주세요.");

      // 통신 후 지우기!@!!!!!
      navigate("/diet", {
        state: {
          clientId,
          mealCount,
          selectedMeals,
        },
      });
    }
  };

  return (
    <Container>
      <h2>식수 및 베이스 메뉴 선택</h2>
      <div className="meal-selection">
        <label>하루 식사 횟수를 선택하세요:</label>
        <div className="card-selection">
          <div
            className={`card ${mealCount === 1 ? "selected" : ""}`}
            onClick={() => setMealCount(1)}
          >
            1식
          </div>
          <div
            className={`card ${mealCount === 2 ? "selected" : ""}`}
            onClick={() => setMealCount(2)}
          >
            2식
          </div>
        </div>
      </div>
      {mealCount !== null && (
        <>
          <div className="menu-selection">
            <label>1주차 1식</label>
            <select
              value={week1Meal1}
              onChange={(e) => setWeek1Meal1(e.target.value)}
            >
              <option value="">메뉴를 선택하세요</option>
              {mealOptions.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
            </select>
          </div>
          {mealCount === 2 && (
            <div className="menu-selection">
              <label>1주차 2식</label>
              <select
                value={week1Meal2}
                onChange={(e) => setWeek1Meal2(e.target.value)}
              >
                <option value="">메뉴를 선택하세요</option>
                {mealOptions.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="menu-selection">
            <label>2주차 1식</label>
            <select
              value={week2Meal1}
              onChange={(e) => setWeek2Meal1(e.target.value)}
            >
              <option value="">메뉴를 선택하세요</option>
              {mealOptions.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
            </select>
          </div>
          {mealCount === 2 && (
            <div className="menu-selection">
              <label>2주차 2식</label>
              <select
                value={week2Meal2}
                onChange={(e) => setWeek2Meal2(e.target.value)}
              >
                <option value="">메뉴를 선택하세요</option>
                {mealOptions.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}
      <Button text="다음" onClick={handleNext} color="main" />
    </Container>
  );
};

export default Meal;

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

  .meal-selection {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;

    label {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 18px;
    }

    .card-selection {
      display: flex;
      gap: 20px;

      .card {
        padding: 15px 30px;
        font-size: 18px;
        border: 1px solid #ccc;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;

        &.selected {
          border-color: #007bff;
          background-color: #007bff;
          color: #fff;
        }
      }
    }
  }

  .menu-selection {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;

    label {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 18px;
    }

    select {
      padding: 15px;
      font-size: 18px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }

  button {
    margin-top: 20px;
    padding: 15px 30px;
    font-size: 18px;
  }
`;
