import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';

injectGlobal`
  @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css');
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Socket X</title>

      {/*<link rel="stylesheet" href="/_next/static/style.css" /> */}
          {this.props.styleTags}

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
