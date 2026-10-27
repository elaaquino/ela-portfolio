import './Character.css'

export type CharacterExpression =
  | 'neutral'
  | 'joy'
  | 'wink'
  | 'shy'
  | 'happy'
  | 'angry'

type CharacterProps = {
  expression: CharacterExpression
}

export const pageExpressions = {
  'about me': 'joy',
  'projects': 'wink',
  'experience': 'happy',
  'contact me': 'shy',
} as const satisfies Record<string, CharacterExpression>

export default function Character({ expression }: CharacterProps) {
  return (
    <div className="character">
      <img
        className="character-layer"
        src="/character/base.png"
        alt=""
      />

      <img
        className="character-layer"
        src={`/character/features-${expression}.png`}
        alt=""
      />

      <img
        className="character-layer"
        src="/character/pupil-left.png"
        alt=""
      />

      <img
        className="character-layer"
        src="/character/pupil-right.png"
        alt=""
      />
    </div>
  )
}
