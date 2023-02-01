export function getTimeHHmmFromTimeStamp(timeStamp: number): string {
  return getTimeHHmm(new Date(timeStamp))
}

export function getTimeHHmm(date: Date): string {
  let time = date.toLocaleTimeString()
  const partsAmPm = time.split(' ')
  const partsHHmmss = partsAmPm[0].split(':')
  
  if (partsHHmmss.length === 3) {
    time = `${partsHHmmss[0]}:${partsHHmmss[1]}`

    if (partsAmPm.length === 2) {
      time = `${time} ${partsAmPm[1]}`
    }
  }

  return time
}