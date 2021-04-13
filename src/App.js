import { useState } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import './App.css'
import cards from './cards.json'
import { ReactComponent as Black } from './assets/black.svg'
import { ReactComponent as Blue } from './assets/blue.svg'
import { ReactComponent as Colorless } from './assets/colorless.svg'
import { ReactComponent as Green } from './assets/green.svg'
import { ReactComponent as Red } from './assets/red.svg'
import { ReactComponent as White } from './assets/white.svg'

const Container = styled.div`
  margin: 40px;
`

const ButtonContainer = styled.div`
  margin-top: 40px;
`

const ColorsHeader = styled.div`
  display: flex;
  align-items: end;
`

const ManaCostContainer = styled.div`
  margin-top: 40px;
  margin-left: 60px;

  @media only screen and (max-width: 1020px) {
    margin-left: 0px;
  }
`

const SliderContainer = styled.div`
  width: 430px;
`

const OptionsContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }
`

const hasType = (card, types) => {
  if (!card.types) {
    return false
  }
  const cardTypesArray = card.types
  for (let i = 0; i <= cardTypesArray.length; i++) {
    if (types.has(cardTypesArray[i])) {
      return true
    }
  }
  return false
}

const hasColor = (card, colors) => {
  if (!card.colors) {
    return false
  }
  const cardColorsArray = card.colors
  for (let i = 0; i <= cardColorsArray.length; i++) {
    if (colors.has(cardColorsArray[i])) {
      return true
    }
  }
  return false
}

const StyledWhiteIconButton = withStyles({
  label: {
    boxShadow: '0 0 12px 5px rgb(254 251 213 / 70%)',
    borderRadius: 100
  }
})(IconButton)

const StyledBlueIconButton = withStyles({
  label: {
    boxShadow: '0 0 12px 5px rgb(170 224 250 / 70%)',
    borderRadius: 100
  }
})(IconButton)

const StyledBlackIconButton = withStyles({
  label: {
    boxShadow: '0 0 12px 5px rgb(202 194 190 / 70%)',
    borderRadius: 100
  }
})(IconButton)

const StyledRedIconButton = withStyles({
  label: {
    boxShadow: '0 0 12px 5px rgb(249 170 143 / 70%)',
    borderRadius: 100
  }
})(IconButton)

const StyledGreenIconButton = withStyles({
  label: {
    boxShadow: '0 0 12px 5px rgb(155 211 174 / 70%)',
    borderRadius: 100
  }
})(IconButton)

const StyledColorlessIconButton = withStyles({
  label: {
    boxShadow: '0 0 12px 5px rgb(203 193 191 / 70%)',
    borderRadius: 100
  }
})(IconButton)

function App () {
  const [types, setTypes] = useState(new Set(['Instant']))
  const [maxCMC, setMaxCMC] = useState(4)
  const [colors, setColors] = useState(new Set(['C', 'R', 'G', 'B', 'U', 'W']))

  const getMatches = (types, maxCMC, colors) => {
    return cards.filter(c => c.cmc <= maxCMC && hasType(c, types) && hasColor(c, colors))
  }

  const renderMatches = (types, maxCMC, colors) => {
    const matches = getMatches(types, maxCMC, colors)
    const images = []
    for (let i = maxCMC; i > 0; i--) {
      images.push(renderMatchesByCMC(matches, i))
    }
    return images
  }

  const filterByCMC = (elements, CMC) => {
    return elements.filter(e => e.cmc === CMC)
  }

  const renderImagesByRarity = (cards) => {
    const commons = cards.filter(c => c.rarity === 'common')
    const uncommons = cards.filter(c => c.rarity === 'uncommon')
    const raresAndMythics = cards.filter(c => ['rare', 'mythic'].includes(c.rarity))
    return (
      <div>
        {
          commons.length > 0
            ? (
              <div>
                <Typography
                  variant='h6'
                  style={{ fontSize: 16 }}
                  gutterBottom
                >
                  {commons.length === 1 ? '1 COMMON' : `${commons.length} COMMONS`}
                </Typography>
                {renderImages(commons)}
              </div>
              )
            : ''
        }
        {
          uncommons.length > 0
            ? (
              <div>
                <Typography
                  variant='h6'
                  style={{ fontSize: 16 }}
                  gutterBottom
                >
                  {uncommons.length === 1 ? '1 UNCOMMON' : `${uncommons.length} UNCOMMONS`}
                </Typography>
                {renderImages(uncommons)}
              </div>
              )
            : ''
        }
        {
          raresAndMythics.length > 0
            ? (
              <div>
                <Typography
                  variant='h6'
                  style={{ fontSize: 16 }}
                  gutterBottom
                >
                  {raresAndMythics.length === 1
                    ? raresAndMythics[0].rarity === 'rare' ? '1 RARE' : '1 MYTHIC'
                    : `${raresAndMythics.length} RARES AND MYTHICS`}
                </Typography>
                {renderImages(raresAndMythics)}
              </div>
              )
            : ''
        }
      </div>
    )
  }

  const renderImages = (cards) => {
    return cards.map((c, i) => {
      return (
        <img
          key={i}
          style={{ marginRight: 20, marginBottom: 20 }}
          src={c.image}
          alt={c.name}
        />
      )
    })
  }

  const renderMatchesByCMC = (elements, CMC) => {
    const filteredCards = filterByCMC(elements, CMC).sort((a, b) => a.name.localeCompare(b.name))
    return (
      <div style={{ marginBottom: 30 }}>
        <Typography variant='h5' style={{ fontWeight: 600 }} gutterBottom>CMC {CMC}</Typography>
        {filteredCards.length > 0 ? renderImagesByRarity(filteredCards) : 'No cards'}
      </div>
    )
  }

  const toggleColor = (color) => {
    const newColors = new Set(colors)
    if (colors.has(color)) {
      newColors.delete(color)
    } else {
      newColors.add(color)
    }
    setColors(newColors)
  }

  console.log(getMatches(types, maxCMC, colors))
  return (
    <Container>
      <Typography variant='h3' gutterBottom>What instants could my opponent have?</Typography>
      <OptionsContainer>
        <ButtonContainer>
          <ColorsHeader>
            <Tooltip title='All colors are selected by default' placement='top-start'>
              <Typography variant='h6' gutterBottom>COLORS</Typography>
            </Tooltip>
            <Button
              size='small'
              variant='outlined'
              color='default'
              style={{ marginLeft: 20 }}
              onClick={() => setColors(new Set())}
            >Clear
            </Button>
          </ColorsHeader>
          {colors.has('W')
            ? (
              <StyledWhiteIconButton onClick={() => toggleColor('W')} color='primary' aria-label='White Mana' component='span'>
                <White width={50} />
              </StyledWhiteIconButton>
              )
            : (
              <IconButton onClick={() => toggleColor('W')} color='primary' aria-label='White Mana' component='span'>
                <White width={50} />
              </IconButton>
              )}
          {colors.has('U')
            ? (
              <StyledBlueIconButton onClick={() => toggleColor('U')} color='primary' aria-label='Blue Mana' component='span'>
                <Blue width={50} />
              </StyledBlueIconButton>
              )
            : (
              <IconButton onClick={() => toggleColor('U')} color='primary' aria-label='Blue Mana' component='span'>
                <Blue width={50} />
              </IconButton>
              )}
          {colors.has('B')
            ? (
              <StyledBlackIconButton onClick={() => toggleColor('B')} color='primary' aria-label='Black Mana' component='span'>
                <Black width={50} />
              </StyledBlackIconButton>
              )
            : (
              <IconButton onClick={() => toggleColor('B')} color='primary' aria-label='Black Mana' component='span'>
                <Black width={50} />
              </IconButton>
              )}
          {colors.has('R')
            ? (
              <StyledRedIconButton onClick={() => toggleColor('R')} color='primary' aria-label='Red Mana' component='span'>
                <Red width={50} />
              </StyledRedIconButton>
              )
            : (
              <IconButton onClick={() => toggleColor('R')} color='primary' aria-label='Red Mana' component='span'>
                <Red width={50} />
              </IconButton>
              )}
          {colors.has('G')
            ? (
              <StyledGreenIconButton onClick={() => toggleColor('G')} color='primary' aria-label='Green Mana' component='span'>
                <Green width={50} />
              </StyledGreenIconButton>
              )
            : (
              <IconButton onClick={() => toggleColor('G')} color='primary' aria-label='Green Mana' component='span'>
                <Green width={50} />
              </IconButton>
              )}
          {colors.has('C')
            ? (
              <StyledColorlessIconButton onClick={() => toggleColor('C')} color='primary' aria-label='Colorless Mana' component='span'>
                <Colorless width={50} />
              </StyledColorlessIconButton>
              )
            : (
              <IconButton onClick={() => toggleColor('C')} color='primary' aria-label='Colorless Mana' component='span'>
                <Colorless width={50} />
              </IconButton>
              )}
        </ButtonContainer>
        {/* <Button variant='contained' color='primary' onClick={() => setTypes(new Set(['Instant']))}>Instant</Button>
      <Button variant='contained' color='primary' onClick={() => setTypes(new Set(['Sorcery']))}>Sorcery</Button> */}
        <ManaCostContainer>
          <Tooltip title='Generally, how much mana your opponent has up' placement='top-start'>
            <Typography style={{ marginBottom: 32 }} variant='h6' gutterBottom>MAX CMC</Typography>
          </Tooltip>
          <SliderContainer>
            <Slider
              defaultValue={4}
              aria-labelledby='discrete-slider-always'
              step={1}
              marks
              min={0}
              max={8}
              valueLabelDisplay='on'
              onChange={(_, v) => {
                if (v !== maxCMC) {
                  setMaxCMC(v)
                }
              }}
            />
          </SliderContainer>
        </ManaCostContainer>
      </OptionsContainer>
      {renderMatches(types, maxCMC, colors)}
    </Container>
  )
}

export default App
