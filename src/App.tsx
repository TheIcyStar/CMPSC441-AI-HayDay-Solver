import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DesktopPlan } from "./screens/DesktopPlan/Plan";
import { DesktopInventorySilo } from "./screens/DesktopInventorySilo";
import { DesktopInventoryBarn } from "./screens/DesktopInventoryBarn";
import { DesktopOrder } from "./screens/DesktopOrder";
import { DesktopHomepage } from "./screens/DesktopHomepage";
import './App.css'

/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
*/

const router = createBrowserRouter([
  {
    path: "/*",
    element: <DesktopHomepage />,
  },
  {
    path: "/homepage",
    element: <DesktopHomepage />,
  },
  {
    path: "/desktop-u45-4",
    element: <DesktopPlan />,
  },
  {
    path: "/desktop-u45-inventory-silo",
    element: <DesktopInventorySilo />,
  },
  {
    path: "/desktop-u45-3",
    element: <DesktopOrder />,
  },
  {
    path: "/desktop-u45-inventory-barn",
    element: <DesktopInventoryBarn />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;