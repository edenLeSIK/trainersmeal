import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

  ${reset}

  * {
    box-sizing: border-box;
  }

  body, html, #root {
    width: 100dvw;
    height: 100dvh;
    max-width: 768px;
    max-height: 1024px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    border: 1px solid blue;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: 700;
  }

  a {
    text-decoration: none;
  }

  input {
    outline: none;
  }

  /* .container {
    max-width: 100%;
    max-height: 100%;
    overflow: auto; 
  } */
`;

export default GlobalStyle;
