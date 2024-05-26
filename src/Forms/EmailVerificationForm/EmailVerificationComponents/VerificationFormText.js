/**
 * Basic text for the verification form.
 * @param props
 * @returns {JSX.Element}
 */
function VerificationFormText({props}) {
    let title = () => {
        if (props.fromSignup) {
            return "Please verify your email to complete your registration";
        } else {
            return "Please verify your identity to reset your password";
        }
    }
    return (
        <div>
            <h4>
                {title()}
            </h4>
            <p>
                A 6 letter verification code has been sent to your email.
            </p>
            <p>
                Please input the code sent to you in the text box below, and then hit submit.
            </p>
            <p>
                However, as sending emails from the browser and not from a server makes absolutely no sense,
                this feature is not yet implemented.
                Input 111111 to bypass this, or feel free to try and guess the code out of the 99795696 possibilities.
            </p>
        </div>
    );
}

export default VerificationFormText;