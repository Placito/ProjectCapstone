//entry point for the webpack, and everything run from where
import "./public/styles/style.scss"

import { handleSubmit } from "./scripts/handleForm";
import { resetForm } from "./scripts/handleRemove";


export {
    handleSubmit,
    resetForm
}