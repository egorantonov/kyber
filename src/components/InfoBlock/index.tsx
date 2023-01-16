import { useTranslation } from 'react-i18next'
import style from './infoblock.module.scss'

export interface InfoBlockProps {
  id: string,
  href?: string,
  className?: string | undefined;
  children?: React.ReactNode,
  background?: string,
} 

export function InfoBlock(props: InfoBlockProps) {

  const { t } = useTranslation('translation')

  const background = `${props.background} center center / cover`
  return (
    <div className={`${style.infoblock} ${props.className}`} 
      style={{background: background}} >
      <a href={props.href} title={t(`pages.download.${props.id}.title`) ?? ''}>
        <div className={style.content}>
          <h4>{t(`pages.download.${props.id}.title`)}</h4>
          {props.children}
        </div>
      </a>
    </div>
  )
}