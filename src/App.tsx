/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {
  facebook,
  github,
  instagram,
  linkedin,
  twitter,
  tiktok,
  youtube,
  userAvatar,
} from './assets'
import { SocialProps, PersonProps, SocialNetworksProps } from './types'

const REACT_APP_GOOGLE_API_KEY = 'AIzaSyCHo82SpOMn85aBPxhECu3BsbAdhV1BEMg'
const REACT_APP_GOOGLE_SHEETS_ID =
  '1-9T5cAdNW5fxGqTD8M5GO10LrXNb_vI-FpatDWy-4tY'

const SocialLink = (props: SocialProps) => {
  const { link, path, username } = props

  return (
    <a href={link} target="_blank">
      <div>
        <img src={path} alt={username} width={'36px'} />
      </div>
    </a>
  )
}

export const App: React.FC = () => {
  const [allSeriesData, setAllSeriesData] = useState([])

  function getAllSeries() {
    const SHEET_ID = REACT_APP_GOOGLE_SHEETS_ID
    const SHEET_NAME = 'Sheet1'
    const API_KEY = REACT_APP_GOOGLE_API_KEY
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

    axios
      .get(url)
      .then(function (response) {
        // handle success
        formatResponse(response.data)
      })
      .catch(function (error) {
        // handle error
        onError(error)
      })
      .finally(function () {
        // always executed
        console.log('ALL DONE LOADING DATA')
      })
  }

  function formatResponse(response: PersonProps) {
    const keys = response.values[0]
    const data = response.values.slice(1)
    const obj = data.map((arr: any) =>
      Object.assign({}, ...keys.map((k: any, i: any) => ({ [k]: arr[i] })))
    )
    setAllSeriesData(obj)
  }

  function onError(error: Error) {
    console.error(error)
  }

  useEffect(() => {
    getAllSeries()
  }, [])

  function getImage(name: string): string {
    return (
      {
        facebook: facebook,
        linkedin: linkedin,
        tiktok: tiktok,
        github: github,
        instagram: instagram,
        twitter: twitter,
        youtube: youtube,
      }[name] || ''
    )
  }

  function renderContent(data: PersonProps) {
    return Object.entries(data).map(([key, value]) => {
      if (
        value !== '' &&
        value !== '#' &&
        value !== undefined &&
        getImage(key)
      ) {
        return (
          <SocialLink
            link={value}
            path={getImage(key)}
            username={key}
            key={key}
          />
        )
      }

      return null
    })
  }

  return (
    <>
      <Container>
        <h1>Tech Creators</h1>
        <Data>
          {allSeriesData.map((item: PersonProps & SocialNetworksProps) => {
            const { photo, name, username, role } = item
            const photoUrl = photo || userAvatar

            return (
              <Card key={name}>
                <img src={photoUrl} alt={name} width="100px" height="100px" />
                <h2>{name}</h2>
                <span>@{username}</span>
                <small>{role}</small>
                <SocialContainer>{renderContent(item)}</SocialContainer>
              </Card>
            )
          })}
        </Data>
        <Footer>
          <p>
            Created by 🦄
            <a href="https://instagram.com/unicornCoder" target="_blank">
              @UnicornCoder
            </a>
          </p>
        </Footer>
      </Container>
    </>
  )
}

const Container = styled.div`
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  text-align: center;
  position: relative;

  h1 {
    color: #ffff;
    font-size: 32px;
  }
`

const Data = styled.div`
  font-family: 'Nunito', sans-serif;
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  display: grid;
  width: 70vw;
  margin: 0 auto;
  gap: 40px;
  margin-bottom: 70px;

  @media only screen and (max-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
`

const Card = styled.div`
  min-width: 150px;
  padding: 30px 16px;
  background-color: aliceblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: #000;

  > img {
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
`

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

  > img {
    width: 26px;
  }
`

const Footer = styled.div`
  font-family: 'Nunito', sans-serif;
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  color: #ffff;
  font-weight: 900;
  a {
    color: #ffff;
    text-decoration: none;
  }
`
