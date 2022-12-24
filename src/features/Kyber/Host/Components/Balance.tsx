import { useTranslation } from 'react-i18next'


interface BalanceProps {
  balance: boolean,
  setBalance: any
}

export function Balance({balance, setBalance}: BalanceProps) {

  const { t } = useTranslation('translation')

  return (
    <div className="input-balance">
      {t('features.host.form.balance')}:
      <input type="radio" id="balance-on" name="balance" value="on" checked={balance} 
        onChange={() => setBalance(true)}/>
      <label htmlFor="balance-on">{t('common.switch.on')}</label>
      <input type="radio" id="balance-off" name="balance" value="off" checked={!balance}
        onChange={() => setBalance(false)}/>
      <label htmlFor="balance-off">{t('common.switch.off')}</label>
    </div>
  )
}