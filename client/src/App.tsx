import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import { Suspense } from 'react'
import Loader from './components/Loader'

const App = () => {
  return (
    <div>
      <Routes>
        {
        routes.map(({path, component: Component},index)=>(
          <Route key={index}
            path={path}
            element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
            }
          />
        ))}
      </Routes>
    </div>
  )
}

export default App