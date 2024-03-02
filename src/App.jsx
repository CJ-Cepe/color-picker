import './App.css'
import Field from './Field'

function App() {

  return (
    <>
    <header>
      <h1>Color Picker</h1>
    </header>
    <main>
      <div></div>
      <div>
        <Field labelName = "HEX" value = "" />
        <Field labelName = "HSL" value = "" />
        <Field labelName = "RGB" value = "" />
        <Field labelName = "RGBA" value = "" />
      </div>
    </main>
    <aside>

    </aside>
    <section>
      <input type="color" />
      <button>download</button>
      <button>delete</button>
      <button>clear</button>
    </section>
    </>
  )
}

export default App
