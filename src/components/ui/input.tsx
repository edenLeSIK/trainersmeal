import styled from "styled-components";

const InputComponent = styled.input``;

const Input = (type, placeholder) => {
  return <InputComponent type={type} placeholder={placeholder} />;
};

export default Input;
