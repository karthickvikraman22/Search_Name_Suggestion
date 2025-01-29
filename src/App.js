import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [users, setUsers] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [clikedData, setClickedData] = useState('')

  useEffect(() => {
    axios.get('https://dummyjson.com/users?limit=100')
      .then((res) => (
        setUsers(res.data.users.map(user => user.firstName))
      ))
      .catch(e => console.log(e))
  }, [])

  function handleSearch(search_value) {
    setClickedData(search_value)
    if (search_value.length > 1) {
      const newData = users.filter(user => (user.toLowerCase()).indexOf(search_value) !== -1)
      setIsFilter(true)
      setFilteredData(newData)
    }
    else {
      setIsFilter(false)
      setFilteredData([])
    }
  }

  function handleClick(name) {
    setClickedData(name)
    setIsFilter(false)
    setFilteredData([])
  }

  return <>
    <div className='container'>
      <h1>Search Name Suggestion</h1>
      <input type="text" value={clikedData} onChange={(e) => { handleSearch(e.target.value) }} />
      {
        isFilter && <div className='search-container'>
          {filteredData.map((user, index) => (<div onClick={() => handleClick(user)} className='name' key={index}>{user}</div>))}
        </div>
      }
    </div>
  </>
}

export default App;
