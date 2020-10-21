import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F0F2F5 ;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font: 16px "Poppins", sans-serif;
  }

  button {
    cursor: pointer;
  }
  
  /* :root{
    --color-primary: #FF9000;
    --color-white: #FFF;
    --color-main-grey: #312E38;
    --color-main-grey-darker : #232129;
    --color-grey-darker: #666360;
    --color-grey-light: #F4EDE8;
    --color-red: #C53030;

    --toast-color-background: rgba(0,0,0,0.75);
    --toast-info-color: #3172b7;
    --toast-success-color: #2E656A;
    --toast-danger-color: #C53030;
  } */
`;
