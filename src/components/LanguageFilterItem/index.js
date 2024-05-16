import './index.css'

const LanguageFilterItem = props => {
  const {item, onSelectTab, isActive} = props
  const {language, id} = item
  const onSelect = () => {
    onSelectTab(id)
  }
  const style = isActive ? 'active' : 'li'
  return (
    <li className={style}>
      <button type="button" onClick={onSelect} className="btn">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
