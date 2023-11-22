const RecaptchaVerify = async (gReCaptchaToken: string) => {
    return await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${gReCaptchaToken}`,
    })
        .then((reCaptchaRes) => reCaptchaRes.json())
        .then((reCaptchaRes) => {
            if (reCaptchaRes?.score > 0.5) return true
            else return false
        })
}

export default RecaptchaVerify