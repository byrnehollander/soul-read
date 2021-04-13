import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import './App.css'
import './Rune.css'
import cards from './cards.json'
import { ReactComponent as Black } from './assets/black.svg'
import { ReactComponent as Blue } from './assets/blue.svg'
import { ReactComponent as Colorless } from './assets/colorless.svg'
import { ReactComponent as Green } from './assets/green.svg'
import { ReactComponent as Red } from './assets/red.svg'
import { ReactComponent as White } from './assets/white.svg'

const Container = styled.div`
  margin: 5vw;
`

const OptionsContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  @media only screen and (max-width: 1400px) {
    flex-direction: column;
  }
`

const ButtonContainer = styled.div`
  margin-top: 40px;
`

const ColorsHeader = styled.div`
  display: flex;
  align-items: end;
`

const RarityContainer = styled.div`
  margin-top: 40px;
  margin-left: 50px;
  @media only screen and (max-width: 1400px) {
    margin-left: 0px;
  }
`

const ManaCostContainer = styled.div`
  margin-left: 50px;
  margin-top: 40px;
  @media only screen and (max-width: 1400px) {
    margin-left: 0px;
  }
`

const SliderContainer = styled.div`
  width: 430px;
  max-width: 90vw;
`

const RarityRow = styled.div`
  display: flex;
  align-items: center;
`

const SetIconLarge = styled.span`
  font-size: 30px;
`

const SetIconSmall = styled.span`
  font-size: 22px;
  margin-left: 10px;
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

const hasRarity = (card, rarities) => {
  return rarities.has(card.rarity)
}

const StyledWhiteIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(254 251 213 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledBlueIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(170 224 250 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledBlackIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(202 194 190 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledRedIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(249 170 143 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledGreenIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(155 211 174 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledColorlessIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(203 193 191 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const SelectedRarityIconButton = withStyles({
  label: {
    padding: 10,
    boxShadow: 'inset 0 0 12px 10px rgb(255 255 255 / 10%), 0 0 5px 3px rgb(255 255 255 / 10%)',
    borderRadius: 100
  }
})(IconButton)

const StyledChip = withStyles({
  root: {
    marginLeft: 10,
    width: 38,
    height: 38,
    borderRadius: 18
  },
  label: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: 600
  }
})(Chip)

const types = new Set(['Instant'])

function App () {
  // const [types, setTypes] = useState(new Set(['Instant']))
  const [colors, setColors] = useState(new Set(['C', 'R', 'G', 'B', 'U', 'W']))
  const [maxCMC, setMaxCMC] = useState(4)
  const [rarities, setRarities] = useState(new Set(['common', 'uncommon', 'rare', 'mythic']))

  const getMatches = (types, maxCMC, colors) => {
    return cards.filter(c => c.cmc <= maxCMC && hasType(c, types) && hasColor(c, colors) && hasRarity(c, rarities))
  }

  const renderMatches = (types, maxCMC, colors) => {
    const matches = getMatches(types, maxCMC, colors)
    if (matches.length === 0) {
      return <Typography variant='h6' gutterBottom>No cards match your filters</Typography>
    }
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
    const rares = cards.filter(c => c.rarity === 'rare')
    const mythics = cards.filter(c => c.rarity === 'mythic')
    // const raresAndMythics = cards.filter(c => ['rare', 'mythic'].includes(c.rarity))
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
                  <RarityRow>
                    {commons.length === 1 ? '1 COMMON' : `${commons.length} COMMONS`}
                    <SetIconSmall className='ss ss-common ss-grad ss-stx' />
                  </RarityRow>
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
                  <RarityRow>
                    {uncommons.length === 1 ? '1 UNCOMMON' : `${uncommons.length} UNCOMMONS`}
                    <SetIconSmall className='ss ss-uncommon ss-grad ss-stx' />
                  </RarityRow>
                </Typography>
                {renderImages(uncommons)}
              </div>
              )
            : ''
        }
        {
          rares.length > 0
            ? (
              <div>
                <Typography
                  variant='h6'
                  style={{ fontSize: 16 }}
                  gutterBottom
                >
                  <RarityRow>
                    {rares.length === 1 ? '1 RARE' : `${rares.length} RARES`}
                    <SetIconSmall className='ss ss-rare ss-grad ss-stx' />
                  </RarityRow>
                </Typography>
                {renderImages(rares)}
              </div>
              )
            : ''
        }
        {
          mythics.length > 0
            ? (
              <div>
                <Typography
                  variant='h6'
                  style={{ fontSize: 16 }}
                  gutterBottom
                >
                  <RarityRow>
                    {mythics.length === 1 ? '1 MYTHIC' : `${mythics.length} MYTHICS`}
                    <SetIconSmall className='ss ss-mythic ss-grad ss-stx' />
                  </RarityRow>
                </Typography>
                {renderImages(mythics)}
              </div>
              )
            : ''
        }
        {/* {
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
        } */}
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
    if (filteredCards.length > 0) {
      return (
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography variant='h5' style={{ fontWeight: 600, height: 38 }}>
              MANA VALUE
            </Typography>
            <StyledChip label={CMC} />
          </div>
          {renderImagesByRarity(filteredCards)}
        </div>
      )
    }
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

  const toggleRarity = (rarity) => {
    const newRarities = new Set(rarities)
    if (rarities.has(rarity)) {
      newRarities.delete(rarity)
    } else {
      newRarities.add(rarity)
    }
    setRarities(newRarities)
  }

  return (
    <Container>
      <Typography variant='h3' gutterBottom>What instants could my opponent have?</Typography>
      <OptionsContainer>
        <ButtonContainer>
          <ColorsHeader>
            <Tooltip title='All colors are selected by default' placement='top-start'>
              <Typography variant='h6' gutterBottom>COLORS</Typography>
            </Tooltip>
            {colors.size === 0
              ? (
                <Button
                  size='small'
                  variant='outlined'
                  color='default'
                  style={{ marginLeft: 20 }}
                  onClick={() => setColors(new Set(['C', 'R', 'G', 'B', 'U', 'W']))}
                >SELECT ALL
                </Button>
                )
              : (
                <Button
                  size='small'
                  variant='outlined'
                  color='default'
                  style={{ marginLeft: 20 }}
                  onClick={() => setColors(new Set())}
                >Clear
                </Button>
                )}
          </ColorsHeader>
          <Tooltip title='White' placement='bottom'>
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
          </Tooltip>
          <Tooltip title='Blue' placement='bottom'>
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
          </Tooltip>
          <Tooltip title='Black' placement='bottom'>
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
          </Tooltip>
          <Tooltip title='Red' placement='bottom'>
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
          </Tooltip>
          <Tooltip title='Green' placement='bottom'>
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
          </Tooltip>
          <Tooltip title='Colorless' placement='bottom'>
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
          </Tooltip>
        </ButtonContainer>
        {/* <Button variant='contained' color='primary' onClick={() => setTypes(new Set(['Instant']))}>Instant</Button>
      <Button variant='contained' color='primary' onClick={() => setTypes(new Set(['Sorcery']))}>Sorcery</Button> */}
        <RarityContainer>
          <ColorsHeader>
            <Tooltip title='All rarities are selected by default' placement='top-start'>
              <Typography variant='h6' gutterBottom>RARITIES</Typography>
            </Tooltip>
            {rarities.size === 0
              ? (
                <Button
                  size='small'
                  variant='outlined'
                  color='default'
                  style={{ marginLeft: 20 }}
                  onClick={() => setRarities(new Set(['common', 'uncommon', 'rare', 'mythic']))}
                >SELECT ALL
                </Button>
                )
              : (
                <Button
                  size='small'
                  variant='outlined'
                  color='default'
                  style={{ marginLeft: 20 }}
                  onClick={() => setRarities(new Set())}
                >Clear
                </Button>
                )}
          </ColorsHeader>
          <Tooltip title='Common' placement='bottom'>
            {rarities.has('common')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('common')} color='primary' aria-label='Common Cards' component='span'>
                  <SetIconLarge className='ss ss-common ss-grad ss-stx' />
                </SelectedRarityIconButton>
                )
              : (
                <IconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('common')} color='primary' aria-label='Common Cards' component='span'>
                  <SetIconLarge className='ss ss-common ss-grad ss-stx' />
                </IconButton>
                )}
          </Tooltip>
          <Tooltip title='Uncommon' placement='bottom'>
            {rarities.has('uncommon')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('uncommon')} color='primary' aria-label='Uncommon Cards' component='span'>
                  <SetIconLarge className='ss ss-uncommon ss-grad ss-stx' />
                </SelectedRarityIconButton>
                )
              : (
                <IconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('uncommon')} color='primary' aria-label='Uncommon Cards' component='span'>
                  <SetIconLarge className='ss ss-uncommon ss-grad ss-stx' />
                </IconButton>
                )}

          </Tooltip>
          <Tooltip title='Rare' placement='bottom'>
            {rarities.has('rare')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('rare')} color='primary' aria-label='Rare Cards' component='span'>
                  <SetIconLarge className='ss ss-rare ss-grad ss-stx' />
                </SelectedRarityIconButton>
                )
              : (
                <IconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('rare')} color='primary' aria-label='Rare Cards' component='span'>
                  <SetIconLarge className='ss ss-rare ss-grad ss-stx' />
                </IconButton>
                )}
          </Tooltip>
          <Tooltip title='Mythic' placement='bottom'>
            {rarities.has('mythic')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('mythic')} color='primary' aria-label='Mythic Cards' component='span'>
                  <SetIconLarge className='ss ss-mythic ss-grad ss-stx' />
                </SelectedRarityIconButton>
                )
              : (
                <IconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('mythic')} color='primary' aria-label='Mythic Cards' component='span'>
                  <SetIconLarge className='ss ss-mythic ss-grad ss-stx' />
                </IconButton>
                )}
          </Tooltip>
        </RarityContainer>
        <ManaCostContainer>
          <Tooltip title='How much mana your opponent has up' placement='top-start'>
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
