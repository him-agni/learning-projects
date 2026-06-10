This project is made to learn Redux Toolkit

<img width="1881" height="906" alt="image" src="https://github.com/user-attachments/assets/9b3d9a08-ab85-4ce2-a264-5138027191f4" />

Project Overview
- It renders items searched in the search bar.
- The items can be selected either in photo format or in video format
- The items can be saved and saved items are seen in collection page
- The items can be removed from collection and collection can be cleared.
- Photos are fetched from unsplash api and videos are fetched from pexels api.


Redux Toolkit Flow — This Project
1. Create the Store (store.js)
configureStore({ reducer: { search, collection } })
Combines all slice reducers into one global store.

2. Create Slices (each slice = state + reducers)
searchSlice.js — manages query, activeTab, results, loading, error
collectionSlice.js — manages saved items, synced to localStorage

Each slice uses createSlice({ name, initialState, reducers }) and exports:

The reducer (default export → goes into store)
The action creators (named exports → used to dispatch)

3. Provide the Store (wraps the whole app)
<Provider store={store}> <App /> </Provider>

4. Read State with useSelector (ResultGrid.jsx)
const { query, results, loading } = useSelector(store => store.search)

5. Dispatch Actions with useDispatch
ResultGrid.jsx — dispatches setLoading, setResults, setError after API fetch
ResultCard.jsx — dispatches addCollection(item) on Save click
Collection page — would dispatch removeCollection / clearCollection
