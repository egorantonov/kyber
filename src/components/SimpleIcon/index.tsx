interface SimpleIconProps {
  height: number,
  width: number,
  path: string,
  fill?: string,
  stroke?: string
}

export function SimpleIcon({height, width, path, fill, stroke}: SimpleIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width}>
      <path fill={fill ?? ''} stroke={stroke ?? ''} d={path} />
    </svg>
  )
}