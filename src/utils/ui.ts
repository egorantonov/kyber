import { useAppSelector } from '../app/hooks'
import { isBlur } from '../features/Kyber/Servers/serversSlice'

// interface BlurOrBackGroundProps {
//   isBlur: boolean,
//   blurAmount: 5 | 10 | 25,
//   alpha: boolean
// }

// export const blurOrBackground = ({isBlur , blurAmount, alpha = true}: BlurOrBackGroundProps) =>
//   `bd-filter-blur-${isBlur ? blurAmount : alpha ? 'disabled-alpha' : 'disabled'}`

export const blurOrBackground = (blurAmount: 5 | 10 | 25, alpha = true) => {
  const blur = useAppSelector(isBlur)
  return `bd-filter-blur-${blur ? blurAmount : alpha ? 'disabled-alpha' : 'disabled'}`
}