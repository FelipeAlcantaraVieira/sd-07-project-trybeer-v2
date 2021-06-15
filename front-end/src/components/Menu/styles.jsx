import styled from 'styled-components';

export const StyledMenu = styled.div`
display: flex;
border-right: solid 0.01px black;
flex-direction: column;
justify-content: center;
background: black;
transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
height: 100vh;
text-align: left;
position: absolute;
top: 0;
left: 0;
transition: transform 0.3s ease-in-out;
z-index: 1;

@media (max-width: 540) {
    width: 100%;
  }

a {
  font-size: 2rem;
  text-transform: uppercase;
  padding: 2rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: #0D0C1D;
  text-decoration: none;
  transition: color 0.3s linear;

  @media (max-width: 540) {
    font-size: 1.5rem;
    text-align: center;
  }

  &:hover {
    color: #343078;
  }
}
`;
export const StyledBurger = styled.button`
position: absolute;
top: 2%;
left: 2rem;
display: flex;
flex-direction: column;
justify-content: space-around;
width: 2rem;
height: 2rem;
background: transparent;
border: none;
cursor: pointer;
padding: 0;
z-index: 10;

&:focus {
  outline: none;
}

div {
  width: 2rem;
  height: 0.25rem;
  background: ${({ open }) => (open ? 'white' : 'white')};
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;

  :first-child {
    transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
  }

  :nth-child(2) {
    opacity: ${({ open }) => (open ? '0' : '1')};
    transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
  }

  :nth-child(3) {
    transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
  }
}
`;
export const Button = styled.button`
  font-size: 1.5em;
  font-weight: bolder;
  padding: 0;
  width: 14em;
  height: 3em;
  border-radius: 5px;
  margin-top: 0.2em;
  outline: none;
    &:hover {
      background-color: gray;
      color: white;
    }
`;
