import './index.css'

const ProductItem = props => {
  const {eachProjectDetails} = props
  const {name, imageUrl} = eachProjectDetails
  return (
    <li className="li-container">
      <img src={imageUrl} alt={name} className="image" />
      <p className="name">{name}</p>
    </li>
  )
}
export default ProductItem
