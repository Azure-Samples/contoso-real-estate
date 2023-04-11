import Articles from "../components/articles"
import Stage from "../components/stage"

export default async function HomePage() {
  return (
    <div>
      <div className="uk-section">
        {/* @ts-expect-error Async Server Component */}
        <Stage />
        <section className="section results">
          {/* @ts-expect-error Async Server Component */}
          <Articles />
        </section>
      </div>
    </div>
  )
}
