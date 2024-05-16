import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: orangered;
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return <StyledHeader>HEADER</StyledHeader>;
}

export default Header;
