import { useTranslation } from 'react-i18next'
import style from './infoblock.module.scss'
import './infoblock.module.scss'
import { isNullOrWhiteSpace } from '../../extensions/string'
import { blurOrBackground } from '../../utils/ui'

export interface InfoBlockProps {
  id: string,
  href?: string,
  className?: string;
  children?: React.ReactNode,
  background?: string,
} 

export function InfoBlock(props: InfoBlockProps) {
  const bgClass = blurOrBackground(10)
  const { t } = useTranslation('translation')

  const background = `${props.background} center center / cover`
  return (
    <div data-ui={bgClass} className={`${style.infoblock} ${props.className}`} 
      style={{background: background}} >
      {
        isNullOrWhiteSpace(props.href) 
          ? (<div title={t(`${props.id}.title`) ?? ''}>
            <div className={style.content}>
              <h4>{t(`${props.id}.title`)}</h4>
              {props.children}
            </div>
          </div>)
          : (<a href={props.href} title={t(`${props.id}.title`) ?? ''} target="_blank" rel="noreferrer">
            <div className={style.content}>
              <h4>{t(`${props.id}.title`)}</h4>
              {props.children}
            </div>
          </a>)
      }
    </div>
  )
}