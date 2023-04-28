import styled from 'styled-components';

type AccordionItemProps = {
  isOpen?: boolean;
};

export const AccordionContainer = styled.div`
  width: 90%;
  background: aliceblue;
  padding: 0 20px;
  border-radius: 8px;
`;

export const AccordionItem = styled.div<AccordionItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ isOpen }) => (isOpen ? 'none' : '1px solid #ccc')};
  padding: ${({ isOpen }) => (isOpen ? '16px 0 4px' : '16px 0')};
  cursor: pointer;
`;

export const AccordionTitle = styled.h2<AccordionItemProps>`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  transition: color 0.3s ease-in-out;
`;

export const AccordionIcon = styled.span`
  font-size: 24px;
  transition: transform 0.3s ease-in-out;

  &.active {
    transform: rotate(180deg);
  }
`;

export const AccordionContent = styled.div<AccordionItemProps>`
  padding: 0 0 16px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  max-height: ${({ isOpen }: any) => (isOpen ? '500px' : '0')};
  transition: max-height 0.3s ease-in-out;
  text-align: left;

  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
`;
