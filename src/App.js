import { useState } from 'react'
import './App.css'
import cards from './cards.json'

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
  colors.add('C')
  for (let i = 0; i <= cardColorsArray.length; i++) {
    if (colors.has(cardColorsArray[i])) {
      return true
    }
  }
  return false
}

function App () {
  const [types, setTypes] = useState(new Set(['Instant']))
  const [maxCMC, setMaxCMC] = useState(20)
  const [colors, setColors] = useState(new Set(['C', 'R', 'G', 'B', 'U', 'W']))

  const renderMatches = (types, maxCMC, colors) => {
    return cards.map((c, i) => {
      if (c.cmc <= maxCMC && hasType(c, types) && hasColor(c, colors)) {
        return (
          <div key={i}>{c.name}
            <img src={c.image} height={300} alt={c.name} />
          </div>
        )
      }
    })
  }

  return (
    <div>
      <b>Instants</b>
      <button onClick={() => setTypes(new Set(['Instant']))}>Instant</button>
      <button onClick={() => setTypes(new Set(['Sorcery']))}>Sorcery</button>
      <button onClick={() => setColors(new Set(['C', 'W']))}>W</button>
      {renderMatches(types, maxCMC, colors)}
    </div>
  )
}

export default App
