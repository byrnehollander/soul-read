import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import Tilty from 'react-tilty'
import './App.css'
import './Rune.css'
import cards from './VOW.json'
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
  margin-bottom: 20px;
  @media only screen and (max-width: 1485px) {
    flex-direction: column;
  }
`

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const FlexBaselineContainer = styled(FlexContainer)`
  align-items: baseline;
`

const ButtonContainer = styled.div`
  margin-top: 40px;
`

const ColorsHeader = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 15px;
`

const RarityContainer = styled.div`
  margin-top: 40px;
  margin-left: 50px;
  @media only screen and (max-width: 1485px) {
    margin-left: 0px;
  }
`

const ManaCostContainer = styled.div`
  margin-left: 50px;
  margin-top: 40px;
  @media only screen and (max-width: 1485px) {
    margin-left: 0px;
  }
`

const SliderContainer = styled.div`
  width: 300px;
  max-width: 90vw;
`

const RarityRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

const SetIconLarge = styled.span`
  font-size: 40px;
`

const SetIconSmall = styled.span`
  font-size: 22px;
  margin-left: 10px;
`

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
    padding: 4,
    boxShadow: 'inset 0 0 12px 10px rgb(255 255 255 / 15%), 0 0 5px 3px rgb(255 255 255 / 15%)',
    borderRadius: 100
  }
})(IconButton)

const StyledChip = withStyles({
  root: {
    marginLeft: 10,
    width: 38,
    height: 38,
    borderRadius: '100%',
    boxShadow: '-0.5px 2px 1px black'
  },
  label: {
    fontFamily: 'Numbers',
    fontSize: 27,
    height: 43,
    textOverflow: 'clip',
    fontWeight: 600
  }
})(Chip)

const TypographyShadow = styled(Typography)`
  text-shadow: 1px 2px 3px rgb(0 0 0 / 70%);
  margin-bottom: 0px;
`

const UnselectedIconButton = styled(IconButton)`
  opacity: 0.4;
  :hover {
    opacity: 0.9;
  }
`

const types = new Set(['Instant'])

function App () {
  const [colors, setColors] = useState(new Set(['C', 'R', 'G', 'B', 'U', 'W']))
  const [maxCMC, setMaxCMC] = useState(5)
  const [combatRelevant, setCombatRelevant] = useState(false)
  const [groupByRarity, setGroupByRarity] = useState(true)
  const [rarities, setRarities] = useState(new Set(['common', 'uncommon', 'rare', 'mythic']))

  const getMatches = (types, maxCMC, colors, combatRelevant) => {
    return cards.filter(c => c.cmc <= maxCMC && hasColor(c, colors) && hasRarity(c, rarities) && (combatRelevant === false || c?.isCombatRelevant === true))
  }

  const renderMatches = (types, maxCMC, colors, combatRelevant) => {
    const matches = getMatches(types, maxCMC, colors, combatRelevant)
    if (matches.length === 0) {
      return <TypographyShadow variant='h6' gutterBottom>No cards match your filters</TypographyShadow>
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
    if (!groupByRarity) {
      const collected = [...commons, ...uncommons, ...rares, ...mythics]
      return (
        <div>
          <Typography
            variant='h6'
            style={{ fontSize: 16 }}
            gutterBottom
          >
            <RarityRow>
              {collected.length === 1 ? '1 Card' : `${collected.length} Cards`}
            </RarityRow>
          </Typography>
          <FlexContainer>
            {renderImages(collected)}
          </FlexContainer>
        </div>
      )
    }

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
                    {commons.length === 1 ? '1 Common' : `${commons.length} Commons`}
                    <SetIconSmall className='ss ss-common ss-grad ss-mid' />
                  </RarityRow>
                </Typography>
                <FlexContainer>
                  {renderImages(commons)}
                </FlexContainer>
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
                    {uncommons.length === 1 ? '1 Uncommon' : `${uncommons.length} Uncommons`}
                    <SetIconSmall className='ss ss-uncommon ss-grad ss-mid' />
                  </RarityRow>
                </Typography>
                <FlexContainer>
                  {renderImages(uncommons)}
                </FlexContainer>
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
                    {rares.length === 1 ? '1 Rare' : `${rares.length} Rares`}
                    <SetIconSmall className='ss ss-rare ss-grad ss-mid' />
                  </RarityRow>
                </Typography>
                <FlexContainer>
                  {renderImages(rares)}
                </FlexContainer>
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
                    {mythics.length === 1 ? '1 Mythic' : `${mythics.length} Mythics`}
                    <SetIconSmall className='ss ss-mythic ss-grad ss-mid' />
                  </RarityRow>
                </Typography>
                <FlexContainer>
                  {renderImages(mythics)}
                </FlexContainer>
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
        <Tilty
          scale={1.12}
          max={8}
          style={{ minWidth: 260, marginRight: 10, marginBottom: 20 }}
          key={i}
        >
          <img src={c.image} alt={c.name} />
        </Tilty>
      )
    })
  }

  const renderMatchesByCMC = (elements, CMC) => {
    const filteredCards = filterByCMC(elements, CMC).sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.rating - a.rating)
    if (filteredCards.length > 0) {
      return (
        <div style={{ marginBottom: 30 }}>
          <FlexBaselineContainer>
            <TypographyShadow variant='h5' style={{ fontWeight: 600, height: 38 }}>
              MANA VALUE
            </TypographyShadow>
            <StyledChip label={CMC} />
          </FlexBaselineContainer>
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
      <TypographyShadow variant='h3' gutterBottom>What instants could my opponent have?</TypographyShadow>
      <OptionsContainer>
        <ButtonContainer>
          <ColorsHeader>
            <Tooltip title='All colors are selected by default' placement='top-start'>
              <TypographyShadow variant='h6' gutterBottom>COLORS</TypographyShadow>
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
                <UnselectedIconButton onClick={() => toggleColor('W')} color='primary' aria-label='White Mana' component='span'>
                  <White width={50} />
                </UnselectedIconButton>
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
                <UnselectedIconButton onClick={() => toggleColor('U')} color='primary' aria-label='Blue Mana' component='span'>
                  <Blue width={50} />
                </UnselectedIconButton>
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
                <UnselectedIconButton onClick={() => toggleColor('B')} color='primary' aria-label='Black Mana' component='span'>
                  <Black width={50} />
                </UnselectedIconButton>
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
                <UnselectedIconButton onClick={() => toggleColor('R')} color='primary' aria-label='Red Mana' component='span'>
                  <Red width={50} />
                </UnselectedIconButton>
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
                <UnselectedIconButton onClick={() => toggleColor('G')} color='primary' aria-label='Green Mana' component='span'>
                  <Green width={50} />
                </UnselectedIconButton>
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
                <UnselectedIconButton onClick={() => toggleColor('C')} color='primary' aria-label='Colorless Mana' component='span'>
                  <Colorless width={50} />
                </UnselectedIconButton>
                )}
          </Tooltip>
        </ButtonContainer>
        <RarityContainer>
          <ColorsHeader>
            <Tooltip title='All rarities are selected by default' placement='top-start'>
              <TypographyShadow variant='h6' gutterBottom>RARITIES</TypographyShadow>
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
                  <SetIconLarge className='ss ss-common ss-grad ss-mid' />
                </SelectedRarityIconButton>
                )
              : (
                <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('common')} color='primary' aria-label='Common Cards' component='span'>
                  <SetIconLarge className='ss ss-common ss-grad ss-mid' />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Uncommon' placement='bottom'>
            {rarities.has('uncommon')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('uncommon')} color='primary' aria-label='Uncommon Cards' component='span'>
                  <SetIconLarge className='ss ss-uncommon ss-grad ss-mid' />
                </SelectedRarityIconButton>
                )
              : (
                <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('uncommon')} color='primary' aria-label='Uncommon Cards' component='span'>
                  <SetIconLarge className='ss ss-uncommon ss-grad ss-mid' />
                </UnselectedIconButton>
                )}

          </Tooltip>
          <Tooltip title='Rare' placement='bottom'>
            {rarities.has('rare')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('rare')} color='primary' aria-label='Rare Cards' component='span'>
                  <SetIconLarge className='ss ss-rare ss-grad ss-mid' />
                </SelectedRarityIconButton>
                )
              : (
                <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('rare')} color='primary' aria-label='Rare Cards' component='span'>
                  <SetIconLarge className='ss ss-rare ss-grad ss-mid' />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Mythic' placement='bottom'>
            {rarities.has('mythic')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('mythic')} color='primary' aria-label='Mythic Cards' component='span'>
                  <SetIconLarge className='ss ss-mythic ss-grad ss-mid' />
                </SelectedRarityIconButton>
                )
              : (
                <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('mythic')} color='primary' aria-label='Mythic Cards' component='span'>
                  <SetIconLarge className='ss ss-mythic ss-grad ss-mid' />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <FormControlLabel
            style={{ marginLeft: 10 }}
            control={
              <Switch
                checked={groupByRarity}
                onChange={() => setGroupByRarity(!groupByRarity)}
                name='rarity-grouping'
                color='primary'
              />
        }
            label='Group by rarity'
          />
        </RarityContainer>
        <ManaCostContainer>
          <Tooltip title='How much mana your opponent has up' placement='top-start'>
            <TypographyShadow style={{ marginBottom: 38 }} variant='h6' gutterBottom>MAX MANA VALUE</TypographyShadow>
          </Tooltip>
          <SliderContainer>
            <Slider
              defaultValue={7}
              aria-labelledby='discrete-slider-always'
              step={1}
              marks
              min={1}
              max={7}
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
      <div style={{marginBottom: 30}}>
        <FormControlLabel
          control={
            <Switch
              checked={combatRelevant}
              onChange={() => setCombatRelevant(!combatRelevant)}
              name='combat-relevant'
              color='primary'
            />
      }
          label='Combat relevant only'
        />
      </div>
      {renderMatches(types, maxCMC, colors, combatRelevant)}
    </Container>
  )
}

export default App
