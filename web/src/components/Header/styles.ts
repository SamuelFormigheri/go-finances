import styled from 'styled-components';
import {FiLogOut} from 'react-icons/fi';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      align-items: center;
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
      }
      button {
        color: #fff;
        border: none;
        background-color: transparent;
        font-size: 16px;
        transition: opacity 0.2s;
        margin: 0 16px;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;

export const LogOutIcon = styled(FiLogOut)`
  margin-left: 20px;
  color: #FFF;
  width: 28px;
  height: 20px;
  transition: 200ms;
  cursor: pointer;
  &:hover{
    opacity: 0.6;
  }
`;
