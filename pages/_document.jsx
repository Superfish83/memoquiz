import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head/>
        <body className="mx-auto sm:w-[640px] m-4 p-4 rounded-xl shadow-2xl">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument