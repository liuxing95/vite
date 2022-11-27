import { useState } from 'react'
import Button from 'jsx-entry'

import Dummy from './components/Dummy?qs-should-not-break-plugin-react'
import Parent from './hmr/parent'
import { CountProvider } from './context/CountProvider'
import { ContextButton } from './context/ContextButton'
import './index.less'

function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    // 动态引入 并不会在预构件能够分析的队列中
    // Vite 运行时发现了新的依赖，随之重新进行依赖预构建，并刷新页面
    const importModule = (m) => import(`./locales/${m}.js`)
    importModule('zh')
    setCount((count) => count++)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Vite + React</h1>
        <p>
          <button id="state-button" onClick={handleClick}>
            count is: {count}
          </button>
        </p>
        <p>
          <ContextButton />
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Dummy />
      <Parent />
      <Button>button</Button>
    </div>
  )
}

function AppWithProviders() {
  return (
    <CountProvider>
      <App />
    </CountProvider>
  )
}

export default AppWithProviders
