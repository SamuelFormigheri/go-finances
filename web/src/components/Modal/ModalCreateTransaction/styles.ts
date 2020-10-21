import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    form{
        width: 100%;
        max-width:500px;

    }
    > div{
        display:flex;
        align-items:center;
        margin-bottom: 5vh;
        label{
            margin-right: 20px;
            color: #5636d3;
        }
        input{
            width: 15px;
            height: 15px;
            margin-right: 5px;
        }
    }
`;

export const ModalHeader = styled.header`
    display:flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 5vh;
    border-bottom: 1px solid #ddd;
    h1{
        padding: 20px 0;
        color: #FF872C;
    }
    button{
        border:none;
    }
    svg{
        width: 30px;
        height: 30px;
        color: #999;
        transition: 200ms;
        &:hover{
            color: #666;
        }
    }
`;
