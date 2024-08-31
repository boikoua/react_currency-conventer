import style from './Block.module.scss';

const defaultCurrencies = ['uah', 'usd', 'eur', 'gbp'];

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => (
  <div className={style.block}>
    <ul className={style.currencies}>
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? `${style.active}` : ''}
          key={cur}
        >
          {cur.toUpperCase()}
        </li>
      ))}
    </ul>
    <input
      onChange={(e) => onChangeValue(e.target.value)}
      value={value}
      type="number"
      placeholder={0}
    />
  </div>
);

export default Block;
