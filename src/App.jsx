import ColorWell from './ColorWell'
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
        <Field labelName = "HEX:" value = ""></Field>
        <Field labelName = "HSL:" value = ""></Field>
        <Field labelName = "RGB:" value = ""></Field>
        <Field labelName = "RGBA:" value = ""></Field>
      </div>
    </main>
    <aside>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
      <ColorWell></ColorWell>
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
