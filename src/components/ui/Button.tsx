import styled from "styled-components";
import { main, sub } from "../../styles/color";

interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className, color }) => {
  return (
    <ButtonComponent onClick={onClick} className={className} color={color}>
      {text}
    </ButtonComponent>
  );
};

const ButtonComponent = styled.button`
  width: 200px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: none;
  background: ${(props) => props.color === "main" && main};
  background: ${(props) => props.color === "sub" && sub};
  color: ${(props) => props.color === "main" && "#fff"};
  color: ${(props) => props.color === "sub" && "#fff"};
`;

export default Button;
