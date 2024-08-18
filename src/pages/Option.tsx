import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { menus, MenuItem, MenuKey } from "../constants/menu";
import Button from "../components/ui/Button";
import { main } from "../styles/color";

const Option: React.FC = () => {
  const { menuKey, menuIndex } = useParams<{
    menuKey: MenuKey;
    menuIndex: string;
  }>();
  const navigate = useNavigate();

  const menuList = menus[menuKey];
  const menu: MenuItem | undefined = menuList[parseInt(menuIndex, 10)];

  console.log("Option Params: ", { menuKey, menuIndex });
  console.log("Loaded Menu: ", menu);

  const defaultPrice1 = menu?.blocks[0]?.choices[0]?.price || 0;
  const defaultPrice2 = menu?.blocks[1]?.choices[0]?.price || 0;
  const defaultPrice3 = menu?.blocks[2]?.choices[0]?.price || 0;
  const defaultPrice4 = 0; // 기본 설정의 가격

  const [selectedOption1, setSelectedOption1] = useState<string>(
    menu?.blocks[0]?.choices[0]?.name || ""
  );
  const [selectedOption2, setSelectedOption2] = useState<string>(
    menu?.blocks[1]?.choices[0]?.name || ""
  );
  const [selectedOption3, setSelectedOption3] = useState<string>(
    menu?.blocks[2]?.choices[0]?.name || ""
  );
  const [selectedOption4, setSelectedOption4] = useState<string>("기본 설정");

  const [additionalOption1, setAdditionalOption1] = useState<string[]>([]);
  const [additionalOption2, setAdditionalOption2] = useState<string[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(11000);

  useEffect(() => {
    calculateTotalPrice();
  }, [
    selectedOption1,
    selectedOption2,
    selectedOption3,
    selectedOption4,
    additionalOption1,
    additionalOption2,
  ]);

  const handleOptionChange = (optionType: number, value: string) => {
    if (optionType === 1) setSelectedOption1(value);
    else if (optionType === 2) setSelectedOption2(value);
    else if (optionType === 3) setSelectedOption3(value);
    else if (optionType === 4) setSelectedOption4(value);
  };

  const handleAdditionalOptionChange = (optionType: number, value: string) => {
    if (optionType === 1) {
      setAdditionalOption1((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (optionType === 2) {
      setAdditionalOption2((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const calculateTotalPrice = () => {
    const selectedPrice1 =
      menu?.blocks[0]?.choices.find(
        (choice) => choice?.name === selectedOption1
      )?.price || 0;
    const selectedPrice2 =
      menu?.blocks[1]?.choices.find(
        (choice) => choice?.name === selectedOption2
      )?.price || 0;
    const selectedPrice3 =
      menu?.blocks[2]?.choices.find(
        (choice) => choice?.name === selectedOption3
      )?.price || 0;

    const selectedPrice4 =
      selectedOption4 === "추가 설정" ? 1000 : defaultPrice4;

    const additionalPrice1 = additionalOption1.length * 500;
    const additionalPrice2 = additionalOption2.length * 700;

    const newTotalPrice =
      11000 +
      (selectedPrice1 > defaultPrice1 ? selectedPrice1 - defaultPrice1 : 0) +
      (selectedPrice2 > defaultPrice2 ? selectedPrice2 - defaultPrice2 : 0) +
      (selectedPrice3 > defaultPrice3 ? selectedPrice3 - defaultPrice3 : 0) +
      selectedPrice4 +
      additionalPrice1 +
      additionalPrice2;

    setTotalPrice(newTotalPrice);
  };

  const handleSubmit = () => {
    const updatedMenuList = [...menuList];
    updatedMenuList[parseInt(menuIndex, 10)] = {
      ...menu,
      selectedOption: {
        name: menu?.name || "",
        options: [
          selectedOption1,
          selectedOption2,
          selectedOption3,
          selectedOption4,
        ],
        additionalOptions: [...additionalOption1, ...additionalOption2],
      },
    };

    navigate(`/diet`, {
      state: {
        menuKey,
        menuIndex,
        updatedMenus: updatedMenuList,
      },
    });
  };

  return (
    <Container>
      <div className="header">
        <div className="back-button" onClick={() => navigate(-1)}>
          ←
        </div>
        <h1 className="title">{menu?.name}</h1>
      </div>

      <div className="option-section">
        <h2 className="option-title">
          옵션 1 <span className="required">필수</span>
        </h2>
        {menu?.blocks[0]?.choices.map((choice, index) => (
          <div className="option-item" key={index}>
            <input
              type="radio"
              id={`option1-${index}`}
              name="option1"
              value={choice?.name}
              onChange={() => handleOptionChange(1, choice?.name || "")}
              checked={selectedOption1 === choice?.name}
            />
            <label htmlFor={`option1-${index}`}>
              {choice?.name}{" "}
              {index === 0
                ? "(0원)"
                : `(${
                    choice?.price && choice?.price > defaultPrice1
                      ? `+${choice.price - defaultPrice1}원`
                      : "0원"
                  })`}
            </label>
          </div>
        ))}
      </div>
      <hr />

      <div className="option-section">
        <h2 className="option-title">
          옵션 2 <span className="required">필수</span>
        </h2>
        {menu?.blocks[1]?.choices.map((choice, index) => (
          <div className="option-item" key={index}>
            <input
              type="radio"
              id={`option2-${index}`}
              name="option2"
              value={choice?.name}
              onChange={() => handleOptionChange(2, choice?.name || "")}
              checked={selectedOption2 === choice?.name}
            />
            <label htmlFor={`option2-${index}`}>
              {choice?.name}{" "}
              {index === 0
                ? "(0원)"
                : `(${
                    choice?.price && choice?.price > defaultPrice2
                      ? `+${choice.price - defaultPrice2}원`
                      : "0원"
                  })`}
            </label>
          </div>
        ))}
      </div>
      <hr />

      <div className="option-section">
        <h2 className="option-title">
          옵션 3 <span className="required">필수</span>
        </h2>
        {menu?.blocks[2]?.choices.map((choice, index) => (
          <div className="option-item" key={index}>
            <input
              type="radio"
              id={`option3-${index}`}
              name="option3"
              value={choice?.name}
              onChange={() => handleOptionChange(3, choice?.name || "")}
              checked={selectedOption3 === choice?.name}
            />
            <label htmlFor={`option3-${index}`}>
              {choice?.name}{" "}
              {index === 0
                ? "(0원)"
                : `(${
                    choice?.price && choice?.price > defaultPrice3
                      ? `+${choice.price - defaultPrice3}원`
                      : "0원"
                  })`}
            </label>
          </div>
        ))}
      </div>
      <hr />

      <div className="option-section">
        <h2 className="option-title">
          옵션 4 <span className="required">필수</span>
        </h2>
        <div className="option-item">
          <input
            type="radio"
            id="option4-1"
            name="option4"
            value="기본 설정"
            onChange={() => handleOptionChange(4, "기본 설정")}
            checked={selectedOption4 === "기본 설정"}
          />
          <label htmlFor="option4-1">기본 설정 (+0원)</label>
        </div>
        <div className="option-item">
          <input
            type="radio"
            id="option4-2"
            name="option4"
            value="추가 설정"
            onChange={() => handleOptionChange(4, "추가 설정")}
            checked={selectedOption4 === "추가 설정"}
          />
          <label htmlFor="option4-2">추가 설정 (+1000원)</label>
        </div>
      </div>
      <hr />

      <div className="option-section">
        <h2 className="option-title">추가 옵션 1</h2>
        <div className="option-item">
          <input
            type="checkbox"
            id="additional1-1"
            name="additional1"
            value="추가옵션 1-1"
            onChange={() => handleAdditionalOptionChange(1, "추가옵션 1-1")}
          />
          <label htmlFor="additional1-1">추가옵션 1-1 (+500원)</label>
        </div>
        <div className="option-item">
          <input
            type="checkbox"
            id="additional1-2"
            name="additional1"
            value="추가옵션 1-2"
            onChange={() => handleAdditionalOptionChange(1, "추가옵션 1-2")}
          />
          <label htmlFor="additional1-2">추가옵션 1-2 (+500원)</label>
        </div>
      </div>
      <hr />

      <div className="option-section">
        <h2 className="option-title">추가 옵션 2</h2>
        <div className="option-item">
          <input
            type="checkbox"
            id="additional2-1"
            name="additional2"
            value="추가옵션 2-1"
            onChange={() => handleAdditionalOptionChange(2, "추가옵션 2-1")}
          />
          <label htmlFor="additional2-1">추가옵션 2-1 (+700원)</label>
        </div>
        <div className="option-item">
          <input
            type="checkbox"
            id="additional2-2"
            name="additional2"
            value="추가옵션 2-2"
            onChange={() => handleAdditionalOptionChange(2, "추가옵션 2-2")}
          />
          <label htmlFor="additional2-2">추가옵션 2-2 (+700원)</label>
        </div>
      </div>

      <div className="button-wrapper">
        <Button
          text={`${totalPrice}원 담기`}
          onClick={handleSubmit}
          color="main"
        />
      </div>
    </Container>
  );
};

export default Option;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .back-button {
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
  }

  .title {
    font-size: 30px;
    margin: 40px;
  }

  .option-section {
    flex: none;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: hidden;
  }

  .option-title {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .required {
    font-size: 12px;
    color: ${main};
    margin-left: 8px;
    vertical-align: middle;
  }

  .option-item {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    font-size: 16px;

    input {
      width: 20px;
      height: 20px;
    }

    label {
      margin-left: 8px;
      cursor: pointer;
    }
  }

  .button-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0;
  }
`;
