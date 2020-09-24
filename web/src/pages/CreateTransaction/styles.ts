import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: -100px;
    width: 100%;
    form{
        width: 100%;
        max-width:500px;

        h1{
            padding: 20px 0;
            color: #FF872C;
        }
    }
    div{
        display:flex;
        align-items:center;
        label{
            margin-right: 20px;
            color: #FFF;
        }
        input{
            width: 15px;
            height: 15px;
            margin-right: 5px;
        }
    }
`;
