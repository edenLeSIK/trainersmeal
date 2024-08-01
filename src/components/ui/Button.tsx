import styled from "styled-components";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <ButtonComponent onClick={onClick}>{text}</ButtonComponent>;
};

const ButtonComponent = styled.button``;

export default Button;
