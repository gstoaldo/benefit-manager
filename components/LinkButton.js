import styled from 'styled-components';
import Link from 'next/link';

const LinkButton = ({ href, children }) => (
  <Link href={href} passHref>
    <StyledLink>{children}</StyledLink>
  </Link>
);

const StyledLink = styled.a`
  color: var(--color-primary);
  font-weight: bold;
  padding: 8px 16px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default LinkButton;
