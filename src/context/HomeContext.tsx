import { createContext, Dispatch, useReducer } from "react"
import { Action, HomesReducer, State } from "../reducers/HomesReducer"

const initialState: State = {
  homes: [],
  selectedHome: null,
}

interface HomeContextType extends State {
  dispatch: Dispatch<Action>
}

const HomeContext = createContext({
  ...initialState,
  dispatch: (value: Action) => {},
})

export function HomeContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(HomesReducer, initialState)
  const context: HomeContextType = {
    ...state,
    dispatch,
  }

  return <HomeContext.Provider value={context}>{children}</HomeContext.Provider>
}

export default HomeContext
