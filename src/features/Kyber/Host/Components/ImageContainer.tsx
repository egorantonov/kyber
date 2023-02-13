import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../app/hooks'
import { ensureMapName, mapImage } from '../../../../utils/maps'
import { isBlur } from '../../Servers/serversSlice'
import style from '../host.module.scss'

interface ImageContainerProps {
  map: string,
  mode: string
}

export function ImageContainer({map, mode}: ImageContainerProps) {
  
  const { t } = useTranslation('translation')
  const blur = useAppSelector(isBlur)
  const imageUrl = mapImage(map)

  return (
    <div className={`c l8 m12 s12 ${style.image_container}`}
      style={{background: `url(${imageUrl}) center center / cover`, transition: 'all ease-in-out 1.5s'}}>
      <div className={style.info_container}>
        <div className={`${style.info} ${blur && 'bd-filter-blur-5'} uppercase`}>
        🌍 {t(`maps.${ensureMapName(map, mode)}`).replace('maps.', '')}
        </div>
        {/* <div className={style.info}>
        <img className={style.image_proxy_flag} loading="lazy" alt="location flag" 
          src={proxy?.flag} /> {t(`locations.${proxy?.name}`).replace('locations.', '')}
      </div> */}
      </div>
    </div>
  )
}