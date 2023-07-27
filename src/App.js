import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProductItem from './components/ProductItem'
import './App.css'

// This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const responsiveCases = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Replace your code here
class App extends Component {
  state = {
    searchInput: categoriesList[0].id,
    updateDataList: [],
    isLoading: responsiveCases.inProgress,
  }

  componentDidMount() {
    this.getDataFromApi()
  }

  getDataFromApi = async () => {
    const {searchInput} = this.state
    this.setState({isLoading: responsiveCases.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${searchInput}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.projects.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        imageUrl: eachData.image_url,
      }))
      this.setState({
        updateDataList: updateData,
        isLoading: responsiveCases.success,
      })
    } else {
      this.setState({isLoading: responsiveCases.failure})
    }
  }

  onClickRetryButton = () => {
    this.getDataFromApi()
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  selectOption = each => {
    const {displayText, id} = each
    return (
      <option value={id} className="option">
        {displayText}
      </option>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height={80} width={80} color="#328af3" />
    </div>
  )

  renderSuccessView = () => {
    const {updateDataList} = this.state
    return (
      <ul className="products-list-container">
        {updateDataList.map(eachProject => (
          <ProductItem key={eachProject.id} eachProjectDetails={eachProject} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-heading">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="button"
        type="button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderCases = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case responsiveCases.success:
        return this.renderSuccessView()
      case responsiveCases.inProgress:
        return this.renderLoadingView()
      case responsiveCases.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="head-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </nav>
        <select
          className="input"
          value={searchInput}
          onChange={this.onChangeInput}
        >
          {categoriesList.map(each => this.selectOption(each))}
        </select>
        {this.renderCases()}
      </div>
    )
  }
}

export default App
