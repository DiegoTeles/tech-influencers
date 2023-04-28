import React, { useState } from 'react';
import {
  AccordionContainer,
  AccordionContent,
  AccordionIcon,
  AccordionItem,
} from './styles';
import styled from 'styled-components';

interface SocialProps {
  link: string;
  path: string;
  username: string;
}
const SocialLink = ({ link, path, username }: SocialProps) => {
  return (
    <a href={link}>
      <div>
        <img src={path} alt={username} />
      </div>
    </a>
  );
};
export default function Accordion({ photo, name, username, role, data }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  function isValidURL(url: string) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocolo
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domínio
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // IP
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // caminho
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // parâmetros de consulta
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragmento

    return pattern.test(url);
  }

  function renderContent(data: any) {
    return Object.entries(data).map(([key, value]: any) => {
      if (isValidURL(value)) {
        return <SocialLink link={value} path='./vite.svg' username={key} />;
      }
      return null;
    });
  }
  return (
    <>
      <AccordionContainer>
        <AccordionItem isOpen={isOpen} onClick={handleAccordionClick}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: 0,
              transition: 'color 0.3s ease-in-out',
            }}
          >
            {name}
          </h2>
          <AccordionIcon className={isOpen ? 'active' : ''}>
            {isOpen ? '-' : '+'}
          </AccordionIcon>
        </AccordionItem>
        {isOpen && (
          <AccordionContent isOpen={isOpen}>
            <Card>
              <img src={photo} alt={name} width='100px' height='100px' />
              <h2>{name}</h2>
              <span>@{username}</span>
              <small>{role}</small>
              <SocialContainer>{renderContent(data)}</SocialContainer>
            </Card>
          </AccordionContent>
        )}
      </AccordionContainer>
    </>
  );
}

export const AccordionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  transition: color 0.3s ease-in-out;
  color: ${(props: any) => {
    return props.isOpen ? '#e468ec' : props.theme.colors.text;
  }};
`;

const Card = styled.div`
  padding: 30px;
  background-color: aliceblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    border-radius: 50%;
    border: 1px solid #ffff;
  }

  h2 {
    margin: 0 0 0px;
  }
  span {
    font-size: medium;
    font-weight: bold;
  }

  small {
    font-size: medium;
  }
`;

const SocialContainer = styled.div`
  background-color: aliceblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0 0;
  justify-content: center;
  flex-wrap: wrap;

  a {
    text-decoration: none;
  }

  img {
    width: 26px;
  }
`;
