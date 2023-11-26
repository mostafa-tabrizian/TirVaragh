'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <GoogleReCaptchaProvider
         reCaptchaKey='6LfL8BgpAAAAAE3ND3Rtxgb5qxncvWbdALpZgpHW'
         language='fa'
         scriptProps={{
            async: false,
            defer: false,
            appendTo: 'head',
            nonce: undefined,
         }}
      >
         <main>{children}</main>
      </GoogleReCaptchaProvider>
   )
}
