import { useTranslation } from 'react-i18next'

interface BalanceProps {
  balance: boolean,
  setBalance: any
}

export function Balance({ balance, setBalance }: BalanceProps) {

  const { t } = useTranslation('translation')

  return (
    <div className="r start input-balance">
      <div className="c s5 m4 l2">
        {t('features.host.form.balance')}:
      </div>
      <div className="c s5 m4 l3">
        <div className='radio-wrapper filter-switch'>
          <div className="filter-switch-item">
            <input type="radio" id="balance-on" name="balance" value="on" checked={balance}
              onChange={() => setBalance(true)} />
            <label htmlFor="balance-on">{t('common.switch.on')}</label>
          </div>
          <div className="filter-switch-item">
            <input type="radio" id="balance-off" name="balance" value="off" checked={!balance}
              onChange={() => setBalance(false)} />
            <label htmlFor="balance-off">{t('common.switch.off')}</label>
          </div>
        </div>
      </div>
    </div>
  )
}