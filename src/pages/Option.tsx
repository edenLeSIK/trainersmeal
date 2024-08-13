import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { menus, MenuItem, MenuKey } from "../constants/menu";
import Button from "../components/ui/Button";

const Option: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    menuName: string;
    selectedOption: string;
    index: number;
  } | null;

  const menu: MenuItem | undefined = menus[state?.menuName as MenuKey]?.find(
    (item: MenuItem) => item.name === state?.selectedOption
  );

  const defaultPrice1 = menu?.blocks[0]?.choices[0]?.price || 0;
  const defaultPrice2 = menu?.blocks[1]?.choices[0]?.price || 0;
  const defaultPrice3 = menu?.blocks[2]?.choices[0]?.price || 0;

  const [selectedOption1, setSelectedOption1] = useState<string>(
    menu?.blocks[0]?.choices[0]?.name || ""
  );
  const [selectedOption2, setSelectedOption2] = useState<string>(
    menu?.blocks[1]?.choices[0]?.name || ""
  );
  const [selectedOption3, setSelectedOption3] = useState<string>(
    menu?.blocks[2]?.choices[0]?.name || ""
  );
  const [totalPrice, setTotalPrice] = useState<number>(11000);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedOption1, selectedOption2, selectedOption3]);

  const handleOptionChange = (optionType: number, value: string) => {
    if (optionType === 1) setSelectedOption1(value);
    else if (optionType === 2) setSelectedOption2(value);
    else if (optionType === 3) setSelectedOption3(value);
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

    const newTotalPrice =
      11000 +
      (selectedPrice1 > defaultPrice1 ? selectedPrice1 - defaultPrice1 : 0) +
      (selectedPrice2 > defaultPrice2 ? selectedPrice2 - defaultPrice2 : 0) +
      (selectedPrice3 > defaultPrice3 ? selectedPrice3 - defaultPrice3 : 0);

    setTotalPrice(newTotalPrice);
  };

  const handleSubmit = () => {
    const updatedMenuName = `${selectedOption1} 포케`;
    navigate("/diet", {
      state: {
        menuName: state?.menuName,
        selectedOption: {
          name: updatedMenuName,
          options: [selectedOption1, selectedOption2, selectedOption3],
        },
        index: state?.index,
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
        <h2 className="option-title">옵션 1</h2>
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
        <h2 className="option-title">옵션 2</h2>
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
        <h2 className="option-title">옵션 3</h2>
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

      <div className="button-wrapper">
        <Button text={`${totalPrice}원`} onClick={handleSubmit} color="main" />
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
    margin-bottom: 20px;
  }

  .back-button {
    font-size: 32px;
    cursor: pointer;
    margin-right: 20px;
  }

  .title {
    font-size: 28px;
    margin: 0;
  }

  .option-section {
    flex: 1;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .option-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .option-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-size: 20px;

    input {
      width: 24px;
      height: 24px;
    }

    label {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .button-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }

  hr {
    border: none;
    border-top: 2px solid #ddd;
    margin: 20px 0;
  }
`;
