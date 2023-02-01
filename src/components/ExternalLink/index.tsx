import style from './externalLink.module.scss'

export interface LinkProps {
  href: string,
  className?: string | undefined;
  title?: string,
  children?: React.ReactNode,
} 

export default function ExternalLink(props: LinkProps) {

  const cn =  `${props.className ? props.className : ''} ${style.external}`

  return (
    <a className={cn} href={props.href} title={props.title} target="_blank" rel="noreferrer">{props.children}</a>
  )
}