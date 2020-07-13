import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Head from 'next/head'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const GlobalStyle =  createGlobalStyle`
  *{
    font-family: 'Source Sans Pro', 'Inria Serif', serif;
  }
  body{
  	padding:0;
  	margin:0;
    min-width:1000px;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
      	<GlobalStyle />
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet"/>
          <title>Asistent pri naročanju prometnih znakov in ostale prometne opreme | Signaco d.o.o.</title>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="https://signaco.herokuapp.com/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:type" content="website" />

          <meta name="description" content="Asistent pri naročanju prometnih znakov in ostale prometne opreme | Signaco d.o.o."/>
          <meta property="og:title" content="Asistent pri naročanju prometnih znakov in ostale prometne opreme | Signaco d.o.o." />
          <meta property="og:image" content="./tumbnail.png"/>
          <meta property="og:description" content="Asistent pri naročanju prometnih znakov in ostale prometne opreme | Signaco d.o.o."/> 
          <meta property="og:url" content={"https://asistent.signaco.si"} />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="white" />
          <meta name="apple-mobile-web-app-title" content="Signaco asistent" />
          <link rel="apple-touch-startup-image" href="./tumbnail.png" />
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}